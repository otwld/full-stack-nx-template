import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { persistCache, PersistentStorage } from 'apollo3-cache-persist';

@Injectable()
export class ApolloCacheService {
  private readonly cache = inject(Apollo).client.cache;

  init(storage: PersistentStorage<string>) {
    return persistCache({
      cache: this.cache,
      storage,
    });
  }
}
