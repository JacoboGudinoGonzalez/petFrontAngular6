import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders }   from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CuidadorComponent } from './components/cuidador/cuidador.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RegisterComponent } from './components/register/register.component';
import { UsuarioEditComponent } from './components/usuario-edit/usuario-edit.component';
import { SelectCuidadorComponent } from './components/select-cuidador/select-cuidador.component';

import { UsuarioService } from './services/usuario.service';
import { PassDataService } from './services/passData.service';
import { UploadService } from './services/upload.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPopper } from 'angular-popper';
import { AgmCoreModule } from '@agm/core';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ClienteComponent,
    CuidadorComponent,
    ContactoComponent,
    RegisterComponent,
    LoginComponent,
    UsuarioEditComponent,
    SelectCuidadorComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCu4wKOQL_4AJCdVYbBGzEQBljGpGDK40w",
      libraries: ["places"]
    }),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    NgxPopper,
    ModalModule.forRoot()
  ],
  providers: [
    appRoutingProviders, PassDataService, UsuarioService, UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
