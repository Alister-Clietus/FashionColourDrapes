import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToneSelectorComponent } from './tone-selector/tone-selector.component';
import { DressComponent } from './dress/dress.component';
import { ColorBoxSummerLeftComponent } from './color-box-summer-left/color-box-summer-left.component';
import { ColorBoxSummerRightComponent } from './color-box-summer-right/color-box-summer-right.component';
import { ColorBoxSpringLeftComponent } from './color-box-spring-left/color-box-spring-left.component';
import { ColorBoxSpringRightComponent } from './color-box-spring-right/color-box-spring-right.component';
import { ToneSelectorWinterComponent } from './tone-selector-winter/tone-selector-winter.component';
import { ToneSelectorSummerComponent } from './tone-selector-summer/tone-selector-summer.component';
import { ToneSelectorSpringComponent } from './tone-selector-spring/tone-selector-spring.component';
import { ToneSelectorAutumnComponent } from './tone-selector-autumn/tone-selector-autumn.component';


const routes: Routes = 
[
  { path: 'toneselector', component:ToneSelectorComponent},
  { path: 'winter', component:ToneSelectorWinterComponent},
  { path: 'summer', component:ToneSelectorSummerComponent},
  { path: 'spring', component:ToneSelectorSpringComponent},
  { path: 'autumn', component:ToneSelectorAutumnComponent},
  { path: 'dress', component:DressComponent},
  { path: 'colorboxspringleft', component:ColorBoxSpringLeftComponent},
  { path: 'colorboxspringright', component:ColorBoxSpringRightComponent},
  { path: 'colorboxsummerleft', component:ColorBoxSummerLeftComponent},
  { path: 'colorboxsummerright', component:ColorBoxSummerRightComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
