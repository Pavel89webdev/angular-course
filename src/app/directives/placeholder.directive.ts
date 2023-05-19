import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class AppPlaceHolderDirective {
    constructor(
        public viewContainerRef: ViewContainerRef,
    ){}
}