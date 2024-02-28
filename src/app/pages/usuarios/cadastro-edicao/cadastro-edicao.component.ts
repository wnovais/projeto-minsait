import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageTittleComponent } from "../../../components/page-tittle/page-tittle.component";
import { UsuariosService } from '../../../services/usuarios.service';
import { IUsuario } from '../../../interfaces/usuario';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cadastro-edicao',
    standalone: true,
    templateUrl: './cadastro-edicao.component.html',
    styleUrl: './cadastro-edicao.component.css',
    imports: [ReactiveFormsModule, PageTittleComponent, CommonModule]
})
export class CadastroEdicaoUsuariosComponent {

  constructor(private usuarioService: UsuariosService,
              private router: Router,
              private route: ActivatedRoute){};

  usuarioForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    idade: new FormControl()
  })

  id: number = 0;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    try {
      const idNumber = Number(id);

      if (idNumber) {
        this.id = idNumber;
        this.usuarioService.buscarUsuarioPorId(idNumber).subscribe(usuario => {
          this.usuarioForm.patchValue({
            nome: usuario.nome,
            idade: usuario.idade
          })
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  cadastrarUsuarios() {
    const usuario: IUsuario = this.usuarioForm.value as unknown as IUsuario;

    usuario.ativo = true;

    if (this.id) {
      usuario.id = this.id;
    }

    this.usuarioService.cadastrarEditarUsuario(usuario).subscribe((result) =>
    {
      console.log(result);
      Swal.fire({
        title: "Sucesso!",
        text: `Usuário ${this.id ? 'editado' : 'cadastrado'} com sucesso`,
        icon: "success"
      });
      this.router.navigateByUrl('/usuarios');
    }, 
    erro => {
      console.error(erro);
    }
    );
  }
}
