import { Component } from '@angular/core';
import { PageTittleComponent } from "../../../components/page-tittle/page-tittle.component";
import { UsuariosService } from '../../../services/usuarios.service';
import { IUsuario } from '../../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listagem',
    standalone: true,
    templateUrl: './listagem.component.html',
    styleUrl: './listagem.component.css',
    imports: [PageTittleComponent, CommonModule, RouterLink],
    providers: [UsuariosService]
})
export class ListagemUsuariosComponent {
  tituloDaPagina:string = 'Usuários'
  usuarios: IUsuario[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.usuariosService.buscarUsuarios().subscribe((usuarios: any) => {
      this.usuarios = usuarios;
    },error => {
      console.error(error);
    });
  }

  removerUsuario(id: number) {
    if (id) {
      this.exibirConfirmação(id);
    }
  }

  exibirConfirmação(id: number) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Não será possível reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remover!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.removerUsuario(id).subscribe(result => {
          this.usuarios = this.usuarios.filter(usuarioLista => usuarioLista.id !== id );
          Swal.fire({
            title: "Removido!",
            text: "Usuário removido com sucesso.",
            icon: "success"
          });
          this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)
        },error => {
          console.error(error);
        }
        );
      }
    });
  }
}
