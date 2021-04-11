import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){
      //TODO: llamar el servicio
      if(this.moviesService.loading){return};
      this.moviesService.getMovies().subscribe(movies => {
        this.movies.push(...movies);
      });
      
    }
  }

  constructor(private moviesService: MoviesService) { 
    
  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.moviesSlideshow = movies;
    });
  }

  ngOnDestroy(){
    this.moviesService.resetHomePage();
  }

}
