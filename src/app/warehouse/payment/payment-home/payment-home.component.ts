import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SupplierService } from 'src/app/warehouse/supplier/supplier.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentCreateDialogComponent } from '../payment-create-dialog/payment-create-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-payment-home',
  templateUrl: './payment-home.component.html',
  styleUrls: ['./payment-home.component.scss']
})
export class PaymentHomeComponent implements OnInit {
  
  supplierId;
  payments;
  currentDebt;
  dialogCreateRef: MatDialogRef<PaymentCreateDialogComponent>;



  constructor(public dialog: MatDialog, private supplierService: SupplierService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
  }

  


}
