import { Component } from '@angular/core';
import { dataService } from '../Services/data.service';

@Component({
  selector: 'app-root-main',
  templateUrl: './Root.component.html',
  standalone: false,
  styleUrl: './root.component.css'
})
export class RootComponent {
  constructor(private dataservice: dataService) {
    this.dataservice.loadInitialPage();
  }


  showSidenav = false;
  title = 'ecommerce';
  // toggled: boolean = true;
  handleToggle(event: any) {
    this.showSidenav = event;
    console.log('Received toggle value:', event);
    // Do something with newValue
  }
}
