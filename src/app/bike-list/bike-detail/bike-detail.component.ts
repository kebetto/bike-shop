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
    this.router.navigate(['/bikes', this.id, 'edit']);
  }
}
