import { createRootRoute, createRoute, createRouter } from '@tanstack/solid-router';
import { Root } from './routes/__root';
import { Index } from './routes/index';
import { Mobile } from './routes/mobile';

const rootRoute = createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

const mobileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mobile',
  component: Mobile,
});

const routeTree = rootRoute.addChildren([indexRoute, mobileRoute]);

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
  });
}

declare module '@tanstack/solid-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
