import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { UserviewComponent } from './userview/userview.component';
import { MaterialModule } from './material.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import { NgChartjsModule } from 'ng-chartjs';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

const chartAnnotation = ChartAnnotation;

export function horizonalLine(chartInstance) {
  const yScale = chartInstance.scales['y-axis-0'];
  const canvas = chartInstance.chart;
  const ctx = canvas.ctx;
  let index;
  let line;
  let style;
  let yValue;

  if (chartInstance.options.horizontalLine) {
    for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
      line = chartInstance.options.horizontalLine[index];

      if (!line.style) {
        style = 'rgba(169,169,169, .6)';
      } else {
        style = line.style;
      }

      if (line.y) {
        yValue = yScale.getPixelForValue(line.y);
      } else {
        yValue = 0;
      }

      ctx.lineWidth = 3;

      if (yValue) {
        ctx.beginPath();
        ctx.moveTo(0, yValue);
        ctx.lineTo(canvas.width, yValue);
        ctx.strokeStyle = style;
        ctx.stroke();
      }

      if (line.text) {
        ctx.fillStyle = style;
        ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
      }
    }
    return;
  }
}
const horizonalLinePlugin = {
  // id: 'cutomline',
  beforeDraw: horizonalLine
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    UserviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    FormsModule
    NgChartjsModule,
    NgChartjsModule.registerPlugin([horizonalLinePlugin, chartAnnotation])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
