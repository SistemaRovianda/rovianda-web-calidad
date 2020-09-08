import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-search-packaging",
  templateUrl: "./search-packaging.component.html",
  styleUrls: ["./search-packaging.component.scss"],
})
export class SearchPackagingComponent implements OnInit {
  _packaging: any;
  @Input() public set packaging(data: any) {
    this._packaging = data[0];
    if (this._packaging) this.assignedData(this._packaging.outputs);
  }

  displayedColumns: string[] = ["number", "name", "date"];
  dataSource: any;
  constructor() {}

  ngOnInit() {}

  assignedData(events: any) {
    this.dataSource = events;
  }
}
