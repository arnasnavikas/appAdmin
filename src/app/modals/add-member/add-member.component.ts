import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms'
import { BackendService} from '../../backend.service'
import { MatDialogRef,MatDialog } from "@angular/material"
import { AddGroupCoverComponent } from '../../modals/add-group-cover/add-group-cover.component'
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit,OnDestroy {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddMemberComponent>,
              private backendService: BackendService,
              public dialog: MatDialog) { }
  private memberForm : FormGroup = this.fb.group({name:      this.fb.control('',[Validators.required]),
                                                  forname:   this.fb.control('',[Validators.required]),
                                                  age:       this.fb.control(''),
                                                  images:    this.fb.control(''),
                                                  profesion: this.fb.control(''),
                                                  hobby:     this.fb.control('')
                                                })
  ngOnInit() {
  }
  ngOnDestroy(){
    this.backendService.resetList();
  }
addPhotos(){
    this.dialog.open(AddGroupCoverComponent,{
      height: '500px',
      data: {type:'member-add-picture'}
    })
  }
  create(){
    if(this.memberForm.valid){
      console.log(this.memberForm.value)
      this.backendService.addMember(this.memberForm.value)
                         .subscribe(data=>{console.log(data); this.backendService.members.push(data[0]);},
                                    err=>{console.log(err)},
                                    ()=>{this.dialogRef.close()
                                          this.backendService.showSuccessMessage('Komandos narys pridėtas','',3000)
                                          this.backendService.resetList();
                                          })
    }
  }
}
