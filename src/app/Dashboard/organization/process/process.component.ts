import {  Component,  OnInit,   } from '@angular/core';
// import { DataService } from '../../service/data.service';
import { ColDef } from 'ag-grid-community';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { CustomCellComponent } from 'src/app/Shared/custom-cell/custom-cell.component';

// import { AllModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css'],
})
export class ProcessComponent implements OnInit {

 
  columnDefs: ColDef[] = [
    { 
      headerCheckboxSelection: true, 
      checkboxSelection: true,
      
    },
    { headerName: 'Org Name', field: 'orgName',    cellRenderer: (params: any) => {
      const linkElement = document.createElement('a');
      // linkElement.href = '#';
      linkElement.innerText = params.value;
      linkElement.addEventListener('click', (event) => {
        event.preventDefault();
        this.onOrgNameClick(params.data, params.data.id);
      });
      return linkElement;},},
    { headerName: 'Name', field: 'name', cellRenderer:CustomCellComponent},
    { headerName: 'Role', field: 'role' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone Number', field: 'number' }
  ];
  rowData: any[] = [];
  selectedRowData: any = null;
  isEditButtonDisabled = true;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.allData.subscribe((data: any) => {
      this.rowData = data.flatMap((org: any) => 
        org.contact.map((contact: any) => ({ ...contact, orgName: org.orgName, orgId: org.id }))
      );
      console.log(data);
    });
  }

  onOrgNameClick(data: any, id: any) {
    this.router.navigate(['/org/organization'], { state: { data, id } });
  }

  onSelectionChanged(event: any) {
    const selectedRows = event.api.getSelectedRows();
    this.isEditButtonDisabled = selectedRows.length === 0;
    if (selectedRows.length > 0) {
      this.selectedRowData = selectedRows[0]; // Assuming single row selection
    } else {
      this.selectedRowData = null;
    }
  }

  onEditButtonClick() {
    if (this.selectedRowData) {
      // Logic to open the data in the row for editing
      console.log('Edit data:', this.selectedRowData);
      // Example: Navigate to an edit page with the selected row data
      this.router.navigate(['/edit'], { state: { data: this.selectedRowData } });
    }
  }
  
}