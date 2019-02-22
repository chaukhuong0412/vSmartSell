import { Component, OnInit, Inject } from '@angular/core';
import { Company, CompanyService } from '../../company/company.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-edit-dialog',
  templateUrl: './store-edit-dialog.component.html',
  styleUrls: ['./store-edit-dialog.component.scss']
})
export class StoreEditDialogComponent implements OnInit {

  name;
  storeCode;
  phoneNumber;
  address;
  companyId;
  companies: Company[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<StoreEditDialogComponent>,
    private _congTyService: CompanyService, 
    private _storeService: StoreService) { }

  ngOnInit() {
    console.log(this.data.id);
    this._congTyService.getListCompanys().subscribe(result => {
      this.companies = result;
      this._storeService.getStore(this.data.id).subscribe(result => {
        this.name = result.name;
        this.storeCode = result.storeCode;
        this.phoneNumber = result.phoneNumber;
        this.address = result.address;
        this.companyId = result.companyId;
      });
    });
  }

  save() {
    var store = {
      id: this.data.id,
      name:this.name,
      storeCode: this.storeCode,
      phoneNumber: this.phoneNumber,
      address: this.address,
      companyId: this.companyId
    }
    this._storeService.editStore(store).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
