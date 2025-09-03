import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { AppDomainConstant } from 'src/app/shared/apis/app-domain.constant';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly SEARCH_KEY = 'lastSearch';

  constructor(private http: HttpClient) {}

  public getListUsers(user: any) {
    return this.http.get<any>(
      `${AppDomainConstant.URL_GATEWAY}search/users?q=${user}`
    );
  }

  public async getDetailUserPromise(login: any): Promise<any> {
    return await firstValueFrom(
      this.http.get<any>(`${AppDomainConstant.URL_GATEWAY}users/${login}`)
    );
  }

  saveSearchTerm(term: string): void {
    localStorage.setItem(this.SEARCH_KEY, term);
  }

   getSearchTerm(): string | null {
    return localStorage.getItem(this.SEARCH_KEY);
  }

  clear(): void {
    localStorage.removeItem(this.SEARCH_KEY);
  }
}
