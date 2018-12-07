import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CongtyService, Company } from 'src/app/congty.service';
import { Store, CuahangService } from 'src/app/cuahang.service';
import { Region, RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-congty-edit-dialog',
  templateUrl: './congty-edit-dialog.component.html',
  styleUrls: ['./congty-edit-dialog.component.scss'],
  providers: [CongtyService, CuahangService]
})
export class CongtyEditDialogComponent implements OnInit {

  congTy: Company;
  tenCongTy;
  congTyChaId;
  congTys: Company[];
  selectedCongTyCons;
  // regions: Region[];
  // selectedRegions;
  loopError;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CongtyEditDialogComponent>,
    private _congTyService: CongtyService,
    private _cuaHangService: CuahangService,
    private _regionService: RegionService) { }

  ngOnInit() {
    this._congTyService.getListCongTysExcept(this.data.id).subscribe(result => {
      this.congTys = result;

      this._congTyService.getCongTy(this.data.id).subscribe(result => {
        this.tenCongTy = result.name;
        this.congTyChaId = result.parentCompanyId;
        this.selectedCongTyCons = result.daughterCompanyIds;
        // this.selectedRegions = result.regionIds;
      });

    });
  }



  save() {
    if (this.selectedCongTyCons.includes(this.congTyChaId)) {
      this.loopError = true;
    }
    else {
      var congTy = {
        id: this.data.id,
        name: this.tenCongTy,
        parentCompanyId: this.congTyChaId,
        daughterCompanyIds: this.selectedCongTyCons,
        // regionIds: this.selectedRegions
      }
      this._congTyService.editCongTy(congTy).subscribe((result) => {
        this.dialogRef.close("Edit");
      });
    }
  }

  cancel() {
    this.dialogRef.close();
    console.log(this.selectedCongTyCons);
  }
}
