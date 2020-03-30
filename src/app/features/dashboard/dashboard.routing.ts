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
        path: "add-user",
        loadChildren: () =>
          import("./pages/add-user-page/add-user-page.module").then(
            m => m.AddUserPageModule
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
