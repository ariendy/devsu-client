import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ClienteViewComponent} from './cliente-view.component';
import {UsuarioService} from '../../services/usuario.service';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('ClienteViewComponent', () => {
  let component: ClienteViewComponent;
  let fixture: ComponentFixture<ClienteViewComponent>;
  let usuarioServiceMock: jest.Mocked<UsuarioService>;

  beforeEach(
    waitForAsync(() => {
      usuarioServiceMock = {
        getAllUsuarios: jest.fn().mockReturnValue(of([
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
          },
          {
            personaId: 2,
            identificacion: 'Identificacion 2',
            nombre: 'Nombre 2',
            direccion: 'C/nombre calle #25, sector 2',
            telefono: '###-###-####',
            contrasenia: '123',
            genero: 'F',
            edad: 20,
            estado: true
          },
          {
            personaId: 3,
            identificacion: 'Identificacion 3',
            nombre: 'Nombre 3',
            direccion: 'C/nombre calle #25, sector 3',
            telefono: '###-###-####',
            contrasenia: '123',
            genero: 'M',
            edad: 26,
            estado: true
          }
        ])),
      } as unknown as jest.Mocked<UsuarioService>;

      TestBed.configureTestingModule({
        declarations: [ClienteViewComponent],
        providers: [
          {provide: UsuarioService, useValue: usuarioServiceMock}
        ],
        imports: [FormsModule, RouterTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all usuarios', () => {
    expect(usuarioServiceMock.getAllUsuarios).toHaveBeenCalled();
  });

  it('should contains "Clientes"', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('.title').textContent).toContain('Clientes');
  });
});
