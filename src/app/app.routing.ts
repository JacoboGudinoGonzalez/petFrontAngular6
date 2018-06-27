import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CuidadorComponent } from './components/cuidador/cuidador.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RegisterComponent } from './components/register/register.component';
import { UsuarioEditComponent } from './components/usuario-edit/usuario-edit.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'profile', component: ProfileComponent},
	{path: 'login', component: LoginComponent},
	{path: 'cliente', component: ClienteComponent},
	{path: 'cuidador', component: CuidadorComponent},
	{path: 'contacto', component: ContactoComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'mis-datos', component: UsuarioEditComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
