import { Component, OnInit } from '@angular/core';
import { CongtyService, Company } from 'src/app/congty.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Store, CuahangService } from 'src/app/cuahang.service';
import { Region, RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-congty-create-dialog',
  templateUrl: './congty-create-dialog.component.html',
  styleUrls: ['./congty-create-dialog.component.scss'],
  providers: [CongtyService, CuahangService]
})
export class CongtyCreateDialogComponent implements OnInit {

  tenCongTy;
  congTyChaId: number;
  congTys: Company[];
  selectedCongTyCons: number[];
  // regions: Region[];
  // selectedRegions;
  loopError = false;

  constructor(public dialogRef: MatDialogRef<CongtyCreateDialogComponent>,
    private _congTyService: CongtyService, 
    private _cuaHangService: CuahangService, 
    private _regionService: RegionService,
    private router: Router) { }

  ngOnInit() {
    this._congTyService.getListCongTys().subscribe(result => {
      this.congTys = result;
    });

    // this._regionService.getListRegions().subscribe(result => {
    //   this.regions = result;
    // })
  }

  createCongTy() {
    if (this.selectedCongTyCons.includes(this.congTyChaId)) {
      this.loopError = true;
    }
    else {
      var congTy = {
        name: this.tenCongTy,
        parentCompanyId: this.congTyChaId,
        daughterCompanyIds: this.selectedCongTyCons,
        // regionIds: this.selectedRegions
      }
  
      this._congTyService.createCongTy(congTy).subscribe((result) => {
        this.dialogRef.close("Create");
      });
    }

  }

  cancel() {
    this.dialogRef.close();
  }

}
