import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css']
})
export class PatientsTableComponent implements OnInit {
  patient: any;

  /* Table */
  displayedColumns: string[] = ['id', 'date_of_birth', 'name', 'age', 'cpf', 'gender', 'color', 'blood_type', 'patient-page'];
  dataSource: MatTableDataSource<any>;

  /* Name Filter */
  nameFilter = new FormControl();
  private filterValues = { name: '' }

  /* Paginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private router: Router, public patientService: PatientService ) {}

  ngOnInit(): void {
    this.getAllPatients();

    /* Initialize name filter */
    this.nameFilter.valueChanges
      .subscribe(value => {
        this.filterValues['name'] = value
        this.dataSource.filter = JSON.stringify(this.filterValues)
      });
  }

  /* Query database and get all registered patients */
  public getAllPatients () {
    this.patientService.getAllPatients().subscribe({
      next: (response) => {
        /* Get patients records and saves in service variable */
        this.patientService.patients = response.patients;
        console.log(this.patientService.patients);

        /* Initialize table data and paginator from patients service object */
        this.dataSource = new MatTableDataSource(this.patientService.patients);
        this.dataSource.paginator = this.paginator;

        /* Create name filter */
        this.dataSource.filterPredicate = this.createFilter ();
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  /* Create name filter */
  public createFilter () {
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

  /* Format date of birth (dd/mm/aaaa) */
  public formatDateOfBirth (date_of_birth: Date) {
    const date = (date_of_birth.toString()).split("-");

    return date[2] + '/' + date[1] + '/' + date[0];
  }
}
