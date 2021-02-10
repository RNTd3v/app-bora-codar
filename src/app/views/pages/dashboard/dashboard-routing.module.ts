import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

const routesChild: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routesChild) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
