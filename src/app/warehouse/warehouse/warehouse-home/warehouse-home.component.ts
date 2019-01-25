import { Component, OnInit, ViewChild } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SupplierService, ReqModelGetListSupplier, ESortField } from 'src/app/supplier.service';
import { WarehouseService, ReqModelGetListWarehouse } from 'src/app/warehouse.service';
import { Subject } from 'rxjs';
import { WarehouseCreateDialogComponent } from '../warehouse-create-dialog/warehouse-create-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { WarehouseEditDialogComponent } from '../warehouse-edit-dialog/warehouse-edit-dialog.component';

@Component({
  selector: 'app-warehouse-home',
  templateUrl: './warehouse-home.component.html',
  styleUrls: ['./warehouse-home.component.scss']
})
export class WarehouseHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dialogCreateRef: MatDialogRef<WarehouseCreateDialogComponent>;
  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogEditRef: MatDialogRef<WarehouseEditDialogComponent>;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  index = 1;
  pageIndex = 1;
  pageSize = 10;
  searchString = "";
  warehouses;
  dataFiltered: object[];
  sortField: string;
  asc: boolean;
  ReqModelGetListWarehouse: ReqModelGetListWarehouse;

  warehouseList;

  constructor(public dialog: MatDialog, private router: Router, private _supplierService: SupplierService, private _warehouseService: WarehouseService) { }

  ngOnInit() {

    var createWarehouseHandler = this.openCreateWarehouseDialog.bind( this );


    var headerDiv = document.getElementById('headerDiv');
    while (headerDiv.firstChild) {
      headerDiv.removeChild(headerDiv.firstChild);
    }

    var createWarehouseButton = document.createElement("button");
    createWarehouseButton.className = "btn btn-primary rightFloatButton";
    createWarehouseButton.innerHTML = '<i class="fa fa-plus"> Tạo kho hàng</i>';
    headerDiv.append(createWarehouseButton);

    createWarehouseButton.addEventListener("click", createWarehouseHandler);

    this.ReqModelGetListWarehouse = {
      sortField: ESortField.Name,
      isAscending: true,
      pageIndex: 0,
      pageSize: 10,
      searchString: "",
    }

    this.dtOptions = {
      ordering: false,
      paging: false,
      info: false,
      searching: false,
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

  update() {
    this._warehouseService.getListWarehouse().subscribe(res => {
      this.warehouseList = res;
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

  delete(id): void {
    this._warehouseService.delete(id).subscribe(res => {
      this.update();
    })
  }

  openCreateWarehouseDialog() {
    this.dialogCreateRef = this.dialog.open(WarehouseCreateDialogComponent, {
      disableClose: false,
      width: '500px',
    });
    this.dialogCreateRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.update();
      }
      this.dialogCreateRef = null;
    });
  }

  openEditWarehouseDialog(id) {
    this.dialogEditRef = this.dialog.open(WarehouseEditDialogComponent, {
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
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn xóa nhà sản xuất này không?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogConfirmationRef = null;
    });
  }

}