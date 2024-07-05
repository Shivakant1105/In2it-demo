import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
})
export class ActionButtonComponent implements OnInit, ICellRendererAngularComp {
  params: any;
  fieldName: string | undefined = '';
  editStateSubscription!: Subscription;

  constructor() {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.fieldName = params.colDef?.field;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }

  ngOnInit(): void {}

  //   My Task component
  onEditClick() {
    if (this.params.context.parentComponent === 'task') {
      this.params.context.parentComponent.onEdit(this.params.data);
      this.params.context.parentComponent.addTask();
    } else {
      this.params.data.edit_mode = true;
      let updatedData = JSON.parse(JSON.stringify(this.params.data));
      updatedData.edit_mode = false;
      this.params.data.updateData = updatedData;
    }
  }

  deleteRow() {
    if (this.params.context.parentComponent === 'task') {
      this.params.context.parentComponent.onDelete(this.params.data);
    } else {
      this.params.api.applyTransaction({
        remove: [this.params.node.data],
      });
    }
  }

  confirmEdit() {
    if (this.params.data.addMode) {
      delete this.params.data.addMode;
      this.params.data.table_name.value =
        this.params.data.updateData.table_name.value;
      this.params.data.description.value =
        this.params.data.updateData.description.value;
      delete this.params.data.updatedData;
    } else {
      this.params.data.edit_mode = false;
      this.params.data.table_name.value =
        this.params.data.updateData.table_name.value;
      this.params.data.description.value =
        this.params.data.updateData.description.value;

      delete this.params.data.updateData;
    }
  }

  cancelEdit() {
    if (this.params.data.addMode) {
      this.params.api.applyTransaction({
        remove: [this.params.node.data],
      });
    } else {
      this.params.data.edit_mode = false;

      delete this.params.data.updateData;
    }
  }
}
