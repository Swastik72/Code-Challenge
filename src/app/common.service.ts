import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })

export class CommonService {
    constructor(private http: HttpClient) { }
    getEnrollees() {
        return this.http.get('http://localhost:8080/enrollees');
        
    }
    updateEnrolleeDetails(id:string, updatedDetails:object){
        return this.http.put( 'http://localhost:8080/enrollees/'+ id, updatedDetails);
    }
}