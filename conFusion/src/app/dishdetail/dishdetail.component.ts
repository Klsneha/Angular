import { Component, OnInit, ViewChild, Inject} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Comment} from '../shared/comment';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform') commentFormDirective;

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;

  commentForm: FormGroup;
  comment: Comment;
  formErrors={
    'author': '',
    'comments': ''
  }

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comments': {
      'required':      'Comments are required dfgfddgd.',
      'minlength':     'Comments must be at least 2 characters long.',
      'maxlength':     'Comments cannot be more than 25 characters long.'
    },
  };
  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
  private fb:FormBuilder, @Inject('BaseURL') private BaseURL) { 
    this.createForm();
  }
  

  ngOnInit() {
    /*const id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
    .subscribe(dish=>this.dish=dish);*/
   this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
    errmess => this.errMess = <any>errmess);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(+params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }  

  createForm()
  {
    this.commentForm=this.fb.group({
      author:['',[Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      rating:[5,[]],
      comments:['',[Validators.required, Validators.minLength(2),Validators.maxLength(25)]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  onSubmit(){
    this.comment=this.commentForm.value;
    console.log(this.comment);

   /* this.commentForm.reset({
      author:'',
      comments:''
    });
   
    this.commentFormDirective.resetForm();*/
    var d = new Date();
    var n = d.toString();
    this.comment.date=n;
    this.dish.comments.push(this.comment);
   
  }
}
