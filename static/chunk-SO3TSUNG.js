import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
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
  Injectable,
  Router,
  __async,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SEPIUDJB.js";

// src/app/core/services/user.service.ts
var _UserService = class _UserService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = `${environment.apiUrl}/users`;
  }
  getProfile() {
    return __async(this, null, function* () {
      return this.http.get(`${this.baseUrl}/me`).toPromise();
    });
  }
  updateProfile(profile) {
    return __async(this, null, function* () {
      return this.http.put(`${this.baseUrl}/me`, profile).toPromise();
    });
  }
  changePassword(currentPassword, newPassword) {
    return __async(this, null, function* () {
      return this.http.put(`${this.baseUrl}/me/password`, {
        currentPassword,
        newPassword
      }).toPromise();
    });
  }
  getStats() {
    return __async(this, null, function* () {
      return this.http.get(`${this.baseUrl}/me/stats`).toPromise();
    });
  }
  exportData() {
    return __async(this, null, function* () {
      return this.http.post(`${this.baseUrl}/me/export`, {}).toPromise();
    });
  }
  deleteAccount() {
    return __async(this, null, function* () {
      return this.http.delete(`${this.baseUrl}/me`).toPromise();
    });
  }
};
_UserService.\u0275fac = function UserService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UserService)();
};
_UserService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
var UserService = _UserService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/profile/profile.component.ts
var _c0 = () => ({ updateOn: "change" });
var _ProfileComponent = class _ProfileComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.toast = inject(ToastService);
    this.userService = inject(UserService);
    this.firstName = signal("", ...ngDevMode ? [{ debugName: "firstName" }] : []);
    this.lastName = signal("", ...ngDevMode ? [{ debugName: "lastName" }] : []);
    this.bio = signal("", ...ngDevMode ? [{ debugName: "bio" }] : []);
    this.currentPassword = signal("", ...ngDevMode ? [{ debugName: "currentPassword" }] : []);
    this.newPassword = signal("", ...ngDevMode ? [{ debugName: "newPassword" }] : []);
    this.confirmPassword = signal("", ...ngDevMode ? [{ debugName: "confirmPassword" }] : []);
    this.totalConversations = signal(0, ...ngDevMode ? [{ debugName: "totalConversations" }] : []);
    this.totalMessages = signal(0, ...ngDevMode ? [{ debugName: "totalMessages" }] : []);
    this.memberSince = signal("", ...ngDevMode ? [{ debugName: "memberSince" }] : []);
    this.profile = signal(null, ...ngDevMode ? [{ debugName: "profile" }] : []);
  }
  getUserEmail() {
    return this.auth.currentUser() || "guest@example.com";
  }
  getUserInitial() {
    const email = this.getUserEmail();
    return email.charAt(0).toUpperCase();
  }
  updateProfile() {
    return __async(this, null, function* () {
      try {
        const profileUpdate = {
          firstName: this.firstName(),
          lastName: this.lastName(),
          bio: this.bio()
        };
        const updatedProfile = yield this.userService.updateProfile(profileUpdate);
        this.profile.set(updatedProfile);
        this.toast.show("Profile updated successfully", "success");
      } catch (error) {
        this.toast.show("Failed to update profile", "error");
      }
    });
  }
  updatePassword() {
    return __async(this, null, function* () {
      if (this.newPassword() !== this.confirmPassword()) {
        this.toast.show("Passwords do not match", "error");
        return;
      }
      if (this.newPassword().length < 6) {
        this.toast.show("Password must be at least 6 characters", "error");
        return;
      }
      try {
        yield this.userService.changePassword(this.currentPassword(), this.newPassword());
        this.toast.show("Password updated successfully", "success");
        this.currentPassword.set("");
        this.newPassword.set("");
        this.confirmPassword.set("");
      } catch (error) {
        this.toast.show("Failed to update password", "error");
      }
    });
  }
  deleteAccount() {
    return __async(this, null, function* () {
      if (confirm("Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently delete all your data.")) {
        try {
          yield this.userService.deleteAccount();
          this.toast.show("Account deleted successfully", "success");
          this.router.navigateByUrl("/login");
        } catch (error) {
          this.toast.show("Failed to delete account", "error");
        }
      }
    });
  }
  changeAvatar() {
    this.toast.show("Avatar upload coming soon", "info");
  }
  goBackToChat() {
    this.router.navigateByUrl("/chat");
  }
  loadProfileData() {
    return __async(this, null, function* () {
      try {
        const [profile, stats] = yield Promise.all([
          this.userService.getProfile(),
          this.userService.getStats()
        ]);
        this.profile.set(profile);
        this.firstName.set(profile.firstName || "");
        this.lastName.set(profile.lastName || "");
        this.bio.set(profile.bio || "");
        this.totalConversations.set(stats.totalConversations);
        this.totalMessages.set(stats.totalMessages);
        this.memberSince.set(stats.memberSince);
      } catch (error) {
        console.error("Failed to load profile data:", error);
        this.firstName.set("John");
        this.lastName.set("Doe");
        this.bio.set("AI enthusiast and developer");
        this.totalConversations.set(127);
        this.totalMessages.set(2847);
        this.memberSince.set("7 days ago");
      }
    });
  }
  ngOnInit() {
    this.loadProfileData();
  }
};
_ProfileComponent.\u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ProfileComponent)();
};
_ProfileComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], decls: 124, vars: 23, consts: [[1, "max-w-4xl", "mx-auto", "px-4", "py-8"], [1, "mb-8"], [1, "flex", "items-center", "gap-4", "mb-4"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "rounded-lg", "bg-ink-700/50", "border", "border-white/10", "text-neutral-300", "hover:text-neutral-100", "hover:bg-ink-600/50", "transition-all", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 19l-7-7m0 0l7-7m-7 7h18"], [1, "text-3xl", "font-bold", "text-gradient", "mb-2"], [1, "text-neutral-400"], [1, "space-y-8"], [1, "card-premium", "p-6"], [1, "flex", "items-center", "gap-3", "mb-6"], [1, "w-10", "h-10", "rounded-xl", "bg-gradient-to-r", "from-accent-500/20", "to-purple-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-accent-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"], [1, "text-xl", "font-semibold", "text-neutral-100"], [1, "text-sm", "text-neutral-400"], [1, "flex", "items-start", "gap-6"], [1, "flex-shrink-0"], [1, "relative"], [1, "w-24", "h-24", "rounded-full", "bg-gradient-to-r", "from-accent-500", "to-purple-500", "flex", "items-center", "justify-center", "text-white", "text-2xl", "font-bold"], [1, "flex-1", "space-y-4"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-sm", "font-medium", "text-neutral-300", "mb-2"], ["type", "text", "placeholder", "Enter your first name", 1, "input", "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "text", "placeholder", "Enter your last name", 1, "input", "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "email", "readonly", "", 1, "input", "w-full", 3, "value"], ["placeholder", "Tell us about yourself", 1, "input", "w-full", "h-20", "resize-none", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "flex", "justify-end"], [1, "btn", "btn-primary", "px-6", "py-2", 3, "click"], [1, "w-10", "h-10", "rounded-xl", "bg-gradient-to-r", "from-emerald-500/20", "to-gold-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-emerald-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], [1, "space-y-6"], [1, "space-y-4"], [1, "text-sm", "font-medium", "text-neutral-200"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4"], ["type", "password", "placeholder", "Enter current password", 1, "input", "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "password", "placeholder", "Enter new password", 1, "input", "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "password", "placeholder", "Confirm new password", 1, "input", "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "w-10", "h-10", "rounded-xl", "bg-gradient-to-r", "from-purple-500/20", "to-emerald-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-purple-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6"], [1, "text-center", "p-4", "rounded-lg", "bg-gradient-to-r", "from-accent-500/10", "to-purple-500/10", "border", "border-accent-500/20"], [1, "text-2xl", "font-bold", "text-gradient", "mb-1"], [1, "text-center", "p-4", "rounded-lg", "bg-gradient-to-r", "from-purple-500/10", "to-emerald-500/10", "border", "border-purple-500/20"], [1, "text-center", "p-4", "rounded-lg", "bg-gradient-to-r", "from-emerald-500/10", "to-gold-500/10", "border", "border-emerald-500/20"], [1, "card-premium", "p-6", "border", "border-red-500/20"], [1, "w-10", "h-10", "rounded-xl", "bg-gradient-to-r", "from-red-500/20", "to-orange-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-red-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"], [1, "flex", "items-center", "justify-between", "p-4", "rounded-lg", "bg-red-500/10", "border", "border-red-500/20"], [1, "text-sm", "font-medium", "text-red-300"], [1, "text-xs", "text-red-400"], [1, "px-4", "py-2", "rounded-lg", "bg-red-500/20", "border", "border-red-500/30", "text-red-400", "font-medium", "hover:bg-red-500/30", "transition-all", 3, "click"]], template: function ProfileComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
    \u0275\u0275listener("click", function ProfileComponent_Template_button_click_3_listener() {
      return ctx.goBackToChat();
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 4);
    \u0275\u0275element(5, "path", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Back to Chat");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "h1", 6);
    \u0275\u0275text(9, "Profile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 7);
    \u0275\u0275text(11, "Manage your account information and preferences");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "div", 10)(15, "div", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 12);
    \u0275\u0275element(17, "path", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "div")(19, "h2", 14);
    \u0275\u0275text(20, "Profile Information");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 15);
    \u0275\u0275text(22, "Update your personal details and avatar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 16)(24, "div", 17)(25, "div", 18)(26, "div", 19);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 20)(29, "div", 21)(30, "div")(31, "label", 22);
    \u0275\u0275text(32, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.firstName, $event) || (ctx.firstName = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div")(35, "label", 22);
    \u0275\u0275text(36, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.lastName, $event) || (ctx.lastName = $event);
      return $event;
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div")(39, "label", 22);
    \u0275\u0275text(40, "Email Address");
    \u0275\u0275elementEnd();
    \u0275\u0275element(41, "input", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div")(43, "label", 22);
    \u0275\u0275text(44, "Bio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "textarea", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_textarea_ngModelChange_45_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.bio, $event) || (ctx.bio = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 27)(47, "button", 28);
    \u0275\u0275listener("click", function ProfileComponent_Template_button_click_47_listener() {
      return ctx.updateProfile();
    });
    \u0275\u0275text(48, " Update Profile ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(49, "div", 9)(50, "div", 10)(51, "div", 29);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(52, "svg", 30);
    \u0275\u0275element(53, "path", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(54, "div")(55, "h2", 14);
    \u0275\u0275text(56, "Account Security");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "p", 15);
    \u0275\u0275text(58, "Manage your password and security settings");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 32)(60, "div", 33)(61, "h3", 34);
    \u0275\u0275text(62, "Change Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 35)(64, "div")(65, "label", 22);
    \u0275\u0275text(66, "Current Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_67_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.currentPassword, $event) || (ctx.currentPassword = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div")(69, "label", 22);
    \u0275\u0275text(70, "New Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.newPassword, $event) || (ctx.newPassword = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div")(73, "label", 22);
    \u0275\u0275text(74, "Confirm Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_75_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.confirmPassword, $event) || (ctx.confirmPassword = $event);
      return $event;
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(76, "div", 27)(77, "button", 28);
    \u0275\u0275listener("click", function ProfileComponent_Template_button_click_77_listener() {
      return ctx.updatePassword();
    });
    \u0275\u0275text(78, " Update Password ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(79, "div", 9)(80, "div", 10)(81, "div", 39);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(82, "svg", 40);
    \u0275\u0275element(83, "path", 41);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(84, "div")(85, "h2", 14);
    \u0275\u0275text(86, "Account Statistics");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "p", 15);
    \u0275\u0275text(88, "Your usage and activity overview");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(89, "div", 42)(90, "div", 43)(91, "div", 44);
    \u0275\u0275text(92);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "div", 15);
    \u0275\u0275text(94, "Total Conversations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 45)(96, "div", 44);
    \u0275\u0275text(97);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "div", 15);
    \u0275\u0275text(99, "Messages Sent");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(100, "div", 46)(101, "div", 44);
    \u0275\u0275text(102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "div", 15);
    \u0275\u0275text(104, "Member Since");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(105, "div", 47)(106, "div", 10)(107, "div", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(108, "svg", 49);
    \u0275\u0275element(109, "path", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(110, "div")(111, "h2", 14);
    \u0275\u0275text(112, "Danger Zone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "p", 15);
    \u0275\u0275text(114, "Irreversible and destructive actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(115, "div", 33)(116, "div", 51)(117, "div")(118, "h3", 52);
    \u0275\u0275text(119, "Delete Account");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "p", 53);
    \u0275\u0275text(121, "Permanently delete your account and all data");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(122, "button", 54);
    \u0275\u0275listener("click", function ProfileComponent_Template_button_click_122_listener() {
      return ctx.deleteAccount();
    });
    \u0275\u0275text(123, " Delete Account ");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(27);
    \u0275\u0275textInterpolate1(" ", ctx.getUserInitial(), " ");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx.firstName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.lastName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(18, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx.getUserEmail());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.bio);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c0));
    \u0275\u0275advance(22);
    \u0275\u0275twoWayProperty("ngModel", ctx.currentPassword);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(20, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.newPassword);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(21, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.confirmPassword);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(22, _c0));
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(ctx.totalConversations());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.totalMessages());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.memberSince());
  }
}, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
var ProfileComponent = _ProfileComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-profile", imports: [CommonModule, FormsModule], template: `<div class="max-w-4xl mx-auto px-4 py-8">\r
  <!-- Header -->\r
  <div class="mb-8">\r
    <div class="flex items-center gap-4 mb-4">\r
      <button \r
        (click)="goBackToChat()" \r
        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-ink-700/50 border border-white/10 text-neutral-300 hover:text-neutral-100 hover:bg-ink-600/50 transition-all">\r
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>\r
        </svg>\r
        <span>Back to Chat</span>\r
      </button>\r
    </div>\r
    <h1 class="text-3xl font-bold text-gradient mb-2">Profile</h1>\r
    <p class="text-neutral-400">Manage your account information and preferences</p>\r
  </div>\r
\r
  <!-- Profile Sections -->\r
  <div class="space-y-8">\r
    \r
    <!-- Profile Information -->\r
    <div class="card-premium p-6">\r
      <div class="flex items-center gap-3 mb-6">\r
        <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-accent-500/20 to-purple-500/20 flex items-center justify-center">\r
          <svg class="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>\r
          </svg>\r
        </div>\r
        <div>\r
          <h2 class="text-xl font-semibold text-neutral-100">Profile Information</h2>\r
          <p class="text-sm text-neutral-400">Update your personal details and avatar</p>\r
        </div>\r
      </div>\r
\r
      <div class="flex items-start gap-6">\r
        <!-- Avatar Section -->\r
        <div class="flex-shrink-0">\r
          <div class="relative">\r
            <div class="w-24 h-24 rounded-full bg-gradient-to-r from-accent-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">\r
              {{ getUserInitial() }}\r
            </div>\r
            <!-- <button class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-ink-700 border-2 border-ink-800 flex items-center justify-center hover:bg-ink-600 transition-colors">\r
              <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>\r
              </svg>\r
            </button> -->\r
          </div>\r
        </div>\r
\r
        <!-- Profile Form -->\r
        <div class="flex-1 space-y-4">\r
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div>\r
              <label class="block text-sm font-medium text-neutral-300 mb-2">First Name</label>\r
              <input type="text" class="input w-full" placeholder="Enter your first name" [(ngModel)]="firstName" [ngModelOptions]="{updateOn: 'change'}">\r
            </div>\r
            <div>\r
              <label class="block text-sm font-medium text-neutral-300 mb-2">Last Name</label>\r
              <input type="text" class="input w-full" placeholder="Enter your last name" [(ngModel)]="lastName" [ngModelOptions]="{updateOn: 'change'}">\r
            </div>\r
          </div>\r
          \r
          <div>\r
            <label class="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>\r
            <input type="email" class="input w-full" [value]="getUserEmail()" readonly>\r
          </div>\r
          \r
          <div>\r
            <label class="block text-sm font-medium text-neutral-300 mb-2">Bio</label>\r
            <textarea class="input w-full h-20 resize-none" placeholder="Tell us about yourself" [(ngModel)]="bio" [ngModelOptions]="{updateOn: 'change'}"></textarea>\r
          </div>\r
          \r
          <div class="flex justify-end">\r
            <button class="btn btn-primary px-6 py-2" (click)="updateProfile()">\r
              Update Profile\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Account Security -->\r
    <div class="card-premium p-6">\r
      <div class="flex items-center gap-3 mb-6">\r
        <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500/20 to-gold-500/20 flex items-center justify-center">\r
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>\r
          </svg>\r
        </div>\r
        <div>\r
          <h2 class="text-xl font-semibold text-neutral-100">Account Security</h2>\r
          <p class="text-sm text-neutral-400">Manage your password and security settings</p>\r
        </div>\r
      </div>\r
\r
      <div class="space-y-6">\r
        <!-- Change Password -->\r
        <div class="space-y-4">\r
          <h3 class="text-sm font-medium text-neutral-200">Change Password</h3>\r
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">\r
            <div>\r
              <label class="block text-sm font-medium text-neutral-300 mb-2">Current Password</label>\r
              <input type="password" class="input w-full" placeholder="Enter current password" [(ngModel)]="currentPassword" [ngModelOptions]="{updateOn: 'change'}">\r
            </div>\r
            <div>\r
              <label class="block text-sm font-medium text-neutral-300 mb-2">New Password</label>\r
              <input type="password" class="input w-full" placeholder="Enter new password" [(ngModel)]="newPassword" [ngModelOptions]="{updateOn: 'change'}">\r
            </div>\r
            <div>\r
              <label class="block text-sm font-medium text-neutral-300 mb-2">Confirm Password</label>\r
              <input type="password" class="input w-full" placeholder="Confirm new password" [(ngModel)]="confirmPassword" [ngModelOptions]="{updateOn: 'change'}">\r
            </div>\r
          </div>\r
          <div class="flex justify-end">\r
            <button class="btn btn-primary px-6 py-2" (click)="updatePassword()">\r
              Update Password\r
            </button>\r
          </div>\r
        </div>\r
\r
      </div>\r
    </div>\r
\r
    <!-- Account Statistics -->\r
    <div class="card-premium p-6">\r
      <div class="flex items-center gap-3 mb-6">\r
        <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500/20 to-emerald-500/20 flex items-center justify-center">\r
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>\r
          </svg>\r
        </div>\r
        <div>\r
          <h2 class="text-xl font-semibold text-neutral-100">Account Statistics</h2>\r
          <p class="text-sm text-neutral-400">Your usage and activity overview</p>\r
        </div>\r
      </div>\r
\r
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">\r
        <div class="text-center p-4 rounded-lg bg-gradient-to-r from-accent-500/10 to-purple-500/10 border border-accent-500/20">\r
          <div class="text-2xl font-bold text-gradient mb-1">{{ totalConversations() }}</div>\r
          <div class="text-sm text-neutral-400">Total Conversations</div>\r
        </div>\r
        <div class="text-center p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-emerald-500/10 border border-purple-500/20">\r
          <div class="text-2xl font-bold text-gradient mb-1">{{ totalMessages() }}</div>\r
          <div class="text-sm text-neutral-400">Messages Sent</div>\r
        </div>\r
        <div class="text-center p-4 rounded-lg bg-gradient-to-r from-emerald-500/10 to-gold-500/10 border border-emerald-500/20">\r
          <div class="text-2xl font-bold text-gradient mb-1">{{ memberSince() }}</div>\r
          <div class="text-sm text-neutral-400">Member Since</div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Danger Zone -->\r
    <div class="card-premium p-6 border border-red-500/20">\r
      <div class="flex items-center gap-3 mb-6">\r
        <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center">\r
          <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>\r
          </svg>\r
        </div>\r
        <div>\r
          <h2 class="text-xl font-semibold text-neutral-100">Danger Zone</h2>\r
          <p class="text-sm text-neutral-400">Irreversible and destructive actions</p>\r
        </div>\r
      </div>\r
\r
      <div class="space-y-4">\r
        <div class="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20">\r
          <div>\r
            <h3 class="text-sm font-medium text-red-300">Delete Account</h3>\r
            <p class="text-xs text-red-400">Permanently delete your account and all data</p>\r
          </div>\r
          <button class="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 font-medium hover:bg-red-500/30 transition-all" (click)="deleteAccount()">\r
            Delete Account\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/features/profile/profile.component.ts", lineNumber: 15 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-SO3TSUNG.js.map
