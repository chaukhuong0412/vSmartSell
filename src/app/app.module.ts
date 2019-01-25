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
import { ProducerEditDialogComponent } from './warehouse/producer/producer-edit-dialog/producer-edit-dialog.component';
import { Select2Module } from 'ng2-select2';
import { SupplierHomeComponent } from './warehouse/supplier/supplier-home/supplier-home.component';
import { ProducerCreateDialogComponent } from './warehouse/producer/producer-create-dialog/producer-create-dialog.component';
import { SupplierCreateComponent } from './warehouse/supplier/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './warehouse/supplier/supplier-edit/supplier-edit.component';
import { PipesCommonModule } from './pipes/pipes-common/pipes-common.module';
import { PaymentCreateDialogComponent } from './warehouse/payment/payment-create-dialog/payment-create-dialog.component';
import { PaymentHomeComponent } from './warehouse/payment/payment-home/payment-home.component';
import { PaymentsTableComponent } from './warehouse/payment/payments-table/payments-table.component';
import { PaymentsFilterComponent } from './warehouse/payment/payments-filter/payments-filter.component';
import { TaxonomyHomeComponent } from './warehouse/taxonomy/taxonomy-home/taxonomy-home.component';
import { UnitHomeComponent } from './warehouse/taxonomy/unit/unit-home/unit-home.component';
import { UnitCreateComponent } from './warehouse/taxonomy/unit/unit-create/unit-create.component';
import { UnitEditComponent } from './warehouse/taxonomy/unit/unit-edit/unit-edit.component';
import { WaveTypeHomeComponent } from './warehouse/taxonomy/wave-type/wave-type-home/wave-type-home.component';
import { WaveTypeEditComponent } from './warehouse/taxonomy/wave-type/wave-type-edit/wave-type-edit.component';
import { WaveTypeCreateComponent } from './warehouse/taxonomy/wave-type/wave-type-create/wave-type-create.component';
import { GroupProductTypeHomeComponent } from './warehouse/taxonomy/group-product-type/group-product-type-home/group-product-type-home.component';
import { GroupProductTypeCreateComponent } from './warehouse/taxonomy/group-product-type/group-product-type-create/group-product-type-create.component';
import { GroupProductTypeEditComponent } from './warehouse/taxonomy/group-product-type/group-product-type-edit/group-product-type-edit.component';
import { WarehouseHomeComponent } from './warehouse/warehouse/warehouse-home/warehouse-home.component';
import { WarehouseCreateDialogComponent } from './warehouse/warehouse/warehouse-create-dialog/warehouse-create-dialog.component';
import { WarehouseEditDialogComponent } from './warehouse/warehouse/warehouse-edit-dialog/warehouse-edit-dialog.component';
import { ProductNameHomeComponent } from './warehouse/product-name/product-name-home/product-name-home.component';
import { ProductNameCreateComponent } from './warehouse/product-name/product-name-create/product-name-create.component';
import { ProductNameEditComponent } from './warehouse/product-name/product-name-edit/product-name-edit.component';
import { HttpErrorInterceptor } from './helper/http-error.interceptor';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';


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
    ProducerEditDialogComponent,
    SupplierHomeComponent,
    ProducerCreateDialogComponent,
    SupplierCreateComponent,
    SupplierEditComponent,
    PaymentCreateDialogComponent,
    PaymentHomeComponent,
    PaymentsTableComponent,
    PaymentsFilterComponent,
    TaxonomyHomeComponent,
    UnitHomeComponent,
    UnitCreateComponent,
    UnitEditComponent,
    WaveTypeHomeComponent,
    WaveTypeEditComponent,
    WaveTypeCreateComponent,
    GroupProductTypeHomeComponent,
    GroupProductTypeCreateComponent,
    GroupProductTypeEditComponent,
    WarehouseHomeComponent,
    WarehouseCreateDialogComponent,
    WarehouseEditDialogComponent,
    ProductNameHomeComponent,
    ProductNameCreateComponent,
    ProductNameEditComponent,
    ErrorDialogComponent,
    
    
    
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
        path: 'Company',
        component: CompanyHomeComponent
      },
      {
        path: 'Store',
        component: StoreHomeComponent
      },
      {
        path: 'Client',
        component: ClientComponent
      },
      {
        path: 'Config/:id',
        component: StoreConfigComponent
      },
      {
        path: 'Supplier',
        component: SupplierHomeComponent
      },
      {
        path: 'Supplier/Edit/:id',
        component: SupplierEditComponent
      },
      {
        path: 'Supplier/Create',
        component: SupplierCreateComponent
      },
      
      {
        path: 'Producer',
        component: ProducerHomeComponent
      },
      {
        path: 'Payment',
        component: PaymentHomeComponent
      },
      {
        path: 'Taxonomy',
        component: TaxonomyHomeComponent
      },
      {
        path: 'Unit',
        component: UnitHomeComponent
      },
      {
        path: 'Unit/Create',
        component: UnitCreateComponent
      },
      {
        path: 'Unit/Edit/:id',
        component: UnitEditComponent
      },
      {
        path: 'WaveType',
        component: WaveTypeHomeComponent
      },
      {
        path: 'WaveType/Create',
        component: WaveTypeCreateComponent
      },
      {
        path: 'WaveType/Edit/:id',
        component: WaveTypeEditComponent
      },
      {
        path: 'GroupProductType',
        component: GroupProductTypeHomeComponent
      },
      {
        path: 'GroupProductType/Create',
        component: GroupProductTypeCreateComponent
      },
      {
        path: 'GroupProductType/Edit/:id',
        component: GroupProductTypeEditComponent
      },
      {
        path: 'Warehouse',
        component: WarehouseHomeComponent
      },
      {
        path: 'ProductName',
        component: ProductNameHomeComponent
      },
      {
        path: 'ProductName/Create',
        component: ProductNameCreateComponent
      },
      {
        path: 'ProductName/Edit/:id',
        component: ProductNameEditComponent
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
    PipesCommonModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    AuthGuard,
    FlxUiDataTable,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent, UserCreateDialogComponent, UserEditDialogComponent, RoleCreateDialogComponent,
      RoleEditDialogComponent,CompanyCreateDialogComponent, CompanyEditDialogComponent, StoreCreateDialogComponent, StoreEditDialogComponent,ClientComponent,
      StoreConfigCreateDialogComponent, StoreConfigEditDialogComponent, ProducerCreateDialogComponent, ProducerEditDialogComponent,PaymentCreateDialogComponent,
      WarehouseCreateDialogComponent, WarehouseEditDialogComponent,ErrorDialogComponent]

})
export class AppModule { }
