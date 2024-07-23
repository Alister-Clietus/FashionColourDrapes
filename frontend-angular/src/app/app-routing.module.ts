import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = 
[
  { path: '', loadChildren: () => import(`./crud-op/crud-op.module`).then(m => m.CrudOpModule) },
  { path: 'main', loadChildren: () => import(`./main-module/main-module.module`).then(m => m.MainModuleModule) },
  { path: 'crud', loadChildren: () => import(`./crud-op/crud-op.module`).then(m => m.CrudOpModule) },
  { path: 'static', loadChildren: () => import(`./static-pages/static-pages.module`).then(m => m.StaticPagesModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
