import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchresultService} from '../search/searchresult.service';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-arview',
    templateUrl: './arview.component.html',
    styleUrls: ['./arview.component.css']
})
export class ArviewComponent implements OnInit, AfterViewInit {

    arSummary;
    dataSource: MatTableDataSource<any>;
    displayedColumnsInvoice = ['invoice_id', 'transaction_date', 'payment_id', 'totalCost'];
    invoiceId = '';
    UserId = '';
    userFirstName = 'FUser';
    userLastName = 'LUser';

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    invIdField = '';
    arFromDate: Date;
    arToDate: Date;

    maxDate: Date = new Date(new Date().setHours(23, 59, 59, 0));
    minDate: Date = new Date(1970, 1, 1);


    lineChartData: Array<any> = [
        {data: [40], label: 'Amount Received List'},
        {data: [90], label: 'Amount Receivable List'},
    ];

    lineChartLabels: Array<any>;
    lineChartOptions: any = {
        responsive: true
    };
    lineChartColors: Array<any> = [
        { // blue
            backgroundColor: 'rgba(86,147,177,0.82)',
            borderColor: 'rgba(9,130,177,0.82)',
            pointBackgroundColor: 'rgba(9,130,177,0.82)',
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


    constructor(private router: Router, private activatedRouter: ActivatedRoute, private resultService: SearchresultService) {
    }

    ngOnInit() {
        this.UserId = sessionStorage.getItem('id');
        if (this.UserId == null || this.UserId === undefined) {
            this.router.navigate(['/search']);
        }
        this.userFirstName = sessionStorage.getItem('fname');
        this.userLastName = sessionStorage.getItem('lname');

        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;

        this.invoiceId = this.activatedRouter.snapshot.paramMap.get('id');
        if (this.invoiceId != null) {
            this.invIdField = this.invoiceId;
        }

        if (!(this.invIdField === '')) {
            this.resultService.getarDetailsByInvoice(this.UserId, this.invIdField).subscribe(res => {
                this.process(res);
            });
        } else {
            this.resultService.getarDetails(this.UserId).subscribe(res => {
                this.process(res);
            });
        }
    }

    process(res: any) {
        console.log(res);
        this.arSummary = res.arSummary;
        this.dataSource.data = res.ledgerModelList;
        this.dataSource.paginator = this.paginator;
        this.doChart(res);
    }

    doChart(res: any) {
        this.lineChartData[0].label = 'amount_received_list';
        this.lineChartData[0].data = JSON.parse(JSON.stringify(res.amount_received_list));

        this.lineChartData[1].label = 'amount_receivable_list';
        this.lineChartData[1].data = JSON.parse(JSON.stringify(res.amount_receivable_list));

         this.lineChartData = this.lineChartData.slice();
        console.log(this.lineChartData);
    }

    getSortedArData(invIdInput, fromDateInput, toDateInput) {
        this.UserId = sessionStorage.getItem('id');
        const invId = invIdInput;

        let fromDate = fromDateInput;
        if (fromDate === undefined || fromDate == null) {
            fromDate = new Date('1970-01-01');
        }
        const date1 = new Date(fromDate.setHours(0, 0, 0, 0));

        let toDate = toDateInput;
        if (toDate === undefined || toDate == null) {
            toDate = new Date();
        }
        const date2 = new Date(toDate.setHours(23, 59, 59, 0));

        const formattedDt1 = formatDate(date1, 'yyyy-MM-dd', 'en_US');
        const formattedDt2 = formatDate(date2, 'yyyy-MM-dd', 'en_US');
        this.resultService.getarDetailsBySearch(formattedDt1, formattedDt2, this.UserId, invId).subscribe(res => {
            this.process(res);
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
