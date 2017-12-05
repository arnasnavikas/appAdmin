import { Component, OnInit } from '@angular/core';
import {BackendService } from '../../backend.service'
import { FormBuilder, FormGroup,Validators} from '@angular/forms'
import { MatDialog } from "@angular/material"
import { TeamMemberInterfase} from '../../intercafe.enum'
import { StatusComponent } from '../../modals/status/status.component'
import { AddMemberComponent } from '../../modals/add-member/add-member.component'
import { Router} from '@angular/router'
import { AddGroupCoverComponent } from '../../modals/add-group-cover/add-group-cover.component'
@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.component.html',
  styleUrls: ['./edit-team-member.component.css']
})
export class EditTeamMemberComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private backendService: BackendService,
    public dialog: MatDialog,
    public router : Router){}
  ngOnInit() {
    this.backendService.item_type = 'user'
    this.backendService.getTeamMembers().subscribe((members:TeamMemberInterfase[])=>{ 
                                                      this.backendService.members = members ;
                                                      console.log(members);
                                                      if(members.length == 0){
                                                        this.dialog.open(AddMemberComponent,{
                                                          width: '250px'
                                                        });
                                                      }
                                                    });
    
  }
  private memberForm : FormGroup = this.fb.group({name:      this.fb.control('',[Validators.required]),
                                                  forname:   this.fb.control(''),
                                                  age:       this.fb.control(''),
                                                  images:    this.fb.control('',[Validators.required]),
                                                  profesion: this.fb.control(''),
                                                  hobby:     this.fb.control('')
                                                });
   changeStatus(member){
     this.dialog.open(StatusComponent, {
    width: '250px',
      data:member
    });
  }             
  editUser(user){
    this.dialog.open(AddMemberComponent, {
      width: '260px',
        data:user
      });
  }
  selectUser(member,index){
    this.backendService.activeUserIndex = index
    this.backendService.selected_user = member
    this.backendService.showSuccessMessage('Vartotojas pasirinktas','',3000)
    // this.router.navigate(['/admin/groups'])
  }         
  addPhotos(){
    this.dialog.open(AddGroupCoverComponent,{
      height: '500px',
      data: {type:'member-add-picture'}
    })
  }   
  editPhotos(){
    this.dialog.open(AddGroupCoverComponent,{
      height: '500px',
      data: {type:'member-remove-picture'}
    })
  }       
}
