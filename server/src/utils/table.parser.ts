import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import xlsx from 'node-xlsx';
import { writeFile } from 'fs';
import { promisify } from 'util';

const writeFilePromise = promisify(writeFile);

@Injectable()
export class TableParser {
  private table: any;
  constructor(private readonly httpService: HttpService) {}

  async downloadFile(url, outputPath) {
    const res = this.httpService.get(url, { responseType: 'arraybuffer' });
    const final = await lastValueFrom(res);
    await writeFilePromise(outputPath, Buffer.from(final.data));
    this.readTable(process.env.OLD_TABLE);
  }

  readTable(table) {
    if (!this.table) {
      this.table = xlsx.parse(table);
    }
  }

  readTableByDay(day: number) {
    // parse from table all data what we need by current day
    let currentDayFood = this.table[day - 1].data
      .map((row) => {
        if (typeof row[1] === 'string' && typeof row[3] === 'number') {
          row = {
            id: row[0],
            title: row[1],
            price: row[3],
          };
        }
        return row;
      })
      .slice(2, -5);

    // define food types like in table
    const foodTypes = currentDayFood
      .map((item) => {
        if (Array.isArray(item)) {
          return item[0];
        }
        return null;
      })
      .filter((item) => item);

    //delete first item for correct work next cycle
    currentDayFood.shift();

    const food = {};
    let index = 0;

    //generate new array of objects where keys is food types and values is food objects by current day
    currentDayFood.forEach((item) => {
      if (!Array.isArray(item)) {
        return food[foodTypes[index]]?.length
          ? food[foodTypes[index]].push(item)
          : (food[foodTypes[index]] = [item]);
      }
      index++;
    });
    return food;
  }
}
