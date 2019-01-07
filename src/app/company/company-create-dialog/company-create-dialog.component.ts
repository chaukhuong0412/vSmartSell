import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from 'src/app/company.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Store, StoreService } from 'src/app/store.service';
import { Region, RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-company-create-dialog',
  templateUrl: './company-create-dialog.component.html',
  styleUrls: ['./company-create-dialog.component.scss'],
  providers: [CompanyService, StoreService]
})
export class CompanyCreateDialogComponent implements OnInit {

  tenCongTy;
  address;
  phoneNumber;
  numberOfAccountAllowed: number;
  // regions: Region[];
  // selectedRegions;
  loopError = false;

  constructor(public dialogRef: MatDialogRef<CompanyCreateDialogComponent>,
    private _congTyService: CompanyService,
    private _cuaHangService: StoreService,
    private _regionService: RegionService,
    private router: Router) { }

  ngOnInit() {
  }

  createCongTy() {

    var congTy = {
      name: this.tenCongTy,
      address: this.address,
      phoneNumber: this.phoneNumber,
      numberOfAccountAllowed: this.numberOfAccountAllowed
    }

    this._congTyService.createCongTy(congTy).subscribe((result) => {
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
