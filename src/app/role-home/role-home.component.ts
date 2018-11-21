import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import {ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-role-home',
  templateUrl: './role-home.component.html',
  styleUrls: ['./role-home.component.css'],
  providers: [RoleService]
})
export class RoleHomeComponent implements OnInit {
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  displayedColumns: string[] = ['id', 'name', 'action' ];
  dataSource: object[];

  columnsToDisplay = ['name', 'path'];
  
  users;

  constructor(private _roleService: RoleService, public dialog: MatDialog) { }

  ngOnInit() {
    this._roleService.getListRoles().subscribe( result => {
      this.dataSource = result;
    });
  }

  delete(id) {
    this._roleService.deleteRole(id).subscribe(result => {
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
