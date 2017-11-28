import { Directive,Input, ElementRef,OnInit,HostListener,OnDestroy} from '@angular/core';
import { BackendService } from '../backend.service'
import { DeleteItemComponent } from '../modals/delete-item/delete-item.component'
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Directive({
  selector: '[appDeleteItem]'
})
export class DeleteItemDirective implements OnInit,OnDestroy{
@Input('data') data;
@Input('remove') remove;
  constructor(public dialog: MatDialog,
              private elRef : ElementRef,
              private backendService : BackendService) { }
ngOnInit(){
    this.elRef.nativeElement.className += ' delete-item'
}

  @HostListener('click',['$event']) show(event){
    let dialogRef = this.dialog.open(DeleteItemComponent, {
        width: '250px',
        data : this.data
      });
      console.log('thisi s from delete directive')
      console.log(this.data)
  }
  ngOnDestroy(){
    
  }
}
