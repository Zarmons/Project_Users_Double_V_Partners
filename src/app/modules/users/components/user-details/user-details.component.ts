import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    const login = this.route.snapshot.paramMap.get('login');
    this.usersService.getDetailUserPromise(login).then((data: any) => {
  this.user = data;
});

  }

  return() {
    this.router.navigate([''])
  }
}
