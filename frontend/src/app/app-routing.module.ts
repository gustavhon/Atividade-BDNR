import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlunoComponent } from './components/lista-aluno/lista-aluno.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { EditarAlunoComponent } from './components/editar-aluno/editar-aluno.component'; // Importar o novo componente

const routes: Routes = [
    { path: '', component: CadastroAlunoComponent }, // Página inicial para cadastro
    { path: 'cadastro', component: CadastroAlunoComponent },
    { path: 'alunos', component: ListaAlunoComponent }, // Verifica se o path está correto
    { path: 'editar/:id', component: EditarAlunoComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
