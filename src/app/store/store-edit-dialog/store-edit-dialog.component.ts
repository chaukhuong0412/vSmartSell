import { Component, OnInit, Inject } from '@angular/core';
import { Company, CompanyService } from 'src/app/company.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoreService } from 'src/app/store.service';
import { Region, RegionService } from 'src/app/region.service';

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
    private _cuaHangService: StoreService) { }

  ngOnInit() {

    this._congTyService.getListCongTys().subscribe(result => {
      this.companies = result;

      this._cuaHangService.getCuaHang(this.data.id).subscribe(result => {
        this.name = result.name;
        this.storeCode = result.storeCode;
        this.phoneNumber = result.phoneNumber;
        this.address = result.address;
        this.companyId = result.companyId;
      });
    });
  }

  save() {
    var cuaHang = {
      id: this.data.id,
      name:this.name,
      storeCode: this.storeCode,
      phoneNumber: this.phoneNumber,
      address: this.address,
      companyId: this.companyId
    }
    this._cuaHangService.editCuaHang(cuaHang).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
