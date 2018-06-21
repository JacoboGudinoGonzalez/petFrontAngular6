import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { UploadService } from '../../services/upload.service';

@Component({
	selector: 'usuario-edit',
	templateUrl: './usuario-edit.component.html',
	providers:[UsuarioService, UploadService]
})
export class UsuarioEditComponent implements OnInit{
	public title: string;
	public usuario: Usuario;
	public identity; 
	public token;
	public status: string;
	public url: string;

	constructor(
		private _usuarioService: UsuarioService,
		private _uploadService: UploadService
	){
		this.title = 'Mis datos';
		this.identity = this._usuarioService.getIdentity();
		this.token = this._usuarioService.getToken();
		this.usuario = this.identity;
		this.url = 'rest/controller/';
	}

	ngOnInit(){
		console.log(this.identity);
	}

	onSubmit(){
		this._usuarioService.updateUsuario(this.usuario).subscribe(
			response => {

				if(!response.user){
					this.status = 'error';
				}else{
					//this.usuario = response.user;
					this.status = 'success';
					localStorage.setItem('identity',JSON.stringify(this.usuario));

					//Subir img
					this._uploadService.makeFileRequest(this.url+'upload/'+this.usuario.id, [],this.filesToUpload,this.token, 'file').
					then((result: any) =>{
						this.usuario.image = result.image;
						localStorage.setItem('identity',JSON.stringify(this.usuario));
						console.log(this.usuario);
					});
				}
			},
			error =>{
				console.log(<any>error);
				this.status = 'error';
			}
		);
	}

	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}