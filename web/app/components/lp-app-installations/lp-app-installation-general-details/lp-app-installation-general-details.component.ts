import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import {MatChipInputEvent, MatStepper} from '@angular/material';
import {GeneralDetails} from './GeneralDetails';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {AppInstall} from "../../../shared/models/app-installation/appInstall.model";
import {AppInstallationsService} from "../../../core/services/app-installations.service";
import {map, startWith} from 'rxjs/operators';
import {Subscription,Observable} from "rxjs";
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {inspectNativeElement} from "@angular/platform-browser/src/dom/debug/ng_probe";

@Component({
  selector: 'app-lp-app-installation-general-details',
  templateUrl: './lp-app-installation-general-details.component.html',
  styleUrls: ['./lp-app-installation-general-details.component.scss']
})
export class LpAppInstallationGeneralDetailsComponent implements OnInit, OnDestroy {
  private selectedAppInstallChangeSubscription: Subscription;
  private appInstall: AppInstall;
  validGrandTypes = ['authorization_code', 'client_credentials', 'refresh_token'];
  filteredGrandTypes = [...this.validGrandTypes];
  grandTypesCtrl = new FormControl();
  
  generalDetails: GeneralDetails;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER,COMMA];
  
  @Output() detailsCreated = new EventEmitter<GeneralDetails>();
  @Input() createAppInstall: boolean;
  @ViewChild('grantTypesList') grantTypesList;
  @ViewChild('grantTypesInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(appInstallService: AppInstallationsService) {
    if (!this.createAppInstall) {
      this.selectedAppInstallChangeSubscription = appInstallService.selectedAppInstallChange.subscribe((value) => {
        this.appInstall = value;
        this.generalDetails = {
          clientName: this.appInstall.client_name,
          description: this.appInstall.description,
          scope: this.appInstall.scope,
          grantTypes: this.appInstall.grant_types,
          uri: this.appInstall.logo_uri
        };
      });
    }
  }
  ngOnInit() {
    this.reset();
  }
  ngOnDestroy(): void {
    if (this.selectedAppInstallChangeSubscription) {
      this.selectedAppInstallChangeSubscription.unsubscribe();
    }
  }

  createGeneralDetails() {
    if (this.generalDetails.grantTypes.length === 0) {
      this.grantTypesList.errorState = true;
    } else {
      this.detailsCreated.emit(this.generalDetails);
    }
  }
  addGrantType(type: MatChipInputEvent | any) {
    //if (!this.matAutocomplete.isOpen) {
     /* if (!this.generalDetails.grantTypes) {
        this.generalDetails.grantTypes = [];
      }
      const value = (type.value || '').trim();
      if (value && value !== '') {
        this.generalDetails.grantTypes.push(type.value.trim());
      }
      if (type.input) {
        type.input.value = '';
      }
      if (value && this.validGrandTypes.indexOf(value) === -1) {
        this.grantTypesList.errorState = true;
      } else if (value) {
        this.grantTypesList.errorState = false;
      }*/
    //}
  }
  removeGrantType(type: string) {
    const index = this.generalDetails.grantTypes.indexOf(type);
    let valid = true;
    this.generalDetails.grantTypes.splice(index, 1);
    this.generalDetails.grantTypes.forEach(gt => {
      if ( gt && this.validGrandTypes.indexOf(gt) === -1) {
        valid = false;
      }
    })
    if (!valid || this.generalDetails.grantTypes.length === 0) {
      this.grantTypesList.errorState = true;
    } else {
      this.grantTypesList.errorState = false;
    }
  }
  selectedGrandType(event: MatAutocompleteSelectedEvent) {
    if (!this.generalDetails.grantTypes) {
      this.generalDetails.grantTypes = [];
    }
    const value = event.option.viewValue.trim();
    this.fruitInput.nativeElement.value = '';
    this.generalDetails.grantTypes.push(value);
  
    /*if (value && this.validGrandTypes.indexOf(value) === -1) {
      this.grantTypesList.errorState = true;
    } else if (value) {
      this.grantTypesList.errorState = false;
    }*/
    this.grandTypesCtrl.setValue(null);
  }
  
   filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.validGrandTypes.filter(type => type.toLowerCase().indexOf(filterValue) === 0);
  }
  
  filterGrandType(grandType ){
    console.log(grandType);
    this.filteredGrandTypes =  this.filter(grandType);
  }

  reset(){
    this.generalDetails = {
      clientName: null,
      description: null,
      scope: null,
      grantTypes: [],
      uri: null
    };
  }
}
