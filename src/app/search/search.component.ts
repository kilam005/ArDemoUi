import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SearchresultService} from './searchresult.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    search = '';
    user = '';
    showAdvancedSearch: boolean = false;
    displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'totalInvoices', 'doj', 'details'];
    dataSource: MatTableDataSource<any>;
    showResults: boolean = false;

    userView: boolean;
    showNoresults: boolean = false;
    iconName: string = 'keyboard_arrow_down';
    ID = '';
    FNAME = '';
    LNAME = '';
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    showPaginator = false;
    showSpinner = false;

    constructor(private resultService: SearchresultService, private router: Router, private activatedRoute: ActivatedRoute) {
    }


    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
    }

    refresh() {
        this.search = '';
    }

    toggleSearch() {
        this.showSpinner = true;
        this.resultService.getPatientWildSearch(this.search).subscribe(res => {
            this.showSpinner = false;
            this.showResults = true;
            this.dataSource.data = res;
            this.showNoresults = res.length === 0;
        }, (err => {
            this.showSpinner = false;
        }));
        // this.dataSource.data = this.tabledata;
    }

    performAdvancedSearch() {
        // this.dataSource.data = this.data;
        this.resultService.getPatientAdvSearch(this.FNAME, this.LNAME, this.ID).subscribe(res => {
            this.dataSource.data = res;
            this.showSpinner = false;
            this.showResults = true;
            this.showNoresults = res.length === 0;
        }, (err => {
            this.showSpinner = false;
        }));
    }

    toggleAdvancedSearch() {
        this.showAdvancedSearch = !this.showAdvancedSearch;
        this.iconName = this.showAdvancedSearch ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }


    openDetailsDialog(id, fname, lname) {
        const param: any = {pid: id};
        // this.dialof.open(DetailsDialogComponent, {
        //   data: param
        // });
        // this.resultService.setSelectedPatientInfo(param);
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('fname', fname);
        sessionStorage.setItem('lname', lname);
        this.router.navigate(['/user']);
    }

    navitoUserView() {
    }

}

//
// const ELEMENT_DATA = [
//   {"userid":1,"firstName":"Dawna","lastName":"Phinn","totalInvoices":11,"doj":"03-Jul-2013"},
// {"userid":2,"firstName":"Silvana","lastName":"Farlham","totalInvoices":40,"doj":"17-Sep-2013"},
// {"userid":3,"firstName":"Elinor","lastName":"Wyllis","totalInvoices":34,"doj":"05-May-2016"},
// {"userid":4,"firstName":"Kelly","lastName":"Moultrie","totalInvoices":17,"doj":"11-Jul-2019"},
// {"userid":5,"firstName":"Charlotta","lastName":"Varley","totalInvoices":59,"doj":"15-Nov-2011"},
// {"userid":6,"firstName":"Lyda","lastName":"Gaw","totalInvoices":60,"doj":"15-Jan-2020"},
// {"userid":7,"firstName":"Andrej","lastName":"Del Checolo","totalInvoices":68,"doj":"31-Oct-2017"},
// {"userid":8,"firstName":"Dar","lastName":"Duchart","totalInvoices":2,"doj":"29-Dec-2013"},
// {"userid":9,"firstName":"Gawain","lastName":"Calyton","totalInvoices":71,"doj":"08-Mar-2016"},
// {"userid":10,"firstName":"Verine","lastName":"Gronno","totalInvoices":26,"doj":"17-Jun-2010"},
// {"userid":11,"firstName":"Leda","lastName":"Grinnov","totalInvoices":74,"doj":"20-Apr-2016"},
// {"userid":12,"firstName":"Ann","lastName":"Derobert","totalInvoices":34,"doj":"10-Jul-2014"},
// {"userid":13,"firstName":"Chico","lastName":"Petranek","totalInvoices":52,"doj":"05-Apr-2012"},
// {"userid":14,"firstName":"Nickey","lastName":"Guinan","totalInvoices":57,"doj":"22-Feb-2012"},
// {"userid":15,"firstName":"Mendie","lastName":"Di Matteo","totalInvoices":28,"doj":"03-Apr-2019"},
// {"userid":16,"firstName":"Elke","lastName":"Millberg","totalInvoices":72,"doj":"28-Apr-2014"},
// {"userid":17,"firstName":"Lilla","lastName":"Gascoigne","totalInvoices":8,"doj":"17-Jul-2013"},
// {"userid":18,"firstName":"Matty","lastName":"Gridon","totalInvoices":44,"doj":"10-Mar-2016"},
// {"userid":19,"firstName":"Bliss","lastName":"Wootton","totalInvoices":45,"doj":"22-Jan-2014"},
// {"userid":20,"firstName":"Ermina","lastName":"Janku","totalInvoices":14,"doj":"06-Nov-2012"},
// ];
