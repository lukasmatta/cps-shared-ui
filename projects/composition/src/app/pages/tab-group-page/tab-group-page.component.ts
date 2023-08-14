import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CpsIconComponent,
  CpsTabGroupComponent,
  CpsTabComponent,
  TabChangeEvent
} from 'cps-ui-kit';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CpsIconComponent,
    CpsTabGroupComponent,
    CpsTabComponent
  ],
  selector: 'app-tab-group-page',
  templateUrl: './tab-group-page.component.html',
  styleUrls: ['./tab-group-page.component.scss'],
  host: { class: 'composition-page' }
})
export class TabGroupPageComponent {
  selectedTabIndex = 0;

  changeTab({ currentTabIndex }: TabChangeEvent) {
    this.selectedTabIndex = currentTabIndex;
    console.log('Tab changed to: ' + currentTabIndex);
  }
}