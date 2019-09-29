import { Component, OnInit } from '@angular/core';
import { Graphs } from '../shared/graphs';
import { parse, stringify } from 'flatted/esm';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';
import { StockChart } from 'angular-highcharts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  charts: any[] = [];
  GraphData: any = Graphs;
  storedChart: any = [];
  chartsHolder: any = {};
  currentEditWidget: any = {};
  userData: any = {};
  selectedValue: any = 'areaspline';
  graphDates: any[] = [];
  graphTitle: any = '';
  filter: any = {};

  constructor(private authService: AuthService, private router: Router, public toasterService: ToasterService) {
    this.charts = authService.getStoredData();
    // initilize datepicker for todays date
    this.filter.from = new Date().toISOString().slice(0, 10);
    this.filter.to = new Date().toISOString().slice(0, 10);
  }

  ngOnInit() {
    // render graph if already saved
    this.generateGraph();
    // decode jwt token and render user data
    this.userData = this.authService.getUserData();
  }

  generateGraph() {
    this.charts.forEach(
      (item) => {
        this.chartsHolder = new StockChart(
          item.options
        )
        this.storedChart.push(this.chartsHolder);
      }
    );
    this.charts = [];
    this.charts = this.storedChart;
  }

  createNewGraph() {
    this.authService.getGraphData()
      .subscribe(data => {
        this.graphDates = [];
        this.graphDates = data;
        let value = this.selectedValue;
        this.GraphData[value].series[0].data = this.graphDates;
        this.GraphData[value].title.text = this.graphTitle;
        this.chartsHolder = new StockChart(
          this.GraphData[value]
        )
        this.charts.push(this.chartsHolder);
       }, error => {
        console.log('error');
      });
  }

  deleteGraph(index) {
    if (!this.authService.isUserLoggedin()) {
      this.charts.splice(index, 1);
      this.toasterService.showToaster('infoToastr', 'Success', 'You just deleted a chart.', 'top-bottom');
      this.saveWidgets();
    } else {
      this.router.navigate(['login']);
      this.toasterService.showToaster('errorToastr', 'Error', 'Your session is expired, please login again.', 'top-right');
      return;
    }
  }

  updateGraph() {
    if (!this.authService.isUserLoggedin()) {
      this.authService.getGraphData()
        .subscribe(data => {
          this.graphDates = [];
          this.graphDates = data;
          this.GraphData[this.selectedValue].series[0].data = this.graphDates;
          this.GraphData[this.selectedValue].series[0].type = this.selectedValue;
          this.GraphData[this.selectedValue].title.text = this.graphTitle;
          this.charts[this.currentEditWidget] = new StockChart(
            this.GraphData[this.selectedValue]
          )
          this.toasterService.showToaster('infoToastr', 'Success', 'Chart updated.', 'top-bottom');
        }, error => {
          console.log('error');
        });
    } else {
      this.router.navigate(['login']);
      this.toasterService.showToaster('errorToastr', 'Error', 'Your session is expired, please login again.', 'top-right');
      return;
    }
  }

  // set index of graph for which user wants to update 
  setCurrentIndex(i) {
    this.currentEditWidget = i;
  }

  saveWidgets() {
    if (!this.authService.isUserLoggedin()) {
      localStorage.setItem("dashboardState", stringify(this.charts));
      this.toasterService.showToaster('successToastr', 'Success!', 'Data saved.','top-right');
    } else {
      this.router.navigate(['login']);
      this.toasterService.showToaster('errorToastr', 'Error', 'Your session is expired, please login again.', 'top-right');
      return;
    }
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

  filterGraph() {
    this.authService.getGraphData()
      .subscribe(data => {
        this.graphDates = [];
        this.graphDates = data;
        let from = new Date(this.filter.from);
        let to = new Date(this.filter.to);

        let filterDates = this.graphDates.filter(function (item) {
          if (item[0] > from.getTime() && item[0] < to.getTime()) {
            return item;
          }
        });
        this.reRenderGraph(filterDates);
      }, error => {
        console.log('error');
      });
  }

  reRenderGraph(filterDates) {
    this.storedChart = [];
    let filterChart = this.charts.map(function (item) {
      item.options.series[0].data = filterDates
      return item;
    })
    // this.charts = [];
    this.charts = filterChart;
    this.charts.forEach(
      (item) => {
        this.chartsHolder = new StockChart(
          item.options
        )
        this.storedChart.push(this.chartsHolder);
      }
    );
    this.charts = [];
    this.charts = this.storedChart;
  }
}
