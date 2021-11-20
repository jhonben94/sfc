import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class AsignacionPuntosService {
  recurosBaseURL: string = environment.URL_BASE + "asignacion-puntos/";

  constructor(private http: HttpClient) {}
  activarRecurso(id) {
    return this.http.put(this.recurosBaseURL + id + "/activar", {});
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL, recurso);
  }
  modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + id, recurso);
  }
  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + id);
  }
  obtenerRecurso(id) {
    return this.http.get(this.recurosBaseURL + id);
  }
  listarRecurso(params) {
    return this.http.post(this.recurosBaseURL + "paginado/", params);

    // return this.http.get(this.recurosBaseURL, { params: ejemplo });
  }
}
