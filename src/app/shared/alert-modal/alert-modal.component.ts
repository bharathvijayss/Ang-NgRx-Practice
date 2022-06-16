import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() errorMsg!: string;
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeMe() {
    this.closeEvent.emit(true);
  }

}
