import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VectorComponent } from './vector/vector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph.component';
import { VectorService } from './vector.service';
import { EquationComponent } from './equation/equation.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { GraphService} from './graph.service';
import { FootballComponent } from './football/football.component';

@NgModule({
  declarations: [
    AppComponent,
    VectorComponent,
    GraphComponent,
    EquationComponent,
    FootballComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [VectorService, GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
