import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../user/user/user.service';
import { SupplierService } from 'src/app/warehouse/supplier/supplier.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ProducerService } from 'src/app/warehouse/producer/producer.service';

@Component({
  selector: 'app-producer-edit-dialog',
  templateUrl: './producer-edit-dialog.component.html',
  styleUrls: ['./producer-edit-dialog.component.scss']
})
export class ProducerEditDialogComponent implements OnInit {

  title;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ProducerEditDialogComponent>, 
              private _producerService: ProducerService, private router: Router) { }

  ngOnInit() {
    
    this._producerService.getProducer(this.data.id).subscribe( result => {
      this.title = result.title;
    });
  }

  save() {
    var producer = {
      id: this.data.id,
      title: this.title
    }
    this._producerService.editProducer(producer).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}