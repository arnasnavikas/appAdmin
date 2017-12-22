import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BackendService } from '../../backend.service';
import { MessagesInterface } from '../../intercafe.enum';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-reply-message',
  templateUrl: './reply-message.component.html',
  styleUrls: ['./reply-message.component.css']
})
export class ReplyMessageComponent implements OnInit {
private message : MessagesInterface
  constructor(private fb: FormBuilder,private _router : ActivatedRoute,private backendService : BackendService) { }
 private messageForm : FormGroup;
 private samataCost = 0
 private sending : boolean = false;
  ngOnInit() {
    this.backendService.item_type = ''
    this._router.params.subscribe(params=>{
      let message_id = params["mail-id"];
      this.getMessage(message_id)
    });
  }
  private getMessage = (id)=>{
    this.backendService.getMessage(id).subscribe((message:MessagesInterface)=>{
      this.message = message
      this.makeForm(message)
      this.messageReaded(message)
      this.samataCost = this.calcSamata(message)
    })
  } 
  // calculates total sum of samata 
  private calcSamata = (message:MessagesInterface)=>{
    if(message.samata.length > 0){
     let total = 0
      for(let item of message.samata)
        total += item.job_total_price
      return total
    }else
      return 0
  }
  // makes form for answer message
  private makeForm = (message)=>{
    this.messageForm = this.fb.group({message_id:this.fb.control(message._id),
                                      answer: this.fb.control('',[Validators.required]),
                                      email:this.fb.control(message.email),
                                      subject:this.fb.control('',[Validators.required])})
  }
  // updates message status in database 
  private messageReaded = (message:MessagesInterface)=>{
    if(message.newMail){
      this.backendService.markAsReaded(message._id).subscribe(data=>{
        this.backendService.getNewMessages()
                           .subscribe((mail:MessagesInterface[])=>{
                              this.backendService.new_messages = mail;
                            })
      })
    }else
      console.log('message alredy marked as readed')
  }
  private messageAswered = (id)=>{

  }
  sendMail(){
    if(!this.messageForm.valid){
      Object.keys(this.messageForm.controls).forEach(key => {
        this.messageForm.controls[key].markAsDirty();
        this.messageForm.controls[key].markAsTouched();
      });
      return;
    }else{
      this.sending = true
      this.backendService.replyMessage(this.messageForm.value)
                          .subscribe(data=>{
                            console.log(data)
                          },err=>{console.log(err)},
                          ()=>{this.backendService.showSuccessMessage('Žinutė išsiūsta','Gerai',3000)})
    }
      console.log(this.messageForm.value)
  }
}
