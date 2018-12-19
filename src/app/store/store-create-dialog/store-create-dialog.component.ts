import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { CompanyService, Company } from 'src/app/company.service';
import { MatDialogRef } from '@angular/material';
import { Region, RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-store-create-dialog',
  templateUrl: './store-create-dialog.component.html',
  styleUrls: ['./store-create-dialog.component.scss'],
  providers: [StoreService, CompanyService]
})
export class StoreCreateDialogComponent implements OnInit {

  name;
  companyId;
  companies: Company[];

  constructor(public dialogRef: MatDialogRef<StoreCreateDialogComponent>,
    private _congTyService: CompanyService, private _cuaHangService: StoreService) { }

  ngOnInit() {
    this._congTyService.getListCongTys().subscribe(result => {
      this.companies = result;
    });
  }

  createCuaHang() {
    var cuaHang = {
      name:this.name,
      companyId: this.companyId,
    }
    this._cuaHangService.createCuaHang(cuaHang).subscribe((result) => {
      this.dialogRef.close("Create");
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
