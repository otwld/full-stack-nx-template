import { ComponentFixture } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { ApolloTestingController } from 'apollo-angular/testing';
import { submitForm } from '../forms/submit-form';
import { expectApolloMutationEvent } from './expect-apollo-mutation-event';

/**
 * Same as `expectApolloMutationEvent`, but automatically triggers the form submission before flushing the mutation.
 *
 * @template T - The expected shape of the GraphQL mutation response
 * @param fixture - The ComponentFixture of the host component
 * @param event - The EventEmitter to subscribe to
 * @param controller - ApolloTestingController from ApolloTestingModule
 * @param expectedOpName - The name of the GraphQL mutation to expect
 * @param response - The mocked response to flush into the mutation
 */
export function expectApolloFormMutationEvent<T extends { [key: string]: any }>(
  fixture: ComponentFixture<unknown>,
  event: EventEmitter<T>,
  controller: ApolloTestingController,
  expectedOpName: string,
  response: T,
): Promise<void> {
  submitForm(fixture);
  return expectApolloMutationEvent(event, controller, expectedOpName, response);
}
