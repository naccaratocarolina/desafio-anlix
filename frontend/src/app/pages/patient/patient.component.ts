import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient/patient.service';
import { CharacteristicService } from 'src/app/services/characteristic/characteristic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export enum TypeEnum {
  ind_card,
  ind_pulm
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  pageName: string = "Página do Paciente";

  id: any; // patient id

  patient: any = [];
  lastCharacteristics: any = [];
  characteristics: any = [];
  ind_card: any = [];
  ind_pulm: any = [];

  /* Table */
  displayedColumns: string[] = ['id', 'type', 'epoch', 'time', 'index'];
  dataSource: MatTableDataSource<any>;

  /* Toggle Button */
  typeEnum = TypeEnum;
  selectedState = TypeEnum.ind_card;

  /* Type Filter */
  filterValues: any = {};
  indCardToggle: boolean;
  indPulmToggle: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /* Date Filter */
  pipe: DatePipe;
  dataFilterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() { return this.dataFilterForm.get('fromDate')?.value; }
  get toDate() { return this.dataFilterForm.get('toDate')?.value; }

  /* Chart */
  @ViewChild("cardChart") cardChart: ChartComponent;
  public cardChartOptions: Partial<ChartOptions> | any;

  @ViewChild("pulmChart") pulmChart: ChartComponent;
  public pulmChartOptions: Partial<ChartOptions> | any;

  ind_card_data: any[] = [];
  ind_pulm_data: any[] = [];

  /* Paginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private route: ActivatedRoute,
    private patientService: PatientService,
    private characteristicService: CharacteristicService ) {
      /* Initializing Date Filter */
      this.pipe = new DatePipe('en');

      /* Chart Data */
      var card_data = JSON.parse(localStorage.getItem("ind_card") as string);
      var pulm_data = JSON.parse(localStorage.getItem("ind_pulm") as string);

      /* Initializing ind_card chart */
      this.cardChartOptions = {
        series: [ { name: "Índice Cardíaco", data: card_data } ],
        chart: { height: 300, type: "area", zoom: { type: "xy" } },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        grid: { xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 }
              },
        xaxis: { type: 'datetime' }
      };

      /* Initializing ind_pulm chart */
      this.pulmChartOptions = {
        series: [ { name: "Índice Pulmonar", data: pulm_data } ],
        chart: { height: 300, type: "area", zoom: { type: "xy" } },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        grid: { xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 }
              },
        xaxis: { type: 'datetime' }
      };
    }

  ngOnInit (): void {
    /* Retrieving patient id */
    this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
      });

    this.getPatient(this.id);
    this.getAllPatientsCharacteristics(this.id);
    this.getPacientCharacteristic(this.id);
  }

  /* Toggle button function */
  public onChange ($event: any) {
    console.log($event.value);
    this.selectedState = $event.value;
  }

  /* Query database and get patient from id = id */
  public getPatient (id: string) {
    this.patientService.getPatient(id).subscribe({
      next: (response) => {
        this.patient = response.patients;
        console.log(response.patients);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  /* Generates cardiac and pulmonary indices data for the chart */
  public generateChartData () {
    for (const item of this.ind_card) {
      const data = {
        x: new Date(parseInt(item.epoch) * 1000),
        y: item.index
      };

      this.ind_card_data.push(data);
    }

    for (const item of this.ind_pulm) {
      const data = {
        x: new Date(parseInt(item.epoch) * 1000),
        y: item.index
      };

      this.ind_pulm_data.push(data);

      localStorage.setItem('ind_card', JSON.stringify(this.ind_card_data));
      localStorage.setItem('ind_pulm', JSON.stringify(this.ind_pulm_data));
    }
  }

  /* Query database and get all patient characteristics from id = id */
  public getAllPatientsCharacteristics (id: string) {
    this.characteristicService.getAllPatientsCharacteristics(id).subscribe({
      next: (response) => {
        /* Get indexes records and saves them in different variables */
        this.ind_card = response.ind_card;
        this.ind_pulm = response.ind_pulm;

        /* Generate chart data from data returned from backend route */
        this.generateChartData();

        /* Create the object with all the patient characteristics by
           concatenating the ind_card and ind_pulm objects */
        this.characteristics = this.ind_card.concat(this.ind_pulm);
        console.log(this.characteristics);

        /* Initialize table data, paginator and sort from characteristics object */
        this.dataSource = new MatTableDataSource(this.characteristics);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        /* Create filter by date range */
        this.dataSource.filterPredicate = (data, filter) => {
          if (this.fromDate && this.toDate) {
            const timestamp: number = parseInt(data.epoch);
            const date = new Date(timestamp * 1000);

            return date >= this.fromDate && date <= this.toDate;
          }

          else {
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

  /* Query database and get the last records from ind_card and ind_pulm */
  public getPacientCharacteristic (id: string) {
    this.characteristicService.getPacientCharacteristic(id).subscribe({
      next: (response) => {
        this.lastCharacteristics[0] = response.ind_card;
        this.lastCharacteristics[1] = response.ind_pulm;
        console.log(this.lastCharacteristics);
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

  /* Format date of birth (dd/mm/aaaa) */
  public formatDateOfBirth (date_of_birth: Date) {
    const date = new Date(date_of_birth);

    const day = (date.getDate() + 1) < 9 ? '0' + date.getDate() : (date.getDate() + 1);
    const month = (date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear();

    return day + '/' + month + '/' + year;
  }

  /* Format index (round float number to 2 decimal cases) */
  public formatIndex (index: number) {
    return Math.round((index + Number.EPSILON) * 100) / 100
  }

  /* Format type (Índice Cardíaco | Pulmonar) */
  public formatType (type: string) {
    return type === "ind_card"? "Índice Cardíaco" : "Índice Pulmonar";
  }

  /* Apply date filter */
  public applyDateFilter () {
    this.dataSource.filter = '' + Math.random();
  }

  /* Apply type filter */
  public applyTypeFilter (column: string, filterValue: string) {
    this.filterValues[column] = filterValue;

    this.dataSource.filter = JSON.stringify(this.filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* Clear date filter */
  public resetFilters () {
    this.dataSource.filter = '';
  }
}
