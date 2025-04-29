import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseService<T> {
  constructor(protected http: HttpClient, protected apiUrl: string) {}

  protected get headers() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, data, { headers: this.headers });
  }

  update(id: string | number, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, data, { headers: this.headers });
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
