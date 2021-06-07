import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { EmployeeComponent } from './employee.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { employeeFeatureKey, reducer} from './store/reducers/employee.reducer';
import { EmployeeEffects } from './store/effects/employee.effects';
import { EmployeeRoutes } from './employee.routing';
import { EmployeeResultsComponent } from './employee-results/employee-results.component';


@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(employeeFeatureKey, reducer),
    EffectsModule.forFeature([EmployeeEffects]),
    EmployeeRoutes,
  ],
  declarations: [EmployeeComponent, SearchEmployeeComponent, EmployeeResultsComponent],
})
export class EmployeeModule {}
