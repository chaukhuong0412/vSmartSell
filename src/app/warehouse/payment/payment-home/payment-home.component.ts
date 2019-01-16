import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SupplierService } from 'src/app/supplier.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentCreateDialogComponent } from '../payment-create-dialog/payment-create-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-payment-home',
  templateUrl: './payment-home.component.html',
  styleUrls: ['./payment-home.component.scss']
})
export class PaymentHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  sub;
  supplierId;
  payments;
  currentDebt;
  dialogCreateRef: MatDialogRef<PaymentCreateDialogComponent>;



  constructor(public dialog: MatDialog, private supplierService: SupplierService, private activatedRoute: ActivatedRoute) { }

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

    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.supplierId = +params["id"]; // cast to number
      })

    this.supplierService.getPaymentsOfSupplier(this.supplierId).subscribe(res => {
      this.payments = res;
    })

    this.supplierService.getSupplier(this.supplierId).subscribe(res => {
      this.currentDebt = this.addCommas(res.currentDebt);
    })

    this.update();
  }

  update() {
    this.supplierService.getPaymentsOfSupplier(this.supplierId).subscribe(result => {
      this.payments = result;
      this.rerender();
    })

    this.supplierService.getSupplier(this.supplierId).subscribe(res => {
      this.currentDebt = this.addCommas(res.currentDebt);
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
        this.update();
      }
      this.dialogCreateRef = null;
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
