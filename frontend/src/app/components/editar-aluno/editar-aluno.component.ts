import { Component, OnInit } from '@angular/core';
import { AlunoService, Aluno } from '../../services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css']
})
export class EditarAlunoComponent implements OnInit {
  aluno: Aluno = {
    codaluno: '',
    nomealuno: '',
    curso: '',
    sexo: ''
  };

  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Captura o ID da URL
    console.log('ID do aluno:', id); // Adiciona este log para garantir que o ID está sendo capturado
    if (id) {
      this.alunoService.getAlunoById(id).subscribe((data: Aluno) => {
        this.aluno = data; // Preenche o formulário com os dados do aluno
      }, (error: HttpErrorResponse) => {
        console.error('Erro ao buscar aluno:', error);
        this.mensagemErro = 'Erro ao carregar os dados do aluno.';
      });
    }
  }  

  // Função para atualizar o aluno
  onSubmit() {
    if (this.aluno._id) {
      this.alunoService.updateAluno(this.aluno).subscribe(
        () => {
          this.mensagemSucesso = 'Aluno atualizado com sucesso!';
          this.mensagemErro = null;
        },
        (error: HttpErrorResponse) => {
          console.error('Erro ao atualizar aluno:', error);
          this.mensagemErro = 'Erro ao atualizar aluno. Tente novamente mais tarde.';
          this.mensagemSucesso = null;
        }
      );
    } else {
      this.mensagemErro = 'ID do aluno não encontrado.';
      this.mensagemSucesso = null;
    }
  }

  cancelar() {
    this.router.navigate(['/alunos']); // Redireciona para a lista de alunos ao cancelar
  }
}
