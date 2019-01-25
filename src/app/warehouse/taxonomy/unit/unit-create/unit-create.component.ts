import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/unit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-create',
  templateUrl: './unit-create.component.html',
  styleUrls: ['./unit-create.component.scss']
})
export class UnitCreateComponent implements OnInit {
  weight;
  name;
  slug = "";
  goodsCuttingType;

  constructor(private unitService: UnitService, private router: Router) { }

  ngOnInit() {
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

  createUnit() {
    var unit = {
      unitName: this.name,
      weight: this.weight,
      slug: this.slug,
      goodsCuttingType: this.goodsCuttingType
    }
    this.unitService.createUnit(unit).subscribe(res => {
      this.router.navigate(['/Unit']);
    })
  }

}
