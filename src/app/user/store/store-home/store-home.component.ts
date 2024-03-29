import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ReqModelGetListStore, StoreService, ESortField } from '../store.service';
import { StoreCreateDialogComponent } from '../store-create-dialog/store-create-dialog.component';
import { StoreEditDialogComponent } from '../store-edit-dialog/store-edit-dialog.component';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.scss']
})
export class StoreHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogEditRef:  MatDialogRef<StoreEditDialogComponent>;
  dialogCreateRef: MatDialogRef<StoreCreateDialogComponent>;


  index = 1;
  pageIndex = 1;
  pageSize = 10;
  totalStore;
  searchString = "";
  stores;
  dataFiltered: object[];
  sortField: string;
  reqModelGetListStore: ReqModelGetListStore;

  constructor(private _storeService: StoreService, public dialog: MatDialog) { }

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
      language: Config.tableInformation

    };
    this.update();
  }

  update() {
    this._storeService.getNumberOfStoresWithSearchString(this.searchString).subscribe(result => {
      this.totalStore = result;
    })
    this._storeService.getListStoreOrderBy(this.reqModelGetListStore).subscribe(result => {
      this.stores = result;
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
    this._storeService.deleteStore(id).subscribe(result => {
      this.ngOnInit();
    });
  }

  sortByStoreName() {
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

  openCreateStoreDialog() {
    this.dialogCreateRef = this.dialog.open(StoreCreateDialogComponent, {
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

  openEditStoreDialog(id) {
    this.dialogEditRef = this.dialog.open(StoreEditDialogComponent, {
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
