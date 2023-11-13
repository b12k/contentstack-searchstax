import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const searchQuerySchema = z.object({
  search: z.string(),
});

export class SearchQueryDto extends createZodDto(searchQuerySchema) {}
