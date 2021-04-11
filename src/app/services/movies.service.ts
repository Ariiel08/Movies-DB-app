import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Movie, MoviesResponse } from "../interfaces/movies-response";
import { map,tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private moviesPage = 1;
  public loading: boolean = false;

  constructor(private http: HttpClient) { 

  }

  get params(){
    return{
      api_key: 'd126b6e243ad200ed5a02d6698128dac',
      language: 'en-US',
      page: this.moviesPage.toString()
    }
  }


  getMovies():Observable<Movie[]> {

    if(this.loading){
      //cargando películas
      return of([]);
    }

    this.loading = true;
    return this.http.get<MoviesResponse>(`${this.baseUrl}/movie/now_playing`,{
      params: this.params
    }).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.moviesPage += 1;
        this.loading = false;
    }))
  }

  searchMovies(movie: string): Observable<Movie[]>{

    const params2 = {...this.params, page: '1', query: movie};

    return this.http.get<MoviesResponse>(`${this.baseUrl}/search/movie`,{
      params: params2
    }).pipe(map(resp => resp.results))
  }
}
