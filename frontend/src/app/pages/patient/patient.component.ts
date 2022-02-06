import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient/patient.service';
import { CharacteristicService } from 'src/app/services/characteristic/characteristic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
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
  displayedColumns: string[] = ['select', 'id', 'type', 'epoch', 'time', 'index', 'settings'];

  id: any;

  patient: any = [];
  lastCharacteristics: any = [];
  characteristics: any = [];
  ind_card: any = [];
  ind_pulm: any = [];

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  typeEnum = TypeEnum;
  selectedState = TypeEnum.ind_card;

  panelOpenState = false;

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
      var card_data = JSON.parse(localStorage.getItem("ind_card") as string);
      var pulm_data = JSON.parse(localStorage.getItem("ind_pulm") as string);

      this.cardChartOptions = {
        series: [ { name: "Indice Cardíaco", data: card_data } ],
        chart: { height: 300, type: "scatter", zoom: { type: "xy" } },
        dataLabels: { enabled: false },
        stroke: { curve: "stepline" },
        title: { text: "Indice Cardíaco", align: "left" },
        grid: { xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 }
              },
        xaxis: { type: 'datetime' }
      };

      this.pulmChartOptions = {
        series: [ { name: "Indice Pulmonar", data: pulm_data } ],
        chart: { height: 300, type: "scatter", zoom: { type: "xy" } },
        dataLabels: { enabled: true },
        stroke: { curve: "straight" },
        title: { text: "Indice Pulmonar", align: "left" },
        grid: { xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 }
              },
        xaxis: { type: 'datetime' }
      };
    }

  ngOnInit (): void {
    this.route.paramMap.subscribe(params => {
        this.id = params.get('id');
      });

    this.getPatient(this.id);
    this.getAllPatientsCharacteristics(this.id);
    this.getPacientCharacteristic(this.id);
  }

  public onChange ($event: any) {
    console.log($event.value);
    this.selectedState = $event.value;
  }

  public getDate (epoch: string) {
    const timestamp: number = parseInt(epoch);
    const date = new Date(timestamp * 1000);

    const day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth();
    const year = date.getFullYear();;

    return day + '/' + month + '/' + year;
  }

  public getTime (epoch: string) {
    const timestamp: number = parseInt(epoch);
    const date = new Date(timestamp * 1000);

    const hours = date.getHours() < 9 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 9 ? '0' + date.getSeconds() : date.getSeconds();

    return hours + ':' + minutes + ':' + seconds;
  }

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

  public getAllPatientsCharacteristics (id: string) {
    this.characteristicService.getAllPatientsCharacteristics(id).subscribe({
      next: (response) => {
        this.ind_card = response.ind_card;
        this.ind_pulm = response.ind_pulm;
        
        this.generateChartData();

        this.characteristics = this.ind_card.concat(this.ind_pulm);
        console.log(this.characteristics);

        this.dataSource = new MatTableDataSource(this.characteristics);
        this.dataSource.paginator = this.paginator;
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

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
