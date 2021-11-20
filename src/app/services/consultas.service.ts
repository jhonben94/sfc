import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ConsultasService {
  recurosBaseURL: string = environment.URL_BASE + "consultas/";
  constructor(private http: HttpClient) {}
  reporteUsoPuntos(param) {
    return this.http.get(this.recurosBaseURL + "puntos-vencer/" + param);
  }

  reporteBolsasEnRangoPuntos(param) {
    return this.http.post(this.recurosBaseURL + "bolsas/", param);
  }
  reporteUsoPuntosList(param) {
    return this.http.post(this.recurosBaseURL + "puntos/", param);
  }
}
