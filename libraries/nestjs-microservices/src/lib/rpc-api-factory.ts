import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

type RpcContract = {
  Request: unknown;
  Response: unknown;
};

export type ExtractContracts<TNamespace> = {
  [K in keyof TNamespace]: TNamespace[K];
};

export function createRpcApi<
  Patterns extends Record<string, string>,
  Contracts extends Record<string, RpcContract>,
>(client: ClientProxy, patterns: Patterns) {
  const api = {} as {
    [K in keyof Contracts]: (
      payload: Contracts[K]['Request'],
      mode?: 'send' | 'emit',
    ) => Observable<Contracts[K]['Response']>;
  };

  for (const key in patterns) {
    api[key as keyof Contracts] = ((
      payload: any,
      mode: 'send' | 'emit' = 'send',
    ) => {
      if (mode === 'send') return client.send(patterns[key], payload);

      return client.emit(patterns[key], payload);
    }) as any;
  }

  return api;
}
