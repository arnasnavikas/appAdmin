import { Component, OnInit } from '@angular/core';
import {BackendService } from '../../backend.service'
import { FormBuilder, FormGroup,Validators} from '@angular/forms'
import { MatDialog } from "@angular/material"
import { TeamMemberInterfase} from '../../intercafe.enum'
import { StatusComponent } from '../../modals/status/status.component'
@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.component.html',
  styleUrls: ['./edit-team-member.component.css']
})
export class EditTeamMemberComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private backendService: BackendService,
    public dialog: MatDialog){}
  ngOnInit() {
    this.backendService.item_type = 'team-member'
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
}
