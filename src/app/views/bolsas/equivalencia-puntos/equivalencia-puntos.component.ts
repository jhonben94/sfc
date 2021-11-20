import { Component, OnInit } from "@angular/core";
import { BolsasService } from "src/app/services";

@Component({
  selector: "app-equivalencia-puntos",
  templateUrl: "./equivalencia-puntos.component.html",
  styleUrls: ["./equivalencia-puntos.component.css"],
})
export class EquivalenciaPuntosComponent implements OnInit {
  monto: any;
  mostrarRespuesta = false;
  puntos: any;
  constructor(private bolsaService: BolsasService) {}

  ngOnInit(): void {
    this.monto = 0;
  }
  consultar() {
    this.bolsaService.equivalenciaPuntos(this.monto).subscribe(
      (resp: any) => {
        console.log(resp);
        this.puntos = resp.dato;
      },
      (err) => {
        this.puntos = 0;
      }
    );
  }
}
