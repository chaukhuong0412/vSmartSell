import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CompanyService, Company } from 'src/app/company.service';
import { Store, StoreService } from 'src/app/store.service';
import { Region, RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-company-edit-dialog',
  templateUrl: './company-edit-dialog.component.html',
  styleUrls: ['./company-edit-dialog.component.scss'],
  providers: [CompanyService, StoreService]
})
export class CompanyEditDialogComponent implements OnInit {

  congTy: Company;
  tenCongTy;
  address;
  phoneNumber;
  numberOfAccountAllowed;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CompanyEditDialogComponent>,
    private _congTyService: CompanyService,
    private _cuaHangService: StoreService,
    private _regionService: RegionService) { }

  ngOnInit() {
      this._congTyService.getCongTy(this.data.id).subscribe(result => {
        this.tenCongTy = result.name;
        this.address = result.address;
        this.phoneNumber = result.phoneNumber;
        this.numberOfAccountAllowed = result.numberOfAccountAllowed;
      });

  }



  save() {

      var congTy = {
        name: this.tenCongTy,
        address: this.address,
        phoneNumber: this.phoneNumber,
        numberOfAccountAllowed: this.numberOfAccountAllowed
      }
      this._congTyService.editCongTy(congTy).subscribe((result) => {
        this.dialogRef.close("Edit");
      });
    
  }

  cancel() {
    this.dialogRef.close();
  }
}
