import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
	selector: 'cuidador',
	templateUrl: './cuidador.component.html',
	styleUrls: ['./cuidador.component.css']
	})

export class CuidadorComponent implements OnChanges, OnInit{
	@Input() public nombre: string;
	@Output() public pasaDatos = new EventEmitter();

	hoveredDate: NgbDateStruct;
	fromDate: NgbDateStruct;
	toDate: NgbDateStruct;

	public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;

	@ViewChild("search")
	public searchElementRef: ElementRef;

	constructor(
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone, 
		calendar: NgbCalendar
		){
		this.nombre = 'nombre constructor';
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	ngOnChanges(changes: SimpleChanges){
		console.log(changes);
	}

	ngOnInit(){
		this.zoom = 4;
		this.latitude = 39.8282;
		this.longitude = -98.5795;

		//create search FormControl
		this.searchControl = new FormControl();

		//set current position
		this.setCurrentPosition();

		//load Places Autocomplete
		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ["address"]
				});
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					//get the place result
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					//verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}

					//set latitude, longitude and zoom
					this.latitude = place.geometry.location.lat();
					this.longitude = place.geometry.location.lng();
					this.zoom = 12;
					});
				});
			});
	}

	private setCurrentPosition() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.zoom = 12;
				});
		}
	}

	onDateSelection(date: NgbDateStruct) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
			} else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
				this.toDate = date;
				} else {
					this.toDate = null;
					this.fromDate = date;
				}
			}

			isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
			isInside = date => after(date, this.fromDate) && before(date, this.toDate);
			isFrom = date => equals(date, this.fromDate);
			isTo = date => equals(date, this.toDate);

			emitirEvento(){
				this.pasaDatos.emit({
					'nombre' : this.nombre
					});
			}
			
		}