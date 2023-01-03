import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SentimentComponent } from './components/sentiment.component';
import { SentimentRoutingModule } from './sentiment-routing.module';

@NgModule({
  declarations: [
    SentimentComponent
  ],
  imports: [
    CommonModule,
    SentimentRoutingModule
  ],
  exports: [
    SentimentComponent
  ]
})
export class SentimentModule { }
