import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../user/user/user.service';
import { SupplierService } from 'src/app/warehouse/supplier/supplier.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/app/warehouse/warehouse/warehouse.service';

@Component({
  selector: 'app-warehouse-edit-dialog',
  templateUrl: './warehouse-edit-dialog.component.html',
  styleUrls: ['./warehouse-edit-dialog.component.scss']
})
export class WarehouseEditDialogComponent implements OnInit {

  name;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<WarehouseEditDialogComponent>, 
              private _warehouseService: WarehouseService, private router: Router) { }

  ngOnInit() {
    
    this._warehouseService.getWarehouse(this.data.id).subscribe( result => {
      this.name = result.name;
    });
  }

  save() {
    var warehouse = {
      id: this.data.id,
      name: this.name
    }
    this._warehouseService.editWarehouse(warehouse).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}