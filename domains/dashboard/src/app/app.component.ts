import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SayHelloGQL } from '@full-stack-nestjs-template/ng-apollo';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dashboard';
  sayHello = inject(SayHelloGQL);

  constructor() {
    this.sayHello.fetch().subscribe()
  }
}
