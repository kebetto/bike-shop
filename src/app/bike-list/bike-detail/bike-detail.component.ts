import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Bike } from '../bike.model';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-bike-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css']
})
export class BikeDetailComponent implements OnInit {

  id!: number;
  bike!: Bike;

  constructor(private route: ActivatedRoute, private bikeService: BikeService, private router: Router){}

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          // cast string to number
          this.id = +params['id'];
          // call the service the get the bike for the given id
          this.bike = this.bikeService.getBike(this.id);
        }
      );
  }

  onEdit(){
    // Load BikeEditComponent
    this.router.navigate(['/bikes', this.id, 'edit']);
  }

  onDelete(){
    // Display confirmation popup, to prevent user from inadvertently deleting a bike
    const proceed = confirm("Do you want to permanently delete this item");
    if (proceed) {
      this.bikeService.deleteBike(this.id);
      this.router.navigate(['/bikes']);
    }
    else return;
  }
}
