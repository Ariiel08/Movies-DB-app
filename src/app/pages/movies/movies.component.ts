import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MoviesDetails } from 'src/app/interfaces/movies-details-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movie: MoviesDetails;
  cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private moviesService: MoviesService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.moviesService.getMoviesDetails(id),
      this.moviesService.getCast(id)
    ]).subscribe(([movie, cast]) => {
      if(!movie){
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = movie;
      this.cast = cast;
      //this.cast = cast.filter(actor => actor.profile_path !== null);
    })

    // this.moviesService.getMoviesDetails(id).subscribe(data => {
      // if(!data){
      //   this.router.navigateByUrl('/home');
      //   return;
      // }
      // this.movie = data;
    // });

    // this.moviesService.getCast(id).subscribe(cast => {
    //   this.cast = cast;
    // })
  }

  goBack(){
    this.location.back();
  }

}
