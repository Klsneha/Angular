import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Restangular } from 'ngx-restangular';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private restangular: Restangular, private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService ) { }

  /*getLeaders(): Promise<Leader[]>{
    //return Promise.resolve(LEADERS);
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS),2000);
    });
  }*/

  getLeaders(): Observable<Leader[]>{
   // return of(LEADERS).pipe(delay(200));
    return this.restangular.all('leaders').getList()
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  /*getLeader(id: number): Promise<Leader>{
     // return Promise.resolve(LEADERS.filter((leader)=>(leader.id===id))[0]);
     return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((leader)=>(leader.id===id))[0]),2000);
    });
  }*/


  getLeader(id:number): Observable<Leader>{
   // return of(LEADERS.filter((leader)=>(leader.id===id))[0]).pipe(delay(200));
    return  this.restangular.one('leaders', id).get()
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  /*getFeaturedLeader(): Promise<Leader>{
   // return Promise.resolve(LEADERS.filter((leader)=>(leader.featured))[0]);
   return new Promise(resolve=>{
    setTimeout(()=>resolve(LEADERS.filter((leader)=>(leader.featured))[0]),2000);
  });
  }*/

  getFeaturedLeader(): Observable<Leader>{
   // return of(LEADERS.filter((leader)=>(leader.featured))[0]).pipe(delay(200));
   return this.restangular.all('leaders').getList({featured: true})
   .pipe(map(leaders => leaders[0]))
   .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
