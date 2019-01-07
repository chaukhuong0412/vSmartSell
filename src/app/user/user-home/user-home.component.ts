import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService, User, ReqModelGetListUser, ESortField } from 'src/app/user.service';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';





@Component({
  selector: 'app-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [UserService]
})
export class UserHomeComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogCreateRef: MatDialogRef<UserCreateDialogComponent>;
  dialogEditRef: MatDialogRef<UserEditDialogComponent>;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  index = 1;
  pageIndex = 1;
  pageSize = 10;
  totalUser;
  searchString = "";
  users;
  dataFiltered: object[];
  sortField: string;
  asc: boolean;
  reqModelGetListUser: ReqModelGetListUser;
  limitedUser;

  constructor(private _userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {

    this.reqModelGetListUser = {
      sortField: ESortField.UserName,
      isAscending: true,
      pageIndex: 0,
      pageSize: 10,
      searchString: ""
    }

    this.dtOptions = {
      ordering: false,
      paging: false,
      info:false,
      searching:false,
      language: {
        processing: "Đang xử lý",
        search: "Tìm kiếm",
        lengthMenu: "Hiển thị _MENU_ tài khoản",
        info: "Hiển thị tài khoản _START_ tới _END_ trong tổng số _TOTAL_ tài khoản",
        infoEmpty: "Hiển thị tài khoản 0 tới 0 trong tổng số 0 tài khoản",
        paginate: {
          first: "Premier",
          previous: "Lùi",
          next: "Tới",
          last: "Cuối"
        }
      }
    };
    this.update();
  }

  // getCompanyOrStoreName(user: User) {
  //   this._userService.getUser(user.userId).subscribe(result => {
  //     console.log(result);
  //   })
  //   return user;
  // } 

  update() {
    this._userService.getNumberOfUsersWithSearchString(this.searchString).subscribe(result => {
      this.totalUser = result;
    })
    this._userService.getListUserOrderBy(this.reqModelGetListUser).subscribe(result => {
      this.users = result;
      console.log(this.users);
      this.rerender();
    });
  }

  ngAfterViewInit(): void { this.dtTrigger.next(); }

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
      this.update();
    });
  }

  resetPassword(id) {
    this._userService.resetPassword(id).subscribe(result => {
      this.update();
    });
  }


  activate(id) {
    this._userService.activate(id).subscribe(result => {
      this.update();
    })
  }

  deactivate(id) {
    this._userService.deactivate(id).subscribe(result => {
      this.update();
    })
  }


  openCreateUserDialog() {
    this.dialogCreateRef = this.dialog.open(UserCreateDialogComponent, {
      disableClose: false,
      width: '880px',
    });
    this.dialogCreateRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.update();
      }
      this.dialogCreateRef = null;
    });
  }

  openEditUserDialog(id) {
    this.dialogEditRef = this.dialog.open(UserEditDialogComponent, {
      disableClose: false,
      width: '745px',
      data: {
        id: id
      }
    });
    this.dialogEditRef.afterClosed().subscribe(result => {
      if (result) {
        this.update();
      }
      this.dialogEditRef = null;
    });
  }


  openDeleteConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn xóa tài khoản này không?"
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
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn khôi phục mật khẩu cho tài khoản này không?"
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
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn khóa tài khoản này không?"
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
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn mở khóa tài khoản này không?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.activate(id);
      }
      this.dialogConfirmationRef = null;
    });
  }


  sortByUserName() {
    if (this.reqModelGetListUser.sortField == ESortField.UserName) {
      this.reqModelGetListUser.isAscending = !this.reqModelGetListUser.isAscending;
      this.sortField = "UserName";
      this.asc = this.reqModelGetListUser.isAscending;
    }
    else {
      this.reqModelGetListUser.sortField = ESortField.UserName;
      this.reqModelGetListUser.isAscending = true;
      this.sortField = "UserName";
      this.asc = this.reqModelGetListUser.isAscending;
    }
    this.update();
  }

  sortByFullName() {
    if (this.reqModelGetListUser.sortField == ESortField.FullName) {
      this.reqModelGetListUser.isAscending = !this.reqModelGetListUser.isAscending;
      this.sortField = "FullName";
      this.asc = this.reqModelGetListUser.isAscending;
    }
    else {
      this.reqModelGetListUser.sortField = ESortField.FullName;
      this.reqModelGetListUser.isAscending = true;
      this.sortField = "FullName";
      this.asc = this.reqModelGetListUser.isAscending;
    }
    this.update();
  }

  pageIndexChange() {
    this.reqModelGetListUser.pageIndex = this.pageIndex - 1;
    this.update();
  }

  
  pageSizeChange() {
    this.reqModelGetListUser.pageSize = this.pageSize;
    this.update();
  }

  search() {
      this.reqModelGetListUser.searchString = this.searchString;
      this.reqModelGetListUser.pageIndex = 0;
      this.pageIndex = 0;
      this.update();

  }

  setLimitation() {
    this._userService.setLimitation(this.limitedUser).subscribe(result => {
      console.log(result);
    })
  }

}


