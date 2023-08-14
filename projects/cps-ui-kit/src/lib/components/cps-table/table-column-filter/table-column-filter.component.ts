import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FilterMatchMode,
  FilterMetadata,
  FilterOperator,
  SelectItem
} from 'primeng/api';
import { Table } from 'primeng/table';
import { CpsButtonComponent } from '../../cps-button/cps-button.component';
import { CpsMenuComponent } from '../../cps-menu/cps-menu.component';
import { CpsIconComponent } from '../../cps-icon/cps-icon.component';
import { CpsSelectComponent } from '../../cps-select/cps-select.component';
import { TableColumnFilterConstraintComponent } from './table-column-filter-constraint/table-column-filter-constraint.component';

@Component({
  selector: 'table-column-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CpsButtonComponent,
    CpsMenuComponent,
    CpsIconComponent,
    CpsSelectComponent,
    TableColumnFilterConstraintComponent
  ],
  templateUrl: './table-column-filter.component.html',
  styleUrls: ['./table-column-filter.component.scss']
})
export class TableColumnFilterComponent {
  @Input() field: string | undefined;
  @Input() type = 'text';
  @Input() showClearButton = true;
  @Input() showApplyButton = true;
  @Input() hideOnClear = false;
  @Input() maxConstraints = 2;
  @Input() categoryOptions: string[] = [];
  @Input() placeholder = '';

  operator: string = FilterOperator.AND;
  showMatchModes = true;
  showOperator = true;

  operatorOptions = [
    { label: 'Match All', value: FilterOperator.AND, info: 'AND' },
    { label: 'Match Any', value: FilterOperator.OR, info: 'OR' }
  ];

  private matchModeLabels = {
    startsWith: 'Starts with',
    contains: 'Contains',
    notContains: 'Does not contain',
    endsWith: 'Ends with',
    equals: 'Equals',
    notEquals: 'Does not equal',
    lt: 'Less than',
    lte: 'Less than or equal to',
    gt: 'Greater than',
    gte: 'Greater than or equal to',
    dateIs: 'Date is',
    dateIsNot: 'Date is not',
    dateBefore: 'Date is before',
    dateAfter: 'Date is after'
  } as { [key: string]: string };

  private filterMatchModeOptions = {
    text: [
      FilterMatchMode.STARTS_WITH,
      FilterMatchMode.CONTAINS,
      FilterMatchMode.NOT_CONTAINS,
      FilterMatchMode.ENDS_WITH,
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS
    ],
    number: [
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
      FilterMatchMode.LESS_THAN,
      FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
      FilterMatchMode.GREATER_THAN,
      FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
    ],
    date: [
      FilterMatchMode.DATE_IS,
      FilterMatchMode.DATE_IS_NOT,
      FilterMatchMode.DATE_BEFORE,
      FilterMatchMode.DATE_AFTER
    ]
  } as { [key: string]: string[] };

  matchModes: SelectItem[] | undefined;

  @ViewChild('columnFilterMenu')
  columnFilterMenu!: CpsMenuComponent;

  // eslint-disable-next-line no-useless-constructor
  constructor(public elementRef: ElementRef, public dt: Table) {}

  ngOnInit() {
    if (!this.dt.filters[<string>this.field]) {
      this.initFieldFilterConstraint();
    }

    if (this.maxConstraints > 1 && this.type !== 'category') {
      this.showApplyButton = true;
    }

    if (this.type === 'boolean') {
      this.showApplyButton = false;
    }

    this.matchModes = this.filterMatchModeOptions[this.type]?.map(
      (key: string) => {
        return { label: this.matchModeLabels[key], value: key };
      }
    );
  }

  initFieldFilterConstraint() {
    const defaultMatchMode = this.getDefaultMatchMode();
    this.dt.filters[<string>this.field] = [
      {
        value: null,
        matchMode: defaultMatchMode,
        operator: this.operator
      }
    ];
  }

  onMenuMatchModeChange(value: any, filterMeta: FilterMetadata) {
    filterMeta.matchMode = value;

    if (!this.showApplyButton) {
      this.dt._filter();
    }
  }

  addConstraint() {
    (<FilterMetadata[]>this.dt.filters[<string>this.field]).push({
      value: null,
      matchMode: this.getDefaultMatchMode(),
      operator: this.getDefaultOperator()
    });
  }

  removeConstraint(filterMeta: FilterMetadata) {
    this.dt.filters[<string>this.field] = (<FilterMetadata[]>(
      this.dt.filters[<string>this.field]
    )).filter((meta) => meta !== filterMeta);
    this.dt._filter();
  }

  onOperatorChange(value: any) {
    (<FilterMetadata[]>this.dt.filters[<string>this.field]).forEach(
      (filterMeta) => {
        filterMeta.operator = value;
        this.operator = value;
      }
    );

    if (!this.showApplyButton) {
      this.dt._filter();
    }
  }

  getDefaultMatchMode(): string {
    if (this.type === 'text') return FilterMatchMode.STARTS_WITH;
    else if (this.type === 'number') return FilterMatchMode.EQUALS;
    else if (this.type === 'date') return FilterMatchMode.DATE_IS;
    else if (this.type === 'category') return FilterMatchMode.IN;
    else return FilterMatchMode.CONTAINS;
  }

  getDefaultOperator(): string | undefined {
    return this.dt.filters
      ? (<FilterMetadata[]>this.dt.filters[<string>(<string>this.field)])[0]
          .operator
      : this.operator;
  }

  get fieldConstraints(): FilterMetadata[] | undefined | null {
    return this.dt.filters
      ? <FilterMetadata[]>this.dt.filters[<string>this.field]
      : null;
  }

  get showRemoveIcon(): boolean {
    return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
  }

  get isShowOperator(): boolean {
    return (
      this.showOperator &&
      this.maxConstraints > 1 &&
      !['boolean', 'category'].includes(this.type)
    );
  }

  get isShowAddConstraint(): boolean | undefined | null {
    return (
      !['boolean', 'category'].includes(this.type) &&
      this.fieldConstraints &&
      this.fieldConstraints.length < this.maxConstraints
    );
  }

  hasFilter(): boolean {
    const fieldFilter = this.dt.filters[<string>this.field];
    if (fieldFilter) {
      if (Array.isArray(fieldFilter))
        return !this.dt.isFilterBlank((<FilterMetadata[]>fieldFilter)[0].value);
      else return !this.dt.isFilterBlank(fieldFilter.value);
    }

    return false;
  }

  hide() {
    this.columnFilterMenu.hide();
  }

  clearFilter() {
    this.initFieldFilterConstraint();
    this.dt._filter();
    if (this.hideOnClear) this.hide();
  }

  applyFilter() {
    this.dt._filter();
    this.hide();
  }

  onMenuShown() {
    const parent = this.elementRef?.nativeElement?.parentElement;
    const className = 'cps-table-col-filter-menu-open';
    parent.classList.add(className);
  }

  onMenuHidden() {
    const parent = this.elementRef?.nativeElement?.parentElement;
    const className = 'cps-table-col-filter-menu-open';
    parent.classList.remove(className);
  }
}