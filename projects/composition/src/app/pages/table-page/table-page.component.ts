import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpsTableColumnSortableDirective, CpsTableComponent } from 'cps-ui-kit';
@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [CommonModule, CpsTableComponent, CpsTableColumnSortableDirective],
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  host: { class: 'composition-page' }
})
export class TablePageComponent {
  headers = ['A', 'B', 'C'];
  data = [
    { a: 'a1', b: 'b1', c: 0.0 },
    { a: 'a2', b: 'b2', c: 0.1 },
    { a: 'a3', b: 'b3', c: 0.2 },
    { a: 'a4', b: 'b4', c: 0.3 },
    { a: 'a5', b: 'b5', c: 0.4 },
    { a: 'a6', b: 'b6', c: 0.5 },
    { a: 'a7', b: 'b7', c: 0.6 },
    { a: 'a8', b: 'b8', c: 0.7 },
    { a: 'a9', b: 'b9', c: 0.8 },
    { a: 'a10', b: 'b10', c: 0.9 },
    { a: 'a11', b: 'b11', c: 1 },
    { a: 'a12', b: 'b12', c: 1.1 },
    { a: 'a13', b: 'b13', c: 1.2 },
    { a: 'a14', b: 'b14', c: 1.3 },
    { a: 'a15', b: 'b15', c: 1.4 },
    { a: 'a16', b: 'b16', c: 1.5 },
    { a: 'a17', b: 'b17', c: 1.6 },
    { a: 'a18', b: 'b18', c: 1.7 },
    { a: 'a19', b: 'b19', c: 1.8 },
    { a: 'a20', b: 'b20', c: 1.9 },
    { a: 'a21', b: 'b21', c: 2.0 },
    { a: 'a22', b: 'b22', c: 2.1 },
    { a: 'a23', b: 'b23', c: 2.2 },
    { a: 'a24', b: 'b24', c: 2.3 },
    { a: 'a25', b: 'b25', c: 2.4 },
    { a: 'a26', b: 'b26', c: 2.5 },
    { a: 'a27', b: 'b27', c: 2.6 },
    { a: 'a28', b: 'b28', c: 2.7 },
    { a: 'a29', b: 'b29', c: 2.8 },
    { a: 'a30', b: 'b30', c: 2.9 },
    { a: 'a31', b: 'b31', c: 3.0 },
    { a: 'a32', b: 'b32', c: 3.1 }
  ];
}