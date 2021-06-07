import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-results',
  templateUrl: './employee-results.component.html',
  styleUrls: ['./employee-results.component.scss']
})
export class EmployeeResultsComponent implements OnInit {

  @Input() dataSource = [];

  displayedColumns: string[] = ['employeeCode', 'preferredFullName', 'jobTitleName', 'emailAddress'];

  constructor() { }

  ngOnInit() {

  }

}
