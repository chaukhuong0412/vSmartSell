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

import { RoleHomeComponent } from './role/role-home/role-home.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UiModule } from './ui/ui.module';
import { UserCreateDialogComponent } from './user/user-create-dialog/user-create-dialog.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserEditDialogComponent } from './user/user-edit-dialog/user-edit-dialog.component';
import { RoleCreateDialogComponent } from './role/role-create-dialog/role-create-dialog.component';
import { RoleEditDialogComponent } from './role/role-edit-dialog/role-edit-dialog.component';
import { CompanyHomeComponent } from './company/company-home/company-home.component';
import { CompanyCreateDialogComponent } from './company/company-create-dialog/company-create-dialog.component';
import { CompanyEditDialogComponent } from './company/company-edit-dialog/company-edit-dialog.component';
import { StoreHomeComponent } from './store/store-home/store-home.component';
import { StoreCreateDialogComponent } from './store/store-create-dialog/store-create-dialog.component';
import { StoreEditDialogComponent } from './store/store-edit-dialog/store-edit-dialog.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { AuthGuard } from './guard/auth.guard';
import { ClientComponent } from './client/client/client.component';
import { StoreConfigComponent } from './store/store-config/store-config.component';
import { StoreConfigEditDialogComponent } from './store/store-config-edit-dialog/store-config-edit-dialog.component';
import { StoreConfigCreateDialogComponent } from './store/store-config-create-dialog/store-config-create-dialog.component';
import { ProducerHomeComponent } from './warehouse/producer/producer-home/producer-home.component';
import { ProducerEditComponent } from './warehouse/producer/producer-edit/producer-edit.component';
import { Select2Module } from 'ng2-select2';
import { SupplierHomeComponent } from './warehouse/supplier/supplier-home/supplier-home.component';
import { ProducerCreateComponent } from './warehouse/producer/producer-create/producer-create.component';
import { SupplierCreateDialogComponent } from './warehouse/supplier/supplier-create-dialog/supplier-create-dialog.component';
import { SupplierEditDialogComponent } from './warehouse/supplier/supplier-edit-dialog/supplier-edit-dialog.component';
import { PipesCommonModule } from './pipes/pipes-common/pipes-common.module';


@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    RoleHomeComponent,
    ConfirmationDialogComponent,
    UserCreateDialogComponent,
    UserEditDialogComponent,
    RoleCreateDialogComponent,
    RoleEditDialogComponent,
    CompanyHomeComponent,
    CompanyCreateDialogComponent,
    CompanyEditDialogComponent,
    StoreHomeComponent,
    StoreCreateDialogComponent,
    StoreEditDialogComponent,
    LoginComponent,
    ClientComponent,
    StoreConfigComponent,
    StoreConfigEditDialogComponent,
    StoreConfigCreateDialogComponent,
    ProducerHomeComponent,
    ProducerEditComponent,
    SupplierHomeComponent,
    ProducerCreateComponent,
    SupplierCreateDialogComponent,
    SupplierEditDialogComponent,
    
    
    
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
        path: 'Role',
        component: RoleHomeComponent
      },
      {
        path: 'CongTy',
        component: CompanyHomeComponent
      },
      {
        path: 'CuaHang',
        component: StoreHomeComponent
      },
      {
        path: 'TaiKhoan',
        component: ClientComponent
      },
      {
        path: 'Config/:id',
        component: StoreConfigComponent
      },
      {
        path: 'Producer',
        component: ProducerHomeComponent
      },
      {
        path: 'Producer/Edit/:id',
        component: ProducerEditComponent
      },
      {
        path: 'Producer/Create',
        component: ProducerCreateComponent
      },
      
      {
        path: 'Supplier',
        component: SupplierHomeComponent
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
    NgbModule,
    MatTabsModule,
    Select2Module,
    PipesCommonModule
  ],
  providers: [
    AuthGuard,
    FlxUiDataTable,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, UserCreateDialogComponent, UserEditDialogComponent, RoleCreateDialogComponent,
      RoleEditDialogComponent,CompanyCreateDialogComponent, CompanyEditDialogComponent, StoreCreateDialogComponent, StoreEditDialogComponent,ClientComponent,
      StoreConfigCreateDialogComponent, StoreConfigEditDialogComponent, SupplierCreateDialogComponent,SupplierEditDialogComponent]

})
export class AppModule { }
