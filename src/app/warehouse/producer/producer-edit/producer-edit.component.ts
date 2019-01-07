import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { Supplier, SupplierService } from 'src/app/supplier.service';
import { ProducerService } from 'src/app/producer.service';



@Component({
  selector: 'app-producer-edit',
  templateUrl: './producer-edit.component.html',
  styleUrls: ['./producer-edit.component.scss']
})
export class ProducerEditComponent implements OnInit {

  public options: Select2Options;




  sub: any;
  producerId: number;

  producerName;
  producerCode;
  address;
  phoneNumber;
  note;
  selectedSuppliers;

  supplierList;
  dropdownSettings = {};
  selectedItems;

  success = false;



  constructor(private activatedRoute: ActivatedRoute, private supplierService: SupplierService, private producerService: ProducerService, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.producerId = +params["id"]; // cast to number
      })

    this.producerService.getProducer(this.producerId).subscribe(res => {
      this.producerName = res.name;
      this.producerCode = res.code;
      this.address = res.address;
      this.phoneNumber = res.phoneNumber;
      console.log(res.suppliers);
      this.selectedSuppliers = res.suppliers;
      //this.note = res.note;
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


    this.supplierService.getListSupplier().subscribe(result => {
      this.supplierList = result;
    })
  }



  save() {
    var supplierIds: Array<number> = new Array();
    this.selectedSuppliers.forEach(element => {
      supplierIds.push(element.id);
    });

    var producer = {
      id: this.producerId,
      name: this.producerName,
      code: this.producerCode,
      address: this.address,
      phoneNumber: this.phoneNumber,
      note: this.note,
      supplierIds: supplierIds
    };

    this.producerService.editProducer(producer).subscribe(result => {
      //this.router.navigate(['/Producer']);
      this.success = true;
    }, error => {
      alert(error);
    });
  }



}
