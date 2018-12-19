import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ReqModelGetListCompany, CompanyService, ESortField } from 'src/app/company.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CompanyCreateDialogComponent } from '../company-create-dialog/company-create-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { CompanyEditDialogComponent } from '../company-edit-dialog/company-edit-dialog.component';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogEditRef:  MatDialogRef<CompanyEditDialogComponent>;
  dialogCreateRef: MatDialogRef<CompanyCreateDialogComponent>;


  index = 1;
  pageIndex = 1;
  pageSize = 10;
  totalCongTy;
  searchString = "";
  congTys;
  dataFiltered: object[];
  sortField: string;
  reqModelGetListCongTy: ReqModelGetListCompany;

  constructor(private _congTyService: CompanyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reqModelGetListCongTy = {
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
        info: "Hiển thị công ty _START_ tới _END_ trong tổng số _TOTAL_ công ty",
        infoEmpty: "Hiển thị công ty 0 tới 0 trong tổng số 0 công ty",
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
    this._congTyService.getNumberOfCongTysWithSearchString(this.searchString).subscribe(result => {
      this.totalCongTy = result;
    })
    this._congTyService.getListCongTyOrderBy(this.reqModelGetListCongTy).subscribe(result => {
      this.congTys = result;
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
    this._congTyService.deleteCongTy(id).subscribe(result => {
      this.ngOnInit();
    });
  }

  sortByTenCongTy() {
    if (this.reqModelGetListCongTy.sortField == ESortField.Name)
      this.reqModelGetListCongTy.isAscending = !this.reqModelGetListCongTy.isAscending;
    else {
      this.reqModelGetListCongTy.sortField = ESortField.Name;
      this.reqModelGetListCongTy.isAscending = true;
    }
    this.update();
  }

  pageIndexChange() {
    this.reqModelGetListCongTy.pageIndex = this.pageIndex - 1;
    this.update();
  }

  pageSizeChange() {
    this.reqModelGetListCongTy.pageSize = this.pageSize;
    this.update();
  }

  search() {
      this.reqModelGetListCongTy.searchString = this.searchString;
      this.reqModelGetListCongTy.pageIndex = 0;
      this.pageIndex = 0;
      this.update();

  }

  openCreateCongTyDialog() {
    this.dialogCreateRef = this.dialog.open(CompanyCreateDialogComponent, {
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
    this.dialogRef.componentInstance.confirmMessage = "Bạn có muốn xóa công ty này không?"
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogRef = null;
    });
  }

  openEditCongTyDialog(id) {
    this.dialogEditRef = this.dialog.open(CompanyEditDialogComponent, {
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
