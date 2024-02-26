import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input type="text"
        class = "form-control"
        placeholder="Buscar gifs..."
        (keyup.enter)="searchTag()"
        #txtTagInput > <!-- referencia local. Sirve para referenciar y conocer el input durante todo el    template. Nos sirve para poder obtener el valor ingresado, sin tener que importar el formsmodule para tener acceso al ngModel y obtener solamente este input.-->
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>  //* es la referencia local al input del html con el view child.

  // searchTag(newTag: string) {  sin view child
  constructor( private gifsService: GifsService ){}

  searchTag() {     //con viewchild
    const newTag = this.tagInput.nativeElement.value;  //obtengo el valor del input


    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';  //* dejar en blanco el input
  }

}
