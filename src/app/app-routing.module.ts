import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrackerComponent } from './tracker/components/tracker.component';

const routes: Routes = [
  { path: 'sentiment', loadChildren: () => import('./stock-tracker.module').then(m => m.StockTrackerModule) },
  { path: '', component: TrackerComponent }
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
