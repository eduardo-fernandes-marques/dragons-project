import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {
  typeModal = '';
  confirmation = false;
  id = '';
  text = '';
  title = '';
  alert = '';

  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<ModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    close(): void {
      this.confirmation = false;
      this.dialogRef.close(this.confirmation);
    }

    confirm(): void {
      this.confirmation = true;
      this.dialogRef.close(this.confirmation);
    }
}
