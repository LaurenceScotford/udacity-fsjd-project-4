import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if trying to rehydrate an object that does not exist', () => {
    expect(service.rehydrate('nonexistentItem')).toBeNull();
  });

  it('should return null if trying to rehydrate an object that is not in a json format', () => {
    const itemName = 'testItem';
    localStorage.setItem(itemName, 'This is not json');
    const result = service.rehydrate(itemName);
    localStorage.removeItem(itemName);
    expect(result).toBeNull();
  });

  it('should return the original item if rehydrating an object that is in a json format', () => {
    const itemName = 'testItem';
    const testItem = {
      property1: 'string',
      property2: 99.9,
      property3: {
        propertyName: 'object'
      },
      property4: [
        'this',
        'is',
        'an',
        'array'
      ]
    };
    localStorage.setItem(itemName, JSON.stringify(testItem));
    const result = service.rehydrate(itemName);
    localStorage.removeItem(itemName);
    expect(result).toEqual(testItem);
  });

  it('should correctly save an object in json format', () => {
    const itemName = 'testItem';
    const testItem = {
      property1: 'string',
      property2: 99.9,
      property3: {
        propertyName: 'object'
      },
      property4: [
        'this',
        'is',
        'an',
        'array'
      ]
    };
    service.save(itemName, testItem);
    const item = localStorage.getItem(itemName);
    localStorage.removeItem(itemName);
    expect(item).toBeTruthy();
    if (item) {
      const result = JSON.parse(item);
      expect(result).toEqual(testItem);
    }
  });

  it('should correctly remove an item', () => {
    const itemName = 'testItem';
    localStorage.setItem(itemName, 'This is  a test');
    service.remove(itemName);
    expect(localStorage.getItem(itemName)).toBeNull();
  });

  it('should correctly get correctly get a property', () => {
    const itemName = 'testItem';
    const prop = 99.9;
    const testItem = {
      property1: 'string',
      property2: prop,
      property3: {
        propertyName: 'object'
      },
      property4: [
        'this',
        'is',
        'an',
        'array'
      ]
    };
    localStorage.setItem(itemName, JSON.stringify(testItem));
    const result = service.get(itemName, 'property2');
    localStorage.removeItem(itemName);
    expect(result).toBe(prop);
  });
});
