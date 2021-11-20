import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/app.module";
import { MdModule } from "src/app/md/md.module";
import { routes } from "./views-routing.module";
import { ClientesComponent } from "./clientes/clientes.component";
import { ClientesEditComponent } from "./clientes/clientes-edit/clientes-edit.component";
import { PuntosComponent } from "./puntos/puntos.component";
import { PuntosEditComponent } from "./puntos/puntos-edit/puntos-edit.component";
import { AsignarPuntosComponent } from "./asignar-puntos/asignar-puntos.component";
import { AsignarPuntosEditComponent } from "./asignar-puntos/asignar-puntos-edit/asignar-puntos-edit.component";
import { VencimientoPuntosComponent } from './vencimiento-puntos/vencimiento-puntos.component';
import { VencimientoPuntosEditComponent } from './vencimiento-puntos/vencimiento-puntos-edit/vencimiento-puntos-edit.component';
import { BuscadorClienteComponent } from './buscadores/buscador-cliente/buscador-cliente.component';
import { BolsasComponent } from './bolsas/bolsas.component';
import { AsignacionPuntosComponent } from './asignacion-puntos/asignacion-puntos.component';
import { AsignacionPuntosEditComponent } from './asignacion-puntos/asignacion-puntos-edit/asignacion-puntos-edit.component';
import { EquivalenciaPuntosComponent } from './bolsas/equivalencia-puntos/equivalencia-puntos.component';
import { UtilizarPuntosComponent } from './bolsas/utilizar-puntos/utilizar-puntos.component';
import { BuscadorConceptoPuntosComponent } from './buscadores/buscador-concepto-puntos/buscador-concepto-puntos.component';
import { CargarPuntosComponent } from './bolsas/cargar-puntos/cargar-puntos.component';
import { ReportUsoPuntosComponent } from './reportes/report-uso-puntos/report-uso-puntos.component';
import { ReportBolsaPuntoComponent } from './reportes/report-bolsa-punto/report-bolsa-punto.component';
import { ReportClienteComponent } from './reportes/report-cliente/report-cliente.component';
import { ReportePuntosComponent } from './reportes/reporte-puntos/reporte-puntos.component';

@NgModule({
  declarations: [
    ClientesComponent,
    ClientesEditComponent,
    PuntosComponent,
    PuntosEditComponent,
    AsignarPuntosComponent,
    AsignarPuntosEditComponent,
    VencimientoPuntosComponent,
    VencimientoPuntosEditComponent,
    BuscadorClienteComponent,
    BolsasComponent,
    AsignacionPuntosComponent,
    AsignacionPuntosEditComponent,
    EquivalenciaPuntosComponent,
    UtilizarPuntosComponent,
    BuscadorConceptoPuntosComponent,
    CargarPuntosComponent,
    ReportUsoPuntosComponent,
    ReportBolsaPuntoComponent,
    ReportClienteComponent,
    ReportePuntosComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MdModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ViewsModule {}
