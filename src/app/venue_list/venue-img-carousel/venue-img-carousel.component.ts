import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'venue-img-carousel',
  templateUrl: './venue-img-carousel.component.html',
  styleUrls: ['./venue-img-carousel.component.css']
})
export class VenueImgCarouselComponent implements OnInit {
  @Input() images: [];
  constructor() { }

  ngOnInit() {
  }

}
