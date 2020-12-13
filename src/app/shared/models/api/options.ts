import { HttpParams, HttpHeaders } from '@angular/common/http';

export interface OptionsApi {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | string[] };
    itsAList?: boolean;
}
