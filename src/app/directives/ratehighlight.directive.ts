import { Directive, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';

@Directive({
    selector: '[appRatehighlight]',
    standalone: true
})
export class RatehighlightDirective {

  private observer!: IntersectionObserver;
  private oldValue: any;
  private interval: any;
  private isVisible!: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef 
    ) { }

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;

        if (this.isVisible) {
          this.checkVals();
        } else {
          clearInterval(this.interval);
          this.interval = null;
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.el.nativeElement);
    this.observer.disconnect();
    clearInterval(this.interval);
    this.interval = null;
  }

  checkVals() {
    if (!this.isVisible) {
      return;
    }
    this.interval = setInterval(() => {
      const classList = this.el.nativeElement.classList;

      if (classList.value.includes('back') || classList.value.includes('lay')) {
        if (this.oldValue && this.oldValue !== this.el?.nativeElement?.innerText) {
          const newClass = classList.value.includes('back') ? 'SparkBack' : 'SparkLay';
          this.renderer.addClass(this.el.nativeElement, newClass);
        } else if (classList.contains('SparkBack') || classList.contains('SparkLay')) {
          this.renderer.removeClass(this.el.nativeElement, 'SparkBack');
          this.renderer.removeClass(this.el.nativeElement, 'SparkLay');
        }
        this.oldValue = this.el.nativeElement.innerText;
        this.cdRef.detectChanges();
      }
    }, 600);
  }

}
