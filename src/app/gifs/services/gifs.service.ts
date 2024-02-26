import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root' //* en root, hacemos que el servicio este disponible a lo largo de toda la aplicacion y todos los modulos que lo inyecten.
})
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory:string[] = []
  private apiKey:      string = 'VuTk5rkJzRJgCLFMPPR29rmdbnLDZNAu';
  private serviceUrl:  string = 'https://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag:string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldtag) => oldtag !== tag )
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return; //si no tenemos data no hacemos nada. Si tenemos, lo traemos.

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  async searchTag(tag: string): Promise<void> {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`,{params})
    .subscribe(resp => {

      this.gifList = resp.data;
      console.log({gifs: this.gifList})
    })

    //peticion HTTP obtenida del servicio http que ofrece angular para hacer las peticiones, que fue inyectado en el constructor e importado en el app.module. Como es un observable y no una promesa, esta emitiendo diferentes valores. Para escuchar estos valores que esta emitiendo usamos el subscribe.



  }
}
