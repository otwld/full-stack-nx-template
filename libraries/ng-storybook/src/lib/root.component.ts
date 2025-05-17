import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-root',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`
})
export class StorybookRootComponent {}
