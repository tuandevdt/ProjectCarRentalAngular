import { Component, OnInit } from '@angular/core';
import { UserItemComponent } from './user-item/user-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../../../service/users.service'; 

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [UserItemComponent, CommonModule, FormsModule],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent implements OnInit {
  users:any = []
  constructor(private userService: UsersService) {}
  ngOnInit(): void {
    this.userService.getAllData().subscribe((data:any) => {
      this.users = data;
    })
  }
  search(search: NgForm) {
    let q = search.value.q;
    this.userService.getDataQuerry(q).subscribe((data:any) => {
      this.users = data;
    })
  }
}
