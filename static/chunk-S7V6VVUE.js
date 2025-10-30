import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-J6AQHLRA.js";
import {
  AuthService,
  ToastService
} from "./chunk-OPGT5SRN.js";
import {
  Component,
  NgIf,
  Router,
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
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-SEPIUDJB.js";

// src/app/features/auth/register.component.ts
function RegisterComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "path", 50);
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
function RegisterComponent__svg_svg_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 51);
    \u0275\u0275element(1, "path", 52)(2, "path", 53);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent__svg_svg_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 51);
    \u0275\u0275element(1, "path", 54);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "path", 50);
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
function RegisterComponent__svg_svg_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 51);
    \u0275\u0275element(1, "path", 52)(2, "path", 53);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent__svg_svg_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 51);
    \u0275\u0275element(1, "path", 54);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 49);
    \u0275\u0275element(2, "path", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("confirmPassword"), " ");
  }
}
function RegisterComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1, " You must accept the terms and conditions ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 56);
  }
}
function RegisterComponent__svg_svg_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 57);
    \u0275\u0275element(1, "path", 58);
    \u0275\u0275elementEnd();
  }
}
var _RegisterComponent = class _RegisterComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.fb = inject(FormBuilder);
    this.isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
    this.showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
    this.showConfirmPassword = signal(false, ...ngDevMode ? [{ debugName: "showConfirmPassword" }] : []);
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      ]],
      confirmPassword: ["", [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  get acceptTerms() {
    return this.registerForm.get("acceptTerms");
  }
  passwordMatchValidator(form) {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }
  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.update((v) => !v);
  }
  getFieldError(fieldName) {
    const field = this.registerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"])
        return `${fieldName} is required`;
      if (field.errors["email"])
        return "Please enter a valid email";
      if (field.errors["minlength"])
        return `${fieldName} must be at least ${field.errors["minlength"].requiredLength} characters`;
      if (field.errors["pattern"])
        return `${fieldName} must contain at least one uppercase letter, one lowercase letter, one number, and one special character`;
      if (field.errors["passwordMismatch"])
        return "Passwords do not match";
      if (field.errors["requiredTrue"])
        return "You must accept the terms and conditions";
    }
    return "";
  }
  submit() {
    return __async(this, null, function* () {
      if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        this.toast.show("Please fix the errors below", "error");
        return;
      }
      try {
        this.isLoading.set(true);
        yield this.auth.signup(this.email?.value, this.password?.value);
        this.toast.show("Account created successfully! Please sign in.", "success");
        this.router.navigateByUrl("/login");
      } catch (e) {
        this.toast.show("Registration failed. Please try again.", "error");
      } finally {
        this.isLoading.set(false);
      }
    });
  }
};
_RegisterComponent.\u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RegisterComponent)();
};
_RegisterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 84, vars: 27, consts: [[1, "mx-auto", "max-w-md", "px-4"], [1, "absolute", "inset-0", "overflow-hidden"], [1, "absolute", "top-1/4", "left-1/4", "w-64", "h-64", "bg-accent-500/10", "rounded-full", "blur-3xl", "animate-float"], [1, "absolute", "bottom-1/4", "right-1/4", "w-48", "h-48", "bg-purple-500/10", "rounded-full", "blur-3xl", "animate-float", 2, "animation-delay", "1s"], [1, "relative", "z-10"], [1, "text-center", "mb-8"], [1, "text-3xl", "font-bold", "text-gradient", "mb-2"], [1, "text-neutral-400"], [1, "card-premium", "p-8"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "block", "text-sm", "font-medium", "text-neutral-300", "mb-2"], [1, "relative"], ["type", "email", "formControlName", "email", "placeholder", "Enter your email", 1, "input", "w-full", "pr-10"], [1, "absolute", "right-3", "top-1/2", "transform", "-translate-y-1/2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-neutral-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"], ["class", "mt-1 text-sm text-red-400 flex items-center gap-1", 4, "ngIf"], ["formControlName", "password", "placeholder", "Create a password", 1, "input", "w-full", "pr-12", 3, "type"], ["type", "button", 1, "absolute", "right-3", "top-1/2", "transform", "-translate-y-1/2", "text-neutral-400", "hover:text-accent-300", "transition-colors", 3, "click"], ["class", "w-5 h-5", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["formControlName", "confirmPassword", "placeholder", "Confirm your password", 1, "input", "w-full", "pr-12", 3, "type"], [1, "flex", "items-start", "gap-3"], ["type", "checkbox", "formControlName", "acceptTerms", "id", "acceptTerms", 1, "mt-1", "w-4", "h-4", "text-accent-500", "bg-ink-700", "border-white/20", "rounded", "focus:ring-accent-500", "focus:ring-2"], ["for", "acceptTerms", 1, "text-sm", "text-neutral-300"], ["href", "#", 1, "text-accent-400", "hover:text-accent-300", "transition-colors"], ["class", "text-sm text-red-400", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "w-full", "py-3", "text-lg", "font-medium", 3, "disabled"], ["class", "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2", 4, "ngIf"], ["class", "w-5 h-5 mr-2", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], [1, "mt-6", "pt-6", "border-t", "border-white/10"], [1, "text-center", "text-sm", "text-neutral-400"], [1, "mb-2"], ["routerLink", "/login", 1, "text-accent-400", "hover:text-accent-300", "transition-colors", "font-medium"], [1, "mt-8", "grid", "grid-cols-1", "md:grid-cols-3", "gap-4"], [1, "text-center", "p-4", "rounded-xl", "bg-gradient-to-r", "from-accent-500/10", "to-transparent", "border", "border-accent-500/20"], [1, "w-8", "h-8", "mx-auto", "mb-2", "rounded-full", "bg-accent-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-accent-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 10V3L4 14h7v7l9-11h-7z"], [1, "text-sm", "font-medium", "text-neutral-200", "mb-1"], [1, "text-xs", "text-neutral-400"], [1, "text-center", "p-4", "rounded-xl", "bg-gradient-to-r", "from-purple-500/10", "to-transparent", "border", "border-purple-500/20"], [1, "w-8", "h-8", "mx-auto", "mb-2", "rounded-full", "bg-purple-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-purple-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], [1, "text-center", "p-4", "rounded-xl", "bg-gradient-to-r", "from-emerald-500/10", "to-transparent", "border", "border-emerald-500/20"], [1, "w-8", "h-8", "mx-auto", "mb-2", "rounded-full", "bg-emerald-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-emerald-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"], [1, "mt-1", "text-sm", "text-red-400", "flex", "items-center", "gap-1"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"], [1, "text-sm", "text-red-400"], [1, "w-5", "h-5", "border-2", "border-white", "border-t-transparent", "rounded-full", "animate-spin", "mr-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "mr-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"]], template: function RegisterComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "div", 2)(3, "div", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "h1", 6);
    \u0275\u0275text(7, "Create Account");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 7);
    \u0275\u0275text(9, "Join our AI-powered chat platform");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 8)(11, "form", 9);
    \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_11_listener() {
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
    \u0275\u0275template(20, RegisterComponent_div_20_Template, 4, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "div")(22, "label", 10);
    \u0275\u0275text(23, " Password ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 11);
    \u0275\u0275element(25, "input", 17);
    \u0275\u0275elementStart(26, "button", 18);
    \u0275\u0275listener("click", function RegisterComponent_Template_button_click_26_listener() {
      return ctx.togglePasswordVisibility();
    });
    \u0275\u0275template(27, RegisterComponent__svg_svg_27_Template, 3, 0, "svg", 19)(28, RegisterComponent__svg_svg_28_Template, 2, 0, "svg", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(29, RegisterComponent_div_29_Template, 4, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div")(31, "label", 10);
    \u0275\u0275text(32, " Confirm Password ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 11);
    \u0275\u0275element(34, "input", 20);
    \u0275\u0275elementStart(35, "button", 18);
    \u0275\u0275listener("click", function RegisterComponent_Template_button_click_35_listener() {
      return ctx.toggleConfirmPasswordVisibility();
    });
    \u0275\u0275template(36, RegisterComponent__svg_svg_36_Template, 3, 0, "svg", 19)(37, RegisterComponent__svg_svg_37_Template, 2, 0, "svg", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, RegisterComponent_div_38_Template, 4, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 21);
    \u0275\u0275element(40, "input", 22);
    \u0275\u0275elementStart(41, "label", 23);
    \u0275\u0275text(42, " I agree to the ");
    \u0275\u0275elementStart(43, "a", 24);
    \u0275\u0275text(44, "Terms of Service");
    \u0275\u0275elementEnd();
    \u0275\u0275text(45, " and ");
    \u0275\u0275elementStart(46, "a", 24);
    \u0275\u0275text(47, "Privacy Policy");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(48, RegisterComponent_div_48_Template, 2, 0, "div", 25);
    \u0275\u0275elementStart(49, "button", 26);
    \u0275\u0275template(50, RegisterComponent_div_50_Template, 1, 0, "div", 27)(51, RegisterComponent__svg_svg_51_Template, 2, 0, "svg", 28);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 29)(54, "div", 30)(55, "p", 31);
    \u0275\u0275text(56, "Already have an account?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "a", 32);
    \u0275\u0275text(58, " Sign in here ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(59, "div", 33)(60, "div", 34)(61, "div", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(62, "svg", 36);
    \u0275\u0275element(63, "path", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(64, "h3", 38);
    \u0275\u0275text(65, "AI-Powered");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "p", 39);
    \u0275\u0275text(67, "Advanced AI assistants for every need");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 40)(69, "div", 41);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(70, "svg", 42);
    \u0275\u0275element(71, "path", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(72, "h3", 38);
    \u0275\u0275text(73, "Secure");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "p", 39);
    \u0275\u0275text(75, "Your data is protected and private");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 44)(77, "div", 45);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(78, "svg", 46);
    \u0275\u0275element(79, "path", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(80, "h3", 38);
    \u0275\u0275text(81, "Intuitive");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "p", 39);
    \u0275\u0275text(83, "Beautiful, modern interface");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(11);
    \u0275\u0275property("formGroup", ctx.registerForm);
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
    \u0275\u0275advance(5);
    \u0275\u0275classProp("border-red-500", (ctx.confirmPassword == null ? null : ctx.confirmPassword.invalid) && (ctx.confirmPassword == null ? null : ctx.confirmPassword.touched))("border-accent-500", (ctx.confirmPassword == null ? null : ctx.confirmPassword.valid) && (ctx.confirmPassword == null ? null : ctx.confirmPassword.touched));
    \u0275\u0275property("type", ctx.showConfirmPassword() ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx.showConfirmPassword());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.showConfirmPassword());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.getFieldError("confirmPassword"));
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", (ctx.acceptTerms == null ? null : ctx.acceptTerms.invalid) && (ctx.acceptTerms == null ? null : ctx.acceptTerms.touched));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.isLoading() || ctx.registerForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isLoading());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.isLoading() ? "Creating Account..." : "Create Account", " ");
  }
}, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName, NgIf], encapsulation: 2 });
var RegisterComponent = _RegisterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-register", imports: [FormsModule, ReactiveFormsModule, NgIf], template: `<div class="mx-auto max-w-md px-4">\r
  <!-- Animated Background -->\r
  <div class="absolute inset-0 overflow-hidden">\r
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float"></div>\r
    <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>\r
  </div>\r
\r
  <div class="relative z-10">\r
    <!-- Header -->\r
    <div class="text-center mb-8">\r
      <h1 class="text-3xl font-bold text-gradient mb-2">Create Account</h1>\r
      <p class="text-neutral-400">Join our AI-powered chat platform</p>\r
    </div>\r
\r
    <!-- Registration Form -->\r
    <div class="card-premium p-8">\r
      <form [formGroup]="registerForm" (ngSubmit)="submit()" class="space-y-6">\r
        <!-- Email Field -->\r
        <div>\r
          <label class="block text-sm font-medium text-neutral-300 mb-2">\r
            Email Address\r
          </label>\r
          <div class="relative">\r
            <input \r
              type="email" \r
              formControlName="email"\r
              class="input w-full pr-10"\r
              placeholder="Enter your email"\r
              [class.border-red-500]="email?.invalid && email?.touched"\r
              [class.border-accent-500]="email?.valid && email?.touched">\r
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2">\r
              <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>\r
              </svg>\r
            </div>\r
          </div>\r
          <div *ngIf="getFieldError('email')" class="mt-1 text-sm text-red-400 flex items-center gap-1">\r
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>\r
            </svg>\r
            {{ getFieldError('email') }}\r
          </div>\r
        </div>\r
\r
        <!-- Password Field -->\r
        <div>\r
          <label class="block text-sm font-medium text-neutral-300 mb-2">\r
            Password\r
          </label>\r
          <div class="relative">\r
            <input \r
              [type]="showPassword() ? 'text' : 'password'"\r
              formControlName="password"\r
              class="input w-full pr-12"\r
              placeholder="Create a password"\r
              [class.border-red-500]="password?.invalid && password?.touched"\r
              [class.border-accent-500]="password?.valid && password?.touched">\r
            <button \r
              type="button"\r
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-accent-300 transition-colors"\r
              (click)="togglePasswordVisibility()">\r
              <svg *ngIf="!showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>\r
              </svg>\r
              <svg *ngIf="showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>\r
              </svg>\r
            </button>\r
          </div>\r
          <div *ngIf="getFieldError('password')" class="mt-1 text-sm text-red-400 flex items-center gap-1">\r
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>\r
            </svg>\r
            {{ getFieldError('password') }}\r
          </div>\r
        </div>\r
\r
        <!-- Confirm Password Field -->\r
        <div>\r
          <label class="block text-sm font-medium text-neutral-300 mb-2">\r
            Confirm Password\r
          </label>\r
          <div class="relative">\r
            <input \r
              [type]="showConfirmPassword() ? 'text' : 'password'"\r
              formControlName="confirmPassword"\r
              class="input w-full pr-12"\r
              placeholder="Confirm your password"\r
              [class.border-red-500]="confirmPassword?.invalid && confirmPassword?.touched"\r
              [class.border-accent-500]="confirmPassword?.valid && confirmPassword?.touched">\r
            <button \r
              type="button"\r
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-accent-300 transition-colors"\r
              (click)="toggleConfirmPasswordVisibility()">\r
              <svg *ngIf="!showConfirmPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>\r
              </svg>\r
              <svg *ngIf="showConfirmPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>\r
              </svg>\r
            </button>\r
          </div>\r
          <div *ngIf="getFieldError('confirmPassword')" class="mt-1 text-sm text-red-400 flex items-center gap-1">\r
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>\r
            </svg>\r
            {{ getFieldError('confirmPassword') }}\r
          </div>\r
        </div>\r
\r
        <!-- Terms and Conditions -->\r
        <div class="flex items-start gap-3">\r
          <input \r
            type="checkbox" \r
            formControlName="acceptTerms"\r
            id="acceptTerms"\r
            class="mt-1 w-4 h-4 text-accent-500 bg-ink-700 border-white/20 rounded focus:ring-accent-500 focus:ring-2">\r
          <label for="acceptTerms" class="text-sm text-neutral-300">\r
            I agree to the \r
            <a href="#" class="text-accent-400 hover:text-accent-300 transition-colors">Terms of Service</a> \r
            and \r
            <a href="#" class="text-accent-400 hover:text-accent-300 transition-colors">Privacy Policy</a>\r
          </label>\r
        </div>\r
        <div *ngIf="acceptTerms?.invalid && acceptTerms?.touched" class="text-sm text-red-400">\r
          You must accept the terms and conditions\r
        </div>\r
\r
        <!-- Submit Button -->\r
        <button \r
          type="submit" \r
          class="btn btn-primary w-full py-3 text-lg font-medium"\r
          [disabled]="isLoading() || registerForm.invalid">\r
          <div *ngIf="isLoading()" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>\r
          <svg *ngIf="!isLoading()" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>\r
          </svg>\r
          {{ isLoading() ? 'Creating Account...' : 'Create Account' }}\r
        </button>\r
      </form>\r
\r
      <!-- Footer -->\r
      <div class="mt-6 pt-6 border-t border-white/10">\r
        <div class="text-center text-sm text-neutral-400">\r
          <p class="mb-2">Already have an account?</p>\r
          <a routerLink="/login" class="text-accent-400 hover:text-accent-300 transition-colors font-medium">\r
            Sign in here\r
          </a>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Features Preview -->\r
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">\r
      <div class="text-center p-4 rounded-xl bg-gradient-to-r from-accent-500/10 to-transparent border border-accent-500/20">\r
        <div class="w-8 h-8 mx-auto mb-2 rounded-full bg-accent-500/20 flex items-center justify-center">\r
          <svg class="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>\r
          </svg>\r
        </div>\r
        <h3 class="text-sm font-medium text-neutral-200 mb-1">AI-Powered</h3>\r
        <p class="text-xs text-neutral-400">Advanced AI assistants for every need</p>\r
      </div>\r
      \r
      <div class="text-center p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">\r
        <div class="w-8 h-8 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center">\r
          <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>\r
          </svg>\r
        </div>\r
        <h3 class="text-sm font-medium text-neutral-200 mb-1">Secure</h3>\r
        <p class="text-xs text-neutral-400">Your data is protected and private</p>\r
      </div>\r
      \r
      <div class="text-center p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">\r
        <div class="w-8 h-8 mx-auto mb-2 rounded-full bg-emerald-500/20 flex items-center justify-center">\r
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>\r
          </svg>\r
        </div>\r
        <h3 class="text-sm font-medium text-neutral-200 mb-1">Intuitive</h3>\r
        <p class="text-xs text-neutral-400">Beautiful, modern interface</p>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/features/auth/register.component.ts", lineNumber: 14 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-S7V6VVUE.js.map
