import {
  Component,
  RouterLink,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵtext
} from "./chunk-SEPIUDJB.js";

// src/app/features/landing/landing.component.ts
var _LandingComponent = class _LandingComponent {
};
_LandingComponent.\u0275fac = function LandingComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LandingComponent)();
};
_LandingComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LandingComponent, selectors: [["app-landing"]], decls: 103, vars: 0, consts: [[1, "mx-auto", "max-w-7xl", "px-4"], [1, "grid", "place-items-center", "text-center", "min-h-[80vh]", "relative"], [1, "absolute", "inset-0", "overflow-hidden"], [1, "absolute", "top-1/4", "left-1/4", "w-96", "h-96", "bg-accent-500/10", "rounded-full", "blur-3xl", "animate-float"], [1, "absolute", "bottom-1/4", "right-1/4", "w-80", "h-80", "bg-purple-500/10", "rounded-full", "blur-3xl", "animate-float", 2, "animation-delay", "1s"], [1, "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "w-64", "h-64", "bg-gold-500/10", "rounded-full", "blur-3xl", "animate-float", 2, "animation-delay", "2s"], [1, "relative", "z-10", "space-y-8"], [1, "space-y-4"], [1, "text-5xl", "md:text-7xl", "font-bold", "text-gradient", "animate-fade-in"], [1, "text-xl", "md:text-2xl", "text-neutral-300", "max-w-3xl", "mx-auto", "animate-slide-up", 2, "animation-delay", "0.2s"], [1, "flex", "flex-col", "sm:flex-row", "justify-center", "gap-4", "animate-slide-up", 2, "animation-delay", "0.4s"], ["routerLink", "/login", 1, "btn", "btn-primary", "text-lg", "px-8", "py-4", "animate-pulse-glow"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 10V3L4 14h7v7l9-11h-7z"], ["routerLink", "/chat", 1, "btn", "btn-ghost", "text-lg", "px-8", "py-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-8", "mt-16", "animate-slide-up", 2, "animation-delay", "0.6s"], [1, "card-premium", "p-6", "text-center"], [1, "text-3xl", "font-bold", "text-gradient", "mb-2"], [1, "text-sm", "text-neutral-400"], [1, "py-20"], [1, "text-center", "mb-16"], [1, "text-4xl", "font-bold", "text-gradient", "mb-4"], [1, "text-xl", "text-neutral-300"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-8"], [1, "card-premium", "p-6", "hover:scale-105", "transition-transform", "duration-300"], [1, "w-12", "h-12", "bg-gradient-to-r", "from-accent-500", "to-purple-500", "rounded-xl", "flex", "items-center", "justify-center", "mb-4"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], [1, "text-xl", "font-semibold", "mb-2"], [1, "text-neutral-400"], [1, "w-12", "h-12", "bg-gradient-to-r", "from-purple-500", "to-gold-500", "rounded-xl", "flex", "items-center", "justify-center", "mb-4"], [1, "w-12", "h-12", "bg-gradient-to-r", "from-gold-500", "to-emerald-500", "rounded-xl", "flex", "items-center", "justify-center", "mb-4"], [1, "w-12", "h-12", "bg-gradient-to-r", "from-emerald-500", "to-accent-500", "rounded-xl", "flex", "items-center", "justify-center", "mb-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 12h16M4 18h16"], [1, "w-12", "h-12", "bg-gradient-to-r", "from-accent-500", "to-emerald-500", "rounded-xl", "flex", "items-center", "justify-center", "mb-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"], [1, "w-12", "h-12", "bg-gradient-to-r", "from-purple-500", "to-accent-500", "rounded-xl", "flex", "items-center", "justify-center", "mb-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"], [1, "text-center", "py-20"], [1, "card-premium", "p-12", "max-w-4xl", "mx-auto"], [1, "text-3xl", "font-bold", "text-gradient", "mb-4"], [1, "text-xl", "text-neutral-300", "mb-8"], [1, "flex", "flex-col", "sm:flex-row", "justify-center", "gap-4"], ["routerLink", "/login", 1, "btn", "btn-primary", "text-lg", "px-8", "py-4"]], template: function LandingComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275element(3, "div", 3)(4, "div", 4)(5, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6)(7, "div", 7)(8, "h1", 8);
    \u0275\u0275text(9, " Your Private AI Chat ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 9);
    \u0275\u0275text(11, " Secure sessions, multiple agents, streaming replies \u2014 all without exposing API keys to the browser. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 10)(13, "a", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 12);
    \u0275\u0275element(15, "path", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Get Started ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "a", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 12);
    \u0275\u0275element(19, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " Open Chat ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "div", 16)(22, "div", 17)(23, "div", 18);
    \u0275\u0275text(24, "100%");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 19);
    \u0275\u0275text(26, "Private & Secure");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 17)(28, "div", 18);
    \u0275\u0275text(29, "\u221E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 19);
    \u0275\u0275text(31, "Unlimited Sessions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 17)(33, "div", 18);
    \u0275\u0275text(34, "\u26A1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 19);
    \u0275\u0275text(36, "Real-time Streaming");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(37, "div", 20)(38, "div", 21)(39, "h2", 22);
    \u0275\u0275text(40, "Premium Features");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "p", 23);
    \u0275\u0275text(42, "Everything you need for the perfect AI chat experience");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 24)(44, "div", 25)(45, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(46, "svg", 27);
    \u0275\u0275element(47, "path", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(48, "h3", 29);
    \u0275\u0275text(49, "Secure & Private");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "p", 30);
    \u0275\u0275text(51, "Your API keys never leave the server. All conversations are encrypted and private.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 25)(53, "div", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(54, "svg", 27);
    \u0275\u0275element(55, "path", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(56, "h3", 29);
    \u0275\u0275text(57, "Multiple AI Agents");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "p", 30);
    \u0275\u0275text(59, "Switch between different AI models and personalities for different use cases.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 25)(61, "div", 32);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(62, "svg", 27);
    \u0275\u0275element(63, "path", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(64, "h3", 29);
    \u0275\u0275text(65, "Real-time Streaming");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "p", 30);
    \u0275\u0275text(67, "See AI responses appear in real-time as they're generated, just like ChatGPT.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 25)(69, "div", 33);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(70, "svg", 27);
    \u0275\u0275element(71, "path", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(72, "h3", 29);
    \u0275\u0275text(73, "Session Management");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "p", 30);
    \u0275\u0275text(75, "Organize your conversations with unlimited sessions and smart grouping.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 25)(77, "div", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(78, "svg", 27);
    \u0275\u0275element(79, "path", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(80, "h3", 29);
    \u0275\u0275text(81, "Code Highlighting");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "p", 30);
    \u0275\u0275text(83, "Beautiful syntax highlighting for code blocks with copy-to-clipboard functionality.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "div", 25)(85, "div", 37);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(86, "svg", 27);
    \u0275\u0275element(87, "path", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(88, "h3", 29);
    \u0275\u0275text(89, "Message Actions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "p", 30);
    \u0275\u0275text(91, "Copy, edit, delete, and regenerate messages with intuitive controls.");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(92, "div", 39)(93, "div", 40)(94, "h2", 41);
    \u0275\u0275text(95, "Ready to Get Started?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "p", 42);
    \u0275\u0275text(97, "Join thousands of users who trust our platform for their AI conversations.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "div", 43)(99, "a", 44);
    \u0275\u0275text(100, " Start Chatting Now ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "a", 14);
    \u0275\u0275text(102, " Try Demo ");
    \u0275\u0275elementEnd()()()()();
  }
}, dependencies: [RouterLink], encapsulation: 2 });
var LandingComponent = _LandingComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LandingComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-landing", imports: [RouterLink], template: `<section class="mx-auto max-w-7xl px-4">
  <!-- Hero Section -->
  <div class="grid place-items-center text-center min-h-[80vh] relative">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>
    </div>

    <div class="relative z-10 space-y-8">
      <!-- Main Heading -->
      <div class="space-y-4">
        <h1 class="text-5xl md:text-7xl font-bold text-gradient animate-fade-in">
          Your Private AI Chat
        </h1>
        <p class="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
          Secure sessions, multiple agents, streaming replies \u2014 all without exposing API keys to the browser.
        </p>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style="animation-delay: 0.4s;">
        <a routerLink="/login" class="btn btn-primary text-lg px-8 py-4 animate-pulse-glow">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          Get Started
        </a>
        <a routerLink="/chat" class="btn btn-ghost text-lg px-8 py-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Open Chat
        </a>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up" style="animation-delay: 0.6s;">
        <div class="card-premium p-6 text-center">
          <div class="text-3xl font-bold text-gradient mb-2">100%</div>
          <div class="text-sm text-neutral-400">Private & Secure</div>
        </div>
        <div class="card-premium p-6 text-center">
          <div class="text-3xl font-bold text-gradient mb-2">\u221E</div>
          <div class="text-sm text-neutral-400">Unlimited Sessions</div>
        </div>
        <div class="card-premium p-6 text-center">
          <div class="text-3xl font-bold text-gradient mb-2">\u26A1</div>
          <div class="text-sm text-neutral-400">Real-time Streaming</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="py-20">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gradient mb-4">Premium Features</h2>
      <p class="text-xl text-neutral-300">Everything you need for the perfect AI chat experience</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Feature 1 -->
      <div class="card-premium p-6 hover:scale-105 transition-transform duration-300">
        <div class="w-12 h-12 bg-gradient-to-r from-accent-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Secure & Private</h3>
        <p class="text-neutral-400">Your API keys never leave the server. All conversations are encrypted and private.</p>
      </div>

      <!-- Feature 2 -->
      <div class="card-premium p-6 hover:scale-105 transition-transform duration-300">
        <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-gold-500 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Multiple AI Agents</h3>
        <p class="text-neutral-400">Switch between different AI models and personalities for different use cases.</p>
      </div>

      <!-- Feature 3 -->
      <div class="card-premium p-6 hover:scale-105 transition-transform duration-300">
        <div class="w-12 h-12 bg-gradient-to-r from-gold-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Real-time Streaming</h3>
        <p class="text-neutral-400">See AI responses appear in real-time as they're generated, just like ChatGPT.</p>
      </div>

      <!-- Feature 4 -->
      <div class="card-premium p-6 hover:scale-105 transition-transform duration-300">
        <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-accent-500 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Session Management</h3>
        <p class="text-neutral-400">Organize your conversations with unlimited sessions and smart grouping.</p>
      </div>

      <!-- Feature 5 -->
      <div class="card-premium p-6 hover:scale-105 transition-transform duration-300">
        <div class="w-12 h-12 bg-gradient-to-r from-accent-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Code Highlighting</h3>
        <p class="text-neutral-400">Beautiful syntax highlighting for code blocks with copy-to-clipboard functionality.</p>
      </div>

      <!-- Feature 6 -->
      <div class="card-premium p-6 hover:scale-105 transition-transform duration-300">
        <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-accent-500 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Message Actions</h3>
        <p class="text-neutral-400">Copy, edit, delete, and regenerate messages with intuitive controls.</p>
      </div>
    </div>
  </div>

  <!-- CTA Section -->
  <div class="text-center py-20">
    <div class="card-premium p-12 max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gradient mb-4">Ready to Get Started?</h2>
      <p class="text-xl text-neutral-300 mb-8">Join thousands of users who trust our platform for their AI conversations.</p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a routerLink="/login" class="btn btn-primary text-lg px-8 py-4">
          Start Chatting Now
        </a>
        <a routerLink="/chat" class="btn btn-ghost text-lg px-8 py-4">
          Try Demo
        </a>
      </div>
    </div>
  </div>
</section>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LandingComponent, { className: "LandingComponent", filePath: "src/app/features/landing/landing.component.ts", lineNumber: 10 });
})();
export {
  LandingComponent
};
//# sourceMappingURL=chunk-HJQTGTCL.js.map
