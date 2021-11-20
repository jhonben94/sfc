import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientesService, TipoDocumentoService } from "src/app/services";
import { OtrosService } from "src/app/services/otros.service";
import { formatDateInsert, formatearFecha, parseDate } from "src/app/utils";
import swal from "sweetalert2";
@Component({
  selector: "app-clientes-edit",
  templateUrl: "./clientes-edit.component.html",
  styleUrls: ["./clientes-edit.component.css"],
})
export class ClientesEditComponent implements OnInit {
  prefijoTelefono: any;

  form: FormGroup;
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
      correo: ["", [Validators.required, Validators.email]],
      telefono: ["", Validators.required],
      nacionalidad: ["", Validators.required],
      documento: ["", Validators.required],
      tipoDocumento: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.titulo = "MODIFICAR CLIENTE";
      //obtener datos de la persona.
      // settear en el formulario.
      this.tipoDocumentoService.listarRecurso({}).subscribe((res: any) => {
        this.listaTipoDoc = res.lista;
        this.nacionalidadService.listarNac().subscribe((resp: any) => {
          this.listaNacionalidades = resp;

          this.service.obtenerRecurso(this.id).subscribe((res: any) => {
            const r = res.dato;
            console.log(r);

            this.f.nombre.setValue(r.nombre);
            this.f.apellido.setValue(r.apellido);
            this.f.fechaNacimiento.setValue(parseDate(r.fechaNacimiento));
            this.f.correo.setValue(r.correo);
            this.f.tipoDocumento.setValue(r.tipoDocumento);
            this.f.nacionalidad.setValue(r.nacionalidad);
            this.seleccionarPrefijo(r.nacionalidad);
            this.f.documento.setValue(r.documento);
            this.f.telefono.setValue(r.telefono);
          });
        });
      });
    } else {
      this.titulo = "AGREGAR CLIENTE";

      this.tipoDocumentoService.listarRecurso({}).subscribe((res: any) => {
        this.listaTipoDoc = res.lista;
        this.nacionalidadService.listarNac().subscribe((resp: any) => {
          this.listaNacionalidades = resp;
        });
      });
    }
  }

  confirmar() {
    let valorForm = this.form.value;
    valorForm.prefijo = this.prefijoTelefono;
    valorForm.fechaNacimiento = formatDateInsert(valorForm.fechaNacimiento);
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
              this.prefijoTelefono = "";
              this.router.navigate(["clientes/"]);
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
    let pais = this.listaNacionalidades.find((x) => x.codigo == codigo);
    console.log(pais);

    this.prefijoTelefono = pais.prefijoTelefono;
  }

  get f() {
    return this.form.controls;
  }
}
