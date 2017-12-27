import { Component, OnInit,Inject} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from "@angular/forms"
import{ DateAdapter, MatDialog} from '@angular/material'
import { BackendService } from '../../backend.service'
import { TeamMemberInterfase} from '../../intercafe.enum'
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material'
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  constructor(private fb:FormBuilder,
              private backendService: BackendService,
              public dialogRef : MatDialogRef<StatusComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TeamMemberInterfase,) {}
 
  public statusForm : FormGroup;
  private date_picker_placeholder : string
  private date_picer_text : string
  private status_selected
  ngOnInit() {
    this.statusForm = this.fb.group({ 
      _id:    this.fb.control(this.data._id,[Validators.required]),
      status:    this.fb.control(this.data.status,[Validators.required]),
      message:   this.fb.control(this.data.message,[Validators.required]),
      date:      this.fb.control(this.data.date),
      days_left: this.fb.control(this.data.days_left)
    });
    this.status_selected = this.data.status
    this.changeView(this.data.status)
  }
  private status = [
    {value: 0, viewValue: 'Dirbu' },
    {value: 1, viewValue: 'Atostogos' },
    {value: 2, viewValue: 'Laisvas' }
  ];

  save(){
    if(this.statusForm.valid){

      this.data.status = this.statusForm.value.status
      this.data.message = this.statusForm.value.message
      this.data.days_left = this.statusForm.value.days_left
      this.data.date = this.statusForm.value.date
      this.backendService.updateUserStatus(this.data)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{this.backendService.showSuccessMessage('Statusas atnaujinas','',3000);
                                         this.dialogRef.close();
                                         });
    }
        console.log(this.data)
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
