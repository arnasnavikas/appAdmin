import {Component, OnInit, Input,trigger, Output,
  state, style, transition, animate, EventEmitter,ViewEncapsulation} from '@angular/core';
import { PictureInterface } from '../../intercafe.enum'
@Component({
  selector: 'app-picture-gallery',
  templateUrl: './picture-gallery.component.html',
  styleUrls: ['./picture-gallery.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('show-info',[
      state('close', style({opacity:0,transform: 'translateY(100%) scale(0)'})),
      state('open', style({opacity:1,transform: 'translateY(0 )'})),
      transition('* => open', [animate('.2s ease-in')]),
      transition('open => *', [animate('.2s ease-in')])
    ]),
    trigger('open-close-gallery',[
      state('close', style({transform: 'translateX(-100%) scale(0)'})),
      transition('void => *', [style({transform: 'translateX(0) scale(0)'}),animate('.2s ease-in')]),
      transition('* => close', [animate('.2s ease-in')])
    ]),
    trigger('flyRight', [
      state('ready', style({opacity: 0,transform: 'translateX(-100%)' })),
      state('fly-in', style({opacity: 1,transform: 'translateX(0)' })),
      state('fly-out', style({opacity: 0,transform: 'translateX(50%)' })),
      transition('ready => fly-in', [animate('.2s ease-in')]),
      transition('* => fly-out', [animate('.2s ease-in')]),
      transition('fly-out => ready',[])
    ]),
    trigger('flyLeft', [
      state('ready', style({opacity: 0,transform: 'translateX(100%)' })),
      state('fly-in', style({opacity: 1,transform: 'translateX(0)' })),
      state('fly-out', style({opacity: 0,transform: 'translateX(-50%)' })),
      transition('ready => fly-in', [animate('.2s ease-in')]),
      transition('* => fly-out', [animate('.2s ease-in')]),
      transition('fly-out => ready',[])
    ])
  ]
})
export class PictureGalleryComponent implements OnInit {

  constructor() { }
// @Input('picture') pictures:Array<PictureInterface>
@Input('picture') pictures : Array<PictureInterface>;
@Input('index') index : number;
 gallery_name;
@Output() close  = new EventEmitter();
private image_description;
private imgIndex;
private _source;
private right;
private left;
public gallery_animation
private infoShowed = 'close' // for mobile phones click on image is turning on image info
/**###############################################
 * CHECK IF IMAGES NOT EMPTY, AND SETS FIRST
 * IMAGE IN SLIDER
 */
ngOnInit() {
  // this.gallery_animation = 'open'
  this.index = this.index ? this.index : 0;
  this.imgIndex = this.index;
  if(this.pictures.length > 0){
    this._source = this.pictures[this.index].imgURL;
    this.image_description = this.pictures[this.index].description;
    this.gallery_name = this.pictures[this.index].folder_name
  }
} 
closeGallery =(event)=>{
  if(event.toState == 'close'){
    console.log('animation complete, closing gallery')
    this.close.emit(false);
  }
}
/**#################### shows next picture ################### */
nextImg(e) {
    e.stopPropagation()
    this.right = 'fly-out'
  }
right_animation_done(e) {
    if(e.toState == 'fly-out')
      this.right = 'ready'
    if(e.toState == 'ready')
      this.insert_next_image();
  }
private insert_next_image = ()=>{
    let realPicturesLength = this.pictures.length - 1;
    if (this.imgIndex == realPicturesLength)
      this.imgIndex = 0;
    else
      this.imgIndex += 1;
    this.image_description = this.pictures[this.imgIndex].description;
    this._source = this.pictures[this.imgIndex].imgURL;
    this.right = 'fly-in';
  }
/**#################### shows previous picture ################### */
prevImg(e) {
  e.stopPropagation()
  this.left = 'fly-out'
}
left_animation_done(e){
  if(e.toState == 'fly-out')
    this.left = 'ready'
  if(e.toState == 'ready')
    this.insert_Previous_Image()
}
private insert_Previous_Image = ()=>{
  if (this.imgIndex == 0)
    this.imgIndex = this.pictures.length - 1;
  else
    this.imgIndex -= 1;
  this.image_description = this.pictures[this.imgIndex].description;
  this._source = this.pictures[this.imgIndex].imgURL;
  this.left = 'fly-in'
}
/**################################################################# */
  // shows info abaout image on mobile phones when clicked on image
  infoToggle = false
  showInfo(e){
    e.stopPropagation()
    this.infoShowed = this.infoShowed == 'open'? 'close': 'open'
    console.log(this.infoShowed)
    //   if(!this.infoShowed){
    //     domElem.style.visibility = 'visible'
    //     console.log('setting visible')
    //   }
    //   else{
    //     this.infoShowed = false
    //     domElem.style.visibility = 'hidden'
    //     console.log('setting hidden')
    //     return;
    //   }
    //   this.infoShowed = true
  }
  swipe(e){
    console.log(e)
    if(e.type == 'swiperight'){
      // this.nextImg(e)
      this.right = 'fly-out'
      console.log(e.type)
      console.log(e)
    }
    else if (e.type == 'swipeleft'){
      console.log(e.type)
      console.log(e)
      // this.prevImg(e)
      this.left = 'fly-out'
    }
  }
}
