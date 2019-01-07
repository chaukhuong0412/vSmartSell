import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { SupplierService } from 'src/app/supplier.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-edit-dialog',
  templateUrl: './supplier-edit-dialog.component.html',
  styleUrls: ['./supplier-edit-dialog.component.scss']
})
export class SupplierEditDialogComponent implements OnInit {

  name;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<SupplierEditDialogComponent>, 
              private _supplierService: SupplierService, private router: Router) { }

  ngOnInit() {
    
    this._supplierService.getSupplier(this.data.id).subscribe( result => {
      this.name = result.name;
    });
  }

  save() {
    var supplier = {
      id: this.data.id,
      name: this.name
    }
    this._supplierService.editSupplier(supplier).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
