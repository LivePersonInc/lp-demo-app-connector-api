import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../shared/animations/lp-animations';
import {ActivatedRoute} from '@angular/router';
import {InstallationService} from '../../core/services/installation.service';

@Component({
  selector: 'lp-demo',
  templateUrl: './lp-demo.component.html',
  styleUrls: ['./lp-demo.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LpDemoComponent implements OnInit, OnDestroy {
  
  constructor(private route: ActivatedRoute, private installationService: InstallationService) {
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('appId')) {
        console.log('ROUTER ');
        const appInstallation = this.installationService.getAppByIdFromAppList(params.get('appId'));
        if (appInstallation) {
          this.installationService.selectedApp = appInstallation;
          this.installationService.restoreState();
        } else {
          alert('ERROR App NOT FOUND');
          // TODO: handle this  properly
        }
      }
    });
  }
  
  ngOnDestroy() {
  
  }
}
