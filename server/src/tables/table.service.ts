import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { writeFile, existsSync, unlinkSync } from 'fs';
import { promisify } from 'util';
import { Cron } from '@nestjs/schedule';
import xlsx from 'node-xlsx';

const writeFilePromise = promisify(writeFile);

@Injectable()
export class TableService {
  private table: any;

  constructor(private readonly httpService: HttpService) {}

  @Cron('0 0 08 * * THU')
  private async downloadCron() {
    if (existsSync(process.env.OLD_TABLE)) {
      unlinkSync(process.env.OLD_TABLE);
    }
    await this.downloadFile(process.env.APP_REMOTE_URL, process.env.OLD_TABLE);
    await writeFilePromise('./cron.log', `[${new Date()}] - Downloaded Table`);
  }
  @Cron('0 01 08 * * THU')
  private async createTableCron() {
    if (existsSync(process.env.NEW_TABLE)) {
      unlinkSync(process.env.NEW_TABLE);
    }
    const data = xlsx.build(xlsx.parse(process.env.OLD_TABLE));
    await writeFilePromise(process.env.NEW_TABLE, data);
    await writeFilePromise('./cron.log', `[${new Date()}] - Generated Table`);
  }
  downloadParams() {
    const parsedTable = xlsx.parse(process.env.OLD_TABLE);
    const [startRange, endRange] = [parsedTable[0].data[0][1].match(/\d+\.\d+\.\d+/)[0], parsedTable[4].data[0][1].match(/\d+\.\d+\.\d+/)[0]];

    return ['./data/table.xlsx', `Заказ ${startRange}-${endRange}.xlsx`];
  }
  async downloadFile(url, outputPath) {
    const res = this.httpService.get(url, { responseType: 'arraybuffer' });
    const final = await lastValueFrom(res);
    await writeFilePromise(outputPath, Buffer.from(final.data));
    await this.readTable(process.env.OLD_TABLE);
  }

  async readTable(table) {
    this.table = xlsx.parse(table);
  }

  readTableByDay(day: number) {
    // parse from tables all data what we need by current day
    let currentDayFood = this.table[day - 1].data
      .map((row) => {
        if (typeof row[1] === 'string' && typeof row[3] === 'number') {
          row = {
            id: row[0],
            title: row[1],
            weight: row[2],
            price: row[3],
            cost: 0,
            count: 0,
          };
        }
        return row;
      })
      .slice(2, -5);

    // define tables types like in tables
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

    const food = [];

    let index = 0;

    //generate new array of objects with fields id, title, ..., and new field is category
    currentDayFood.forEach((item) => {
      if (!Array.isArray(item)) {
        return food.push({ ...item, category: foodTypes[index] });
      }
      index++;
    });
    return food;
  }

  private async writeTable(table = this.table) {
    await writeFilePromise.call(this, process.env.NEW_TABLE, xlsx.build(table));
  }

  async setTableData(data) {
    // parse tables which would be changing
    const newTable = xlsx.parse(process.env.NEW_TABLE);

    Object.keys(data).forEach((day) => {
      const currentDayList = newTable[+day - 1].data;

      data[day].forEach((food) => {
        const foodPosInTable = currentDayList.findIndex(
          (item) => item[0] === food.id,
        );

        const { count, cost } = food;

        let currentFoodCount = currentDayList[foodPosInTable][4] || 0;
        currentFoodCount += count;

        currentDayList[foodPosInTable][5] += cost;
        currentDayList[foodPosInTable][4] = currentFoodCount;

        currentDayList[currentDayList.length - 5][5] += cost;
      });
    });
    await this.writeTable(newTable);
  }
}
