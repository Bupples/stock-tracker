import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrackerListComponent } from './tracker/components/tracker-list/tracker-list.component';

const routes: Routes = [
  { path: 'sentiment', loadChildren: () => import('./sentiment/sentiment.module').then(m => m.SentimentModule) },
  { path: '', component: TrackerListComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
