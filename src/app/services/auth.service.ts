import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { parse } from 'flatted/esm';
const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = '/assets/json/jwt.json';
    private graphData = '/assets/json/data.json';
    constructor(private http: HttpClient) {
    }

    login(): Observable<any> {
        return this.http.get<any>(this.url);
    }

    saveToken(token) {
        localStorage.setItem('access_token', token);
        return;
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    getUserData() {
        return helper.decodeToken(this.getToken());
    }

    clearToken() {
        localStorage.setItem('access_token', null);
    }

    isUserLoggedin() {
        if (this.getToken().split(".").length !== 3) {
            return true;
        }
        return helper.isTokenExpired(this.getToken());
    }

    // these are some graph state related function 

    getStoredData() {
        if (localStorage.getItem("dashboardState")) {
            return parse(localStorage.getItem("dashboardState"));
        } else {
            return [];
        }
    }

    getGraphData(): Observable<any> {
        return this.http.get<any>(this.graphData);
    }

}