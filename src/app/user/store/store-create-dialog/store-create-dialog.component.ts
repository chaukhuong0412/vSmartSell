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

  title;
  storeCode;
  phoneNumber;
  address;
  companyId;
  companies: Company[];

  constructor(public dialogRef: MatDialogRef<StoreCreateDialogComponent>,
    private _CompanyService: CompanyService, private _storeService: StoreService) { }

  ngOnInit() {
    this._CompanyService.getListCompanys().subscribe(result => {
      this.companies = result;
    });
  }

  createStore() {
    var store = {
      title:this.title,
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
