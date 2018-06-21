import { Component } from '@angular/core';

@Component({
	selector: 'cliente',
	templateUrl: './cliente.component.html',
	styleUrls: ['./cliente.component.css']
})

export class ClienteComponent{
	public nombre: string;
	public nombreCuidador: string;

	constructor(){
		
	}

	mostrarNombreCuidador(){
		console.log("mostrarNombreCuidador: "+this.nombreCuidador)
	}

	verDatos(e){
		console.log(e);
	}

}