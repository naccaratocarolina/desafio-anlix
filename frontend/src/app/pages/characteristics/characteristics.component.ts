import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CharacteristicService } from 'src/app/services/characteristic/characteristic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {
  pageName: string = "Registros das Características";

  /* Table */
  displayedColumns: string[] = ['id', 'type', 'epoch', 'time', 'index'];
  dataSource: MatTableDataSource<any>;

  /* Type Filter */
  filterValues: any = {};
  indCardToggle: boolean;
  indPulmToggle: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /* Date Filter */
  pipe: DatePipe;
  dataFilterForm = new FormGroup({
    fromDate: new FormControl()
  });

  get fromDate() { return this.dataFilterForm.get('fromDate')?.value; }

  /* Paginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private router: Router, public characteristicService: CharacteristicService ) {
    /* Initializing Date Filter */
    this.pipe = new DatePipe('en');
  }

  ngOnInit(): void {
    this.getAllCharacteristics();
  }

  /* Query database and get all registered characteristics */
  public getAllCharacteristics () {
    this.characteristicService.getAllCharacteristics().subscribe({
      next: (response) => {
        /* Get characteristics records and saves in service variable */
        this.characteristicService.characteristics = response.characteristics;
        console.log(this.characteristicService.characteristics);

        /* Initialize table data, paginator and sort from characteristics object */
        this.dataSource = new MatTableDataSource(this.characteristicService.characteristics);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        /* Create type and date filter */
        this.dataSource.filterPredicate = (data, filter) => {
          /* Date Filter */
          if (this.fromDate) {
            const timestamp: number = parseInt(data.epoch);
            const epochDate = new Date(timestamp * 1000);

            return (this.fromDate.getDate() === epochDate.getDate()) &&
                  (this.fromDate.getMonth() === epochDate.getMonth()) &&
                  (this.fromDate.getFullYear() === epochDate.getFullYear()) ;
          }

          /* Type Filter */
          if (this.indCardToggle || this.indPulmToggle) {
            const filterValues = JSON.parse(filter);

            return (this.indCardToggle ? data.type.trim().toLowerCase() === filterValues.type : true) &&
            (this.indPulmToggle ? data.type.trim().toLowerCase().indexOf(filterValues.type) !== -1 : true);
          }

          return true;
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  /* Format date (dd/mm/aaaa) */
  public getDate (epoch: string) {
    const timestamp: number = parseInt(epoch);
    const date = new Date(timestamp * 1000);

    const day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
    const month = (date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();;

    return day + '/' + month + '/' + year;
  }

  /* Format time (hh:mm:ss) */
  public getTime (epoch: string) {
    const timestamp: number = parseInt(epoch);
    const date = new Date(timestamp * 1000);

    const hours = date.getHours() < 9 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 9 ? '0' + date.getSeconds() : date.getSeconds();

    return hours + ':' + minutes + ':' + seconds;
  }

  /* Format index (round float number to 2 decimal cases) */
  public formatIndex (index: number) {
    return Math.round((index + Number.EPSILON) * 100) / 100
  }

  /* Format type (Índice Cardíaco | Pulmonar) */
  public formatType (type: string) {
    return type === "ind_card"? "Índice Cardíaco" : "Índice Pulmonar";
  }

  /* Apply type filter */
  public applyTypeFilter (column: string, filterValue: string) {
    this.filterValues[column] = filterValue;

    this.dataSource.filter = JSON.stringify(this.filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* Apply date filter */
  public applyDateFilter () {
    this.dataSource.filter = '' + Math.random();
  }

  /* Clear date filter */
  public resetFilters () {
    this.dataSource.filter = '';
  }
}
