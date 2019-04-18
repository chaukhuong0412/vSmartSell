import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/warehouse/supplier/supplier.service';
import { MatDialogRef } from '@angular/material';
import { WarehouseService } from 'src/app/warehouse/warehouse/warehouse.service';

@Component({
  selector: 'app-warehouse-create-dialog',
  templateUrl: './warehouse-create-dialog.component.html',
  styleUrls: ['./warehouse-create-dialog.component.scss']
})
export class WarehouseCreateDialogComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<WarehouseCreateDialogComponent>, private _warehouseService: WarehouseService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  createWarehouse() {
    var warehouse = {
      title: this.title
    };
    this._warehouseService.createWarehouse(warehouse).subscribe(res => {
      this.dialogRef.close("Create");
    })
  }

}