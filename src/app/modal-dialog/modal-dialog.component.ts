import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../import-export/import-export.component';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {


  file:any;

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  fileChanged(e:any) {
    this.file = e.target.files[0];
    console.log("here")
    this.parseDocument(this.file);
}

parseDocument(e:any){
  let fileReader = new FileReader();

  fileReader.onload = (e) => {
    console.log(e.target?.result+"here");
  }

  fileReader.readAsText(this.file);



}

  ngOnInit() {
  }

}
