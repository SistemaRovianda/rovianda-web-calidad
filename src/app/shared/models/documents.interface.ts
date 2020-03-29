import { DocumentInterface } from './document.interface';

export interface DocumentsInterface {
  loading: boolean;
  error: string;
  documents: DocumentInterface[];
  downloadDocument: boolean;
}
