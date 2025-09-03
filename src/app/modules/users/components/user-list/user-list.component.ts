import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @ViewChild('alert') alertComponent!: AlertComponent;

  public listUsersForm!: FormGroup;
  public dataUsers: any;
  public viewData: boolean = false;
  public errorMessage: string = '';
  public basicData: any;
  public basicOptions: any;
  public savedSearch: any;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listUsersForm = new FormGroup({
      searchUsers: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(4)],
      }),
    });
    this.savedSearch = this.usersService.getSearchTerm();

    console.log(this.savedSearch);
    if (this.savedSearch != '') {
      this.search();
    }
  }

  search() {
    let query: string = this.listUsersForm.value.searchUsers || '';
    if (query == '') {
      query = this.savedSearch;
      this.usersService.clear();
    }
    if (query.length >= 4 || query === 'doublevpartners') {
      this.usersService.getListUsers(query).subscribe({
        next: (users: any) => {
          const topUsers = users.items.slice(0, 10);
          this.usersService.saveSearchTerm(query);
          const requests = topUsers.map((u: any) =>
            this.usersService.getDetailUserPromise(u.login)
          );
          this.alertComponent.showToastSuccess(
            'Usuarios cargados correctamente'
          );
          forkJoin<any[]>(requests).subscribe((userDetails) => {
            this.dataUsers = userDetails;
            this.updateChart();
            this.viewData = true;
          });
        },
        error: () => {
          this.alertComponent.showToastError('Error al consultar usuarios');
        },
      });
    } else {
      this.alertComponent.showToastError(
        'La búsqueda debe tener mínimo 4 caracteres'
      );
    }
  }

  updateChart() {
    this.basicData = {
      labels: this.dataUsers.map((u: any) => u.login),
      datasets: [
        {
          label: 'Seguidores',
          backgroundColor: '#91c9a6',
          data: this.dataUsers.map((u: any) => u.followers ?? 0),
        },
      ],
    };
  }

  linkUsers(login: string) {
    const ruta = 'users/' + login;
    console.log(ruta);
  }
}
