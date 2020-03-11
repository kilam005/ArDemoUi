import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
    dataSource = new MatTableDataSource();
    userId = '';
    pfromdate = '';
    ptodate = '';
    userFirstName = 'FUser';
    userLastName = 'LUser';


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

    getSortedPurchaseData() {
        this.userId = sessionStorage.getItem('id');
        this.resultService.getdifferenceInvoiceDetails(this.pfromdate, this.ptodate, this.userId).subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
        });

    }
}
