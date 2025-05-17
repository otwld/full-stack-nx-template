import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CreateUserGQL,
  CreateUserMutation,
  CreateUserMutationVariables,
} from '@agency-quest/ng-apollo';

export type FormGroupOf<T extends object> = {
  [K in keyof T]: FormControl<T[K]>;
};

export type IUpsertUserForm = FormGroupOf<
  CreateUserMutationVariables['createUserInput']
>;

@Component({
  selector: 'app-upsert-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upsert-user.form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UpsertUserForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly createUserGQL = inject(CreateUserGQL);

  @Output() formSubmitted = new EventEmitter<CreateUserMutation>();
  @Output() formError = new EventEmitter<Error>();

  protected readonly form = this.fb.group<IUpsertUserForm>({
    name: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
  });

  protected isSubmitting = false;

  protected onSubmit(): void {
    console.info('submit !', this.form.value);
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.createUserGQL
      .mutate({
        createUserInput: this.form.getRawValue(),
      }, {useMutationLoading: true})
      .subscribe({
        next: (result) => {
          this.isSubmitting = false;
          console.info(result);
          if (result.data) {
            this.formSubmitted.emit(result.data);
            this.form.reset();
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.formError.emit(error);
        },
      });
  }
}
