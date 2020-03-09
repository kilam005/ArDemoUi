import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {SearchresultService} from '../search/searchresult.service';

@Component({
    selector: 'app-userview',
    templateUrl: './userview.component.html',
    styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit, AfterViewInit {

    displayedColumns = ['invoice_id', 'order_details', 'purchaseDate', 'totalCost', 'amountPaid', 'amountDue', 'details'];
    displayedColumnsInvoice = ['invoice_id', 'payment_id', 'totalCost', 'mode'];
    dataSource = new MatTableDataSource();
    invoiceDS = new MatTableDataSource();
    showInvoiceData: boolean = false;
    hideMainTable: boolean = true;
    userId = '';
    userfName = 'FUser';
    userlName = 'LUser';
    letters = 'FL';
    showNoresults = false;

    /*lineChartData: Array<any> = [
        {data: [40], label: 'Amount Recieved List'},
        {data: [90], label: 'Amount Recievable List'},
    ];*/
     lineChartData = [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3]
        },
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3]
        }
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


    constructor(private activatedRoute: ActivatedRoute, private resultService: SearchresultService) {
    }

    ngOnInit(): void {
        this.userId = sessionStorage.getItem('id');
        this.userfName = sessionStorage.getItem('fname');
        this.userlName = sessionStorage.getItem('lname');
        this.letters = this.userfName.charAt(0) + this.userlName.charAt(0);
        this.resultService.getInvoiceDetails(this.userId).subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.showNoresults = res.length === 0;
        });
        this.resultService.getarDetails(this.userId).subscribe(res => {
            this.invoiceDS = res.ledgerModelList;
            this.showNoresults = res.length === 0;
            this.lineChartData[0]['label']="amount_received_list";
            this.lineChartData[0]['data'] = JSON.parse(JSON.stringify(res.amount_received_list));
            this.lineChartData = this.lineChartData.slice();

            this.lineChartData[1]['label']="amount_receivable_list";
            this.lineChartData[1]['data'] = JSON.parse(JSON.stringify(res.amount_receivable_list));
            this.lineChartData = this.lineChartData.slice();
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator.toArray()[0];
        this.invoiceDS.paginator = this.paginator.toArray()[1];
    }

    toggleInvoiceChart() {
        this.showInvoiceData = !this.showInvoiceData;
        this.hideMainTable = !this.hideMainTable;
    }


    openInvoiceDetailsDialog(id) {
        const param: any = {pid: id};
        // this.dialof.open(DetailsDialogComponent, {
        //   data: param
        // });
        // this.resultService.setSelectedPatientInfo(param);
        sessionStorage.setItem('id', id);
        // this.router.navigate(['/user']);
    }

}
