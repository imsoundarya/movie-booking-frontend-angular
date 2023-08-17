import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogComponent } from './error-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DeleteSuccessDialogComponent } from '../delete-success-dialog/delete-success-dialog.component';

fdescribe('ErrorDialogComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSuccessDialogComponent],
      imports: [MatDialogModule],
      providers: [
        // Add the MAT_DIALOG_DATA provider
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DeleteSuccessDialogComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
