import { Component, OnInit, Inject } from '@angular/core';
import { Company, CongtyService } from 'src/app/congty.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CuahangService } from 'src/app/cuahang.service';
import { Region, RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-cuahang-edit-dialog',
  templateUrl: './cuahang-edit-dialog.component.html',
  styleUrls: ['./cuahang-edit-dialog.component.scss']
})
export class CuahangEditDialogComponent implements OnInit {

  name;
  regionId;
  regions: Region[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<CuahangEditDialogComponent>,
    private _regionService: RegionService, 
    private _cuaHangService: CuahangService) { }

  ngOnInit() {
    this._regionService.getListRegions().subscribe(result => {
      this.regions = result;

      this._cuaHangService.getCuaHang(this.data.id).subscribe(result => {
        this.name = result.name;
        this.regionId = result.regionId;
      });
    });
  }

  save() {
    var cuaHang = {
      id: this.data.id,
      name:this.name,
      regionId: this.regionId
    }
    this._cuaHangService.editCuaHang(cuaHang).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
