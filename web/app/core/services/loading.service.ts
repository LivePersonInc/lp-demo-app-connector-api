import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoadingService {

  private loadingSubject = new Subject<boolean>();

  constructor() { }

  public isLoadingSubscription(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  public stopLoading() {
    this.loadingSubject.next(false);
  }

  public startLoading() {
    this.loadingSubject.next(true);
  }

}
