import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuard } from './_helper/auth.gaurd';


const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard], 
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('./modules/product/product.module').then(m => m.ProductModule)
      }
    ]
  },
  {
    path: '',
        loadChildren: () =>
          import('./modules/user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
