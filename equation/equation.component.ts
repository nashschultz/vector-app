import { Component, OnInit } from '@angular/core';
import { VectorService} from '../vector.service';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss'],
  providers: [ VectorService ]
})
export class EquationComponent implements OnInit {
  X1 = new FormControl('');
  Y1 = new FormControl('');
  Z1 = new FormControl('');
  X2 = new FormControl('');
  Y2 = new FormControl('');
  Z2 = new FormControl('');
  X3 = new FormControl('');
  Y3 = new FormControl('');
  Z3 = new FormControl('');
  A1 = new FormControl('');
  A2 = new FormControl('');
  A3 = new FormControl('');
  public solved = [];
  public answer: number;
  constructor(
    private vectorService: VectorService,
  ) { }

  ngOnInit() {
  }
  solveEquation() {
    this.vectorService.solveEquation([this.X1.value, this.X2.value, this.X3.value], [this.Y1.value, this.Y2.value, this.Y3.value],
      [this.Z1.value, this.Z2.value, this.Z3.value],
      [this.A1.value, this.A2.value, this.A3.value]);
    console.log(this.vectorService.solved);
    this.solved = this.vectorService.solved;
    this.answer = (this.X1.value * this.solved[0]) + (this.Y1.value * this.solved[1]) + (this.Z1.value * this.solved[2]);
  }

}
