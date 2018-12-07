import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ReqModelGetListStore, CuahangService, ESortField } from 'src/app/cuahang.service';
import { CuahangCreateDialogComponent } from '../cuahang-create-dialog/cuahang-create-dialog.component';
import { CuahangEditDialogComponent } from '../cuahang-edit-dialog/cuahang-edit-dialog.component';

@Component({
  selector: 'app-cuahang-home',
  templateUrl: './cuahang-home.component.html',
  styleUrls: ['./cuahang-home.component.scss']
})
export class CuahangHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogEditRef:  MatDialogRef<CuahangEditDialogComponent>;
  dialogCreateRef: MatDialogRef<CuahangCreateDialogComponent>;


  index = 1;
  pageIndex = 1;
  pageSize = 10;
  totalCuaHang;
  searchString = "";
  cuaHangs;
  dataFiltered: object[];
  sortField: string;
  reqModelGetListStore: ReqModelGetListStore;

  constructor(private _cuaHangService: CuahangService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reqModelGetListStore = {
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
    this._cuaHangService.getNumberOfCuaHangsWithSearchString(this.searchString).subscribe(result => {
      this.totalCuaHang = result;
    })
    this._cuaHangService.getListCuaHangOrderBy(this.reqModelGetListStore).subscribe(result => {
      this.cuaHangs = result;
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
    this._cuaHangService.deleteCuaHang(id).subscribe(result => {
      this.ngOnInit();
    });
  }

  sortByTenCongTy() {
    if (this.reqModelGetListStore.sortField == ESortField.Name)
      this.reqModelGetListStore.isAscending = !this.reqModelGetListStore.isAscending;
    else {
      this.reqModelGetListStore.sortField = ESortField.Name;
      this.reqModelGetListStore.isAscending = true;
    }
    this.update();
  }

  pageIndexChange() {
    this.reqModelGetListStore.pageIndex = this.pageIndex - 1;
    this.update();
  }

  pageSizeChange() {
    this.reqModelGetListStore.pageSize = this.pageSize;
    this.update();
  }

  search() {
      this.reqModelGetListStore.searchString = this.searchString;
      this.reqModelGetListStore.pageIndex = 0;
      this.pageIndex = 0;
      this.update();
  }

  openCreateCuaHangDialog() {
    this.dialogCreateRef = this.dialog.open(CuahangCreateDialogComponent, {
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

  
  openDeleteConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Bạn có muốn xóa cửa hàng này không?"
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogRef = null;
    });
  }

  openEditCuaHangDialog(id) {
    this.dialogEditRef = this.dialog.open(CuahangEditDialogComponent, {
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
  


}
