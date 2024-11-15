import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { query } from 'express';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  id:any;
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // let q = this.route.snapshot.queryParams["q"];
    // if (q) {
    //   console.log(q);
    // }
    this.router.navigate(["products/" + this.id], {
      queryParams: {productName: 'popular'}
    });
  }
}
