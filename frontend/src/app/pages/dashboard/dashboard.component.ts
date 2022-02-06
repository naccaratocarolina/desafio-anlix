import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date_of_birth', 'name', 'age', 'gender', 'settings'];

  patient: any;

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private router: Router, public patientService: PatientService ) { }

  ngOnInit(): void {
    this.getAllPatients();
  }

  public getAllPatients () {
    this.patientService.getAllPatients().subscribe({
      next: (response) => {
        this.patientService.patients = response.patients;
        console.log(this.patientService.patients);

        this.dataSource = new MatTableDataSource(this.patientService.patients);
        this.dataSource.paginator = this.paginator;
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected () {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle () {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
