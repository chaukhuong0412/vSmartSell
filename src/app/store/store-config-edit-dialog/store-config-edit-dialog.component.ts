import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-store-config-edit-dialog',
  templateUrl: './store-config-edit-dialog.component.html',
  styleUrls: ['./store-config-edit-dialog.component.scss']
})
export class StoreConfigEditDialogComponent implements OnInit {

  key;
  value;
  description;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<StoreConfigEditDialogComponent>,
    private _storeService: StoreService) { }

  ngOnInit() {
    this._storeService.getStoreConfig(this.data.id).subscribe(result => {
      this.key = result.key;
      this.value = result.value;
      this.description = result.description;
    })
  }

  save() {
    var config = {
      id: this.data.id,
      key: this.key,
      value: this.value,
      description: this.description,
      storeId: this.data.id
    }
    this._storeService.editStoreConfig(config).subscribe((result) => {
      this.dialogRef.close("Create");
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
