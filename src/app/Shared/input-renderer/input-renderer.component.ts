import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-input-renderer',
  templateUrl: './input-renderer.component.html',
  styleUrls: ['./input-renderer.component.css'],
})
export class InputRendererComponent
  implements OnInit, ICellRendererAngularComp
{
  params: any;

  fieldName: string | any;

  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.fieldName = params.colDef!.field;
  }

  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }

  ngOnInit(): void {}
}
