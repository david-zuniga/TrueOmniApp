import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingService } from './services/listing-service.service';
import { ListingDTO } from './interfaces/listing.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  listingData: ListingDTO[] = [];
  style: string = 'flexRow';
  @ViewChild('imagesContainer') imagesContainer: any;

  scrollTop: number = 0;
  scrollHeight: number = 0;
  offsetHeight: number = 0;

  scrollLeft: number = 0;
  scrollWidth: number = 0;
  offsetWidth: number = 0;

  fullData: ListingDTO[] = [];
  partialData: ListingDTO[] = [];

  constructor( private _listingService: ListingService) {
    
  }

  ngOnInit(): void {
    console.log("on init");
    const data = this._listingService.getAllListingData()
      .subscribe( listings => {

        console.log(listings);
        this.listingData = listings;

        localStorage.setItem('fullListing', JSON.stringify(listings));
        localStorage.setItem('partialListing', JSON.stringify(listings.slice(0,30)));

        this.listingData = JSON.parse(localStorage.getItem('partialListing')!) || [];

      }, error => console.log(error));
  }

  changeLayout() {
    this.style = this.style === 'flexColumn' ? 'flexRow' : 'flexColumn';
  }

  onVerticalScroll(e: any) {
    console.log(e);
    this.scrollTop = this.imagesContainer.nativeElement.scrollTop;
    this.scrollHeight = this.imagesContainer.nativeElement.scrollHeight;
    this.offsetHeight = this.imagesContainer.nativeElement.offsetHeight;

    if (( this.scrollTop + this.offsetHeight ) == this.scrollHeight) {
      this.updateStorage();

    }
  }

  onHorizontalScroll(e: any) {
    this.scrollLeft = this.imagesContainer.nativeElement.scrollLeft;
    this.scrollWidth = this.imagesContainer.nativeElement.scrollWidth;
    this.offsetWidth = this.imagesContainer.nativeElement.offsetWidth;

    if (( this.scrollLeft + this.offsetWidth ) == this.scrollWidth) {
      this.updateStorage();

    }
  }


  updateStorage() {
    console.log("end");

    if (localStorage.getItem('partialListing') && localStorage.getItem('fullListing')) {

      this.fullData = JSON.parse(localStorage.getItem('fullListing')!) || [];
      this.partialData = JSON.parse(localStorage.getItem('partialListing')!) || [];

      localStorage.setItem('partialListing', JSON.stringify(this.fullData.slice(0,this.partialData.length + 30)));
      this.listingData = JSON.parse(localStorage.getItem('partialListing')!) || [];
    }
  }

  trackByID(index: number, listing: any): string {
    return listing.ListingID;
  }
}
