import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageTittleComponent } from "../../../components/page-tittle/page-tittle.component";
import { IProduto } from '../../../interfaces/produto';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../../services/produtos.service';

@Component({
    selector: 'app-cadastro-edicao',
    standalone: true,
    templateUrl: './cadastro-edicao.component.html',
    styleUrl: './cadastro-edicao.component.css',
    imports: [ReactiveFormsModule, PageTittleComponent, CommonModule]
})
export class CadastroEdicaoProdutosComponent {

  constructor(private produtosService: ProdutosService,
              private router: Router,
              private route: ActivatedRoute){};

  produtoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    codigoBarras: new FormControl('', [Validators.minLength(13), Validators.maxLength(13), Validators.required]),
    quantidade: new FormControl(0, [Validators.min(1), Validators.required]),
    preco: new FormControl(0, [Validators.min(1), Validators.required]),
  })

  id: number = 0;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    try {
      const idNumber = Number(id);

      if (idNumber) {
        this.id = idNumber;
        this.produtosService.buscarProdutoPorId(idNumber).subscribe(produto => {
          this.produtoForm.patchValue({
            nome: produto.nome,
            codigoBarras: produto.codigoBarras,
            quantidade: produto.quantidade,
            preco: produto.preco
          })
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  cadastrarProdutos() {
    const produto: IProduto = this.produtoForm.value as unknown as IProduto;

    // produto.ativo = true;

    if (this.id) {
      produto.id = this.id;
    }

    this.produtosService.cadastrarEditarProduto(produto).subscribe((result) =>
    {
      console.log(result);
      Swal.fire({
        title: "Sucesso!",
        text: `Usuário ${this.id ? 'editado' : 'cadastrado'} com sucesso`,
        icon: "success"
      });
      this.router.navigateByUrl('/produtos');
    }, 
    erro => {
      console.error(erro);
    }
    );
  }
}
