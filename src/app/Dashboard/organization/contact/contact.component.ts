import { Component, OnInit, PipeTransform } from '@angular/core';
import { DataService } from '../../service/data.service';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';

import { Observable, map, of, startWith } from 'rxjs';
import { DecimalPipe } from '@angular/common';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [DecimalPipe],
})
export class ContactComponent implements OnInit{
  organizations: any;
  // showTable: any;
  contactData!: any[];
  showTable: boolean = false;
  addData!: boolean;

  showSideCard: boolean = false;
  selectedRowData: any;
  totalContacts!: number;
  form!: FormGroup;
  submittedData: any;
  // selectedOrgName: string = '';
  activeOrganization: string = '';
  cardData!: any;
  showViewDeatils: boolean = false;
  showEditForm: boolean = false;

  formHeading!: string;
  indexData: any;
  contacts: any;
  checkedCount: number = 0;
  checkboxarray: any = [];
  checkboxdata: Array<any> = [];
  activeTab: any;

  contactData$: Observable<any>; 

  filter = new FormControl('');
  constructor(
    public dataService: DataService,

    private fb: FormBuilder,
    pipe: DecimalPipe
  ) {
    this.contactData$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe))
    );
    console.log("observable", this.contactData$);
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),

      organization: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // phone: [null, [Validators.required,Validators.maxLength(10) ]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.maxLength(10),
        ],
      ],
      another: this.fb.array([
        // this.createPhoneFormGroup()
      ]),
      role: ['', Validators.required],
      additionalRoles: ['', Validators.required],
      remark: [''],
    });

    this.dataService.allData.subscribe((data: any) => {
      this.contactData = data;
      this.organizations = data;
      console.log('service data', this.contactData);
    });

    this.getAllData();
  }
  search(text: string, _pipe: PipeTransform) {
    return this.contactData
      .map((country: any) => {
        return {
          ...country,
          contact: country.contact.filter((contact: any) => {
            const term = text.toLowerCase();
            return (
              (contact.name && contact.name.toLowerCase().includes(term)) ||
              (contact.role && contact.role.toLowerCase().includes(term)) ||
              (contact.email && contact.email.toLowerCase().includes(term)) ||
              (contact.number && contact.number.toLowerCase().includes(term))
            );
          }),
        };
      })
      .filter((country: any) => country.contact.length > 0);
  }

  getAllData() {
    let totalCount = 0;
    this.contactData.forEach((org: any) => {
      if (org.contact) {
        totalCount += org.contact.length;
      }
    });
    // Set totalContacts property to be accessible in the template
    this.totalContacts = totalCount;
  this.contactData$=of(this.contactData)

  }
  
// getAllData() {
//   // this.contactData$ = of(this.organizations); // Assuming contactData$ is an Observable
//   let totalCount = 0;

//   this.organizations.forEach((org: any) => {
//     if (org.contact) {
//       totalCount += org.contact.length;
//     }
//   });
//   this.totalContacts = totalCount;
// }

  // getAllData() {
  //   this.contactData = this.organizations;
  //   let totalCount = 0;

  //   this.contactData.forEach((org: any) => {
  //     if (org.contact) {
  //       totalCount += org.contact.length;
  //     }
  //   });
  //   this.totalContacts = totalCount;
  //   // console.log('gett all data', this.contactData);
  // }
  filteredOrg:any
filterContact(orgName: string) {
  this.showTable = true;
   this.filteredOrg = this.contactData.find(
    (org: any) => org.organization === orgName
  );
  if (this.filteredOrg) {
    this.contactData$ = of([this.filteredOrg]); // Assuming contactData$ is an Observable
    console.log('Filtered organization data:', this.filteredOrg);
  } else {
    console.log(`Organization "${orgName}" not found.`);
  }
  this.activeOrganization = orgName;
}


  createFormGroup(): FormGroup {
    return this.fb.group({
      type: [''],
      // number: [''],
    });
  }

  get mediumFormArray(): FormArray {
    return this.form.get('another') as FormArray;
  }

  addMedium(): void {
    this.mediumFormArray.push(this.createFormGroup());
  }
  getTypeControl(index: number): FormControl {
    const control = this.mediumFormArray.at(index).get('type');
    return control as FormControl;
  }
  removePhone(index: number): void {
    this.mediumFormArray.removeAt(index);
  }
  isActive(orgName: string) {
    orgName === this.activeOrganization;
    this.form.patchValue({
      // organization: data.activeOrganization,
    });
    //  console.log("active org data", this.activeOrganization);
  }

  onDelete() {
    const msg = confirm('Are you sure you. want to delete this item?');
    if (msg) {
    }
  }
  addContact() {
    this.formHeading = 'ADD CONTACT';
    this.form.enable();
    this.addData = true;
    this.showViewDeatils = false;
    this.showEditForm = true;

    // this.orgName === this.activeOrganization;
    this.form.reset();
  }
  selectedContactIndex: number = -1;
  viewData: any;

  openForm(data: any, index: number) {
    // this.formHeading = 'EDIT DETAILS';
    this.addData = true;
    this.showViewDeatils = true;
    this.showEditForm = false;
    this.addData = true;
    // this.showEditForm = true;
    this.viewData = data;
    console.log('vew data', this.viewData);
    this.selectedContactIndex = index;
    console.log("ooepn form,m dadtd", data);
    
    const contact = data.contact[index];
console.log("sdfhgsalgdhf", this.selectedContactIndex);

    this.form.patchValue({
      name: {
        firstName: contact.name.split(' ')[0],
        lastName: contact.name.split(' ')[1],
      },

      organization: data.organization,

      email: contact.email,
      phone: contact.number,
      role: contact.role,
    });
    const organizationControl = this.form.get('organization');

    if (organizationControl) {
      organizationControl.disable();
    }
    console.log('table data edit', this.form);
  }

  onSubmit(): void {
    // if (this.form.valid) {
      this.submittedData = this.form.value;
    // }
    //  else {
    //   Object.keys(this.form.controls).forEach((field) => {
    //     const control = this.form.get(field);
    //     if (control) {
    //       control.markAsTouched({ onlySelf: true });
    //     }
    //   });
    // }

   
    console.log('Form data:', this.submittedData);
this.contactData$=of(this.contactData)
   
    const abcOrganization = this.contactData.find(
            (org: any) => org.organization === this.submittedData.organization
          );
     
          if (abcOrganization) {
         
            abcOrganization.contact.push(this.submittedData);
          }
       
    
  }

  viewDetails() {
    this.addData = true;
    this.showViewDeatils = true;
    this.showEditForm = false;
    for (let i = 0; i < this.checkboxarray.length; i++) {
      this.checkboxarray[i].checked = false;
    }
    this.checkedCount = 0;
    this.checkboxarray = [];

    console.log('dsasda', this.checkboxarray);
  }

  editContact() {
    this.formHeading = 'EDIT DETAILS';
    this.addData = true;
    this.showViewDeatils = false;
    this.showEditForm = true;

  }
  editContact1(checkBox: any) {
    this.formHeading = 'EDIT DETAILS';
    this.addData = true;
    this.showViewDeatils = false;
    this.showEditForm = true;
    // this.contacts = checkBox;
    // this.selectedContactIndex = index;
    console.log("checkbox", checkBox);
    
    const contacts = checkBox;
    console.log("kjhsdghfa", contacts);
    
    this.form.patchValue({
      name: {
        firstName: contacts.name.split(' ')[0],
        lastName: contacts.name.split(' ')[1],
      },

      organization:contacts.org,
      email:contacts.email,
      phone: contacts.number,
      role: contacts.role,
    });

    const organizationControl = this.form.get('organization');
    const roleControl = this.form.get('role');
    if (organizationControl &&roleControl) {
      organizationControl.disable();
      roleControl.disable();
    }
    console.log('Editing contact:', this.indexData);

    console.log('Editing contact:', this.indexData.email);
    console.log(this.checkboxdata);
  }

  editData(form: FormGroup) {
    // let  name=form.get('firstname')?.value
    // console.log();
    this.viewData.contact[this.selectedContactIndex].name =
      form.get('name.firstName')?.value + form.get('name.lastName')?.value;
    this.viewData.contact[this.selectedContactIndex].email =
      form.get('email')?.value;
    this.viewData.contact[this.selectedContactIndex].number =
      form.get('phone')?.value;
    this.viewData.contact[this.selectedContactIndex].role =
      form.get('role')?.value;
  }

//   checkBox(contact: any, data: any, index: number, event: any) {
//     console.log('dfgsg6853g', contact);

//     if (event.target.checked) {
//       this.addData = false;
//       this.showViewDeatils = false;
//       this.indexData = data;
//       this.contacts = contact;
//       this.viewData=data
// // this.selectAll=true
//       this.contacts.org = this.indexData.organization;
//       console.log('all data INDECCcheck', this.contacts.org);
//       // console.log('All toggle data:', contact);

//       this.checkedCount = this.contactData.reduce((count, data) => {
//         return count + data.contact.filter((c: any) => c.checked).length;
        
//       }, 0);

//       // console.log('checked count', this.checkedCount);
//       this.checkboxarray.push(contact);
//       // this.checkboxarray.push(this.indexData)
//       // console.log('index data:', this.indexData);

//       // console.log('ARRAY DTAA', this.checkboxarray);
//     } else {
//   this.selectAll = false;

//       this.checkedCount = this.checkedCount - 1;
//       // console.log('unchekchecked count', this.checkedCount);
//       const indexArray = this.checkboxarray.indexOf(contact);

//       if (indexArray !== -1) {
//         this.checkboxarray.splice(indexArray, 1);

//         // console.log('unchecked array', this.checkboxarray);
//         this.contacts = this.checkboxarray[0];
//       }
//     }
//     this.selectedContactIndex = index;
  
//     // this.indexData=this.checkboxarray[0]
//   }
  handleEditClick() {
    this.contacts = false;
    if (this.checkedCount !== 1) {
      
      // alert("Cannot edit. Please select exactly one contact.")
      console.log('Cannot edit. Please select exactly one contact.');
    } else {
      
      this.editContact1(this.checkboxarray[0]);
    }
  }

// deleteContact() {
  
//   this.checkboxarray.forEach((checkbox:any) => {
//     this.contactData = this.contactData.map(data => ({
//       ...data,
//       contact: data.contact.filter((contact:any) => contact.id !== checkbox.id)
//     }));
//   });
//   this.getAllData()
  
//   // this.contactData$ = of(this.contactData); // or use your method to update observable
// }
deleteContact() {
  this.checkboxarray.forEach((checkbox: any) => {
    // Remove the deleted contacts from the filtered data
    // this.filteredOrg = this.filteredOrg.map((data:any) => ({
    //   ...data,
    //   contact: data.contact.filter((contact: any) => contact.id !== checkbox.id)
    // }));
    // Also remove the deleted contacts from the original data
    this.contactData = this.contactData.map(data => ({
      ...data,
      contact: data.contact.filter((contact: any) => contact.id !== checkbox.id)
    }));
  });
  this.getAllData();
  this.selectAll=false // Update the table with the modified data
}

  selectAll = false;

 
  // selectAllChanged(event: any) {
  //   console.log('select all', this.contactData);
  //   if (event.target.checked) {
  //     this.contactData.forEach((data) => {  
  //       data.contact.forEach((contact: any) => {
  //         this.checkboxarray.push(contact);
  //         contact.checked = this.selectAll;
  //       });
  //     });
  //   } else {
  //     this.contactData.forEach((data) => {
  //       data.contact.forEach((contact: any) => {
  //         contact.checked = this.selectAll;
  //       });
  //     });
  //     this.checkboxarray = []; // Clear checkboxarray when unselecting all
  //   }
  
  //   // Update selectAll based on the current state of checkboxes
  //   this.selectAll = this.isAllChecked();
  // }
  selectAllChanged(event: any) {
    if (event.target.checked) {

      const contacts = this.filteredOrg ? this.filteredOrg.contact : this.contactData.flatMap(data => data.contact);
      contacts.forEach((contact: any) => {
        this.checkboxarray.push(contact);
        
        contact.checked = this.selectAll;
      });
    } else {
     
      const contacts = this.filteredOrg ? this.filteredOrg.contact : this.contactData.flatMap(data => data.contact);
      contacts.forEach((contact: any) => {
        contact.checked = this.selectAll;
      });
      this.checkboxarray = []; // Clear checkboxarray when unselecting all
    }
  }
  checkBox(contact: any, data: any, index: number, event: any) {
    console.log('dfgsg6853g', contact);
  
    if (event.target.checked) {
      this.addData = false;
      this.showViewDeatils = false;
      this.indexData = data;
      this.contacts = contact;
      this.viewData = data;
  
      this.contacts.org = this.indexData.organization;
      console.log('all data INDECCcheck', this.contacts.org);
  
      this.checkedCount = this.contactData.reduce((count, data) => {
        return count + data.contact.filter((c: any) => c.checked).length;
      }, 0);
  
      this.checkboxarray.push(contact);
    } else {
      this.checkedCount = this.checkedCount - 1;
      const indexArray = this.checkboxarray.indexOf(contact);
      if (indexArray !== -1) {
        this.checkboxarray.splice(indexArray, 1);
        this.contacts = this.checkboxarray[0];
      }
    }
  
    this.selectedContactIndex = index;
  
    // Update selectAll based on the current state of checkboxes
    this.selectAll = this.isAllChecked();
  }
  
  isAllChecked() {
    let totalChecked = 0;
    let totalContacts = 0;
  
    this.contactData.forEach((data) => {
      data.contact.forEach((contact: any) => {
        totalContacts++;
        if (contact.checked) {
          totalChecked++;
        }
      });
    });
  
    return totalChecked === totalContacts;
  }
  
  onClear() {
    this.form.reset();
    this.form.patchValue({
      organization: this.indexData.organization,
    });
    console.log('sjsdhkasda', this.organizations);
  }
  cancel() {
    this.form.reset();
    this.selectedContactIndex = -1; // Reset selected index when cancelling

    this.addData = false;
  }
  close() {
    this.addData = false;
    // this.addCard = false;
  }
  ngOnChanges() {
    console.log('Changes detected in input properties. Resetting values.');
  }
}
