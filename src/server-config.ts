// Pre-dispatch server-function configuration (pinned into the handler graph
// via `serverFunctions.configure` in vite.config.ts). Registering the router
// as the single-flight collector turns a mutation into ONE round trip: the
// action response carries the refreshed `query()` data for the page the
// client will show.
import { configureServerFunctionsServer } from '@solidjs/web/server-functions/server';
import { createFlightDataCollector } from '@solidjs/router/server';

import { Router } from './router';

configureServerFunctionsServer({
  collectFlightData: createFlightDataCollector(Router),
});
