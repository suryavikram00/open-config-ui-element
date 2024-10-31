import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigDataService {
  
  // Observable to emit changes in header data
  private configDataSubject = new BehaviorSubject<any[]>([]);

  // Observable that components can subscribe to
  configData$ = this.configDataSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.apiService.httpGet('/config').subscribe((res: any) => {
      const data = res.objectList.map((item: any) => ({ name: item.name, value: item.value }));
      this.configDataSubject.next(data);
    });
  }

  // Method to update header data in memory
  // Method to update header data in memory
  updateConfigData(updatedData: Partial<{ name: string; value: string }>) {
    this.apiService.httpPut('/config', updatedData).subscribe((res: any) => {
      const currentData = this.configDataSubject.getValue();
      const updatedItem = { name: res.object.name, value: res.object.value };
      const updatedDataArray = currentData.map(item => 
        item.name === updatedItem.name ? updatedItem : item
      );
      this.configDataSubject.next(updatedDataArray);
    });
  }
}
