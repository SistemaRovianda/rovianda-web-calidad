import { Component, OnInit } from "@angular/core";
import { DocumentInterface } from "src/app/shared/models/document.interface";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import {
  SELECT_DOCUMENTS_LOADING,
  SELECT_DOCUMENTS,
} from "../../store/historial-page/documents/documents.selector";
import {
  SELECT_STATE_FILTER,
  SELECT_IS_LOADING,
  SELECT_TYPE_MATERIAL,
  SELECT_RESULT_LOT_FOUND,
  FILTER_STATE,
} from "../../store/historial-page/filter/filter.selector";
import { Observable } from "rxjs";
import { FilterInterface } from "src/app/shared/models/filter.interface";
import { STATE_INITIAL_FILTER } from "../../store/historial-page/filter/filter.reducer";

@Component({
  selector: "app-table-documents",
  templateUrl: "./table-documents.component.html",
  styleUrls: ["./table-documents.component.scss"],
})
export class TableDocumentsComponent implements OnInit {
  state: FilterInterface;
  constructor(private store: Store<AppStateInterface>) {}

  isLoading;
  documents: DocumentInterface[];
  filter: string;
  isFound: boolean;
  typeMaterial: string;

  ngOnInit(): void {
    this.store
      .select(SELECT_IS_LOADING)
      .subscribe((loading) => (this.isLoading = loading));
    this.store
      .select(SELECT_DOCUMENTS_LOADING)
      .subscribe((loading) => (this.isLoading = loading));
    this.store
      .select(SELECT_STATE_FILTER)
      .subscribe((tempFilter) => (this.filter = tempFilter));
    this.store.select(SELECT_TYPE_MATERIAL).subscribe((material) => {
      this.typeMaterial = material;
    });
    this.store.select(SELECT_RESULT_LOT_FOUND).subscribe((isFound) => {
      this.isFound = isFound;
      if (isFound) {
        this.loadOptions();
      } else {
        this.documents = [];
      }
    });
    this.store.select(FILTER_STATE).subscribe((filter) => {
      this.state = filter;
      if (this.isFound) {
        this.loadOptions();
      }
    });
  }

  loadOptions() {
    console.log(this.typeMaterial);
    if (this.typeMaterial === "meat") {
      this.documents = [
        {
          name: "Recepcion materia prima cárnicos",
          path: `entry/meat/${this.filter}`,
          dates: false,
        },
        {
          name: "Bitácora de control de calidad formulación",
          path: `formulation/${this.state.dateIni}/${this.state.dateFinal}/${this.filter}`,
          dates: true,
        },

        {
          name: "Bitácora de control de calidad sala de trabajo",
          path: `process?dateStart=${this.state.dateIni}&dateEnd=${this.state.dateFinal}&entranceId=${this.filter}`,
          dates: true,
        },
        {
          name: "Bitácora de control de calidad cocimiento del producto",
          path: `oven/${this.state.dateIni}/${this.state.dateFinal}/${this.filter}`,
          dates: true,
        },
        {
          name: "Bitácora de control de rebanado y empacado",
          path: `packaging/${this.state.dateIni}/${this.state.dateFinal}/${this.filter}`,//"packagin"
          dates: true,
        },
        {
          name: "Inspección de producto terminado y salida",
          path: `ended-product/${this.state.dateIni}/${this.state.dateFinal}/${this.filter}`,//"report/document/entry/packing"
          dates: true,
        },
      ];
    } else if (this.typeMaterial === "drief") {
      this.documents = [
        {
          name: "Recepción de materia prima secos",
          path: `entry/drief/${localStorage.getItem("historialID")}`,
          dates: false,
        },
        {
          name: "Bitácora de control de pep's almacén",
          path: `warehouse?initDate=${this.state.dateIni}&finalDate=${this.state.dateFinal}`,
          dates: true,
        },
      ];
    } else if (this.typeMaterial === "packaging") {
      this.documents = [
        {
          name: "Bitácora de control de calidad almacén empaques",
          path: `entry/packing/${localStorage.getItem("historialID")}`,
          dates: false,
        },
      ];
    }
  }
}
