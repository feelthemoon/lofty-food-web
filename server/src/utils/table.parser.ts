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
  private totalPerPage = 25;
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

  readTableByDayAndPage(day: number, page: number) {
    let currentDayFood = this.table[day - 1].data.map((row) => {
      if (typeof row[1] === 'string' && typeof row[3] === 'number') {
        row = { id: row[0], title: row[1], price: row[3] };
      }
      return row;
    });
    currentDayFood = currentDayFood.filter((item) => !Array.isArray(item));
    return {
      data: [
        ...currentDayFood.slice(
          (page - 1) * this.totalPerPage,
          page * this.totalPerPage,
        ),
      ],
      total: currentDayFood.length,
    };
  }
}
