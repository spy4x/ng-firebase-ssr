import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OneComponent} from './one/one.component';
import {ListComponent} from './list/list.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'articles/:id',
    component: OneComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
