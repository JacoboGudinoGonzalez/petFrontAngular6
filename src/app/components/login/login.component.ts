import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { GLOBAL } from '../../services/global';
import { UsuarioService } from '../../services/usuario.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers:[UsuarioService]
})
export class LoginComponent implements OnInit{
	public title: string;
	public usuario: Usuario;
	public status: string; 
	public identity;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService
		){
		this.title = 'Login';
		this.usuario = new Usuario('','','','','','','',0);
	}

	ngOnInit(){
		//console.log(this._usuarioService.getIdentity());
		//console.log(this._usuarioService.getToken());
	}

	onSubmit(){
		this._usuarioService.login(this.usuario).subscribe(
			response => {
				this.identity = response.user;
				if(!this.identity){
					console.log("error el usuario no se ha logeado correctamente");
				}else{
					this.identity.password = '';

					localStorage.setItem('identity', JSON.stringify(this.identity));

					this._usuarioService.login(this.usuario, 'true').subscribe(
						response => {
							this.token = response.token;
							if(this.token.length <= 0){
								console.log("el token no se ha generado");
							}else{
								localStorage.setItem('token', this.token);
								this.status = 'success';
								this._router.navigate(['/']);
							}
							this.usuario = new Usuario('','','','','','','',0);
						},
						error =>{
							console.log(<any>error);
						}
					);
				}
				this.usuario = new Usuario('','','','','','','',0);
			},
			error =>{
				var errorMessage = <any>error;

				if(errorMessage!=null){
					var body = JSON.parse(error._body);
					this.status = 'error';
				}
			}
		);
	}
}