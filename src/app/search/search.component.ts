import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SearchresultService} from './searchresult.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    search = '';
    user = '';
    showIcons = false;
    showAdvancedSearch = false;
    displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'totalInvoices', 'doj', 'details'];
    dataSource: MatTableDataSource<any>;
    showResults = false;
    showNoresults = false;
    iconName = 'keyboard_arrow_down';
    ID = '';
    FNAME = '';
    LNAME = '';
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    showSpinner = false;

    constructor(private resultService: SearchresultService, private router: Router) {
    }


    ngOnInit() {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('fname');
        sessionStorage.removeItem('lname');
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
    }

    toggleSearch() {
        this.showSpinner = true;
        this.resultService.getPatientWildSearch(this.search).subscribe(res => {
            this.showSpinner = false;
            this.showResults = true;
            this.dataSource.data = res;
            this.showNoresults = res.length === 0;
        }, (() => {
            this.showSpinner = false;
        }));
    }

    performAdvancedSearch() {
        this.resultService.getPatientAdvSearch(this.FNAME, this.LNAME, this.ID).subscribe(res => {
            this.dataSource.data = res;
            this.showSpinner = false;
            this.showResults = true;
            this.showNoresults = res.length === 0;
        }, (() => {
            this.showSpinner = false;
        }));
    }

    toggleAdvancedSearch() {
        this.showAdvancedSearch = !this.showAdvancedSearch;
        this.iconName = this.showAdvancedSearch ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }


    openDetailsDialog(id, fname, lname) {
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('fname', fname);
        sessionStorage.setItem('lname', lname);
        this.router.navigate(['/user']);
    }
}
