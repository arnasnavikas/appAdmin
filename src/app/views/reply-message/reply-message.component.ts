import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BackendService } from '../../backend.service';
import { MessagesInterface } from '../../intercafe.enum';
@Component({
  selector: 'app-reply-message',
  templateUrl: './reply-message.component.html',
  styleUrls: ['./reply-message.component.css']
})
export class ReplyMessageComponent implements OnInit {
private message : MessagesInterface
  constructor(private _router : ActivatedRoute,private backendService : BackendService) { }

  ngOnInit() {
    this._router.params.subscribe(params=>{
      let message_id = params["mail-id"];
      this.getMessage(message_id)
      this.messageReaded(message_id)
    });
  }
  private getMessage = (id)=>{
    this.backendService.getMessage(id).subscribe(message=>{
      this.message = message
      console.log(message)
    })
  } 
  private messageReaded = (id)=>{
    this.backendService.markAsReaded(id).subscribe(data=>{
      console.log(data)
      this.backendService.getNewMessages()
      .subscribe((mail:MessagesInterface[])=>{
                   this.backendService.new_messages = mail;
                 })
    })
  }
  private messageAswered = (id)=>{

  }
}
