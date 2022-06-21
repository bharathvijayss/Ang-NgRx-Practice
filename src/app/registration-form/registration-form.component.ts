import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {


  questionAnswerData: any[] = [{
    question: "what is your name",
    questionType: 'input-box',
    answerList: null,
    answer: ''
  }, {
    question: "what is your gender",
    questionType: 'radio',
    answerList: ['male', 'female'],
    answer: ''
  }, {
    question: "what is your Education Qualification",
    questionType: 'dropdown',
    answerList: ['B.Tech', 'B.E', 'Arts'],
    answer: ''
  }, {
    question: "what is your primary skills, choose 2",
    questionType: 'checkbox',
    answerList: ['Angular', 'React', 'Node', 'Python', 'Vue.js'],
    answer: ''
  }]

  dynamicForm!: UntypedFormGroup;
  constructor(private activeRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.dynamicForm = new UntypedFormGroup({
      runtimeControls: new UntypedFormArray([])
    });
    this.questionAnswerData.forEach((questionAnswer) => {
      let tempFormGroup = new UntypedFormGroup({});
      for (let val in questionAnswer) {
        if (val !== 'answerList') {
          tempFormGroup.setControl(val, new UntypedFormControl(questionAnswer[val]));
        } else {
          let tempFormControl = new UntypedFormArray([]);
          if (questionAnswer[val] !== null) {
            for (let answerVal of questionAnswer[val]) {
              tempFormControl.push(new UntypedFormControl(answerVal));
            }
          }
          tempFormGroup.setControl(val, tempFormControl);
        }
      }
      // let tempFormControl = new FormControl(tempFormGroup);
      (<UntypedFormArray>this.dynamicForm.controls['runtimeControls']).push(tempFormGroup);
    });
    // console.log(this.MainControls);
  }

  get MainControls() {
    return (<UntypedFormArray>this.dynamicForm.controls['runtimeControls']).controls;
  }

  submited() {
    console.log(this.dynamicForm.value);
  }

  checked() {
    
  }

}  
