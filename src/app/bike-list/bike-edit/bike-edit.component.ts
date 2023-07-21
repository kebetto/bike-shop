import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bike } from '../bike.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
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
      // casting the string to a number, since getBikes expect a number
      this.id = +params['id'];
      this.bike = this.bikeService.getBike(this.id);

      if (this.bike){
        this.bikeForm.setValue(this.bike);
        this.onEditMode = true;
      }
    });
   }

   onCancel(){
    this.router.navigate(['/bikes']);
   }

   onSubmit(){
    this.isSaving = true;

    const bike = new Bike(
      this.name.value,
      this.description.value,
      this.price.value,
      this.quantity.value,
      this.imagePath.value
    );

    if (this.onEditMode) {
      this.bikeService.updateBike(this.id, bike).subscribe(() => this.isSaving = false);
      this.changesSaved = true;
    }
    else {
      const bikes = this.bikeService.getBikes();
      this.bikeService.storeBikes(bikes.concat(bike)).subscribe(() => this.isSaving = false);
    }

      this.router.navigate(['/']);
  }

  canDeactivate(){
    if ((this.bike.name !== this.name.value
      || this.bike.description !== this.description.value
      || this.bike.price !== this.price.value
      || this.bike.imagePath !== this.imagePath.value
      || this.bike.quantity !== this.quantity.value)
      && !this.changesSaved && this.bikeForm.valid){
        return confirm('Do you want to discard the changes?');
    }
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
