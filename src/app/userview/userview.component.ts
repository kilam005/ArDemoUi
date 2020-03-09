import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  
  displayedColumns = ['invoice_id', 'order_details', 'purchaseDate', 'totalCost','amountPaid', 'amountDue','details'];
  dataSource = ELEMENT_DATA;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }
  
  ngOnInit(): void {
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
  
