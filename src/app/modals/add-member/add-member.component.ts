import { Component, OnInit,OnDestroy,Inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms'
import { BackendService} from '../../backend.service'
import { MatDialogRef,MatDialog,MAT_DIALOG_DATA } from "@angular/material"
import { AddGroupCoverComponent } from '../../modals/add-group-cover/add-group-cover.component'
import { TeamMemberInterfase} from '../../intercafe.enum'
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit,OnDestroy {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddMemberComponent>,
              private backendService: BackendService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: TeamMemberInterfase,) { }
  public userForm : FormGroup = this.fb.group({  
                                                  name:      this.fb.control('',[Validators.required]),
                                                  forname:   this.fb.control('',[Validators.required]),
                                                  age:       this.fb.control(''),
                                                  phone:     this.fb.control(''),
                                                  email:     this.fb.control(''),
                                                  profesion: this.fb.control(''),
                                                  hobby:     this.fb.control('')
                                                });
  public modalTitle = 'Sukurti vartotoją'
  public buttonTitle = 'Sukurti'
  ngOnInit() {
    if(this.data){
      this.buttonTitle = 'Atnaujinti'
      this.modalTitle = 'Redaguoti varotoją'
      this.userForm = this.fb.group({  _id:      this.fb.control(this.data._id),
      name:      this.fb.control(this.data.name,[Validators.required]),
      forname:   this.fb.control(this.data.forname,[Validators.required]),
      age:       this.fb.control(this.data.age),
      phone:     this.fb.control(this.data.phone),
      email:     this.fb.control(this.data.email),
      profesion: this.fb.control(this.data.profesion),
      hobby:     this.fb.control(this.data.hobby)
    });
    }

  }
  ngOnDestroy(){
    this.backendService.resetList();
  }
  create(){
    if(this.userForm.valid && !this.data){
      console.log(this.userForm.value)
      this.backendService.addMember(this.userForm.value)
                         .subscribe(data=>{console.log(data); this.backendService.members.push(data[0]);},
                                    err=>{console.log(err)},
                                    ()=>{this.dialogRef.close()
                                          this.backendService.showSuccessMessage('Komandos narys pridėtas','',3000)
                                          // this.backendService.resetList();
                                          })
    }
    if(this.userForm.valid && this.data){
      this.backendService.updateMember(this.userForm.value)
                          .subscribe(data=>{console.log(data) },
                                    err=>{console.log(err)},
                                    ()=>{ this.dialogRef.close()
                                          this.data.age = this.userForm.value.age
                                          this.data.name = this.userForm.value.name
                                          this.data.forname = this.userForm.value.forname
                                          this.data.hobby = this.userForm.value.hobby
                                          this.data.profesion = this.userForm.value.profesion
                                      this.backendService.showSuccessMessage('Vartotojas atnaujintas','',3000)
                                // this.backendService.resetList();
                                })
    }
  }
}
