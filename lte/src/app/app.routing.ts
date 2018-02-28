import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component';
import { LandingComponent } from './landing/landing.component';

const appRoutes: Routes = [
    {
        path: '', redirectTo: 'landing', pathMatch: 'full'
    },
    {
        path: 'landing',
        component: LandingComponent
    },
    {
        path: 'map',
        component: MapComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
