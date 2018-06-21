import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'contacto',
	templateUrl: './contacto.component.html',
	styleUrls: ['./contacto.component.css']
})

export class ContactoComponent{
	
	public title: string;
	public emailContacto:string;

	constructor(){
	}

	guardarEmail(){
		localStorage.setItem('emailContacto', this.emailContacto);
		console.log(localStorage.getItem('emailContacto'));
	}

}