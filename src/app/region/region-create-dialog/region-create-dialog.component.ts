import { Component, OnInit } from '@angular/core';
import { Company, CongtyService } from 'src/app/congty.service';
import { Store, CuahangService } from 'src/app/cuahang.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-region-create-dialog',
  templateUrl: './region-create-dialog.component.html',
  styleUrls: ['./region-create-dialog.component.scss']
})
export class RegionCreateDialogComponent implements OnInit {

  name;
  companyId: number;
  companies: Company[];
  // selectedStores: number[];
  // stores: Store[];
  loopError = false;

  constructor(public dialogRef: MatDialogRef<RegionCreateDialogComponent>,
    private _congTyService: CongtyService,
    private _cuaHangService: CuahangService, 
    private _regionService: RegionService,
    private router: Router) { }

  ngOnInit() {
    this._congTyService.getListCongTys().subscribe(result => {
      this.companies = result;
    });

    // this._cuaHangService.getListCuaHangs().subscribe(result => {
    //   this.stores = result;
    // })
  }

  createRegion() {
    // if (this.selectedCongTyCons.includes(this.congTyChaId)) {
    //   this.loopError = true;
    // }
    // else {
      var region = {
        name: this.name,
        companyId: this.companyId,
        // storeIds: this.selectedStores
      }
  
      this._regionService.createRegion(region).subscribe((result) => {
        this.dialogRef.close("Create");
      });
    // }

  }

  cancel() {
    this.dialogRef.close();
  }

}