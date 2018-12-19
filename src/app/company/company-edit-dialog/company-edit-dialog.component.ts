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
  congTyChaId;
  congTys: Company[];
  selectedCongTyCons;
  // regions: Region[];
  // selectedRegions;
  loopError;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CompanyEditDialogComponent>,
    private _congTyService: CompanyService,
    private _cuaHangService: StoreService,
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
    if (this.selectedCongTyCons != undefined && this.selectedCongTyCons.includes(this.congTyChaId)) {
      this.loopError = true;
    }
    else {
      var congTy = {
        id: this.data.id,
        name: this.tenCongTy,
        parentCompanyId: this.congTyChaId,
        daughterCompanyIds: this.selectedCongTyCons,
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
