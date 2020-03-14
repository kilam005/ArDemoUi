import {Component, NgZone, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHead: boolean = false;
  currentlyIn:string;
  constructor (private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/search') {
          this.showHead= false;
        } else {
          this.showHead= true;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
