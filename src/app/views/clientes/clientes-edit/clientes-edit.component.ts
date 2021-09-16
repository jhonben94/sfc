import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientesService, TipoDocumentoService } from "src/app/services";
import { OtrosService } from "src/app/services/otros.service";
import { formatearFecha } from "src/app/utils";
import swal from "sweetalert2";
@Component({
  selector: "app-clientes-edit",
  templateUrl: "./clientes-edit.component.html",
  styleUrls: ["./clientes-edit.component.css"],
})
export class ClientesEditComponent implements OnInit {
  prefijoTelefono: any;

  form: any;
  id: any;
  titulo: any;
  listaTipoPersona: any[] = [{ codigo: "FISICA" }, { codigo: "JURIDICA" }];
  listaTipoDoc: any[];
  listaNacionalidades: any[];
  constructor(
    private fb: FormBuilder,
    private service: ClientesService,
    private tipoDocumentoService: TipoDocumentoService,
    private nacionalidadService: OtrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", Validators.required],
      nacionalidad: ["", Validators.required],
      documento: ["", Validators.required],
      idTipoDocumento: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.titulo = "MODIFICAR CLIENTE";
      //obtener datos de la persona.
      // settear en el formulario.
    } else {
      this.titulo = "AGREGAR CLIENTE";
    }
    this.tipoDocumentoService.listarRecurso({}).subscribe((res: any) => {
      this.listaTipoDoc = res.lista;
      this.nacionalidadService.listarNac().subscribe((resp: any) => {
        this.listaNacionalidades = resp;
      });
    });
  }

  confirmar() {
    let valorForm = this.form.value;

    valorForm.fechaNacimiento = formatearFecha(valorForm.fechaNacimiento);

    console.log(valorForm);

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
    this.router.navigate(["/clientes"]);
  }
  seleccionarPrefijo(codigo) {
    console.log("imprimir", codigo);
    let pais = this.listaNacionalidades.find((x) => x.codigo == codigo);
    this.prefijoTelefono = pais.prefijoTelefono;
  }
}
