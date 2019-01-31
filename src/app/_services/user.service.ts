import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { User } from './../_models/user';

const url = environment.apiAuthentication;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${url}/users`);
    }

    getById(id: number) {
        return this.http.get(`${url}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${url}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${url}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${url}/users/${id}`);
    }
}
