import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-search-drief",
  templateUrl: "./search-drief.component.html",
  styleUrls: ["./search-drief.component.scss"],
})
export class SearchDriefComponent implements OnInit {
  dataDrief: any;
  @Input() public set drief(data: any) {
    this.dataDrief = data[0];
    if (this.dataDrief) this.assignedData(this.dataDrief.outputs);
  }

  displayedColumns: string[] = [
    "number",
    "date",
    "product",
    "lot",
    "observations",
  ];
  dataSource: any;
  constructor() {}

  ngOnInit() {}

  assignedData(events: any) {
    this.dataSource = events;
  }
}
