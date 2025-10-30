import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-J6AQHLRA.js";
import {
  AuthService,
  ToastService,
  environment
} from "./chunk-OPGT5SRN.js";
import {
  CommonModule,
  Component,
  HttpClient,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  ViewChild,
  __async,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SEPIUDJB.js";

// src/app/shared/components/captcha/captcha.component.ts
function CaptchaComponent_div_0_img_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 20);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("loading", ctx_r1.isLoading());
    \u0275\u0275property("src", "data:image/png;base64," + ((tmp_4_0 = ctx_r1.captchaData()) == null ? null : tmp_4_0.captcha_image), \u0275\u0275sanitizeUrl);
  }
}
function CaptchaComponent_div_0_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "div", 22);
    \u0275\u0275elementEnd();
  }
}
function CaptchaComponent_div_0_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 24);
    \u0275\u0275element(2, "path", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function CaptchaComponent_div_0_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 27);
    \u0275\u0275element(2, "path", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div")(4, "p", 28);
    \u0275\u0275text(5, "Account Temporarily Locked");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 29);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.lockMessage());
  }
}
function CaptchaComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 5);
    \u0275\u0275element(4, "path", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 7);
    \u0275\u0275text(6, " Security Verification Required ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 9)(10, "div", 10);
    \u0275\u0275template(11, CaptchaComponent_div_0_img_11_Template, 1, 3, "img", 11)(12, CaptchaComponent_div_0_div_12_Template, 2, 0, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 13);
    \u0275\u0275listener("click", function CaptchaComponent_div_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshCaptcha());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 14);
    \u0275\u0275element(15, "path", 15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "div", 16)(17, "input", 17, 0);
    \u0275\u0275twoWayListener("ngModelChange", function CaptchaComponent_div_0_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.captchaAnswer, $event) || (ctx_r1.captchaAnswer = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, CaptchaComponent_div_0_div_19_Template, 5, 1, "div", 18)(20, CaptchaComponent_div_0_div_20_Template, 8, 1, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" CAPTCHA verification is required for all login attempts. You have ", ctx_r1.remainingAttempts(), " attempts remaining. ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.captchaData());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLoading());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isLoading());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.captchaAnswer);
    \u0275\u0275property("disabled", ctx_r1.isLoading());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.errorMessage());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLocked());
  }
}
var _CaptchaComponent = class _CaptchaComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.toast = inject(ToastService);
    this.captchaData = signal(null, ...ngDevMode ? [{ debugName: "captchaData" }] : []);
    this.isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
    this.errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
    this.isVisible = signal(false, ...ngDevMode ? [{ debugName: "isVisible" }] : []);
    this.remainingAttempts = signal(3, ...ngDevMode ? [{ debugName: "remainingAttempts" }] : []);
    this.isLocked = signal(false, ...ngDevMode ? [{ debugName: "isLocked" }] : []);
    this.lockMessage = signal("", ...ngDevMode ? [{ debugName: "lockMessage" }] : []);
    this.captchaAnswer = "";
    this.refreshTimer = null;
  }
  ngOnInit() {
    this.checkCaptchaStatus();
  }
  ngOnDestroy() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }
  checkCaptchaStatus() {
    return __async(this, null, function* () {
      try {
        console.log("Checking CAPTCHA status...");
        const status = yield this.http.get(`${environment.apiUrl}/captcha/status`).toPromise();
        console.log("CAPTCHA status response:", status);
        if (status?.is_locked) {
          console.log("IP is locked");
          this.isLocked.set(true);
          this.lockMessage.set(status.lock_message || "Account temporarily locked");
          this.isVisible.set(false);
          return;
        }
        console.log("CAPTCHA always required for security, showing component");
        this.isVisible.set(true);
        this.remainingAttempts.set(3);
        yield this.generateCaptcha();
      } catch (error) {
        console.error("Failed to check CAPTCHA status:", error);
        console.log("Error occurred, showing CAPTCHA for security");
        this.isVisible.set(true);
        this.remainingAttempts.set(3);
        yield this.generateCaptcha();
      }
    });
  }
  // Method to force show CAPTCHA for testing
  forceShowCaptcha() {
    this.isVisible.set(true);
    this.remainingAttempts.set(3);
    this.generateCaptcha();
  }
  generateCaptcha() {
    return __async(this, null, function* () {
      if (this.isLocked())
        return;
      this.isLoading.set(true);
      this.errorMessage.set("");
      try {
        const response = yield this.http.post(`${environment.apiUrl}/captcha/generate`, {}).toPromise();
        if (response) {
          this.captchaData.set(response);
          this.captchaAnswer = "";
          if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
          }
          this.refreshTimer = setTimeout(() => {
            this.refreshCaptcha();
          }, 4 * 60 * 1e3);
        }
      } catch (error) {
        if (error.status === 429) {
          this.isLocked.set(true);
          this.lockMessage.set(error.error?.detail || "Account temporarily locked");
          this.isVisible.set(false);
        } else {
          this.errorMessage.set("Failed to load CAPTCHA. Please try again.");
          this.toast.show("Failed to load CAPTCHA", "error");
        }
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  refreshCaptcha() {
    return __async(this, null, function* () {
      yield this.generateCaptcha();
    });
  }
  // Public methods for parent component
  show() {
    this.checkCaptchaStatus();
  }
  checkStatus() {
    this.checkCaptchaStatus();
  }
  hide() {
    this.isVisible.set(false);
    this.captchaData.set(null);
    this.captchaAnswer = "";
    this.errorMessage.set("");
  }
  getCaptchaData() {
    if (this.captchaData() && this.captchaAnswer.trim()) {
      return {
        captcha_id: this.captchaData().captcha_id,
        captcha_answer: this.captchaAnswer
      };
    }
    return null;
  }
};
_CaptchaComponent.\u0275fac = function CaptchaComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CaptchaComponent)();
};
_CaptchaComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CaptchaComponent, selectors: [["app-captcha"]], decls: 1, vars: 1, consts: [["captchaInput", ""], ["class", "captcha-container", 4, "ngIf"], [1, "captcha-container"], [1, "captcha-header"], [1, "flex", "items-center", "gap-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-amber-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], [1, "text-sm", "font-medium", "text-amber-400"], [1, "text-xs", "text-neutral-400", "mt-1"], [1, "captcha-body"], [1, "captcha-image-container"], ["alt", "CAPTCHA", "class", "captcha-image", 3, "src", "loading", 4, "ngIf"], ["class", "captcha-loading", 4, "ngIf"], ["title", "Refresh CAPTCHA", 1, "captcha-refresh-btn", 3, "click", "disabled"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], [1, "captcha-input-container"], ["type", "text", "placeholder", "Enter the text above", 1, "captcha-input", 3, "ngModelChange", "ngModel", "disabled"], ["class", "captcha-error", 4, "ngIf"], ["class", "captcha-lock", 4, "ngIf"], ["alt", "CAPTCHA", 1, "captcha-image", 3, "src"], [1, "captcha-loading"], [1, "animate-spin", "w-6", "h-6", "border-2", "border-accent-400", "border-t-transparent", "rounded-full"], [1, "captcha-error"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-red-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "captcha-lock"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-red-400"], [1, "font-medium", "text-red-400"], [1, "text-sm", "text-neutral-400"]], template: function CaptchaComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CaptchaComponent_div_0_Template, 21, 8, "div", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("ngIf", ctx.isVisible());
  }
}, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.captcha-container[_ngcontent-%COMP%]    > [_ngcontent-%COMP%]:not([hidden])    ~ [_ngcontent-%COMP%]:not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1rem * var(--tw-space-y-reverse));\n}\n.captcha-container[_ngcontent-%COMP%] {\n  border-radius: 0.75rem;\n  border-width: 1px;\n  border-color: rgb(245 158 11 / 0.3);\n  background-color: rgb(15 20 26 / 0.6);\n  padding: 1rem;\n  --tw-backdrop-blur: blur(24px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n.captcha-header[_ngcontent-%COMP%] {\n  border-bottom-width: 1px;\n  border-color: rgb(255 255 255 / 0.1);\n  padding-bottom: 0.75rem;\n}\n.captcha-body[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.captcha-image-container[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 0%;\n}\n.captcha-image[_ngcontent-%COMP%] {\n  height: 5rem;\n  width: 100%;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(255 255 255 / 0.2);\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n  object-fit: contain;\n  filter: contrast(1.2) brightness(1.1);\n}\n.captcha-image.loading[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.captcha-loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.captcha-refresh-btn[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(255 255 255 / 0.1);\n  background-color: rgb(18 25 34 / 0.5);\n  padding: 0.5rem;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n.captcha-refresh-btn[_ngcontent-%COMP%]:hover {\n  --tw-scale-x: 1.05;\n  --tw-scale-y: 1.05;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n  border-color: rgb(245 158 11 / 0.3);\n  background-color: rgb(26 35 48 / 0.7);\n}\n.captcha-refresh-btn[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.captcha-input-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.captcha-input[_ngcontent-%COMP%] {\n  flex: 1 1 0%;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(255 255 255 / 0.2);\n  background-color: rgb(18 25 34 / 0.5);\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  --tw-text-opacity: 1;\n  color: rgb(245 245 245 / var(--tw-text-opacity, 1));\n}\n.captcha-input[_ngcontent-%COMP%]::placeholder {\n  --tw-placeholder-opacity: 1;\n  color: rgb(163 163 163 / var(--tw-placeholder-opacity, 1));\n}\n.captcha-input[_ngcontent-%COMP%] {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n.captcha-input[_ngcontent-%COMP%]:focus {\n  border-color: rgb(245 158 11 / 0.5);\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-color: rgb(245 158 11 / 0.5) ;\n}\n.captcha-submit-btn[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  background-image: linear-gradient(to right, var(--tw-gradient-stops));\n  --tw-gradient-from: #f59e0b var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(245 158 11 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n  --tw-gradient-to: #f97316 var(--tw-gradient-to-position);\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n.captcha-submit-btn[_ngcontent-%COMP%]:hover {\n  --tw-scale-x: 1.05;\n  --tw-scale-y: 1.05;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n  --tw-gradient-from: #d97706 var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(217 119 6 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n  --tw-gradient-to: #ea580c var(--tw-gradient-to-position) ;\n}\n.captcha-submit-btn[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.captcha-submit-btn[_ngcontent-%COMP%]:hover:disabled {\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.captcha-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(239 68 68 / 0.2);\n  background-color: rgb(239 68 68 / 0.1);\n  padding: 0.75rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  --tw-text-opacity: 1;\n  color: rgb(248 113 113 / var(--tw-text-opacity, 1));\n}\n.captcha-success[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(16 185 129 / 0.2);\n  background-color: rgb(16 185 129 / 0.1);\n  padding: 0.75rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  --tw-text-opacity: 1;\n  color: rgb(52 211 153 / var(--tw-text-opacity, 1));\n}\n.captcha-lock[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(239 68 68 / 0.2);\n  background-color: rgb(239 68 68 / 0.1);\n  padding: 1rem;\n}\n/*# sourceMappingURL=captcha.component.css.map */"] });
var CaptchaComponent = _CaptchaComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CaptchaComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-captcha", imports: [CommonModule, FormsModule], template: `
    <div *ngIf="isVisible()" class="captcha-container">
      <div class="captcha-header">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <span class="text-sm font-medium text-amber-400">
            Security Verification Required
          </span>
        </div>
        <p class="text-xs text-neutral-400 mt-1">
          CAPTCHA verification is required for all login attempts. You have {{ remainingAttempts() }} attempts remaining.
        </p>
      </div>

      <div class="captcha-body">
        <!-- CAPTCHA Image -->
        <div class="captcha-image-container">
          <img 
            *ngIf="captchaData()" 
            [src]="'data:image/png;base64,' + captchaData()?.captcha_image" 
            alt="CAPTCHA"
            class="captcha-image"
            [class.loading]="isLoading()">
          
          <!-- Loading State -->
          <div *ngIf="isLoading()" class="captcha-loading">
            <div class="animate-spin w-6 h-6 border-2 border-accent-400 border-t-transparent rounded-full"></div>
          </div>
        </div>

        <!-- Refresh Button -->
        <button 
          (click)="refreshCaptcha()"
          [disabled]="isLoading()"
          class="captcha-refresh-btn"
          title="Refresh CAPTCHA">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>

      <!-- Input Field -->
      <div class="captcha-input-container">
        <input 
          type="text" 
          [(ngModel)]="captchaAnswer"
          placeholder="Enter the text above"
          class="captcha-input"
          [disabled]="isLoading()"
          #captchaInput>
      </div>

      <!-- Error Message -->
      <div *ngIf="errorMessage()" class="captcha-error">
        <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ errorMessage() }}</span>
      </div>

      <!-- Lock Message -->
      <div *ngIf="isLocked()" class="captcha-lock">
        <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <div>
          <p class="font-medium text-red-400">Account Temporarily Locked</p>
          <p class="text-sm text-neutral-400">{{ lockMessage() }}</p>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;b8247f2839e3b1d35771673d9cf1e6f9142630a1899828ab212304879921e5d5;C:/Work/frontend/src/app/shared/components/captcha/captcha.component.ts */\n.captcha-container > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1rem * var(--tw-space-y-reverse));\n}\n.captcha-container {\n  border-radius: 0.75rem;\n  border-width: 1px;\n  border-color: rgb(245 158 11 / 0.3);\n  background-color: rgb(15 20 26 / 0.6);\n  padding: 1rem;\n  --tw-backdrop-blur: blur(24px);\n  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\n}\n.captcha-header {\n  border-bottom-width: 1px;\n  border-color: rgb(255 255 255 / 0.1);\n  padding-bottom: 0.75rem;\n}\n.captcha-body {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.captcha-image-container {\n  position: relative;\n  flex: 1 1 0%;\n}\n.captcha-image {\n  height: 5rem;\n  width: 100%;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(255 255 255 / 0.2);\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n  object-fit: contain;\n  filter: contrast(1.2) brightness(1.1);\n}\n.captcha-image.loading {\n  opacity: 0.5;\n}\n.captcha-loading {\n  position: absolute;\n  inset: 0px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.captcha-refresh-btn {\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(255 255 255 / 0.1);\n  background-color: rgb(18 25 34 / 0.5);\n  padding: 0.5rem;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n.captcha-refresh-btn:hover {\n  --tw-scale-x: 1.05;\n  --tw-scale-y: 1.05;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n  border-color: rgb(245 158 11 / 0.3);\n  background-color: rgb(26 35 48 / 0.7);\n}\n.captcha-refresh-btn:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.captcha-input-container {\n  display: flex;\n  gap: 0.5rem;\n}\n.captcha-input {\n  flex: 1 1 0%;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(255 255 255 / 0.2);\n  background-color: rgb(18 25 34 / 0.5);\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  --tw-text-opacity: 1;\n  color: rgb(245 245 245 / var(--tw-text-opacity, 1));\n}\n.captcha-input::placeholder {\n  --tw-placeholder-opacity: 1;\n  color: rgb(163 163 163 / var(--tw-placeholder-opacity, 1));\n}\n.captcha-input {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n.captcha-input:focus {\n  border-color: rgb(245 158 11 / 0.5);\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-color: rgb(245 158 11 / 0.5) ;\n}\n.captcha-submit-btn {\n  border-radius: 0.5rem;\n  background-image: linear-gradient(to right, var(--tw-gradient-stops));\n  --tw-gradient-from: #f59e0b var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(245 158 11 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n  --tw-gradient-to: #f97316 var(--tw-gradient-to-position);\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n.captcha-submit-btn:hover {\n  --tw-scale-x: 1.05;\n  --tw-scale-y: 1.05;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n  --tw-gradient-from: #d97706 var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(217 119 6 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n  --tw-gradient-to: #ea580c var(--tw-gradient-to-position) ;\n}\n.captcha-submit-btn:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.captcha-submit-btn:hover:disabled {\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.captcha-error {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(239 68 68 / 0.2);\n  background-color: rgb(239 68 68 / 0.1);\n  padding: 0.75rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  --tw-text-opacity: 1;\n  color: rgb(248 113 113 / var(--tw-text-opacity, 1));\n}\n.captcha-success {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(16 185 129 / 0.2);\n  background-color: rgb(16 185 129 / 0.1);\n  padding: 0.75rem;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  --tw-text-opacity: 1;\n  color: rgb(52 211 153 / var(--tw-text-opacity, 1));\n}\n.captcha-lock {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  border-color: rgb(239 68 68 / 0.2);\n  background-color: rgb(239 68 68 / 0.1);\n  padding: 1rem;\n}\n/*# sourceMappingURL=captcha.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CaptchaComponent, { className: "CaptchaComponent", filePath: "src/app/shared/components/captcha/captcha.component.ts", lineNumber: 160 });
})();

// src/app/features/auth/login.component.ts
function LoginComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 28);
    \u0275\u0275element(2, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("email"), " ");
  }
}
function LoginComponent__svg_svg_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 30);
    \u0275\u0275element(1, "path", 31)(2, "path", 32);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent__svg_svg_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 30);
    \u0275\u0275element(1, "path", 33);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 28);
    \u0275\u0275element(2, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("password"), " ");
  }
}
function LoginComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 34);
  }
}
function LoginComponent__svg_svg_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 36);
    \u0275\u0275elementEnd();
  }
}
var _LoginComponent = class _LoginComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.fb = inject(FormBuilder);
    this.http = inject(HttpClient);
    this.isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
    this.showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
    this.captchaData = signal(null, ...ngDevMode ? [{ debugName: "captchaData" }] : []);
    this.initTimeout = null;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
    this.captchaEventHandler = this.handleCaptchaSuccess.bind(this);
  }
  ngOnInit() {
    window.addEventListener("captchaSuccess", this.captchaEventHandler);
    this.initTimeout = setTimeout(() => {
      this.captchaComponent?.checkStatus();
    }, 100);
  }
  ngOnDestroy() {
    window.removeEventListener("captchaSuccess", this.captchaEventHandler);
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
      this.initTimeout = null;
    }
  }
  handleCaptchaSuccess(event) {
    const customEvent = event;
    const captchaData = customEvent.detail;
    this.captchaData.set({
      captcha_id: captchaData.captcha_id,
      captcha_answer: ""
      // This will be set when user submits the form
    });
  }
  // Reset functionality removed for security - attempts can only be reset on successful login
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }
  getFieldError(fieldName) {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"])
        return `${fieldName} is required`;
      if (field.errors["email"])
        return "Please enter a valid email";
      if (field.errors["minlength"])
        return `${fieldName} must be at least 6 characters`;
    }
    return "";
  }
  submit() {
    return __async(this, null, function* () {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        this.toast.show("Please fix the errors below", "error");
        return;
      }
      const captchaData = this.captchaComponent?.getCaptchaData();
      if (!captchaData || !captchaData.captcha_answer.trim()) {
        this.toast.show("Please solve the CAPTCHA", "error");
        return;
      }
      try {
        this.isLoading.set(true);
        const loginData = {
          email: this.email?.value,
          password: this.password?.value,
          captcha_id: captchaData.captcha_id,
          captcha_answer: captchaData.captcha_answer
        };
        yield this.auth.login(loginData.email, loginData.password, captchaData);
        this.toast.show("Welcome back!", "success");
        this.captchaComponent?.refreshCaptcha();
        const returnUrl = sessionStorage.getItem("returnUrl");
        if (returnUrl) {
          sessionStorage.removeItem("returnUrl");
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigateByUrl("/chat");
        }
      } catch (error) {
        const httpError = error;
        this.captchaComponent?.refreshCaptcha();
        if (httpError.status === 400 && httpError.error?.detail?.includes("CAPTCHA")) {
          this.toast.show(httpError.error.detail, "error");
        } else if (httpError.status === 401) {
          const errorMsg = httpError.error?.detail || "Invalid credentials";
          this.toast.show(errorMsg, "error");
        } else if (httpError.status === 429) {
          this.toast.show(httpError.error?.detail || "Too many attempts. Please try again later.", "error");
        } else {
          this.toast.show("Login failed. Please try again.", "error");
        }
      } finally {
        this.isLoading.set(false);
      }
    });
  }
};
_LoginComponent.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginComponent)();
};
_LoginComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], viewQuery: function LoginComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(CaptchaComponent, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.captchaComponent = _t.first);
  }
}, decls: 41, vars: 18, consts: [[1, "mx-auto", "max-w-md", "px-4"], [1, "absolute", "inset-0", "overflow-hidden"], [1, "absolute", "top-1/4", "left-1/4", "w-64", "h-64", "bg-accent-500/10", "rounded-full", "blur-3xl", "animate-float"], [1, "absolute", "bottom-1/4", "right-1/4", "w-48", "h-48", "bg-purple-500/10", "rounded-full", "blur-3xl", "animate-float", 2, "animation-delay", "1s"], [1, "relative", "z-10"], [1, "text-center", "mb-8"], [1, "text-3xl", "font-bold", "text-gradient", "mb-2"], [1, "text-neutral-400"], [1, "card-premium", "p-8"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "block", "text-sm", "font-medium", "text-neutral-300", "mb-2"], [1, "relative"], ["type", "email", "formControlName", "email", "placeholder", "Enter your email", 1, "input", "w-full", "pr-10"], [1, "absolute", "right-3", "top-1/2", "transform", "-translate-y-1/2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-neutral-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"], ["class", "mt-1 text-sm text-red-400 flex items-center gap-1", 4, "ngIf"], ["formControlName", "password", "placeholder", "Enter your password", 1, "input", "w-full", "pr-12", 3, "type"], ["type", "button", 1, "absolute", "right-3", "top-1/2", "transform", "-translate-y-1/2", "text-neutral-400", "hover:text-accent-300", "transition-colors", 3, "click"], ["class", "w-5 h-5", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "w-full", "py-3", "text-lg", "font-medium", 3, "disabled"], ["class", "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2", 4, "ngIf"], ["class", "w-5 h-5 mr-2", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], [1, "mt-6", "pt-6", "border-t", "border-white/10"], [1, "text-center", "text-sm", "text-neutral-400"], [1, "mb-2"], ["routerLink", "/register", 1, "text-accent-400", "hover:text-accent-300", "transition-colors", "font-medium"], [1, "mt-1", "text-sm", "text-red-400", "flex", "items-center", "gap-1"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"], [1, "w-5", "h-5", "border-2", "border-white", "border-t-transparent", "rounded-full", "animate-spin", "mr-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "mr-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"]], template: function LoginComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "div", 2)(3, "div", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "h1", 6);
    \u0275\u0275text(7, "Welcome Back");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 7);
    \u0275\u0275text(9, "Sign in to continue your AI conversations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 8)(11, "form", 9);
    \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_11_listener() {
      return ctx.submit();
    });
    \u0275\u0275elementStart(12, "div")(13, "label", 10);
    \u0275\u0275text(14, " Email Address ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 11);
    \u0275\u0275element(16, "input", 12);
    \u0275\u0275elementStart(17, "div", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 14);
    \u0275\u0275element(19, "path", 15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(20, LoginComponent_div_20_Template, 4, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "div")(22, "label", 10);
    \u0275\u0275text(23, " Password ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 11);
    \u0275\u0275element(25, "input", 17);
    \u0275\u0275elementStart(26, "button", 18);
    \u0275\u0275listener("click", function LoginComponent_Template_button_click_26_listener() {
      return ctx.togglePasswordVisibility();
    });
    \u0275\u0275template(27, LoginComponent__svg_svg_27_Template, 3, 0, "svg", 19)(28, LoginComponent__svg_svg_28_Template, 2, 0, "svg", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(29, LoginComponent_div_29_Template, 4, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "app-captcha");
    \u0275\u0275elementStart(31, "button", 20);
    \u0275\u0275template(32, LoginComponent_div_32_Template, 1, 0, "div", 21)(33, LoginComponent__svg_svg_33_Template, 2, 0, "svg", 22);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 23)(36, "div", 24)(37, "p", 25);
    \u0275\u0275text(38, "Don't have an account?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "a", 26);
    \u0275\u0275text(40, " Create an account ");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(11);
    \u0275\u0275property("formGroup", ctx.loginForm);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("border-red-500", (ctx.email == null ? null : ctx.email.invalid) && (ctx.email == null ? null : ctx.email.touched))("border-accent-500", (ctx.email == null ? null : ctx.email.valid) && (ctx.email == null ? null : ctx.email.touched));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.getFieldError("email"));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("border-red-500", (ctx.password == null ? null : ctx.password.invalid) && (ctx.password == null ? null : ctx.password.touched))("border-accent-500", (ctx.password == null ? null : ctx.password.valid) && (ctx.password == null ? null : ctx.password.touched));
    \u0275\u0275property("type", ctx.showPassword() ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx.showPassword());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.showPassword());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.getFieldError("password"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.isLoading() || ctx.loginForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isLoading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.isLoading() ? "Signing In..." : "Sign In", " ");
  }
}, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName, NgIf, RouterModule, RouterLink, CaptchaComponent], encapsulation: 2 });
var LoginComponent = _LoginComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-login", imports: [FormsModule, ReactiveFormsModule, NgIf, RouterModule, CaptchaComponent], template: `<div class="mx-auto max-w-md px-4">
  <!-- Animated Background -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>
  </div>

  <div class="relative z-10">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
      <p class="text-neutral-400">Sign in to continue your AI conversations</p>
    </div>

    <!-- Login Form -->
    <div class="card-premium p-8">
      <form [formGroup]="loginForm" (ngSubmit)="submit()" class="space-y-6">
        <!-- Email Field -->
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">
            Email Address
          </label>
          <div class="relative">
            <input 
              type="email" 
              formControlName="email"
              class="input w-full pr-10"
              placeholder="Enter your email"
              [class.border-red-500]="email?.invalid && email?.touched"
              [class.border-accent-500]="email?.valid && email?.touched">
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
            </div>
          </div>
          <div *ngIf="getFieldError('email')" class="mt-1 text-sm text-red-400 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ getFieldError('email') }}
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">
            Password
          </label>
          <div class="relative">
            <input 
              [type]="showPassword() ? 'text' : 'password'"
              formControlName="password"
              class="input w-full pr-12"
              placeholder="Enter your password"
              [class.border-red-500]="password?.invalid && password?.touched"
              [class.border-accent-500]="password?.valid && password?.touched">
            <button 
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-accent-300 transition-colors"
              (click)="togglePasswordVisibility()">
              <svg *ngIf="!showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <svg *ngIf="showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
              </svg>
            </button>
          </div>
          <div *ngIf="getFieldError('password')" class="mt-1 text-sm text-red-400 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ getFieldError('password') }}
          </div>
        </div>

        <!-- CAPTCHA Component -->
        <app-captcha></app-captcha>

        <!-- CAPTCHA is always required for security -->

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="btn btn-primary w-full py-3 text-lg font-medium"
          [disabled]="isLoading() || loginForm.invalid">
          <div *ngIf="isLoading()" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          <svg *ngIf="!isLoading()" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          {{ isLoading() ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-6 pt-6 border-t border-white/10">
        <div class="text-center text-sm text-neutral-400">
          <p class="mb-2">Don't have an account?</p>
          <a routerLink="/register" class="text-accent-400 hover:text-accent-300 transition-colors font-medium">
            Create an account
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
` }]
  }], () => [], { captchaComponent: [{
    type: ViewChild,
    args: [CaptchaComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/login.component.ts", lineNumber: 20 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-CHKY7MWA.js.map
