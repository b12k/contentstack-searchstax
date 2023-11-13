import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const webhookPayloadSchema = z.object({
  data: z.object({
    entry: z.object({
      title: z.string(),
      url: z.string(),
      uid: z.string(),
    }),
  }),
});

export class WebhookPayloadDto extends createZodDto(webhookPayloadSchema) {}
