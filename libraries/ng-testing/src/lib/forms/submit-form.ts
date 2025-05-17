import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Simulates submission of a form by triggering the ngSubmit event.
 *
 * @param fixture - The ComponentFixture of the host component
 */
export function submitForm(fixture: ComponentFixture<unknown>): void {
  const form = fixture.debugElement.query(By.css('form'));
  form.triggerEventHandler('ngSubmit');
  fixture.detectChanges();
}