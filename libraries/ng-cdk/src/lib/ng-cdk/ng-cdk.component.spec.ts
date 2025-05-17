import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgCdkComponent } from './ng-cdk.component';

describe('NgCdkComponent', () => {
  let component: NgCdkComponent;
  let fixture: ComponentFixture<NgCdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgCdkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
