// The router: file-system routes from src/routes (scanned by the fileRoutes
// plugin in vite.config.ts), adapted to Solid Router route definitions by
// @solidjs/router/fs.
import { pageRoutes } from 'virtual:file-routes';
import { createRouter } from '@solidjs/router';
import { fileRoutes } from '@solidjs/router/fs';

export const Router = createRouter({ routes: fileRoutes(pageRoutes) });

export const { paths } = Router;
