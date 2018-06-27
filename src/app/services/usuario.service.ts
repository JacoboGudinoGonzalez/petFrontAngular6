import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService{
	public url: string;
	public identity; 
	public token;

	constructor(private _http: Http){
		this.url = 'rest/controller/';
	}

	register(usuarioToRegister){
		let params = JSON.stringify(usuarioToRegister);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+"registerUser", params, {headers: headers})
				.map(res => res.json());
	}

	login(usuarioToLogin, getToken = null){

		if(getToken != null){
			usuarioToLogin.getToken = getToken;
		}

		let params = JSON.stringify(usuarioToLogin);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+"loginUser", params, {headers: headers})
				.map(res => res.json());
	}

	updateUsuario(usuarioToUpdate){
		let params = JSON.stringify(usuarioToUpdate);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':this.getToken()
		}); 

		return this._http.put(this.url+"updateUser", params, {headers: headers})
				.map(res => res.json());
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}

	getAllUsers(user){
		return this._http.get(this.url+"getAllUsers/cliente").map((res:Response) => res.json());
	}

	getProfile(id){
		return this._http.get(this.url+"getProfile/"+id).map((res:Response) => res.json());
	}
}


