import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environment/environment'; 
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MasterService {
  private apiUrl: string;
  constructor(private http: HttpClient,private router: Router) {
    const currentPath = this.router.url.replace('/', '');  
    this.apiUrl = `${environment.apiUrl}/${currentPath}`; 
  }
  
  SaveMaster(data :any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/save`, data);
  }

  UpdateMaster(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/save/${data.id}`, data);  
  }

  DeleteMaster(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
 
  GetAllData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  } 
}
