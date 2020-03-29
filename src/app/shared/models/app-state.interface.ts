import { UserInterface } from './user.interface';
import { LoginPageInterface } from './login-page.interface';
import { HistorialListInterface } from './historial-list.interface';
import { DocumentsInterface } from './documents.interface';
import { FilterInterface } from './filter.interface';

export interface AppStateInterface {
    user: UserInterface;
    login: LoginPageInterface;
    historial: HistorialListInterface;
    documents: DocumentsInterface;
    filterHistorialPage: FilterInterface;
}
