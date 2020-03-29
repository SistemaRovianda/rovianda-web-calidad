import { Component, OnInit } from "@angular/core";
import { DocumentInterface } from "src/app/shared/models/document.interface";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import { SELECT_DOCUMENTS_LOADING, SELECT_DOCUMENTS } from "../../store/historial-page/documents/documents.selector";
import {
  SELECT_STATE_FILTER,
  SELECT_IS_FILTER
} from "../../store/historial-page/filter/filter.selector";

@Component({
  selector: "app-table-documents",
  templateUrl: "./table-documents.component.html",
  styleUrls: ["./table-documents.component.scss"]
})
export class TableDocumentsComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  isLoading;
  documents: DocumentInterface[];
  filter: string;
  isfilter;

  ngOnInit(): void {
    this.store
      .select(SELECT_DOCUMENTS_LOADING)
      .subscribe(loading => (this.isLoading = loading));
    this.store
      .select(SELECT_STATE_FILTER)
      .subscribe(tempFilter => (this.filter = tempFilter));
    this.store.select(SELECT_IS_FILTER).subscribe(tempIsFilter => {
      this.isfilter = tempIsFilter;
      this.documentsFilter();
    });
  }

  documentsFilter() {
    this.store.select(SELECT_DOCUMENTS).subscribe(tempDocuments =>{
      if (this.isfilter) {
        this.documents = tempDocuments.filter(temp =>
          temp.name.toLowerCase().includes(this.filter)
        );
      } else {
        this.documents = tempDocuments;
      }
    })
  }
}
