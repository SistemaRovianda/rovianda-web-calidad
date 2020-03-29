import { Component, OnInit, Input } from "@angular/core";
import { HistorialInterface } from "src/app/shared/models/historial.interface";

@Component({
  selector: "app-card-historial",
  templateUrl: "./card-historial.component.html",
  styleUrls: ["./card-historial.component.scss"]
})
export class CardHistorialComponent implements OnInit {
  constructor() {}
  @Input() historial: HistorialInterface;

  ngOnInit(): void {}
}
