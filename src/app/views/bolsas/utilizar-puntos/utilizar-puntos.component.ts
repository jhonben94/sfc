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
import { MatDialog } from "@angular/material/dialog";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { BuscadorClienteComponent } from "../../buscadores/buscador-cliente/buscador-cliente.component";
import { EquivalenciaPuntosComponent } from "../equivalencia-puntos/equivalencia-puntos.component";
import { BuscadorConceptoPuntosComponent } from "../../buscadores/buscador-concepto-puntos/buscador-concepto-puntos.component";
declare const $: any;

@Component({
  selector: "app-utilizar-puntos",
  templateUrl: "./utilizar-puntos.component.html",
  styleUrls: ["./utilizar-puntos.component.css"],
})
export class UtilizarPuntosComponent implements OnInit {
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
    private fb: FormBuilder,
    private service: BolsasService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.filtrosForm = this.fb.group({
      cliente: [""],
      nombreCliente: [""],
      concepto: [""],
      nombreConcepto: [""],
      puntosUtilizados: [""],
    });
  }

  ngOnInit(): void {
    this.f.puntosUtilizados.disable();
  }

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

      case "concepto":
        dialogRef = this.dialog.open(BuscadorConceptoPuntosComponent, {
          data: {
            title: "Buscador de Clientes",
          },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          console.log(result);
          if (result) {
            this.f.nombreConcepto.setValue(result.descripcionConcepto);
            this.f.concepto.setValue(result.concepto);
            this.f.puntosUtilizados.setValue(result.puntosRequeridos);
          } else {
            this.f.nombreConcepto.setValue(null);
            this.f.concepto.setValue(null);
            this.f.puntosUtilizados.setValue(null);
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
    this.showNotification("top", "center", "danger", "mensaje de texto");
  }

  showNotification(from: any, align: any, type: any, message: any) {
    $.notify(
      {
        icon: "notifications",
        message: message,
      },
      {
        type: type,
        timer: 3000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }
}
