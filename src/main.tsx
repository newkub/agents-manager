import { RouterProvider } from '@tanstack/solid-router';
import { render } from 'solid-js/web';
import 'virtual:uno.css';
import { getRouter } from './router';

const root = document.getElementById('root');

if (root) {
  render(() => <RouterProvider router={getRouter()} />, root);
}
