import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SupplierService } from 'src/app/supplier.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-create-dialog',
  templateUrl: './payment-create-dialog.component.html',
  styleUrls: ['./payment-create-dialog.component.scss']
})
export class PaymentCreateDialogComponent implements OnInit {

  date;
  parsedDate;
  hour;
  minute;
  second;
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
  public data: any, private _supplierService: SupplierService, public dialogRef: MatDialogRef<PaymentCreateDialogComponent>) { }

  ngOnInit() {
    this._supplierService.getSupplier(this.data.id).subscribe(res => {
      this.debt = res.currentDebt;
      this.debtString = this.addCommas(this.debt);
    })

    var today = new Date();
    this.date = {
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      day: today.getDate().toString(),
      hour: today.getHours().toString(),
      minute: today.getMinutes().toString(),
      second: today.getSeconds().toString()
    };

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
    console.log(this.rest);
    console.log(this.debt);
    console.log(this.amount);
    this.restString = this.addCommas(this.rest);
  }

  onDateTimeInputBlur() {
    var datePicker = <HTMLInputElement>document.getElementById("datePicker");
    this.isValidDate(datePicker.value);
    this.displayDate();

    this.getDebt();
  }

  parseDate() {
    return this.date.year + "-" + this.date.month + "-" + this.date.day + "T" + this.date.hour + ":" + this.date.minute + ":" + this.date.second;
  }

  createPayment() {
    var datePicker = <HTMLInputElement>document.getElementById("datePicker");
    if (this.isValidDate(datePicker.value)) {
      var payment = {
        date: this.parseDate(),
        supplierId: this.data.id,
        amount: this.removeCommas(this.amount)
      }
      console.log(payment);
      this._supplierService.createPayment(payment).subscribe(s => {
        this.dialogRef.close("Create");
      })
    }
    else {
      this.invalidDate = true;
    }
  }

  isValidDate(dateString) {
    // First check for the pattern
    if (! /^\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}\:\d{1,2}\:\d{1,2}$/.test(dateString))
      return false;

    // Parse the date parts to integers
    var parts = dateString.split(" ");
    var dates = parts[0].split("/");
    var times = parts[1].split(":");
    var day = parseInt(dates[0], 10);
    var month = parseInt(dates[1], 10);
    var year = parseInt(dates[2], 10);
    var hour = parseInt(times[0], 10);
    var minute = parseInt(times[1], 10);
    var second = parseInt(times[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
      return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    // Check the range of the day
    if (day <= 0 || day > monthLength[month - 1])
      return false;

    if (hour < 0 || minute < 0 || second < 0 || hour > 23 || minute > 59 || second > 59)
      return false;

    this.date.year = year.toString();
    this.date.month = month.toString();
    this.date.day = day.toString();
    this.date.hour = hour.toString();
    this.date.minute = minute.toString();
    this.date.second = second.toString();

    return true;

  };



  getDebt() {
    var requestDebtModel = {
      supplierId: this.data.id,
      date: this.parseDate()
    }
    this._supplierService.getDebtAtGivenDate(requestDebtModel).subscribe(res => {
      this.debt = res;
      this.debtString = this.addCommas(this.debt);
    })
  }


  onDateSelect(event) {
    //Set value for this.date
    this.date.day = event.day;
    this.date.month = event.month;
    this.date.year = event.year;

    //Display the chosen date in format dd/mm/yyyy hh:mm:ss
    this.displayDate();
    this.getDebt();

  }

  displayDate() {
    if (this.date.day.length == 1) {
      this.date.day = "0" + this.date.day;
    }
    if (this.date.month.length == 1) {
      this.date.month = "0" + this.date.month;
    }
    if (this.date.hour.length == 1) {
      this.date.hour = "0" + this.date.hour;
    }
    if (this.date.minute.length == 1) {
      this.date.minute = "0" + this.date.minute;
    }
    if (this.date.second.length == 1) {
      this.date.second = "0" + this.date.second;
    }

    this.parsedDate = this.date.day + "/" + this.date.month + "/" + this.date.year + " " + this.date.hour + ":" + this.date.minute + ":" + this.date.second;
    var datePicker = <HTMLInputElement>document.getElementById("datePicker");
    datePicker.value = this.parsedDate;
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
