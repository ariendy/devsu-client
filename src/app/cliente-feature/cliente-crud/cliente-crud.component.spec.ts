import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';


import {of} from 'rxjs';
import {UsuarioService} from '../../services/usuario.service';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ClienteCrudComponent} from './cliente-crud.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

describe('ClienteCrudComponent', () => {
  let component: ClienteCrudComponent;
  let fixture: ComponentFixture<ClienteCrudComponent>;
  let usuarioServiceMock: jest.Mocked<UsuarioService>;

  beforeEach(waitForAsync(() => {
    usuarioServiceMock = {
      getUsuarioById: jest.fn().mockReturnValue(of(
        {
          personaId: 1,
          identificacion: 'Identificacion 1',
          nombre: 'Nombre 1',
          direccion: 'C/nombre calle #25, sector 1',
          telefono: '###-###-####',
          contrasenia: '123',
          genero: 'M',
          edad: 30,
          estado: true
        }
      )),
    } as unknown as jest.Mocked<UsuarioService>;
    TestBed.configureTestingModule({
      declarations: [ClienteCrudComponent],
      providers: [
        {provide: UsuarioService, useValue: usuarioServiceMock},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({id: '123'})}}}
      ],
      imports: [RouterTestingModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get usuario by ID', () => {
    expect(usuarioServiceMock.getUsuarioById).toHaveBeenCalled();
  });

});
