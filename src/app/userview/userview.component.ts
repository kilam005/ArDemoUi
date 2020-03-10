import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";
import {SearchresultService} from "../search/searchresult.service";

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit, AfterViewInit {
  
  displayedColumns = ['invoice_id', 'order_details', 'purchaseDate', 'totalCost','amountPaid', 'amountDue','details'];
  dataSource = new MatTableDataSource();
  showInvoiceData:boolean = false
  hideMainTable:boolean = true;
  userId ='';
  pfromdate = '';
  ptodate = '';

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

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(private activatedRoute: ActivatedRoute,private resultService: SearchresultService) {
  }

  
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('id');
    this.resultService.getInvoiceDetails(this.userId).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator.toArray()[0];
  }

  toggleInvoiceChart(){
    this.showInvoiceData = !this.showInvoiceData;
    this.hideMainTable = !this.hideMainTable;
  }

  getSortedpurchaseData(){
    this.userId = sessionStorage.getItem('id');
    this.resultService.getdifferenceInvoiceDetails(this.pfromdate, this.ptodate, this.userId).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });

  }

}

const ELEMENT_DATA = [
  {
    "invoice_id": 1,
    "order_details": "jcb",
    "purchaseDate": "2/24/2020",
    "totalCost": "$144.07",
    "amountPaid": "$63.46",
    "amountDue": "$28.14"
  }, {
    "invoice_id": 2,
    "order_details": "china-unionpay",
    "purchaseDate": "8/13/2019",
    "totalCost": "$777.73",
    "amountPaid": "$56.41",
    "amountDue": "$26.62"
  }, {
    "invoice_id": 3,
    "order_details": "mastercard",
    "purchaseDate": "11/23/2019",
    "totalCost": "$830.06",
    "amountPaid": "$39.57",
    "amountDue": "$42.96"
  }, {
    "invoice_id": 4,
    "order_details": "maestro",
    "purchaseDate": "5/24/2019",
    "totalCost": "$25.19",
    "amountPaid": "$89.37",
    "amountDue": "$21.35"
  }, {
    "invoice_id": 5,
    "order_details": "jcb",
    "purchaseDate": "8/18/2019",
    "totalCost": "$754.64",
    "amountPaid": "$53.71",
    "amountDue": "$59.91"
  }, {
    "invoice_id": 6,
    "order_details": "jcb",
    "purchaseDate": "4/13/2019",
    "totalCost": "$141.75",
    "amountPaid": "$9.95",
    "amountDue": "$48.74"
  }, {
    "invoice_id": 7,
    "order_details": "jcb",
    "purchaseDate": "10/11/2019",
    "totalCost": "$776.99",
    "amountPaid": "$14.50",
    "amountDue": "$26.43"
  }, {
    "invoice_id": 8,
    "order_details": "jcb",
    "purchaseDate": "2/15/2020",
    "totalCost": "$717.92",
    "amountPaid": "$8.23",
    "amountDue": "$74.19"
  }, {
    "invoice_id": 9,
    "order_details": "jcb",
    "purchaseDate": "10/21/2019",
    "totalCost": "$356.49",
    "amountPaid": "$76.71",
    "amountDue": "$57.92"
  }, {
    "invoice_id": 10,
    "order_details": "china-unionpay",
    "purchaseDate": "11/5/2019",
    "totalCost": "$304.53",
    "amountPaid": "$61.24",
    "amountDue": "$80.00"
  }, {
    "invoice_id": 11,
    "order_details": "jcb",
    "purchaseDate": "11/14/2019",
    "totalCost": "$67.68",
    "amountPaid": "$98.61",
    "amountDue": "$27.22"
  }, {
    "invoice_id": 12,
    "order_details": "switch",
    "purchaseDate": "10/1/2019",
    "totalCost": "$773.42",
    "amountPaid": "$38.54",
    "amountDue": "$15.49"
  }, {
    "invoice_id": 13,
    "order_details": "jcb",
    "purchaseDate": "1/27/2020",
    "totalCost": "$67.15",
    "amountPaid": "$36.63",
    "amountDue": "$0.31"
  }, {
    "invoice_id": 14,
    "order_details": "jcb",
    "purchaseDate": "2/13/2020",
    "totalCost": "$253.81",
    "amountPaid": "$99.47",
    "amountDue": "$45.95"
  }, {
    "invoice_id": 15,
    "order_details": "jcb",
    "purchaseDate": "9/6/2019",
    "totalCost": "$184.04",
    "amountPaid": "$32.21",
    "amountDue": "$30.97"
  }
  ];
  
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
