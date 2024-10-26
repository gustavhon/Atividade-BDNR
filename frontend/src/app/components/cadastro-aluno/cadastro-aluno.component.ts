import { Component } from '@angular/core';
import { AlunoService, Aluno } from '../../services/aluno.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent {
  aluno: Aluno = {
    codaluno: '',
    nomealuno: '',
    curso: '',
    sexo: ''
  };

  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  constructor(private alunoService: AlunoService) {}

  onSubmit() {
    if (this.aluno.codaluno && this.aluno.nomealuno && this.aluno.curso && this.aluno.sexo) {
      this.alunoService.createAluno(this.aluno).subscribe(
        () => {
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.mensagemErro = null; // Limpar mensagem de erro se houver sucesso
          this.aluno = {
            codaluno: '',
            nomealuno: '',
            curso: '',
            sexo: ''
          };
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) { // Verifica se o erro é de conflito de duplicidade
            this.mensagemErro = 'Aluno já possui cadastro!';
            this.mensagemSucesso = null; // Limpar mensagem de sucesso
          } else {
            this.mensagemErro = 'Erro ao cadastrar aluno. Tente novamente mais tarde.';
            this.mensagemSucesso = null;
          }
        }
      );
    } else {
      this.mensagemErro = 'Preencha todos os campos obrigatórios!';
      this.mensagemSucesso = null;
    }
  }
}
