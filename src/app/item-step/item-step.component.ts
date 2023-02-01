import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-step',
  templateUrl: './item-step.component.html',
  styleUrls: ['./item-step.component.css']
})
export class ItemStepComponent implements OnInit {

  @Input() step!: string;
  @Input() count!: number;
  @Input() disabled!: boolean;
  @Input() completed!: boolean;

  @Output() checkedEvent = new EventEmitter<boolean>();

  constructor() { }

  onChange(e:boolean){
    if(e){
      console.log("checked");
      this.checkedEvent.emit(e);
      return true;
    }

    console.log("UN-checked");
    this.checkedEvent.emit(e);
    return false;
  }

  ngOnInit() {
  }

}
