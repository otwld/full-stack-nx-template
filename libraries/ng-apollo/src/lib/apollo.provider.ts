import {
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideAppInitializer,
} from '@angular/core';
import { HttpLink, Options } from 'apollo-angular/http';
import { ApolloCache, ApolloClientOptions } from '@apollo/client/core';
import { ApolloCacheService } from './apollo-cache.service';
import { PersistentStorage } from 'apollo3-cache-persist';
import { provideApollo as _provideApollo } from 'apollo-angular';
import { isPlatformBrowser } from '@angular/common';

export interface ApolloConfiguration {
  readonly link?: Options;
  readonly cache: ApolloCache<unknown>;
  readonly ssr: boolean;
  readonly persistence?: {
    readonly initializer: boolean;
    readonly storage: () => PersistentStorage<string>;
  };
}

export function provideApollo(config: ApolloConfiguration) {
  return makeEnvironmentProviders([
    _provideApollo(() => {
      const platformId = inject(PLATFORM_ID);
      const isBrowser = isPlatformBrowser(platformId);
      const httpLink = inject(HttpLink);

      const apolloConfig: ApolloClientOptions<unknown> = {
        cache: config.cache,
        ssrMode: config.ssr,
        devtools: {
          enabled: isBrowser,
        },
      };

      if (config.link) {
        apolloConfig.link = httpLink.create({
          uri: config.link.uri,
        });
      }

      return apolloConfig;
    }),

    {
      provide: ApolloCacheService,
      useFactory: () => {
        if (config.persistence) {
          return new ApolloCacheService();
        }
        return null;
      },
    },

    config.persistence?.initializer
      ? provideAppInitializer(() => {
          const platformId = inject(PLATFORM_ID);
          const isBrowser = isPlatformBrowser(platformId);
          if (!isBrowser) {
            return Promise.resolve();
          }
          const cacheService = inject(ApolloCacheService);
          const storage = config.persistence!.storage();
          return cacheService?.init(storage);
        })
      : [],
  ]);
}
