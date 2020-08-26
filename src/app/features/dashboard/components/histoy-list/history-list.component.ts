import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "history-list",
  templateUrl: "./history-list.component.html",
  styleUrls: ["./history-list.component.scss"],
})
export class HistoryListComponent implements OnInit {
  dataSource: any;
  _meat: any;

  displayedColumns: string[] = ["Number", ""];

  @Input() public set meat(val: any) {
    this._meat = val;
    this.receiver();
  }

  constructor() {}

  ngOnInit() {}

  receiver() {
    console.log(this._meat);
  }
}
