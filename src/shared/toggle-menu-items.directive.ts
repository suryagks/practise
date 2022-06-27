import { Directive, ElementRef, HostListener,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleMenuItems]'
})
export class ToggleMenuItemsDirective {

  constructor(private renderer:Renderer2, private elRef: ElementRef) { }

  @HostListener('click') 
  performTask() { 
    debugger;
    let childElement = this.elRef.nativeElement.nextElementSibling;
    if(childElement != null && childElement.classList.value.includes('toggle')) 
    {
      this.renderer.removeClass(childElement, 'toggle');
      this.renderer.addClass( this.elRef.nativeElement, 'toggle');
      this.renderer.removeClass(this.elRef.nativeElement.parentElement.nextElementSibling, 'showHidesidenav');
    }  
    else if(!this.elRef.nativeElement.classList.value.includes('toggle'))
    {
      this.renderer.addClass( this.elRef.nativeElement, 'toggle');
      this.renderer.removeClass( this.elRef.nativeElement.previousElementSibling, 'toggle');
      this.renderer.addClass(this.elRef.nativeElement.parentElement.nextElementSibling, 'showHidesidenav');
    }    
  }
    
}
