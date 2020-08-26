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
}
