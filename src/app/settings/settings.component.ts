import { Component, OnInit } from '@angular/core';
import { Graphs } from '../shared/graphs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  GraphData: any = Graphs;
  constructor() { }
 
  ngOnInit() {
    
  }
}
