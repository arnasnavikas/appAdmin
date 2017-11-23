import {Component, OnInit, Input,trigger, Output,
  state, style, transition, animate, EventEmitter,ViewEncapsulation, OnDestroy} from '@angular/core';
import { PictureInterface } from '../../intercafe.enum'
@Component({
  selector: 'app-picture-gallery',
  templateUrl: './picture-gallery.component.html',
  styleUrls: ['./picture-gallery.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('gallery-open',[
      state('in', style({transform: 'translateX(0)'})),
      state('close', style({transform: 'translateX(-100%) scale(0)'})),
      transition('void => *', [
        style({transform: 'translateX(0) scale(0)'}),
        animate('.2s ease-in')
      ]),
      transition('* => close', [animate('.2s ease-in')])
    ]),
    trigger('flyRight', [
      state('out-right', style({opacity: 0,transform: 'translateX(-50%)' })),
      state('back-right', style({opacity: 1,transform: 'translateX(0)' })),
      state('fly-out', style({opacity: 0,transform: 'translateX(50%)' })),
      transition('out-right => back-right', [animate('.2s ease-in')]),
      transition('back-right => fly-out', [animate('.2s ease-in')])
    ]),
    trigger('flyLeft', [
      state('out-left', style({opacity: 0,transform: 'translateX(50%)' })),
      state('back-left', style({opacity: 1,transform: 'translateX(0)' })),
      state('fly-out', style({opacity: 0,transform: 'translateX(-50%)' })),
      transition('out-left => back-left', [animate('.2s ease-in')]),
      transition('back-left => fly-out', [animate('.2s ease-in')])
    ])
  ]
})
export class PictureGalleryComponent implements OnInit,OnDestroy {

  constructor() { }
// @Input('picture') pictures:Array<PictureInterface>
@Input('picture') pictures : Array<PictureInterface>;
@Input('index') index : number;
@Input('galleryName') gallery_name;
@Output() close  = new EventEmitter();
private gallery_description;
private imgIndex;
private _source;
private right = 'in';
private left = 'in';
private animate_open
private allowNextImg = true;
private infoShowed = false // for mobile phones click on image is turning on image info
/**###############################################
 * CHECK IF IMAGES NOT EMPTY, AND SETS FIRST
 * IMAGE IN SLIDER
 */
ngOnInit() {
  this.animate_open = 'open'
  this.index = this.index ? this.index : 0;
  this.imgIndex = this.index;
  if(this.pictures.length > 0){
    this._source = this.pictures[this.index].imgURL;
    this.gallery_description = this.pictures[this.index].description;
  }
} 
ngOnDestroy(){
  // this.animate_open = 'closed'
}
rightDone(e) {
  // console.log(e)
  this.allowNextImg = true;
  this.right = 'back-right';
}
leftDone(e){
  // console.log(e)
  this.allowNextImg = true;
  this.left = 'back-left';
}
closeGallery =()=>{
  this.close.emit(false);
}
// close gallery component
removeGallery = ()=>{
  this.animate_open = 'close'
  setTimeout(this.closeGallery,500)
}
private insert_next_image = ()=>{
  this.right = 'out-right';
  let realPicturesLength = this.pictures.length - 1;
    if (this.imgIndex == realPicturesLength)
      this.imgIndex = 0;
    else
      this.imgIndex += 1;
    this.gallery_description = this.pictures[this.imgIndex].description;
    this._source = this.pictures[this.imgIndex].imgURL;
}
nextImg(e) {
  e.stopPropagation()
  this.right = 'fly-out'
  if(this.allowNextImg)
    setTimeout(this.insert_next_image,500)
}

private insert_Previous_Image = ()=>{
  this.left = 'out-left'
  if (this.imgIndex == 0)
    this.imgIndex = this.pictures.length - 1;
  else
    this.imgIndex -= 1;
  this.gallery_description = this.pictures[this.imgIndex].description;
  this._source = this.pictures[this.imgIndex].imgURL;
}
// animates next picture entry
prevImg(e) {
  e.stopPropagation()
  this.left = 'fly-out'
  if(this.allowNextImg)
      setTimeout(this.insert_Previous_Image,500)
  }
  // shows info abaout image on mobile phones when clicked on image
  showInfo(domElem,event){
    let screenSize = window.innerWidth
    if(screenSize < 640){

      console.log(domElem)
      if(screenSize < 640 && !this.infoShowed){
        domElem.style.visibility = 'visible'
        console.log('setting visible')
      }
      else if(screenSize < 640 && this.infoShowed){
        this.infoShowed = false
        domElem.style.visibility = 'hidden'
        console.log('setting hidden')
        return;
      }
      this.infoShowed = true
    }else
      this.removeGallery()

  }
  swipe(e){
    console.log(e)
    if(e.type == 'swiperight'){
      this.nextImg(e)
      console.log(e.type)
      console.log(e)
    }
    else if (e.type == 'swipeleft'){
      console.log(e.type)
      console.log(e)
      this.prevImg(e)
    }
  }
}
