import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    // service = new DataService();
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update headerSub with provided data', () => {
    const testData = { links: 'example-links', module: 'example-module' };

    // Call setHeader with testData
    service.setHeader(testData);

    // Subscribe to headerSub and check the emitted value
    service.headerSub.subscribe(headerData => {
      expect(headerData).toEqual(testData);
    });
  });
  it('should get table data from localStorage', () => {
    const mockData = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];
    localStorage.setItem('data', JSON.stringify(mockData));

    const result = service.getTableData();

    expect(result).toEqual(mockData);
  });

  it('should add a task to localStorage', () => {
    // const mockData = [{ id: 1, name: 'Task 1' }];
    const newTask = { id: 2, name: 'Task 2' };

    service.addTask(newTask);

    const storedData = JSON.parse(localStorage.getItem('data')as string) ||[]
    // localStorage.push(newTask)
    expect(storedData).toContain(newTask);
  });

 it ('should add a task to localStorage', () => {
    // const mockData = [{ id: 1, name: 'Task 1' }];
    const newTask =[ { id: 2, name: 'Task 2' }];

    
    // const storedData = JSON.parse(localStorage.getItem('data')as string) ||[]
    // localStorage.push(newTask)
    localStorage.removeItem("data")
    service.addTask(newTask);
    // expect(storedData).toContain(newTask);
  });
  
  

  it('should set and get table data using subjects', () => {
    const mockData = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];

    service.setTableData(mockData);

    service.tableData$.subscribe(data => {
      expect(data).toEqual(mockData);
    });
  });

  it('should update contact data using BehaviorSubject', () => {
    const mockData = [{ id: 1, name: 'Contact 1' }, { id: 2, name: 'Contact 2' }];

    service.updateContactData(mockData);

    service.allData.subscribe(data => {
      expect(data).toEqual(mockData);
    });
  });

  it('should get all contact data from BehaviorSubject', () => {
    const mockData = [{ id: 1, name: 'Contact 1' }, { id: 2, name: 'Contact 2' }];

    service.updateContactData(mockData);

    const result = service.getAllContactData();

    expect(result).toEqual(mockData);
  });
});
