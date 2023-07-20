import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bike } from '../bike.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bike-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bike-item.component.html',
  styleUrls: ['./bike-item.component.css']
})
export class BikeItemComponent implements OnInit{

  @Input() bike!: Bike;
  @Input() index!: number;

  ngOnInit(): void {}

}
