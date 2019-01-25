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
  totalCompany;
  searchString = "";
  companys;
  dataFiltered: object[];
  sortField: string;
  reqModelGetListCompany: ReqModelGetListCompany;

  constructor(private _companyService: CompanyService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reqModelGetListCompany = {
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
    this._companyService.getNumberOfCompanysWithSearchString(this.searchString).subscribe(result => {
      this.totalCompany = result;
    })
    this._companyService.getListCompanyOrderBy(this.reqModelGetListCompany).subscribe(result => {
      this.companys = result;
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
    this._companyService.deleteCompany(id).subscribe(result => {
      this.ngOnInit();
    });
  }

  sortByTenCompany() {
    if (this.reqModelGetListCompany.sortField == ESortField.Name)
      this.reqModelGetListCompany.isAscending = !this.reqModelGetListCompany.isAscending;
    else {
      this.reqModelGetListCompany.sortField = ESortField.Name;
      this.reqModelGetListCompany.isAscending = true;
    }
    this.update();
  }

  pageIndexChange() {
    this.reqModelGetListCompany.pageIndex = this.pageIndex - 1;
    this.update();
  }

  pageSizeChange() {
    this.reqModelGetListCompany.pageSize = this.pageSize;
    this.update();
  }

  search() {
      this.reqModelGetListCompany.searchString = this.searchString;
      this.reqModelGetListCompany.pageIndex = 0;
      this.pageIndex = 0;
      this.update();

  }

  openCreateCompanyDialog() {
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

  openEditCompanyDialog(id) {
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
