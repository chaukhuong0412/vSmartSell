import { Component, OnInit } from '@angular/core';
import { CuahangService } from 'src/app/cuahang.service';
import { CongtyService, Company } from 'src/app/congty.service';
import { MatDialogRef } from '@angular/material';
import { Region, RegionService } from 'src/app/region.service';

@Component({
  selector: 'app-cuahang-create-dialog',
  templateUrl: './cuahang-create-dialog.component.html',
  styleUrls: ['./cuahang-create-dialog.component.scss'],
  providers: [CuahangService, CongtyService]
})
export class CuahangCreateDialogComponent implements OnInit {

  name;
  regionId;
  regions: Region[];

  constructor(public dialogRef: MatDialogRef<CuahangCreateDialogComponent>,
    private _regionService: RegionService, private _cuaHangService: CuahangService) { }

  ngOnInit() {
    this._regionService.getListRegions().subscribe(result => {
      this.regions = result;
    });
  }

  createCuaHang() {
    var cuaHang = {
      name:this.name,
      regionId: this.regionId,
    }
    this._cuaHangService.createCuaHang(cuaHang).subscribe((result) => {
      this.dialogRef.close("Create");
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
