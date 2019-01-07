import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProducerService } from 'src/app/producer.service';
import { SupplierService, Supplier } from 'src/app/supplier.service';

@Component({
  selector: 'app-producer-create',
  templateUrl: './producer-create.component.html',
  styleUrls: ['./producer-create.component.scss']
})
export class ProducerCreateComponent implements OnInit {

  public options: Select2Options;

  producerName;
  producerCode;
  address;
  phoneNumber;
  note;
  selectedSuppliers: Array<Supplier> = new Array();






  supplierList;
  dropdownSettings = {};


  constructor(private route: Router, private producerService: ProducerService, private supplierService: SupplierService) {
  }

  ngOnInit() {

    this.supplierService.getListSupplier().subscribe(result => {
      this.supplierList = result;
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

  createProducer() {
    var supplierIds: Array<number> = new Array();
    this.selectedSuppliers.forEach(element => {
      supplierIds.push(element.id);
    });

    var producer = {
      name: this.producerName,
      code: this.producerCode,
      address: this.address,
      phoneNumber: this.phoneNumber,
      note: this.note,
      supplierIds: supplierIds
      };

    this.producerService.createProducer(producer).subscribe(result => {
      this.route.navigate(['/Producer']);
      console.log('success!');
    }, error => {
      alert(error);
    });
  }


}
