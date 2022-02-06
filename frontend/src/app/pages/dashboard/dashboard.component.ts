import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

export interface SearchItem {
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date_of_birth', 'name', 'age', 'gender', 'settings'];

  patient: any;

  dataSource: MatTableDataSource<any>;

  nameFilter = new FormControl();
  private filterValues = { name: '' }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private router: Router, public patientService: PatientService ) { }

  ngOnInit(): void {
    this.getAllPatients();

    this.nameFilter.valueChanges
      .subscribe(value => {
        this.filterValues['name'] = value
        this.dataSource.filter = JSON.stringify(this.filterValues)
      });
  }

  public createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let nameSearch = () => {
        let found = false;
        for (let word in searchTerms.name.trim().toLowerCase().split(' ')) {
          if (data.name.toLowerCase().indexOf(word) != -1) { found = true }
        }
        for (const word of searchTerms.name.trim().toLowerCase().split(' ')) {
          if (data.name.toLowerCase().indexOf(word) != -1) { found = true }
        }
        return found
      }
      return nameSearch();
    }
    return filterFunction
  }

  public getAllPatients () {
    this.patientService.getAllPatients().subscribe({
      next: (response) => {
        this.patientService.patients = response.patients;
        console.log(this.patientService.patients);

        this.dataSource = new MatTableDataSource(this.patientService.patients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilter();
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

}
