import { Injectable } from '@angular/core';

import { RestangularModule, Restangular} from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import {Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback:Feedback):Observable<Feedback> {
    return  this.restangular.all('feedback').post(feedback);
   }
    getFeedback():Observable<Feedback> {
     return  this.restangular.one('feedback').get();
    }
}
