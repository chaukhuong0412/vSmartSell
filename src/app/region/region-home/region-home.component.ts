import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ReqModelGetListRegion, RegionService, ESortField } from 'src/app/region.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { RegionCreateDialogComponent } from '../region-create-dialog/region-create-dialog.component';
import { RegionEditDialogComponent } from '../region-edit-dialog/region-edit-dialog.component';

@Component({
  selector: 'app-region-home',
  templateUrl: './region-home.component.html',
  styleUrls: ['./region-home.component.scss']
})
export class RegionHomeComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogEditRef:  MatDialogRef<RegionEditDialogComponent>;
  dialogCreateRef: MatDialogRef<RegionCreateDialogComponent>;


  index = 1;
  pageIndex = 1;
  pageSize = 10;
  totalRegion;
  searchString = "";
  regions;
  dataFiltered: object[];
  sortField: string;
  reqModelGetListRegion: ReqModelGetListRegion;

  constructor(private _regionService: RegionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.reqModelGetListRegion = {
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
    this._regionService.getNumberOfRegionsWithSearchString(this.searchString).subscribe(result => {
      this.totalRegion = result;
    })
    this._regionService.getListRegionOrderBy(this.reqModelGetListRegion).subscribe(result => {
      this.regions = result;
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
    this._regionService.deleteRegion(id).subscribe(result => {
      this.ngOnInit();
    });
  }

  sortByTenRegion() {
    if (this.reqModelGetListRegion.sortField == ESortField.Name)
      this.reqModelGetListRegion.isAscending = !this.reqModelGetListRegion.isAscending;
    else {
      this.reqModelGetListRegion.sortField = ESortField.Name;
      this.reqModelGetListRegion.isAscending = true;
    }
    this.update();
  }

  pageIndexChange() {
    this.reqModelGetListRegion.pageIndex = this.pageIndex - 1;
    this.update();
  }

  pageSizeChange() {
    this.reqModelGetListRegion.pageSize = this.pageSize;
    this.update();
  }

  search() {
      this.reqModelGetListRegion.searchString = this.searchString;
      this.reqModelGetListRegion.pageIndex = 0;
      this.pageIndex = 0;
      this.update();
  }

  openCreateRegionDialog() {
    this.dialogCreateRef = this.dialog.open(RegionCreateDialogComponent, {
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
    this.dialogRef.componentInstance.confirmMessage = "Bạn có muốn xóa khu vực này không?"
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogRef = null;
    });
  }

  openEditRegionDialog(id) {
    this.dialogEditRef = this.dialog.open(RegionEditDialogComponent, {
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
