import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/movies-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: string;
  noFound: boolean = false;;
  movies: Movie[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      this.search = params.text;

      //TODO Llamar al servicio
      this.moviesService.searchMovies(this.search).subscribe(data => {
        if(data.length <= 0){
          this.noFound = true;
          return;
        }
        this.noFound = false;
        this.movies = data;
      })
    });
  }

}
