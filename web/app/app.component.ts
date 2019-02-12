import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isLoading = false;
  private subscription: Subscription;

  constructor(private loadingService: LoadingService) {

  }

  ngOnInit() {
    this.subscription = this.loadingService.isLoadingSubscription().subscribe( isLoading => {
      this.isLoading = isLoading;
    }, error => {
      console.log('SUBSCRIPTION ERROR: ' + error);
    });
  }


}
