// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class SharedModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../components/form-field/form-field/form-field.component';
import { CardComponent } from '../components/card/card/card.component';
import { ConfirmDialogComponent } from '../components/dialog/confirm-dialog/confirm-dialog.component';
import { DonationTileComponent } from '../components/donation-tile/donation-tile/donation-tile.component';
 

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    // FormFieldComponent,
    // CardComponent,
    // ConfirmDialogComponent,
    // DonationTileComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    // Import standalone components
    FormFieldComponent,
    CardComponent,
    ConfirmDialogComponent,
    DonationTileComponent,
  ],
  exports: [
    FormFieldComponent,
    CardComponent,
    ConfirmDialogComponent,
    DonationTileComponent
  ]
})
export class SharedModule {}
