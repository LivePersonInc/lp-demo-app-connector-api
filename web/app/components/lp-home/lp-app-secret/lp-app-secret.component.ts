import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

/**
 * Component containing a text with the (masked) client secret and a button to reveal it.
 */
@Component({
  selector: 'lp-app-secret',
  templateUrl: './lp-app-secret.component.html',
  styleUrls: ['./lp-app-secret.component.scss']
})
export class LpAppSecretComponent implements AfterViewInit {
  @Input() clientSecret: string;
  @ViewChild('secretText', {static: false}) secretTextElementRef: ElementRef;
  secretRevealed = false;
  blackCircle = '\u25CF';
  maskedSecret = this.blackCircle.repeat(24);

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // In the beginning, all secrets are masked and black circles are shown instead.
    // These black circles have a larger width than the revealed secret text.
    // Besides that, the width of the client secret texts differs, since some characters require more width than others.
    // In the following, we set the width of the secret text element to its initial width (fixed width of black circles).
    // This is done because otherwise the width shrinks if the secret is revealed and the button would then move to the
    // left, resulting in not all buttons in the table being aligned.
    const secretTextElement = this.secretTextElementRef.nativeElement;
    const secretTextInitialWidth = secretTextElement.offsetWidth + 'px';
    this.renderer.setStyle(secretTextElement, 'width', secretTextInitialWidth);
  }

  toggleMask() {
    this.secretRevealed = !this.secretRevealed;
  }
}
