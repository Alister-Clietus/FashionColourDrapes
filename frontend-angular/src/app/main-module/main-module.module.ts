import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { DressComponent } from './dress/dress.component';
import { ColorBoxComponent } from './color-box/color-box.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToneSelectorComponent } from './tone-selector/tone-selector.component';
import { ColorBoxSpringLeftComponent } from './color-box-spring-left/color-box-spring-left.component';
import { ColorBoxSpringRightComponent } from './color-box-spring-right/color-box-spring-right.component';
import { ColorBoxSummerLeftComponent } from './color-box-summer-left/color-box-summer-left.component';
import { ColorBoxSummerRightComponent } from './color-box-summer-right/color-box-summer-right.component';
import { ColorBoxAutumnRightComponent } from './color-box-autumn-right/color-box-autumn-right.component';
import { ColorBoxAutumnLeftComponent } from './color-box-autumn-left/color-box-autumn-left.component';
import { ColorBoxWinterLeftComponent } from './color-box-winter-left/color-box-winter-left.component';
import { ColorBoxWinterRightComponent } from './color-box-winter-right/color-box-winter-right.component';
import { ToneSelectorWinterComponent } from './tone-selector-winter/tone-selector-winter.component';
import { ToneSelectorSpringComponent } from './tone-selector-spring/tone-selector-spring.component';
import { ToneSelectorSummerComponent } from './tone-selector-summer/tone-selector-summer.component';
import { ToneSelectorAutumnComponent } from './tone-selector-autumn/tone-selector-autumn.component';
import { ColorBoxRightComponent } from './color-box-right/color-box-right.component';
import { FormsModule } from '@angular/forms';
import { StickyNoteComponent } from './sticky-note/sticky-note.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [DressComponent, ColorBoxComponent, PhotoUploadComponent, NavbarComponent, ToneSelectorComponent, ColorBoxSpringLeftComponent, ColorBoxSpringRightComponent, ColorBoxSummerLeftComponent, ColorBoxSummerRightComponent, ColorBoxAutumnRightComponent, ColorBoxAutumnLeftComponent, ColorBoxWinterLeftComponent, ColorBoxWinterRightComponent, ToneSelectorWinterComponent, ToneSelectorSpringComponent, ToneSelectorSummerComponent, ToneSelectorAutumnComponent, ColorBoxRightComponent, StickyNoteComponent],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    FormsModule,
    DragDropModule
  ]
})
export class MainModuleModule { }
