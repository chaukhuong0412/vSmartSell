import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SupplierService } from 'src/app/warehouse/supplier/supplier.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PaymentService } from 'src/app/warehouse/payment/payment.service';
import * as moment from 'moment';


@Component({
  selector: 'app-payment-create-dialog',
  templateUrl: './payment-create-dialog.component.html',
  styleUrls: ['./payment-create-dialog.component.scss']
})
export class PaymentCreateDialogComponent implements OnInit {

  displayDateFormat = "DD/MM/YYYY HH:mm:ss";
  requestDateFormat = "YYYY-MM-DDTHH:mm:ss";
  date;

  amount: string;
  debt: number;
  rest: number;

  payAllModel = false;

  debtString: string;
  restString: string;

  transfer: boolean;
  model;
  invalidDate = false;



  constructor(@Inject(MAT_DIALOG_DATA)
  public data: any, private _supplierService: SupplierService, private paymentService: PaymentService, public dialogRef: MatDialogRef<PaymentCreateDialogComponent>) { }

  ngOnInit() {
    this._supplierService.getSupplier(this.data.id).subscribe(res => {
      this.debt = res.currentDebt;
      this.debtString = this.addCommas(this.debt);
    })
    this.date = moment();
    this.displayDate();

  }

  addCommasToAmount() {
    this.amount = this.addCommas(this.amount);
  }

  addCommas(number) {
    return number.toString()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  removeCommas(string) {
    return string.replace(/,/g, "");
  }

  onAmountInputBlur() {
    this.rest = this.debt - this.removeCommas(this.amount);
    this.restString = this.addCommas(this.rest);
  }

  createPayment() {
    var datePicker = <HTMLInputElement>document.getElementById("datePicker");
    if (this.isValidDate(datePicker.value)) {
      this.date = moment(datePicker.value, this.displayDateFormat);
      var payment = {
        date: moment(this.date).format("YYYY-MM-DDTHH:mm:ss"),
        supplierId: this.data.id,
        amount: this.removeCommas(this.amount)
      }
      this.paymentService.createPayment(payment).subscribe(s => {
        this.dialogRef.close("Create");
      })
    }
    else {
      this.invalidDate = true;
    }
  }

  getDebt() {
    var requestDebtModel = {
      supplierId: this.data.id,
      date: moment(this.date).format(this.requestDateFormat)
    }
    this._supplierService.getDebtAtGivenDate(requestDebtModel).subscribe(res => {
      this.debt = res;
      this.debtString = this.addCommas(this.debt);
    })
  }

  isValidDate(dateString) {
    return moment(dateString, this.displayDateFormat).isValid();
  }

  onDateSelect(event) {
    this.date.year(event.year);
    this.date.month(event.month - 1);
    this.date.date(event.day);

    this.displayDate();
    this.getDebt();
  }

  displayDate() {
    var datePicker = <HTMLInputElement>document.getElementById("datePicker");
    datePicker.value = moment(this.date).format(this.displayDateFormat);
  }


  onDateTimeInputBlur() {
    var datePicker = <HTMLInputElement>document.getElementById("datePicker");
    if (this.isValidDate(datePicker.value)) {
      this.date = moment(datePicker.value, this.displayDateFormat);
    }
    this.displayDate();
    this.getDebt();
  }


  payAll(event) {
    if (event) {
      this.amount = this.addCommas(this.debt);
      this.onAmountInputBlur();
    }
    else {
      this.amount = "";
      this.onAmountInputBlur();
    }
  }





}
