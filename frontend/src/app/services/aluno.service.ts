import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  _id?: string;
  codaluno: string;
  nomealuno: string;
  curso: string;
  sexo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:3000/alunos'; // Endpoint da API

  constructor(private http: HttpClient) {}

  // Função para criar um novo aluno
  createAluno(aluno: Aluno): Observable<Aluno> {
    console.log('Cadastrando aluno:', aluno); // Log para debug
    return this.http.post<Aluno>(`${this.apiUrl}`, aluno);
  }

  // Função para obter a lista de alunos
  getAlunos(): Observable<Aluno[]> {
    console.log('Buscando lista de alunos...');
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  // Função para excluir um aluno
  deleteAluno(id: string): Observable<void> {
    console.log(`Excluindo aluno com ID: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Função para buscar um aluno por ID
  getAlunoById(id: string): Observable<Aluno> {
    console.log(`Buscando aluno com ID: ${id}`);
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  // Função para atualizar um aluno
  updateAluno(aluno: Aluno): Observable<Aluno> {
    console.log(`Atualizando aluno com ID: ${aluno._id}`);
    return this.http.put<Aluno>(`${this.apiUrl}/${aluno._id}`, aluno);
  }
}
