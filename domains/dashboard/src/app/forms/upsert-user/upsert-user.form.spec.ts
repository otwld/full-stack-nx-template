import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpsertUserForm } from './upsert-user.form';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { CreateUserMutation } from '@agency-quest/ng-apollo';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  expectApolloFormMutationEvent,
  fillFormControl,
} from '@agency-quest/ng-testing';

describe('UpsertUserForm', () => {
  let component: UpsertUserForm;
  let fixture: ComponentFixture<UpsertUserForm>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, UpsertUserForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UpsertUserForm);
    component = fixture.componentInstance;
    controller = TestBed.inject(ApolloTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form and emit result', (ctx) => {
    const expectedData: CreateUserMutation = {
      createUser: {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        __typename: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true,
      },
    };

    fillFormControl(fixture, 'name', 'John Doe');
    fillFormControl(fixture, 'email', 'john@example.com');

    return expectApolloFormMutationEvent(
      fixture,
      component.formSubmitted,
      controller,
      'createUser',
      expectedData,
    );
  });
});
