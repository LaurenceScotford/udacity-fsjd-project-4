import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  rehydrate(itemName: string): Object | null {
    const itemString = localStorage.getItem(itemName);
    let rehydratedObject: Object | undefined | null;

    if (itemString) {
      try {
        rehydratedObject = JSON.parse(itemString);
      } catch {
        rehydratedObject = null;
      }
    }

    return rehydratedObject ? rehydratedObject : null;
  }

  save(itemName: string, item: Object) {
    localStorage.setItem(itemName, JSON.stringify(item));
  }

  remove(itemName: string) {
    localStorage.removeItem(itemName);
  }

  get(itemName: string, propertyName: string) {
    const item: { [key: string]: any } | null = this.rehydrate(itemName);
    return (item && item[propertyName]) ? item[propertyName] : null;
  }
}
