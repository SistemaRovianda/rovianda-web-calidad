import { Component, OnInit, Input } from "@angular/core";
import { DocumentInterface } from "src/app/shared/models/document.interface";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import { SELECT_DOWNLOAD_DOCUMENT } from "../../store/historial-page/documents/documents.selector";
import * as fromDocumentsAction from "../../store/historial-page/documents/documents.action";

@Component({
  selector: "app-card-document",
  templateUrl: "./card-document.component.html",
  styleUrls: ["./card-document.component.scss"]
})
export class CardDocumentComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  @Input() document: DocumentInterface;

  isDownloadDocument;
  ngOnInit(): void {
    this.isDownloadDocument = false;
  }

  downloadDocument() {
    console.log(this.document);
    this.store.dispatch(
      fromDocumentsAction.downloadDocument({ document: this.document })
    );
    this.store
      .select(SELECT_DOWNLOAD_DOCUMENT)
      .subscribe(tempLoading => (this.isDownloadDocument = tempLoading));
  }
}
