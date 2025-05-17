import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Fills a reactive form control by setting the value and dispatching an input event.
 *
 * @template T - The type of the HTML element (defaults to HTMLInputElement)
 * @param fixture - The ComponentFixture of the host component
 * @param controlName - The name of the FormControl to target
 * @param value - The value to assign to the input
 */
export function fillFormControl<T extends HTMLInputElement>(
  fixture: ComponentFixture<unknown>,
  controlName: string,
  value: string,
): void {
  const input = fixture.debugElement.query(
    By.css(`[formControlName="${controlName}"]`),
  ).nativeElement as T;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}
