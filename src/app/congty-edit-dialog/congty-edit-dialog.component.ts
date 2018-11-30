import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CongtyService, CongTy } from '../congty.service';

@Component({
  selector: 'app-congty-edit-dialog',
  templateUrl: './congty-edit-dialog.component.html',
  styleUrls: ['./congty-edit-dialog.component.scss'],
  providers: [CongtyService]
})
export class CongtyEditDialogComponent implements OnInit {

  congTy : CongTy;
  tenCongTy;
  congTyChaId;
  congTys: CongTy[];
  selectedCongTyCons = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CongtyEditDialogComponent>,
    private _congTyService: CongtyService) { }

  ngOnInit() {
    this._congTyService.getListCongTysExcept(this.data.id).subscribe(result => {
      this.congTys = result;
    });

    this._congTyService.getCongTy(this.data.id).subscribe(result => {
      this.tenCongTy = result.tenCongTy;
      this.congTyChaId = result.congTyChaId;
      this.selectedCongTyCons = result.congTyConIds;
      console.log(this.selectedCongTyCons);
      this.congTy = result;
    });


  }



  save() {
    var congTy = {
      id: this.data.id,
      tenCongTy: this.tenCongTy,
      congTyChaId: this.congTyChaId,
      congTyConIds: this.selectedCongTyCons
    }
    this._congTyService.editCongTy(congTy).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
    console.log(this.selectedCongTyCons);
  }
}
