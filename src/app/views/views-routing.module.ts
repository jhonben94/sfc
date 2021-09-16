import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientesEditComponent } from "./clientes/clientes-edit/clientes-edit.component";
import { ClientesComponent } from "./clientes/clientes.component";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "clientes",
        component: ClientesComponent,
      },
      {
        path: "clientes/agregar",
        component: ClientesEditComponent,
      },

      {
        path: "clientes/modificar/:id",
        component: ClientesEditComponent,
      },
    ],
  },
];
