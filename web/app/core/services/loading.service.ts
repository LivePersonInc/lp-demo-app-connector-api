import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class LoadingService {
  private isServiceActive: boolean;
  private loadingSubject = new Subject<boolean>();
  
  constructor() {
    this.activateLoadingService();
  }
  
  public isLoadingSubscription(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
  
  public stopLoading() {
    this.loadingSubject.next(false);
  }
  
  public startLoading() {
    if (this.isServiceActive) {
      this.loadingSubject.next(true);
    }
  }
  
  public activateLoadingService() {
    this.isServiceActive = true;
  }
  
  public deactivateLoadingService() {
    this.isServiceActive = false;
  }
  
}
