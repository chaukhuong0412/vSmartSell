import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, PipeTransform, Pipe } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ProducerService, ReqModelGetListProducer, ESortField } from 'src/app/producer.service';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { SupplierService } from 'src/app/supplier.service';

@Component({
  selector: 'app-producer-home',
  templateUrl: './producer-home.component.html',
  styleUrls: ['./producer-home.component.scss']
})


export class ProducerHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;



  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  // Sorting, Paging, Filtering
  index = 1;
  pageIndex = 1;
  pageSize = 10;
  searchString = "";
  producers;
  dataFiltered: object[];
  sortField: string;
  asc: boolean;
  reqModelGetListProducer: ReqModelGetListProducer;

  // Dropdown menu
  supplierNames: string[];
  supplierList;
  selectedSuppliers;
  dropdownSettings;

  // Datepicker
  fromDate: NgbDate;
  toDate: NgbDate;
  minToDate: NgbDate;
  toDatepicker: NgbInputDatepicker;

  constructor(calendar: NgbCalendar, private _producerService: ProducerService, 
              private router: Router, public dialog: MatDialog, private _supplierService: SupplierService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  

  ngOnInit() {

    var createProducer = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/Producer/Create']);
      },
    };

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
    createProducerButton.innerHTML = '<i class="fa fa-plus"> Tạo nhà cung cấp</i>';

    var manageSupplierButton = document.createElement("button");
    manageSupplierButton.className = "btn btn-secondary leftFloatButton";
    manageSupplierButton.innerHTML = ' <i class="fa fa-plus"> Danh sách nhà sản xuất</i>';

    headerDiv.append(manageSupplierButton);
    headerDiv.append(createProducerButton);

    createProducerButton.addEventListener("click", createProducer);
    manageSupplierButton.addEventListener("click", manageSupplier);


    this.reqModelGetListProducer = {
      sortField: ESortField.Name,
      isAscending: true,
      pageIndex: 0,
      pageSize: 10,
      searchString: "",
      fromDate: null,
      toDate: null,
      supplierIds: []
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

    this._supplierService.getListSupplier().subscribe(res => {
      this.supplierList = res;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
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
    this._producerService.getListProducerOrderBy(this.reqModelGetListProducer).subscribe(result => {
      this.producers = result;
      this.rerender();
    })
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

  toggle(): void {
    console.log('click');
  }

  onToDateSelect(): void {
  }

  onToDateSelected(): void {
    console.log(this.toDate, this.fromDate);
  }

  onFromDateSelected(d2) {
    this.minToDate = this.fromDate;
    this.toDatepicker = d2;
    setTimeout(function () {
      d2.toggle();
    }, 200);
  }

  delete(id) {
    this._producerService.deleteProducer(id).subscribe(result => {
      this.update();
    })
  }

  openDeleteConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn xóa nhà cung cấp này không?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogConfirmationRef = null;
    });
  }

  onSupplierIdsChange() {
    var supplierIds: Array<number> = new Array();
    this.selectedSuppliers.forEach(element => {
      supplierIds.push(element.id);
    });
    this.reqModelGetListProducer.supplierIds = supplierIds;
    console.log(this.selectedSuppliers);
    this.update();
  }





}
