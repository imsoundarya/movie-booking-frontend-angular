import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSuccessDialogComponent } from './delete-success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

fdescribe('DeleteSuccessDialogComponent', () => {
  let component: DeleteSuccessDialogComponent;
  let fixture: ComponentFixture<DeleteSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSuccessDialogComponent],
      imports: [MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
