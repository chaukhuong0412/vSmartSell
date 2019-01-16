

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProducerService, Producer } from 'src/app/producer.service';
import { SupplierService } from 'src/app/supplier.service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.scss']
})
export class SupplierCreateComponent implements OnInit {

  public options: Select2Options;

  supplierName;
  supplierCode;
  address;
  phoneNumber;
  beginningPeriodDebt;
  currentDebt;
  note;
  selectedProducers: Array<Producer> = new Array();


  producerList;
  dropdownSettings = {};


  constructor(private router: Router, private producerService: ProducerService, private supplierService: SupplierService) {
  }

  ngOnInit() {
    var back = {
      router: this.router,
      handleEvent: function( event ) {
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

    this.producerService.getListProducer().subscribe(result => {
      this.producerList = result;
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 99,
      allowSearchFilter: true
    };
  }

  createSupplier() {
    var producerIds: Array<number> = new Array();
    this.selectedProducers.forEach(element => {
      producerIds.push(element.id);
    });

    var supplier = {
      name: this.supplierName,
      code: this.supplierCode,
      address: this.address,
      phoneNumber: this.phoneNumber,
      beginningPeriodDebt: this.removeCommas(this.beginningPeriodDebt),
      currentDebt: this.removeCommas(this.currentDebt),
      note: this.note,
      producerIds: producerIds
      };

    this.supplierService.createSupplier(supplier).subscribe(result => {
      this.router.navigate(['/Supplier']);
    }, error => {
      alert(error);
    });
  }

  addCommasToBeginningPeriodDebt() {
    this.beginningPeriodDebt = this.addCommas(this.beginningPeriodDebt);
  }

  addCommasToCurrentDebt() {
    this.currentDebt = this.addCommas(this.currentDebt);
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
