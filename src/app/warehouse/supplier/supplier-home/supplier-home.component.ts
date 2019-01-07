import { Component, OnInit, ViewChild } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SupplierService, ReqModelGetListSupplier, ESortField } from 'src/app/supplier.service';
import { ProducerService } from 'src/app/producer.service';
import { Subject } from 'rxjs';
import { SupplierCreateDialogComponent } from '../supplier-create-dialog/supplier-create-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { SupplierEditDialogComponent } from '../supplier-edit-dialog/supplier-edit-dialog.component';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss']
})
export class SupplierHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dialogCreateRef: MatDialogRef<SupplierCreateDialogComponent>;
  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogEditRef: MatDialogRef<SupplierEditDialogComponent>;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  index = 1;
  pageIndex = 1;
  pageSize = 10;
  searchString = "";
  producers;
  dataFiltered: object[];
  sortField: string;
  asc: boolean;
  reqModelGetListSupplier: ReqModelGetListSupplier;

  supplierList;

  constructor(public dialog: MatDialog, private router: Router, private _supplierService: SupplierService, private _producerService: ProducerService) { }

  ngOnInit() {

    var createSupplier = {
      router: this.router,
      dialogCreateRef: this.dialogCreateRef,
      dialog: this.dialog,
      update: this.update,
      supplierList: this.supplierList,
      _supplierService: this._supplierService,
      rerender: this.rerender,
      dtElement: this.dtElement,
      dtTrigger: this.dtTrigger,


      handleEvent: function( event ) {
        this.dialogCreateRef = this.dialog.open(SupplierCreateDialogComponent, {
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
      },
    };

    var manageProducer = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/Producer']);
      },
    };

    var headerDiv = document.getElementById('headerDiv');
    while (headerDiv.firstChild) {
      headerDiv.removeChild(headerDiv.firstChild);
    }

    var createSupplierButton = document.createElement("button");
    createSupplierButton.className = "btn btn-primary rightFloatButton";
    createSupplierButton.innerHTML = '<i class="fa fa-plus"> Tạo nhà sản xuất</i>';

    var manageProducerButton = document.createElement("button");
    manageProducerButton.className = "btn btn-secondary leftFloatButton";
    manageProducerButton.innerHTML = ' <i class="fa fa-plus"> Danh sách nhà cung cấp</i>';

    headerDiv.append(manageProducerButton);
    headerDiv.append(createSupplierButton);

    createSupplierButton.addEventListener("click", createSupplier);
    manageProducerButton.addEventListener("click", manageProducer);

    this.reqModelGetListSupplier = {
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
    this._supplierService.getListSupplier().subscribe(res => {
      this.supplierList = res;
      console.log(this.supplierList);
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
      console.log('x');
    });
  }

  delete(id): void {
    this._supplierService.delete(id).subscribe(res => {
      this.update();
    })
  }

  openCreateSupplierDialog() {
    this.dialogCreateRef = this.dialog.open(SupplierCreateDialogComponent, {
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

  openEditSupplierDialog(id) {
    this.dialogEditRef = this.dialog.open(SupplierEditDialogComponent, {
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