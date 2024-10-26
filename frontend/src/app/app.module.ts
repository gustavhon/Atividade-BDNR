import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // <- Importação do FormsModule
import { HttpClientModule } from '@angular/common/http';  // <- Importação do HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ListaAlunoComponent } from './components/lista-aluno/lista-aluno.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { EditarAlunoComponent } from './components/editar-aluno/editar-aluno.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaAlunoComponent,
    CadastroAlunoComponent,
    EditarAlunoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  // <- Adicione aqui o FormsModule
    HttpClientModule  // <- Adicione aqui o HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
