import { EventEmitter } from '@angular/core';
import { ApolloTestingController } from 'apollo-angular/testing';

/**
 * Subscribes to an EventEmitter and flushes a mocked Apollo mutation response.
 * Resolves once the event is emitted with the expected result.
 *
 * @template T - The expected shape of the GraphQL mutation response
 * @param event - The EventEmitter to subscribe to (e.g. formSubmitted)
 * @param controller - ApolloTestingController from ApolloTestingModule
 * @param expectedOpName - The name of the GraphQL mutation to expect
 * @param response - The mocked response to flush into the mutation
 */
export function expectApolloMutationEvent<T extends { [key: string]: any }>(
  event: EventEmitter<T>,
  controller: ApolloTestingController,
  expectedOpName: string,
  response: T,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    event.subscribe({
      next: (data: T) => {
        expect(data).toEqual(response);
        resolve();
      },
      error: reject,
    });

    const op = controller.expectOne(expectedOpName);
    op.flush({ data: response });
  });
}
