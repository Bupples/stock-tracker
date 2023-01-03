import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SentimentComponent } from './components/sentiment.component';

const routes: Routes = [
  { path: ':symbol', component: SentimentComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SentimentRoutingModule { }
