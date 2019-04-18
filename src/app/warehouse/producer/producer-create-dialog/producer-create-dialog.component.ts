import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/warehouse/supplier/supplier.service';
import { MatDialogRef } from '@angular/material';
import { ProducerService } from 'src/app/warehouse/producer/producer.service';

@Component({
  selector: 'app-producer-create-dialog',
  templateUrl: './producer-create-dialog.component.html',
  styleUrls: ['./producer-create-dialog.component.scss']
})
export class ProducerCreateDialogComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<ProducerCreateDialogComponent>, private _producerService: ProducerService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  createProducer() {
    var producer = {
      title: this.title
    };
    this._producerService.createProducer(producer).subscribe(res => {
      this.dialogRef.close("Create");
    })
  }

}