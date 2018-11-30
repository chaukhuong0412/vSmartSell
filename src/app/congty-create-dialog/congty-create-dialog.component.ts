import { Component, OnInit } from '@angular/core';
import { CongtyService, CongTy } from '../congty.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-congty-create-dialog',
  templateUrl: './congty-create-dialog.component.html',
  styleUrls: ['./congty-create-dialog.component.scss'],
  providers: [CongtyService]
})
export class CongtyCreateDialogComponent implements OnInit {

  tenCongTy;
  congTyChaId;
  congTys: CongTy[];
  selectedCongTyCons;

  constructor(public dialogRef: MatDialogRef<CongtyCreateDialogComponent>,
    private _congTyService: CongtyService, private router: Router) { }

  ngOnInit() {
    this._congTyService.getListCongTys().subscribe(result => {
      this.congTys = result;
    });
  }

  createRole() {
    var congTy = {
      tenCongTy:this.tenCongTy,
      congTyChaId: this.congTyChaId,
      congTyConIds: this.selectedCongTyCons
    }
    this._congTyService.createCongTy(congTy).subscribe((result) => {
      this.dialogRef.close("Create");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
