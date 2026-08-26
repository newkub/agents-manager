import { onError } from '@orpc/server';
import { RPCHandler } from '@orpc/server/fetch';
import { Elysia } from 'elysia';
import { router } from '~/api/router';

const handler = new RPCHandler(router, {
  interceptors: [
    onError((error) => {
      console.error('oRPC error:', error);
    }),
  ],
});

const app = new Elysia()
  .onError(({ error }) => {
    console.error('Server error:', error);
  })
  .get('/health', () => ({ status: 'ok' }))
  .all(
    '/rpc*',
    async ({ request }) => {
      const { response } = await handler.handle(request, { prefix: '/rpc' });
      return response ?? new Response('Not Found', { status: 404 });
    },
    { parse: 'none' }
  )
  .listen(3000);

console.log('Elysia server running at http://localhost:3000');

export type App = typeof app;
