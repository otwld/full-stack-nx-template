import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpsertUserForm } from './forms/upsert-user/upsert-user.form';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetAllUsersGQL } from '@agency-quest/ng-apollo';

@Component({
  imports: [RouterModule, UpsertUserForm],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dashboard';

  protected readonly users = toSignal(inject(GetAllUsersGQL).watch({}, {fetchPolicy: 'network-only'}).valueChanges)
}
