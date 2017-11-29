import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms'
import { BackendService} from '../../backend.service'
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  constructor(private fb: FormBuilder,private backendService: BackendService) { }
  private memberForm : FormGroup = this.fb.group({name:this.fb.control('',[Validators.required]),
                                                  forname: this.fb.control(''),
                                                  age: this.fb.control(''),
                                                  profesion: this.fb.control(''),
                                                  hobby: this.fb.control('')
                                                })
  ngOnInit() {
  }

}
