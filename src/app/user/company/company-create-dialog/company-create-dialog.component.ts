import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../company.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Store, StoreService } from '../../store/store.service';

@Component({
  selector: 'app-company-create-dialog',
  templateUrl: './company-create-dialog.component.html',
  styleUrls: ['./company-create-dialog.component.scss'],
  providers: [CompanyService, StoreService]
})
export class CompanyCreateDialogComponent implements OnInit {

  companyTitle;
  address;
  phoneNumber;
  numberOfAccountAllowed: number;
  // regions: Region[];
  // selectedRegions;
  loopError = false;

  constructor(public dialogRef: MatDialogRef<CompanyCreateDialogComponent>,
    private _companyService: CompanyService,
    private _storeService: StoreService,
    private router: Router) { }

  ngOnInit() {
  }

  createCompany() {

    var company = {
      title: this.companyTitle,
      address: this.address,
      phoneNumber: this.phoneNumber,
      numberOfAccountAllowed: this.numberOfAccountAllowed
    }

    this._companyService.createCompany(company).subscribe((result) => {
      this.dialogRef.close("Create");
    },
      error => {
        alert(error);
      });
  }

  cancel() {
    this.dialogRef.close();
  }

}
