import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {ActivatedRoute, Router} from "@angular/router";
import {SearchresultService} from "../search/searchresult.service";

@Component({
  selector: 'app-arview',
  templateUrl: './arview.component.html',
  styleUrls: ['./arview.component.css']
})
export class ArviewComponent implements OnInit {

  invoiceDS = new MatTableDataSource();
  displayedColumnsInvoice = ['invoice_id', 'payment_id', 'totalCost','mode'];
  invoiceid ='';
  UserId = '';

  lineChartData: Array<any> = [
    { data: [40], label: 'Amount Recieved List' },
    { data: [90], label: 'Amount Recievable List' },
  ];
  currentLineChartLabelsIdx = 0;
  lineChartLabels: Array<any>;
  lineChartOptions: any = {
    responsive: true
  };
  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  updateData: any;
  isUpdate: boolean;
  removing: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private router: Router, private activatedRouter: ActivatedRoute,private resultService: SearchresultService) { }

  ngOnInit(): void {
    this.UserId = sessionStorage.getItem('id');
    this.invoiceid = this.activatedRouter.snapshot.paramMap.get('id');

    this.resultService.getarinvoiceDetails(this.UserId,this.invoiceid).subscribe(res => {
      this.invoiceDS = res.ledgerModelList;

      this.lineChartData[0]['label']="amount_received_list";
      this.lineChartData[0]['data'] = JSON.parse(JSON.stringify(res.amount_received_list));
      this.lineChartData = this.lineChartData.slice();

      this.lineChartData[1]['label']="amount_received_list";
      this.lineChartData[1]['data'] = JSON.parse(JSON.stringify(res.amount_received_list));
      this.lineChartData = this.lineChartData.slice();
    });
    this.invoiceDS.paginator = this.paginator;
  }

}

const invoice_data = [{
  "invoice_id": 1,
  "payment_id": "mastercard",
  "totalCost": "$70871.80",
  "mode": "instapayment"
}, {
  "invoice_id": 2,
  "payment_id": "diners-club-carte-blanche",
  "totalCost": "$60331.25",
  "mode": "maestro"
}, {
  "invoice_id": 3,
  "payment_id": "china-unionpay",
  "totalCost": "$21450.82",
  "mode": "jcb"
}, {
  "invoice_id": 4,
  "payment_id": "jcb",
  "totalCost": "$20991.94",
  "mode": "mastercard"
}, {
  "invoice_id": 5,
  "payment_id": "switch",
  "totalCost": "$71190.87",
  "mode": "visa"
}, {
  "invoice_id": 6,
  "payment_id": "jcb",
  "totalCost": "$80373.23",
  "mode": "jcb"
}, {
  "invoice_id": 7,
  "payment_id": "jcb",
  "totalCost": "$9553.60",
  "mode": "switch"
}, {
  "invoice_id": 8,
  "payment_id": "jcb",
  "totalCost": "$79270.66",
  "mode": "jcb"
}, {
  "invoice_id": 9,
  "payment_id": "jcb",
  "totalCost": "$92134.86",
  "mode": "diners-club-enroute"
}, {
  "invoice_id": 10,
  "payment_id": "mastercard",
  "totalCost": "$6464.70",
  "mode": "jcb"
}, {
  "invoice_id": 11,
  "payment_id": "diners-club-enroute",
  "totalCost": "$44565.76",
  "mode": "jcb"
}, {
  "invoice_id": 12,
  "payment_id": "china-unionpay",
  "totalCost": "$37065.31",
  "mode": "solo"
}, {
  "invoice_id": 13,
  "payment_id": "jcb",
  "totalCost": "$94686.52",
  "mode": "jcb"
}, {
  "invoice_id": 14,
  "payment_id": "jcb",
  "totalCost": "$69606.61",
  "mode": "jcb"
}, {
  "invoice_id": 15,
  "payment_id": "mastercard",
  "totalCost": "$84106.11",
  "mode": "jcb"
}, {
  "invoice_id": 16,
  "payment_id": "jcb",
  "totalCost": "$38233.51",
  "mode": "solo"
}, {
  "invoice_id": 17,
  "payment_id": "jcb",
  "totalCost": "$96013.70",
  "mode": "jcb"
}, {
  "invoice_id": 18,
  "payment_id": "switch",
  "totalCost": "$28053.90",
  "mode": "jcb"
}, {
  "invoice_id": 19,
  "payment_id": "jcb",
  "totalCost": "$72297.75",
  "mode": "jcb"
}, {
  "invoice_id": 20,
  "payment_id": "switch",
  "totalCost": "$91719.53",
  "mode": "diners-club-carte-blanche"
}]
