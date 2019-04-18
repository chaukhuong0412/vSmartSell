import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/warehouse/taxonomy/unit/unit.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss']
})
export class UnitEditComponent implements OnInit {

  weight;
  title;
  slug = "";
  unitId;
  goodsCuttingType;

  constructor(private unitService: UnitService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        
        this.unitId = +params["id"]; // cast to number
      })
    this.unitService.getUnit(this.unitId).subscribe(res => {
      this.title = res.title;
      this.weight = res.weight;
      this.slug = res.slug;
      this.goodsCuttingType = res.goodsCuttingType;
    })

    var back = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/Unit']);
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
    var unit = {
      id: this.unitId,
      title: this.title,
      weight: this.weight,
      slug: this.slug,
      goodsCuttingType: this.goodsCuttingType
    }
    this.unitService.updateUnit(unit).subscribe(res => {
      this.router.navigate(['/Unit']);
    })
  }
}
