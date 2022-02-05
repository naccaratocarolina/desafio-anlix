import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date_of_birth', 'name', 'age', 'gender', 'settings'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private router: Router, public patientService: PatientService ) { }

  ngOnInit(): void {
    this.getAllPatients();
  }

  public getAllPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (response) => {
        this.patientService.patients = response.patients;
        console.log(this.patientService.patients);

        this.dataSource = new MatTableDataSource(this.patientService.patients);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
