import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import {
  WebhookPayloadDto,
  CreateSolrIndexEntryDto,
  SearchQueryDto,
} from './dto';
import { ApiService } from './api.service';
import { UseZodGuard } from 'nestjs-zod';

@Controller('api/search')
export class ApiController {
  constructor(private readonly webhookService: ApiService) {}

  @Post()
  @UseZodGuard('body', WebhookPayloadDto)
  create(@Body() payload: WebhookPayloadDto) {
    const {
      data: {
        entry: { url, uid: id, title },
      },
    } = payload;

    const indexEntry = new CreateSolrIndexEntryDto({
      id,
      title,
      url,
    });

    this.webhookService.writeToIndex(indexEntry);
  }

  @Get()
  @UseZodGuard('query', SearchQueryDto)
  read(@Query() payload: SearchQueryDto) {
    const { search } = payload;
    return this.webhookService.readFromIndex(search);
  }
}
