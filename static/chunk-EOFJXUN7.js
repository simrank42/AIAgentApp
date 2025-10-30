import {
  ChatService,
  animate,
  style,
  transition,
  trigger
} from "./chunk-MS7OG4VU.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-J6AQHLRA.js";
import {
  ToastService,
  environment
} from "./chunk-OPGT5SRN.js";
import {
  Component,
  DomSanitizer,
  HostListener,
  HttpClient,
  Injectable,
  NgClass,
  NgForOf,
  NgIf,
  Pipe,
  RendererFactory2,
  Router,
  TitleCasePipe,
  ViewChild,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SEPIUDJB.js";

// src/app/core/services/session.service.ts
var _SessionService = class _SessionService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = environment.apiUrl;
    this.sessions = signal([], ...ngDevMode ? [{ debugName: "sessions" }] : []);
    this.messages = signal([], ...ngDevMode ? [{ debugName: "messages" }] : []);
    this.activeSessionId = signal(null, ...ngDevMode ? [{ debugName: "activeSessionId" }] : []);
  }
  list() {
    return __async(this, null, function* () {
      const res = yield this.http.get(`${this.baseUrl}/sessions`).toPromise();
      this.sessions.set(res ?? []);
    });
  }
  create(agent_id, name) {
    return __async(this, null, function* () {
      const payload = {
        name: name || "New Chat",
        agent_id
      };
      const res = yield this.http.post(`${this.baseUrl}/sessions`, payload).toPromise();
      if (res) {
        const sessionWithTitle = __spreadProps(__spreadValues({}, res), { title: res.title || res.name });
        this.sessions.update((s) => [sessionWithTitle, ...s]);
        this.activeSessionId.set(res.id);
      }
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      yield this.http.delete(`${this.baseUrl}/sessions/${id}`).toPromise();
      this.sessions.update((s) => s.filter((x) => x.id !== id));
      if (this.activeSessionId() === id) {
        this.activeSessionId.set(null);
        this.messages.set([]);
      }
    });
  }
  update(id, data) {
    return __async(this, null, function* () {
      const res = yield this.http.patch(`${this.baseUrl}/sessions/${id}`, data).toPromise();
      if (res) {
        this.sessions.update((s) => s.map((x) => x.id === id ? res : x));
      }
    });
  }
  loadMessages(sessionId) {
    return __async(this, null, function* () {
      const res = yield this.http.get(`${this.baseUrl}/sessions/${sessionId}/messages`).toPromise();
      this.messages.set(res ?? []);
    });
  }
  // Clear messages (useful when no session is active)
  clearMessages() {
    this.messages.set([]);
  }
  deleteMessage(messageId) {
    return __async(this, null, function* () {
      yield this.http.delete(`${this.baseUrl}/messages/${messageId}`).toPromise();
      const sid = this.activeSessionId();
      if (sid) {
        this.loadMessages(sid);
      }
    });
  }
  regenerateMessage(sessionId, messageId) {
    return __async(this, null, function* () {
      yield this.http.post(`${this.baseUrl}/messages/${messageId}/regenerate`, {}).toPromise();
      setTimeout(() => {
        this.loadMessages(sessionId);
      }, 1e3);
    });
  }
  editMessage(messageId, content) {
    return __async(this, null, function* () {
      const updatedMessage = yield this.http.put(`${this.baseUrl}/messages/${messageId}`, {
        content
      }).toPromise();
      this.messages.update((messages) => messages.map((msg) => msg.id === messageId ? updatedMessage : msg));
      return updatedMessage;
    });
  }
};
_SessionService.\u0275fac = function SessionService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SessionService)();
};
_SessionService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SessionService, factory: _SessionService.\u0275fac, providedIn: "root" });
var SessionService = _SessionService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SessionService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/services/agent.service.ts
var _AgentService = class _AgentService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = environment.apiUrl;
    this.agents = signal([], ...ngDevMode ? [{ debugName: "agents" }] : []);
  }
  fetchAgents() {
    return __async(this, null, function* () {
      const res = yield this.http.get(`${this.baseUrl}/agents`).toPromise();
      this.agents.set(res ?? []);
    });
  }
};
_AgentService.\u0275fac = function AgentService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AgentService)();
};
_AgentService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AgentService, factory: _AgentService.\u0275fac, providedIn: "root" });
var AgentService = _AgentService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgentService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/chat/components/session-sidebar.component.ts
var _c0 = (a0, a1) => ({ "bg-gradient-to-r from-accent-500/20 to-purple-500/20 border border-accent-500/30 shadow-glow": a0, "hover:bg-ink-600/30": a1 });
function SessionSidebarComponent_div_6_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function SessionSidebarComponent_div_6_button_1_Template_button_click_0_listener() {
      const ag_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.newSession(ag_r2.id);
      return \u0275\u0275resetView(ctx_r2.showAgentSelector = false);
    });
    \u0275\u0275elementStart(1, "div", 19)(2, "span", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 21);
    \u0275\u0275element(5, "path", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ag_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ag_r2.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ag_r2.description);
  }
}
function SessionSidebarComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275template(1, SessionSidebarComponent_div_6_button_1_Template, 8, 2, "button", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("@slideDown", void 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.a.agents());
  }
}
function SessionSidebarComponent_div_15_div_4_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const session_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", session_r5.title, " ");
  }
}
function SessionSidebarComponent_div_15_div_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "input", 40, 0);
    \u0275\u0275twoWayListener("ngModelChange", function SessionSidebarComponent_div_15_div_4_div_4_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.editingTitle, $event) || (ctx_r2.editingTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function SessionSidebarComponent_div_15_div_4_div_4_Template_input_keydown_enter_1_listener() {
      \u0275\u0275restoreView(_r6);
      const session_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.saveEdit(session_r5.id));
    })("keydown.escape", function SessionSidebarComponent_div_15_div_4_div_4_Template_input_keydown_escape_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelEdit());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editingTitle);
  }
}
function SessionSidebarComponent_div_15_div_4_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function SessionSidebarComponent_div_15_div_4_button_8_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const session_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.startEditing(session_r5, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 42);
    \u0275\u0275element(2, "path", 43);
    \u0275\u0275elementEnd()();
  }
}
function SessionSidebarComponent_div_15_div_4_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "button", 45);
    \u0275\u0275listener("click", function SessionSidebarComponent_div_15_div_4_div_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const session_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.saveEdit(session_r5.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 46);
    \u0275\u0275element(3, "path", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "button", 48);
    \u0275\u0275listener("click", function SessionSidebarComponent_div_15_div_4_div_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelEdit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 49);
    \u0275\u0275element(6, "path", 50);
    \u0275\u0275elementEnd()()();
  }
}
function SessionSidebarComponent_div_15_div_4_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function SessionSidebarComponent_div_15_div_4_button_10_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const session_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteSession(session_r5.id, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 52);
    \u0275\u0275element(2, "path", 53);
    \u0275\u0275elementEnd()();
  }
}
function SessionSidebarComponent_div_15_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275listener("click", function SessionSidebarComponent_div_15_div_4_Template_div_click_0_listener() {
      const session_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.s.activeSessionId.set(session_r5.id));
    });
    \u0275\u0275elementStart(1, "div", 29)(2, "div", 30);
    \u0275\u0275template(3, SessionSidebarComponent_div_15_div_4_div_3_Template, 2, 1, "div", 31)(4, SessionSidebarComponent_div_15_div_4_div_4_Template, 3, 1, "div", 32);
    \u0275\u0275elementStart(5, "div", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 34);
    \u0275\u0275template(8, SessionSidebarComponent_div_15_div_4_button_8_Template, 3, 0, "button", 35)(9, SessionSidebarComponent_div_15_div_4_div_9_Template, 7, 0, "div", 36)(10, SessionSidebarComponent_div_15_div_4_button_10_Template, 3, 0, "button", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const session_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(7, _c0, ctx_r2.s.activeSessionId() === session_r5.id, ctx_r2.s.activeSessionId() !== session_r5.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r2.editingSessionId() !== session_r5.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editingSessionId() === session_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatSessionTime(session_r5.updated_at), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.editingSessionId() !== session_r5.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editingSessionId() === session_r5.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editingSessionId() !== session_r5.id);
  }
}
function SessionSidebarComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26);
    \u0275\u0275template(4, SessionSidebarComponent_div_15_div_4_Template, 11, 10, "div", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", group_r10.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", group_r10.sessions);
  }
}
function SessionSidebarComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 55);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 56);
    \u0275\u0275element(3, "path", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 58);
    \u0275\u0275text(5, "No conversations yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 59);
    \u0275\u0275text(7, "Start a new chat to begin");
    \u0275\u0275elementEnd()();
  }
}
var _SessionSidebarComponent = class _SessionSidebarComponent {
  constructor() {
    this.s = inject(SessionService);
    this.a = inject(AgentService);
    this.toast = inject(ToastService);
    this.router = inject(Router);
    this.searchQuery = signal("", ...ngDevMode ? [{ debugName: "searchQuery" }] : []);
    this.editingSessionId = signal(null, ...ngDevMode ? [{ debugName: "editingSessionId" }] : []);
    this.editingTitle = signal("", ...ngDevMode ? [{ debugName: "editingTitle" }] : []);
    this.showAgentSelector = false;
    this.filteredSessions = computed(() => {
      const sessions = this.s.sessions();
      const query = this.searchQuery().toLowerCase();
      if (!query)
        return sessions;
      return sessions.filter((session) => session.title.toLowerCase().includes(query));
    }, ...ngDevMode ? [{ debugName: "filteredSessions" }] : []);
    this.groupedSessions = computed(() => {
      const sessions = this.filteredSessions();
      const now = /* @__PURE__ */ new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1e3);
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1e3);
      const groups = [
        { title: "Today", sessions: [] },
        { title: "Yesterday", sessions: [] },
        { title: "Last 7 days", sessions: [] },
        { title: "Older", sessions: [] }
      ];
      sessions.forEach((session) => {
        const sessionDate = new Date(session.updated_at);
        if (sessionDate >= today) {
          groups[0].sessions.push(session);
        } else if (sessionDate >= yesterday) {
          groups[1].sessions.push(session);
        } else if (sessionDate >= lastWeek) {
          groups[2].sessions.push(session);
        } else {
          groups[3].sessions.push(session);
        }
      });
      return groups.filter((group) => group.sessions.length > 0);
    }, ...ngDevMode ? [{ debugName: "groupedSessions" }] : []);
  }
  newSession(agentId) {
    return __async(this, null, function* () {
      try {
        yield this.s.create(agentId, "New session");
        this.toast.show("New session created", "success");
      } catch (error) {
        this.toast.show("Failed to create session", "error");
      }
    });
  }
  deleteSession(sessionId, event) {
    return __async(this, null, function* () {
      event.stopPropagation();
      if (confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
        try {
          yield this.s.delete(sessionId);
          this.toast.show("Session deleted", "success");
        } catch (error) {
          this.toast.show("Failed to delete session", "error");
        }
      }
    });
  }
  startEditing(session, event) {
    event.stopPropagation();
    this.editingSessionId.set(session.id);
    this.editingTitle.set(session.title);
  }
  saveEdit(sessionId) {
    return __async(this, null, function* () {
      try {
        yield this.s.update(sessionId, { name: this.editingTitle() });
        this.editingSessionId.set(null);
        this.editingTitle.set("");
        this.toast.show("Session renamed", "success");
      } catch (error) {
        this.toast.show("Failed to rename session", "error");
      }
    });
  }
  cancelEdit() {
    this.editingSessionId.set(null);
    this.editingTitle.set("");
  }
  formatSessionTime(timestamp) {
    const date = new Date(timestamp);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMs / 36e5);
    if (diffMins < 1)
      return "Just now";
    if (diffMins < 60)
      return `${diffMins}m ago`;
    if (diffHours < 24)
      return `${diffHours}h ago`;
    return date.toLocaleDateString();
  }
};
_SessionSidebarComponent.\u0275fac = function SessionSidebarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SessionSidebarComponent)();
};
_SessionSidebarComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SessionSidebarComponent, selectors: [["app-session-sidebar"]], decls: 17, vars: 4, consts: [["editInput", ""], [1, "h-full", "flex", "flex-col", "bg-transparent", "session-sidebar-container"], [1, "flex-shrink-0", "p-4", "border-b", "border-white/10"], [1, "w-full", "px-4", "py-3", "rounded-xl", "bg-gradient-to-r", "from-accent-500/20", "to-purple-500/20", "hover:from-accent-500/30", "hover:to-purple-500/30", "text-sm", "font-medium", "transition-all", "duration-300", "border", "border-accent-500/30", "hover:border-accent-500/50", "hover:shadow-glow", "group", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "inline", "mr-2", "group-hover:rotate-90", "transition-transform", "duration-300"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 6v6m0 0v6m0-6h6m-6 0H6"], ["class", "mt-3 space-y-2 animate-slideDown", 4, "ngIf"], [1, "text-lg", "font-semibold", "text-gradient", "mt-4", "mb-3"], [1, "relative"], ["type", "text", "placeholder", "Search conversations...", 1, "input", "pr-10", "text-sm", "py-2", 3, "ngModelChange", "ngModel"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "absolute", "right-3", "top-1/2", "transform", "-translate-y-1/2", "w-4", "h-4", "text-neutral-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], [1, "flex-1", "min-h-0", "session-sidebar-scroll"], [1, "p-4"], ["class", "space-y-3 mb-6", 4, "ngFor", "ngForOf"], ["class", "text-center py-12", 4, "ngIf"], [1, "mt-3", "space-y-2", "animate-slideDown"], ["class", "w-full px-3 py-2 rounded-lg bg-ink-700/50 hover:bg-ink-600/70 text-sm transition-all duration-200 border border-white/5 hover:border-accent-500/30 hover:shadow-sm group", 3, "click", 4, "ngFor", "ngForOf"], [1, "w-full", "px-3", "py-2", "rounded-lg", "bg-ink-700/50", "hover:bg-ink-600/70", "text-sm", "transition-all", "duration-200", "border", "border-white/5", "hover:border-accent-500/30", "hover:shadow-sm", "group", 3, "click"], [1, "flex", "items-center", "justify-between"], [1, "text-neutral-200"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3", "text-neutral-400", "group-hover:text-accent-300", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], [1, "text-xs", "text-neutral-400", "mt-1"], [1, "space-y-3", "mb-6"], [1, "text-xs", "font-semibold", "text-neutral-400", "uppercase", "tracking-wider", "px-2"], [1, "space-y-1"], ["class", "group relative rounded-xl p-3 cursor-pointer transition-all duration-300 hover:bg-ink-600/40 hover:shadow-sm hover:scale-[1.02]", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "group", "relative", "rounded-xl", "p-3", "cursor-pointer", "transition-all", "duration-300", "hover:bg-ink-600/40", "hover:shadow-sm", "hover:scale-[1.02]", 3, "click", "ngClass"], [1, "flex", "items-start", "justify-between"], [1, "flex-1", "min-w-0"], ["class", "font-medium text-sm truncate mb-1 text-neutral-100", 4, "ngIf"], ["class", "mb-2", 4, "ngIf"], [1, "text-xs", "text-neutral-400"], [1, "flex", "items-center", "gap-1", "opacity-0", "group-hover:opacity-100", "transition-opacity", "ml-2"], ["class", "p-1.5 rounded-lg hover:bg-ink-600/60 transition-all duration-200 hover:scale-110", "title", "Rename session", 3, "click", 4, "ngIf"], ["class", "flex gap-1", 4, "ngIf"], ["class", "p-1.5 rounded-lg hover:bg-red-500/20 transition-all duration-200 hover:scale-110", "title", "Delete session", 3, "click", 4, "ngIf"], [1, "font-medium", "text-sm", "truncate", "mb-1", "text-neutral-100"], [1, "mb-2"], ["type", "text", 1, "input", "text-sm", "py-1", "px-2", 3, "ngModelChange", "keydown.enter", "keydown.escape", "ngModel"], ["title", "Rename session", 1, "p-1.5", "rounded-lg", "hover:bg-ink-600/60", "transition-all", "duration-200", "hover:scale-110", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3", "text-neutral-400", "hover:text-gold-400", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], [1, "flex", "gap-1"], ["title", "Save", 1, "p-1.5", "rounded-lg", "hover:bg-emerald-500/20", "transition-all", "duration-200", "hover:scale-110", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3", "text-emerald-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"], ["title", "Cancel", 1, "p-1.5", "rounded-lg", "hover:bg-red-500/20", "transition-all", "duration-200", "hover:scale-110", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3", "text-red-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], ["title", "Delete session", 1, "p-1.5", "rounded-lg", "hover:bg-red-500/20", "transition-all", "duration-200", "hover:scale-110", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3", "text-neutral-400", "hover:text-red-400", "transition-colors"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "text-center", "py-12"], [1, "w-16", "h-16", "mx-auto", "mb-4", "rounded-full", "bg-gradient-to-r", "from-accent-500/20", "to-purple-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-8", "h-8", "text-neutral-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"], [1, "text-sm", "text-neutral-300", "mb-2"], [1, "text-xs", "text-neutral-500"]], template: function SessionSidebarComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "button", 3);
    \u0275\u0275listener("click", function SessionSidebarComponent_Template_button_click_2_listener() {
      return ctx.showAgentSelector = !ctx.showAgentSelector;
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 4);
    \u0275\u0275element(4, "path", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " New Chat ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, SessionSidebarComponent_div_6_Template, 2, 2, "div", 6);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "h3", 7);
    \u0275\u0275text(8, "Chat History");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 8)(10, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function SessionSidebarComponent_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
      return $event;
    });
    \u0275\u0275listener("ngModelChange", function SessionSidebarComponent_Template_input_ngModelChange_10_listener($event) {
      return ctx.searchQuery.set($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 10);
    \u0275\u0275element(12, "path", 11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "div", 12)(14, "div", 13);
    \u0275\u0275template(15, SessionSidebarComponent_div_15_Template, 5, 2, "div", 14)(16, SessionSidebarComponent_div_16_Template, 8, 0, "div", 15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.showAgentSelector);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx.groupedSessions());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.groupedSessions().length === 0);
  }
}, dependencies: [NgForOf, NgClass, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2, data: { animation: [
  trigger("slideDown", [
    transition(":enter", [
      style({ height: 0, opacity: 0, overflow: "hidden" }),
      animate("200ms ease-out", style({ height: "*", opacity: 1 }))
    ]),
    transition(":leave", [
      style({ height: "*", opacity: 1, overflow: "hidden" }),
      animate("200ms ease-in", style({ height: 0, opacity: 0 }))
    ])
  ])
] } });
var SessionSidebarComponent = _SessionSidebarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SessionSidebarComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-session-sidebar", imports: [NgForOf, NgClass, NgIf, FormsModule], animations: [
      trigger("slideDown", [
        transition(":enter", [
          style({ height: 0, opacity: 0, overflow: "hidden" }),
          animate("200ms ease-out", style({ height: "*", opacity: 1 }))
        ]),
        transition(":leave", [
          style({ height: "*", opacity: 1, overflow: "hidden" }),
          animate("200ms ease-in", style({ height: 0, opacity: 0 }))
        ])
      ])
    ], template: `<div class="h-full flex flex-col bg-transparent session-sidebar-container">
  <!-- Header - Fixed at top -->
  <div class="flex-shrink-0 p-4 border-b border-white/10">
    <!-- New Chat Button -->
    <button 
      (click)="showAgentSelector = !showAgentSelector"
      class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-accent-500/20 to-purple-500/20 hover:from-accent-500/30 hover:to-purple-500/30 text-sm font-medium transition-all duration-300 border border-accent-500/30 hover:border-accent-500/50 hover:shadow-glow group">
      <svg class="w-4 h-4 inline mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      New Chat
    </button>

    <!-- Agent Selector Dropdown -->
    <div *ngIf="showAgentSelector" 
         class="mt-3 space-y-2 animate-slideDown"
         [@slideDown]>
      <button *ngFor="let ag of a.agents()" 
              (click)="newSession(ag.id); showAgentSelector = false"
              class="w-full px-3 py-2 rounded-lg bg-ink-700/50 hover:bg-ink-600/70 text-sm transition-all duration-200 border border-white/5 hover:border-accent-500/30 hover:shadow-sm group">
        <div class="flex items-center justify-between">
          <span class="text-neutral-200">{{ ag.name }}</span>
          <svg class="w-3 h-3 text-neutral-400 group-hover:text-accent-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
        <div class="text-xs text-neutral-400 mt-1">{{ ag.description }}</div>
      </button>
    </div>
    
    <!-- Chat History Title -->
    <h3 class="text-lg font-semibold text-gradient mt-4 mb-3">Chat History</h3>
    
    <!-- Search -->
    <div class="relative">
      <input 
        type="text" 
        class="input pr-10 text-sm py-2"
        placeholder="Search conversations..."
        [(ngModel)]="searchQuery"
        (ngModelChange)="searchQuery.set($event)">
      <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  </div>

  <!-- Scrollable Content Area - Full height with proper scrolling -->
  <div class="flex-1 min-h-0 session-sidebar-scroll">
    <div class="p-4">
      <!-- Sessions List -->
      <div *ngFor="let group of groupedSessions()" class="space-y-3 mb-6">
        <!-- Group Header -->
        <div class="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2">
          {{ group.title }}
        </div>
        
        <!-- Sessions in Group -->
        <div class="space-y-1">
          <div *ngFor="let session of group.sessions"
               class="group relative rounded-xl p-3 cursor-pointer transition-all duration-300 hover:bg-ink-600/40 hover:shadow-sm hover:scale-[1.02]"
               [ngClass]="{
                 'bg-gradient-to-r from-accent-500/20 to-purple-500/20 border border-accent-500/30 shadow-glow': s.activeSessionId() === session.id,
                 'hover:bg-ink-600/30': s.activeSessionId() !== session.id
               }"
               (click)="s.activeSessionId.set(session.id)">
            
            <!-- Session Content -->
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <!-- Session Title -->
                <div *ngIf="editingSessionId() !== session.id" class="font-medium text-sm truncate mb-1 text-neutral-100">
                  {{ session.title }}
                </div>
                
                <!-- Edit Input -->
                <div *ngIf="editingSessionId() === session.id" class="mb-2">
                  <input 
                    type="text" 
                    class="input text-sm py-1 px-2"
                    [(ngModel)]="editingTitle"
                    (keydown.enter)="saveEdit(session.id)"
                    (keydown.escape)="cancelEdit()"
                    #editInput>
                </div>
                
                <!-- Session Time -->
                <div class="text-xs text-neutral-400">
                  {{ formatSessionTime(session.updated_at) }}
                </div>
              </div>

              <!-- Session Actions -->
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <!-- Edit Button -->
                <button *ngIf="editingSessionId() !== session.id"
                        class="p-1.5 rounded-lg hover:bg-ink-600/60 transition-all duration-200 hover:scale-110"
                        (click)="startEditing(session, $event)"
                        title="Rename session">
                  <svg class="w-3 h-3 text-neutral-400 hover:text-gold-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>

                <!-- Save/Cancel Edit Buttons -->
                <div *ngIf="editingSessionId() === session.id" class="flex gap-1">
                  <button class="p-1.5 rounded-lg hover:bg-emerald-500/20 transition-all duration-200 hover:scale-110"
                          (click)="saveEdit(session.id)"
                          title="Save">
                    <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </button>
                  <button class="p-1.5 rounded-lg hover:bg-red-500/20 transition-all duration-200 hover:scale-110"
                          (click)="cancelEdit()"
                          title="Cancel">
                    <svg class="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                <!-- Delete Button -->
                <button *ngIf="editingSessionId() !== session.id"
                        class="p-1.5 rounded-lg hover:bg-red-500/20 transition-all duration-200 hover:scale-110"
                        (click)="deleteSession(session.id, $event)"
                        title="Delete session">
                  <svg class="w-3 h-3 text-neutral-400 hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="groupedSessions().length === 0" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent-500/20 to-purple-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>
        <p class="text-sm text-neutral-300 mb-2">No conversations yet</p>
        <p class="text-xs text-neutral-500">Start a new chat to begin</p>
      </div>
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SessionSidebarComponent, { className: "SessionSidebarComponent", filePath: "src/app/features/chat/components/session-sidebar.component.ts", lineNumber: 33 });
})();

// node_modules/marked/lib/marked.esm.js
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$1(html3, encode) {
  if (encode) {
    if (escapeTest.test(html3)) {
      return html3.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html3)) {
      return html3.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html3;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html3) {
  return html3.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  let source = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      let valSource = typeof val === "string" ? val : val.source;
      valSource = valSource.replace(caret, "$1");
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    }
  };
  return obj;
}
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
var noopTest = { exec: () => null };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function outputLink(cap, link2, raw, lexer2) {
  const href = link2.href;
  const title = link2.title ? escape$1(link2.title) : null;
  const text2 = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text: text2,
      tokens: lexer2.inlineTokens(text2)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape$1(text2)
  };
}
function indentCodeCompensation(raw, text2) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text2;
  }
  const indentToCode = matchIndentToCode[1];
  return text2.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var _Tokenizer = class {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text2 = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text2, "\n") : text2
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text2 = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
        text: text2
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text2 = cap[2].trim();
      if (/#$/.test(text2)) {
        const trimmed = rtrim(text2, "#");
        if (this.options.pedantic) {
          text2 = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text2 = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text: text2,
        tokens: this.lexer.inline(text2)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      let text2 = cap[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1");
      text2 = rtrim(text2.replace(/^ *>[ \t]?/gm, ""), "\n");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text2);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text: text2
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list2 = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let raw = "";
      let itemContents = "";
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t) => " ".repeat(3 * t.length));
        let nextLine = src.split("\n", 1)[0];
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        let blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list2.loose) {
          if (endsWithBlankLine) {
            list2.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list2.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list2.raw += raw;
      }
      list2.items[list2.items.length - 1].raw = raw.trimEnd();
      list2.items[list2.items.length - 1].text = itemContents.trimEnd();
      list2.raw = list2.raw.trimEnd();
      for (let i = 0; i < list2.items.length; i++) {
        this.lexer.state.top = false;
        list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
        if (!list2.loose) {
          const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => /\n.*\n/.test(t.raw));
          list2.loose = hasMultipleLineBreaks;
        }
      }
      if (list2.loose) {
        for (let i = 0; i < list2.items.length; i++) {
          list2.items[i].loose = true;
        }
      }
      return list2;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag2 = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
      return {
        type: "def",
        tag: tag2,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (!cap) {
      return;
    }
    if (!/[:|]/.test(cap[2])) {
      return;
    }
    const headers = splitCells(cap[1]);
    const aligns = cap[2].replace(/^\||\| *$/g, "").split("|");
    const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : [];
    const item = {
      type: "table",
      raw: cap[0],
      header: [],
      align: [],
      rows: []
    };
    if (headers.length !== aligns.length) {
      return;
    }
    for (const align of aligns) {
      if (/^ *-+: *$/.test(align)) {
        item.align.push("right");
      } else if (/^ *:-+: *$/.test(align)) {
        item.align.push("center");
      } else if (/^ *:-+ *$/.test(align)) {
        item.align.push("left");
      } else {
        item.align.push(null);
      }
    }
    for (const header of headers) {
      item.header.push({
        text: header,
        tokens: this.lexer.inline(header)
      });
    }
    for (const row of rows) {
      item.rows.push(splitCells(row, item.header.length).map((cell) => {
        return {
          text: cell,
          tokens: this.lexer.inline(cell)
        };
      }));
    }
    return item;
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text2 = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text: text2,
        tokens: this.lexer.inline(text2)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape$1(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link2) {
          href = link2[1];
          title = link2[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
        title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      const linkString = (cap[2] || cap[1]).replace(/\s+/g, " ");
      const link2 = links[linkString.toLowerCase()];
      if (!link2) {
        const text2 = cap[0].charAt(0);
        return {
          type: "text",
          raw: text2,
          text: text2
        };
      }
      return outputLink(cap, link2, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrongLDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text3 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text3,
            tokens: this.lexer.inlineTokens(text3)
          };
        }
        const text2 = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text: text2,
          tokens: this.lexer.inlineTokens(text2)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text2 = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text2);
      const hasSpaceCharsOnBothEnds = /^ /.test(text2) && / $/.test(text2);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text2 = text2.substring(1, text2.length - 1);
      }
      text2 = escape$1(text2, true);
      return {
        type: "codespan",
        raw: cap[0],
        text: text2
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text2, href;
      if (cap[2] === "@") {
        text2 = escape$1(cap[1]);
        href = "mailto:" + text2;
      } else {
        text2 = escape$1(cap[1]);
        href = text2;
      }
      return {
        type: "link",
        raw: cap[0],
        text: text2,
        href,
        tokens: [
          {
            type: "text",
            raw: text2,
            text: text2
          }
        ]
      };
    }
  }
  url(src) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text2, href;
      if (cap[2] === "@") {
        text2 = escape$1(cap[0]);
        href = "mailto:" + text2;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
        } while (prevCapZero !== cap[0]);
        text2 = escape$1(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text: text2,
        href,
        tokens: [
          {
            type: "text",
            raw: text2,
            text: text2
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text2;
      if (this.lexer.state.inRawBlock) {
        text2 = cap[0];
      } else {
        text2 = escape$1(cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text: text2
      };
    }
  }
};
var newline = /^(?: *(?:\n|$))+/;
var blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex();
var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
var blockNormal = {
  blockquote,
  code: blockCode,
  def,
  fences,
  heading,
  hr,
  html,
  lheading,
  list,
  newline,
  paragraph,
  table: noopTest,
  text: blockText
};
var gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockGfm = __spreadProps(__spreadValues({}, blockNormal), {
  table: gfmTable,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
});
var blockPedantic = __spreadProps(__spreadValues({}, blockNormal), {
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
});
var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = "\\p{P}\\p{S}";
var punctuation = edit(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _punctuation).getRegex();
var blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimAst = edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _punctuation).getRegex();
var anyPunctuation = edit(/\\([punct])/, "gu").replace(/punct/g, _punctuation).getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
var inlineNormal = {
  _backpedal: noopTest,
  // only used for GFM url
  anyPunctuation,
  autolink,
  blockSkip,
  br,
  code: inlineCode,
  del: noopTest,
  emStrongLDelim,
  emStrongRDelimAst,
  emStrongRDelimUnd,
  escape,
  link,
  nolink,
  punctuation,
  reflink,
  reflinkSearch,
  tag,
  text: inlineText,
  url: noopTest
};
var inlinePedantic = __spreadProps(__spreadValues({}, inlineNormal), {
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
});
var inlineGfm = __spreadProps(__spreadValues({}, inlineNormal), {
  escape: edit(escape).replace("])", "~|])").getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
var inlineBreaks = __spreadProps(__spreadValues({}, inlineGfm), {
  br: edit(br).replace("{2,}", "*").getRegex(),
  text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
var block = {
  normal: blockNormal,
  gfm: blockGfm,
  pedantic: blockPedantic
};
var inline = {
  normal: inlineNormal,
  gfm: inlineGfm,
  breaks: inlineBreaks,
  pedantic: inlinePedantic
};
var _Lexer = class __Lexer {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const next = this.inlineQueue[i];
      this.inlineTokens(next.src, next.tokens);
    }
    this.inlineQueue = [];
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token;
    let lastToken;
    let cutSrc;
    let lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var _Renderer = class {
  options;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/^\S*/)?.[0];
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape$1(lang) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html3, block2) {
    return html3;
  }
  heading(text2, level, raw) {
    return `<h${level}>${text2}</h${level}>
`;
  }
  hr() {
    return "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul";
    const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text2, task, checked) {
    return `<li>${text2}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(text2) {
    return `<p>${text2}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag2 = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag2 + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong(text2) {
    return `<strong>${text2}</strong>`;
  }
  em(text2) {
    return `<em>${text2}</em>`;
  }
  codespan(text2) {
    return `<code>${text2}</code>`;
  }
  br() {
    return "<br>";
  }
  del(text2) {
    return `<del>${text2}</del>`;
  }
  link(href, title, text2) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text2;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text2 + "</a>";
    return out;
  }
  image(href, title, text2) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text2;
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text2}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += ">";
    return out;
  }
  text(text2) {
    return text2;
  }
};
var _TextRenderer = class {
  // no need for block level renderers
  strong(text2) {
    return text2;
  }
  em(text2) {
    return text2;
  }
  codespan(text2) {
    return text2;
  }
  del(text2) {
    return text2;
  }
  html(text2) {
    return text2;
  }
  text(text2) {
    return text2;
  }
  link(href, title, text2) {
    return "" + text2;
  }
  image(href, title, text2) {
    return "" + text2;
  }
  br() {
    return "";
  }
};
var _Parser = class __Parser {
  options;
  renderer;
  textRenderer;
  constructor(options2) {
    this.options = options2 || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const genericToken = token;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          const headingToken = token;
          out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const codeToken = token;
          out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
          continue;
        }
        case "table": {
          const tableToken = token;
          let header = "";
          let cell = "";
          for (let j = 0; j < tableToken.header.length; j++) {
            cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), { header: true, align: tableToken.align[j] });
          }
          header += this.renderer.tablerow(cell);
          let body = "";
          for (let j = 0; j < tableToken.rows.length; j++) {
            const row = tableToken.rows[j];
            cell = "";
            for (let k = 0; k < row.length; k++) {
              cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: tableToken.align[k] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          const blockquoteToken = token;
          const body = this.parse(blockquoteToken.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          const listToken = token;
          const ordered = listToken.ordered;
          const start = listToken.start;
          const loose = listToken.loose;
          let body = "";
          for (let j = 0; j < listToken.items.length; j++) {
            const item = listToken.items[j];
            const checked = item.checked;
            const task = item.task;
            let itemBody = "";
            if (item.task) {
              const checkbox = this.renderer.checkbox(!!checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox + " "
                  });
                }
              } else {
                itemBody += checkbox + " ";
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, !!checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          const htmlToken = token;
          out += this.renderer.html(htmlToken.text, htmlToken.block);
          continue;
        }
        case "paragraph": {
          const paragraphToken = token;
          out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
          continue;
        }
        case "text": {
          let textToken = token;
          let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          const escapeToken = token;
          out += renderer.text(escapeToken.text);
          break;
        }
        case "html": {
          const tagToken = token;
          out += renderer.html(tagToken.text);
          break;
        }
        case "link": {
          const linkToken = token;
          out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
          break;
        }
        case "image": {
          const imageToken = token;
          out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
          break;
        }
        case "strong": {
          const strongToken = token;
          out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
          break;
        }
        case "em": {
          const emToken = token;
          out += renderer.em(this.parseInline(emToken.tokens, renderer));
          break;
        }
        case "codespan": {
          const codespanToken = token;
          out += renderer.codespan(codespanToken.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          const delToken = token;
          out += renderer.del(this.parseInline(delToken.tokens, renderer));
          break;
        }
        case "text": {
          const textToken = token;
          out += renderer.text(textToken.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var _Hooks = class {
  options;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html3) {
    return html3;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
};
var Marked = class {
  defaults = _getDefaults();
  options = this.setOptions;
  parse = this.#parseMarkdown(_Lexer.lex, _Parser.parse);
  parseInline = this.#parseMarkdown(_Lexer.lexInline, _Parser.parseInline);
  Parser = _Parser;
  Renderer = _Renderer;
  TextRenderer = _TextRenderer;
  Lexer = _Lexer;
  Tokenizer = _Tokenizer;
  Hooks = _Hooks;
  constructor(...args) {
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              const tokens2 = genericToken[childTokens].flat(Infinity);
              values = values.concat(this.walkTokens(tokens2, callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = __spreadValues({}, pack);
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          if (!(prop in renderer)) {
            throw new Error(`renderer '${prop}' does not exist`);
          }
          if (prop === "options") {
            continue;
          }
          const rendererProp = prop;
          const rendererFunc = pack.renderer[rendererProp];
          const prevRenderer = renderer[rendererProp];
          renderer[rendererProp] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          if (!(prop in tokenizer)) {
            throw new Error(`tokenizer '${prop}' does not exist`);
          }
          if (["options", "rules", "lexer"].includes(prop)) {
            continue;
          }
          const tokenizerProp = prop;
          const tokenizerFunc = pack.tokenizer[tokenizerProp];
          const prevTokenizer = tokenizer[tokenizerProp];
          tokenizer[tokenizerProp] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          if (!(prop in hooks)) {
            throw new Error(`hook '${prop}' does not exist`);
          }
          if (prop === "options") {
            continue;
          }
          const hooksProp = prop;
          const hooksFunc = pack.hooks[hooksProp];
          const prevHook = hooks[hooksProp];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksProp] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksProp] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens2 = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens2) {
            values = values.concat(walkTokens2.call(this, token));
          }
          return values;
        };
      }
      this.defaults = __spreadValues(__spreadValues({}, this.defaults), opts);
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = __spreadValues(__spreadValues({}, this.defaults), opt);
    return this;
  }
  lexer(src, options2) {
    return _Lexer.lex(src, options2 ?? this.defaults);
  }
  parser(tokens, options2) {
    return _Parser.parse(tokens, options2 ?? this.defaults);
  }
  #parseMarkdown(lexer2, parser2) {
    return (src, options2) => {
      const origOpt = __spreadValues({}, options2);
      const opt = __spreadValues(__spreadValues({}, this.defaults), origOpt);
      if (this.defaults.async === true && origOpt.async === false) {
        if (!opt.silent) {
          console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
        }
        opt.async = true;
      }
      const throwError = this.#onError(!!opt.silent, !!opt.async);
      if (typeof src === "undefined" || src === null) {
        return throwError(new Error("marked(): input parameter is undefined or null"));
      }
      if (typeof src !== "string") {
        return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
      }
      if (opt.hooks) {
        opt.hooks.options = opt;
      }
      if (opt.async) {
        return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html3) => opt.hooks ? opt.hooks.postprocess(html3) : html3).catch(throwError);
      }
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        let tokens = lexer2(src, opt);
        if (opt.hooks) {
          tokens = opt.hooks.processAllTokens(tokens);
        }
        if (opt.walkTokens) {
          this.walkTokens(tokens, opt.walkTokens);
        }
        let html3 = parser2(tokens, opt);
        if (opt.hooks) {
          html3 = opt.hooks.postprocess(html3);
        }
        return html3;
      } catch (e) {
        return throwError(e);
      }
    };
  }
  #onError(silent, async) {
    return (e) => {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (silent) {
        const msg = "<p>An error occurred:</p><pre>" + escape$1(e.message + "", true) + "</pre>";
        if (async) {
          return Promise.resolve(msg);
        }
        return msg;
      }
      if (async) {
        return Promise.reject(e);
      }
      throw e;
    };
  }
};
var markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = _Parser.parse;
var lexer = _Lexer.lex;

// node_modules/dompurify/dist/purify.es.mjs
var {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
var {
  freeze,
  seal,
  create
} = Object;
var {
  apply,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal2(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
var arrayForEach = unapply(Array.prototype.forEach);
var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);
var arraySplice = unapply(Array.prototype.splice);
var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringToString = unapply(String.prototype.toString);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);
var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
var regExpTest = unapply(RegExp.prototype.test);
var typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "slot", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
var text = freeze(["#text"]);
var html2 = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
var IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
var DOCTYPE_NAME = seal(/^html$/i);
var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR,
  ATTR_WHITESPACE,
  CUSTOM_ELEMENT,
  DATA_ATTR,
  DOCTYPE_NAME,
  ERB_EXPR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR,
  TMPLIT_EXPR
});
var NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
};
var getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html3) {
        return html3;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
var _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.2.7";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window2;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html2, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html2);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {
        }
      } else {
        try {
          element.setAttribute(name, "");
        } catch (_) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _isClobbered = function _isClobbered2(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(value) {
    return typeof Node === "function" && value instanceof Node;
  };
  function _executeHooks(hooks2, currentNode, data) {
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: void 0
    };
    let l = attributes.length;
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (lcName === "attributename" && stringMatch(value, "href")) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI) ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode);
      _sanitizeAttributes(shadowNode);
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
    }
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      _sanitizeElements(currentNode);
      _sanitizeAttributes(currentNode);
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag2, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag2);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (hookFunction !== void 0) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();

// src/app/core/services/code-copy.service.ts
var _CodeCopyService = class _CodeCopyService {
  constructor() {
    this.rendererFactory = inject(RendererFactory2);
    this.toast = inject(ToastService);
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  /**
   * Add copy buttons to all code blocks in the given element
   * @param container - The container element containing code blocks
   */
  addCopyButtons(container) {
    if (!container)
      return;
    const codeBlocks = container.querySelectorAll("pre code, code");
    codeBlocks.forEach((codeBlock, index) => {
      if (codeBlock.querySelector(".copy-button"))
        return;
      if (codeBlock.textContent && codeBlock.textContent.trim().length > 10) {
        this.createCopyButton(codeBlock, index);
      }
    });
  }
  /**
   * Create a copy button for a code block
   * @param codeBlock - The code block element
   * @param index - Index for unique identification
   */
  createCopyButton(codeBlock, index) {
    const preElement = codeBlock.closest("pre");
    const container = preElement || codeBlock.parentElement;
    if (!container)
      return;
    const copyButton = this.renderer.createElement("button");
    this.renderer.addClass(copyButton, "copy-button");
    this.renderer.addClass(copyButton, "absolute");
    this.renderer.addClass(copyButton, "top-2");
    this.renderer.addClass(copyButton, "right-2");
    this.renderer.addClass(copyButton, "p-2");
    this.renderer.addClass(copyButton, "rounded");
    this.renderer.addClass(copyButton, "bg-gray-700");
    this.renderer.addClass(copyButton, "hover:bg-gray-600");
    this.renderer.addClass(copyButton, "text-gray-300");
    this.renderer.addClass(copyButton, "hover:text-white");
    this.renderer.addClass(copyButton, "transition-colors");
    this.renderer.addClass(copyButton, "text-sm");
    this.renderer.addClass(copyButton, "opacity-0");
    this.renderer.addClass(copyButton, "group-hover:opacity-100");
    copyButton.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
    `;
    this.renderer.setAttribute(copyButton, "title", "Copy code");
    this.renderer.setAttribute(copyButton, "type", "button");
    this.renderer.setAttribute(copyButton, "data-code-index", index.toString());
    this.renderer.listen(copyButton, "click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.copyCodeToClipboard(codeBlock.textContent || "", copyButton);
    });
    if (getComputedStyle(container).position === "static") {
      this.renderer.addClass(container, "relative");
    }
    this.renderer.addClass(container, "group");
    this.renderer.appendChild(container, copyButton);
  }
  /**
   * Copy code to clipboard
   * @param code - The code content to copy
   * @param button - The copy button element
   */
  copyCodeToClipboard(code, button) {
    return __async(this, null, function* () {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          yield navigator.clipboard.writeText(code);
        } else {
          yield this.fallbackCopyToClipboard(code);
        }
        this.showCopySuccess(button);
        this.toast.show("Code copied to clipboard", "success");
      } catch (error) {
        console.error("Failed to copy code:", error);
        this.showCopyError(button);
        this.toast.show("Failed to copy code", "error");
      }
    });
  }
  /**
   * Fallback copy method for older browsers
   * @param text - Text to copy
   */
  fallbackCopyToClipboard(text2) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const textArea = document.createElement("textarea");
        textArea.value = text2;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand("copy");
          document.body.removeChild(textArea);
          if (successful) {
            resolve();
          } else {
            reject(new Error("execCommand copy failed"));
          }
        } catch (error) {
          document.body.removeChild(textArea);
          reject(error);
        }
      });
    });
  }
  /**
   * Show copy success feedback
   * @param button - The copy button element
   */
  showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
      <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M5 13l4 4L19 7"></path>
      </svg>
    `;
    this.renderer.addClass(button, "text-green-400");
    setTimeout(() => {
      button.innerHTML = originalHTML;
      this.renderer.removeClass(button, "text-green-400");
    }, 2e3);
  }
  /**
   * Show copy error feedback
   * @param button - The copy button element
   */
  showCopyError(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
      <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    `;
    this.renderer.addClass(button, "text-red-400");
    setTimeout(() => {
      button.innerHTML = originalHTML;
      this.renderer.removeClass(button, "text-red-400");
    }, 2e3);
  }
  /**
   * Remove all copy buttons from a container
   * @param container - The container element
   */
  removeCopyButtons(container) {
    if (!container)
      return;
    const copyButtons = container.querySelectorAll(".copy-button");
    copyButtons.forEach((button) => {
      this.renderer.removeChild(container, button);
    });
  }
};
_CodeCopyService.\u0275fac = function CodeCopyService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CodeCopyService)();
};
_CodeCopyService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CodeCopyService, factory: _CodeCopyService.\u0275fac, providedIn: "root" });
var CodeCopyService = _CodeCopyService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodeCopyService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/core/pipes/markdown.pipe.ts
var _MarkdownPipe = class _MarkdownPipe {
  constructor() {
    this.sanitizer = inject(DomSanitizer);
    this.codeCopyService = inject(CodeCopyService);
  }
  transform(value) {
    if (!value)
      return this.sanitizer.bypassSecurityTrustHtml("");
    console.log("[Markdown Pipe] Input:", value.substring(0, 100));
    let cleaned = value.replace(/\*\* ([^*]+) \*\*/g, "**$1**").replace(/\* ([^*]+) \*/g, "*$1*").replace(/``` ([a-z]+)/gi, "```$1").replace(/` ([^`]+) `/g, "`$1`").replace(/\*\* ([^:]+) : \*\*/g, "**$1:**").replace(/([a-z_]+) _([a-z_]+)/gi, "$1_$2");
    console.log("[Markdown Pipe] Cleaned:", cleaned.substring(0, 100));
    marked.setOptions({
      breaks: true,
      // Convert \n to <br>
      gfm: true
      // GitHub Flavored Markdown
    });
    const html3 = marked.parse(cleaned);
    console.log("[Markdown Pipe] Parsed HTML:", html3.substring(0, 200));
    const clean = purify.sanitize(html3, {
      ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "s",
        "del",
        "ins",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "blockquote",
        "pre",
        "code",
        "a",
        "img",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "div",
        "span",
        "hr"
      ],
      ALLOWED_ATTR: [
        "href",
        "title",
        "alt",
        "src",
        "width",
        "height",
        "class",
        "id",
        "lang",
        "dir",
        "align",
        "valign",
        "colspan",
        "rowspan",
        "scope",
        "language"
      ],
      ALLOW_DATA_ATTR: false,
      FORBID_TAGS: ["script", "object", "embed", "form", "input", "button"],
      FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      ADD_ATTR: ["target"],
      ADD_TAGS: ["details", "summary"]
    });
    console.log("[Markdown Pipe] Sanitized HTML:", clean.substring(0, 200));
    return this.sanitizer.bypassSecurityTrustHtml(clean);
  }
  /**
   * Called after the markdown content is rendered to add copy buttons securely
   * This method should be called from the component after the pipe has been applied
   * @param element - The element containing the rendered markdown
   */
  addCopyButtonsToElement(element) {
    this.codeCopyService.addCopyButtons(element);
  }
};
_MarkdownPipe.\u0275fac = function MarkdownPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MarkdownPipe)();
};
_MarkdownPipe.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "md", type: _MarkdownPipe, pure: true });
var MarkdownPipe = _MarkdownPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarkdownPipe, [{
    type: Pipe,
    args: [{ name: "md", standalone: true }]
  }], null, null);
})();

// src/app/features/chat/components/message-list.component.ts
var _c02 = ["messageContainer"];
var _c1 = (a0, a1) => ({ "bg-gradient-to-r from-accent-500 to-purple-500 text-white": a0, "bg-gradient-to-r from-ink-600 to-ink-500 text-accent-300": a1 });
function MessageListComponent_div_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "h2", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Welcome to ", (tmp_4_0 = ctx_r0.currentAgent()) == null ? null : tmp_4_0.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_5_0 = ctx_r0.currentAgent()) == null ? null : tmp_5_0.description) || "Start a conversation with this AI assistant. Ask questions, get help with tasks, or explore possibilities.", " ");
  }
}
function MessageListComponent_div_2_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 11);
    \u0275\u0275text(1, "Welcome to AI Chat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 12);
    \u0275\u0275text(3, " Select an AI assistant from the sidebar to start a conversation. Each assistant specializes in different areas to help you with various tasks. ");
    \u0275\u0275elementEnd();
  }
}
function MessageListComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 8);
    \u0275\u0275element(4, "path", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, MessageListComponent_div_2_div_5_Template, 5, 2, "div", 10)(6, MessageListComponent_div_2_ng_template_6_Template, 4, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const noAgentSelected_r2 = \u0275\u0275reference(7);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r0.currentAgent())("ngIfElse", noAgentSelected_r2);
  }
}
function MessageListComponent_div_3_div_2_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function MessageListComponent_div_3_div_2_button_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const m_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.editMessage(m_r4.id, m_r4.content));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 35);
    \u0275\u0275element(2, "path", 36);
    \u0275\u0275elementEnd()();
  }
}
function MessageListComponent_div_3_div_2_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function MessageListComponent_div_3_div_2_button_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const m_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.regenerateMessage(m_r4.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 38);
    \u0275\u0275element(2, "path", 39);
    \u0275\u0275elementEnd()();
  }
}
function MessageListComponent_div_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "div", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "span", 21);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 22);
    \u0275\u0275text(9, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 22);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 23)(13, "button", 24);
    \u0275\u0275listener("click", function MessageListComponent_div_3_div_2_Template_button_click_13_listener() {
      const m_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copyMessage(m_r4.content));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 25);
    \u0275\u0275element(15, "path", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, MessageListComponent_div_3_div_2_button_16_Template, 3, 0, "button", 27)(17, MessageListComponent_div_3_div_2_button_17_Template, 3, 0, "button", 28);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "button", 29);
    \u0275\u0275listener("click", function MessageListComponent_div_3_div_2_Template_button_click_18_listener() {
      const m_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deleteMessage(m_r4.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 30);
    \u0275\u0275element(20, "path", 31);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "div", 32);
    \u0275\u0275element(22, "div", 33);
    \u0275\u0275pipe(23, "md");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(11, _c1, m_r4.role === "user", m_r4.role === "assistant"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r4.role === "user" ? "U" : "AI", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 7, m_r4.role));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatTimestamp(m_r4.created_at));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", m_r4.role === "user");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", m_r4.role === "assistant");
    \u0275\u0275advance(5);
    \u0275\u0275property("innerHTML", \u0275\u0275pipeBind1(23, 9, m_r4.content), \u0275\u0275sanitizeHtml);
  }
}
function MessageListComponent_div_3_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 18)(2, "div", 41);
    \u0275\u0275text(3, " AI ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "span", 21);
    \u0275\u0275text(6, "Assistant");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 22);
    \u0275\u0275text(8, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 22);
    \u0275\u0275text(10, "Typing...");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 32)(12, "div", 42);
    \u0275\u0275element(13, "div", 43)(14, "div", 43)(15, "div", 43);
    \u0275\u0275elementEnd()()();
  }
}
function MessageListComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275template(2, MessageListComponent_div_3_div_2_Template, 24, 14, "div", 15)(3, MessageListComponent_div_3_div_3_Template, 16, 0, "div", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.combined())("ngForTrackBy", ctx_r0.trackByMessageId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.showTypingIndicator());
  }
}
var _MessageListComponent = class _MessageListComponent {
  constructor() {
    this.s = inject(SessionService);
    this.chat = inject(ChatService);
    this.toast = inject(ToastService);
    this.agents = inject(AgentService);
    this.codeCopyService = inject(CodeCopyService);
    this.isTyping = signal(false, ...ngDevMode ? [{ debugName: "isTyping" }] : []);
    this.showTypingIndicator = signal(false, ...ngDevMode ? [{ debugName: "showTypingIndicator" }] : []);
    this.combined = computed(() => {
      const msgs = this.s.messages();
      const delta = this.chat.streamingDelta();
      if (delta) {
        return [...msgs, { id: -1, role: "assistant", content: delta, tokens: 0, created_at: (/* @__PURE__ */ new Date()).toISOString() }];
      }
      return msgs;
    }, ...ngDevMode ? [{ debugName: "combined" }] : []);
    this.currentAgent = computed(() => {
      const activeSessionId = this.s.activeSessionId();
      if (!activeSessionId)
        return null;
      const session = this.s.sessions().find((s) => s.id === activeSessionId);
      if (!session)
        return null;
      return this.agents.agents().find((a) => a.id === session.agent_id) || null;
    }, ...ngDevMode ? [{ debugName: "currentAgent" }] : []);
    effect(() => {
      const delta = this.chat.streamingDelta();
      this.showTypingIndicator.set(!!delta);
    });
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    if (this.messageContainer) {
      this.codeCopyService.addCopyButtons(this.messageContainer.nativeElement);
    }
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
  copyMessage(content) {
    navigator.clipboard.writeText(content).then(() => {
      this.toast.show("Message copied to clipboard", "success");
    }).catch(() => {
      this.toast.show("Failed to copy message", "error");
    });
  }
  deleteMessage(messageId) {
    return __async(this, null, function* () {
      if (confirm("Are you sure you want to delete this message?")) {
        try {
          yield this.s.deleteMessage(messageId);
          this.toast.show("Message deleted", "success");
        } catch (error) {
          this.toast.show("Failed to delete message", "error");
        }
      }
    });
  }
  regenerateMessage(messageId) {
    return __async(this, null, function* () {
      try {
        this.toast.show("Regenerating response...", "info");
        const sid = this.s.activeSessionId();
        if (!sid)
          return;
        yield this.s.regenerateMessage(sid, messageId);
        this.toast.show("Response regenerated", "success");
      } catch (error) {
        this.toast.show("Failed to regenerate response", "error");
      }
    });
  }
  editMessage(messageId, content) {
    return __async(this, null, function* () {
      const newContent = prompt("Edit message:", content);
      if (newContent && newContent !== content) {
        try {
          yield this.s.editMessage(messageId, newContent);
          this.toast.show("Message updated", "success");
        } catch (error) {
          this.toast.show("Failed to update message", "error");
        }
      }
    });
  }
  // Get agent-specific prompt descriptions
  getAgentSpecificPromptDescriptions(agentName) {
    const agentKey = agentName.toLowerCase();
    if (agentKey.includes("creative") || agentKey.includes("writer")) {
      return {
        "creative": "Help me write a creative story...",
        "problem": "Help me brainstorm creative solutions...",
        "learning": "Explain creative writing techniques...",
        "code": "Help me write creative documentation..."
      };
    } else if (agentKey.includes("code") || agentKey.includes("developer") || agentKey.includes("programming")) {
      return {
        "creative": "Help me create a coding project...",
        "problem": "Help me debug this code...",
        "learning": "Explain this programming concept...",
        "code": "Review my code and suggest improvements..."
      };
    } else if (agentKey.includes("math") || agentKey.includes("science")) {
      return {
        "creative": "Help me create a scientific approach...",
        "problem": "Help me solve this equation...",
        "learning": "Explain this scientific concept...",
        "code": "Help me write code for this problem..."
      };
    } else if (agentKey.includes("business") || agentKey.includes("marketing")) {
      return {
        "creative": "Help me brainstorm marketing ideas...",
        "problem": "Help me analyze this business problem...",
        "learning": "Explain business concepts...",
        "code": "Help me create a business tool..."
      };
    } else {
      return {
        "creative": "Help me think creatively...",
        "problem": "How can I solve this problem...",
        "learning": "Explain this concept to me...",
        "code": "Help me understand this technical concept..."
      };
    }
  }
  // Get agent-specific prompts
  getAgentSpecificPrompts(agentName) {
    const agentKey = agentName.toLowerCase();
    if (agentKey.includes("creative") || agentKey.includes("writer")) {
      return {
        "creative": "Help me write a creative story about a space explorer who discovers a mysterious planet.",
        "problem": "Help me brainstorm creative solutions to this challenge.",
        "learning": "Explain creative writing techniques with examples.",
        "code": "Help me write creative code comments and documentation."
      };
    } else if (agentKey.includes("code") || agentKey.includes("developer") || agentKey.includes("programming")) {
      return {
        "creative": "Help me create a creative coding project idea.",
        "problem": "Help me debug this code and find the issue.",
        "learning": "Explain this programming concept with code examples.",
        "code": "Review my code and suggest improvements."
      };
    } else if (agentKey.includes("math") || agentKey.includes("science")) {
      return {
        "creative": "Help me create a creative approach to this scientific problem.",
        "problem": "Help me solve this mathematical equation step by step.",
        "learning": "Explain this scientific concept with examples.",
        "code": "Help me write code to solve this mathematical problem."
      };
    } else if (agentKey.includes("business") || agentKey.includes("marketing")) {
      return {
        "creative": "Help me brainstorm creative marketing ideas.",
        "problem": "Help me analyze this business problem and find solutions.",
        "learning": "Explain business concepts with real-world examples.",
        "code": "Help me create a business analysis tool or dashboard."
      };
    } else {
      return {
        "creative": "Help me think creatively about this topic.",
        "problem": "How can I solve this problem step by step?",
        "learning": "Explain this concept to me in simple terms.",
        "code": "Help me understand this technical concept."
      };
    }
  }
  // Handle suggested prompt clicks
  handleSuggestedPrompt(promptType) {
    return __async(this, null, function* () {
      const agent = this.currentAgent();
      const prompts = this.getAgentSpecificPrompts(agent?.name || agent?.key || "");
      const prompt2 = prompts[promptType];
      if (!prompt2)
        return;
      try {
        let sid = this.s.activeSessionId();
        if (!sid) {
          if (!agent) {
            this.toast.show("Please select an agent first.", "error");
            return;
          }
          yield this.s.create(agent.id, "New Chat");
          sid = this.s.activeSessionId();
          if (!sid) {
            this.toast.show("Failed to create session. Please try again.", "error");
            return;
          }
          yield new Promise((resolve) => setTimeout(resolve, 500));
        }
        const currentSid = this.s.activeSessionId();
        if (!currentSid) {
          this.toast.show("Session not available. Please try again.", "error");
          return;
        }
        let connectionAttempts = 0;
        const maxAttempts = 10;
        while (!this.chat.isConnected() && connectionAttempts < maxAttempts) {
          yield new Promise((resolve) => setTimeout(resolve, 100));
          connectionAttempts++;
        }
        if (!this.chat.isConnected()) {
          this.toast.show("Connection not ready. Please try again.", "error");
          return;
        }
        this.chat.send(prompt2, void 0, () => {
          const sid2 = this.s.activeSessionId();
          if (sid2) {
            this.s.loadMessages(sid2);
          }
        });
      } catch (error) {
        console.error("Error handling suggested prompt:", error);
        this.toast.show("Failed to start conversation. Please try again.", "error");
      }
    });
  }
  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMs / 36e5);
    const diffDays = Math.floor(diffMs / 864e5);
    if (diffMins < 1)
      return "Just now";
    if (diffMins < 60)
      return `${diffMins}m ago`;
    if (diffHours < 24)
      return `${diffHours}h ago`;
    if (diffDays < 7)
      return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }
  trackByMessageId(index, message) {
    return message.id;
  }
};
_MessageListComponent.\u0275fac = function MessageListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MessageListComponent)();
};
_MessageListComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MessageListComponent, selectors: [["app-message-list"]], viewQuery: function MessageListComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c02, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messageContainer = _t.first);
  }
}, decls: 4, vars: 2, consts: [["messageContainer", ""], ["noAgentSelected", ""], [1, "h-full", "flex", "flex-col"], ["class", "flex-1 flex items-center justify-center px-8", 4, "ngIf"], ["class", "flex-1 overflow-y-auto", 4, "ngIf"], [1, "flex-1", "flex", "items-center", "justify-center", "px-8"], [1, "text-center", "max-w-2xl"], [1, "w-24", "h-24", "mx-auto", "mb-6", "rounded-full", "bg-gradient-to-r", "from-accent-500/20", "to-purple-500/20", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-12", "h-12", "text-accent-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"], [4, "ngIf", "ngIfElse"], [1, "text-2xl", "font-semibold", "text-gradient", "mb-3"], [1, "text-neutral-400", "mb-8", "leading-relaxed"], [1, "flex-1", "overflow-y-auto"], [1, "max-w-3xl", "mx-auto"], ["class", "message-row py-6 group hover:bg-ink-800/20 transition-all duration-300 border-b border-white/5 last:border-b-0", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "message-row py-6 group", 4, "ngIf"], [1, "message-row", "py-6", "group", "hover:bg-ink-800/20", "transition-all", "duration-300", "border-b", "border-white/5", "last:border-b-0"], [1, "flex", "items-center", "gap-3", "mb-3", "px-6"], [1, "w-8", "h-8", "rounded-full", "flex", "items-center", "justify-center", "text-sm", "font-semibold", "flex-shrink-0", 3, "ngClass"], [1, "flex", "items-center", "gap-2", "flex-1"], [1, "font-medium", "text-neutral-200", "text-sm"], [1, "text-xs", "text-neutral-500"], [1, "flex", "items-center", "gap-1", "opacity-0", "group-hover:opacity-100", "transition-opacity"], ["title", "Copy message", 1, "p-1.5", "rounded-lg", "hover:bg-ink-600/50", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-neutral-400", "hover:text-accent-300"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"], ["class", "p-1.5 rounded-lg hover:bg-ink-600/50 transition-colors", "title", "Edit message", 3, "click", 4, "ngIf"], ["class", "p-1.5 rounded-lg hover:bg-ink-600/50 transition-colors", "title", "Regenerate response", 3, "click", 4, "ngIf"], ["title", "Delete message", 1, "p-1.5", "rounded-lg", "hover:bg-red-500/20", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-neutral-400", "hover:text-red-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "px-6", "ml-11"], [1, "prose", "prose-invert", "max-w-none", "text-neutral-100", "leading-relaxed", 3, "innerHTML"], ["title", "Edit message", 1, "p-1.5", "rounded-lg", "hover:bg-ink-600/50", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-neutral-400", "hover:text-gold-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["title", "Regenerate response", 1, "p-1.5", "rounded-lg", "hover:bg-ink-600/50", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-neutral-400", "hover:text-emerald-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], [1, "message-row", "py-6", "group"], [1, "w-8", "h-8", "rounded-full", "bg-gradient-to-r", "from-ink-600", "to-ink-500", "text-accent-300", "flex", "items-center", "justify-center", "text-sm", "font-semibold", "flex-shrink-0"], [1, "typing-indicator"], [1, "typing-dot"]], template: function MessageListComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2, 0);
    \u0275\u0275template(2, MessageListComponent_div_2_Template, 8, 2, "div", 3)(3, MessageListComponent_div_3_Template, 4, 3, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.combined().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.combined().length > 0);
  }
}, dependencies: [NgForOf, NgClass, NgIf, TitleCasePipe, MarkdownPipe], encapsulation: 2 });
var MessageListComponent = _MessageListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageListComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-message-list", imports: [NgForOf, NgClass, TitleCasePipe, MarkdownPipe, NgIf], template: `<div #messageContainer class="h-full flex flex-col">
  <!-- Empty State -->
  <div *ngIf="combined().length === 0" class="flex-1 flex items-center justify-center px-8">
    <div class="text-center max-w-2xl">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-accent-500/20 to-purple-500/20 flex items-center justify-center">
        <svg class="w-12 h-12 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </div>
      
      <!-- Agent-specific welcome message -->
      <div *ngIf="currentAgent(); else noAgentSelected">
        <h2 class="text-2xl font-semibold text-gradient mb-3">Welcome to {{ currentAgent()?.name }}</h2>
        <p class="text-neutral-400 mb-8 leading-relaxed">
          {{ currentAgent()?.description || 'Start a conversation with this AI assistant. Ask questions, get help with tasks, or explore possibilities.' }}
        </p>
      </div>
      
      <!-- Default message when no agent selected -->
      <ng-template #noAgentSelected>
        <h2 class="text-2xl font-semibold text-gradient mb-3">Welcome to AI Chat</h2>
        <p class="text-neutral-400 mb-8 leading-relaxed">
          Select an AI assistant from the sidebar to start a conversation. Each assistant specializes in different areas to help you with various tasks.
        </p>
      </ng-template>      
    </div>
  </div>

  <!-- Messages -->
  <div *ngIf="combined().length > 0" class="flex-1 overflow-y-auto">
    <div class="max-w-3xl mx-auto">
      <div *ngFor="let m of combined(); trackBy: trackByMessageId"
           class="message-row py-6 group hover:bg-ink-800/20 transition-all duration-300 border-b border-white/5 last:border-b-0">
        
        <!-- Message Header - Single Line with Avatar + Name + Timestamp -->
        <div class="flex items-center gap-3 mb-3 px-6">
          <!-- Avatar -->
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
               [ngClass]="{
                 'bg-gradient-to-r from-accent-500 to-purple-500 text-white': m.role==='user',
                 'bg-gradient-to-r from-ink-600 to-ink-500 text-accent-300': m.role==='assistant'
               }">
            {{ m.role === 'user' ? 'U' : 'AI' }}
          </div>
          
          <!-- Name + Timestamp -->
          <div class="flex items-center gap-2 flex-1">
            <span class="font-medium text-neutral-200 text-sm">{{ m.role | titlecase }}</span>
            <span class="text-xs text-neutral-500">\u2022</span>
            <span class="text-xs text-neutral-500">{{ formatTimestamp(m.created_at) }}</span>
          </div>

          <!-- Message Actions -->
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="p-1.5 rounded-lg hover:bg-ink-600/50 transition-colors"
                    (click)="copyMessage(m.content)"
                    title="Copy message">
              <svg class="w-4 h-4 text-neutral-400 hover:text-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>

            <button *ngIf="m.role === 'user'" 
                    class="p-1.5 rounded-lg hover:bg-ink-600/50 transition-colors"
                    (click)="editMessage(m.id, m.content)"
                    title="Edit message">
              <svg class="w-4 h-4 text-neutral-400 hover:text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>

            <button *ngIf="m.role === 'assistant'" 
                    class="p-1.5 rounded-lg hover:bg-ink-600/50 transition-colors"
                    (click)="regenerateMessage(m.id)"
                    title="Regenerate response">
              <svg class="w-4 h-4 text-neutral-400 hover:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>

            <button class="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                    (click)="deleteMessage(m.id)"
                    title="Delete message">
              <svg class="w-4 h-4 text-neutral-400 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Message Content - Clean Text -->
        <div class="px-6 ml-11">
          <div [innerHTML]="m.content | md" class="prose prose-invert max-w-none text-neutral-100 leading-relaxed"></div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div *ngIf="showTypingIndicator()" class="message-row py-6 group">
        <div class="flex items-center gap-3 mb-3 px-6">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-ink-600 to-ink-500 text-accent-300 flex items-center justify-center text-sm font-semibold flex-shrink-0">
            AI
          </div>
          <div class="flex items-center gap-2 flex-1">
            <span class="font-medium text-neutral-200 text-sm">Assistant</span>
            <span class="text-xs text-neutral-500">\u2022</span>
            <span class="text-xs text-neutral-500">Typing...</span>
          </div>
        </div>
        <div class="px-6 ml-11">
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
` }]
  }], () => [], { messageContainer: [{
    type: ViewChild,
    args: ["messageContainer", { static: false }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MessageListComponent, { className: "MessageListComponent", filePath: "src/app/features/chat/components/message-list.component.ts", lineNumber: 16 });
})();

// src/app/features/chat/components/composer.component.ts
var _c03 = ["textarea"];
var _c12 = (a0, a1) => ({ "bg-gradient-to-r from-accent-500 to-purple-500 text-white shadow-glow hover:shadow-glow-purple": a0, "bg-ink-600/50 text-neutral-500 cursor-not-allowed": a1 });
var _c2 = (a0, a1, a2) => ({ "text-neutral-400": a0, "text-gold-400": a1, "text-red-400": a2 });
function ComposerComponent__svg_svg_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 13);
    \u0275\u0275element(1, "path", 14);
    \u0275\u0275elementEnd();
  }
}
function ComposerComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 15);
  }
}
function ComposerComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "div", 17);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Press Enter to send, Shift+Enter for new line");
    \u0275\u0275elementEnd()();
  }
}
function ComposerComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 18);
    \u0275\u0275element(2, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Start typing to begin a conversation");
    \u0275\u0275elementEnd()();
  }
}
var _ComposerComponent = class _ComposerComponent {
  constructor() {
    this.chat = inject(ChatService);
    this.s = inject(SessionService);
    this.toast = inject(ToastService);
    this.text = "";
    this.sending = signal(false, ...ngDevMode ? [{ debugName: "sending" }] : []);
    this.isFocused = signal(false, ...ngDevMode ? [{ debugName: "isFocused" }] : []);
    this.maxLength = 4e3;
  }
  get characterCount() {
    return this.text.length;
  }
  get isNearLimit() {
    return this.characterCount > this.maxLength * 0.8;
  }
  get isOverLimit() {
    return this.characterCount > this.maxLength;
  }
  get canSend() {
    return this.text.trim().length > 0 && !this.isOverLimit && !this.sending();
  }
  onKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
  onTextareaInput() {
    this.autoResize();
  }
  autoResize() {
    if (this.textarea) {
      const textarea = this.textarea.nativeElement;
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 200;
      textarea.style.height = Math.min(scrollHeight, maxHeight) + "px";
    }
  }
  focus() {
    if (this.textarea) {
      this.textarea.nativeElement.focus();
    }
  }
  send() {
    return __async(this, null, function* () {
      const sid = this.s.activeSessionId();
      if (!sid) {
        this.toast.show("Create/select a session", "info");
        return;
      }
      if (!this.text.trim())
        return;
      if (this.isOverLimit) {
        this.toast.show("Message too long", "error");
        return;
      }
      this.sending.set(true);
      try {
        const messageContent = this.text.trim();
        this.text = "";
        this.autoResize();
        this.chat.send(messageContent, () => {
          console.log("First token received");
        }, () => {
          console.log("Streaming complete, reloading messages");
          this.s.loadMessages(sid);
          this.sending.set(false);
        });
      } catch (error) {
        this.sending.set(false);
      }
    });
  }
};
_ComposerComponent.\u0275fac = function ComposerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ComposerComponent)();
};
_ComposerComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ComposerComponent, selectors: [["app-composer"]], viewQuery: function ComposerComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c03, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.textarea = _t.first);
  }
}, hostBindings: function ComposerComponent_HostBindings(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275listener("keydown", function ComposerComponent_keydown_HostBindingHandler($event) {
      return ctx.onKeyDown($event);
    });
  }
}, decls: 16, vars: 19, consts: [["textarea", ""], [1, "relative"], [1, "relative", "bg-ink-800/60", "backdrop-blur-xl", "border", "border-white/20", "rounded-2xl", "shadow-lg", "transition-all", "duration-300", "hover:shadow-xl", "focus-within:shadow-glow", "focus-within:border-accent-500/50"], [1, "flex", "items-end", "gap-3", "p-4"], [1, "flex-1", "relative"], ["id", "composer-input", "rows", "1", "placeholder", "Message AI Assistant...", 1, "w-full", "bg-transparent", "resize-none", "text-neutral-100", "placeholder-neutral-400", "outline-none", "leading-6", "min-h-[24px]", "max-h-[200px]", 3, "ngModelChange", "input", "focus", "blur", "ngModel", "disabled", "maxlength"], ["title", "Send message (Enter)", 1, "flex-shrink-0", "p-3", "rounded-xl", "transition-all", "duration-300", "transform", "hover:scale-105", "active:scale-95", 3, "click", "ngClass", "disabled"], ["class", "w-5 h-5", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["class", "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin", 4, "ngIf"], [1, "flex", "items-center", "justify-between", "px-4", "pb-3"], [1, "flex", "items-center", "gap-4", "text-xs", "text-neutral-400"], [3, "ngClass"], ["class", "flex items-center gap-1", 4, "ngIf"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"], [1, "w-5", "h-5", "border-2", "border-white", "border-t-transparent", "rounded-full", "animate-spin"], [1, "flex", "items-center", "gap-1"], [1, "w-1.5", "h-1.5", "bg-accent-400", "rounded-full", "animate-pulse"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"]], template: function ComposerComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "textarea", 5, 0);
    \u0275\u0275twoWayListener("ngModelChange", function ComposerComponent_Template_textarea_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.text, $event) || (ctx.text = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function ComposerComponent_Template_textarea_input_4_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.onTextareaInput());
    })("focus", function ComposerComponent_Template_textarea_focus_4_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.isFocused.set(true));
    })("blur", function ComposerComponent_Template_textarea_blur_4_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.isFocused.set(false));
    });
    \u0275\u0275text(6, "        ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 6);
    \u0275\u0275listener("click", function ComposerComponent_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView(ctx.send());
    });
    \u0275\u0275template(8, ComposerComponent__svg_svg_8_Template, 2, 0, "svg", 7)(9, ComposerComponent_div_9_Template, 1, 0, "div", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 9)(11, "div", 10)(12, "div", 11);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ComposerComponent_div_14_Template, 4, 0, "div", 12)(15, ComposerComponent_div_15_Template, 5, 0, "div", 12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.text);
    \u0275\u0275property("disabled", ctx.sending())("maxlength", ctx.maxLength);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(12, _c12, ctx.canSend, !ctx.canSend))("disabled", !ctx.canSend);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.sending());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.sending());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(15, _c2, !ctx.isNearLimit, ctx.isNearLimit && !ctx.isOverLimit, ctx.isOverLimit));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx.characterCount, "/", ctx.maxLength, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isFocused());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isFocused() && !ctx.text);
  }
}, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, NgIf, NgClass], encapsulation: 2 });
var ComposerComponent = _ComposerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComposerComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-composer", imports: [FormsModule, NgIf, NgClass], template: `<!-- ChatGPT-style Input Composer -->
<div class="relative">
  <!-- Main Input Container -->
  <div class="relative bg-ink-800/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl focus-within:shadow-glow focus-within:border-accent-500/50">
    
    <!-- Input Area -->
    <div class="flex items-end gap-3 p-4">
      <div class="flex-1 relative">
        <textarea 
          #textarea
          id="composer-input"
          class="w-full bg-transparent resize-none text-neutral-100 placeholder-neutral-400 outline-none leading-6 min-h-[24px] max-h-[200px]"
          rows="1"
          placeholder="Message AI Assistant..."
          [(ngModel)]="text"
          (input)="onTextareaInput()"
          (focus)="isFocused.set(true)"
          (blur)="isFocused.set(false)"
          [disabled]="sending()"
          [maxlength]="maxLength">
        </textarea>
      </div>
      
      <!-- Send Button -->
      <button 
        class="flex-shrink-0 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        [ngClass]="{
          'bg-gradient-to-r from-accent-500 to-purple-500 text-white shadow-glow hover:shadow-glow-purple': canSend,
          'bg-ink-600/50 text-neutral-500 cursor-not-allowed': !canSend
        }"
        [disabled]="!canSend"
        (click)="send()"
        title="Send message (Enter)">
        <svg *ngIf="!sending()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
        <div *ngIf="sending()" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </button>
    </div>

    <!-- Footer Info -->
    <div class="flex items-center justify-between px-4 pb-3">
      <div class="flex items-center gap-4 text-xs text-neutral-400">
        <!-- Character Counter -->
        <div [ngClass]="{
          'text-neutral-400': !isNearLimit,
          'text-gold-400': isNearLimit && !isOverLimit,
          'text-red-400': isOverLimit
        }">
          {{ characterCount }}/{{ maxLength }}
        </div>
        
        <!-- Status Messages -->
        <div *ngIf="isFocused()" class="flex items-center gap-1">
          <div class="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse"></div>
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
        <div *ngIf="!isFocused() && !text" class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Start typing to begin a conversation</span>
        </div>
      </div>
      
    </div>
  </div>
</div>
` }]
  }], null, { textarea: [{
    type: ViewChild,
    args: ["textarea", { static: false }]
  }], onKeyDown: [{
    type: HostListener,
    args: ["keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ComposerComponent, { className: "ComposerComponent", filePath: "src/app/features/chat/components/composer.component.ts", lineNumber: 14 });
})();

// src/app/features/chat/chat.page.ts
var _ChatPageComponent = class _ChatPageComponent {
  constructor() {
    this.sessions = inject(SessionService);
    this.agents = inject(AgentService);
    this.chat = inject(ChatService);
    this.toast = inject(ToastService);
    this.isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
    this.sessions.list().catch(() => this.toast.show("Failed to load sessions", "error"));
    this.agents.fetchAgents().catch(() => this.toast.show("Failed to load agents", "error"));
    effect(() => {
      const sid = this.sessions.activeSessionId();
      if (sid != null) {
        this.sessions.loadMessages(sid);
        try {
          this.chat.connect(sid);
        } catch {
        }
      } else {
        this.chat.disconnect();
        this.sessions.clearMessages();
      }
    });
  }
  onKey(e) {
    if (e.ctrlKey && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const input = document.getElementById("composer-input");
      input?.focus();
    }
    if (e.ctrlKey && e.key.toLowerCase() === "n") {
      e.preventDefault();
      const ag = this.agents.agents()[0];
      if (ag)
        this.sessions.create(ag.id, "New session");
    }
  }
  sendMessage(content) {
    if (!content.trim())
      return;
    this.isLoading.set(true);
    try {
      this.chat.send(content, () => {
        this.isLoading.set(false);
      }, () => {
        const sid = this.sessions.activeSessionId();
        if (sid) {
          this.sessions.loadMessages(sid);
        }
      });
      setTimeout(() => {
        if (this.isLoading()) {
          this.toast.show("Model is waking up... please wait a few more seconds.", "info");
        }
      }, 2e4);
    } catch (err) {
      this.toast.show("Failed to send message", "error");
      this.isLoading.set(false);
    }
  }
};
_ChatPageComponent.\u0275fac = function ChatPageComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ChatPageComponent)();
};
_ChatPageComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChatPageComponent, selectors: [["app-chat-page"]], hostBindings: function ChatPageComponent_HostBindings(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275listener("keydown", function ChatPageComponent_keydown_HostBindingHandler($event) {
      return ctx.onKey($event);
    }, \u0275\u0275resolveWindow);
  }
}, decls: 10, vars: 0, consts: [[1, "flex", "h-screen", "overflow-hidden"], [1, "w-1/5", "min-w-[280px]", "max-w-[320px]", "bg-ink-900/80", "backdrop-blur-xl", "border-r", "border-white/10", "flex", "flex-col"], [1, "flex-1", "flex", "flex-col", "bg-gradient-to-br", "from-ink-900/50", "to-ink-800/30", "relative"], [1, "flex-1", "overflow-hidden"], [1, "h-full", "overflow-y-auto"], [1, "sticky", "bottom-0", "bg-gradient-to-t", "from-ink-900/95", "to-transparent", "backdrop-blur-sm", "border-t", "border-white/5"], [1, "max-w-4xl", "mx-auto", "px-4", "py-6"]], template: function ChatPageComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "app-session-sidebar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "div", 4);
    \u0275\u0275element(6, "app-message-list");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
    \u0275\u0275element(9, "app-composer");
    \u0275\u0275elementEnd()()()();
  }
}, dependencies: [SessionSidebarComponent, MessageListComponent, ComposerComponent], encapsulation: 2 });
var ChatPageComponent = _ChatPageComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChatPageComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-chat-page", imports: [SessionSidebarComponent, MessageListComponent, ComposerComponent], template: '<!-- ChatGPT-style Layout: Fixed Sidebar + Full-screen Chat -->\n<div class="flex h-screen overflow-hidden">\n  \n  <!-- Left Sidebar - Fixed 20% Width -->\n  <div class="w-1/5 min-w-[280px] max-w-[320px] bg-ink-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col">\n    <app-session-sidebar></app-session-sidebar>\n  </div>\n\n  <!-- Main Chat Area - 80% Width -->\n  <div class="flex-1 flex flex-col bg-gradient-to-br from-ink-900/50 to-ink-800/30 relative">\n    \n    <!-- Messages Area - Takes remaining space -->\n    <div class="flex-1 overflow-hidden">\n      <div class="h-full overflow-y-auto">\n        <app-message-list></app-message-list>\n      </div>\n    </div>\n    \n    <!-- Composer - Fixed at bottom -->\n    <div class="sticky bottom-0 bg-gradient-to-t from-ink-900/95 to-transparent backdrop-blur-sm border-t border-white/5">\n      <div class="max-w-4xl mx-auto px-4 py-6">\n        <app-composer></app-composer>\n      </div>\n    </div>\n  </div>\n</div>\n' }]
  }], () => [], { onKey: [{
    type: HostListener,
    args: ["window:keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChatPageComponent, { className: "ChatPageComponent", filePath: "src/app/features/chat/chat.page.ts", lineNumber: 16 });
})();
export {
  ChatPageComponent
};
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.2.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.7/LICENSE *)
*/
//# sourceMappingURL=chunk-EOFJXUN7.js.map
