import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {SearchresultService} from '../search/searchresult.service';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-userview',
    templateUrl: './userview.component.html',
    styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit, AfterViewInit {

    displayedColumns = ['invoice_id', 'order_details', 'purchaseDate', 'totalCost', 'amountPaid', 'amountDue', 'details'];
    dataSource = new MatTableDataSource();
    userId = '';
    paymentFromDate: Date;
    paymentToDate: Date;
    userFirstName = 'FUser';
    userLastName = 'LUser';

    maxDate: Date = new Date(new Date().setHours(23, 59, 59, 0));
    minDate: Date = new Date(1970, 1, 1);


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private activatedRoute: ActivatedRoute, private resultService: SearchresultService) {
    }


    ngOnInit(): void {
        this.userId = sessionStorage.getItem('id');
        this.userFirstName = sessionStorage.getItem('fname');
        this.userLastName = sessionStorage.getItem('lname');
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.resultService.getInvoiceDetails(this.userId).subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getSortedPurchaseData(fromDateInput, toDateInput) {
        this.userId = sessionStorage.getItem('id');
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

        this.resultService.getdifferenceInvoiceDetails(formattedDt1, formattedDt2, this.userId).subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        });

    }
}
