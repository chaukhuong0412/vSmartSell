import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { CompanyService, Company } from '../../company/company.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-store-create-dialog',
  templateUrl: './store-create-dialog.component.html',
  styleUrls: ['./store-create-dialog.component.scss'],
  providers: [StoreService, CompanyService]
})
export class StoreCreateDialogComponent implements OnInit {

  name;
  storeCode;
  phoneNumber;
  address;
  companyId;
  companies: Company[];

  constructor(public dialogRef: MatDialogRef<StoreCreateDialogComponent>,
    private _congTyService: CompanyService, private _storeService: StoreService) { }

  ngOnInit() {
    this._congTyService.getListCompanys().subscribe(result => {
      this.companies = result;
    });
  }

  createStore() {
    var store = {
      name:this.name,
      storeCode: this.storeCode,
      phoneNumber: this.phoneNumber,
      address: this.address,
      companyId: this.companyId,
    }
    this._storeService.createStore(store).subscribe((result) => {
      this.dialogRef.close("Create");
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
