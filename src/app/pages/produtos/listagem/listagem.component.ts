import { Component } from '@angular/core';
import { PageTittleComponent } from "../../../components/page-tittle/page-tittle.component";
import { ProdutosService } from '../../../services/produtos.service';
import { IProduto } from '../../../interfaces/produto';
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
    providers: [ProdutosService]
})
export class ListagemProdutosComponent {
  tituloDaPagina:string = 'Produtos'
  produtos: IProduto[] = [];

  constructor(private produtosService: ProdutosService) {}

  ngOnInit() {
    this.produtosService.buscarProdutos().subscribe((produtos: any) => {
      this.produtos = produtos;
    },error => {
      console.error(error);
    });
  }

  removerProduto(id: number) {
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
        this.produtosService.removerProduto(id).subscribe(result => {
          this.produtos = this.produtos.filter(produtoLista => produtoLista.id !== id );
          Swal.fire({
            title: "Removido!",
            text: "Usuário removido com sucesso.",
            icon: "success"
          });
          this.produtos = this.produtos.filter(produto => produto.id !== id)
        },error => {
          console.error(error);
        }
        );
      }
    });
  }
}
