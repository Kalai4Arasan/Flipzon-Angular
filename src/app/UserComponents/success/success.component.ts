import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor() { }

  successData=null;

  ngOnInit(): void {
    console.log(history.state[1])
    this.successData=history.state[0]
  }

}
