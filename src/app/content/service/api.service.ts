import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// import { ToastrService } from './toastr.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiEndPoint = 'http://localhost:8084/v1';

    constructor(private http: HttpClient
        // , private toastr: ToastrService
    ) {
    }


    httpPost(url: any, reqData: any) {
        return this.http.post(`${this.apiEndPoint}${url}`, reqData)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    if (res.status == 'FAILURE') {
                        console.log('error', res.message);
                        // this.toastr.open('error', `Failure`, res.message);
                        // return throwError(res.status)
                    } else if (res.status == 'SUCCESS'){
                        console.log('success', res.message);
                        // this.toastr.open('success', `SUCCESS`, res.message);
                    }
                    return resData;
                }),
                catchError((error: any) => {
                    
                    // this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    console.log('error', error.error.error);
                    return throwError(error)
                })
            )
    };

    httpPut(url: any, reqData: any) {
        return this.http.put(`${this.apiEndPoint}${url}`, reqData)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    if (res.status == 'FAILURE') {
                        // this.toastr.open('error', `Failure`, res.message);
                        return resData;
                    } else if (res.status == 'SUCCESS'){
                        // this.toastr.open('success', `SUCCESS`, res.message);
                    }
                    return resData;
                }),
                catchError((error: any) => {
                    // this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    return throwError(error)
                })
            )
    };

    // Get Method
    httpGet(url: any) {
        return this.http.get(`${this.apiEndPoint}${url}`)
            .pipe(
                map((res: any) => {
                    const resData: { error: any, data: any } = res;
                    return resData;
                }),
                catchError((error: any) => {
                    // this.toastr.open('error', `ERROR-${error.status}`, error.error.error);
                    return throwError(error)
                })
            )
    };
}
