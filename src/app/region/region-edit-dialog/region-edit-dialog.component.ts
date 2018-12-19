import { Component, OnInit, Inject } from '@angular/core';
import { Company, CompanyService } from 'src/app/company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StoreService } from 'src/app/store.service';
import { RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-region-edit-dialog',
  templateUrl: './region-edit-dialog.component.html',
  styleUrls: ['./region-edit-dialog.component.scss']
})
export class RegionEditDialogComponent implements OnInit {

  name;
  companyId: number;
  companies: Company[];
  // regions: Region[];
  // selectedRegions;
  loopError;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<RegionEditDialogComponent>,
    private _congTyService: CompanyService,
    private _cuaHangService: StoreService,
    private _regionService: RegionService) { }

  ngOnInit() {
    this._congTyService.getListCongTys().subscribe(result => {
      this.companies = result;
    });

    this._regionService.getRegion(this.data.id).subscribe(result => {
      this.name = result.name;
      this.companyId = result.companyId;
    })

  }



  save() {
      var region = {
        id: this.data.id,
        name: this.name,
        companyId: this.companyId
      }
      this._regionService.editRegion(region).subscribe((result) => {
        this.dialogRef.close("Edit");
      });

  }

  cancel() {
    this.dialogRef.close();
  }
}
