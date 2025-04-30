import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseService {
  constructor(protected http: HttpClient, protected apiUrl: string) {}

  protected get headers() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getAll() {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  getById(id: string | number)  {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data, { headers: this.headers });
  }

  update(id: string | number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.headers });
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
