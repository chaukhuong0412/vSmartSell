import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/warehouse/taxonomy/unit/unit.service';
import { WaveTypeService } from 'src/app/warehouse/taxonomy/wave-type/wave-type.service';
import { GroupProductTypeService } from '../group-product-type.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-product-type-edit',
  templateUrl: './group-product-type-edit.component.html',
  styleUrls: ['./group-product-type-edit.component.scss']
})
export class GroupProductTypeEditComponent implements OnInit {

  weight;
  name;
  slug = "";
  groupProductTypeId;
  units;
  selectedUnitIds;
  waveTypes;
  selectedWaveTypeIds;

  constructor(private unitService: UnitService, private waveTypeService: WaveTypeService, private groupProductTypeService: GroupProductTypeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {

        this.groupProductTypeId = +params["id"]; // cast to number
      });
    this.waveTypeService.getAllWaveTypes().subscribe(res => {
      this.waveTypes = res;
      this.unitService.getAllUnits().subscribe(res => {
        this.units = res;
        this.groupProductTypeService.getGroupProductType(this.groupProductTypeId).subscribe(res => {
          this.name = res.groupProductTypeName;
          this.weight = res.weight;
          this.slug = res.slug;
          this.selectedWaveTypeIds = res.waveTypeIds;
          this.selectedUnitIds = res.unitIds;
        })
      })
    })




    var back = {
      router: this.router,
      handleEvent: function (event) {
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
  }

  save() {
    var groupProductType = {
      id: this.groupProductTypeId,
      groupProductTypeName: this.name,
      weight: this.weight,
      slug: this.slug,
      unitIds: this.selectedUnitIds,
      waveTypeIds: this.selectedWaveTypeIds
    }
    this.groupProductTypeService.updateGroupProductType(groupProductType).subscribe(res => {
      this.router.navigate(['/GroupProductType']);
    })
  }
}
