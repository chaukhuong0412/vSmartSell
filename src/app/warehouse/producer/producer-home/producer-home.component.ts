import { Component, OnInit, ViewChild } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { SupplierService, ReqModelGetListSupplier, ESortField } from 'src/app/warehouse/supplier/supplier.service';
import { ProducerService, ReqModelGetListProducer } from 'src/app/warehouse/producer/producer.service';
import { Subject } from 'rxjs';
import { ProducerCreateDialogComponent } from '../producer-create-dialog/producer-create-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ProducerEditDialogComponent } from '../producer-edit-dialog/producer-edit-dialog.component';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-producer-home',
  templateUrl: './producer-home.component.html',
  styleUrls: ['./producer-home.component.scss']
})
export class ProducerHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dialogCreateRef: MatDialogRef<ProducerCreateDialogComponent>;
  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogEditRef: MatDialogRef<ProducerEditDialogComponent>;

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
  ReqModelGetListProducer: ReqModelGetListProducer;

  producerList;

  constructor(public dialog: MatDialog, private router: Router, private _supplierService: SupplierService, private _producerService: ProducerService) { }

  ngOnInit() {

    var createProducerHandler = this.openCreateProducerDialog.bind( this );

    var manageSupplier = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/Supplier']);
      },
    };

    var headerDiv = document.getElementById('headerDiv');
    while (headerDiv.firstChild) {
      headerDiv.removeChild(headerDiv.firstChild);
    }

    var createProducerButton = document.createElement("button");
    createProducerButton.className = "btn btn-primary rightFloatButton";
    createProducerButton.innerHTML = '<i class="fa fa-plus"> Tạo nhà sản xuất</i>';

    var manageSupplierButton = document.createElement("button");
    manageSupplierButton.className = "btn btn-secondary leftFloatButton";
    manageSupplierButton.innerHTML = ' <i class="fa fa-plus"> Danh sách nhà cung cấp</i>';

    headerDiv.append(manageSupplierButton);
    headerDiv.append(createProducerButton);

    createProducerButton.addEventListener("click", createProducerHandler);
    manageSupplierButton.addEventListener("click", manageSupplier);

    this.ReqModelGetListProducer = {
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
      language: Config.tableInformation

    };
    this.update();
  }

  update() {
    this._producerService.getListProducer().subscribe(res => {
      this.producerList = res;
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
    this._producerService.delete(id).subscribe(res => {
      this.update();
    })
  }

  openCreateProducerDialog() {
    this.dialogCreateRef = this.dialog.open(ProducerCreateDialogComponent, {
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

  openEditProducerDialog(id) {
    this.dialogEditRef = this.dialog.open(ProducerEditDialogComponent, {
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