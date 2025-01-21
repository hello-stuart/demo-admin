import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
  setClassMetadata,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-UOQOKBHC.js";
import "./chunk-GBNX7I7N.js";
import "./chunk-PRRE4YUN.js";
import "./chunk-2U6QIE6W.js";
import "./chunk-55JZBEKM.js";
import "./chunk-EIB7IA3J.js";

// node_modules/universe-wheel/fesm2022/universe-wheel.mjs
var UniverseWheelService = class _UniverseWheelService {
  constructor() {
  }
  static {
    this.ɵfac = function UniverseWheelService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UniverseWheelService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _UniverseWheelService,
      factory: _UniverseWheelService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UniverseWheelService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var TextAlignment;
(function(TextAlignment2) {
  TextAlignment2["INNER"] = "inner";
  TextAlignment2["OUTER"] = "outer";
  TextAlignment2["CENTER"] = "center";
})(TextAlignment || (TextAlignment = {}));
var TextOrientation;
(function(TextOrientation2) {
  TextOrientation2["HORIZONTAL"] = "horizontal";
  TextOrientation2["VERTICAL"] = "vertical";
  TextOrientation2["CURVED"] = "curved";
})(TextOrientation || (TextOrientation = {}));
var UniverseWheelComponent = class _UniverseWheelComponent {
  constructor() {
    this.onSpinStart = new EventEmitter();
    this.onSpinComplete = new EventEmitter();
    this.completedSpin = false;
    this.isSpinning = false;
  }
  reset() {
    this.wheel.stopAnimation(false);
    this.wheel.rotationAngle = 0;
    this.wheel.ctx.clearRect(0, 0, this.wheel.ctx.canvas.width, this.wheel.ctx.canvas.height);
    this.isSpinning = false;
    this.completedSpin = false;
    this.ngAfterViewInit();
  }
  ngOnInit() {
  }
  spin() {
    if (this.completedSpin || this.isSpinning) return;
    this.isSpinning = true;
    this.onSpinStart.emit(null);
    const segmentToLandOn = this.wheel.segments.filter((x) => !!x).find(({
      id
    }) => this.idToLandOn === id);
    const segmentTheta = segmentToLandOn.endAngle - segmentToLandOn.startAngle;
    this.wheel.animation.stopAngle = segmentToLandOn.endAngle - segmentTheta / 4;
    this.wheel.startAnimation();
    setTimeout(() => {
      this.completedSpin = true;
      this.onSpinComplete.emit(null);
    }, this.spinDuration * 1e3);
  }
  ngAfterViewInit() {
    const segments = this.items;
    this.wheel = new Winwheel({
      numSegments: segments.length,
      segments,
      innerRadius: this.innerRadius || 0,
      outerRadius: this.height / 2 - 20,
      centerY: this.height / 2 + 20,
      textOrientation: this.textOrientation,
      textAligment: this.textAlignment,
      animation: {
        type: "spinToStop",
        // Type of animation.
        duration: this.spinDuration,
        // How long the animation is to take in seconds.
        spins: this.spinAmount
        // The number of complete 360 degree rotations the wheel is to do.
      }
    });
    TweenMax.ticker.addEventListener("tick", this.drawPointer.bind(this));
  }
  ngOnDestroy() {
    TweenMax.ticker.removeEventListener("tick");
  }
  drawPointer() {
    let c = this.wheel.ctx;
    if (c) {
      c.save();
      c.lineWidth = 2;
      c.strokeStyle = this.pointerStrokeColor;
      c.fillStyle = this.pointerFillColor;
      c.beginPath();
      c.moveTo(this.width / 2 - 20, 2);
      c.lineTo(this.width / 2 + 20, 2);
      c.lineTo(this.width / 2, 42);
      c.lineTo(this.width / 2 - 20, 2);
      c.stroke();
      c.fill();
      c.restore();
    }
  }
  static {
    this.ɵfac = function UniverseWheelComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UniverseWheelComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _UniverseWheelComponent,
      selectors: [["universe-wheel"]],
      inputs: {
        height: "height",
        idToLandOn: "idToLandOn",
        width: "width",
        items: "items",
        spinDuration: "spinDuration",
        spinAmount: "spinAmount",
        innerRadius: "innerRadius",
        pointerStrokeColor: "pointerStrokeColor",
        pointerFillColor: "pointerFillColor",
        disableSpinOnClick: "disableSpinOnClick",
        textOrientation: "textOrientation",
        textAlignment: "textAlignment"
      },
      outputs: {
        onSpinStart: "onSpinStart",
        onSpinComplete: "onSpinComplete"
      },
      decls: 2,
      vars: 2,
      consts: [["id", "canvas", 3, "click", "width", "height"]],
      template: function UniverseWheelComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "canvas", 0);
          ɵɵlistener("click", function UniverseWheelComponent_Template_canvas_click_0_listener() {
            return !ctx.disableSpinOnClick && ctx.spin();
          });
          ɵɵtext(1, "     Canvas not supported, use another browser. ");
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵproperty("width", ctx.width)("height", ctx.height);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UniverseWheelComponent, [{
    type: Component,
    args: [{
      selector: "universe-wheel",
      template: `
    <canvas (click)='!disableSpinOnClick && spin()' id='canvas' [width]='width' [height]='height'>
        Canvas not supported, use another browser.
    </canvas>
`,
      standalone: true
    }]
  }], () => [], {
    height: [{
      type: Input
    }],
    idToLandOn: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    spinDuration: [{
      type: Input
    }],
    spinAmount: [{
      type: Input
    }],
    innerRadius: [{
      type: Input
    }],
    pointerStrokeColor: [{
      type: Input
    }],
    pointerFillColor: [{
      type: Input
    }],
    disableSpinOnClick: [{
      type: Input
    }],
    textOrientation: [{
      type: Input
    }],
    textAlignment: [{
      type: Input
    }],
    onSpinStart: [{
      type: Output
    }],
    onSpinComplete: [{
      type: Output
    }]
  });
})();
export {
  TextAlignment,
  TextOrientation,
  UniverseWheelComponent,
  UniverseWheelService
};
//# sourceMappingURL=universe-wheel.js.map
