import { Injectable } from '@nestjs/common';
import { catchError, map, firstValueFrom } from 'rxjs';
import { CreateSolrIndexEntryDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

export interface ISearchstaxSearchResponse {
  response: {
    docs: Array<{
      title: Array<string>;
      url: Array<string>;
      id: string;
    }>;
  };
}

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async writeToIndex(payload: CreateSolrIndexEntryDto) {
    const requestObservable = this.httpService.post('update', payload).pipe(
      catchError((error: AxiosError) => {
        throw error;
      }),
    );

    const response = await firstValueFrom(requestObservable);
    console.log('writeToIndex', response.status, response.statusText, payload);
  }

  readFromIndex(searchText: string) {
    const q = `title:${this.stringToSorlFuzzyQuery(searchText)}`;

    return this.httpService
      .get<ISearchstaxSearchResponse>(`select?q=${q}`)
      .pipe(
        map(({ data }) =>
          data.response.docs.map((entry) => ({
            title: entry.title[0] || '',
            url: entry.url[0] || '',
            id: entry.id,
          })),
        ),
      )
      .pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      );
  }

  private stringToSorlFuzzyQuery(str: string) {
    const words = str.split(' ');
    const query = words.map((word) => `${word}~`).join(' OR ');

    if (words.length > 1) {
      return `(${query})`;
    }

    return query;
  }

  // async removeFromIndex(id: string) {}
}
