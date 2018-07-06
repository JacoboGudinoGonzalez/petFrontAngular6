import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../../models/Usuario';
import { ServicePet } from '../../models/ServicePet';
import { UsuarioService } from '../../services/usuario.service';
import { PassDataService } from '../../services/passData.service';

@Component({
	selector: 'select-cuidador',
	templateUrl: './select-cuidador.component.html',
	styleUrls: ['./select-cuidador.component.css']
})

export class SelectCuidadorComponent implements OnInit {
	public title: string;
	public usuario: Usuario;
	public identity;
	public token;
	public url: string;
    public userArray;
    public newServicePet: ServicePet;

	constructor(
        private _router: Router,
        private _usuarioService: UsuarioService,
        private _passDataService: PassDataService
	) {
		this.title = 'Seleccionar Cuidador';
		this.url = 'rest/controller/';
		this.identity = this._usuarioService.getIdentity();
		this.token = this._usuarioService.getToken();
        this.usuario = this.identity;
        if(this._passDataService.storage!=undefined){
            this.newServicePet = this._passDataService.storage.newServicePet;
        }else{
            this._router.navigate(["cuidador"]);
        }
	}

	ngOnInit() {
		this.getAllUsers();
	}

	getAllUsers() {
		this._usuarioService.getAllUsers(this.usuario).subscribe(
			response => {
				this.userArray = response.users;
				//console.log(this.userArray);
			},
			error => {
				console.log("error");
			}
		);
	}

	starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
	rating: number;
	//Create a function which receives the value counting of stars click, 
	//and according to that value we do change the value of that star in list.
	setStar(data: any) {
		this.rating = data + 1;
		for (var i = 0; i <= 4; i++) {
			if (i <= data) {
				this.starList[i] = false;
			}
			else {
				this.starList[i] = true;
			}
		}
	}

	BlockID(data: any) {
		var list = [true, true, true, true, true];
		this.rating = data + 1;
		for (var i = 0; i <= 4; i++) {
			if (i <= data) {
				list[i] = false;
			}
			else {
				list[i] = true;
			}
		}
		return list;
	}

}