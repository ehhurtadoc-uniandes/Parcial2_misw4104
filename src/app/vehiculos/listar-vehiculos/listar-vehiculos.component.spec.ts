import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarVehiculosComponent } from './listar-vehiculos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { Vehiculo } from '../vehiculo.model';
import { VehiculosService } from '../vehiculos.service';

describe('ListarVehiculosComponent', () => {
  let component: ListarVehiculosComponent;
  let fixture: ComponentFixture<ListarVehiculosComponent>;
  let mockVehiculos: Vehiculo[];

  beforeEach(async () => {
    mockVehiculos = [
      new Vehiculo(1, 'Renault', 'Kangoo', 'VU Express', 2017, 93272, 'Blanco', 'imagen1.jpg'),
      new Vehiculo(2, 'Chevrolet', 'Spark', 'Life', 2018, 55926, 'Plata', 'imagen2.jpg'),
      new Vehiculo(3, 'Toyota', 'Corolla', 'XEi', 2019, 30200, 'Rojo', 'imagen3.jpg')
    ];

    const vehiculosServiceMock = {
      getVehiculos: () => of(mockVehiculos)
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ListarVehiculosComponent, HttpClientTestingModule],
      providers: [{ provide: VehiculosService, useValue: vehiculosServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar 3 filas en la tabla', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRows = compiled.querySelectorAll('tbody tr');
    const tableHeaders = compiled.querySelectorAll('thead tr th');

    expect(tableHeaders.length).toBeGreaterThan(0);
    expect(tableRows.length).toBe(3);
  });

  it('debería contar las marcas correctamente', () => {
    component.contarMarcas();
    expect(component.marcaConteo['Renault']).toBe(1);
    expect(component.marcaConteo['Chevrolet']).toBe(1);
    expect(component.marcaConteo['Toyota']).toBe(1);
  });

  it('debería devolver las marcas únicas', () => {
    component.contarMarcas();
    const marcas = component.obtenerMarcas();
    expect(marcas.length).toBe(3);
    expect(marcas).toContain('Renault');
    expect(marcas).toContain('Chevrolet');
    expect(marcas).toContain('Toyota');
  });

});
