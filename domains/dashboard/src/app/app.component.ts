import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateUserGQL, GetUserByIdGQL } from '@agency-quest/ng-apollo';
import { switchMap, tap } from 'rxjs';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dashboard';
  createUserGQL = inject(CreateUserGQL);
  getUserByIdGQL = inject(GetUserByIdGQL);

  addUser() {
    const name = prompt('Username ?');
    if (!name) return;

    this.createUserGQL.mutate({ name }).pipe(
        switchMap((user) => {
          console.info('created user:', user);
          return this.getUserByIdGQL.fetch({ id: '1' });
        }),
        tap((user) => {
          console.info('user id 1:', user);
        }),
    ).subscribe();
  }
}
