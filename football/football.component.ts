import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.scss']
})
export class FootballComponent implements OnInit {
  angle = new FormControl();
  speed = new FormControl();
  event: MouseEvent;
  clientX = 0;
  clientY = 0;
  xDistance = 0;
  time = 0;
  maxHeight = 0;
  @ViewChild('myCanvas') canvasRef: ElementRef;
  private rect: ClientRect | DOMRect;
  constructor() { }

  ngOnInit() {
    this.drawField();
  }
  drawField() {
    const ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
    /*ctx.beginPath();
    ctx.moveTo(0, 495);
    ctx.lineTo(978, 495);
    ctx.lineTo(1008, 395);
    ctx.lineTo(30, 395);
    ctx.lineTo(0, 495);
    ctx.fillStyle = 'green';
    // ctx.stroke();
    ctx.fill(); */
    ctx.clearRect(0, 0, 1008, 500); // clear canvas
    ctx.beginPath();
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0,0,1008, 395);
    const cloud = document.getElementById('cloud');
    let time = new Date();
    ctx.drawImage(cloud, 2 * time.getSeconds(), 50, 240, 160);
    ctx.drawImage(cloud, 500, 10, 180, 120);
    ctx.drawImage(cloud, 700, 60, 340, 200);
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 395, 1008, 105);
    ctx.fillStyle = 'black';
    ctx.lineWidth = 3;
    ctx.moveTo(0,495);
    ctx.lineTo(978, 495);
    ctx.moveTo(0,495);
    ctx.lineTo(30, 395);
    ctx.moveTo(978, 495);
    ctx.lineTo(1008, 395);
    ctx.moveTo(1008, 395);
    ctx.lineTo(30, 395);
    ctx.moveTo(0, 0);
    ctx.lineTo(1000, 0);
    ctx.fillText('60 YARDS', 500, 20);
    ctx.stroke();
    for (let i = 0; i < 24; i++) {
      ctx.beginPath();
      ctx.moveTo(i*81.5/2, 495);
      ctx.lineTo((i*81.5)/2 + 30, 395);
      ctx.lineTo(((i+1)*81.5)/2 + 30, 395);
      ctx.lineTo((i+1)*81.5/2, 495);
      if (i === 0 || i === 1) {
        ctx.fillStyle = '#00770b';
      } else if (i === 22 || i === 23) {
        ctx.fillStyle = '#00aa0f';
      } else {
        if (i % 2 === 0) {
          ctx.fillStyle = '#00aa0f';
        } else {
          ctx.fillStyle = '#00770b';
        }
      }
      ctx.fill();
    }
    for (let i = 1; i < 12; i++) {
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.moveTo(81.5*i, 495);
      ctx.lineTo((81.5*i) + 30, 395);
      ctx.stroke();
    }
    for (let i = 2; i < 7; i++) {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.font = "30px Arial";
      ctx.fillText((i-1)*10,(81.5*i) - 12, 495);
    }
    for (let i = 6; i < 10; i++) {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.font = "30px Arial";
      ctx.fillText(-(i - 10)*10,(81.5*(i + 1)) - 12, 495);
    }
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillStyle='white';
    //ctx.rotate( -75 * Math.PI / 180);
    ctx.fillText('END',-445, 180);
    ctx.fillStyle='white';
    //ctx.rotate(180 * Math.PI / 180);
    ctx.fillText('ZONE',140, -1025);
    ctx.strokeStyle = 'yellow';
    const goalpost = document.getElementById('post');
    ctx.drawImage(goalpost, -5, 390, 30, 70);
    ctx.drawImage(goalpost, 975, 390, 30, 70);
    ctx.stroke();
    ctx.save();
    // window.requestAnimationFrame(this.drawField());
  }
  thrownBall() {
    const ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
    ctx.beginPath();
    //ctx.rotate(-180 * Math.PI / 180);
    const image = document.getElementById('source');
    const image1 = document.getElementById('source1');
    ctx.fillStyle = 'black';
    ctx.drawImage(image, this.clientX - 8, this.clientY - 8, 10, 20);
    ctx.save();
    const yards = this.clientX/8.15 - 10;
    console.log(yards);
    this.getVariables(this.angle.value, this.speed.value);
    console.log(this.xDistance + ' ' + this.maxHeight + ' ' + this.time);
    ctx.drawImage(image1, (this.xDistance * 1.094 * 8.15) + this.clientX, this.clientY, 10, 10);
    ctx.drawImage(image1, ((this.xDistance * 1.094 * 8.15) /2 ) + this.clientX, this.clientY - (this.maxHeight * 1.094 * 8.15), 10, 10);
    let xPart = this.clientX;
    for(let i = 0; i < 30; i++) {
      // ctx.drawImage(image1, xPart + (8.15 * i), this.clientY - i * (this.maxHeight * 1.094 * 8.15 / 30), 10, 10);
    }
  }
  getVariables(angle, velocity) {
    // change of y = 1/2at^2 + Vot
    const gravity = -9.81;
    // const changeY = -1.8288;
    const changeY = 0;
    const velocityY = velocity * Math.sin(angle * (Math.PI / 180));
    const velocityX = velocity * Math.cos(angle * (Math.PI / 180));
    const time1 = (-velocityY + Math.sqrt(Math.pow(velocityY, 2) + 2*gravity*changeY))/gravity;
    const time2 = (-velocityY - Math.sqrt(Math.pow(velocityY, 2) + 2*gravity*changeY))/gravity;
    let time = 0;
    if(Math.sign(time1) === 1) {
      time = time1;
    } else if (Math.sign(time2) === 1) {
      time = time2;
    }
    this.xDistance = velocityX * time;
    this.time = time;
    this.maxHeight = (Math.pow(velocity, 2) * Math.pow(Math.sin(angle * (Math.PI / 180)), 2)) / (-2*gravity);
  }
  onEvent(event: MouseEvent): void {
    this.rect = event.target.getBoundingClientRect();
    this.event = event;
    this.coordinates(this.event);
    console.log(this.clientX + ' ' + this.clientY);
    /*console.log(this.clientX + ' ' + this.clientY);
    let x = 250 - this.intPoints[0]*25/5;
    let y = 250 - this.intPoints[1]*25/5;
    console.log(x + ' ' + y);*/
  }
  coordinates(event: MouseEvent): void {
    this.clientX = event.clientX - this.rect.left;
    this.clientY = event.clientY - this.rect.top;
  }
}
