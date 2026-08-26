import { os } from '@orpc/server';
import { z } from 'zod';
import { getDataForType } from '~/lib/loader';
import type { VisualizationData } from '~/lib/types';

const itemTypeSchema = z.enum(['skills', 'workflows', 'mcp']);

export const router = {
  visualization: {
    getData: os
      .input(
        z
          .object({
            type: itemTypeSchema,
          })
          .default({ type: 'skills' })
      )
      .handler(async ({ input }) => {
        const data = await getDataForType(input.type, process.env.AGENTS_MANAGER_DIR);
        return data satisfies VisualizationData;
      }),
  },
};

export type Router = typeof router;
