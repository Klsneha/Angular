import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {Http, Response} from '@angular/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  //getDishes(): Promise<Dish[]> {
   // return Promise.resolve(DISHES);
   //Simulate server latency with 2 seconds delay
   /*return new Promise(resolve=>{
     setTimeout(()=>resolve(DISHES),2000);
   });*/
   
 // }

 getDishes(): Observable<Dish[]> {
 // return of(DISHES).pipe(delay(2000));
 return this.http.get<Dish[]>(baseURL + 'dishes')
 .pipe(catchError(this.processHTTPMsgService.handleError));
}

  //getDish(id: number):Promise<Dish> {
  //  return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  /*  return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
    });
  }*/

  getDish(id: number): Observable<Dish> {
   // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
   return this.http.get<Dish>(baseURL + 'dishes/' + id)
   .pipe(catchError(this.processHTTPMsgService.handleError));
  } 

 /* getFeaturedDish(): Promise<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]),2000);
    });

  }*/

  getFeaturedDish(): Observable<Dish> {
   // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
   .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[]| any> {
   // return of(DISHES.map(dish => dish.id )).delay(2000);
   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
   .pipe(catchError(error => error));
  }
}
