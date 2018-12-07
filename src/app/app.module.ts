import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 


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
import { UserHomeComponent } from './user/user-home/user-home.component';
import { FlxUiDatatableModule, FlxUiDataTable } from 'flx-ui-datatable';
import { PermissionHomeComponent } from './permission-home/permission-home.component';
import { PermissionCreateComponent } from './permission-create/permission-create.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { RoleHomeComponent } from './role/role-home/role-home.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UiModule } from './ui/ui.module';
import { UserCreateDialogComponent } from './user/user-create-dialog/user-create-dialog.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserEditDialogComponent } from './user/user-edit-dialog/user-edit-dialog.component';
import { RoleCreateDialogComponent } from './role/role-create-dialog/role-create-dialog.component';
import { RoleEditDialogComponent } from './role/role-edit-dialog/role-edit-dialog.component';
import { CongtyHomeComponent } from './congty/congty-home/congty-home.component';
import { CongtyCreateDialogComponent } from './congty/congty-create-dialog/congty-create-dialog.component';
import { CongtyEditDialogComponent } from './congty/congty-edit-dialog/congty-edit-dialog.component';
import { CuahangHomeComponent } from './cuahang/cuahang-home/cuahang-home.component';
import { CuahangCreateDialogComponent } from './cuahang/cuahang-create-dialog/cuahang-create-dialog.component';
import { CuahangEditDialogComponent } from './cuahang/cuahang-edit-dialog/cuahang-edit-dialog.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { AuthGuard } from './guard/auth.guard';
import { RegionHomeComponent } from './region/region-home/region-home.component';
import { RegionCreateDialogComponent } from './region/region-create-dialog/region-create-dialog.component';
import { RegionEditDialogComponent } from './region/region-edit-dialog/region-edit-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    PermissionHomeComponent,
    PermissionCreateComponent,
    PermissionEditComponent,
    RoleHomeComponent,
    ConfirmationDialogComponent,
    UserCreateDialogComponent,
    UserEditDialogComponent,
    RoleCreateDialogComponent,
    RoleEditDialogComponent,
    CongtyHomeComponent,
    CongtyCreateDialogComponent,
    CongtyEditDialogComponent,
    CuahangHomeComponent,
    CuahangCreateDialogComponent,
    CuahangEditDialogComponent,
    LoginComponent,
    RegionHomeComponent,
    RegionCreateDialogComponent,
    RegionEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: 'Login',
        component: LoginComponent
      },
      {
        path: '',
        component: UserHomeComponent,
        canActivate: [AuthGuard]
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
        path: 'CongTy',
        component: CongtyHomeComponent
      },
      {
        path: 'KhuVuc',
        component: RegionHomeComponent
      },
      {
        path: 'CuaHang',
        component: CuahangHomeComponent
      },
      
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
    UiModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule
    
  ],
  providers: [
    AuthGuard,
    FlxUiDataTable,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, UserCreateDialogComponent, UserEditDialogComponent, RoleCreateDialogComponent,
      RoleEditDialogComponent,CongtyCreateDialogComponent, CongtyEditDialogComponent, CuahangCreateDialogComponent, CuahangEditDialogComponent,
      RegionCreateDialogComponent, RegionEditDialogComponent]

})
export class AppModule { }
