import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/supplier.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-supplier-create-dialog',
  templateUrl: './supplier-create-dialog.component.html',
  styleUrls: ['./supplier-create-dialog.component.scss']
})
export class SupplierCreateDialogComponent implements OnInit {

  name: string;

  constructor(public dialogRef: MatDialogRef<SupplierCreateDialogComponent>,private _supplierService: SupplierService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  createSupplier() {
    var supplier = {
      name: this.name
    };
    this._supplierService.createSupplier(supplier).subscribe(res => {
      this.dialogRef.close("Create");
    })
  }

}
