import {LpAppSecretComponent} from './lp-app-secret.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../material.module';

describe('LpAppSecretComponent', () => {
  let component: LpAppSecretComponent;
  let fixture: ComponentFixture<LpAppSecretComponent>;
  const clientSecret = 'secret-abc';
  let secretTextElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [LpAppSecretComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpAppSecretComponent);
    component = fixture.componentInstance;
    component.clientSecret = clientSecret;
    fixture.detectChanges();

    secretTextElement = fixture.nativeElement.querySelector('span');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('Secret should be masked initially', () => {
    expect(component.secretRevealed).toBeFalse();
    expect(secretTextElement.textContent).toEqual(component.maskedSecret);
  });

  it('Button should reveal or mask secret', () => {
    // given the button to reveal/mask the secret
    const button = fixture.nativeElement.querySelector('button');
    // given the secret being masked
    expect(component.secretRevealed).toBeFalse();

    // when the button is clicked
    button.click();
    fixture.detectChanges();

    // then the secret is shown
    expect(component.secretRevealed).toBeTrue();
    expect(secretTextElement.textContent).toEqual(clientSecret);

    // when the button is clicked again
    button.click();
    fixture.detectChanges();

    // then the secret is masked
    expect(component.secretRevealed).toBeFalse();
    expect(secretTextElement.textContent).toEqual(component.maskedSecret);
  });

  it('Should not fail on null client secret', () => {
    // given a null client secret
    component.clientSecret = null;
    // given the button to reveal/mask the secret
    const button = fixture.nativeElement.querySelector('button');

    // when the button is clicked
    button.click();
    fixture.detectChanges();

    // then an empty client secret is shown
    expect(component.secretRevealed).toBeTrue();
    expect(secretTextElement.textContent).toEqual('');
  });

  it('#toggleMask() should toggle #secretRevealed', () => {
    expect(component.secretRevealed).toBeFalse();
    component.toggleMask();
    expect(component.secretRevealed).toBeTrue();
    component.toggleMask();
    expect(component.secretRevealed).toBeFalse();
  });

});
