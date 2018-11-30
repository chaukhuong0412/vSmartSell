import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { RoleService, ReqModelGetListRole, ESortField } from '../role.service';
import {ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RoleCreateDialogComponent } from '../role-create-dialog/role-create-dialog.component';
import { RoleEditDialogComponent } from '../role-edit-dialog/role-edit-dialog.component';


@Component({
  selector: 'app-role-home',
  templateUrl: './role-home.component.html',
  styleUrls: ['./role-home.component.css'],
  providers: [RoleService]
})
export class RoleHomeComponent implements  OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogCreateRef: MatDialogRef<RoleCreateDialogComponent>;
  dialogEditRef:  MatDialogRef<RoleEditDialogComponent>;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  index = 1;
  pageIndex = 1;
  pageSize = 10;
  totalRole;
  searchString = "";
  roles;
  dataFiltered: object[];
  sortField: string;
  reqModelGetListRole: ReqModelGetListRole;

  constructor(private _roleService: RoleService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reqModelGetListRole = {
      sortField: ESortField.Name,
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
        lengthMenu: "Hiển thị _MENU_ vai trò",
        info: "Hiển thị vai trò _START_ tới _END_ trong tổng số _TOTAL_ vai trò",
        infoEmpty: "Hiển thị vai trò 0 tới 0 trong tổng số 0 vai trò",
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

  update() {
    this._roleService.getNumberOfRolesWithSearchString(this.searchString).subscribe(result => {
      this.totalRole = result;
    })
    this._roleService.getListRoleOrderBy(this.reqModelGetListRole).subscribe(result => {
      this.roles = result;
      console.log(result.length);
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
    this._roleService.deleteRole(id).subscribe(result => {
      this.ngOnInit();
    });
  }

  openCreateRoleDialog() {
    this.dialogCreateRef = this.dialog.open(RoleCreateDialogComponent, {
      disableClose: false,
      width: '745px',
    });
    this.dialogCreateRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.update();
      }
      this.dialogCreateRef = null;
    });
  }

  openEditRoleDialog(id) {
    this.dialogEditRef = this.dialog.open(RoleEditDialogComponent, {
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
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Bạn có muốn xóa vai trò này không?"
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogRef = null;
    });
  }

  sortByName() {
    if (this.reqModelGetListRole.sortField == ESortField.Name)
      this.reqModelGetListRole.isAscending = !this.reqModelGetListRole.isAscending;
    else {
      this.reqModelGetListRole.sortField = ESortField.Name;
      this.reqModelGetListRole.isAscending = true;
    }
    this.update();
  }

  pageIndexChange() {
    this.reqModelGetListRole.pageIndex = this.pageIndex - 1;
    this.update();
  }

  pageSizeChange() {
    this.reqModelGetListRole.pageSize = this.pageSize;
    this.update();
  }

  search() {
      this.reqModelGetListRole.searchString = this.searchString;
      this.reqModelGetListRole.pageIndex = 0;
      this.pageIndex = 0;
      this.update();

  }

}
