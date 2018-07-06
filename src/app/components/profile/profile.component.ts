import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';


@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    public title: string;
    public identity: Usuario;
    public url: string;

	constructor(
		private _usuarioService: UsuarioService
	) {
        this.title = 'HOME';
        this.url = 'rest/controller/';
	}

	ngOnInit() {
        this.identity = this._usuarioService.getIdentity();
        console.log(this.identity);
    }
    
    /*getProfile(){
        this._usuarioService.getProfile(50).subscribe(
			response => {
				this.profile = response.user;
				if(!this.profile){
					console.log("error no se encontro perfile de usuario");
				}else{
					//alert(this.profile.name +": "+this.profile.description);
				}
				this.usuario = new Usuario('','','','','','','',0,'');
			},
			error =>{
				var errorMessage = <any>error;
				if(errorMessage!=null){
					var body = JSON.parse(error._body);
				}
			}
		);
    }*/

}