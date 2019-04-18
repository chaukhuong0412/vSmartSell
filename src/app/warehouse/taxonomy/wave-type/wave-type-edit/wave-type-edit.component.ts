import { Component, OnInit } from '@angular/core';
import { WaveTypeService } from 'src/app/warehouse/taxonomy/wave-type/wave-type.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wave-type-edit',
  templateUrl: './wave-type-edit.component.html',
  styleUrls: ['./wave-type-edit.component.scss']
})
export class WaveTypeEditComponent implements OnInit {

  weight;
  title;
  slug = "";
  waveTypeId;
  loss;
  lossAmount;
  constructor(private waveTypeService: WaveTypeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.waveTypeId = +params["id"]; // cast to number
      })
    this.waveTypeService.getWaveType(this.waveTypeId).subscribe(res => {
      this.title = res.title;
      this.weight = res.weight;
      this.slug = res.slug;
      this.loss = res.loss;
      this.lossAmount = res.lossAmount;
    })

    var back = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/WaveType']);
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
    var waveType = {
      id: this.waveTypeId,
      title: this.title,
      weight: this.weight,
      slug: this.slug,
      loss: this.loss,
      lossAmount: this.lossAmount
    }
    this.waveTypeService.updateWaveType(waveType).subscribe(res => {
      this.router.navigate(['/WaveType']);
    })
  }
}
