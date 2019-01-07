import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-store-config-create-dialog',
  templateUrl: './store-config-create-dialog.component.html',
  styleUrls: ['./store-config-create-dialog.component.scss']
})
export class StoreConfigCreateDialogComponent implements OnInit {

  key;
  value;
  description;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<StoreConfigCreateDialogComponent>,
    private _storeService: StoreService) { }

  ngOnInit() {
  }

  createConfig() {
    var config = {
      key: this.key,
      value: this.value,
      description: this.description,
      storeId: this.data.id
    }
    this._storeService.createStoreConfig(config).subscribe((result) => {
      this.dialogRef.close("Create");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
