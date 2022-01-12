import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { SELECT_GET_REPORT_LOADING } from "../../store/report-page/report.selector";
import * as fromGetReportActions from "../../store/report-page/report.action";

@Component({
  selector: "app-reports-page",
  templateUrl: "./reports-page.component.html",
  styleUrls: ["./reports-page.component.scss"]
})
export class ReportsPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "excel",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../../../../assets/icon-reports/file-excel-solid.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "pdf",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../../../../assets/icon-reports/file-pdf-solid.svg"
      )
    );
  }

  loading;

  reportForm = this.fb.group({
    dateSt: ["", [Validators.required]],
    dateEn: ["", [Validators.required]],
    typereport: ["", [Validators.required]],
    excel: new FormControl(false),
    pdf: new FormControl(false)
  });

  ngOnInit(): void {
    this.store
      .select(SELECT_GET_REPORT_LOADING)
      .subscribe(tempLoading => (this.loading = tempLoading));
  }

  changeCheckbox(value) {
    if (value === "excel") {
      this.reportForm.controls["pdf"].setValue(false);
    } else {
      this.reportForm.controls["excel"].setValue(false);
    }
  }

  get dateSt() {
    return this.reportForm.get("dateSt");
  }

  get dateEn() {
    return this.reportForm.get("dateEn");
  }

  get typereport() {
    return this.reportForm.get("typereport");
  }

  get excel() {
    return this.reportForm.get("excel").value;
  }
  get pdf() {
    return this.reportForm.get("pdf").value;
  }

  requestReport() {
    console.log(this.reportForm.value);

    this.store.dispatch(
      fromGetReportActions.getReport({
        report: {
          dateSt: this.dateSt.value,
          dateEn: this.dateSt.value,
          typeReport: this.typereport.value,
          extensionReport: this.excel.value ? "excel" : "pdf"
        }
      })
    );
  }
}
