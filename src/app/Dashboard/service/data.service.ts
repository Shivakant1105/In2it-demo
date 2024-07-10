import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  organizations = [
    {
      id: 1,
      orgName: 'In2it A',
      type: 'Customer',
      industry: 'Industry A',
      onboarding: 'Onboarding A',
      relatedOrgs: 'Related Orgs A',
      products: 'Products A',
      orgSPOC: 'Org SPOC A',
      email: 'Shivakant@gmail.com',
      phone: '1234567890',
      contact: [
        {
          id: 1,
          name: 'John Doe',
          role: 'OrgSPOC',
          email: 'john.doe@example.com',
          number: '1234567890',
        },
        {
          id: 2,
          name: 'Jane Smith',
          role: 'Tester',
          email: 'jane.smith@example.com',
          number: '9876543210',
        },
        {
          id: 3,
          name: 'Michael Johnson',
          role: 'SiteSPOC',
          email: 'michael.johnson@example.com',
          number: '4567890123',
        },
        {
          id: 4,
          name: 'Emily Davis',
          role: 'Developer',
          email: 'emily.davis@example.com',
          number: '7890123456',
        },
        {
          id: 5,
          name: 'David Brown',
          role: 'SiteSPOC',
          email: 'david.brown@example.com',
          number: '2345678901',
        },
      ],
    },
    {
      id: 2,
      orgName: 'In2it test Org B',
      type: 'Non-Customer',
      industry: 'Industry B',
      onboarding: 'Onboarding B',
      relatedOrgs: 'Related Orgs B',
      products: 'Products B',
      orgSPOC: 'Org SPOC B',
      email: 'email2@example.com',
      phone: '9876543210',
      contact: [
        {
          id: 6,
          name: 'Sophia Wilson',
          role: 'SiteSPOC',
          email: 'sophia.wilson@example.com',
          number: '789-987-6543',
        },
        {
          id: 7,
          name: 'Ethan Garcia',
          role: 'OrgSPOC',
          email: 'ethan.garcia@example.com',
          number: '3456789012',
        },
        {
          id: 8,
          name: 'Isabella Martinez',
          role: 'Tester',
          email: 'isabella.martinez@example.com',
          number: '5678901234',
        },
        {
          id: 9,
          name: 'Mason Anderson',
          role: 'Developer',
          email: 'mason.anderson@example.com',
          number: '9012345678',
        },
      ],
    },
    {
      id: 3,
      orgName: 'In2it test Org C',
      type: 'Customer',
      industry: 'Industry C',
      onboarding: 'Onboarding C',
      relatedOrgs: 'Related Orgs C',
      products: 'Products C',
      orgSPOC: 'Org SPOC C',
      email: 'email3@example.com',
      phone: '4567890123',
      contact: [
        {
          id: 10,
          name: 'Liam Brown',
          role: 'SiteSPOC',
          email: 'liam.brown@example.com',
          number: '1234567890',
        },
        {
          id: 11,
          name: 'Emma Martinez',
          role: 'OrgSPOC',
          email: 'emma.martinez@example.com',
          number: '2345678901',
        },
        {
          id: 12,
          name: 'Noah Smith',
          role: 'Developer',
          email: 'noah.smith@example.com',
          number: '3456789012',
        },
        {
          id: 13,
          name: 'Ava Johnson',
          role: 'Tester',
          email: 'ava.johnson@example.com',
          number: '4567891213',
        },
        {
          id: 14,
          name: 'William Taylor',
          role: 'Designer',
          email: 'william.taylor@example.com',
          number: '567-890-1234',
        },
        {
          id: 15,
          name: 'Olivia Garcia',
          role: 'Developer',
          email: 'olivia.garcia@example.com',
          number: '890o1234567',
        },
        {
          id: 16,
          name: 'Michael Smith',
          role: 'Tester',
          email: 'michael.smith@example.com',
          number: '9012345678',
        },
        {
          id: 17,
          name: 'Amelia Martinez',
          role: 'Designer',
          email: 'amelia.martinez@example.com',
          number: '0123456789',
        },
      ],
    },
    {
      id: 4,
      orgName: 'In2it test Org D',
      type: 'Non-Customer',
      industry: 'Industry D',
      onboarding: 'Onboarding D',
      relatedOrgs: 'Related Orgs D',
      products: 'Products D',
      orgSPOC: 'Org SPOC D',
      email: 'email4@example.com',
      phone: '7890123456',
      contact: [
        {
          id: 18,
          name: 'Sophia Brown',
          role: 'SiteSPOC',
          email: 'sophia.brown@example.com',
          number: '6789012345',
        },
        {
          id: 19,
          name: 'James Wilson',
          role: 'OrgSPOC',
          email: 'james.wilson@example.com',
          number: '7890123456',
        },
      ],
    },
    {
      id: 5,
      orgName: 'In2it test Org E',
      type: 'Non-Customer',
      industry: 'Industry D',
      onboarding: 'Onboarding D',
      contact: [
        {
          id: 20,
          name: 'Sophia Brown',
          role: 'SiteSPOC',
          email: 'sophia.brown@example.com',
          number: '6789012345',
        },
        {
          id: 21,
          name: 'James Wilson',
          role: 'Developer',
          email: 'james.wilson@example.com',
          number: '7890123456',
        },
        {
          id: 22,
          name: 'Olivia Taylor',
          role: 'OrgSPOC',
          email: 'olivia.taylor@example.com',
          number: '67890112345',
        },
      ],
    },
  ];

  headerSub = new BehaviorSubject({ links: '', module: '' });
  constructor() {}
  setHeader(data: { links: string; module: string }) {
    this.headerSub.next(data);
  }

  getTableData() {
    return JSON.parse(localStorage.getItem('data')!);
  }
  addTask(data: any) {
    const localData = JSON.parse(localStorage.getItem('data')!);
    localData.push(data);
    localStorage.setItem('data', JSON.stringify(localData));
  }
  
  deleteTask(id: any) {
    const localData = JSON.parse(localStorage.getItem('data')!);

    const index = localData.findIndex((task: any) => task.id === id);

    if (index !== -1) {
      localData.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(localData));
    }
  }

  public tableDataSubject = new Subject<any>();
  tableData$ = this.tableDataSubject.asObservable();
  setTableData(data: any) {
    this.tableDataSubject.next(data);
  }
  private contactDataSubject = new BehaviorSubject<any>(this.organizations);
  allData = this.contactDataSubject.asObservable();

  updateContactData(data: any[]) {
    this.contactDataSubject.next(data);
  }
  getAllContactData(): any[] {
    return this.contactDataSubject.getValue();
  }
}
