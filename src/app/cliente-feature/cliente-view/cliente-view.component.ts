import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../models/usuario.model';
import {of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.component.html',
  styleUrls: ['./cliente-view.component.scss']
})
export class ClienteViewComponent implements OnInit {

  clientToSearch = '';
  displayedUsuarios: Usuario[];
  usuarios: Usuario[];

  constructor(public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.getAllUsuarios().subscribe(res => {
      this.usuarios = res as Usuario[];
      this.displayedUsuarios = res as Usuario[];
    });
  }

  onSearchValue(event: any): void {
    of(event.target.value).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => {
        if (!term || !term.length) {
          return this.usuarios;
        } else {
          const res = this.usuarios
            .filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1);
          return res;
        }
      }))
      .subscribe(res => {
          this.displayedUsuarios = res;

      });
  }
}
