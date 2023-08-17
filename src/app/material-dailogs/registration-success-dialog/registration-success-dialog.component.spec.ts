import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccessDialogComponent } from './registration-success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

fdescribe('RegistrationSuccessDialogComponent', () => {
  let component: RegistrationSuccessDialogComponent;
  let fixture: ComponentFixture<RegistrationSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationSuccessDialogComponent],
      imports: [MatDialogModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
