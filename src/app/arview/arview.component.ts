import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchresultService} from '../search/searchresult.service';

@Component({
    selector: 'app-arview',
    templateUrl: './arview.component.html',
    styleUrls: ['./arview.component.css']
})
export class ArviewComponent implements OnInit {

    arSummary;
    invoiceDS = new MatTableDataSource();
    displayedColumnsInvoice = ['invoice_id', 'payment_id', 'totalCost'];
    invoiceid = '';
    UserId = '';
    userfName = 'FUser';
    userlName = 'LUser';
    inid = '';
    arfromdate = '';
    artodate = '';

    lineChartData: Array<any> = [
        {data: [40], label: 'Amount Recieved List'},
        {data: [90], label: 'Amount Recievable List'},
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

    constructor(private router: Router, private activatedRouter: ActivatedRoute, private resultService: SearchresultService) {
    }

    ngOnInit(): void {
        this.UserId = sessionStorage.getItem('id');
        this.userfName = sessionStorage.getItem('fname');
        this.userlName = sessionStorage.getItem('lname');

        this.invoiceid = this.activatedRouter.snapshot.paramMap.get('id');

        if (this.invoiceid != null) {
            this.resultService.getarDetailsByInvoice(this.UserId, this.invoiceid).subscribe(res => {
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
        this.invoiceDS = res.ledgerModelList;
        this.invoiceDS.paginator = this.paginator;
        this.doChart(res);
    }

    doChart(res: any) {
        this.lineChartData[0].label = 'amount_received_list';
        this.lineChartData[0].data = JSON.parse(JSON.stringify(res.amount_received_list));
        this.lineChartData = this.lineChartData.slice();

        this.lineChartData[1].label = 'amount_receivable_list';
        this.lineChartData[1].data = JSON.parse(JSON.stringify(res.amount_receivable_list));
        this.lineChartData = this.lineChartData.slice();
    }

    getSortedArData() {
        this.UserId = sessionStorage.getItem('id');
        this.invoiceid = this.activatedRouter.snapshot.paramMap.get('id');
        this.resultService.getarDetailsBySearch(this.arfromdate, this.artodate, this.UserId, this.invoiceid).subscribe(res => {
            this.invoiceDS = res.ledgerModelList;
            this.doChart(res);
        });
        this.invoiceDS.paginator = this.paginator;

    }

}
