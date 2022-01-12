import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardLayoutComponent } from "./dashboard-layout/dashboard-layout.component";
import { DashboardLayoutModule } from "./dashboard-layout/dashboard-layout.module";
import { HIstorialResolver } from "src/app/shared/resolvers/historial.resolver";
import { DocumentsResolver } from "src/app/shared/resolvers/documents.resolver";

const ROUTES: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "historial",
        pathMatch: "full"
      },
      {
        path: "historial",
        loadChildren: () =>
          import("./pages/historial-page/historial-page.module").then(
            m => m.HistorialPageModule
          ),
        resolve: {
          historial: HIstorialResolver,
          documents: DocumentsResolver
        }
      },
      {
        path: "inventario",
        loadChildren: () =>
          import("./pages/inventory/inventory.module").then(
            m => m.InventoryModule
          )
      },
      {
        path:"productos",
        loadChildren: ()=>import("./pages/products/page/products-page/products-page.module").then(
          m=>m.ProductsPageModule
        )
      },
      {
        path:"productos/:productId",
        loadChildren: ()=>import("./pages/products/components/product-details/product-details.module").then(m=>m.ProductDetailsModule)
      },
      {
        path: "add-user",
        loadChildren: () =>
          import("./pages/add-user-page/add-user-page.module").then(
            m => m.AddUserPageModule
          )
      },
      {
        path: "list-users",
        loadChildren: () =>
          import("./pages/list-users/list-users.module").then(
            m => m.ListUsersModule
          )
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./pages/reports-page/reports-page.module").then(
            m => m.ReportsPageModule
          )
      },
      {
        path: "code",
        loadChildren:()=>import("./pages/code-page/code-page.module").then(
          m=>m.CodePageModule
        )
      }
    ]
  }
];

const COMMON_DECLARATIONS = [];

const COMMON_IMPORTS = [RouterModule.forChild(ROUTES), DashboardLayoutModule];

const COMMON_PROVIDERS = [HIstorialResolver, DocumentsResolver];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
  providers: COMMON_PROVIDERS
})
export class DashboardRoutingModule {}
