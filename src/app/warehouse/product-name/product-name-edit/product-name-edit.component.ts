import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/warehouse/taxonomy/unit/unit.service';
import { WaveTypeService } from 'src/app/warehouse/taxonomy/wave-type/wave-type.service';
import { GroupProductTypeService } from '../../taxonomy/group-product-type/group-product-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProducerService } from 'src/app/warehouse/producer/producer.service';
import { WarehouseService } from 'src/app/warehouse/warehouse/warehouse.service';
import { ProductNameService } from 'src/app/warehouse/product-name/product-name.service';

@Component({
  selector: 'app-product-name-edit',
  templateUrl: './product-name-edit.component.html',
  styleUrls: ['./product-name-edit.component.scss']
})
export class ProductNameEditComponent implements OnInit {

  
  productNameId;
  title;
  units;
  selectedUnitIds;
  waveTypes;
  selectedWaveTypeIds;
  producers;
  selectedProducer;
  warehouses;
  selectedWarehouses;
  singleDropdownSettings;
  multiDropdownSettings;
  groupProductTypes;
  selectedGroupProductType;
  groupProductTypeSelected = false;

  constructor(private unitService: UnitService,
     private waveTypeService: WaveTypeService, 
     private groupProductTypeService: GroupProductTypeService, 
     private producerService: ProducerService,
     private warehouseService: WarehouseService,
     private productNameService: ProductNameService,
     private router: Router,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    var back = {
      router: this.router,
      handleEvent: function (event) {
        this.router.navigate(['/ProductName']);
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

    this.activatedRoute.params.subscribe(
      params => {
        this.productNameId = +params["id"]; // cast to number
      })


        this.producerService.getListProducer().subscribe(res => {
          this.producers = res;
          this.warehouseService.getListWarehouse().subscribe(res => {
            this.warehouses = res;
            this.groupProductTypeService.getAllGroupProductTypes().subscribe(res => {
              this.groupProductTypes = res;
              this.productNameService.getProductName(this.productNameId).subscribe(productName => {
                this.title = productName.title;
                this.selectedGroupProductType = productName.groupProductTypeId;
                this.groupProductTypeService.getWaveTypesOfGroupProductType(this.selectedGroupProductType).subscribe(res => {
                  this.waveTypes = res;
                  this.groupProductTypeService.getUnitsOfGroupProductType(this.selectedGroupProductType).subscribe(res => {
                    this.units = res;
                    this.selectedUnitIds =  productName.unitIds;
                    this.selectedWaveTypeIds =  productName.waveTypeIds;
                })
                })
                this.selectedProducer =  productName.producerId;
                this.selectedWarehouses =  productName.warehouses;

              })
            })
          })
        })    







    this.singleDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      closeDropDownOnSelection: true
    };

    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };


  }

  save() {
    var warehouseIds: Array<number> = new Array();
    this.selectedWarehouses.forEach(element => {
      warehouseIds.push(element.id);
    });

    var productName = {
      id: this.productNameId,
      title: this.title,
      groupProductTypeId: this.selectedGroupProductType,
      producerId: this.selectedProducer,
      unitIds: this.selectedUnitIds,
      waveTypeIds: this.selectedWaveTypeIds,
      warehouseIds: warehouseIds
    }
    this.productNameService.updateProductName(productName).subscribe(res => {
      this.router.navigate(['/ProductName']);
    })
  }

  groupProductTypeChange() {
    this.groupProductTypeService.getUnitsOfGroupProductType(this.selectedGroupProductType).subscribe(res => {
      this.units = res;
    })

    this.groupProductTypeService.getWaveTypesOfGroupProductType(this.selectedGroupProductType).subscribe(res => {
      this.waveTypes = res;
    })

    

  }

}
