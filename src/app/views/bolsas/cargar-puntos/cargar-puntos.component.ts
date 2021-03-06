import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, of } from "rxjs";
import {
  CANTIDAD_PAG_DEFAULT,
  CANTIDAD_PAG_LIST,
  deleteEmptyData,
} from "../../../utils";
import { startWith, switchMap, catchError, map } from "rxjs/operators";
import { BolsasService, VencimientoPuntosService } from "src/app/services";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { BuscadorClienteComponent } from "../../buscadores/buscador-cliente/buscador-cliente.component";
import { EquivalenciaPuntosComponent } from "../equivalencia-puntos/equivalencia-puntos.component";
import { BuscadorConceptoPuntosComponent } from "../../buscadores/buscador-concepto-puntos/buscador-concepto-puntos.component";
declare const $: any;

@Component({
  selector: "app-cargar-puntos",
  templateUrl: "./cargar-puntos.component.html",
  styleUrls: ["./cargar-puntos.component.css"],
})
export class CargarPuntosComponent implements OnInit {
  selectedRow: any;

  /**
   * @type {boolean}
   * @description Flag que maneja el Expansion Panel de filtros
   */
  expanded = true;

  /**
   * @type {object}
   * @description Form para capturar los datos a ser utilizado como filtros para la grilla
   */
  filtrosForm = this.fb.group({
    descripcion: [""],
  });

  constructor(
    public dialogRef: MatDialogRef<CargarPuntosComponent>,
    private fb: FormBuilder,
    private service: BolsasService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.filtrosForm = this.fb.group({
      cliente: [""],
      nombreCliente: [""],

      montoOperacion: [""],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  get f() {
    return this.filtrosForm.controls;
  }

  buscadores(buscador) {
    let dialogRef = null;
    switch (buscador) {
      case "cliente":
        dialogRef = this.dialog.open(BuscadorClienteComponent, {
          data: {
            title: "Buscador de Clientes",
          },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          console.log(result);
          if (result) {
            this.f.nombreCliente.setValue(
              result.nombre + " " + result.apellido
            );
            this.f.cliente.setValue(result.cliente);
          } else {
            this.f.nombreCliente.setValue(null);
            this.f.cliente.setValue(null);
          }
        });
        break;

      default:
        break;
    }
  }
  botonesAccionesBolsa(key) {
    let dialogRef = null;
    switch (key) {
      case "equivalencia":
        dialogRef = this.dialog.open(EquivalenciaPuntosComponent, {
          data: {},
        });

        dialogRef.afterClosed().subscribe((result: any) => {});
        break;

      default:
        break;
    }
  }

  confirmar() {
    const valueFrom = this.filtrosForm.value;
    const cliente = valueFrom.cliente;
    const montoOperacion = valueFrom.montoOperacion;

    const data = {
      cliente,
      montoOperacion,
    };
    console.log(data);

    this.service.cargarPuntos(data).subscribe(
      (res) => {
        swal
          .fire({
            title: "??xito!",
            text: "La carga de puntos se realizo correctamente.",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          })
          .then(() => {
            this.dialogRef.close();
            this.filtrosForm.reset();
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
