import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() name = '';
  @Input() description = '';
  @Input() route = '/';

  @Output() closeSideNav = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeNav(){
    this.closeSideNav.emit();
  }

}
