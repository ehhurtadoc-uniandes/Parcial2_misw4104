import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo.model';
import { VehiculosService } from '../vehiculos.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.component.html',
  styleUrls: ['./listar-vehiculos.component.css'],
  imports: [CommonModule]
})
export class ListarVehiculosComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  marcaConteo: { [key: string]: number } = {};

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    this.vehiculosService.getVehiculos().subscribe((data) => {
      this.vehiculos = data;
      this.contarMarcas();
    });
  }

  contarMarcas(): void {
    this.marcaConteo = {};
    this.vehiculos.forEach(vehiculo => {
      if (this.marcaConteo[vehiculo.marca]) {
        this.marcaConteo[vehiculo.marca]++;
      } else {
        this.marcaConteo[vehiculo.marca] = 1;
      }
    });
  }

  obtenerMarcas(): string[] {
    return Object.keys(this.marcaConteo);
  }

}
