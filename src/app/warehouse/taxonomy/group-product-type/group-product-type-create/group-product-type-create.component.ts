import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/warehouse/taxonomy/unit/unit.service';
import { WaveTypeService } from 'src/app/warehouse/taxonomy/wave-type/wave-type.service';
import { GroupProductTypeService } from '../group-product-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-product-type-create',
  templateUrl: './group-product-type-create.component.html',
  styleUrls: ['./group-product-type-create.component.scss']
})
export class GroupProductTypeCreateComponent implements OnInit {

  weight;
  title;
  slug = "";
  units;
  selectedUnitIds;
  waveTypes;
  selectedWaveTypeIds;

  constructor(private unitService: UnitService, private waveTypeService: WaveTypeService, private groupProductTypeService: GroupProductTypeService, private router: Router) { }

  ngOnInit() {
    var back = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/GroupProductType']);
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
  }

  createGroupProductType() {
    var groupProductType = {
      title: this.title,
      weight: this.weight,
      slug: this.slug,
      unitIds: this.selectedUnitIds,
      waveTypeIds: this.selectedWaveTypeIds
    }
    this.groupProductTypeService.createGroupProductType(groupProductType).subscribe(res => {
      this.router.navigate(['/GroupProductType']);
    })
  }
}
