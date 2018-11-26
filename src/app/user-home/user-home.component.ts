import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService, User } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';





@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [UserService]
})
export class UserHomeComponent implements AfterViewInit, OnDestroy, OnInit  {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogCreateRef: MatDialogRef<UserCreateDialogComponent>;


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();



  columnsToDisplay = ['name', 'path'];

  index = 1;
  users;
  dataFiltered: object[];

  sortField :string;

  constructor(private _userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this._userService.getListUser().subscribe(result => {
      this.users = result;
    });
    this.dtOptions = {
      ordering: false,
      language: {
        processing:     "Đang xử lý",
        search:         "Tìm kiếm",
        lengthMenu:    "Hiển thị _MENU_ tài khoản",
        info:           "Hiển thị tài khoản _START_ tới _END_ trong tổng số _TOTAL_ tài khoản",
        infoEmpty:      "Hiển thị tài khoản 0 tới 0 trong tổng số 0 tài khoản",
        paginate: {
            first:      "Premier",
            previous:   "Lùi",
            next:       "Tới",
            last:       "Cuối"
        }
      }
    };
    this.rerender();
  }

  ngAfterViewInit(): void {this.dtTrigger.next();}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();     
   });
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

  
  openCreateUserDialog() {
    this.dialogCreateRef = this.dialog.open(UserCreateDialogComponent, {
      disableClose: false,
      width: '745px',
    });
    this.dialogCreateRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.ngOnInit();
      }
      this.dialogCreateRef = null;
    });
  }


  openDeleteConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Are you sure you want to delete this user?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogConfirmationRef = null;
    });
  }

  openResetPasswordConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Are you sure you want to reset password for this user?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetPassword(id);
      }
      this.dialogConfirmationRef = null;
    });
  }

  openDeactivateConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Are you sure you want to deactivate this user?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.deactivate(id);
      }
      this.dialogConfirmationRef = null;
    });
  }

  openActivateConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Are you sure you want to activate this user?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.activate(id);
      }
      this.dialogConfirmationRef = null;
    });
  }


  sortByUserName() {
    if (this.sortField == 'userName')
      this.sortField = 'userName_desc';
    else 
      this.sortField = 'userName';
    this.sort();
  }

  sortByFullName() {
    if (this.sortField == 'fullName')
      this.sortField = 'fullName_desc';
    else
      this.sortField = 'fullName';
    this.sort();
  }

  sortById() {
    this.sortField = 'id';
    this.sort();
  }

  sort() {
    this._userService.getListUserOrderBy(this.sortField).subscribe(result => {
      this.users = result;
    });
    this.rerender();
  }



}


