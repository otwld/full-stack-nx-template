import { componentWrapperDecorator, Preview } from '@storybook/angular';
import { StorybookRootComponent } from './root.component';

export const sbPreview = (): Preview => {
  return {
    decorators: [
      componentWrapperDecorator(StorybookRootComponent)
    ]
  }
}