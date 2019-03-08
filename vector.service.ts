import { Injectable } from '@angular/core';
import { VectorComponent } from './vector/vector.component';


@Injectable({
  providedIn: 'root'
})
export class VectorService {
  public vectors = [];
  public crossVectors = [];
  vLength = 0;
  private arr: any[][];
  public determinant: number;
  private det: number;
  private detx: number;
  private dety: number;
  private detz: number;
  public solved: number[];
  constructor(
  ) {
  }
  addVectors(a, b, c) {
    this.vectors.push([a, b, c]);
  }
  crossVector(d, e, f, a, b, c) {
      if (this.vectors.length > 0) {
        this.vLength = this.vectors.length;
        this.crossVectors.push([(b * f - c * e),
          (c * d - a * f),
          (a * e - b * d)]);
      }
  }
  getDeterminant(a, b, c) {
    this.arr = [ [ a[0], b[0], c[0] ], [ a[1], b[1], c[1] ], [ a[2], b[2], c[2] ] ];
    this.determinant = this.arr[0][0] * (this.arr[1][1] * this.arr[2][2] - this.arr[1][2] * this.arr[2][1]) -
      this.arr[0][1] * (this.arr[1][0] * this.arr[2][2] - this.arr[1][2] * this.arr[2][0]) +
      this.arr[0][2] * (this.arr[1][0] * this.arr[2][1] - this.arr[1][1] * this.arr[2][0]);
    return this.determinant;

  }
  solveEquation(a, b, c, d) {
    this.det = this.getDeterminant(a, b, c);
    this.detx = this.getDeterminant(d, b, c);
    this.dety = this.getDeterminant(a, d, c);
    this.detz = this.getDeterminant(a, b, d);
    this.solved = [this.detx / this.det, this.dety / this.det, this.detz / this.det];
    console.log(this.solved);
  }
  /*
  getLength(a) {
    if(a == 1) {
      return Math.sqrt((Math.pow(this.vectors.X1.value, 2))
        + (Math.pow(this.vectors.Y1.value, 2)) + (Math.pow(this.vectors.Z1.value, 2)));
    } else {
      return Math.sqrt((Math.pow(this.vectors.X2.value, 2))
        + (Math.pow(this.vectors.Y2.value, 2)) + (Math.pow(this.vectors.Z2.value, 2)));
    }
  }

  dotVector() {
    return this.vectors.X1.value * this.vectors.X2.value + this.vectors.Y1.value * this.vectors.Y2.value
      + this.vectors.Z1.value * this.vectors.Z2.value;
  } */
}

