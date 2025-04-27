import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehiculosService } from './vehiculos.service';
import { Vehiculo } from './vehiculo.model';

describe('VehiculosService', () => {
  let service: VehiculosService;
  let httpMock: HttpTestingController;

  const dummyVehiculos: Vehiculo[] = [
    {
      id: 1,
      marca: 'Renault',
      linea: 'Kangoo',
      referencia: 'VU Express',
      modelo: 2017,
      kilometraje: 93272,
      color: 'Blanco',
      imagen: 'https://cdn.group.renault.com/ren/co/vehicles/kangoo/home/renault-kangoo-exterior.jpg'
    },
    {
      id: 2,
      marca: 'Chevrolet',
      linea: 'Spark',
      referencia: 'Life',
      modelo: 2018,
      kilometraje: 55926,
      color: 'Plata',
      imagen: 'https://turistran.com/2-thickbox_default/chevrolet-spark-life.jpg'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiculosService]
    });
    service = TestBed.inject(VehiculosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener la lista de vehículos', () => {
    service.getVehiculos().subscribe(vehiculos => {
      expect(vehiculos.length).toBe(2);
      expect(vehiculos).toEqual(dummyVehiculos);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyVehiculos);
  });
});
