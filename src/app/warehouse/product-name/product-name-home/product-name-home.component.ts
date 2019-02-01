import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProductNameService, ReqModelGetListProductName, ESortField } from 'src/app/warehouse/product-name/product-name.service';
import { Router } from '@angular/router';
import { ProducerService } from 'src/app/warehouse/producer/producer.service';
import { WarehouseService } from 'src/app/warehouse/warehouse/warehouse.service';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-product-name-home',
  templateUrl: './product-name-home.component.html',
  styleUrls: ['./product-name-home.component.scss']
})
export class ProductNameHomeComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;

  //Table
  productNames;

  //Filter
  index = 1;
  pageIndex = 1;
  pageSize = 10;
  searchString = "";
  sortField: string;
  asc: boolean;
  reqModelGetListProductName: ReqModelGetListProductName;

  producers;
  selectedProducers;
  dropdownSettings;
  warehouses;
  selectedWarehouse;

  constructor(private productNameService : ProductNameService,
              private router: Router,
              public dialog: MatDialog,
              private producerService : ProducerService,
              private warehouseService : WarehouseService) { }

  ngOnInit() {

    var createProductName = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/ProductName/Create']);
      },
    };

    var headerDiv = document.getElementById('headerDiv');
    while (headerDiv.firstChild) {
      headerDiv.removeChild(headerDiv.firstChild);
    }

    var createProductNameButton = document.createElement("button");
    createProductNameButton.className = "btn btn-primary rightFloatButton";
    createProductNameButton.innerHTML = '<i class="fa fa-plus"> Tạo tên sản phẩm</i>';
    headerDiv.append(createProductNameButton);
    createProductNameButton.addEventListener("click", createProductName);


    this.dtOptions = {
      ordering: false,
      paging: false,
      info: false,
      searching: false,
      language: Config.tableInformation

    };

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };

    this.reqModelGetListProductName = {
      sortField: ESortField.Name,
      isAscending: true,
      pageIndex: 0,
      pageSize: 10,
      searchString: "",
      producerIds: [],
      warehouseId: 0
    }


    this.productNameService.getListProductNames(this.reqModelGetListProductName).subscribe(res => {
      this.productNames = res;
    })

    this.producerService.getListProducer().subscribe(res => {
      this.producers = res;
    })

    this.warehouseService.getListWarehouse().subscribe(res => {
      this.warehouses = res;
    })

    this.update();
  }

  update() {
    this.productNameService.getListProductNames(this.reqModelGetListProductName).subscribe(result => {
      this.productNames = result;
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
      console.log("rerender!");
    });
  }

  delete(id) {
    this.productNameService.deleteProductName(id).subscribe(result => {
      this.update();
    })
  }

  openDeleteConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn xóa tên sản phẩm này không?"
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
    this.reqModelGetListProductName.producerIds = producerIds;
    this.update();
  }

  onWarehouseChange(warehouseId) {
    console.log(this.selectedWarehouse);
    this.reqModelGetListProductName.warehouseId = warehouseId;
    this.update();
  }

  search() {
    this.reqModelGetListProductName.searchString = this.searchString;
    this.reqModelGetListProductName.pageIndex = 0;
    this.pageIndex = 1;
    this.update()
    console.log(this.selectedWarehouse);
  }

}
