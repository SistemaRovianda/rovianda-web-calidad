import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DocumentsService } from "src/app/shared/Services/documents.service";
import * as fromDocumentsAction from "./documents.action";
import { exhaustMap, delay, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class DocumentsEffects {
  constructor(
    private action$: Actions,
    private documentService: DocumentsService
  ) {}

  loadDoduments$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromDocumentsAction.startLoadDocuments),
      exhaustMap(action =>
        this.documentService.getDocuments().pipe(
          delay(1000),
          switchMap(documents => [
            fromDocumentsAction.loadDocuments({ documents }),
            fromDocumentsAction.finishLoadDocuments()
          ]),
          catchError(error =>
            of(
              fromDocumentsAction.loadDocumentsFailure(error),
              fromDocumentsAction.finishLoadDocuments()
            )
          )
        )
      )
    )
  );

  dowloadDocumentEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromDocumentsAction.downloadDocument),
      exhaustMap(action =>
        this.documentService.downloadDocument(action.document).pipe(
          delay(500),
          switchMap(action => [fromDocumentsAction.finishDownloadDocuments()]),
          catchError(error =>
            of(
              fromDocumentsAction.loadDocumentsFailure(error),
              fromDocumentsAction.finishDownloadDocuments()
            )
          )
        )
      )
    )
  );
}
