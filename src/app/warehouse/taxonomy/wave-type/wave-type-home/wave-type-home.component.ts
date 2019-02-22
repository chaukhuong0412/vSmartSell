import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { WaveTypeService } from 'src/app/warehouse/taxonomy/wave-type/wave-type.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-wave-type-home',
  templateUrl: './wave-type-home.component.html',
  styleUrls: ['./wave-type-home.component.scss']
})
export class WaveTypeHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;


  waveTypes;

  constructor(private waveTypeService : WaveTypeService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    var createWaveType = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/WaveType/Create']);
      },
    };

    var headerDiv = document.getElementById('headerDiv');
    while (headerDiv.firstChild) {
      headerDiv.removeChild(headerDiv.firstChild);
    }

    var createWaveTypeButton = document.createElement("button");
    createWaveTypeButton.className = "btn btn-primary rightFloatButton";
    createWaveTypeButton.innerHTML = '<i class="fa fa-plus"> Tạo loại sóng mới</i>';
    headerDiv.append(createWaveTypeButton);
    createWaveTypeButton.addEventListener("click", createWaveType);


    this.dtOptions = {
      ordering: false,
      paging: false,
      info: false,
      searching: false,
      language: Config.tableInformation

    };

    this.waveTypeService.getAllWaveTypes().subscribe(res => {
      this.waveTypes = res;
    })

    this.update();
  }

  update() {
    this.waveTypeService.getAllWaveTypes().subscribe(result => {
      this.waveTypes = result;
      this.rerender();
    })

  }

  ngAfterViewInit(): void { this.dtTrigger.next(); }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
      console.log("rerender!");
    });
  }

  delete(id) {
    this.waveTypeService.deleteWaveType(id).subscribe(result => {
      this.update();
    })
  }

  openDeleteConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn xóa loại sóng này không?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogConfirmationRef = null;
    });
  }

}