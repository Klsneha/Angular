import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  //getDishes(): Promise<Dish[]> {
   // return Promise.resolve(DISHES);
   //Simulate server latency with 2 seconds delay
   /*return new Promise(resolve=>{
     setTimeout(()=>resolve(DISHES),2000);
   });*/
   
 // }

 getDishes(): Observable<Dish[]> {
  return of(DISHES).pipe(delay(2000));
}

  //getDish(id: number):Promise<Dish> {
  //  return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  /*  return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
    });
  }*/

  getDish(id: number): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  } 

 /* getFeaturedDish(): Promise<Dish> {
    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    return new Promise(resolve=>{
      setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]),2000);
    });

  }*/

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
}
