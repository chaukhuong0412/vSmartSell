import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { SupplierService } from 'src/app/warehouse/supplier/supplier.service';
import { ProducerService } from 'src/app/warehouse/producer/producer.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PaymentCreateDialogComponent } from '../../payment/payment-create-dialog/payment-create-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PaymentHomeComponent } from '../../payment/payment-home/payment-home.component';
import { PaymentsTableComponent } from '../../payment/payments-table/payments-table.component';



@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {
  @ViewChild(PaymentsTableComponent) private paymentsTableComponent: PaymentsTableComponent;


  public options: Select2Options;


  dialogCreateRef: MatDialogRef<PaymentCreateDialogComponent>;


  sub: any;
  supplierId: number;

  title;
  supplierCode;
  address;
  phoneNumber;
  note;
  selectedProducers;

  producerList;
  dropdownSettings = {};
  selectedItems;

  success = false;

  payments;

  currentlyDisplayed = false;




  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private supplierService: SupplierService, private producerService: ProducerService, private router: Router) {
  }

  ngOnInit() {

    if (this.router.url.includes('Supplier/Edit')) {
      this.currentlyDisplayed = true;
    }

    var saveHandler = this.save.bind( this );

    var back = {
      router: this.router,
      handleEvent: function (event) {
        this.router.navigate(['/Supplier']);
      },
    };

    var headerDiv = document.getElementById('headerDiv');
    while (headerDiv.firstChild) {
      headerDiv.removeChild(headerDiv.firstChild);
    }

    var backButton = document.createElement("button");
    backButton.className = "btn btn-danger rightFloatButton";
    backButton.innerHTML = ' <i class="fa fa-reply"> Quay lại</i>';
    headerDiv.append(backButton);
    backButton.addEventListener("click", back);

    var saveButton = document.createElement("button");
    saveButton.className = "btn btn-success rightFloatButton";
    saveButton.innerHTML = '<i class="fa fa-save"> Lưu</i>';
    saveButton.addEventListener("click", saveHandler); 
    headerDiv.append(saveButton);

    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.supplierId = +params["id"]; // cast to number
      })

    this.supplierService.getSupplier(this.supplierId).subscribe(res => {
      this.title = res.title;
      this.supplierCode = res.code;
      this.address = res.address;
      this.phoneNumber = res.phoneNumber;
      this.note = res.note;
      this.selectedProducers = res.producers;
      // this.note = res.note;
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.producerService.getListProducer().subscribe(result => {
      this.producerList = result;
    })
  }

  openCreatePaymentDialog() {
    this.dialogCreateRef = this.dialog.open(PaymentCreateDialogComponent, {
      disableClose: false,
      width: '880px',
      height: '800px',
      data: {
        id: this.supplierId
      }
    });
    this.dialogCreateRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.paymentsTableComponent.update();
      }
      this.dialogCreateRef = null;
    });
  }


  save() {
    var producerIds: Array<number> = new Array();
    this.selectedProducers.forEach(element => {
      producerIds.push(element.id);
    });

    var supplier = {
      id: this.supplierId,
      title: this.title,
      code: this.supplierCode,
      address: this.address,
      phoneNumber: this.phoneNumber,
      note: this.note,
      producerIds: producerIds
    };

    this.supplierService.editSupplier(supplier).subscribe(result => {
      //this.router.navigate(['/Producer']);
      this.success = true;
    }, error => {
      console.log(error);
    });
  }






}

