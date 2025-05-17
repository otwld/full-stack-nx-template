import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from '@agency-quest/ng-apollo';
import { InMemoryCache } from '@apollo/client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideApollo({
      link: {
        uri: '/graphql',
      },
      ssr: true,
      cache: new InMemoryCache(),
      // persistence: {
      //   initializer: true,
      //   storage: () => new LocalStorageWrapper(inject(WA_WINDOW).localStorage),
      // },
    }),
  ],
};
