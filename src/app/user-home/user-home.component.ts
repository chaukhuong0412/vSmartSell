import { Component, OnInit } from '@angular/core';
import { UserService, User} from '../user.service';
import { HttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';




@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [UserService]
})
export class UserHomeComponent implements OnInit {

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;


  ELEMENT_DATA: User[] = [
    {userId: 0, userName: "", password: "", fullName:"", userStatus: "", roleIds: []}
  ]
  
  displayedColumns: string[] = ['id', 'userName', 'fullName', 'action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  columnsToDisplay = ['name', 'path'];
  
  index = 1;
  users;
  searchString;
  dataFiltered: object[];

  constructor(private _userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this._userService.getListUser().subscribe( result => {
      this.dataSource = new MatTableDataSource(result);
      this.users = result;
      ;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id) {
    this._userService.deleteUser(id).subscribe(result => {
      this.ngOnInit();
    });
  }

  resetPassword(id) {
    this._userService.resetPassword(id).subscribe(result => {
      this.ngOnInit();

    });
  }

  
  activate(id) {
    this._userService.activate(id).subscribe(result => {
      this.ngOnInit();
    })
  }

  deactivate(id) {
    this._userService.deactivate(id).subscribe(result => {
      this.ngOnInit();
    })
  }


  openDeleteConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this user?"
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delete(id);
      }
      this.dialogRef = null;
    });
  }

  openResetPasswordConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to reset password for this user?"
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.resetPassword(id);
      }
      this.dialogRef = null;
    });
  }

  openDeactivateConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to deactivate this user?"
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deactivate(id);
      }
      this.dialogRef = null;
    });
  }

  openActivateConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to activate this user?"
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.activate(id);
      }
      this.dialogRef = null;
    });
  }



}


