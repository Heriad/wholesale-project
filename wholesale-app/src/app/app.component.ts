import { Component, HostListener } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `menu`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/imgs/sidebar_menu.svg')
    );
  }

  title = 'wholesale-project';

}
