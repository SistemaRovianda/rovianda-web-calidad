import { Component, OnInit } from "@angular/core";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import { singOut } from "../../landing/store/login/login.action";
import { selectEmail } from "../../landing/store/user/user.selector";

@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}
  email:string=localStorage.getItem("email");
  ngOnInit(): void {
    
  }

  logout() {
    this.store.dispatch(singOut());
  }
}
