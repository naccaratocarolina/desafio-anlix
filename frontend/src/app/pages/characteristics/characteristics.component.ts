import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CharacteristicService } from 'src/app/services/characteristic/characteristic.service';
import { MatPaginator } from '@angular/material/paginator';
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
  displayedColumns: string[] = ['id', 'type', 'epoch', 'time', 'index'];

  dataSource: MatTableDataSource<any>;

  pipe: DatePipe;
  dataFilterForm = new FormGroup({
    fromDate: new FormControl()
  });

  get fromDate() { return this.dataFilterForm.get('fromDate')?.value; }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private router: Router, public characteristicService: CharacteristicService ) {
    this.pipe = new DatePipe('en');
  }

  ngOnInit(): void {
    this.getAllCharacteristics();
  }

  public getAllCharacteristics () {
    this.characteristicService.getAllCharacteristics().subscribe({
      next: (response) => {
        this.characteristicService.characteristics = response.characteristics;
        console.log(this.characteristicService.characteristics);

        this.dataSource = new MatTableDataSource(this.characteristicService.characteristics);
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (data, filter) => {
          if (this.fromDate) {
            const timestamp: number = parseInt(data.epoch);
            const epochDate = new Date(timestamp * 1000);

            return (this.fromDate.getDate() === epochDate.getDate()) &&
                  (this.fromDate.getMonth() === epochDate.getMonth()) &&
                  (this.fromDate.getFullYear() === epochDate.getFullYear()) ;
          }
          return true;
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  public getDate (epoch: string) {
    const timestamp: number = parseInt(epoch);
    const date = new Date(timestamp * 1000);

    const day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
    const month = (date.getMonth() + 1) < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
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

  public formatType (type: string) {
    return type === "ind_card"? "Índice Cardíaco" : "Índice Pulmonar";
  }

  public formatIndex (index: number) {
    return Math.round((index + Number.EPSILON) * 100) / 100
  }

  public applyFilter () {
    this.dataSource.filter = '' + Math.random();
  }

  public resetFilters () {
    this.dataSource.filter = '';
  }

}
