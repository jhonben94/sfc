import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, of } from "rxjs";
import {
  CANTIDAD_PAG_DEFAULT,
  deleteEmptyData,
  formatearFecha,
} from "../../../utils";
import { startWith, switchMap, catchError, map } from "rxjs/operators";
import {
  ClientesService,
  ConsultasService,
  ReporteService,
} from "src/app/services";
import { MatDialog } from "@angular/material/dialog";
import swal from "sweetalert2";
import { Router } from "@angular/router";
declare const $: any;
import { BuscadorClienteComponent } from "../../buscadores/buscador-cliente/buscador-cliente.component";
@Component({
  selector: "app-report-bolsa-punto",
  templateUrl: "./report-bolsa-punto.component.html",
  styleUrls: ["./report-bolsa-punto.component.css"],
})
export class ReportBolsaPuntoComponent implements OnInit {
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

  /**
   * @type {number}
   * @description Cantidad total de registros obtenidos para la grilla.
   */
  resultsLength = 0;

  /**
   * @type {boolean}
   * @description Flag utilizado para confirmar verificar el estado de la peticion de la grilla
   */
  isLoadingResults = true;

  /**
   * @type {boolean}
   */
  isRateLimitReached = false;

  /**
   * @type {Array}
   * @description Definicion de las columnas a ser visualizadas
   */
  displayedColumns: string[] = [
    "bolsaPunto",
    "fechaAsignacionPuntos",
    "fechaVencimientoPuntos",
    "puntajeUtilizado",
    "saldoPuntos",
    "montoOperacion",
    "cliente",
  ];

  /**
   * @type {Array}
   * @description Definicion dinamica de las columnas a ser visualizadas
   */
  listaColumnas: any = [
    {
      matDef: "bolsaPunto",
      label: "bolsaPunto",
      descripcion: "BOLSA",
    },
    {
      matDef: "fechaAsignacionPuntos",
      label: "fechaAsignacionPuntos",
      descripcion: "FECHA ASIGNACION",
    },

    {
      matDef: "fechaVencimientoPuntos",
      label: "fechaVencimientoPuntos",
      descripcion: "FECHA VENCIMIENTO",
    },
    {
      matDef: "puntajeUtilizado",
      label: "puntajeUtilizado",
      descripcion: "PUNTAJE UTILIZADO",
    },
    {
      matDef: "saldoPuntos",
      label: "saldoPuntos",
      descripcion: "SALDO",
    },
    {
      matDef: "montoOperacion",
      label: "montoOperacion",
      descripcion: "MONTO",
    },
    {
      matDef: "cliente",
      label: "cliente",
      descripcion: "CLIENTE",
      relacion: true,
      columnaRelacion: ["nombre", "apellido"],
    },
  ];
  /**
   * @type {Array}
   * @description Lista que contiene los valores para la grilla
   */
  data: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private service: ConsultasService,
    private router: Router,
    public dialog: MatDialog,
    private exportarService: ReporteService
  ) {
    this.filtrosForm = this.fb.group({
      cliente: ["", Validators.required],
      nombreCliente: [""],
      montoIni: ["", Validators.required],
      montoFin: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    //this.paginator.pageSize = CANTIDAD_PAG_DEFAULT;

    var mainPanel = document.getElementsByClassName("main-panel")[0];
    $(".modal").on("shown.bs.modal", function () {
      mainPanel.classList.add("no-scroll");
    });
    $(".modal").on("hidden.bs.modal", function () {
      mainPanel.classList.remove("no-scroll");
    });
  }

  ngAfterViewInit() {
    // Si se cambia el orden, se vuelve a la primera pag.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    //this.buscar();
  }

  get f() {
    return this.filtrosForm.controls;
  }

  buscar() {
    this.isLoadingResults = true;
    const valueForm = this.filtrosForm.value;
    delete valueForm.nombreCliente;
    this.service.reporteBolsasEnRangoPuntos(valueForm).subscribe(
      (resp: any) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.data = resp;
      },
      (error) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.data = [];
      }
    );
  }

  openDialog(): void {
    this.router.navigate(["/servicio/agregar"]);
  }

  acciones(data, e) {}

  mostrarCampo(row, columna) {
    if (columna.relacion) {
      if (row[columna.label] == null) return "";
      if (Array.isArray(columna.columnaRelacion)) {
        return this.multipleColumnas(
          row[columna.label],
          columna.columnaRelacion
        );
      }
      return row[columna.label][columna.columnaRelacion];
    } else {
      if (typeof columna.estados != "undefined") {
        const label = row[columna.label]
          ? columna.estados[0]
          : columna.estados[1];
        return label;
      }
      if (columna.fecha) {
        return formatearFecha(new Date(row.fecha));
      }
      if (columna.cliente) {
        return row.cliente.nombre + "  " + row.cliente.apellido;
      }
      if (columna.factura) {
        return row.prefijoFactura + " " + row.nroFactura;
      }

      return row[columna.label];
    }
  }
  multipleColumnas(valor: any, listaCol: any[]) {
    let valorRetorno = "";
    for (let index = 0; index < listaCol.length; index++) {
      const property = listaCol[index];
      valorRetorno += valor[property] + " ";
    }
    return valorRetorno;
  }
  limpiar() {
    this.filtrosForm.reset();
    this.data = [];
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
            this.f.nombreEmpleado.setValue(null);
          }
        });
        break;

      default:
        break;
    }
  }

  downloadPdf() {
    this.exportarService.exportPdf(this.data, this.listaColumnas);
  }
  downloadExcel() {
    let lista = [];
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      let tempObj = {};
      for (let jota = 0; jota < this.listaColumnas.length; jota++) {
        const columnaDef = this.listaColumnas[jota];
        tempObj[columnaDef.matDef] = this.mostrarCampo(element, columnaDef);
      }
      lista.push(tempObj);
    }
    this.exportarService.exportExcel(lista, "excel");
  }
}
