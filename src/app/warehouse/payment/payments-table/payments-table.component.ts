import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SupplierService } from 'src/app/supplier.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentCreateDialogComponent } from '../payment-create-dialog/payment-create-dialog.component';
import { PaymentService } from 'src/app/payment.service';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent implements OnInit {
  @Input() supplierId : number;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  sub;
  payments;

  constructor(public dialog: MatDialog, private supplierService: SupplierService, private paymentService: PaymentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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



    this.paymentService.getPaymentsOfSupplier(this.supplierId).subscribe(res => {
      this.payments = res;
    })

    this.update();
  }

  update() {
    this.paymentService.getPaymentsOfSupplier(this.supplierId).subscribe(result => {
      this.payments = result;
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



  addCommas(number) {
    return number.toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  removeCommas(string) {
    return string.replace(/,/g, "");
  }

}
