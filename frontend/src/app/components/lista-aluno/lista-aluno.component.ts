import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-lista-aluno',
  templateUrl: './lista-aluno.component.html',
  styleUrls: ['./lista-aluno.component.css']
})
export class ListaAlunoComponent implements OnInit {
  alunos: Aluno[] = [];

  constructor(private alunoService: AlunoService, private router: Router) {}

  ngOnInit(): void {
    this.alunoService.getAlunos().subscribe((data) => {
      this.alunos = data;
    });
  }

  excluir(id: string | undefined) {
    if (id) {
      this.alunoService.deleteAluno(id).subscribe(() => {
        this.alunos = this.alunos.filter((aluno) => aluno._id !== id);
      });
    } else {
      console.error('ID do aluno não definido.');
    }
  }

  editar(aluno: Aluno) {
    if (aluno._id) {
      this.router.navigate(['/editar', aluno._id]); // Redireciona para a página de edição com o ID do aluno
    } else {
      console.error('ID do aluno não definido.');
    }
  }
}
