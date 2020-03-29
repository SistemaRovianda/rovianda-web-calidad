import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () =>
      import("./features/landing/pages/login/login-page.module").then(
        m => m.LoginPageModule
      )
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import(
        "src/app/features/dashboard/layout.module"
      ).then(m => m.LayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
