import {
  HttpClient,
  Injectable,
  __async,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-SEPIUDJB.js";

// src/environments/environment.ts
var environment = {
  production: false,
  apiUrl: "http://localhost:8000/api/v1",
  wsUrl: "ws://localhost:8000",
  enableDebugTools: true,
  strictMode: false,
  logLevel: "debug",
  captchaEnabled: true,
  maxRetryAttempts: 3,
  requestTimeout: 1e4,
  // 10 seconds for dev
  tokenRefreshInterval: 14 * 60 * 1e3
  // 14 minutes
};

// src/app/core/constants/app.constants.ts
var TOKEN_KEY = "access_token";
var USER_EMAIL_KEY = "user_email";
var TOKEN_REFRESH_INTERVAL = 14 * 60 * 1e3;
var TOKEN_EXPIRY_BUFFER = 60 * 1e3;
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  UNAUTHORIZED: "Session expired. Please log in again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  CAPTCHA_REQUIRED: "CAPTCHA verification is required for login.",
  CAPTCHA_INVALID: "Invalid CAPTCHA. Please try again.",
  TOO_MANY_ATTEMPTS: "Too many failed attempts. Please try again later.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_ALREADY_EXISTS: "Email is already registered.",
  PASSWORD_TOO_WEAK: "Password must be at least 6 characters long.",
  INVALID_EMAIL: "Please enter a valid email address.",
  REQUIRED_FIELD: "This field is required.",
  MIN_LENGTH: "Must be at least {min} characters long.",
  MAX_LENGTH: "Must be no more than {max} characters long.",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match."
};

// src/app/core/services/secure-storage.service.ts
var _SecureStorageService = class _SecureStorageService {
  constructor() {
    this.STORAGE_PREFIX = "chat_secure_";
    this.ENCRYPTION_KEY = "chat_app_key_2024";
  }
  /**
   * Store data securely with encryption
   */
  setSecureItem(key, value) {
    try {
      const encryptedValue = this.encrypt(value);
      sessionStorage.setItem(this.STORAGE_PREFIX + key, encryptedValue);
    } catch (error) {
      console.error("Failed to store secure item:", error);
      sessionStorage.setItem(key, value);
    }
  }
  /**
   * Retrieve data securely with decryption
   */
  getSecureItem(key) {
    try {
      const encryptedValue = sessionStorage.getItem(this.STORAGE_PREFIX + key);
      if (!encryptedValue) {
        return null;
      }
      return this.decrypt(encryptedValue);
    } catch (error) {
      console.error("Failed to retrieve secure item:", error);
      return sessionStorage.getItem(key);
    }
  }
  /**
   * Remove secure item
   */
  removeSecureItem(key) {
    sessionStorage.removeItem(this.STORAGE_PREFIX + key);
    sessionStorage.removeItem(key);
  }
  /**
   * Clear all secure items
   */
  clearSecureStorage() {
    const keys = Object.keys(sessionStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.STORAGE_PREFIX)) {
        sessionStorage.removeItem(key);
      }
    });
  }
  /**
   * Simple encryption using base64 and simple obfuscation
   * Note: This is not cryptographically secure, just obfuscation
   * For production, use proper encryption libraries
   */
  encrypt(text) {
    try {
      let encrypted = "";
      for (let i = 0; i < text.length; i++) {
        const keyChar = this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length);
        const textChar = text.charCodeAt(i);
        encrypted += String.fromCharCode(textChar ^ keyChar);
      }
      return btoa(encrypted);
    } catch (error) {
      console.error("Encryption failed:", error);
      return text;
    }
  }
  /**
   * Simple decryption
   */
  decrypt(encryptedText) {
    try {
      const encrypted = atob(encryptedText);
      let decrypted = "";
      for (let i = 0; i < encrypted.length; i++) {
        const keyChar = this.ENCRYPTION_KEY.charCodeAt(i % this.ENCRYPTION_KEY.length);
        const encryptedChar = encrypted.charCodeAt(i);
        decrypted += String.fromCharCode(encryptedChar ^ keyChar);
      }
      return decrypted;
    } catch (error) {
      console.error("Decryption failed:", error);
      return encryptedText;
    }
  }
  /**
   * Check if secure storage is available
   */
  isSecureStorageAvailable() {
    try {
      const testKey = "test_secure_storage";
      const testValue = "test_value";
      this.setSecureItem(testKey, testValue);
      const retrieved = this.getSecureItem(testKey);
      this.removeSecureItem(testKey);
      return retrieved === testValue;
    } catch (error) {
      return false;
    }
  }
};
_SecureStorageService.\u0275fac = function SecureStorageService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SecureStorageService)();
};
_SecureStorageService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SecureStorageService, factory: _SecureStorageService.\u0275fac, providedIn: "root" });
var SecureStorageService = _SecureStorageService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SecureStorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/auth.service.ts
var _AuthService = class _AuthService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = environment.apiUrl;
    this.tokenRefreshTimer = null;
    this.secureStorage = inject(SecureStorageService);
    this.currentUser = signal(this.secureStorage.getSecureItem(USER_EMAIL_KEY), ...ngDevMode ? [{ debugName: "currentUser" }] : []);
    this.accessToken = signal(this.secureStorage.getSecureItem(TOKEN_KEY), ...ngDevMode ? [{ debugName: "accessToken" }] : []);
    this.isLoggingOut = false;
    if (this.accessToken()) {
      this.startTokenRefresh();
    }
  }
  signup(email, password) {
    return __async(this, null, function* () {
      yield this.http.post(`${this.baseUrl}/auth/signup`, { email, password }).toPromise();
    });
  }
  /**
   * Authenticate user with email, password, and CAPTCHA verification
   * @param email - User's email address
   * @param password - User's password
   * @param captchaData - CAPTCHA verification data (required for security)
   * @throws {HttpErrorResponse} When authentication fails
   */
  login(email, password, captchaData) {
    return __async(this, null, function* () {
      const loginPayload = { email, password };
      if (captchaData) {
        loginPayload.captcha_id = captchaData.captcha_id;
        loginPayload.captcha_answer = captchaData.captcha_answer;
      }
      const res = yield this.http.post(`${this.baseUrl}/auth/login`, loginPayload).toPromise();
      if (res?.access_token) {
        this.secureStorage.setSecureItem(TOKEN_KEY, res.access_token);
        this.secureStorage.setSecureItem(USER_EMAIL_KEY, email);
        this.accessToken.set(res.access_token);
        this.currentUser.set(email);
        this.startTokenRefresh();
      }
    });
  }
  refresh() {
    return __async(this, null, function* () {
      const res = yield this.http.post(`${this.baseUrl}/auth/refresh`, {}).toPromise();
      if (res?.access_token) {
        this.secureStorage.setSecureItem(TOKEN_KEY, res.access_token);
        this.accessToken.set(res.access_token);
      }
    });
  }
  startTokenRefresh() {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }
    this.tokenRefreshTimer = setTimeout(() => __async(this, null, function* () {
      try {
        yield this.refresh();
        this.startTokenRefresh();
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }), environment.tokenRefreshInterval);
  }
  logout() {
    return __async(this, null, function* () {
      if (this.isLoggingOut) {
        return;
      }
      this.isLoggingOut = true;
      try {
        if (this.tokenRefreshTimer) {
          clearTimeout(this.tokenRefreshTimer);
          this.tokenRefreshTimer = null;
        }
        try {
          yield this.http.post(`${this.baseUrl}/auth/logout`, {}).toPromise();
        } catch (error) {
          console.warn("Logout API call failed:", error);
        }
        this.secureStorage.removeSecureItem(TOKEN_KEY);
        this.secureStorage.removeSecureItem(USER_EMAIL_KEY);
        this.currentUser.set(null);
        this.accessToken.set(null);
      } finally {
        this.isLoggingOut = false;
      }
    });
  }
  /**
   * Check if logout is currently in progress
   */
  isLogoutInProgress() {
    return this.isLoggingOut;
  }
  ngOnDestroy() {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
      this.tokenRefreshTimer = null;
    }
  }
};
_AuthService.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthService)();
};
_AuthService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
var AuthService = _AuthService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/core/services/toast.service.ts
var _ToastService = class _ToastService {
  constructor() {
    this.toasts = signal([], ...ngDevMode ? [{ debugName: "toasts" }] : []);
    this.id = 1;
  }
  show(text, type = "info") {
    const t = { id: this.id++, text, type };
    this.toasts.update((arr) => [...arr, t]);
    setTimeout(() => this.dismiss(t.id), 3e3);
  }
  dismiss(id) {
    this.toasts.update((arr) => arr.filter((x) => x.id !== id));
  }
};
_ToastService.\u0275fac = function ToastService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ToastService)();
};
_ToastService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
var ToastService = _ToastService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  environment,
  TOKEN_KEY,
  ERROR_MESSAGES,
  SecureStorageService,
  AuthService,
  ToastService
};
//# sourceMappingURL=chunk-OPGT5SRN.js.map
