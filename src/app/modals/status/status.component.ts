import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from "@angular/forms"
import{ DateAdapter, MatDialog} from '@angular/material'
import {StatusInterface } from '../../intercafe.enum'
import { BackendService } from '../../backend.service'
import { MatDialogRef } from '@angular/material'
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  constructor(private fb:FormBuilder,
              private backendService: BackendService,
              public dialogRef : MatDialogRef<StatusComponent>) {}
 
  private statusForm : FormGroup;
  private date_picker_placeholder : string
  private date_picer_text : string
  private create_new : boolean 
  private status_data :StatusInterface 
  private status_selected
  ngOnInit() {
    this.backendService.getStatus()
                       .subscribe((data:StatusInterface[])=>{this.create_new = data.length == 0? true : false;
                                                 this.status_data = data[0];
                                                if(this.create_new == false){
                                                  this.status_selected = this.status_data.status
                                                  this.statusForm = this.fb.group({ 
                                                    status:    this.fb.control(this.status_data.status,[Validators.required]),
                                                    message:   this.fb.control(this.status_data.message,[Validators.required]),
                                                    date:      this.fb.control(this.status_data.date),
                                                    days_left: this.fb.control(this.status_data.days_left)
                                                  });
                                                  this.changeView(this.status_selected)
                                                }else{
                                                  this.statusForm = this.fb.group({ 
                                                    status:    this.fb.control('',[Validators.required]),
                                                    message:   this.fb.control('',[Validators.required]),
                                                    date:      this.fb.control(''),
                                                    days_left: this.fb.control('')
                                                  });
                                                }});
  }
  private status = [
    {value: 0, viewValue: 'Dirbu' },
    {value: 1, viewValue: 'Atostogos' },
    {value: 2, viewValue: 'Laisvas' }
  ];

  save(){
    console.log(this.statusForm.valid)
    console.log(this.create_new)
    if(this.create_new && this.statusForm.valid){
      console.log('create new ')
      this.backendService.createStatus(this.statusForm.value)
                          .subscribe(data=>{console.log(data)},
                                     err=>{console.log(err)},
                                     ()=>{this.backendService.showSuccessMessage('Statusas atnaujinas','',3000);
                                          this.dialogRef.close();
                                          });
    }
       if(this.statusForm.valid){
        console.log('update ')
        this.backendService.updateStatus(this.statusForm.value,this.status_data._id)
                           .subscribe(data=>{console.log(data)},
                                      err=>{console.log(err)},
                                      ()=>{this.backendService.showSuccessMessage('Statusas atnaujinas','',3000);
                                           this.dialogRef.close();
                                           });
      }
      console.log(this.statusForm.value)
  }
  changeDate(event){
    let now = new Date().getTime()
    let end_time = new Date(event.value).getTime()
    let days_left = Math.ceil((end_time - now)/86400000)
    days_left = days_left < 0 ? 0 : days_left
    this.statusForm.controls['days_left'].setValue(days_left)
  }
  changeView(status){
    switch (status) {
      case 0: //status "dirbu"
      this.date_picker_placeholder = 'Darbų pabaiga'
      this.date_picer_text = 'Iki darbų pabaigos liko:'
      break;
      case 1: //status "atostogos"
      this.date_picker_placeholder = 'Atostogų pabaiga'
      this.date_picer_text = 'Iki atostogų pabaigos liko:'
      break;
      case 2: //status "laisvas"
      break;
      
      default:
      break;
    }
  }
  selectStatus(status){
    this.status_selected = status
    this.statusForm.controls["date"].reset()
    this.statusForm.controls["message"].reset()
    this.statusForm.controls["days_left"].reset()
    this.changeView(status)
    console.log(this.statusForm.value)
    }
}
