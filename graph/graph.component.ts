import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import * as CanvasJS from '../canvasjs.min';
// import { GoogleChartsModule } from 'angular-google-charts';
import { FormControl} from '@angular/forms';
import { GraphService} from '../graph.service';
import {Vector} from '../Vector';
import {VectorService} from '../vector.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [ GraphService ],
  animations: [
    trigger('moveAway', [
      state('start', style({
        backgroundColor: '#d2d2f1',
        border: '20px',
        transform: 'scale(1.25)'
      })),
      state('end', style({
        backgroundColor: '#00ffc6',
        transform: 'scale(1)',
        border: '20px'
      })),
      transition('start => end', [
        animate('.2s')
      ]),
      transition('end => start', [
        animate('.2s')
      ]),
    ]),
  ],
})
export class GraphComponent implements OnInit {
  mValue = new FormControl();
  intValue = new FormControl();
  xValue = new FormControl();
  xPonent = new FormControl();
  horizontalMove = new FormControl();
  verticalMove = new FormControl();
  vectorX = new FormControl();
  vectorY = new FormControl();
  isMoved = false;
  numOfLines = 0;
  intPoints;
  vectorPoints;
  event: MouseEvent;
  clientX = 0;
  clientY = 0;

  @ViewChild('myCanvas') canvasRef: ElementRef;
  private rect: ClientRect | DOMRect;
  ngOnInit(
  ) {
  }
  constructor(
    public graphService: GraphService,
    public vectorService: VectorService,
  ) {}

  createGraph(a) {
    const ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
    this.graphService.addEquation([1, this.mValue.value, this.intValue.value]);
    console.log(this.xPonent.value);
      if (this.numOfLines == 0) {
        ctx.beginPath();
        ctx.moveTo(250, 0);
        ctx.lineTo(250, 500);
        ctx.moveTo(0, 250);
        ctx.lineTo(500, 250);
        ctx.stroke();
        ctx.beginPath();
        for (let i = 1; i < 20; i++) {
          // @ts-ignore
          ctx.fillText(5 * i, 230, 253 - (25 * i));
          ctx.moveTo(245, 250 - (25 * i));
          ctx.lineTo(255, 250 - (25 * i));
          ctx.fillText(-5 * i, 228, 253 + (25 * i));
          ctx.moveTo(245, 250 + (25 * i));
          ctx.lineTo(255, 250 + (25 * i));
        }
        for (let i = 1; i < 20; i++) {
          ctx.fillText(5 * i, 247 - (25 * i), 240);
          ctx.moveTo(250 - (25 * i), 245);
          ctx.lineTo(250 - (25 * i), 255);
          ctx.fillText(5 * i, 247 + (25 * i), 240);
          ctx.moveTo(250 + (25 * i), 245);
          ctx.lineTo(250 + (25 * i), 255);
        }
        ctx.stroke();
        ctx.closePath()
        ctx.beginPath();
        for (let i = -19; i < 20; i++) {
          ctx.setLineDash([2, 23]);
          ctx.moveTo(0, 250 + (25 * i));
          ctx.lineTo(500, 250 + (25 * i));
          ctx.stroke();
        }
        ctx.closePath();
      }
    if (a === 1) {
      this.numOfLines++;
      ctx.beginPath();
      ctx.setLineDash([]);
      const startPoint = 25 * (this.intValue.value / 5);
      ctx.moveTo(250, 250 - startPoint);
      const endPointPos = ((this.mValue.value * 45) * 25 / 5 + this.intValue.value * 25 / 5);
      const endPointNeg = ((this.mValue.value * -45) * 25 / 5 + this.intValue.value * 25 / 5);
      ctx.lineTo(475, 250 - endPointPos);
      ctx.lineTo(25, 250 - endPointNeg);
      ctx.closePath();
      ctx.stroke(); // change the starting point to be the vertex of the parabola so that increasing and decreasing match
    } else if (a === 2) {
       this.numOfLines++;
       ctx.beginPath();
       ctx.setLineDash([]);
       // const startPoint = 5 * (Math.pow(this.horizontalMove.value, 2) + this.verticalMove.value);
       const startPointY = 5 * this.verticalMove.value;
       const startPointX = 5 * this.horizontalMove.value;
      // console.log(startPoint);
       // ctx.moveTo(250 + 5 * this.horizontalMove.value, 250 - 5 * this.verticalMove.value);
       ctx.stroke();
       ctx.closePath();
       let x = 250 - startPointX;
       let y = 250 - startPointY;
       for(let i  = 0; i < 20; i = i + .1) {
         ctx.beginPath();
         ctx.moveTo(x, y);
         ctx.lineTo(x + 5 * i, y - 5 * this.getPoint(i - this.horizontalMove.value));
         x = x + 5 * i;
         y = y - 5 * this.getPoint(i - this.horizontalMove.value);
         ctx.stroke();
       }
       x = 250 - startPointX;
       y = 250 - startPointY;
       for(let i  = 0; i > -20; i = i - .1) {
         ctx.beginPath();
         ctx.moveTo(x,y);
         ctx.lineTo(x + 5 * i, y - 5 * this.getPoint(i - this.horizontalMove.value));
         x = x + 5 * i;
         y = y - 5 * this.getPoint(i - this.horizontalMove.value);
         console.log(i + ' ' + this.getPoint(i));
         ctx.stroke();
       }
     } else if (a === 3) {
          this.numOfLines++;
          const startPointX = 250;
          const startPointY = 250;
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(startPointX, startPointY);
          ctx.lineTo(startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5));
          ctx.moveTo(startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5));

          const angle = Math.atan(this.vectorY.value / this.vectorX.value);
          ctx.lineTo(startPointX + (this.vectorX.value * 5) - (Math.sign(this.vectorX.value) * 10), startPointY
            - (this.vectorY.value * 5));
          console.log(Math.atan(this.vectorY.value / this.vectorX.value));

          ctx.moveTo(startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5));
          ctx.lineTo(startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5)
            + (10 * Math.sign(this.vectorY.value)));
          this.graphService.addVector([startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5)]);
          ctx.stroke();
     } else if (a === 4) {
          this.numOfLines++;
          this.vectorPoints = this.graphService.vectors;
          if (this.vectorPoints.length > 0) {
            const length = this.vectorPoints.length;
            const startPointX = (this.vectorPoints[length - 1][0]);
            const startPointY = (this.vectorPoints[length - 1][1]);
            ctx.beginPath();
            ctx.moveTo(startPointX, startPointY);
            ctx.lineTo(startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5));
            ctx.moveTo(startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5));
            ctx.lineTo(startPointX + (this.vectorX.value * 5) - (Math.sign(this.vectorX.value) * 10), startPointY
              - (this.vectorY.value * 5));
            ctx.moveTo(startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5));
            ctx.lineTo(startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5)
              + (10 * Math.sign(this.vectorY.value)));
            ctx.stroke();
            this.graphService.addVector([startPointX + (this.vectorX.value * 5), startPointY - (this.vectorY.value * 5)]);
          }
     }
  }
  getPoint(x) {
    return  (Math.pow((this.horizontalMove.value + (this.xValue.value * x)), 2));
  }
  getIntersection() {
    const ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
    this.intPoints = this.graphService.solveIntersection();
    ctx.fillStyle = 'red';
    ctx.fillRect(248 - this.intPoints[0]*25/5,248 - this.intPoints[1]*25/5,5,5);
    console.log(this.intPoints);
  }
  onEvent(event: MouseEvent): void {
    this.rect = event.target.getBoundingClientRect();
    this.event = event;
    this.coordinates(this.event);
    if(this.intPoints) {
      this.searchInt();
    }
    /*console.log(this.clientX + ' ' + this.clientY);
    let x = 250 - this.intPoints[0]*25/5;
    let y = 250 - this.intPoints[1]*25/5;
    console.log(x + ' ' + y);*/
  }
  coordinates(event: MouseEvent): void {
    this.clientX = event.clientX - this.rect.left;
    this.clientY = event.clientY - this.rect.top;
  }
  searchInt() {
    if(this.numOfLines > 1) {
      if (Math.round(250 - (this.intPoints[0] * 25 / 5)) === Math.round(this.clientX) && Math.round(250 - (this.intPoints[1] * 25 / 5))
        === Math.round(this.clientY)) {
        console.log('yes');
        const ctx: CanvasRenderingContext2D =
          this.canvasRef.nativeElement.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(245 - this.intPoints[0]*25/5,245 - this.intPoints[1]*25/5,10,10);
        ctx.fillText('(' + this.intPoints[1] + ',' + this.intPoints[0] + ')' ,245 - this.intPoints[0]*25/5, 245 - this.intPoints[1]*25/5);
      }
    }
  }
  /*createGraph1() {
    const ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(25, 475);
    ctx.moveTo(25, 475);
    ctx.lineTo(475, 475);
    for (let i = 0; i < 19; i++) {
      ctx.fillText(5 * i, 0, 25 * (19 - i));
      ctx.moveTo(20, 25 * (19 - i));
      ctx.lineTo(30, 25 * (19 - i));
    }
    for (let i = 0; i < 19; i++) {
      ctx.fillText(5 * i, 24.7 * (i + 1), 500);
      ctx.moveTo(25 * (i + 1), 470);
      ctx.lineTo(25 * (i + 1), 480);
    }
    ctx.stroke();
    ctx.beginPath();
    for (let i = 1; i < 19; i++) {
      ctx.setLineDash([2, 20]);
      ctx.moveTo(50, 25 * (19 - i));
      ctx.lineTo(478, 25 * (19 - i));
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.setLineDash([]);
    const startPoint = 475 - 25 * (this.intValue.value / 5);
    ctx.moveTo(25, startPoint);
    const endPoint = ((this.mValue.value * 25) / 5) - this.intValue.value;
    ctx.lineTo(475, endPoint);
    ctx.closePath();
    ctx.stroke();
    ctx.clip('evenodd');
    ctx.beginPath();
    ctx.fillStyle = '#DD0031';
  } */
  /*createGraph() {
    const dataPoints = [];
    let y = this.intValue.value - this.mValue.value;
    // y = 5x + 1
    for ( let i = -50; i < 51; i++ ) {
      y += this.mValue.value;
      dataPoints.push({ y: y});
    }
    const chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Line Graph'
      },
      subtitles: [{
        text: 'Visual Graph'
      }],
      data: [
        {
          type: 'line',
          dataPoints
        }]
    });

    chart.render();
  } */
  toggle() {
    this.isMoved = !this.isMoved;
  }
}
