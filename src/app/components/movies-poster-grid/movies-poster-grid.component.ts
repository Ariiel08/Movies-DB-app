import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies-response';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-movies-poster-grid',
  templateUrl: './movies-poster-grid.component.html',
  styleUrls: ['./movies-poster-grid.component.css']
})
export class MoviesPosterGridComponent implements OnInit {

  @Input() movies: Movie[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
