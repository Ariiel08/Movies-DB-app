import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  swiper: Swiper;

  @Input() movies: Movie[];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.swiper = new Swiper('.swiper-container', {
      loop: true
    });
  }

}
