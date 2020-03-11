import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UserviewComponent } from './userview/userview.component';
import { ArviewComponent } from './arview/arview.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  { path: 'search', component: SearchComponent },
  { path: 'user', component: UserviewComponent },
  { path: 'ar', component: ArviewComponent },
  { path: 'ar/:id', component: ArviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
