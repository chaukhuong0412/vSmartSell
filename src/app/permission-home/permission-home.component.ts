import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import {ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-home-permission',
  templateUrl: './permission-home.component.html',
  styleUrls: ['./permission-home.component.css'],
  providers: [PermissionService]
})
export class PermissionHomeComponent implements OnInit {
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;


  displayedColumns: string[] = ['id', 'name', 'action' ];
  dataSource: object[];

  columnsToDisplay = ['name', 'path'];
  
  users;

  constructor(private _permissionService: PermissionService, public dialog: MatDialog) { }

  ngOnInit() {
    this._permissionService.getListPermissions().subscribe( result => {
      this.dataSource = result;
    });
  }

  delete(id) {
    this._permissionService.deletePermission(id).subscribe(result => {
      this.ngOnInit();
    });
  }

  openConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delete(id);
      }
      this.dialogRef = null;
    });
  }

}
