import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListagemProdutosComponent } from './pages/produtos/listagem/listagem.component';
import { ListagemUsuariosComponent } from './pages/usuarios/listagem/listagem.component';
import { CadastroEdicaoUsuariosComponent } from './pages/usuarios/cadastro-edicao/cadastro-edicao.component';
import { usuarioGuard as UsuarioGuard } from './guards/usuario.guard';
import { CadastroEdicaoProdutosComponent } from './pages/produtos/cadastro-edicao/cadastro-edicao.component';
 
export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent
    },
    { 
        path: 'usuarios', 
        component: ListagemUsuariosComponent
    },
    { 
        path: 'usuarios/cadastrar', 
        component: CadastroEdicaoUsuariosComponent, 
        // canActivate: [UsuarioGuard]
    },
    { 
        path: 'usuarios/editar/:id', 
        component: CadastroEdicaoUsuariosComponent,
        // canActivate: [UsuarioGuard]
    },
    { 
        path: 'produtos', 
        component: ListagemProdutosComponent
    },
    { 
        path: 'produtos/cadastrar', 
        component: CadastroEdicaoProdutosComponent, 
        // canActivate: [UsuarioGuard]
    },
    { 
        path: 'produtos/editar/:id', 
        component: CadastroEdicaoProdutosComponent,
        // canActivate: [UsuarioGuard]
    },
];
 
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
 