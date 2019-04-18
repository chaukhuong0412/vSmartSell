import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/warehouse/taxonomy/unit/unit.service';
import { WaveTypeService } from 'src/app/warehouse/taxonomy/wave-type/wave-type.service';
import { GroupProductTypeService } from '../../taxonomy/group-product-type/group-product-type.service';
import { Router } from '@angular/router';
import { ProducerService } from 'src/app/warehouse/producer/producer.service';
import { WarehouseService } from 'src/app/warehouse/warehouse/warehouse.service';
import { ProductNameService } from 'src/app/warehouse/product-name/product-name.service';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UserService } from '../../../user/user/user.service';

@Component({
  selector: 'app-product-name-create',
  templateUrl: './product-name-create.component.html',
  styleUrls: ['./product-name-create.component.scss']
})
export class ProductNameCreateComponent implements OnInit {

  dialogErrorRef: MatDialogRef<ErrorDialogComponent>;

  title;
  units;
  selectedUnitIds;
  waveTypes;
  selectedWaveTypeIds;
  producers;
  selectedProducer;
  warehouses;
  selectedWarehouses: any[];
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
     private userService: UserService,
     private router: Router,
     public dialog: MatDialog) { }

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

    this.waveTypeService.getAllWaveTypes().subscribe(res => {
      this.waveTypes = res;
    })

    this.unitService.getAllUnits().subscribe(res => {
      this.units = res;
    })

    this.producerService.getListProducer().subscribe(res => {
      this.producers = res;
    })

    this.warehouseService.getListWarehouse().subscribe(res => {
      this.warehouses = res;
    })

    this.groupProductTypeService.getAllGroupProductTypes().subscribe(res => {
      this.groupProductTypes = res;
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

  createProductName() {
    var productName;
    var warehouseIds: Array<number> = new Array();
    if (this.selectedWarehouses != undefined) {
      this.selectedWarehouses.forEach(element => {
        warehouseIds.push(element.id);
      });
      productName = {
        title: this.title,
        groupProductTypeId: this.selectedGroupProductType,
        producerId: this.selectedProducer,
        unitIds: this.selectedUnitIds,
        waveTypeIds: this.selectedWaveTypeIds,
        warehouseIds: warehouseIds
      }
      this.productNameService.createProductName(productName).subscribe(res => {
        this.router.navigate(['/ProductName']);
      }, error => {
        console.log(error);
        this.openErrorDialog(error.error.Code);
      })
    }
    else {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userService.getUser(currentUser.id).subscribe(res => {
        res.importWarehouseIds.forEach(element => {
          warehouseIds.push(element);
        });
        productName = {
          title: this.title,
          groupProductTypeId: this.selectedGroupProductType,
          producerId: this.selectedProducer,
          unitIds: this.selectedUnitIds,
          waveTypeIds: this.selectedWaveTypeIds,
          warehouseIds: warehouseIds
        }
        this.productNameService.createProductName(productName).subscribe(res => {
          this.router.navigate(['/ProductName']);
        }, error => {
          console.log(error);
          this.openErrorDialog(error.error.Code);
        })
      })
    }

    
  }

  groupProductTypeChange() {
    this.groupProductTypeSelected = true;

    this.groupProductTypeService.getUnitsOfGroupProductType(this.selectedGroupProductType).subscribe(res => {
      this.units = res;
    })

    this.groupProductTypeService.getWaveTypesOfGroupProductType(this.selectedGroupProductType).subscribe(res => {
      this.waveTypes = res;
    })
  }

  openErrorDialog(errorMessage) {
    this.dialogErrorRef = this.dialog.open(ErrorDialogComponent, {
      disableClose: false
    });
    this.dialogErrorRef.componentInstance.errorMessage = errorMessage;
    // this.dialogErrorRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.delete(id);
    //   }
    //   this.dialogConfirmationRef = null;
    // });
  }

}
