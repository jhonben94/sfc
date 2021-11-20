import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AsignacionPuntosService,
  ClientesService,
  PuntosService,
  TipoDocumentoService,
} from "src/app/services";
import { OtrosService } from "src/app/services/otros.service";
import { formatearFecha } from "src/app/utils";
import swal from "sweetalert2";
@Component({
  selector: "app-asignacion-puntos-edit",
  templateUrl: "./asignacion-puntos-edit.component.html",
  styleUrls: ["./asignacion-puntos-edit.component.css"],
})
export class AsignacionPuntosEditComponent implements OnInit {
  form: FormGroup;
  id: any;
  titulo: any;
  constructor(
    private fb: FormBuilder,
    private service: AsignacionPuntosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      limiteInferior: ["", Validators.required],
      limiteSuperior: ["", Validators.required],
      montoEquivalencia: ["", Validators.required],
      diasVigencia: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.titulo = "MODIFICAR CONCEPTO DE PUNTOS";
      //obtener datos de la persona.
      // settear en el formulario.

      this.service.obtenerRecurso(this.id).subscribe((res: any) => {
        const r = res.dato;
        this.f.limiteInferior.setValue(r.limiteInferior);
        this.f.limiteSuperior.setValue(r.limiteSuperior);
        this.f.montoEquivalencia.setValue(r.montoEquivalencia);
        this.f.diasVigencia.setValue(r.diasVigencia);
      });
    } else {
      this.titulo = "AGREGAR CONCEPTO DE PUNTOS";
    }
  }

  confirmar() {
    let valorForm = this.form.value;

    if (this.id) {
      this.service.modificarRecurso(valorForm, this.id).subscribe(
        (res) => {
          swal
            .fire({
              title: "Éxito!",
              text: "El registro fue modificado correctamente.",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
            })
            .then(() => {
              this.form.reset();
              this.router.navigate(["asignacion-puntos/"]);
            });
        },
        (err) => {
          swal.fire({
            title: "Error!",
            text: "Error al modificar el registro.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-info",
            },
            buttonsStyling: false,
          });
        }
      );
    } else {
      this.service.agregarRecurso(valorForm).subscribe(
        (res) => {
          swal
            .fire({
              title: "Éxito!",
              text: "El registro fue creado correctamente.",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
            })
            .then(() => {
              this.form.reset();
            });
        },
        (err) => {
          swal.fire({
            title: "Error!",
            text: "Error al guardar el registro.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-info",
            },
            buttonsStyling: false,
          });
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(["/asignacion-puntos"]);
  }

  get f() {
    return this.form.controls;
  }
}
