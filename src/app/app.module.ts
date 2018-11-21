import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { HttpClientModule } from '@angular/common/http'; 


import { MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule, } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { FlxUiDatatableModule, FlxUiDataTable } from 'flx-ui-datatable';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PermissionHomeComponent } from './permission-home/permission-home.component';
import { PermissionCreateComponent } from './permission-create/permission-create.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { RoleHomeComponent } from './role-home/role-home.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    UserCreateComponent,
    UserEditComponent,
    PermissionHomeComponent,
    PermissionCreateComponent,
    PermissionEditComponent,
    RoleHomeComponent,
    RoleCreateComponent,
    RoleEditComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: UserHomeComponent
      },
      {
        path: 'Createuser',
        component: UserCreateComponent
      },
      {
        path: 'Edituser/:id',
        component: UserEditComponent
      },
      {
        path: 'Permission',
        component: PermissionHomeComponent
      },
      {
        path: 'Createpermission',
        component: PermissionCreateComponent
      },
      {
        path: 'Editpermission/:id',
        component: PermissionEditComponent
      },
      {
        path: 'Role',
        component: RoleHomeComponent
      },
      {
        path: 'Createrole',
        component: RoleCreateComponent
      },
      {
        path: 'Editrole/:id',
        component: RoleEditComponent
      }
      
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    DataTablesModule,
    FlxUiDatatableModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
    
  ],
  providers: [FlxUiDataTable],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]

})
export class AppModule { }
