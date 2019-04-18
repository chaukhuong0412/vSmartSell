import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, PipeTransform, Pipe } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ProducerService, ReqModelGetListProducer, ESortField } from 'src/app/warehouse/producer/producer.service';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { SupplierService, ReqModelGetListSupplier } from 'src/app/warehouse/supplier/supplier.service';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss']
})


export class SupplierHomeComponent implements OnInit, AfterViewInit, OnDestroy {
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
  suppliers;
  dataFiltered: object[];
  sortField: string;
  asc: boolean;
  reqModelGetListSupplier: ReqModelGetListSupplier;

  // Dropdown menu
  producerNames: string[];
  producerList;
  selectedProducers;
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

    var createSupplier = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/Supplier/Create']);
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
    createSupplierButton.innerHTML = '<i class="fa fa-plus"> Tạo nhà cung cấp</i>';

    var manageProducerButton = document.createElement("button");
    manageProducerButton.className = "btn btn-secondary leftFloatButton";
    manageProducerButton.innerHTML = ' <i class="fa fa-plus"> Danh sách nhà sản xuất</i>';

    headerDiv.append(manageProducerButton);
    headerDiv.append(createSupplierButton);

    createSupplierButton.addEventListener("click", createSupplier);
    manageProducerButton.addEventListener("click", manageProducer);


    this.reqModelGetListSupplier = {
      sortField: ESortField.Title,
      isAscending: true,
      pageIndex: 0,
      pageSize: 10,
      searchString: "",
      fromDate: null,
      toDate: null,
      producerIds: []
    }

    this.dtOptions = {
      ordering: false,
      paging: false,
      info: false,
      searching: false,
      language: Config.tableInformation

    };

    this._producerService.getListProducer().subscribe(res => {
      this.producerList = res;
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
    this._supplierService.getListSupplierOrderBy(this.reqModelGetListSupplier).subscribe(result => {
      this.suppliers = result;
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
    this._supplierService.deleteSupplier(id).subscribe(result => {
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

  onProducerIdsChange() {
    var producerIds: Array<number> = new Array();
    this.selectedProducers.forEach(element => {
      producerIds.push(element.id);
    });
    this.reqModelGetListSupplier.producerIds = producerIds;
    this.update();
  }

  search() {
    this.reqModelGetListSupplier.searchString = this.searchString;
    this.reqModelGetListSupplier.pageIndex = 0;
    this.pageIndex = 1;
    this.update()
  }





}
