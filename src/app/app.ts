import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { WhatWeDoComponent } from './components/what-we-do/what-we-do.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { RepairRequestComponent } from './components/repair/repair.component';
import { TrackingComponent } from './components/tracking/tracking.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    WhatWeDoComponent,
    ProductListComponent,
    CartComponent,
    RepairRequestComponent,
    TrackingComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./styles.css']
})
export class App {}

