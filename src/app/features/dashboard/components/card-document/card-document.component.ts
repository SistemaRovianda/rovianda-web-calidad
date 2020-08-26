import { Component, OnInit, Input } from "@angular/core";
import { DocumentInterface } from "src/app/shared/models/document.interface";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import { saveAs } from "file-saver/dist/fileSaver";
import { DocumentsService } from "src/app/shared/Services/documents.service";
import { selectUID } from "src/app/features/landing/store/user/user.selector";
import { FilterInterface } from "src/app/shared/models/filter.interface";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-card-document",
  templateUrl: "./card-document.component.html",
  styleUrls: ["./card-document.component.scss"],
})
export class CardDocumentComponent implements OnInit {
  @Input() existDates: boolean;
  constructor(
    private store: Store<AppStateInterface>,
    private reports: DocumentsService,
    private toast: ToastrService
  ) {}

  @Input() document: DocumentInterface;

  isDownloadDocument;
  ngOnInit(): void {
    this.isDownloadDocument = false;
  }

  createPDF() {
    console.log(this.document);
    const extension = "pdf";
    if (this.document.dates && this.existDates) {
      this.dowloadDocument(extension);
    } else if (!this.document.dates) {
      this.dowloadDocument(extension);
    } else {
      this.toast.error("Faltan datos para generar este reporte (Fechas)");
    }
  }

  createExcel() {
    console.log(this.document);
    const extension = "xlsx";
    if (this.document.dates && this.existDates) {
      this.dowloadDocument(extension);
    } else if (!this.document.dates) {
      this.dowloadDocument(extension);
    } else {
      this.toast.error("Faltan datos para generar este reporte (Fechas)");
    }
  }

  dowloadDocument(extension: string) {
    this.toast.info("Generando reporte");
    this.reports
      .createReport(
        `${extension === "xlsx" ? "document/" : ""}${this.document.path}`
      )
      .subscribe((response) => {
        console.log(response);
        this.toast.success("Reporte generado exitosamente");
        const blob = new Blob([response.body], {
          type: `application/${extension}`,
        });
        const fileName = `${this.document.name}.${extension}`;
        saveAs(blob, fileName);
      });
  }
}
