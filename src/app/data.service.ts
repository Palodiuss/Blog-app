import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  accessToken = 'access-token=0rZaE1Vlmzzr81-Z2jaJvTcCwXkHPnVekuiW';
  url = `https://gorest.co.in/public-api/`;


 headers = new HttpHeaders({
  'Authorization': 'Bearer 0rZaE1Vlmzzr81-Z2jaJvTcCwXkHPnVekuiW'
});

  

 

  constructor(private http: HttpClient) { }

  getUsers(page: number = 1 ) {
   
    return this.http.get(`${this.url}users?page=${page}`, {headers: this.headers});
  }

  getUser(id: number) {
    return this.http.get(`${this.url}users/${id}?`, {headers: this.headers});
  }

  getUsersByName(name: string) {
    return this.http.get(`${this.url}users?first_name=${name}`, {headers: this.headers});
  }

  postUser(userData) {
    return this.http.post(`${this.url}users`, userData, {headers: this.headers});
  }

  editUser(id, userData) {
    console.log(userData);
    return this.http.patch(`${this.url}users/${id}`, userData, {headers: this.headers});
  }

  deleteUser(id) {
    return this.http.delete(`${this.url}users/${id}`, {headers: this.headers});
  }

  getPost (id: number) {
    return this.http.get(`${this.url}posts/${id}?`, {headers: this.headers});
  }

  getPosts(page: number) {
    return this.http.get(`${this.url}posts?page=${page}`, {headers: this.headers});
  }

  getUserPosts(userID: number) {
    return this.http.get(`${this.url}posts?user_id=${userID}`, {headers: this.headers});
  }

  postPost(data, id) {
    let post = {
      'user_id': id,
      'title': data.title,
      'body': data.body

    }
    return this.http.post(`${this.url}posts`, post, {headers: this.headers});
  }

  getPostComments(id: number) {
    return this.http.get(`${this.url}comments?post_id=${id}`, {headers: this.headers});
  }

  postComment(data, id) {
    let comment = {
      'post_id': id,
      'name': data.name,
      'email':data.email,
      'body': data.body
    }
    return this.http.post(`${this.url}comments`, comment, {headers: this.headers});
  }
}

