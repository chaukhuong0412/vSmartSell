import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../store.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { StoreConfigCreateDialogComponent } from '../store-config-create-dialog/store-config-create-dialog.component';
import { StoreConfigEditDialogComponent } from '../store-config-edit-dialog/store-config-edit-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { Config } from 'src/app/config';
import { StoreConfigService } from '../store-config.service';

@Component({
  selector: 'app-store-config',
  templateUrl: './store-config.component.html',
  styleUrls: ['./store-config.component.scss']
})
export class StoreConfigComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogEditRef:  MatDialogRef<StoreConfigEditDialogComponent>;
  dialogCreateRef: MatDialogRef<StoreConfigCreateDialogComponent>;

  storeConfigs;

  private sub: any;
  private storeId : number;


  constructor(private _cuaHangService: StoreService, private storeConfigService: StoreConfigService, private route : ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params  => {
          this.storeId = +params["id"]; // cast to number
      }
    );
    
    this.dtOptions = {
      ordering: false,
      paging: false,
      info: false,
      searching: false,
      language: Config.tableInformation

    };

    this.update();
  }

  update() {
    this.storeConfigService.getStoreConfigOfStore(this.storeId).subscribe(result => {
      this.storeConfigs = result;
    })
  
    this.rerender();
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
    });
  }

  delete(id) {
    this.storeConfigService.deleteStoreConfig(id).subscribe(result => {
      this.update();
    });
  }

  openDeleteConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Bạn có muốn xóa config này không?"
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
      this.dialogRef = null;
    });
  }

  openCreateConfigDialog() {
    this.dialogCreateRef = this.dialog.open(StoreConfigCreateDialogComponent, {
      disableClose: false,
      width: '745px',
      data: {
        id: this.storeId
      }
    });
    this.dialogCreateRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.update();
      }
      this.dialogCreateRef = null;
    });
  }

  openEditConfigDialog(id) {
    this.dialogEditRef = this.dialog.open(StoreConfigEditDialogComponent, {
      disableClose: false,
      width: '745px',
      data: {
        id: id
      }
    });
    this.dialogEditRef.afterClosed().subscribe(result => {
      if (result) {
        this.update();
      }
      this.dialogEditRef = null;
    });
  }
}
