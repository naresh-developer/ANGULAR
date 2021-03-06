import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http: HttpClient) { }

productList(params){
    return this.http.get(`${environment.apiUrl}/auth/productList`,{params : {name : params}})
}

createProduct(dataPost){
  return this.http.post(`${environment.apiUrl}/auth/productCreate`, dataPost)
  
}

}
