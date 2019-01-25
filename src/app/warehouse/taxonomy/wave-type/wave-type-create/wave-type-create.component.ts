import { Component, OnInit } from '@angular/core';
import { WaveTypeService } from 'src/app/wave-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wave-type-create',
  templateUrl: './wave-type-create.component.html',
  styleUrls: ['./wave-type-create.component.scss']
})
export class WaveTypeCreateComponent implements OnInit {

  weight;
  name;
  slug = "";
  loss;
  lossAmount;
  
  constructor(private waveTypeService: WaveTypeService, private router: Router) { }

  ngOnInit() {
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

  createWaveType() {
    var waveType = {
      waveTypeName: this.name,
      weight: this.weight,
      slug: this.slug,
      loss: this.loss,
      lossAmount: this.lossAmount
    }
    this.waveTypeService.createWaveType(waveType).subscribe(res => {
      this.router.navigate(['/WaveType']);
    })
  }

}
