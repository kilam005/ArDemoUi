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
        let sortarr =[];
        let json = {};
        for (var product of res.amount_received_list) {
            const formattedDt1 = formatDate(product.x, 'yyyy-MM-dd', 'en_US');
             json = {x:formattedDt1,y:product.y}
            sortarr.push(json);
        }
        this.lineChartData[0].data = JSON.parse(JSON.stringify(sortarr));
        this.lineChartData = this.lineChartData.slice();
        let arr =[];
        let toDate =  new Date();
        for (var product of res.amount_receivable_list) {
            const formattedDt1 = formatDate(product.x, 'yyyy-MM-dd', 'en_US');
            toDate = new Date(formattedDt1);
            arr.push(formattedDt1);
        }
        for (var product of res.amount_received_list) {
            const formattedDt1 = formatDate(product.x, 'yyyy-MM-dd', 'en_US');
            var str = product.x;
            if(arr.indexOf(formattedDt1) == -1){
                arr.push(formattedDt1);
            }

        }

        arr.sort(date_sort_asc);
        var date_sort_asc = function (date1, date2) {
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        };

        let sortarr1 =[];
        let json1 = {};
        for (var product of res.amount_receivable_list) {
            const formattedDt1 = formatDate(product.x, 'yyyy-MM-dd', 'en_US');
            json1 = {x:formattedDt1,y:product.y}
            sortarr1.push(json1);
        }
        this.lineChartData[1].label = 'amount_receivable_list';
        this.lineChartData[1].data = JSON.parse(JSON.stringify(sortarr1));
        this.lineChartData = this.lineChartData.slice();

        this.lineChartLabels= arr;
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
