import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bike } from '../bike.model';
import { BikeService } from 'src/app/services/bike.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoadingSpinnerComponent } from 'src/app/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-bike-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './bike-edit.component.html',
  styleUrls: ['./bike-edit.component.css']
})
export class BikeEditComponent implements OnInit{
  bikeForm!: FormGroup;
  bike!: Bike;
  id! : number;
  onEditMode = false;
  isSaving = false;
  changesSaved = false;

  constructor(private bikeService: BikeService, private router: Router, private route: ActivatedRoute){}

   ngOnInit(): void {
    this.bikeForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      imagePath: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
      quantity: new FormControl<number>(0, [Validators.required, Validators.pattern("^[0-9]*$")]),
      price: new FormControl<number>(0, [Validators.required, Validators.pattern("^[0-9.]*$")])
    });

    this.route.params.subscribe((params: Params) => {
      // casting the string to a number, since the 'getBikes' method expects a number
      this.id = +params['id'];
      // get the bike to load by its index
      this.bike = this.bikeService.getBike(this.id);
      /* Since this same component is used for editing or adding a new bike, this child route may not contain the 'id' param,
         but only the 'new' route param, when it gets loaded from the 'BikeListComponent'.
         The form gets prefilled with the Bike data only in edit mode; it would remain empty otherwise.
      */
      if (this.bike){
        // Fill the form with the Bike data
        this.bikeForm.setValue(this.bike);
        this.onEditMode = true;
      }
    });
   }

   onCancel(){
    // Cancel editing and navigate back to 'BikeListComponent' component.
    this.router.navigate(['/bikes']);
   }

   onSubmit(){
    this.isSaving = true;

    // create a new Bike object from form data
    const bike = new Bike(
      this.name.value,
      this.description.value,
      this.price.value,
      this.quantity.value,
      this.imagePath.value
    );

    // update bike
    if (this.onEditMode) {
      this.bikeService.updateBike(this.id, bike).subscribe(() => this.isSaving = false);
      this.changesSaved = true;
    }
    // add bike
    else {
      this.bikeService.addBike(bike).subscribe(() => this.isSaving = false);
      this.changesSaved = true;
    }

    this.router.navigate(['/bikes']);
  }

  canDeactivate(){
    // Display confirmation popup, when navigating away with unsaved changes on edit mode
    if ((this.bike.name !== this.name.value
      || this.bike.description !== this.description.value
      || this.bike.price !== this.price.value
      || this.bike.imagePath !== this.imagePath.value
      || this.bike.quantity !== this.quantity.value)
      && !this.changesSaved && this.bikeForm.valid){
        return confirm('Do you want to discard the changes?');
    }
    // proceed to route
    else return true;
  }

  get name() {
    return this.bikeForm.get('name')!;
  }

  get description() {
    return this.bikeForm.get('description')!;
  }

  get quantity() {
    return this.bikeForm.get('quantity')!;
  }

  get price() {
    return this.bikeForm.get('price')!;
  }

  get imagePath() {
    return this.bikeForm.get('imagePath')!;
  }

}
