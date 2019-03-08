import { Injectable } from '@angular/core';
import { GraphComponent} from './graph/graph.component';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  public equations = [];
  public vectors = [];
  constructor() { }
  solveIntersection() {
    if (this.equations.length > 1) {
      const det = (this.equations[0][1] * this.equations[1][0]) - (this.equations[1][1] * this.equations[0][0]);
      const detx = (this.equations[0][2] * this.equations[1][0]) - (this.equations[1][2] * this.equations[0][0]);
      const dety = (this.equations[0][1] * this.equations[1][2]) - (this.equations[1][1] * this.equations[0][2]);
      return ([detx / det, dety / det]);
    }
  }
  addEquation(a) {
    this.equations.push([a[0], a[1], a[2]]);
  }
  addVector(a) {
    this.vectors.push([a[0],a[1]]);
  }
}
