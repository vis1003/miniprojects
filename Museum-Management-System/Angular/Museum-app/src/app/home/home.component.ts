import { Component, OnInit } from '@angular/core';

declare var VANTA: { TOPOLOGY: (arg0: { el: string; mouseControls: boolean; touchControls: boolean; gyroControls: boolean; minHeight: number; minWidth: number; scale: number; scaleMobile: number; }) => void; };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{
  name = 'Angular';

  constructor() { }

  ngOnInit(): void {
    VANTA.TOPOLOGY({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00
    })
  }
}
