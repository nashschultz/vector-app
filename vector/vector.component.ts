import { Component, OnInit } from '@angular/core';
import { Vector } from '../Vector';
import { VectorService } from '../vector.service';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vector',
  templateUrl: './vector.component.html',
  styleUrls: ['./vector.component.scss'],
  providers: [ VectorService ]
})
export class VectorComponent implements OnInit {
  name = new FormControl('');
  name2 = new FormControl('');
  X1 = new FormControl('');
  Y1 = new FormControl('');
  Z1 = new FormControl('');
  X2 = new FormControl('');
  Y2 = new FormControl('');
  Z2 = new FormControl('');

  vectorX = new FormControl('');
  vectorY = new FormControl('');
  vectorZ = new FormControl('');
  vectorCross = [];
  vector1 = [this.X1.value, this.Y1.value, this.Z1.value];
  vector2 = [this.X2.value, this.Y2.value, this.Z2.value];
  displayVector = [0, 0, 0];
  private vLength: number;
  // vectorAddition = [this.vectorService.addVectors(1), this.vectorService.addVectors(2), this.vectorService.addVectors(3)];
  /*vectorInfo = this.fb.group({
    X1: [''],
    Y1: [''],
    Z1: [''],
    X2: [''],
    Y2: [''],
    Z2: ['']
  }); */


  constructor(
    private vectorService: VectorService
  ) {
  }


  ngOnInit() {
  }
  addVector(){
    this.vectorService.addVectors(this.vectorX.value, this.vectorY.value, this.vectorZ.value);
  }
  getCross(){
    this.vLength = this.vectorService.vectors.length;
    this.vectorService.crossVector(this.vectorX.value, this.vectorY.value, this.vectorZ.value,
      this.vectorService.vectors[this.vLength - 1][0],
      this.vectorService.vectors[this.vLength - 1][1], this.vectorService.vectors[this.vLength - 1][2]);
  }
  addVectors(a) {
    if (a === 1) {
      return this.X1.value + this.X2.value;
    } else if (a === 2) {
      return this.Y1.value + this.Y2.value;
    } else {
      return this.Z1.value + this.Z2.value;
    }
  }

  getLength(a) {
    if (a === 1) {
      return Math.sqrt((Math.pow(this.X1.value, 2))
        + (Math.pow(this.Y1.value, 2)) + (Math.pow(this.Z1.value, 2)));
    } else {
      return Math.sqrt((Math.pow(this.X2.value, 2))
        + (Math.pow(this.Y2.value, 2)) + (Math.pow(this.Z2.value, 2)));
    }
  }

  crossVector(a) {
    if (a === 1) {
      return (this.Y1.value * this.Z2.value - this.Z1.value * this.Y2.value);
    } else if (a === 2) {
      return (this.Z1.value * this.X2.value - this.X1.value * this.Z2.value);
    } else {
      return (this.X1.value * this.Y2.value - this.Y1.value * this.X2.value);
    }
  }

  dotVector() {
    return this.X1.value * this.X2.value + this.Y1.value * this.Y2.value + this.Z1.value * this.Z2.value;
  }
}
