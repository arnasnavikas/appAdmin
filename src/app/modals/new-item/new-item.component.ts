import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum'

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewItemComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<NewItemComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private backendService: BackendService, private _fb: FormBuilder) {}
 ngOnInit(){
   switch (this.data.type) {
     case 'group':
     this.typeName = 'grupę'
     this.placeholder = 'Grupės pavadinimas'
     this.newItemForm = this._fb.group({ name: this._fb.control('',[Validators.required]),
                                      route: this._fb.control(''),
                                      folder_name: this._fb.control(''),
                                 });
 
        break;
      case 'gallery':
      this.typeName = 'galeriją'
      this.placeholder = 'Galerijos pavadinimas'
      this.newItemForm = this._fb.group({ name: this._fb.control('',[Validators.required]),
                                          route: this._fb.control(''),
                                          tables: this._fb.control(0),
                                          group_folder: this._fb.control(this.data.group.folder_name),
                                          group_id:  this._fb.control(this.data.group._id),
                                          folder_name: this._fb.control(''),
      });
      break;
      default:
      console.log('no data type provided')
        break;
    }
  }
  private newItemForm : FormGroup
  private typeName   //for display what create  
  private placeholder;      
  private onNoClick = (): void=> {
    this.dialogRef.close();
  }

  create_group(){
    if(this.newItemForm.valid){
      let name = this.newItemForm.controls['name'].value
      name = name.replace(/[\W_]+/g,"-") 
      this.newItemForm.controls['route'].setValue(name) 
      let date ="_"+Date.now()
      name = name+date
      this.newItemForm.controls['folder_name'].setValue(name) 
      this.backendService.createGroup(this.newItemForm.value)
                         .subscribe(data=>{console.log(data); this.backendService.groups.push(data)},
                                    err=>{console.log(err);},
                                    ()=>{ this.backendService.showSuccessMessage('Grupė sukurta','',3000) })
      }else
        console.log('Form has errors')
      
  }
  create_gallery(){
    if(this.newItemForm.valid){
      let name = this.newItemForm.controls['name'].value
      name = name.replace(/[\W_]+/g,"-") 
      this.newItemForm.controls['route'].setValue(name)
      name = name +"_"+Date.now()
      this.newItemForm.controls['folder_name'].setValue(name)
      this.backendService.createGallery(this.newItemForm.value)
                        .subscribe(data=>{console.log(data)},
                                    err =>{console.log(err)},
                                    ()=>{
                                        this.data.group.gallerys = this.data.group.gallerys+1
                                        this.backendService.showSuccessMessage('Galerija sukurta','',3000)  
                                      })
      }                               
    }

  create(){
    switch (this.data.type) {
      case 'group':
        this.create_group()
        break;
      case 'gallery':
        this.create_gallery()
        break;
      default:
        break;
    }
    this.onNoClick()
  }
}
