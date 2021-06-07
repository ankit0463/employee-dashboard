import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { LoginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { loginFeatureKey, reducer} from './store/reducers/login.reducer';
import { LoginEffects} from './store/effects/login.effects';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(loginFeatureKey, reducer),
    EffectsModule.forFeature([LoginEffects]),
    LoginRoutes,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
