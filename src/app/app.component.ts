import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { KtravelService } from './ktravel.service';
import { NgModel } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  title = 'app';
  initData = [];
  copyData = [];
  data = [];
  ticketInfoOptions: any[];
  zoneOptions: any[];

  keyword = '';
  @ViewChild('tKeyword') tKeyword: NgModel;

  ticketInfo = '';
  @ViewChild('tTicketInfo') tTicketInfo: NgModel;

  zone = '';
  @ViewChild('tZone') tZone: NgModel;
  key = '';

  constructor(private ktravelService: KtravelService) { }

  ngOnInit(): void {
    this.ktravelService.getTravelData().subscribe((value: any) => {
      this.initData = value.result.records;
      this.initTheData();
      this.ticketInfoOptions =
        Array.from(new Set(this.data.map(data => data.Ticketinfo))).filter(res => !!res);
      this.zoneOptions =
        Array.from(new Set(this.data.map(data => data.Zone))).filter(res => !!res);
    });
  }
  ngAfterViewInit() {
    combineLatest(this.tZone.valueChanges,
      this.tTicketInfo.valueChanges,
      this.tKeyword.valueChanges).pipe(
        debounceTime(500)).subscribe((value: any) => {
          this.query(value);
        });

  }
  initTheData() {
    this.copyData = [...this.initData];
    this.data = [...this.copyData];
  }
  filterData(key, value) {
    if (this.copyData) {
      this.copyData = this.copyData.filter(res => {
        return res[key].match(value);
      });
    }
  }
  query(termArray: Array<string>) {
    this.initTheData();
    termArray.forEach((v, i) => {
      if (i === 0) {
        this.key = 'Zone';
        if (v) {
          this.filterData(this.key, v);
        }
      } else if (i === 1) {
        this.key = 'Ticketinfo';
        if (v) {
          this.filterData(this.key, v);
        }
      } else if (i === 2) {
        this.key = 'Name';
        if (v) {
          this.filterData(this.key, v);
        }
      }
      this.data = [...this.copyData];
    });

  }
}
