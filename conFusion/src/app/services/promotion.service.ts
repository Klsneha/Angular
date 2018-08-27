import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable, of } from 'rxjs';
//import { delay } from 'rxjs-compat/operator/delay';
import { delay } from 'rxjs/operators';

import { Restangular } from 'ngx-restangular';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private restangular: Restangular,
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService ) { }


  
  

  getPromotions(): Observable<Promotion[]> {
    //return Promise.resolve(PROMOTIONS);
   //return of(PROMOTIONS).pipe(delay(2000));
   return this.restangular.all('promotions').getList()
   .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  

 /* getPromotion(id: number): Promise<Promotion> {
   // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
   return new Promise(resolve=>{
     setTimeout(()=>resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000);
   });
  }*/

  getPromotion(id: number): Observable<Promotion> {
   // return of(PROMOTIONS.filter((Promotion)=>(Promotion.id===id))[0]).pipe(delay(2000));
   return  this.restangular.one('promotions', id).get()
   .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  

  /*getFeaturedPromotion(): Promise<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    return new Promise(resolve=>{

      setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000);
    });
  }*/

  getFeaturedPromotion(): Observable<Promotion> {
    //return of(PROMOTIONS.filter((Promotion)=>(Promotion.featured))[0]).pipe(delay(2000));
    return this.restangular.all('promotions').getList({featured: true})
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
