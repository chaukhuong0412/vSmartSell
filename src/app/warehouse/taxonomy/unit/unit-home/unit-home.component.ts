import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from 'src/app/unit.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RouterLink, Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-unit-home',
  templateUrl: './unit-home.component.html',
  styleUrls: ['./unit-home.component.scss']
})
export class UnitHomeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;


  units;

  constructor(private unitService : UnitService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    var createUnit = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/Unit/Create']);
      },
    };

    var headerDiv = document.getElementById('headerDiv');
    while (headerDiv.firstChild) {
      headerDiv.removeChild(headerDiv.firstChild);
    }

    var createUnitButton = document.createElement("button");
    createUnitButton.className = "btn btn-primary rightFloatButton";
    createUnitButton.innerHTML = '<i class="fa fa-plus"> Tạo đơn vị mới</i>';
    headerDiv.append(createUnitButton);
    createUnitButton.addEventListener("click", createUnit);


    this.dtOptions = {
      ordering: false,
      paging: false,
      info: false,
      searching: false,
      language: {
        processing: "Đang xử lý",
        search: "Tìm kiếm",
        lengthMenu: "Hiển thị _MENU_ tài khoản",
        info: "Hiển thị tài khoản _START_ tới _END_ trong tổng số _TOTAL_ tài khoản",
        infoEmpty: "Hiển thị tài khoản 0 tới 0 trong tổng số 0 tài khoản",
        paginate: {
          first: "Premier",
          previous: "Lùi",
          next: "Tới",
          last: "Cuối"
        }
      }
    };

    this.unitService.getAllUnits().subscribe(res => {
      this.units = res;
    })



    this.update();
  }

  update() {
    this.unitService.getAllUnits().subscribe(result => {
      this.units = result;
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
    this.unitService.deleteUnit(id).subscribe(result => {
      this.update();
    })
  }

  openDeleteConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn xóa đơn vị này không?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogConfirmationRef = null;
    });
  }

}
