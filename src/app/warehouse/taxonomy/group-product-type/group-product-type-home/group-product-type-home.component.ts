import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { GroupProductTypeService } from '../group-product-type.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-group-product-type-home',
  templateUrl: './group-product-type-home.component.html',
  styleUrls: ['./group-product-type-home.component.scss']
})
export class GroupProductTypeHomeComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogConfirmationRef: MatDialogRef<ConfirmationDialogComponent>;


  groupProductTypes;

  constructor(private groupProductTypeService : GroupProductTypeService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    var createGroupProductType = {
      router: this.router,
      handleEvent: function( event ) {
        this.router.navigate(['/GroupProductType/Create']);
      },
    };

    var headerDiv = document.getElementById('headerDiv');
    while (headerDiv.firstChild) {
      headerDiv.removeChild(headerDiv.firstChild);
    }

    var createGroupProductTypeButton = document.createElement("button");
    createGroupProductTypeButton.className = "btn btn-primary rightFloatButton";
    createGroupProductTypeButton.innerHTML = '<i class="fa fa-plus"> Tạo loại hàng mới</i>';
    headerDiv.append(createGroupProductTypeButton);
    createGroupProductTypeButton.addEventListener("click", createGroupProductType);


    this.dtOptions = {
      ordering: false,
      paging: false,
      info: false,
      searching: false,
      language: Config.tableInformation

    };

    this.groupProductTypeService.getAllGroupProductTypes().subscribe(res => {
      this.groupProductTypes = res;
    })

    this.update();
  }

  update() {
    this.groupProductTypeService.getAllGroupProductTypes().subscribe(result => {
      this.groupProductTypes = result;
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
    this.groupProductTypeService.deleteGroupProductType(id).subscribe(result => {
      this.update();
    })
  }

  openDeleteConfirmationDialog(id) {
    this.dialogConfirmationRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogConfirmationRef.componentInstance.confirmMessage = "Bạn có muốn xóa loại hàng này không?"
    this.dialogConfirmationRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogConfirmationRef = null;
    });
  }

}
