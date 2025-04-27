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

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    this.vehiculosService.getVehiculos().subscribe((data) => {
      this.vehiculos = data;
    });
  }
}
