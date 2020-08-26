import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IsAuthGuard } from './shared/guards/is-auth.guard';
import { AuthGaurd } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    canActivate: [IsAuthGuard],
    loadChildren: () =>
      import("./features/landing/pages/login/login-page.module").then(
        m => m.LoginPageModule
      )
  },
  {
    path: "dashboard",
    canActivate:[AuthGaurd],
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
