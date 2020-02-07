import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TreemapComponent } from './treemap/treemap.component';
import { TreemapService } from './treemap/treemap.service';
import { FolderStatsComponent } from './filesystem-stats/filesystem-stats.component';
import { LeftNavComponent } from './left-nav/left-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    TreemapComponent,
    FolderStatsComponent,
    LeftNavComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: FolderStatsComponent, pathMatch: 'full' },
    ]),
    ReactiveFormsModule,
  ],
  providers: [
    TreemapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
