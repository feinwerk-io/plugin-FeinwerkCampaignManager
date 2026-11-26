(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("CoreHome"), require("vue"), require("CorePluginsAdmin"));
	else if(typeof define === 'function' && define.amd)
		define(["CoreHome", , "CorePluginsAdmin"], factory);
	else if(typeof exports === 'object')
		exports["FeinwerkCampaignManager"] = factory(require("CoreHome"), require("vue"), require("CorePluginsAdmin"));
	else
		root["FeinwerkCampaignManager"] = factory(root["CoreHome"], root["Vue"], root["CorePluginsAdmin"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__19dc__, __WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a5a2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "plugins/FeinwerkCampaignManager/vue/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "19dc":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__19dc__;

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "a5a2":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_a5a2__;

/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "LinkBuilder", function() { return /* reexport */ LinkBuilder; });
__webpack_require__.d(__webpack_exports__, "LinkList", function() { return /* reexport */ LinkList; });
__webpack_require__.d(__webpack_exports__, "CampaignOverview", function() { return /* reexport */ CampaignOverview; });
__webpack_require__.d(__webpack_exports__, "DataQuality", function() { return /* reexport */ DataQuality; });
__webpack_require__.d(__webpack_exports__, "CampaignPages", function() { return /* reexport */ CampaignPages; });
__webpack_require__.d(__webpack_exports__, "PlatformConnection", function() { return /* reexport */ PlatformConnection; });
__webpack_require__.d(__webpack_exports__, "PlatformStatus", function() { return /* reexport */ PlatformStatus; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/LinkBuilder.vue?vue&type=template&id=6fbd8bda

const _hoisted_1 = {
  class: "fwcmp-builder"
};
const _hoisted_2 = {
  key: 0,
  class: "fwcmp-editing"
};
const _hoisted_3 = {
  class: "fwcmp-editing__title"
};
const _hoisted_4 = {
  key: 0,
  class: "fwcmp-editing__since"
};
const _hoisted_5 = {
  key: 0,
  class: "fwcmp-editing__platform"
};
const _hoisted_6 = {
  class: "fwcmp-shortpill"
};
const _hoisted_7 = ["href", "aria-label"];
const _hoisted_8 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-download",
  "aria-hidden": "true"
}, null, -1);
const _hoisted_9 = ["href", "aria-label"];
const _hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const _hoisted_11 = {
  key: 1,
  class: "fwcmp-hint"
};
const _hoisted_12 = ["disabled", "aria-describedby"];
const _hoisted_13 = {
  key: 0,
  id: "fwcmp-live-first"
};
const _hoisted_14 = {
  key: 2,
  class: "fwcmp-confirm",
  role: "group"
};
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  key: 1,
  class: "fwcmp-hint fwcmp-editing__from"
};
const _hoisted_17 = {
  key: 2,
  class: "fwcmp-step fwcmp-livecard"
};
const _hoisted_18 = {
  class: "fwcmp-livecard__values"
};
const _hoisted_19 = {
  class: "fwcmp-row"
};
const _hoisted_20 = {
  class: "fwcmp-col"
};
const _hoisted_21 = {
  class: "fwcmp-label",
  for: "fwcmp-start"
};
const _hoisted_22 = {
  class: "fwcmp-col"
};
const _hoisted_23 = {
  class: "fwcmp-label",
  for: "fwcmp-end"
};
const _hoisted_24 = ["aria-invalid"];
const _hoisted_25 = {
  id: "fwcmp-end-msg",
  class: "fwcmp-msgs"
};
const _hoisted_26 = {
  key: 0,
  class: "fwcmp-msg fwcmp-msg--error"
};
const _hoisted_27 = {
  class: "fwcmp-label",
  for: "fwcmp-note"
};
const _hoisted_28 = {
  class: "fwcmp-step"
};
const _hoisted_29 = {
  class: "fwcmp-step__title"
};
const _hoisted_30 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "fwcmp-step__no",
  "aria-hidden": "true"
}, "1", -1);
const _hoisted_31 = {
  class: "fwcmp-label",
  for: "fwcmp-targetUrl"
};
const _hoisted_32 = ["placeholder", "aria-invalid"];
const _hoisted_33 = {
  id: "fwcmp-targetUrl-msg",
  class: "fwcmp-msgs"
};
const _hoisted_34 = {
  class: "fwcmp-step"
};
const _hoisted_35 = {
  class: "fwcmp-step__title"
};
const _hoisted_36 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "fwcmp-step__no",
  "aria-hidden": "true"
}, "2", -1);
const _hoisted_37 = ["aria-label"];
const _hoisted_38 = ["aria-pressed", "onClick"];
const _hoisted_39 = {
  class: "fwcmp-tile__label"
};
const _hoisted_40 = {
  class: "fwcmp-tile__hint"
};
const _hoisted_41 = {
  class: "fwcmp-row"
};
const _hoisted_42 = ["for"];
const _hoisted_43 = ["id", "onUpdate:modelValue", "aria-invalid", "aria-describedby"];
const _hoisted_44 = {
  key: 0,
  class: "fwcmp-chips"
};
const _hoisted_45 = {
  class: "fwcmp-chips__label"
};
const _hoisted_46 = ["onClick"];
const _hoisted_47 = ["id"];
const _hoisted_48 = ["onClick"];
const _hoisted_49 = {
  key: 0,
  class: "fwcmp-hint"
};
const _hoisted_50 = {
  class: "fwcmp-step"
};
const _hoisted_51 = {
  class: "fwcmp-step__title"
};
const _hoisted_52 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "fwcmp-step__no",
  "aria-hidden": "true"
}, "3", -1);
const _hoisted_53 = {
  class: "fwcmp-label",
  for: "fwcmp-campaign"
};
const _hoisted_54 = ["placeholder", "aria-invalid"];
const _hoisted_55 = {
  key: 0,
  class: "fwcmp-chips"
};
const _hoisted_56 = {
  class: "fwcmp-chips__label"
};
const _hoisted_57 = ["title", "onClick"];
const _hoisted_58 = {
  key: 0,
  class: "fwcmp-sr-only"
};
const _hoisted_59 = {
  id: "fwcmp-campaign-msg",
  class: "fwcmp-msgs"
};
const _hoisted_60 = ["onClick"];
const _hoisted_61 = ["open"];
const _hoisted_62 = {
  class: "fwcmp-row"
};
const _hoisted_63 = ["for"];
const _hoisted_64 = ["id", "onUpdate:modelValue", "aria-invalid", "aria-describedby"];
const _hoisted_65 = ["id"];
const _hoisted_66 = {
  class: "fwcmp-col"
};
const _hoisted_67 = {
  class: "fwcmp-label",
  for: "fwcmp-set"
};
const _hoisted_68 = ["value"];
const _hoisted_69 = {
  class: "fwcmp-row"
};
const _hoisted_70 = {
  class: "fwcmp-col"
};
const _hoisted_71 = {
  class: "fwcmp-label",
  for: "fwcmp-start"
};
const _hoisted_72 = {
  class: "fwcmp-col"
};
const _hoisted_73 = {
  class: "fwcmp-label",
  for: "fwcmp-end"
};
const _hoisted_74 = ["aria-invalid"];
const _hoisted_75 = {
  id: "fwcmp-end-msg",
  class: "fwcmp-msgs"
};
const _hoisted_76 = {
  key: 0,
  class: "fwcmp-msg fwcmp-msg--error"
};
const _hoisted_77 = {
  class: "fwcmp-label",
  for: "fwcmp-note"
};
const _hoisted_78 = {
  key: 5,
  class: "fwcmp-step fwcmp-platformlink fwcmp-platformlink--locked"
};
const _hoisted_79 = {
  class: "fwcmp-platformlink__types"
};
const _hoisted_80 = {
  class: "fwcmp-label",
  "aria-hidden": "true"
};
const _hoisted_81 = {
  key: 0,
  class: "fwcmp-notice fwcmp-benefits__card"
};
const _hoisted_82 = {
  class: "fwcmp-benefits__previews"
};
const _hoisted_83 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("code", {
  class: "fwcmp-shortpill"
}, "fnwrk.com/…", -1);
const _hoisted_84 = {
  class: "fwcmp-badge"
};
const _hoisted_85 = {
  class: "fwcmp-benefits__trial"
};
const _hoisted_86 = {
  class: "fwcmp-hint"
};
const _hoisted_87 = ["href"];
const _hoisted_88 = ["href"];
const _hoisted_89 = {
  key: 1,
  class: "fwcmp-hint"
};
const _hoisted_90 = {
  key: 6,
  class: "fwcmp-hint fwcmp-platformlink__off"
};
const _hoisted_91 = ["href"];
const _hoisted_92 = {
  class: "fwcmp-result"
};
const _hoisted_93 = {
  class: "fwcmp-step__title"
};
const _hoisted_94 = {
  class: "fwcmp-sr-only",
  role: "status"
};
const _hoisted_95 = {
  key: 1,
  class: "fwcmp-url"
};
const _hoisted_96 = {
  key: 2,
  class: "fwcmp-placeholder"
};
const _hoisted_97 = {
  key: 3,
  class: "fwcmp-msgs"
};
const _hoisted_98 = {
  key: 4,
  class: "fwcmp-hint"
};
const _hoisted_99 = {
  key: 5,
  class: "fwcmp-hint"
};
const _hoisted_100 = {
  class: "fwcmp-actions"
};
const _hoisted_101 = ["disabled"];
const _hoisted_102 = {
  key: 6,
  class: "fwcmp-msg fwcmp-msg--warning"
};
const _hoisted_103 = {
  key: 7,
  class: "fwcmp-hint fwcmp-sent"
};
const _hoisted_104 = {
  key: 8,
  class: "fwcmp-confirm",
  role: "group"
};
const _hoisted_105 = ["disabled"];
const _hoisted_106 = {
  key: 9,
  class: "fwcmp-hint"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_PlatformLinkPanel = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PlatformLinkPanel");
  const _component_SegmentedSwitch = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SegmentedSwitch");
  const _component_PlatformBenefits = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PlatformBenefits");
  const _component_SidePanel = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SidePanel");
  const _component_SaveButton = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SaveButton");
  const _component_FeedbackBar = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("FeedbackBar");
  const _component_PromoLine = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PromoLine");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.loading
  }, null, 8, ["loading"]), _ctx.loadError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 0,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.loadError) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.load && _ctx.load(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Retry')), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.missingLink ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 1,
    severity: "warning"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('LinkNotFound')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.openList && _ctx.openList(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ToTheLinks')), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.ready ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 2
  }, [_ctx.editing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", _hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("strong", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('EditingLink', _ctx.editingLabel)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-badge fwcmp-badge--${_ctx.editingStatus}`)
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`LinkStatus_${_ctx.editingStatus}`)), 3), _ctx.liveSinceText ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", _hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.liveSinceText), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat fwcmp-editing__new",
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.startNew && _ctx.startNew(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewLink')), 1)]), _ctx.editingPlatform ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", _hoisted_5, [_ctx.editingPlatform.shortUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("code", _hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.shortPill(_ctx.editingPlatform.shortUrl)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "fwcmp-action",
    onClick: _cache[3] || (_cache[3] = $event => _ctx.copyShort(_ctx.editingPlatform.shortUrl))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.shortCopied ? _ctx.tr('Copied') : _ctx.tr('PlatformLinkCopyShort')), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.editingPlatform.qrUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 1,
    class: "fwcmp-action",
    href: `${_ctx.editingPlatform.qrUrl}&format=svg`,
    download: "",
    "aria-label": _ctx.tr('PlatformLinkQrOf', _ctx.editingLabel)
  }, [_hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" QR")], 8, _hoisted_7)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.editingPlatform.appUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 2,
    class: "fwcmp-applink",
    href: _ctx.editingPlatform.appUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": _ctx.tr('PlatformOpenLinkOf', _ctx.editingLabel)
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("Feinwerk Campaigns"), _hoisted_10], 8, _hoisted_9)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.locked ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('EditHint')) + " ", 1), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "fwcmp-linkbutton fwcmp-editing__live",
    disabled: _ctx.dirty || _ctx.markingLive,
    "aria-describedby": _ctx.dirty ? 'fwcmp-live-first' : undefined,
    onClick: _cache[4] || (_cache[4] = $event => _ctx.askLive('header'))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLive')), 9, _hoisted_12), _ctx.dirty ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", _hoisted_13, "(" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLiveSaveFirst')) + ")", 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.locked && _ctx.confirmLiveAt === 'header' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLiveConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "confirmHeader",
    type: "button",
    class: "btn",
    disabled: _ctx.markingLive,
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.markLive && _ctx.markLive(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLiveYes')), 9, _hoisted_15), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    onClick: _cache[6] || (_cache[6] = $event => _ctx.confirmLiveAt = '')
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Cancel')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.locked ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 3,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])([_ctx.wentLive ? 'fwcmp-msg fwcmp-msg--warning' : 'fwcmp-hint', "fwcmp-editing__lock"]),
    role: "status"
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.wentLive ? _ctx.tr('LinkWentLive') : _ctx.tr('LinkIsLive')) + " ", 1), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 0,
    type: "button",
    class: "fwcmp-linkbutton",
    onClick: _cache[7] || (_cache[7] = (...args) => _ctx.saveAsNew && _ctx.saveAsNew(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SaveAsNewLink')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : _ctx.fromLive ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewFromLive', _ctx.fromLive)), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.locked ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("section", _hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dl", _hoisted_18, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.liveLines, line => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: line.label
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(line.label), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(line.value), 1)]);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StartDate')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "fwcmp-start",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => _ctx.form.startDate = $event),
    class: "fwcmp-input",
    type: "date"
  }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.startDate]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_22, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('EndDate')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "fwcmp-end",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => _ctx.form.endDate = $event),
    class: "fwcmp-input",
    type: "date",
    "aria-invalid": _ctx.datesWrong ? 'true' : 'false',
    "aria-describedby": "fwcmp-end-msg"
  }, null, 8, _hoisted_24), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.endDate]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", _hoisted_25, [_ctx.datesWrong ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", _hoisted_26, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('EndBeforeStart')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_27, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Note')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("textarea", {
    id: "fwcmp-note",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => _ctx.form.note = $event),
    class: "fwcmp-input fwcmp-note browser-default",
    rows: "2",
    maxlength: "1000"
  }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.note]])])) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 3
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", _hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", _hoisted_29, [_hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StepTarget')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_31, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('FieldTargetUrl')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "fwcmp-targetUrl",
    "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => _ctx.form.targetUrl = $event),
    class: "fwcmp-input",
    type: "url",
    inputmode: "url",
    autocomplete: "off",
    spellcheck: "false",
    placeholder: _ctx.targetPlaceholder,
    "aria-invalid": _ctx.hasError('targetUrl') ? 'true' : 'false',
    "aria-describedby": "fwcmp-targetUrl-msg"
  }, null, 8, _hoisted_32), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.targetUrl]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", _hoisted_33, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.messagesFor('targetUrl'), m => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: m.code,
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-msg fwcmp-msg--${m.kind}`)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(m.message), 3);
  }), 128))])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", _hoisted_34, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", _hoisted_35, [_hoisted_36, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StepChannel')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "fwcmp-tiles",
    role: "group",
    "aria-label": _ctx.tr('StepChannel')
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.templates, t => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: t.key,
      type: "button",
      class: "fwcmp-tile",
      "aria-pressed": _ctx.activeTemplate && _ctx.activeTemplate.key === t.key ? 'true' : 'false',
      onClick: $event => _ctx.applyTemplate(t)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_39, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(t.label), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_40, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.templateHint(t)), 1)], 8, _hoisted_38);
  }), 128))], 8, _hoisted_37), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_41, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(['source', 'medium'], field => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      key: field,
      class: "fwcmp-col"
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
      class: "fwcmp-label",
      for: `fwcmp-${field}`
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.label(field)), 9, _hoisted_42), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      id: `fwcmp-${field}`,
      "onUpdate:modelValue": $event => _ctx.form[field] = $event,
      class: "fwcmp-input",
      type: "text",
      autocomplete: "off",
      "aria-invalid": _ctx.hasError(field) ? 'true' : 'false',
      "aria-describedby": `fwcmp-${field}-msg`
    }, null, 8, _hoisted_43), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form[field]]]), _ctx.chips(field).length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_44, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_45, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Suggestions')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.chips(field), value => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
        key: value,
        type: "button",
        class: "fwcmp-chip",
        onClick: $event => _ctx.form[field] = value
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(value), 9, _hoisted_46);
    }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", {
      id: `fwcmp-${field}-msg`,
      class: "fwcmp-msgs"
    }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.messagesFor(field), m => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        key: m.code,
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-msg fwcmp-msg--${m.kind}`)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(m.message), 1), m.known ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
        key: 0,
        type: "button",
        class: "fwcmp-msg__fix",
        onClick: $event => _ctx.form[field] = m.known
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('UseValue', m.known)), 9, _hoisted_48)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2);
    }), 128))], 8, _hoisted_47)]);
  }), 64))]), !_ctx.parameterSets.mcrActive ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_49, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('McrHintShort')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", _hoisted_50, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", _hoisted_51, [_hoisted_52, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StepCampaign')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_53, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('FieldCampaign')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "fwcmp-campaign",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => _ctx.form.campaign = $event),
    class: "fwcmp-input",
    type: "text",
    autocomplete: "off",
    placeholder: _ctx.tr('CampaignPlaceholder'),
    "aria-invalid": _ctx.hasError('campaign') ? 'true' : 'false',
    "aria-describedby": "fwcmp-campaign-msg"
  }, null, 8, _hoisted_54), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.campaign]]), _ctx.chips('campaign').length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_55, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_56, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('AlreadyUsed')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.chips('campaign'), value => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: value,
      type: "button",
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["fwcmp-chip", {
        'fwcmp-chip--counted': _ctx.counted.includes(value)
      }]),
      title: _ctx.counted.includes(value) ? _ctx.tr('SuggestionCounted') : '',
      onClick: $event => _ctx.form.campaign = value
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(value), 1), _ctx.counted.includes(value) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", _hoisted_58, " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SuggestionCounted')) + ")", 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 10, _hoisted_57);
  }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", _hoisted_59, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.messagesFor('campaign'), m => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: m.code,
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-msg fwcmp-msg--${m.kind}`)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(m.message), 1), m.known ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "fwcmp-msg__fix",
      onClick: $event => _ctx.form.campaign = m.known
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('UseValue', m.known)), 9, _hoisted_60)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2);
  }), 128))])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("details", {
    class: "fwcmp-more",
    open: _ctx.moreOpen,
    onToggle: _cache[17] || (_cache[17] = (...args) => _ctx.onToggleMore && _ctx.onToggleMore(...args))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("summary", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MoreFields')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_62, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.moreFields, field => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: field,
      class: "fwcmp-col"
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
      class: "fwcmp-label",
      for: `fwcmp-${field}`
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.label(field)), 9, _hoisted_63), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      id: `fwcmp-${field}`,
      "onUpdate:modelValue": $event => _ctx.form[field] = $event,
      class: "fwcmp-input",
      type: "text",
      autocomplete: "off",
      "aria-invalid": _ctx.hasError(field) ? 'true' : 'false',
      "aria-describedby": `fwcmp-${field}-msg`
    }, null, 8, _hoisted_64), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form[field]]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", {
      id: `fwcmp-${field}-msg`,
      class: "fwcmp-msgs"
    }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.messagesFor(field), m => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        key: m.code,
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-msg fwcmp-msg--${m.kind}`)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(m.message), 3);
    }), 128))], 8, _hoisted_65)]);
  }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_66, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_67, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ParameterSet')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("select", {
    id: "fwcmp-set",
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => _ctx.form.parameterSet = $event),
    class: "fwcmp-input fwcmp-select browser-default"
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.parameterSets.sets, set => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("option", {
      key: set.key,
      value: set.key
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.setLabel(set.key)), 9, _hoisted_68);
  }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelSelect"], _ctx.form.parameterSet]])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_69, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_70, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_71, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StartDate')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "fwcmp-start",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => _ctx.form.startDate = $event),
    class: "fwcmp-input",
    type: "date"
  }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.startDate]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_72, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_73, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('EndDate')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "fwcmp-end",
    "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => _ctx.form.endDate = $event),
    class: "fwcmp-input",
    type: "date",
    "aria-invalid": _ctx.datesWrong ? 'true' : 'false',
    "aria-describedby": "fwcmp-end-msg"
  }, null, 8, _hoisted_74), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.endDate]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", _hoisted_75, [_ctx.datesWrong ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", _hoisted_76, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('EndBeforeStart')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", _hoisted_77, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Note')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("textarea", {
    id: "fwcmp-note",
    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => _ctx.form.note = $event),
    class: "fwcmp-input fwcmp-note browser-default",
    rows: "2",
    maxlength: "1000"
  }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.note]])], 40, _hoisted_61)], 64)), _ctx.platform && _ctx.platform.connected && _ctx.canWrite && !_ctx.editing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_PlatformLinkPanel, {
    key: 4,
    "id-site": _ctx.idSite,
    form: _ctx.form,
    features: _ctx.platform.features,
    "app-url": _ctx.platform.links.app || '',
    "channel-key": _ctx.activeTemplate ? _ctx.activeTemplate.key : '',
    onSetField: _ctx.setField,
    onReady: _cache[18] || (_cache[18] = $event => _ctx.platformReady = $event),
    onPreview: _cache[19] || (_cache[19] = $event => _ctx.platformPreview = $event),
    onNewLink: _ctx.startNew
  }, null, 8, ["id-site", "form", "features", "app-url", "channel-key", "onSetField", "onNewLink"])) : _ctx.platform && _ctx.platform.mode === 'standalone' && _ctx.canWrite && !_ctx.editing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("section", _hoisted_78, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_79, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_80, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkType')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SegmentedSwitch, {
    "model-value": "link",
    options: _ctx.lockedTypes,
    label: _ctx.tr('PlatformLinkType')
  }, null, 8, ["options", "label"])]), _ctx.platform.promote ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_81, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", _hoisted_82, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, [_hoisted_83, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_84, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitExample')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitShortPreview')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitQrPreview')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("li", _hoisted_85, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsTrial')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn btn-outline fwcmp-benefits__open",
    onClick: _cache[20] || (_cache[20] = $event => _ctx.benefitsOpen = true)
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsOpen')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_86, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformNeedsConnection')) + " ", 1), _ctx.platform.canConnect && _ctx.platform.connectUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    class: "fwcmp-platformlink__connect",
    href: _ctx.platform.connectUrl
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformConnectShort')), 9, _hoisted_87)) : _ctx.platform.connectUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformWordPress')), 1)], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformSuperUserConnects')), 1)], 64))]), _ctx.platform.promote ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SidePanel, {
    key: 1,
    open: _ctx.benefitsOpen,
    title: _ctx.tr('BenefitsTitle'),
    "close-label": _ctx.tr('Close'),
    size: "narrow",
    "scope-class": "fwcmp-builder",
    "onUpdate:open": _cache[21] || (_cache[21] = $event => _ctx.benefitsOpen = $event)
  }, {
    footer: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [_ctx.platform.canConnect && _ctx.platform.connectUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 0,
      class: "btn",
      href: _ctx.platform.connectUrl
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformConnect')), 9, _hoisted_88)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", _hoisted_89, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformSuperUserConnects')), 1))]),
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_PlatformBenefits, {
      "more-url": _ctx.platform.moreUrl || ''
    }, null, 8, ["more-url"])]),
    _: 1
  }, 8, ["open", "title", "close-label"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : _ctx.platform && _ctx.platform.mode === 'connected' && !_ctx.platform.connected && !_ctx.editing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_90, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.platformReasonText) + " ", 1), _ctx.platform.connectUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    href: _ctx.platform.connectUrl
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(_ctx.canReconnect(_ctx.platform.reason) ? 'PlatformReconnect' : 'PlatformDetails')), 9, _hoisted_91)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", _hoisted_92, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", _hoisted_93, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('YourLink')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", _hoisted_94, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.statusText), 1), _ctx.previewError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 0,
    severity: "warning"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PreviewFailed')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[22] || (_cache[22] = (...args) => _ctx.runPreview && _ctx.runPreview(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Retry')), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.shownUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("pre", _hoisted_95, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.shownUrl), 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_96, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.platformReady && !_ctx.editing ? _ctx.tr('PlatformLinkAppearsHere') : _ctx.tr('LinkAppearsHere')), 1)), _ctx.otherWarnings.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", _hoisted_97, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.otherWarnings, m => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: `${m.field}-${m.code}`,
      class: "fwcmp-msg fwcmp-msg--warning"
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(m.message), 1);
  }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.result && _ctx.result.campaignIdOnSave ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_98, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('LinkIdHint')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.sameLink ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_99, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SameLinkSaved')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: "",
    onClick: _cache[23] || (_cache[23] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])((...args) => _ctx.openList && _ctx.openList(...args), ["prevent"]))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ToTheLinks')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_100, [!(_ctx.platformReady && !_ctx.editing) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 0,
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.canWrite ? 'btn btn-outline' : 'btn'),
    disabled: !_ctx.shownUrl,
    onClick: _cache[24] || (_cache[24] = (...args) => _ctx.copyLink && _ctx.copyLink(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.copyLabel), 11, _hoisted_101)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.canWrite && !(_ctx.platformReady && !_ctx.editing) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SaveButton, {
    key: 1,
    value: _ctx.editing ? _ctx.tr('SaveChanges') : _ctx.tr('SaveLink'),
    disabled: !_ctx.canSave,
    saving: _ctx.saving,
    onConfirm: _ctx.save
  }, null, 8, ["value", "disabled", "saving", "onConfirm"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.copyFailed ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_102, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CopyFailed')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.sentHint && !_ctx.locked && _ctx.confirmLiveAt !== 'result' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_103, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SentHint')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "fwcmp-linkbutton",
    onClick: _cache[25] || (_cache[25] = $event => _ctx.askLive('result'))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLive')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.confirmLiveAt === 'result' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_104, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLiveConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "confirmResult",
    type: "button",
    class: "btn",
    disabled: _ctx.markingLive,
    onClick: _cache[26] || (_cache[26] = (...args) => _ctx.markLive && _ctx.markLive(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLiveYes')), 9, _hoisted_105), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    onClick: _cache[27] || (_cache[27] = $event => _ctx.confirmLiveAt = '')
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Cancel')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_106, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NeedWriteAccess')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.saved ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 10,
    severity: "success"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.saved) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      href: "",
      onClick: _cache[28] || (_cache[28] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])((...args) => _ctx.openList && _ctx.openList(...args), ["prevent"]))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ToTheLinks')), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.saveError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 11,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.saveError), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.feedback ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_FeedbackBar, {
    key: 7,
    class: "fwcmp-page-feedback",
    "id-site": _ctx.idSite,
    topic: "link_builder",
    question: _ctx.tr('FeedbackQuestion_link_builder'),
    feedback: _ctx.feedback
  }, null, 8, ["id-site", "question", "feedback"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_PromoLine, {
    promo: _ctx.promo,
    "dismiss-label": _ctx.tr('PromoDismiss')
  }, null, 8, ["promo", "dismiss-label"])], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/LinkBuilder.vue?vue&type=template&id=6fbd8bda

// EXTERNAL MODULE: external "CoreHome"
var external_CoreHome_ = __webpack_require__("19dc");

// EXTERNAL MODULE: external "CorePluginsAdmin"
var external_CorePluginsAdmin_ = __webpack_require__("a5a2");

// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/api.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/** the API module; every screen uses only these methods (docs: API.php) */
const MODULE = 'FeinwerkCampaignManager';
const FIELDS = ['campaign', 'source', 'medium', 'keyword', 'content', 'campaignId', 'group', 'placement'];
/** the pages show their own error, so no Matomo error notification on top */
const QUIET = {
  createErrorNotification: false
};
function linkParams(form) {
  const params = {
    targetUrl: form.targetUrl,
    parameterSet: form.parameterSet
  };
  FIELDS.forEach(field => {
    params[field] = form[field];
  });
  return params;
}
function fetchParameterSets(idSite) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getParameterSets`,
    idSite
  }, QUIET);
}
function fetchTemplates(idSite) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getTemplates`,
    idSite
  }, QUIET);
}
function fetchSuggestions(idSite, field) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getSuggestions`,
    idSite,
    field,
    limit: 100
  }, QUIET).then(rows => (rows || []).map(s => Object.assign(Object.assign({}, s), {}, {
    value: `${s.value}`
  })));
}
/**
 * the dry run of addLink (of updateLink with the edited link's idLink); errors come back in the
 * answer, so no Matomo error notification
 */
function preview(idSite, form, abort, idLink = 0) {
  return external_CoreHome_["AjaxHelper"].post(Object.assign({
    method: `${MODULE}.previewLink`,
    idSite
  }, idLink > 0 ? {
    idLink
  } : {}), linkParams(form), {
    createErrorNotification: false,
    abortController: abort
  });
}
function addLink(idSite, form) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.addLink`,
    idSite
  }, Object.assign(Object.assign({}, linkParams(form)), {}, {
    startDate: form.startDate,
    endDate: form.endDate,
    note: form.note
  }), QUIET);
}
/** every field is sent: '' clears it, which is what the form shows */
function updateLink(idSite, idLink, form) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.updateLink`,
    idSite,
    idLink
  }, Object.assign(Object.assign({}, linkParams(form)), {}, {
    startDate: form.startDate,
    endDate: form.endDate,
    note: form.note
  }), QUIET);
}
/** a live link: only its note and dates change (sending the values back is fine, but not needed) */
function updateLinkDetails(idSite, idLink, form) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.updateLink`,
    idSite,
    idLink
  }, {
    startDate: form.startDate,
    endDate: form.endDate,
    note: form.note
  }, QUIET);
}
function markLinkLive(idSite, idLink) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.markLinkLive`,
    idSite,
    idLink
  }, {}, QUIET);
}
/** one saved link, or null when it is not there (getLinks answers an empty list, not a 404) */
function fetchLink(idSite, idLink) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getLinks`,
    idSite,
    idLink,
    status: 'all',
    limit: 1
  }, QUIET).then(page => page.links.length ? page.links[0] : null);
}
function fetchLinks(idSite, status, search, limit, offset) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getLinks`,
    idSite,
    status,
    search,
    limit,
    offset
  }, QUIET);
}
/** the numbers of exactly the links of one list page (same filters and paging as fetchLinks) */
function fetchLinkResults(idSite, period, date, segment, status, search, limit, offset) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getLinkResults`,
    idSite,
    period,
    date,
    segment,
    status,
    search,
    limit,
    offset
  }, QUIET);
}
function archiveLink(idSite, idLink, archived) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.${archived ? 'archiveLink' : 'restoreLink'}`,
    idSite,
    idLink
  }, {}, QUIET);
}
function fetchCampaigns(idSite, period, date, segment, status) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getCampaigns`,
    idSite,
    period,
    date,
    segment,
    status
  }, QUIET);
}
function fetchChecklist(idSite) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getSetupChecklist`,
    idSite
  }, QUIET);
}
function fetchGoals(idSite) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: 'Goals.getGoals',
    idSite
  }, QUIET).then(goals => Object.values(goals || {}));
}
function detailsParams(form) {
  return {
    name: form.name,
    startDate: form.startDate,
    endDate: form.endDate,
    goalMetric: form.goalMetric,
    goalTarget: form.goalTarget,
    idGoal: form.idGoal,
    notes: form.notes
  };
}
function addCampaign(idSite, form) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.addCampaign`,
    idSite
  }, Object.assign({
    campaign: form.campaign
  }, detailsParams(form)), QUIET);
}
/** every field is sent: '' clears it, which is what the form shows */
function updateCampaign(idSite, form) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.updateCampaign`,
    idSite
  }, Object.assign({
    campaign: form.campaign
  }, detailsParams(form)), QUIET);
}
function archiveCampaign(idSite, campaign, archived) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.${archived ? 'archiveCampaign' : 'restoreCampaign'}`,
    idSite
  }, {
    campaign
  }, QUIET);
}
function fetchQualityIssues(idSite, period, date, segment) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getQualityIssues`,
    idSite,
    period,
    date,
    segment
  }, QUIET);
}
function fetchCampaignResults(idSite, campaign, segment) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getCampaignResults`,
    idSite,
    campaign,
    segment
  }, QUIET);
}
let statusOnce = null;
/** read once per page load: the status line and the builder share it */
function fetchConnectionStatus(fresh = false) {
  if (!statusOnce || fresh) {
    statusOnce = external_CoreHome_["AjaxHelper"].fetch({
      method: `${MODULE}.getConnectionStatus`
    }, QUIET);
    statusOnce.catch(() => {
      statusOnce = null;
    });
  }
  return statusOnce;
}
function fetchPlatformWebsites(limit, offset) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getPlatformWebsites`,
    limit,
    offset
  }, QUIET);
}
function disconnectPlatform() {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.disconnectPlatform`
  }, {}, QUIET);
}
function fetchPlatformConvention(idSite) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getPlatformConvention`,
    idSite
  }, QUIET);
}
function fetchPlatformCampaigns(idSite, query) {
  return external_CoreHome_["AjaxHelper"].fetch({
    method: `${MODULE}.getPlatformCampaigns`,
    idSite,
    query,
    limit: 8
  }, QUIET);
}
function addPlatformCampaign(idSite, name, parameter = '', startDate = '', endDate = '') {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.addPlatformCampaign`,
    idSite
  }, {
    name,
    parameter,
    startDate,
    endDate
  }, QUIET);
}
function previewPlatformLink(idSite, input) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.previewPlatformLink`,
    idSite
  }, {
    targetUrl: input.targetUrl,
    platformCampaignId: input.platformCampaignId,
    source: input.source,
    medium: input.medium,
    content: input.content,
    keyword: input.keyword,
    channel: input.channel,
    placement: input.placement,
    shortLink: input.shortLink ? '1' : '0',
    dynamicQr: input.dynamicQr ? '1' : '0'
  }, QUIET);
}
function addPlatformLink(idSite, input) {
  return external_CoreHome_["AjaxHelper"].post({
    method: `${MODULE}.addPlatformLink`,
    idSite
  }, Object.assign(Object.assign({}, input), {}, {
    shortLink: input.shortLink ? '1' : '0',
    dynamicQr: input.dynamicQr ? '1' : '0'
  }), QUIET);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/clipboard.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
/**
 * Copies text: through the clipboard API where the page may use it, otherwise through a selected
 * text field. Rejects when neither works, so the caller can say so.
 */
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'absolute';
  area.style.left = '-9999px';
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } finally {
    document.body.removeChild(area);
  }
  return copied ? Promise.resolve() : Promise.reject(new Error('copy refused'));
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PlatformLinkPanel.vue?vue&type=template&id=cd95e7b6

const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_1 = {
  class: "fwcmp-step fwcmp-platformlink"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_2 = {
  class: "fwcmp-step__title"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_3 = {
  key: 0,
  class: "fwcmp-hint fwcmp-platformlink__off"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_4 = ["href"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_5 = {
  key: 0,
  class: "fwcmp-hint"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_6 = {
  class: "fwcmp-platformlink__campaign"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_7 = ["id", "for"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_8 = ["id", "placeholder"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_9 = ["aria-labelledby"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_10 = ["aria-pressed", "onClick"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_11 = {
  class: "fwcmp-chip__hint"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_12 = ["disabled"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_13 = ["aria-label"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_14 = ["disabled"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_15 = {
  key: 3,
  class: "fwcmp-hint"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_16 = {
  class: "fwcmp-chips"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_17 = ["onClick"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_18 = {
  key: 1,
  class: "fwcmp-platformlink__types"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_19 = {
  class: "fwcmp-label",
  "aria-hidden": "true"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_20 = {
  key: 2,
  class: "fwcmp-msgs"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_21 = {
  class: "fwcmp-actions"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_22 = ["disabled"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_23 = {
  key: 2,
  class: "fwcmp-hint"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_24 = ["aria-label"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_25 = ["disabled"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_26 = {
  key: 5,
  ref: "result",
  class: "fwcmp-platformlink__result",
  role: "status",
  tabindex: "-1"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_27 = {
  key: 0,
  class: "fwcmp-platformlink__short"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_28 = {
  class: "fwcmp-platformlink__short"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_29 = {
  key: 1,
  class: "fwcmp-platformlink__qr"
};
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_30 = ["href"];
const PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_31 = ["href"];
function PlatformLinkPanelvue_type_template_id_cd95e7b6_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_SegmentedSwitch = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SegmentedSwitch");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("section", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkTitle')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.loading
  }, null, 8, ["loading"]), _ctx.reason === 'no_website' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error) + " ", 1), _ctx.appUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    href: _ctx.appUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformOpen')), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : _ctx.error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 1,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error) + " ", 1), !_ctx.convention && _ctx.passing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.load && _ctx.load(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Retry')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.convention ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 2
  }, [_ctx.website ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkWebsite', _ctx.website.name)), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", {
    id: `fwcmp-pcampaign-label-${_ctx.idSite}`,
    class: "fwcmp-label",
    for: `fwcmp-pcampaign-${_ctx.idSite}`
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkCampaign')), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_7), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: `fwcmp-pcampaign-${_ctx.idSite}`,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.query = $event),
    class: "fwcmp-input",
    type: "text",
    autocomplete: "off",
    placeholder: _ctx.tr('PlatformLinkCampaignSearch'),
    onInput: _cache[2] || (_cache[2] = (...args) => _ctx.searchSoon && _ctx.searchSoon(...args))
  }, null, 40, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_8), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.query]]), _ctx.campaigns.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: "fwcmp-platformlink__matches",
    role: "group",
    "aria-labelledby": `fwcmp-pcampaign-label-${_ctx.idSite}`
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.campaigns, c => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: c.id,
      type: "button",
      class: "fwcmp-chip",
      "aria-pressed": _ctx.chosen && _ctx.chosen.id === c.id ? 'true' : 'false',
      onClick: $event => _ctx.choose(c)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(c.name) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(c.parameter), 1)], 8, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_10);
  }), 128))], 8, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_9)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.query.trim() && !_ctx.exactMatch && !_ctx.confirmingCampaign ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 1,
    type: "button",
    class: "fwcmp-linkbutton",
    disabled: _ctx.busy,
    onClick: _cache[3] || (_cache[3] = $event => _ctx.confirmingCampaign = true)
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkNewCampaign', _ctx.query.trim())), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_12)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.confirmingCampaign ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 2,
    class: "fwcmp-confirm",
    role: "group",
    "aria-label": _ctx.tr('PlatformLinkNewCampaign', _ctx.query.trim())
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformCampaignConfirm', _ctx.query.trim())), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn",
    disabled: _ctx.busy,
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.createCampaign && _ctx.createCampaign(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformCampaignConfirmYes')), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    onClick: _cache[5] || (_cache[5] = $event => _ctx.confirmingCampaign = false)
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Cancel')), 1)], 8, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_13)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.chosen ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_15, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkChosen', _ctx.chosen.name, _ctx.chosen.parameter)), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.listFields, f => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: f.key,
      class: "fwcmp-msg fwcmp-msg--warning"
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkNotInList', f.label, _ctx.value(f.key))) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_16, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(f.values.slice(0, 10), v => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
        key: v.value,
        type: "button",
        class: "fwcmp-chip",
        onClick: $event => _ctx.$emit('set-field', {
          field: f.key,
          value: v.value
        })
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(v.value), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_17);
    }), 128))])]);
  }), 128)), _ctx.types.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkType')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_SegmentedSwitch, {
    modelValue: _ctx.linkType,
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => _ctx.linkType = $event),
    options: _ctx.typeOptions,
    label: _ctx.tr('PlatformLinkType')
  }, null, 8, ["modelValue", "options", "label"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.previewErrors.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_20, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.previewErrors, m => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: m,
      class: "fwcmp-msg fwcmp-msg--warning"
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(m), 1);
  }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_21, [_ctx.created ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 0,
    type: "button",
    class: "btn btn-outline",
    onClick: _cache[7] || (_cache[7] = $event => _ctx.$emit('new-link'))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewLink')), 1)) : !_ctx.confirming ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 1,
    ref: "createButton",
    type: "button",
    class: "btn",
    disabled: !_ctx.canCreate || _ctx.busy,
    onClick: _cache[8] || (_cache[8] = (...args) => _ctx.askCreate && _ctx.askCreate(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkCreate')), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_22)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.missing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.missing), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.createError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 3,
    ref: "createError",
    class: "fwcmp-msg fwcmp-msg--error",
    role: "alert",
    tabindex: "-1"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.createError), 513)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.confirming ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 4,
    class: "fwcmp-confirm",
    role: "group",
    "aria-label": _ctx.tr('PlatformLinkCreate')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`PlatformLinkConfirm_${_ctx.linkType}`)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "confirmButton",
    type: "button",
    class: "btn",
    disabled: _ctx.busy,
    onClick: _cache[9] || (_cache[9] = (...args) => _ctx.create && _ctx.create(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkConfirmYes')), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_25), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    onClick: _cache[10] || (_cache[10] = (...args) => _ctx.cancelCreate && _ctx.cancelCreate(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Cancel')), 1)], 8, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_24)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.created ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_26, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Alert, {
    severity: "success"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.createdExisted ? _ctx.tr('PlatformLinkExisted') : _ctx.tr('PlatformLinkCreated')), 1)]),
    _: 1
  }), _ctx.created.platform && _ctx.created.platform.shortUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkShortUrl')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("code", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.created.platform.shortUrl), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn btn-outline",
    onClick: _cache[11] || (_cache[11] = $event => _ctx.copy(_ctx.created.platform.shortUrl, 'short'))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.copied === 'short' ? _ctx.tr('Copied') : _ctx.tr('PlatformLinkCopyShort')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(_ctx.created.platform && _ctx.created.platform.shortUrl ? 'btn-flat' : 'btn btn-outline'),
    onClick: _cache[12] || (_cache[12] = $event => _ctx.copy(_ctx.created.url, 'full'))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.copied === 'full' ? _ctx.tr('Copied') : _ctx.tr('CopyLink')), 3)]), _ctx.created.platform && _ctx.created.platform.qrUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_29, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformLinkQrDownload')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(['svg', 'png', 'pdf', 'eps'], f => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      key: f,
      href: `${_ctx.created.platform.qrUrl}&format=${f}`,
      download: ""
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(f.toUpperCase()), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_30);
  }), 64))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.created.platform && _ctx.created.platform.appUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 2,
    href: _ctx.created.platform.appUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformOpenLink')), 9, PlatformLinkPanelvue_type_template_id_cd95e7b6_hoisted_31)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 512)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformLinkPanel.vue?vue&type=template&id=cd95e7b6

// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/plainText.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
/**
 * An API error message as plain text: Matomo's JSON answers carry messages HTML-escaped
 * (&quot; for "), and the pages show them as text. A textarea decodes entities without running
 * anything.
 */
function plainText(message) {
  const area = document.createElement('textarea');
  area.innerHTML = message;
  return area.value;
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/SegmentedSwitch.vue?vue&type=template&id=d156c55a

const SegmentedSwitchvue_type_template_id_d156c55a_hoisted_1 = ["aria-label"];
const SegmentedSwitchvue_type_template_id_d156c55a_hoisted_2 = ["aria-checked", "tabindex", "disabled", "title", "onClick"];
function SegmentedSwitchvue_type_template_id_d156c55a_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: "fwcmp-segmented",
    role: "radiogroup",
    tabindex: "-1",
    "aria-label": _ctx.label,
    onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx.onKey && _ctx.onKey(...args))
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.options, (option, i) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: option.value,
      type: "button",
      role: "radio",
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["fwcmp-segmented__option", {
        'fwcmp-segmented__option--active': option.value === _ctx.modelValue,
        'fwcmp-segmented__option--disabled': !!option.disabled
      }]),
      "aria-checked": option.value === _ctx.modelValue ? 'true' : 'false',
      tabindex: i === _ctx.activeIndex ? 0 : -1,
      disabled: !!option.disabled,
      title: option.title || option.label,
      onClick: $event => _ctx.choose(i)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(option.label), 11, SegmentedSwitchvue_type_template_id_d156c55a_hoisted_2);
  }), 128))], 40, SegmentedSwitchvue_type_template_id_d156c55a_hoisted_1);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/SegmentedSwitch.vue?vue&type=template&id=d156c55a

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/SegmentedSwitch.vue?vue&type=script&lang=ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * A radio group, the chosen option filled. Tab reaches the chosen option; the arrow keys (around
 * the ends), Home and End choose another one that is not disabled.
 */
/* harmony default export */ var SegmentedSwitchvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  computed: {
    /** the chosen option, else the first that can be chosen (so Tab still reaches the group) */
    activeIndex() {
      const chosen = this.options.findIndex(o => o.value === this.modelValue);
      if (chosen >= 0) {
        return chosen;
      }
      return Math.max(0, this.options.findIndex(o => !o.disabled));
    }
  },
  methods: {
    choose(index) {
      const option = this.options[index];
      // the chosen one again is no change (an arrow key with every other option disabled)
      if (option && !option.disabled && option.value !== this.modelValue) {
        this.$emit('update:modelValue', option.value);
      }
    },
    /** the next option to choose from index in direction step (1 or -1), around the ends */
    nextEnabled(index, step) {
      const count = this.options.length;
      for (let n = 1; n <= count; n += 1) {
        const i = (index + step * n + count * n) % count;
        if (!this.options[i].disabled) {
          return i;
        }
      }
      return index;
    },
    onKey(event) {
      const forward = this.nextEnabled(this.activeIndex, 1);
      const back = this.nextEnabled(this.activeIndex, -1);
      const moves = {
        ArrowRight: forward,
        ArrowDown: forward,
        ArrowLeft: back,
        ArrowUp: back,
        Home: this.nextEnabled(this.options.length - 1, 1),
        End: this.nextEnabled(0, -1)
      };
      const next = moves[event.key];
      if (next === undefined) {
        return;
      }
      event.preventDefault();
      this.choose(next);
      // from the DOM: Vue does not promise the order of refs collected in a v-for
      const group = event.currentTarget;
      const option = group ? group.querySelectorAll('button')[next] : undefined;
      if (option) {
        option.focus();
      }
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/SegmentedSwitch.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/SegmentedSwitch.vue



SegmentedSwitchvue_type_script_lang_ts.render = SegmentedSwitchvue_type_template_id_d156c55a_render

/* harmony default export */ var SegmentedSwitch = (SegmentedSwitchvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/platformReason.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
/**
 * The reasons a connection to Feinwerk Campaigns does not work now (getConnectionStatus.reason),
 * one meaning in every place that shows them (UI review F2, 2026-11-26): the header status line,
 * the admin page, the builder and the connected panel.
 */
/** the admin page's sentence for a reason (translation key without the plugin prefix) */
const REASON_TEXT = {
  trial_ended: 'PlatformExpired',
  connection_lost: 'PlatformLost',
  access_lost: 'PlatformLost',
  blocked: 'PlatformBlocked',
  unreachable: 'PlatformUnreachable',
  internet_disabled: 'PlatformInternetDisabled'
};
/** the header status line's few words for a reason */
const REASON_SHORT = {
  trial_ended: 'PlatformStatusTrialEnded',
  connection_lost: 'PlatformStatusLost',
  access_lost: 'PlatformStatusLost',
  blocked: 'PlatformStatusBlocked',
  unreachable: 'PlatformStatusUnreachable',
  internet_disabled: 'PlatformStatusUnreachable'
};
/** only a revoked or lost connection is mended by connecting again */
function canReconnect(reason) {
  return reason === 'connection_lost' || reason === 'access_lost';
}
/**
 * The API's platform errors lead with their code word ("no_website: ..."), for scripts and AI
 * clients; the pages show the sentence and decide by the code word.
 */
function splitPlatformError(message) {
  const m = /^([a-z_]+): ([\s\S]*)$/.exec(message);
  return m ? {
    reason: m[1],
    text: m[2]
  } : {
    reason: '',
    text: message
  };
}
/** errors a second try can mend (the platform was busy or did not answer) */
function isPassing(reason) {
  return ['', 'unreachable', 'rate_limited', 'server_error', 'unavailable', 'bad_answer'].includes(reason);
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PlatformLinkPanel.vue?vue&type=script&lang=ts







const PREFIX = 'FeinwerkCampaignManager_';
/* harmony default export */ var PlatformLinkPanelvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    Alert: external_CoreHome_["Alert"],
    SegmentedSwitch: SegmentedSwitch
  },
  props: {
    idSite: {
      type: Number,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    /** the builder's channel tile, sent when the workspace has a channel of that key */
    channelKey: {
      type: String,
      default: ''
    },
    /** what the workspace allows (getConnectionStatus features) */
    features: {
      type: Object,
      default: () => ({
        shortLinks: false,
        qrCodes: false
      })
    },
    /** the workspace in the app (status links.app): a website gets its address there */
    appUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['set-field', 'ready', 'preview', 'new-link'],
  data() {
    return {
      convention: null,
      website: null,
      loading: false,
      error: '',
      reason: '',
      createError: '',
      query: '',
      campaigns: [],
      chosen: null,
      linkType: 'short',
      busy: false,
      created: null,
      createdExisted: false,
      copied: '',
      previewErrors: [],
      confirming: false,
      confirmingCampaign: false,
      timer: null,
      searchSeq: 0,
      previewTimer: null,
      previewCount: 0
    };
  },
  created() {
    this.query = this.form.campaign || '';
    if (!this.types.includes(this.linkType)) {
      this.linkType = 'link';
    }
    this.load();
  },
  beforeUnmount() {
    [this.timer, this.previewTimer].forEach(t => {
      if (t) {
        window.clearTimeout(t);
      }
    });
    this.$emit('ready', false);
  },
  watch: {
    /** step 3's value and the chosen campaign never disagree (UI review F1) */
    'form.campaign': function campaignChanged(value) {
      const typed = `${value || ''}`.trim();
      if (this.chosen && this.chosen.parameter !== typed) {
        this.chosen = null;
      }
      if (!this.chosen && typed) {
        const same = this.campaigns.filter(c => c.parameter === typed);
        if (same.length === 1) {
          [this.chosen] = same;
        }
      }
    },
    previewKey() {
      this.created = null;
      this.createError = '';
      this.confirming = false;
      this.previewSoon();
    }
  },
  computed: {
    types() {
      const out = ['link'];
      if (this.features.shortLinks) {
        out.push('short');
        if (this.features.qrCodes) {
          out.push('qr');
        }
      }
      return out;
    },
    typeOptions() {
      return this.types.map(t => ({
        value: t,
        label: this.tr(`PlatformLinkType_${t}`)
      }));
    },
    passing() {
      return isPassing(this.reason);
    },
    exactMatch() {
      const q = this.query.trim().toLowerCase();
      return this.campaigns.some(c => c.name.toLowerCase() === q || c.parameter.toLowerCase() === q);
    },
    /** list fields whose current value is not in the workspace's list */
    listFields() {
      if (!this.convention) {
        return [];
      }
      return this.convention.fields.filter(f => f.type === 'list' && f.values.length && ['source', 'medium'].includes(f.key) && this.value(f.key) !== '' && !f.values.some(v => v.value === this.value(f.key)));
    },
    targetOk() {
      return /^https?:\/\//i.test(this.form.targetUrl.trim());
    },
    canCreate() {
      return !!this.chosen && this.targetOk && this.form.source.trim() !== '' && this.form.medium.trim() !== '';
    },
    /** why Create is not possible yet, one reason at a time */
    missing() {
      if (!this.targetOk) {
        return this.tr('PlatformLinkMissingTarget');
      }
      if (!this.chosen) {
        return this.tr('PlatformLinkMissingCampaign');
      }
      if (this.form.source.trim() === '' || this.form.medium.trim() === '') {
        return this.tr('PlatformLinkMissingSource');
      }
      return '';
    },
    channel() {
      const conv = this.convention;
      return conv && conv.channels.some(c => c.key === this.channelKey) ? this.channelKey : '';
    },
    /** what the platform's preview depends on */
    previewKey() {
      const f = this.form;
      return JSON.stringify([f.targetUrl, f.source, f.medium, f.content, f.keyword, f.placement, this.chosen ? this.chosen.id : '', this.linkType, this.channel]);
    }
  },
  methods: {
    /** a platform field key as the builder names the field */
    fieldLabel(key) {
      const map = {
        target_url: 'FieldTargetUrl',
        source: 'FieldSource',
        medium: 'FieldMedium',
        campaign: 'FieldCampaign',
        campaign_id: 'PlatformLinkCampaign',
        content: 'FieldContent',
        term: 'FieldKeyword',
        keyword: 'FieldKeyword',
        placement: 'FieldPlacement',
        id: 'FieldCampaignId'
      };
      return map[key] ? this.tr(map[key]) : key;
    },
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(PREFIX + key, ...args);
    },
    value(key) {
      const map = {
        source: 'source',
        medium: 'medium',
        content: 'content',
        term: 'keyword'
      };
      const field = map[key];
      return field ? `${this.form[field] || ''}`.trim() : '';
    },
    /** the sentence of an error, its code word kept apart (platformReason) */
    showError(e, fallback) {
      const {
        reason,
        text
      } = splitPlatformError(e && e.message ? plainText(e.message) : '');
      this.reason = reason;
      this.error = text || this.tr(fallback);
    },
    load() {
      this.loading = true;
      this.error = '';
      this.reason = '';
      fetchPlatformConvention(this.idSite).then(answer => {
        this.website = answer.website;
        this.convention = answer.convention;
        // the builder's own Save gives way: a link of this website is made in the workspace
        this.$emit('ready', true);
        this.search();
      }).catch(e => {
        this.showError(e, 'LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
    },
    searchSoon() {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      // a pause in typing, not every keystroke: the connection shares 120 requests per minute
      this.timer = window.setTimeout(() => this.search(), 500);
    },
    search() {
      // a slower earlier search never overwrites a newer one
      this.searchSeq += 1;
      const seq = this.searchSeq;
      fetchPlatformCampaigns(this.idSite, this.query.trim()).then(rows => {
        if (seq !== this.searchSeq) {
          return;
        }
        this.campaigns = rows;
        this.error = '';
        this.reason = '';
        const typed = `${this.form.campaign || ''}`.trim();
        if (!this.chosen && typed) {
          const same = rows.filter(c => c.parameter === typed);
          if (same.length === 1) {
            [this.chosen] = same;
          }
        }
      }).catch(e => {
        if (seq !== this.searchSeq) {
          return;
        }
        this.showError(e, 'LoadFailed');
      });
    },
    choose(c) {
      this.chosen = c;
      this.$emit('set-field', {
        field: 'campaign',
        value: c.parameter
      });
    },
    createCampaign() {
      this.busy = true;
      this.error = '';
      this.confirmingCampaign = false;
      addPlatformCampaign(this.idSite, this.query.trim()).then(answer => {
        const others = this.campaigns.filter(c => c.id !== answer.campaign.id);
        this.campaigns = [answer.campaign, ...others];
        this.choose(answer.campaign);
      }).catch(e => {
        this.showError(e, 'SaveFailed');
      }).finally(() => {
        this.busy = false;
      });
    },
    input() {
      return {
        targetUrl: this.form.targetUrl.trim(),
        platformCampaignId: this.chosen ? this.chosen.id : '',
        source: this.form.source,
        medium: this.form.medium,
        content: this.form.content,
        keyword: this.form.keyword,
        channel: this.channel,
        placement: this.form.placement,
        shortLink: this.linkType !== 'link',
        dynamicQr: this.linkType === 'qr',
        note: this.form.note,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      };
    },
    /** the platform's preview after a pause, so "Your link" shows the link that gets created */
    previewSoon() {
      if (this.previewTimer) {
        window.clearTimeout(this.previewTimer);
      }
      this.previewErrors = [];
      if (!this.canCreate) {
        this.$emit('preview', '');
        return;
      }
      this.previewTimer = window.setTimeout(() => {
        this.previewCount += 1;
        const current = this.previewCount;
        previewPlatformLink(this.idSite, this.input()).then(answer => {
          if (current !== this.previewCount) {
            return;
          }
          this.$emit('preview', answer.url || '');
          const errors = answer.errors || {};
          // the builder's own field names instead of the platform's keys (R51 W6)
          this.previewErrors = Object.keys(errors).map(k => `${this.fieldLabel(k)}: ${[].concat(errors[k]).join(' ')}`).concat(answer.warnings || []);
        }).catch(e => {
          if (current === this.previewCount) {
            this.$emit('preview', '');
            const {
              text
            } = splitPlatformError(e && e.message ? plainText(e.message) : '');
            this.previewErrors = [text || this.tr('PreviewFailed')];
          }
        });
      }, 800);
    },
    askCreate() {
      this.confirming = true;
      this.$nextTick(() => {
        const button = this.$refs.confirmButton;
        if (button) {
          button.focus();
        }
      });
    },
    cancelCreate() {
      this.confirming = false;
      this.$nextTick(() => {
        const button = this.$refs.createButton;
        if (button) {
          button.focus();
        }
      });
    },
    create() {
      if (!this.chosen) {
        return;
      }
      this.confirming = false;
      this.busy = true;
      this.createError = '';
      this.created = null;
      addPlatformLink(this.idSite, this.input()).then(answer => {
        this.created = answer.link;
        this.createdExisted = answer.existed;
        // "Your link" shows the link that was created, not the preview with its placeholder id
        this.$emit('preview', answer.link.url);
        this.focusRef('result');
      }).catch(e => {
        const {
          text
        } = splitPlatformError(e && e.message ? plainText(e.message) : '');
        this.createError = text || this.tr('SaveFailed');
        this.focusRef('createError');
      }).finally(() => {
        this.busy = false;
        if (!this.created && !this.createError) {
          this.focusRef('createButton');
        }
      });
    },
    focusRef(name) {
      this.$nextTick(() => {
        const el = this.$refs[name];
        if (el) {
          el.focus();
        }
      });
    },
    copy(text, which) {
      copyText(text).then(() => {
        this.copied = which;
        window.setTimeout(() => {
          this.copied = '';
        }, 2000);
      }).catch(() => {
        this.copied = '';
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformLinkPanel.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformLinkPanel.vue



PlatformLinkPanelvue_type_script_lang_ts.render = PlatformLinkPanelvue_type_template_id_cd95e7b6_render

/* harmony default export */ var PlatformLinkPanel = (PlatformLinkPanelvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/SidePanel.vue?vue&type=template&id=34bb8f80

const SidePanelvue_type_template_id_34bb8f80_hoisted_1 = ["aria-labelledby"];
const SidePanelvue_type_template_id_34bb8f80_hoisted_2 = {
  class: "fwcmp-sidepanel__header"
};
const SidePanelvue_type_template_id_34bb8f80_hoisted_3 = ["id"];
const SidePanelvue_type_template_id_34bb8f80_hoisted_4 = ["aria-label", "title"];
const SidePanelvue_type_template_id_34bb8f80_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  "aria-hidden": "true"
}, "×", -1);
const SidePanelvue_type_template_id_34bb8f80_hoisted_6 = [SidePanelvue_type_template_id_34bb8f80_hoisted_5];
const SidePanelvue_type_template_id_34bb8f80_hoisted_7 = {
  class: "fwcmp-sidepanel__body"
};
const SidePanelvue_type_template_id_34bb8f80_hoisted_8 = {
  key: 0,
  class: "fwcmp-sidepanel__footer"
};
function SidePanelvue_type_template_id_34bb8f80_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Teleport"], {
    to: "body"
  }, [_ctx.open ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["fwcmp-sidepanel__backdrop", _ctx.scopeClass]),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.requestClose && _ctx.requestClose(...args))
  }, null, 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "fwcmp-sidepanel"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [_ctx.open ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("section", {
      key: 0,
      ref: "panel",
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["fwcmp-sidepanel", [_ctx.scopeClass, {
        'fwcmp-sidepanel--narrow': _ctx.size === 'narrow'
      }]]),
      role: "dialog",
      "aria-modal": "true",
      tabindex: "-1",
      "aria-labelledby": _ctx.titleId,
      onKeydown: _cache[2] || (_cache[2] = (...args) => _ctx.onKeydown && _ctx.onKeydown(...args))
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("header", SidePanelvue_type_template_id_34bb8f80_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", {
      id: _ctx.titleId,
      class: "fwcmp-sidepanel__title"
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.title), 9, SidePanelvue_type_template_id_34bb8f80_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "fwcmp-sidepanel__close",
      "aria-label": _ctx.closeLabel,
      title: _ctx.closeLabel,
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.requestClose && _ctx.requestClose(...args))
    }, SidePanelvue_type_template_id_34bb8f80_hoisted_6, 8, SidePanelvue_type_template_id_34bb8f80_hoisted_4)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", SidePanelvue_type_template_id_34bb8f80_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "default")]), _ctx.$slots.footer ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("footer", SidePanelvue_type_template_id_34bb8f80_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "footer")])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 42, SidePanelvue_type_template_id_34bb8f80_hoisted_1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]),
    _: 3
  })]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/SidePanel.vue?vue&type=template&id=34bb8f80

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/SidePanel.vue?vue&type=script&lang=ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' + 'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
/** the class on <html> that locks the page scroll while any panel is open */
const OPEN_CLASS = 'fwcmp-sidepanel-open';
let openPanels = 0;
let lastId = 0;
/* harmony default export */ var SidePanelvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    open: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    /** the close button's label (aria-label and tooltip) */
    closeLabel: {
      type: String,
      required: true
    },
    /** classes for the panel and the backdrop, e.g. the page's scope for its own styles */
    scopeClass: {
      type: String,
      default: ''
    },
    /** 'default' (about two thirds of the page) or 'narrow' (at most 560 px, short forms) */
    size: {
      type: String,
      default: 'default'
    }
  },
  emits: ['update:open'],
  data() {
    lastId += 1;
    return {
      titleId: `fwcmp-sidepanel-title-${lastId}`,
      opener: null,
      locked: false
    };
  },
  watch: {
    open(isOpen) {
      if (isOpen) {
        this.onOpen();
      } else {
        this.onClose();
      }
    }
  },
  mounted() {
    if (this.open) {
      this.onOpen();
    }
  },
  beforeUnmount() {
    if (this.open) {
      this.onClose();
    }
  },
  methods: {
    requestClose() {
      this.$emit('update:open', false);
    },
    onOpen() {
      const active = document.activeElement;
      this.opener = active instanceof HTMLElement && active !== document.body ? active : null;
      this.lock();
      document.addEventListener('keydown', this.onDocumentKeydown, true);
      this.$nextTick(() => {
        const panel = this.$refs.panel;
        const first = this.focusables(true)[0];
        if (first) {
          first.focus();
        } else if (panel) {
          panel.focus();
        }
      });
    },
    onClose() {
      this.unlock();
      document.removeEventListener('keydown', this.onDocumentKeydown, true);
      const {
        opener
      } = this;
      this.opener = null;
      if (opener && document.contains(opener)) {
        opener.focus();
      }
    },
    lock() {
      if (!this.locked) {
        this.locked = true;
        openPanels += 1;
        document.documentElement.classList.add(OPEN_CLASS);
      }
    },
    unlock() {
      if (this.locked) {
        this.locked = false;
        openPanels = Math.max(0, openPanels - 1);
        if (openPanels === 0) {
          document.documentElement.classList.remove(OPEN_CLASS);
        }
      }
    },
    /** the panel's focusable elements; bodyFirst: those of the body, else all (the close button) */
    focusables(bodyFirst) {
      const panel = this.$refs.panel;
      if (!panel) {
        return [];
      }
      // tab stops only: not a switch's other options (tabindex -1), nothing hidden
      const all = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(el => el.tabIndex >= 0 && !el.closest('[hidden]'));
      if (!bodyFirst) {
        return all;
      }
      const body = all.filter(el => el.closest('.fwcmp-sidepanel__body'));
      return body.length ? body : all;
    },
    /**
     * Keys while the focus is outside the panel, e.g. on <body> after the focused control was
     * removed (a filter row, a button swapped for its confirmation): Escape still closes, Tab comes
     * back into the panel.
     */
    onDocumentKeydown(event) {
      const panel = this.$refs.panel;
      if (!panel || panel.contains(event.target)) {
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.requestClose();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        const items = this.focusables(false);
        const target = event.shiftKey ? items[items.length - 1] : items[0];
        (target || panel).focus();
      }
    },
    onKeydown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.requestClose();
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }
      const items = this.focusables(false);
      if (!items.length) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const panel = this.$refs.panel;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/SidePanel.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/SidePanel.vue



SidePanelvue_type_script_lang_ts.render = SidePanelvue_type_template_id_34bb8f80_render

/* harmony default export */ var SidePanel = (SidePanelvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PlatformBenefits.vue?vue&type=template&id=16ad3c50

const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_1 = {
  class: "fwcmp-benefits"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_2 = {
  class: "fwcmp-benefits__table"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_3 = {
  scope: "col"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_4 = {
  class: "fwcmp-sr-only"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_5 = {
  scope: "col"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_6 = {
  scope: "col"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_7 = {
  scope: "row"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_8 = {
  class: "fwcmp-benefits__mark"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_9 = {
  "aria-hidden": "true"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_10 = {
  class: "fwcmp-sr-only"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_11 = {
  class: "fwcmp-benefits__mark fwcmp-benefits__mark--yes"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_12 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  "aria-hidden": "true"
}, "✓", -1);
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_13 = {
  class: "fwcmp-sr-only"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_14 = {
  class: "fwcmp-benefits__trial"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_15 = {
  class: "fwcmp-hint fwcmp-benefits__steps"
};
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_16 = ["href"];
const PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
function PlatformBenefitsvue_type_template_id_16ad3c50_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsFeature')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsColMatomo')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsColPlatform')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.rows, row => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: row.key
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`Benefit_${row.key}`)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.matomo ? '✓' : ''), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.matomo ? _ctx.tr('BenefitYes') : _ctx.tr('BenefitNo')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_11, [PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitYes')), 1)])]);
  }), 128))])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsTrial')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_15, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsSteps')), 1), _ctx.moreUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    class: "fwcmp-applink fwcmp-benefits__more",
    href: _ctx.moreUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsMore')), 1), PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_17], 8, PlatformBenefitsvue_type_template_id_16ad3c50_hoisted_16)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformBenefits.vue?vue&type=template&id=16ad3c50

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PlatformBenefits.vue?vue&type=script&lang=ts


const PlatformBenefitsvue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
/** the rows: what this Matomo does on its own, then what the platform adds */
const ROWS = [{
  key: 'links',
  matomo: true
}, {
  key: 'short',
  matomo: false
}, {
  key: 'qr',
  matomo: false
}, {
  key: 'counts',
  matomo: false
}, {
  key: 'convention',
  matomo: false
}, {
  key: 'checks',
  matomo: false
}, {
  key: 'calendar',
  matomo: false
}];
/* harmony default export */ var PlatformBenefitsvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    /** the platform's page about it (getConnectionStatus moreUrl) */
    moreUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    rows() {
      return ROWS;
    }
  },
  methods: {
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(PlatformBenefitsvue_type_script_lang_ts_PREFIX + key, ...args);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformBenefits.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformBenefits.vue



PlatformBenefitsvue_type_script_lang_ts.render = PlatformBenefitsvue_type_template_id_16ad3c50_render

/* harmony default export */ var PlatformBenefits = (PlatformBenefitsvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/FeedbackBar.vue?vue&type=template&id=d518b3a4

const FeedbackBarvue_type_template_id_d518b3a4_hoisted_1 = ["title"];
const FeedbackBarvue_type_template_id_d518b3a4_hoisted_2 = ["title", "aria-label", "aria-pressed", "disabled", "onClick"];
const FeedbackBarvue_type_template_id_d518b3a4_hoisted_3 = ["d"];
const FeedbackBarvue_type_template_id_d518b3a4_hoisted_4 = {
  class: "fwcmp-feedback__thanks",
  role: "status"
};
const FeedbackBarvue_type_template_id_d518b3a4_hoisted_5 = ["href", "title"];
const FeedbackBarvue_type_template_id_d518b3a4_hoisted_6 = {
  viewBox: "0 0 24 24",
  width: "14",
  height: "14",
  "aria-hidden": "true",
  focusable: "false"
};
const FeedbackBarvue_type_template_id_d518b3a4_hoisted_7 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}, null, -1);
const FeedbackBarvue_type_template_id_d518b3a4_hoisted_8 = ["d"];
function FeedbackBarvue_type_template_id_d518b3a4_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.feedback.enabled || _ctx.feedback.supportUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["fwcmp-feedback", {
      'is-voted': _ctx.vote !== ''
    }])
  }, [_ctx.feedback.enabled ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: "fwcmp-feedback__question",
    title: _ctx.question
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.question), 9, FeedbackBarvue_type_template_id_d518b3a4_hoisted_1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.choices, choice => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: choice,
      type: "button",
      class: "fwcmp-feedback__thumb",
      title: _ctx.label(choice),
      "aria-label": _ctx.label(choice),
      "aria-pressed": _ctx.vote === choice ? 'true' : 'false',
      disabled: _ctx.vote !== '',
      onClick: $event => _ctx.send(choice)
    }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", {
      viewBox: "0 0 24 24",
      width: "14",
      height: "14",
      "aria-hidden": "true",
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-feedback__icon--${choice}`)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
      d: _ctx.thumbPath
    }, null, 8, FeedbackBarvue_type_template_id_d518b3a4_hoisted_3)], 2))], 8, FeedbackBarvue_type_template_id_d518b3a4_hoisted_2);
  }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", FeedbackBarvue_type_template_id_d518b3a4_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.thanks), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.feedback.supportUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 1,
    class: "fwcmp-feedback__support",
    href: _ctx.feedback.supportUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    title: _ctx.tr('SupportTitle')
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", FeedbackBarvue_type_template_id_d518b3a4_hoisted_6, [FeedbackBarvue_type_template_id_d518b3a4_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
    d: _ctx.helpPath
  }, null, 8, FeedbackBarvue_type_template_id_d518b3a4_hoisted_8)])), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Support')), 1)], 8, FeedbackBarvue_type_template_id_d518b3a4_hoisted_5)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/FeedbackBar.vue?vue&type=template&id=d518b3a4

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/FeedbackBar.vue?vue&type=script&lang=ts


const PLUGIN = 'FeinwerkCampaignManager';
/** a thumb outline (24 x 24); the down thumb is the same, rotated */
const THUMB_PATH = 'M3 10h4v10H3zM7 10l4-7c1.3 0 2.2 1.1 2 2.4L12.4 9H19a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 17.8 20H7';
/** localStorage: this browser's vote per question and plugin version (a convenience only) */
function storageKey(topic) {
  return `${PLUGIN}.feedback.${topic}`;
}
function storedVote(topic, version) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey(topic)) || '{}');
    return stored.version === version && (stored.vote === 'up' || stored.vote === 'down') ? stored.vote : '';
  } catch (e) {
    return '';
  }
}
/* harmony default export */ var FeedbackBarvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idSite: {
      type: Number,
      required: true
    },
    /** the store "topic": one of the plugin's PluginFeedback::TOPICS */
    topic: {
      type: String,
      required: true
    },
    /** the question, already translated */
    question: {
      type: String,
      required: true
    },
    feedback: {
      type: Object,
      default: () => ({
        enabled: false,
        supportUrl: '',
        version: ''
      })
    }
  },
  data() {
    return {
      vote: storedVote(this.topic, this.feedback.version)
    };
  },
  computed: {
    choices() {
      return ['up', 'down'];
    },
    thumbPath() {
      return THUMB_PATH;
    },
    helpPath() {
      return 'M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.6M12 17h.01';
    },
    thanks() {
      if (this.vote === '') {
        return '';
      }
      return this.vote === 'up' ? this.tr('FeedbackThanks') : this.tr('FeedbackThanksDown');
    }
  },
  methods: {
    tr(key) {
      return Object(external_CoreHome_["translate"])(`${PLUGIN}_${key}`);
    },
    label(choice) {
      return choice === 'up' ? this.tr('FeedbackYes') : this.tr('FeedbackNo');
    },
    send(vote) {
      this.vote = vote;
      try {
        const stored = {
          version: this.feedback.version,
          vote
        };
        window.localStorage.setItem(storageKey(this.topic), JSON.stringify(stored));
      } catch (e) {
        // private mode or blocked storage: the thanks is shown anyway
      }
      // Best effort: the vote is a hint for Feinwerk, a failed request needs no error message.
      external_CoreHome_["AjaxHelper"].post({
        method: `${PLUGIN}.sendFeedback`,
        idSite: this.idSite
      }, {
        topic: this.topic,
        vote
      }, {
        createErrorNotification: false
      }).catch(() => undefined);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/FeedbackBar.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/FeedbackBar.vue



FeedbackBarvue_type_script_lang_ts.render = FeedbackBarvue_type_template_id_d518b3a4_render

/* harmony default export */ var FeedbackBar = (FeedbackBarvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PromoLine.vue?vue&type=template&id=4fbaaed3

const PromoLinevue_type_template_id_4fbaaed3_hoisted_1 = ["data-fwpromo-id", "data-fwpromo-days", "data-fwpromo-demo"];
const PromoLinevue_type_template_id_4fbaaed3_hoisted_2 = ["title"];
const PromoLinevue_type_template_id_4fbaaed3_hoisted_3 = ["href", "target", "rel", "title"];
const PromoLinevue_type_template_id_4fbaaed3_hoisted_4 = {
  class: "fwpromo-line__link-full"
};
const PromoLinevue_type_template_id_4fbaaed3_hoisted_5 = {
  class: "fwpromo-line__link-short"
};
const PromoLinevue_type_template_id_4fbaaed3_hoisted_6 = ["title", "aria-label"];
const PromoLinevue_type_template_id_4fbaaed3_hoisted_7 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  "aria-hidden": "true"
}, "×", -1);
const PromoLinevue_type_template_id_4fbaaed3_hoisted_8 = [PromoLinevue_type_template_id_4fbaaed3_hoisted_7];
function PromoLinevue_type_template_id_4fbaaed3_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FeinwerkLogo = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("FeinwerkLogo");
  return _ctx.promo ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: "fwpromo-line",
    "data-fwpromo-id": _ctx.promo.id,
    "data-fwpromo-placement": "line",
    "data-fwpromo-days": _ctx.promo.dismissDays,
    "data-fwpromo-demo": _ctx.promo.demo ? '1' : undefined
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_FeinwerkLogo), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: "fwpromo-line__text",
    title: _ctx.promo.text
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.promo.text), 9, PromoLinevue_type_template_id_4fbaaed3_hoisted_2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "fwpromo-line__link",
    href: _ctx.promo.url,
    target: _ctx.promo.external === false ? undefined : '_blank',
    rel: _ctx.promo.external === false ? undefined : 'noopener',
    title: _ctx.linkTitle || undefined
  }, [_ctx.promo.linkShort ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PromoLinevue_type_template_id_4fbaaed3_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.promo.link), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PromoLinevue_type_template_id_4fbaaed3_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.promo.linkShort), 1)], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.promo.link), 1)], 64))], 8, PromoLinevue_type_template_id_4fbaaed3_hoisted_3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "fwpromo-line__dismiss fwpromo-dismiss",
    title: _ctx.dismissLabel,
    "aria-label": _ctx.dismissLabel
  }, PromoLinevue_type_template_id_4fbaaed3_hoisted_8, 8, PromoLinevue_type_template_id_4fbaaed3_hoisted_6)], 8, PromoLinevue_type_template_id_4fbaaed3_hoisted_1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PromoLine.vue?vue&type=template&id=4fbaaed3

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/FeinwerkLogo.vue?vue&type=template&id=1c6a5ee3

const FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_1 = {
  class: "fwlogo",
  "aria-hidden": "true"
};
const FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_2 = {
  class: "fwlogo__mark",
  viewBox: "0 0 48 48",
  width: "18",
  height: "18",
  focusable: "false"
};
const FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("circle", {
  class: "fwlogo__core",
  cx: "24",
  cy: "24",
  r: "5.4"
}, null, -1);
const FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_4 = ["opacity"];
const FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_5 = ["cx", "cy", "r"];
const FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_6 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "fwlogo__word"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("feinwerk"), /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "fwlogo__sub"
}, " plugins")], -1);
function FeinwerkLogovue_type_template_id_1c6a5ee3_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_1, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_2, [FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_3, (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.LOGO_RINGS, ring => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("g", {
      key: ring.opacity,
      class: "fwlogo__dots",
      opacity: ring.opacity
    }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(ring.dots, ([cx, cy], n) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("circle", {
        key: n,
        cx: cx,
        cy: cy,
        r: ring.r
      }, null, 8, FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_5);
    }), 128))], 8, FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_4);
  }), 128))])), FeinwerkLogovue_type_template_id_1c6a5ee3_hoisted_6]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/FeinwerkLogo.vue?vue&type=template&id=1c6a5ee3

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/FeinwerkLogo.vue?vue&type=script&lang=ts

/** the dots of the store's feinwerk-plugins-mark.svg, as in the kit's _feinwerkLogo.twig */
const LOGO_RINGS = [{
  opacity: '0.9',
  r: '2.9',
  dots: [[16, 24], [32, 24], [24, 16], [24, 32]]
}, {
  opacity: '0.55',
  r: '2.5',
  dots: [[16, 16], [32, 16], [16, 32], [32, 32]]
}, {
  opacity: '0.35',
  r: '2.1',
  dots: [[8, 24], [40, 24], [24, 8], [24, 40]]
}];
/* harmony default export */ var FeinwerkLogovue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  data() {
    return {
      LOGO_RINGS
    };
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/FeinwerkLogo.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/FeinwerkLogo.vue



FeinwerkLogovue_type_script_lang_ts.render = FeinwerkLogovue_type_template_id_1c6a5ee3_render

/* harmony default export */ var FeinwerkLogo = (FeinwerkLogovue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PromoLine.vue?vue&type=script&lang=ts


/* harmony default export */ var PromoLinevue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    FeinwerkLogo: FeinwerkLogo
  },
  props: {
    promo: {
      type: Object,
      default: null
    },
    dismissLabel: {
      type: String,
      required: true
    }
  },
  computed: {
    /** the admin note; with a short form the full link text first (kit _promo.twig, v6) */
    linkTitle() {
      if (!this.promo) {
        return '';
      }
      const note = this.promo.note || '';
      if (!this.promo.linkShort) {
        return note;
      }
      return note ? `${this.promo.link}. ${note}` : this.promo.link;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PromoLine.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PromoLine.vue



PromoLinevue_type_script_lang_ts.render = PromoLinevue_type_template_id_4fbaaed3_render

/* harmony default export */ var PromoLine = (PromoLinevue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/shortDay.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
/**
 * a website day (YYYY-MM-DD) as day and month in the page's language: "12.11.", "11/12"; with the
 * year when it is not this year ("15.1.2027"), so a future start never reads like a past one
 */
function shortDay(day) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (!m) {
    return day;
  }
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const otherYear = date.getFullYear() !== new Date().getFullYear();
  return date.toLocaleDateString(document.documentElement.lang || undefined, otherYear ? {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  } : {
    day: 'numeric',
    month: 'numeric'
  });
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/LinkBuilder.vue?vue&type=script&lang=ts














const LinkBuildervue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
const CATEGORY = 'FeinwerkCampaignManager_Campaigns';
const FIELD_LABELS = {
  campaign: 'FieldCampaign',
  source: 'FieldSource',
  medium: 'FieldMedium',
  keyword: 'FieldKeyword',
  content: 'FieldContent',
  campaignId: 'FieldCampaignId',
  group: 'FieldGroup',
  placement: 'FieldPlacement'
};
function emptyForm(parameterSet) {
  return {
    targetUrl: '',
    campaign: '',
    source: '',
    medium: '',
    keyword: '',
    content: '',
    campaignId: '',
    group: '',
    placement: '',
    parameterSet,
    startDate: '',
    endDate: '',
    note: ''
  };
}
function formOf(link) {
  return Object.assign(Object.assign({}, link.values), {}, {
    targetUrl: link.targetUrl,
    parameterSet: link.parameterSet,
    startDate: link.startDate || '',
    endDate: link.endDate || '',
    note: link.note || ''
  });
}
function idLinkInHash() {
  const value = Number(external_CoreHome_["MatomoUrl"].hashParsed.value.idLink || 0);
  return Number.isInteger(value) && value > 0 ? value : 0;
}
/* harmony default export */ var LinkBuildervue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idSite: {
      type: Number,
      required: true
    },
    canWrite: {
      type: Boolean,
      default: false
    },
    siteUrl: {
      type: String,
      default: ''
    },
    /** the feedback row at the end of the page (Feinwerk kit); null in Widgetize embeds */
    feedback: {
      type: Object,
      default: null
    },
    /** the kit's tip line after the feedback row (Promo\PromoLine); null: none */
    promo: {
      type: Object,
      default: null
    }
  },
  components: {
    PlatformLinkPanel: PlatformLinkPanel,
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    Alert: external_CoreHome_["Alert"],
    FeedbackBar: FeedbackBar,
    PromoLine: PromoLine,
    SaveButton: external_CorePluginsAdmin_["SaveButton"],
    SegmentedSwitch: SegmentedSwitch,
    SidePanel: SidePanel,
    PlatformBenefits: PlatformBenefits
  },
  data() {
    return {
      loading: true,
      loadError: '',
      missingLink: false,
      platform: null,
      platformReady: false,
      platformPreview: '',
      benefitsOpen: false,
      ready: false,
      parameterSets: {
        sets: [],
        defaultSet: 'utm',
        fields: FIELDS,
        mcrOnlyFields: [],
        mcrActive: false,
        lowercaseValues: true
      },
      templates: [],
      suggestions: {},
      counted: [],
      form: emptyForm('utm'),
      savedForm: '',
      editing: 0,
      editingLabel: '',
      editingStatus: '',
      editingUrl: '',
      editingPlatform: null,
      shortCopied: false,
      editingGenerated: false,
      wentLive: false,
      fromLive: '',
      markingLive: false,
      confirmLiveAt: '',
      sentHint: false,
      editingLiveSince: '',
      editingLiveReason: '',
      result: null,
      previewError: false,
      abort: null,
      timer: null,
      moreOpen: false,
      saving: false,
      saved: '',
      saveError: '',
      copied: false,
      copyFailed: false
    };
  },
  created() {
    this.load();
    // makes no outbound call while not connected; a failed read leaves the builder as it is
    fetchConnectionStatus().then(status => {
      this.platform = status;
    }).catch(() => {
      this.platform = null;
    });
  },
  beforeUnmount() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    if (this.abort) {
      this.abort.abort();
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.saved = '';
        this.saveError = '';
        this.copied = false;
        this.copyFailed = false;
        this.schedulePreview();
      }
    }
  },
  computed: {
    /** not connected: the link types shown locked (decision 1) */
    lockedTypes() {
      return ['link', 'short', 'qr'].map(t => ({
        value: t,
        label: this.tr(`PlatformLinkType_${t}`),
        disabled: t !== 'link',
        title: t !== 'link' ? this.tr('PlatformNeedsConnection') : undefined
      }));
    },
    /** connected but not usable now: the admin page's sentence for the reason (UI review F2) */
    platformReasonText() {
      const key = this.platform ? REASON_TEXT[this.platform.reason] : '';
      return this.tr(key || 'PlatformUnavailableHere');
    },
    targetPlaceholder() {
      return this.siteUrl ? `${this.siteUrl.replace(/\/+$/, '')}/` : '';
    },
    moreFields() {
      const fields = ['keyword', 'content'];
      if (this.parameterSets.mcrActive) {
        fields.push('campaignId', 'group', 'placement');
      }
      return fields;
    },
    /** the channel whose values the form carries, so the tile follows the fields */
    activeTemplate() {
      const medium = this.form.medium.trim().toLowerCase();
      const source = this.form.source.trim().toLowerCase();
      if (medium === '') {
        return null;
      }
      const exact = this.templates.find(t => t.medium === medium && t.source === source);
      return exact || this.templates.find(t => t.medium === medium && t.source === '') || null;
    },
    /** warnings without a place of their own (not_read of hidden fields) */
    otherWarnings() {
      const shown = ['targetUrl', 'campaign', 'source', 'medium', ...this.moreFields];
      return (this.result ? this.result.warnings : []).filter(m => !shown.includes(m.field) && !this.isMcrNotice(m));
    },
    dirty() {
      return JSON.stringify(this.form) !== this.savedForm;
    },
    /** the API refuses it too; checked here so the person sees it at the field */
    datesWrong() {
      return this.form.startDate !== '' && this.form.endDate !== '' && this.form.endDate < this.form.startDate;
    },
    /** a live or ended link: target and values stay, note and dates change (decision 6) */
    locked() {
      return this.editing > 0 && this.editingStatus !== '' && this.editingStatus !== 'draft';
    },
    /** the link as it is: the saved one while locked, else the preview */
    shownUrl() {
      if (this.locked) {
        return this.editingUrl;
      }
      // connected: the link the workspace would create, never a local one nobody saves
      if (this.platformReady && !this.editing) {
        return this.platformPreview;
      }
      return this.result && this.result.url ? this.result.url : '';
    },
    /** "since 12.11., first visit counted" for a live or ended link */
    liveSinceText() {
      if (!this.locked || !this.editingLiveSince || !this.editingLiveReason) {
        return '';
      }
      return this.tr('LiveSince', shortDay(this.editingLiveSince), this.tr(`LiveReason_${this.editingLiveReason}`));
    },
    /** the saved values of a locked link, as label and value lines */
    liveLines() {
      if (!this.savedForm) {
        return [];
      }
      const saved = JSON.parse(this.savedForm);
      const lines = [{
        label: this.tr('FieldTargetUrl'),
        value: saved.targetUrl
      }, {
        label: this.tr('SourceMedium'),
        value: [saved.source, saved.medium].filter(v => v).join(' / ')
      }, {
        label: this.tr('FieldCampaign'),
        value: saved.campaign
      }];
      this.moreFields.forEach(field => {
        if (saved[field]) {
          lines.push({
            label: this.label(field),
            value: saved[field]
          });
        }
      });
      lines.push({
        label: this.tr('ParameterSet'),
        value: this.setLabel(saved.parameterSet)
      });
      return lines.filter(l => l.value !== '');
    },
    /** target, parameter set or a value differs from the saved link */
    valuesChanged() {
      if (!this.savedForm) {
        return false;
      }
      const saved = JSON.parse(this.savedForm);
      const keys = ['targetUrl', 'parameterSet', ...FIELDS];
      return keys.some(k => saved[k] !== this.form[k]);
    },
    canSave() {
      if (this.locked) {
        return !this.saving && this.dirty && !this.valuesChanged && !this.datesWrong;
      }
      return !!this.result && this.result.valid && !this.saving && !this.sameLink && !this.previewError && this.dirty && !this.datesWrong;
    },
    sameLink() {
      if (!this.result || !this.result.existingIdLink) {
        return 0;
      }
      return this.result.existingIdLink === this.editing ? 0 : this.result.existingIdLink;
    },
    statusText() {
      if (!this.result) {
        return '';
      }
      return this.result.valid ? this.tr('LinkReady') : this.tr('LinkHasErrors');
    },
    copyLabel() {
      return this.copied ? this.tr('Copied') : this.tr('CopyLinkShort');
    }
  },
  methods: {
    shortPill(url) {
      return url.replace(/^https?:\/\//i, '');
    },
    copyShort(url) {
      copyText(url).then(() => {
        this.shortCopied = true;
        window.setTimeout(() => {
          this.shortCopied = false;
        }, 2000);
      }).catch(() => undefined);
    },
    canReconnect: canReconnect,
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(LinkBuildervue_type_script_lang_ts_PREFIX + key, ...args);
    },
    label(field) {
      return this.tr(FIELD_LABELS[field]);
    },
    setLabel(key) {
      if (key === 'own') {
        return this.tr('ParameterSetOwn');
      }
      return this.tr('ParameterSetNamed', key);
    },
    templateHint(t) {
      return [t.source, t.medium].filter(v => v !== '').join(' / ');
    },
    /** a value from the connected panel (a campaign's parameter, a value of a workspace list) */
    setField(change) {
      const allowed = ['campaign', 'source', 'medium', 'content', 'keyword'];
      if (allowed.includes(change.field)) {
        this.form[change.field] = change.value;
      }
    },
    load() {
      this.loading = true;
      this.loadError = '';
      this.missingLink = false;
      const idLink = idLinkInHash();
      Promise.all([fetchParameterSets(this.idSite), fetchTemplates(this.idSite),
      // suggestions are a help: without them the form still works
      Promise.all(['campaign', 'source', 'medium'].map(field => fetchSuggestions(this.idSite, field).catch(() => []))),
      // a link that is not there (another website, an old bookmark) is no reason to fail
      idLink ? fetchLink(this.idSite, idLink) : Promise.resolve(null)]).then(([sets, templates, suggestions, link]) => {
        this.parameterSets = sets;
        this.templates = templates;
        this.counted = suggestions[0].filter(s => s.source === 'report').map(s => s.value);
        this.suggestions = {
          campaign: suggestions[0].map(s => s.value),
          source: suggestions[1].map(s => s.value),
          medium: suggestions[2].map(s => s.value)
        };
        if (link) {
          this.edit(link);
          this.moreOpen = true;
        } else {
          this.missingLink = idLink > 0;
          this.form = emptyForm(sets.defaultSet);
          // "New link" of a campaign in the overview
          const {
            campaign
          } = external_CoreHome_["MatomoUrl"].hashParsed.value;
          if (typeof campaign === 'string') {
            this.form.campaign = campaign;
          }
          this.savedForm = '';
        }
        this.ready = true;
      }).catch(e => {
        this.loadError = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
    },
    edit(link) {
      this.editing = link.idLink;
      this.fromLive = '';
      this.editingStatus = link.status || 'draft';
      this.editingUrl = link.url;
      this.editingPlatform = link.platform || null;
      this.editingLiveSince = link.liveSince || '';
      this.editingLiveReason = link.liveReason || '';
      this.confirmLiveAt = '';
      this.sentHint = false;
      this.editingGenerated = link.campaignIdGenerated;
      const sourceMedium = [link.values.source, link.values.medium].filter(v => v !== '');
      this.editingLabel = sourceMedium.length ? `${link.values.campaign} (${sourceMedium.join(' / ')})` : link.values.campaign;
      this.form = formOf(link);
      this.savedForm = JSON.stringify(this.form);
    },
    startNew() {
      // the browser's own dialog: accessible, and Matomo 5.0 has no confirm component to reuse
      // eslint-disable-next-line no-alert
      if (this.editing && this.dirty && !window.confirm(this.tr('DiscardChanges'))) {
        return;
      }
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: CATEGORY,
        idLink: null,
        campaign: null
      }));
      this.missingLink = false;
      this.editing = 0;
      this.editingLabel = '';
      this.editingStatus = '';
      this.editingUrl = '';
      this.editingPlatform = null;
      this.wentLive = false;
      this.fromLive = '';
      this.form = emptyForm(this.parameterSets.defaultSet);
      this.savedForm = '';
      this.result = null;
    },
    applyTemplate(t) {
      this.form.medium = t.medium;
      this.form.source = t.source;
      window.setTimeout(() => {
        const next = document.getElementById(t.source === '' ? 'fwcmp-source' : 'fwcmp-campaign');
        if (next) {
          next.focus();
        }
      }, 0);
    },
    /** values worth one click: the channel's sources first, then what the website uses */
    chips(field) {
      const typed = this.form[field].trim().toLowerCase();
      let values = [];
      if (field === 'source' && this.activeTemplate) {
        values = [...this.activeTemplate.sources];
      }
      values = values.concat(this.suggestions[field] || []);
      const unique = values.filter((v, i) => values.indexOf(v) === i);
      return unique.filter(v => v.toLowerCase() !== typed && (typed === '' || v.toLowerCase().includes(typed))).slice(0, 6);
    },
    isMcrNotice(m) {
      return m.code === 'not_read' && m.details.needs === 'MarketingCampaignsReporting';
    },
    hasError(field) {
      return !!this.result && this.result.errors.some(m => m.field === field);
    },
    messagesFor(field) {
      if (!this.result) {
        return [];
      }
      // before a value is typed, "required" would only scold
      const typed = field === 'targetUrl' ? this.form.targetUrl : this.form[field];
      const out = [];
      this.result.errors.forEach(m => {
        if (m.field === field && !(m.code === 'required' && !typed)) {
          out.push({
            code: m.code,
            kind: 'error',
            message: m.message,
            known: ''
          });
        }
      });
      // connected, the campaign value comes from the workspace: no "did you mean" to drop it
      const fromWorkspace = field === 'campaign' && this.platformReady && !this.editing;
      this.result.warnings.forEach(m => {
        if (fromWorkspace && typeof m.details.known === 'string' && m.details.known !== '') {
          return;
        }
        if (m.field === field && !this.isMcrNotice(m)) {
          out.push({
            code: m.code,
            kind: 'warning',
            message: m.message,
            known: typeof m.details.known === 'string' ? m.details.known : ''
          });
        }
      });
      return out;
    },
    schedulePreview() {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => this.runPreview(), 300);
    },
    runPreview() {
      if (this.locked) {
        // nothing to build: the saved link stays as it is
        this.result = null;
        this.previewError = false;
        return;
      }
      if (this.form.targetUrl.trim() === '' && this.form.campaign.trim() === '') {
        this.result = null;
        this.previewError = false;
        return;
      }
      if (this.abort) {
        this.abort.abort();
      }
      const abort = new AbortController();
      this.abort = abort;
      preview(this.idSite, this.form, abort, this.editing).then(result => {
        if (this.abort === abort) {
          this.result = result;
          this.previewError = false;
        }
      }).catch(() => {
        // a newer preview replaced this one: nothing to say; otherwise the shown link is outdated
        if (this.abort === abort) {
          this.result = null;
          this.previewError = true;
        }
      });
    },
    copyLink() {
      if (!this.shownUrl) {
        return;
      }
      copyText(this.shownUrl).then(() => {
        this.copied = true;
        this.copyFailed = false;
        this.sentHint = this.canWrite && this.editing > 0 && this.editingStatus === 'draft' && !this.dirty;
        window.setTimeout(() => {
          this.copied = false;
        }, 2000);
      }).catch(() => {
        this.copyFailed = true;
      });
    },
    save() {
      if (!this.canSave) {
        return;
      }
      this.saving = true;
      this.saveError = '';
      let request;
      if (this.locked) {
        request = updateLinkDetails(this.idSite, this.editing, this.form).then(r => Object.assign(Object.assign({}, r), {}, {
          existed: false
        }));
      } else if (this.editing) {
        request = updateLink(this.idSite, this.editing, this.form).then(r => Object.assign(Object.assign({}, r), {}, {
          existed: false
        }));
      } else {
        request = addLink(this.idSite, this.form);
      }
      request.then(r => {
        const message = r.existed ? this.tr('LinkExisted') : this.tr('LinkSaved');
        this.suggest(r.link);
        if (!this.editing) {
          external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
            idLink: r.link.idLink
          }));
        }
        this.edit(r.link);
        if (this.result) {
          this.result = Object.assign(Object.assign({}, this.result), {}, {
            url: r.link.url,
            existingIdLink: r.link.idLink,
            campaignIdOnSave: false
          });
        }
        // after the form watcher has run for the reloaded values
        this.$nextTick(() => {
          this.saved = message;
        });
      }).catch(e => {
        this.saveError = e && e.message ? plainText(e.message) : this.tr('SaveFailed');
        this.checkWentLive();
      }).finally(() => {
        this.saving = false;
      });
    },
    /** a draft refused as it went live meanwhile: lock it, keep the typed values for a new link */
    checkWentLive() {
      if (!this.editing || this.locked) {
        return;
      }
      const idLink = this.editing;
      fetchLink(this.idSite, idLink).then(link => {
        if (link && link.idLink === this.editing && link.status !== 'draft') {
          this.editingStatus = link.status;
          this.editingUrl = link.url;
          this.wentLive = true;
          this.saveError = '';
        }
      }).catch(() => {
        // the save error stays as it is
      });
    },
    /** "Als live markieren" asks first: it cannot be undone (Peter, 2026-11-25) */
    askLive(at) {
      if (!this.editing || this.dirty) {
        return;
      }
      this.confirmLiveAt = at;
      this.$nextTick(() => {
        const button = this.$refs[at === 'header' ? 'confirmHeader' : 'confirmResult'];
        if (button) {
          button.focus();
        }
      });
    },
    markLive() {
      if (!this.editing || this.dirty) {
        return;
      }
      this.markingLive = true;
      markLinkLive(this.idSite, this.editing).then(link => {
        this.edit(link);
        this.result = null;
      }).catch(e => {
        this.saveError = e && e.message ? plainText(e.message) : this.tr('SaveFailed');
      }).finally(() => {
        this.markingLive = false;
      });
    },
    /** the live link's values as a new draft; a generated link ID goes, the new one gets its own */
    saveAsNew() {
      const form = Object.assign({}, this.form);
      if (this.editingGenerated) {
        form.campaignId = '';
      }
      const from = this.editingLabel;
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: CATEGORY,
        idLink: null,
        campaign: null
      }));
      this.editing = 0;
      this.editingLabel = '';
      this.editingStatus = '';
      this.editingUrl = '';
      this.editingPlatform = null;
      this.editingGenerated = false;
      this.wentLive = false;
      this.fromLive = from;
      this.saved = '';
      this.saveError = '';
      this.form = form;
      this.savedForm = '';
      this.result = null;
      this.runPreview();
      this.$nextTick(() => {
        const target = document.getElementById('fwcmp-campaign');
        if (target) {
          target.focus();
        }
      });
    },
    suggest(link) {
      ['campaign', 'source', 'medium'].forEach(field => {
        const value = link.values[field];
        const list = this.suggestions[field] || [];
        if (value && !list.includes(value)) {
          this.suggestions[field] = [value, ...list];
        }
      });
    },
    openList() {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: CATEGORY,
        subcategory: 'FeinwerkCampaignManager_Links',
        idLink: null
      }));
    },
    onToggleMore(event) {
      this.moreOpen = event.target.open;
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/LinkBuilder.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/LinkBuilder.vue



LinkBuildervue_type_script_lang_ts.render = render

/* harmony default export */ var LinkBuilder = (LinkBuildervue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/LinkList.vue?vue&type=template&id=52ea898f

const LinkListvue_type_template_id_52ea898f_hoisted_1 = {
  class: "fwcmp-list"
};
const LinkListvue_type_template_id_52ea898f_hoisted_2 = {
  key: 0,
  class: "fwcmp-toolbar"
};
const LinkListvue_type_template_id_52ea898f_hoisted_3 = {
  class: "fwcmp-col"
};
const LinkListvue_type_template_id_52ea898f_hoisted_4 = {
  class: "fwcmp-label",
  for: "fwcmp-search"
};
const LinkListvue_type_template_id_52ea898f_hoisted_5 = ["placeholder"];
const LinkListvue_type_template_id_52ea898f_hoisted_6 = {
  class: "fwcmp-col fwcmp-col--narrow"
};
const LinkListvue_type_template_id_52ea898f_hoisted_7 = {
  class: "fwcmp-label",
  for: "fwcmp-status"
};
const LinkListvue_type_template_id_52ea898f_hoisted_8 = {
  value: "active"
};
const LinkListvue_type_template_id_52ea898f_hoisted_9 = {
  value: "archived"
};
const LinkListvue_type_template_id_52ea898f_hoisted_10 = {
  value: "all"
};
const LinkListvue_type_template_id_52ea898f_hoisted_11 = {
  class: "fwcmp-toolbar__new"
};
const LinkListvue_type_template_id_52ea898f_hoisted_12 = {
  key: 2,
  class: "fwcmp-notice",
  role: "status"
};
const LinkListvue_type_template_id_52ea898f_hoisted_13 = {
  key: 4,
  class: "fwcmp-empty"
};
const LinkListvue_type_template_id_52ea898f_hoisted_14 = {
  key: 5,
  class: "fwcmp-tablewrap"
};
const LinkListvue_type_template_id_52ea898f_hoisted_15 = {
  class: "fwcmp-hint fwcmp-list__scope"
};
const LinkListvue_type_template_id_52ea898f_hoisted_16 = {
  class: "entityTable dataTable fwcmp-table"
};
const LinkListvue_type_template_id_52ea898f_hoisted_17 = {
  class: "fwcmp-table__num"
};
const LinkListvue_type_template_id_52ea898f_hoisted_18 = {
  class: "fwcmp-table__num"
};
const LinkListvue_type_template_id_52ea898f_hoisted_19 = {
  class: "fwcmp-table__actions"
};
const LinkListvue_type_template_id_52ea898f_hoisted_20 = {
  class: "fwcmp-table__main"
};
const LinkListvue_type_template_id_52ea898f_hoisted_21 = {
  class: "fwcmp-table__campaign"
};
const LinkListvue_type_template_id_52ea898f_hoisted_22 = {
  key: 0,
  class: "fwcmp-badge"
};
const LinkListvue_type_template_id_52ea898f_hoisted_23 = ["title"];
const LinkListvue_type_template_id_52ea898f_hoisted_24 = {
  key: 0,
  class: "fwcmp-sr-only"
};
const LinkListvue_type_template_id_52ea898f_hoisted_25 = ["title"];
const LinkListvue_type_template_id_52ea898f_hoisted_26 = ["title"];
const LinkListvue_type_template_id_52ea898f_hoisted_27 = ["title"];
const LinkListvue_type_template_id_52ea898f_hoisted_28 = ["title"];
const LinkListvue_type_template_id_52ea898f_hoisted_29 = {
  class: "fwcmp-table__sm"
};
const LinkListvue_type_template_id_52ea898f_hoisted_30 = {
  class: "fwcmp-table__target"
};
const LinkListvue_type_template_id_52ea898f_hoisted_31 = ["title"];
const LinkListvue_type_template_id_52ea898f_hoisted_32 = {
  class: "fwcmp-table__num"
};
const LinkListvue_type_template_id_52ea898f_hoisted_33 = {
  class: "fwcmp-table__numlabel"
};
const LinkListvue_type_template_id_52ea898f_hoisted_34 = {
  class: "fwcmp-table__count"
};
const LinkListvue_type_template_id_52ea898f_hoisted_35 = ["title"];
const LinkListvue_type_template_id_52ea898f_hoisted_36 = {
  class: "fwcmp-sr-only"
};
const LinkListvue_type_template_id_52ea898f_hoisted_37 = ["title"];
const LinkListvue_type_template_id_52ea898f_hoisted_38 = {
  class: "fwcmp-sr-only"
};
const LinkListvue_type_template_id_52ea898f_hoisted_39 = {
  key: 2,
  class: "fwcmp-table__loading",
  "aria-hidden": "true"
};
const LinkListvue_type_template_id_52ea898f_hoisted_40 = {
  class: "fwcmp-table__num"
};
const LinkListvue_type_template_id_52ea898f_hoisted_41 = {
  class: "fwcmp-table__numlabel"
};
const LinkListvue_type_template_id_52ea898f_hoisted_42 = {
  key: 0,
  class: "fwcmp-table__count"
};
const LinkListvue_type_template_id_52ea898f_hoisted_43 = {
  key: 1
};
const LinkListvue_type_template_id_52ea898f_hoisted_44 = {
  key: 2,
  class: "fwcmp-table__loading",
  "aria-hidden": "true"
};
const LinkListvue_type_template_id_52ea898f_hoisted_45 = {
  class: "fwcmp-table__actions"
};
const LinkListvue_type_template_id_52ea898f_hoisted_46 = ["title", "aria-label", "onClick"];
const LinkListvue_type_template_id_52ea898f_hoisted_47 = ["aria-label", "onClick"];
const LinkListvue_type_template_id_52ea898f_hoisted_48 = ["href", "title", "aria-label"];
const LinkListvue_type_template_id_52ea898f_hoisted_49 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-download",
  "aria-hidden": "true"
}, null, -1);
const LinkListvue_type_template_id_52ea898f_hoisted_50 = ["href", "title", "aria-label"];
const LinkListvue_type_template_id_52ea898f_hoisted_51 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const LinkListvue_type_template_id_52ea898f_hoisted_52 = [LinkListvue_type_template_id_52ea898f_hoisted_51];
const LinkListvue_type_template_id_52ea898f_hoisted_53 = ["disabled", "aria-label", "onClick"];
const LinkListvue_type_template_id_52ea898f_hoisted_54 = {
  key: 0,
  class: "fwcmp-sentrow"
};
const LinkListvue_type_template_id_52ea898f_hoisted_55 = {
  colspan: "7"
};
const LinkListvue_type_template_id_52ea898f_hoisted_56 = {
  class: "fwcmp-notice",
  role: "status"
};
const LinkListvue_type_template_id_52ea898f_hoisted_57 = ["disabled"];
const LinkListvue_type_template_id_52ea898f_hoisted_58 = {
  key: 0,
  class: "fwcmp-pager"
};
const LinkListvue_type_template_id_52ea898f_hoisted_59 = ["disabled"];
const LinkListvue_type_template_id_52ea898f_hoisted_60 = ["disabled"];
const LinkListvue_type_template_id_52ea898f_hoisted_61 = {
  class: "fwcmp-hint"
};
const LinkListvue_type_template_id_52ea898f_hoisted_62 = ["href"];
const LinkListvue_type_template_id_52ea898f_hoisted_63 = ["href"];
function LinkListvue_type_template_id_52ea898f_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_FeedbackBar = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("FeedbackBar");
  const _component_PromoLine = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PromoLine");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", LinkListvue_type_template_id_52ea898f_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [!_ctx.nothingYet ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", LinkListvue_type_template_id_52ea898f_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", LinkListvue_type_template_id_52ea898f_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", LinkListvue_type_template_id_52ea898f_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Search')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    id: "fwcmp-search",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.search = $event),
    class: "fwcmp-input",
    type: "search",
    autocomplete: "off",
    placeholder: _ctx.tr('SearchPlaceholder')
  }, null, 8, LinkListvue_type_template_id_52ea898f_hoisted_5), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.search]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", LinkListvue_type_template_id_52ea898f_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", LinkListvue_type_template_id_52ea898f_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Show')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("select", {
    id: "fwcmp-status",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.status = $event),
    class: "fwcmp-input browser-default"
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("option", LinkListvue_type_template_id_52ea898f_hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StatusActive')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("option", LinkListvue_type_template_id_52ea898f_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StatusArchived')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("option", LinkListvue_type_template_id_52ea898f_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StatusAll')), 1)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelSelect"], _ctx.status]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", LinkListvue_type_template_id_52ea898f_hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.openBuilder(0))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewLink')), 1)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.loading
  }, null, 8, ["loading"]), _ctx.actionError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 1,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.actionError), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.notice ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", LinkListvue_type_template_id_52ea898f_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.notice.text) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "undo",
    type: "button",
    class: "fwcmp-linkbutton",
    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.undoArchive && _ctx.undoArchive(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Undo')), 513)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 3,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[4] || (_cache[4] = $event => _ctx.load())
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Retry')), 1)]),
    _: 1
  })) : !_ctx.loading && _ctx.page && _ctx.page.total === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", LinkListvue_type_template_id_52ea898f_hoisted_13, [_ctx.search || _ctx.status !== 'active' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NoLinksFound')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.resetFilters && _ctx.resetFilters(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ResetFilters')), 1)], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NoLinksYet')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn",
    onClick: _cache[6] || (_cache[6] = $event => _ctx.openBuilder(0))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('OpenBuilder')), 1)], 64))])) : _ctx.page ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", LinkListvue_type_template_id_52ea898f_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", LinkListvue_type_template_id_52ea898f_hoisted_15, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.scopeText), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", LinkListvue_type_template_id_52ea898f_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('FieldCampaign')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SourceMedium')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('FieldTargetUrl')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", LinkListvue_type_template_id_52ea898f_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Visits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", LinkListvue_type_template_id_52ea898f_hoisted_18, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Conversions')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", LinkListvue_type_template_id_52ea898f_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Actions')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.page.links, link => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: link.idLink
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
        'is-archived': link.archived
      })
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", LinkListvue_type_template_id_52ea898f_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", LinkListvue_type_template_id_52ea898f_hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(link.values.campaign), 1), link.archived ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", LinkListvue_type_template_id_52ea898f_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StatusArchivedOne')), 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
      key: 1,
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-badge fwcmp-badge--${link.status}`),
      title: link.liveReason ? _ctx.tr(`LiveReason_${link.liveReason}`) : ''
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.statusText(link)), 1), link.liveReason ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", LinkListvue_type_template_id_52ea898f_hoisted_24, ", " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`LiveReason_${link.liveReason}`)), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 10, LinkListvue_type_template_id_52ea898f_hoisted_23)), _ctx.details(link) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
      key: 2,
      class: "fwcmp-table__note",
      title: _ctx.details(link)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.details(link)), 9, LinkListvue_type_template_id_52ea898f_hoisted_25)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), link.note ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
      key: 3,
      class: "fwcmp-table__note",
      title: link.note
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(link.note), 9, LinkListvue_type_template_id_52ea898f_hoisted_26)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), link.platform && link.platform.shortUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("code", {
      key: 4,
      class: "fwcmp-shortpill",
      title: link.platform.shortUrl
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.shortPill(link.platform.shortUrl)), 9, LinkListvue_type_template_id_52ea898f_hoisted_27)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: "fwcmp-table__by",
      title: _ctx.dateTime(link.updatedAt)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.date(link.updatedAt)) + " · " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(link.updatedBy), 9, LinkListvue_type_template_id_52ea898f_hoisted_28)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", LinkListvue_type_template_id_52ea898f_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.sourceMedium(link)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", LinkListvue_type_template_id_52ea898f_hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      title: link.url
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.shortTarget(link.targetUrl)), 9, LinkListvue_type_template_id_52ea898f_hoisted_31)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", LinkListvue_type_template_id_52ea898f_hoisted_32, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", LinkListvue_type_template_id_52ea898f_hoisted_33, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Visits')), 1), _ctx.resultOf(link) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 0
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", LinkListvue_type_template_id_52ea898f_hoisted_34, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(_ctx.resultOf(link).visits)), 1), _ctx.basisShort(link) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
      key: 0,
      class: "fwcmp-table__basis",
      title: _ctx.basisText(link)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.basisShort(link)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", LinkListvue_type_template_id_52ea898f_hoisted_36, ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.basisText(link)), 1)], 8, LinkListvue_type_template_id_52ea898f_hoisted_35)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64)) : _ctx.resultsFailed ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
      key: 1,
      title: _ctx.tr('ResultsUnavailable')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("-"), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", LinkListvue_type_template_id_52ea898f_hoisted_38, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ResultsUnavailable')), 1)], 8, LinkListvue_type_template_id_52ea898f_hoisted_37)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", LinkListvue_type_template_id_52ea898f_hoisted_39, "…"))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", LinkListvue_type_template_id_52ea898f_hoisted_40, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", LinkListvue_type_template_id_52ea898f_hoisted_41, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Conversions')), 1), _ctx.resultOf(link) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", LinkListvue_type_template_id_52ea898f_hoisted_42, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(_ctx.resultOf(link).conversions)), 1)) : _ctx.resultsFailed ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", LinkListvue_type_template_id_52ea898f_hoisted_43, "-")) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", LinkListvue_type_template_id_52ea898f_hoisted_44, "…"))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", LinkListvue_type_template_id_52ea898f_hoisted_45, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "fwcmp-action",
      title: _ctx.copyFailed === link.idLink ? _ctx.tr('CopyFailed') : _ctx.copyTitle(link),
      "aria-label": _ctx.tr('CopyLinkOf', link.values.campaign),
      onClick: $event => _ctx.copy(link)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.copyLabel(link)), 9, LinkListvue_type_template_id_52ea898f_hoisted_46), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "fwcmp-action",
      "aria-label": _ctx.tr('EditLinkOf', link.values.campaign),
      onClick: $event => _ctx.openBuilder(link.idLink)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Edit')), 9, LinkListvue_type_template_id_52ea898f_hoisted_47)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), link.platform && link.platform.qrUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 1,
      class: "fwcmp-action fwcmp-action--icon",
      href: `${link.platform.qrUrl}&format=svg`,
      download: "",
      title: _ctx.tr('PlatformLinkQrOf', link.values.campaign),
      "aria-label": _ctx.tr('PlatformLinkQrOf', link.values.campaign)
    }, [LinkListvue_type_template_id_52ea898f_hoisted_49, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" QR")], 8, LinkListvue_type_template_id_52ea898f_hoisted_48)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), link.platform && link.platform.appUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 2,
      class: "fwcmp-action fwcmp-action--icon",
      href: link.platform.appUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      title: _ctx.tr('PlatformOpenLink'),
      "aria-label": _ctx.tr('PlatformOpenLinkOf', link.values.campaign)
    }, LinkListvue_type_template_id_52ea898f_hoisted_52, 8, LinkListvue_type_template_id_52ea898f_hoisted_50)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 3,
      type: "button",
      class: "fwcmp-action",
      disabled: _ctx.busy === link.idLink,
      "aria-label": _ctx.archiveLabel(link),
      onClick: $event => _ctx.toggleArchived(link)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(link.archived ? _ctx.tr('Restore') : _ctx.tr('Archive')), 9, LinkListvue_type_template_id_52ea898f_hoisted_53)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 2), _ctx.sent && _ctx.sent.idLink === link.idLink ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", LinkListvue_type_template_id_52ea898f_hoisted_54, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", LinkListvue_type_template_id_52ea898f_hoisted_55, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", LinkListvue_type_template_id_52ea898f_hoisted_56, [!_ctx.sent.confirming ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 0
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SentHint')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("strong", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.sent.label), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "fwcmp-linkbutton",
      onClick: _cache[7] || (_cache[7] = (...args) => _ctx.confirmSent && _ctx.confirmSent(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLive')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "fwcmp-linkbutton",
      onClick: _cache[8] || (_cache[8] = $event => _ctx.sent = null)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Close')), 1)], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 1
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLiveConfirm')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      ref_for: true,
      ref: "sentYes",
      type: "button",
      class: "btn",
      disabled: _ctx.busy === _ctx.sent.idLink,
      onClick: _cache[9] || (_cache[9] = $event => _ctx.markLive(_ctx.sent.idLink))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MarkLiveYes')), 9, LinkListvue_type_template_id_52ea898f_hoisted_57), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat",
      onClick: _cache[10] || (_cache[10] = $event => _ctx.sent = null)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Cancel')), 1)], 64))])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64);
  }), 128))])])), [[_directive_content_table]]), _ctx.page.total > _ctx.limit ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", LinkListvue_type_template_id_52ea898f_hoisted_58, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Showing', `${_ctx.page.offset + 1}`, `${_ctx.lastShown}`, `${_ctx.page.total}`)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    disabled: _ctx.page.offset === 0,
    onClick: _cache[11] || (_cache[11] = $event => _ctx.goTo(_ctx.page.offset - _ctx.limit))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Previous')), 9, LinkListvue_type_template_id_52ea898f_hoisted_59), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    disabled: _ctx.lastShown >= _ctx.page.total,
    onClick: _cache[12] || (_cache[12] = $event => _ctx.goTo(_ctx.page.offset + _ctx.limit))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Next')), 9, LinkListvue_type_template_id_52ea898f_hoisted_60)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", LinkListvue_type_template_id_52ea898f_hoisted_61, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ResultsWhere')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: _ctx.overviewUrl
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignsOverview')), 9, LinkListvue_type_template_id_52ea898f_hoisted_62), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(", "), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: _ctx.campaignReportUrl
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MatomoCampaignReport')), 9, LinkListvue_type_template_id_52ea898f_hoisted_63)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.feedback ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_FeedbackBar, {
    key: 6,
    class: "fwcmp-page-feedback",
    "id-site": _ctx.idSite,
    topic: "saved_links",
    question: _ctx.tr('FeedbackQuestion_saved_links'),
    feedback: _ctx.feedback
  }, null, 8, ["id-site", "question", "feedback"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_PromoLine, {
    promo: _ctx.promo,
    "dismiss-label": _ctx.tr('PromoDismiss')
  }, null, 8, ["promo", "dismiss-label"])])]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/LinkList.vue?vue&type=template&id=52ea898f

// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/scope.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

function shortDate(day) {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(document.documentElement.lang || undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
/** "Numbers for <the period selected above>", with Matomo's own wording of the period */
function scopeText(tr) {
  const url = external_CoreHome_["MatomoUrl"].parsed.value;
  let period = `${url.date || ''}`;
  try {
    if (`${url.period}` === 'range' && /^\d{4}-\d{2}-\d{2},\d{4}-\d{2}-\d{2}$/.test(period)) {
      // Matomo's range string starts with "From": the sentence names the two days itself
      const [from, to] = period.split(',');
      period = tr('PeriodRange', shortDate(from), shortDate(to));
    } else {
      period = external_CoreHome_["Periods"].parse(`${url.period || 'day'}`, `${url.date || 'today'}`).getPrettyString();
    }
  } catch (e) {
    // the raw date then
  }
  return url.segment ? tr('NumbersForSegment', period) : tr('NumbersFor', period);
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/LinkList.vue?vue&type=script&lang=ts









const LinkListvue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
function lang() {
  return document.documentElement.lang || undefined;
}
const LIMIT = 50;
/** a newer load wins over a slower older one */
let loadCount = 0;
/* harmony default export */ var LinkListvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idSite: {
      type: Number,
      required: true
    },
    canWrite: {
      type: Boolean,
      default: false
    },
    /** the feedback row at the end of the page (Feinwerk kit); null in Widgetize embeds */
    feedback: {
      type: Object,
      default: null
    },
    /** the kit's tip line after the feedback row (Promo\PromoLine); null: none */
    promo: {
      type: Object,
      default: null
    }
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    Alert: external_CoreHome_["Alert"],
    FeedbackBar: FeedbackBar,
    PromoLine: PromoLine
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data() {
    const hash = external_CoreHome_["MatomoUrl"].hashParsed.value;
    const status = `${hash.status || ''}`;
    return {
      // kept in the hash, so a link (data quality page) or a reload opens the same list
      search: typeof hash.search === 'string' ? hash.search : '',
      status: ['active', 'archived', 'all'].includes(status) ? status : 'active',
      page: null,
      loading: false,
      error: '',
      busy: 0,
      copied: 0,
      copyFailed: 0,
      actionError: '',
      notice: null,
      sent: null,
      timer: null,
      results: null,
      resultsFailed: false
    };
  },
  created() {
    this.load();
  },
  beforeUnmount() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  },
  watch: {
    search() {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => {
        this.keepFilters();
        this.load(0);
      }, 300);
    },
    status() {
      this.notice = null;
      this.keepFilters();
      this.load(0);
    }
  },
  computed: {
    overviewUrl() {
      return this.pageUrl('FeinwerkCampaignManager_Campaigns', 'FeinwerkCampaignManager_Overview');
    },
    /** Matomo's campaign report (Marketing Campaigns Reporting uses the same page) */
    campaignReportUrl() {
      return this.pageUrl('Referrers_Referrers', 'Referrers_Campaigns');
    },
    limit() {
      return LIMIT;
    },
    scopeText() {
      return scopeText(this.tr);
    },
    /** no link at all yet (not a search without hits): the empty state alone, no toolbar */
    nothingYet() {
      return !!this.page && this.page.total === 0 && this.search === '' && this.status === 'active' && !this.loading;
    },
    lastShown() {
      return this.page ? this.page.offset + this.page.links.length : 0;
    }
  },
  methods: {
    resetFilters() {
      this.search = '';
      this.status = 'active';
    },
    /** a short link without its scheme, as a pill: "fw.ink/abc" */
    shortPill(url) {
      return url.replace(/^https?:\/\//i, '');
    },
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(LinkListvue_type_script_lang_ts_PREFIX + key, ...args);
    },
    load(offset) {
      this.loading = true;
      this.error = '';
      this.actionError = '';
      let from = this.page ? this.page.offset : 0;
      if (typeof offset === 'number') {
        from = offset;
      }
      loadCount += 1;
      const current = loadCount;
      this.results = null;
      this.resultsFailed = false;
      fetchLinks(this.idSite, this.status, this.search, LIMIT, Math.max(0, from)).then(page => {
        if (current !== loadCount) {
          return;
        }
        this.page = page;
        this.loadResults(current, page);
      }).catch(e => {
        if (current === loadCount) {
          this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
        }
      }).finally(() => {
        if (current === loadCount) {
          this.loading = false;
        }
      });
    },
    /** the numbers come after the rows and fail soft: a dash, no error box */
    loadResults(current, page) {
      if (page.links.length === 0) {
        return;
      }
      const url = external_CoreHome_["MatomoUrl"].parsed.value;
      fetchLinkResults(this.idSite, `${url.period || 'day'}`, `${url.date || 'today'}`, `${url.segment || ''}`, this.status, this.search, LIMIT, page.offset).then(rows => {
        if (current !== loadCount) {
          return;
        }
        const byLink = {};
        rows.forEach(r => {
          byLink[r.idLink] = r;
        });
        this.results = byLink;
      }).catch(() => {
        if (current === loadCount) {
          this.resultsFailed = true;
        }
      });
    },
    resultOf(link) {
      return this.results ? this.results[link.idLink] || null : null;
    },
    basisText(link) {
      const result = this.resultOf(link);
      if (!result) {
        return '';
      }
      if (result.basis === 'link_id') {
        return this.tr(result.sharedWith > 1 ? 'ResultsBasis_link_id_shared' : 'ResultsBasis_link_id');
      }
      const text = this.tr(`ResultsBasis_${result.basis}`);
      return result.sharedWith > 1 ? `${text} ${this.tr('ResultsSharedHelp')}` : text;
    },
    /** visible under the visits unless the link is counted by a link ID it has alone */
    basisShort(link) {
      const result = this.resultOf(link);
      if (!result || result.basis === 'link_id' && result.sharedWith <= 1) {
        return '';
      }
      const short = this.tr(`ResultsBasisShort_${result.basis}`);
      return result.sharedWith > 1 ? `${short}, ${this.tr('ResultsShared', this.number(result.sharedWith))}` : short;
    },
    number(n) {
      return new Intl.NumberFormat(lang()).format(n);
    },
    /** search and status in the hash; empty or default values leave it */
    keepFilters() {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        search: this.search.trim() === '' ? null : this.search,
        status: this.status === 'active' ? null : this.status
      }));
    },
    goTo(offset) {
      this.load(offset);
    },
    sourceMedium(link) {
      return [link.values.source, link.values.medium].filter(v => v !== '').join(' / ');
    },
    shortTarget(url) {
      return url.replace(/^https?:\/\//, '');
    },
    /** keyword and content: they tell links of the same campaign and channel apart */
    details(link) {
      const parts = [];
      if (link.values.keyword) {
        parts.push(`${this.tr('FieldKeyword')}: ${link.values.keyword}`);
      }
      if (link.values.content) {
        parts.push(`${this.tr('FieldContent')}: ${link.values.content}`);
      }
      return parts.join(', ');
    },
    date(iso) {
      const parsed = new Date(iso);
      if (Number.isNaN(parsed.getTime())) {
        return iso;
      }
      // the page's language (Matomo sets it on <html>), so dates read as elsewhere in Matomo
      return parsed.toLocaleDateString(document.documentElement.lang || undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    dateTime(iso) {
      const parsed = new Date(iso);
      return Number.isNaN(parsed.getTime()) ? iso : parsed.toLocaleString(document.documentElement.lang || undefined);
    },
    archiveLabel(link) {
      return this.tr(link.archived ? 'RestoreLinkOf' : 'ArchiveLinkOf', link.values.campaign);
    },
    copyLabel(link) {
      if (this.copied === link.idLink) {
        return this.tr('Copied');
      }
      return this.copyFailed === link.idLink ? this.tr('CopyFailedShort') : this.tr('Copy');
    },
    /** a link made in Feinwerk Campaigns is shared by its short link (Peter, 2026-11-26) */
    copyTarget(link) {
      return link.platform && link.platform.shortUrl ? link.platform.shortUrl : link.url;
    },
    copyTitle(link) {
      return link.platform && link.platform.shortUrl ? this.tr('PlatformLinkCopyShort') : this.tr('CopyLink');
    },
    copy(link) {
      copyText(this.copyTarget(link)).then(() => {
        this.copied = link.idLink;
        this.copyFailed = 0;
        this.sent = this.canWrite && !link.archived && link.status === 'draft' ? {
          idLink: link.idLink,
          label: link.values.campaign,
          confirming: false
        } : null;
        window.setTimeout(() => {
          if (this.copied === link.idLink) {
            this.copied = 0;
          }
        }, 2000);
      }).catch(() => {
        // said at the row: the button reads "Not copied", its title the way out
        this.copyFailed = link.idLink;
      });
    },
    confirmSent() {
      if (!this.sent) {
        return;
      }
      this.sent.confirming = true;
      this.$nextTick(() => {
        const button = this.$refs.sentYes;
        if (button) {
          button.focus();
        }
      });
    },
    markLive(idLink) {
      this.busy = idLink;
      this.actionError = '';
      markLinkLive(this.idSite, idLink).then(() => {
        this.sent = null;
        this.load();
      }).catch(e => {
        this.actionError = e && e.message ? plainText(e.message) : this.tr('SaveFailed');
      }).finally(() => {
        this.busy = 0;
      });
    },
    /** draft, "live since 12.11." or ended */
    statusText(link) {
      if (link.status === 'live' && link.liveSince) {
        return this.tr('LiveSinceBadge', shortDay(link.liveSince));
      }
      return this.tr(`LinkStatus_${link.status}`);
    },
    toggleArchived(link) {
      this.setArchived(link.idLink, link.values.campaign, !link.archived);
    },
    undoArchive() {
      if (this.notice) {
        const {
          idLink,
          archived
        } = this.notice;
        this.setArchived(idLink, '', !archived, true);
      }
    },
    /** archives or restores, then says so with an Undo that takes the focus (the row is gone) */
    setArchived(idLink, label, archived, isUndo = false) {
      this.busy = idLink;
      this.actionError = '';
      this.notice = null;
      archiveLink(this.idSite, idLink, archived).then(() => {
        if (!isUndo) {
          this.notice = {
            text: this.tr(archived ? 'LinkArchived' : 'LinkRestored', label),
            idLink,
            archived
          };
        }
        this.load();
        this.$nextTick(() => {
          const undo = this.$refs.undo;
          if (undo) {
            undo.focus();
          }
        });
      }).catch(e => {
        this.actionError = e && e.message ? plainText(e.message) : this.tr('SaveFailed');
      }).finally(() => {
        this.busy = 0;
      });
    },
    /** a reporting page of this website and period (the overview, Matomo's campaign report) */
    pageUrl(category, subcategory) {
      const hash = Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category,
        subcategory,
        idLink: null,
        campaign: null
      });
      return `#?${external_CoreHome_["MatomoUrl"].stringify(hash)}`;
    },
    openBuilder(idLink) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: 'FeinwerkCampaignManager_Campaigns',
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink: idLink || null
      }));
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/LinkList.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/LinkList.vue



LinkListvue_type_script_lang_ts.render = LinkListvue_type_template_id_52ea898f_render

/* harmony default export */ var LinkList = (LinkListvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/CampaignOverview.vue?vue&type=template&id=6c27a054

const CampaignOverviewvue_type_template_id_6c27a054_hoisted_1 = {
  class: "fwcmp-overview"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_2 = {
  class: "fwcmp-overview__bar"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_3 = {
  class: "fwcmp-hint fwcmp-overview__scope"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_4 = {
  key: 0,
  class: "fwcmp-overview__actions"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_5 = ["aria-label"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_6 = {
  key: 0,
  class: "fwcmp-step__title"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_7 = {
  class: "fwcmp-checklist__items"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_8 = {
  class: "fwcmp-checklist__mark",
  "aria-hidden": "true"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_9 = {
  class: "fwcmp-sr-only"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_10 = {
  class: "fwcmp-checklist__text"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_11 = {
  key: 0,
  class: "fwcmp-badge fwcmp-badge--live"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_12 = ["href"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_13 = ["href"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_14 = {
  key: 3,
  class: "fwcmp-notice",
  role: "status"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_15 = {
  key: 4,
  class: "fwcmp-empty"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_16 = {
  key: 0,
  class: "fwcmp-empty__actions"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_17 = {
  key: 0,
  class: "fwcmp-step__title"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_18 = {
  class: "fwcmp-step__title"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_19 = ["aria-expanded"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_20 = {
  class: "fwcmp-disclosure__mark",
  "aria-hidden": "true"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_21 = {
  class: "fwcmp-hint"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_22 = ["id"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_23 = {
  class: "fwcmp-card__head"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_24 = {
  class: "fwcmp-card__name"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_25 = ["href"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_26 = {
  key: 0,
  class: "fwcmp-card__value"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_27 = ["href", "title", "aria-label"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_28 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_29 = ["title"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_30 = {
  class: "fwcmp-card__meta"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_31 = {
  class: "fwcmp-card__numbers"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_32 = {
  key: 0,
  class: "fwcmp-goal"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_33 = {
  class: "fwcmp-goal__label"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_34 = ["aria-valuenow", "aria-label"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_35 = {
  key: 0,
  class: "fwcmp-hint"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_36 = ["title"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_37 = {
  class: "fwcmp-card__actions"
};
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_38 = ["aria-label", "onClick"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_39 = ["aria-label", "onClick"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_40 = ["href", "aria-label"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_41 = ["href", "aria-label"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_42 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_43 = ["disabled", "aria-label", "onClick"];
const CampaignOverviewvue_type_template_id_6c27a054_hoisted_44 = {
  class: "fwcmp-overview__archived"
};
function CampaignOverviewvue_type_template_id_6c27a054_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_CampaignDetailsPanel = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("CampaignDetailsPanel");
  const _component_FeedbackBar = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("FeedbackBar");
  const _component_PromoLine = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PromoLine");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.scopeText), 1), _ctx.rows.length > 0 || _ctx.showArchived ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_4, [_ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 0,
    type: "button",
    class: "btn",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.openPanel(null))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewCampaign')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 1,
    type: "button",
    class: "btn-flat",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.openBuilder(''))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewLink')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.checklistItems.length > 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("section", {
    key: 0,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["fwcmp-checklist", {
      'fwcmp-checklist--compact': _ctx.checklist && _ctx.checklist.complete
    }]),
    "aria-label": _ctx.tr('ChecklistTitle')
  }, [_ctx.checklist && !_ctx.checklist.complete ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("h3", CampaignOverviewvue_type_template_id_6c27a054_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ChecklistTitle')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", CampaignOverviewvue_type_template_id_6c27a054_hoisted_7, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.checklistItems, item => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: item.key,
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
        'is-done': item.done
      })
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignOverviewvue_type_template_id_6c27a054_hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.done ? '✓' : '○'), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignOverviewvue_type_template_id_6c27a054_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.done ? _ctx.tr('Done') : _ctx.tr('Open')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignOverviewvue_type_template_id_6c27a054_hoisted_10, [!item.required && !item.done ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", CampaignOverviewvue_type_template_id_6c27a054_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Recommended')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.done ? _ctx.tr(`Checklist_${item.key}`) : _ctx.tr(`ChecklistTodo_${item.key}`)) + " ", 1), !item.done && item.key === 'goals' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 1,
      href: _ctx.goalsUrl
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ChecklistGoalsAction')), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_12)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !item.done && item.key === 'marketing_campaigns_reporting' && _ctx.marketplaceUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 2,
      href: _ctx.marketplaceUrl
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ChecklistMcrAction')), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_13)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !item.done && item.key === 'marketing_campaigns_reporting' && !_ctx.marketplaceUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 3
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ChecklistMcrAskSuperUser')), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !item.done && item.key === 'saved_link' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 4,
      type: "button",
      class: "fwcmp-linkbutton",
      onClick: _cache[2] || (_cache[2] = $event => _ctx.openBuilder(''))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('OpenBuilder')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !item.done && item.key === 'campaign_details' && _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 5,
      type: "button",
      class: "fwcmp-linkbutton",
      onClick: _cache[3] || (_cache[3] = $event => _ctx.openPanel(null))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewCampaign')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 2);
  }), 128))])], 10, CampaignOverviewvue_type_template_id_6c27a054_hoisted_5)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.loading
  }, null, 8, ["loading"]), _ctx.error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 1,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[4] || (_cache[4] = (...args) => _ctx.load && _ctx.load(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Retry')), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.actionError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 2,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.actionError), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.notice ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.notice.text) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "undo",
    type: "button",
    class: "fwcmp-linkbutton",
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.undoArchive && _ctx.undoArchive(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Undo')), 513)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.loading && !_ctx.error && _ctx.rows.length === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.emptyText), 1), !_ctx.showArchived ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn",
    onClick: _cache[6] || (_cache[6] = $event => _ctx.openBuilder(''))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('OpenBuilder')), 1), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 0,
    type: "button",
    class: "btn btn-outline",
    onClick: _cache[7] || (_cache[7] = $event => _ctx.openPanel(null))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewCampaign')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.groups, group => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("section", {
      key: group.phase,
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["fwcmp-phase", {
        'fwcmp-phase--reportonly': group.phase === 'report'
      }])
    }, [group.phase !== 'report' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("h3", CampaignOverviewvue_type_template_id_6c27a054_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`Phase_${group.phase}`)) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(group.rows.length) + ") ", 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 1
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", CampaignOverviewvue_type_template_id_6c27a054_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "fwcmp-disclosure",
      "aria-expanded": _ctx.reportOnlyOpen ? 'true' : 'false',
      "aria-controls": "fwcmp-reportonly-cards",
      onClick: _cache[8] || (_cache[8] = $event => _ctx.reportOnlyToggled = !_ctx.reportOnlyOpen)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignOverviewvue_type_template_id_6c27a054_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.reportOnlyOpen ? '▾' : '▸'), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('OnlyCountedGroup')) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(group.rows.length) + ") ", 1)], 8, CampaignOverviewvue_type_template_id_6c27a054_hoisted_19)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('OnlyCountedHelp')), 1)], 64)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", {
      id: group.phase === 'report' ? 'fwcmp-reportonly-cards' : undefined,
      class: "fwcmp-cards"
    }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(group.rows, row => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        key: row.campaign,
        class: "fwcmp-card"
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_23, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", CampaignOverviewvue_type_template_id_6c27a054_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: _ctx.campaignPageUrl(row.campaign)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.name || row.campaign), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_25)]), row.name ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("code", CampaignOverviewvue_type_template_id_6c27a054_hoisted_26, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.campaign), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), row.platform && row.platform.appUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
        key: 1,
        class: "fwcmp-applink",
        href: row.platform.appUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        title: _ctx.tr('PlatformOpenCampaignTooltip'),
        "aria-label": _ctx.tr('PlatformOpenCampaignOf', _ctx.label(row))
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("Feinwerk Campaigns"), CampaignOverviewvue_type_template_id_6c27a054_hoisted_28], 8, CampaignOverviewvue_type_template_id_6c27a054_hoisted_27)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), row.platform ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        key: 2,
        class: "fwcmp-badge",
        title: _ctx.tr('PlatformStatusInWorkspace')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(_ctx.statusKey(row))), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_29)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.cardMeta(row)), 1), row.activeLinks > 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
        key: 0
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(", " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.linksText(row)), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dl", CampaignOverviewvue_type_template_id_6c27a054_hoisted_31, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Visits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(row.period.visits)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Conversions')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(row.period.conversions)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Revenue')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.money(row.period.revenue)), 1)])]), row.goal ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_32, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_33, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.goalText(row)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        class: "fwcmp-goal__bar",
        role: "progressbar",
        "aria-valuenow": Math.min(100, _ctx.percent(row)),
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-label": _ctx.goalText(row)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "fwcmp-goal__fill",
        style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
          width: `${Math.min(100, _ctx.percent(row))}%`
        })
      }, null, 4)], 8, CampaignOverviewvue_type_template_id_6c27a054_hoisted_34), !row.goal.complete ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_35, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('GoalPartial', _ctx.day(row.goal.from))), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(row.warnings, w => {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: w,
          class: "fwcmp-msg fwcmp-msg--warning"
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`Warning_${w}`)), 1);
      }), 128)), row.notes ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 1,
        class: "fwcmp-card__notes",
        title: row.notes
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.notes), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_36)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignOverviewvue_type_template_id_6c27a054_hoisted_37, [_ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
        key: 0,
        type: "button",
        class: "fwcmp-action",
        "aria-label": _ctx.tr(row.hasDetails ? 'EditDetailsOf' : 'AddDetailsOf', _ctx.label(row)),
        onClick: $event => _ctx.openPanel(row)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.hasDetails ? _ctx.tr('EditDetails') : _ctx.tr('AddDetails')), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_38)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
        key: 1,
        type: "button",
        class: "fwcmp-action",
        "aria-label": _ctx.tr('NewLinkFor', _ctx.label(row)),
        onClick: $event => _ctx.openBuilder(row.campaign)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewLink')), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_39)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "fwcmp-action",
        href: _ctx.analyseUrl(row),
        "aria-label": _ctx.tr('AnalyseInMatomoOf', _ctx.label(row))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('AnalyseInMatomo')), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_40), _ctx.startUrl(row) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
        key: 2,
        class: "fwcmp-action",
        href: _ctx.startUrl(row),
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": _ctx.tr('PlatformStartCampaignOf', _ctx.label(row))
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformStartCampaign')), 1), CampaignOverviewvue_type_template_id_6c27a054_hoisted_42], 8, CampaignOverviewvue_type_template_id_6c27a054_hoisted_41)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.canWrite && row.hasDetails ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
        key: 3,
        type: "button",
        class: "fwcmp-action",
        disabled: _ctx.busy === row.campaign,
        "aria-label": _ctx.archiveLabel(row),
        onClick: $event => _ctx.toggleArchived(row)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.phase === 'archived' ? _ctx.tr('Restore') : _ctx.tr('Archive')), 9, CampaignOverviewvue_type_template_id_6c27a054_hoisted_43)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]);
    }), 128))], 8, CampaignOverviewvue_type_template_id_6c27a054_hoisted_22), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], group.phase !== 'report' || _ctx.reportOnlyOpen]])], 2);
  }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", CampaignOverviewvue_type_template_id_6c27a054_hoisted_44, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "fwcmp-linkbutton",
    onClick: _cache[9] || (_cache[9] = (...args) => _ctx.toggleShowArchived && _ctx.toggleShowArchived(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.showArchived ? _ctx.tr('ShowActiveCampaigns') : _ctx.tr('ShowArchivedCampaigns')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_CampaignDetailsPanel, {
    open: _ctx.panelOpen,
    "id-site": _ctx.idSite,
    row: _ctx.panelRow,
    rows: _ctx.rows,
    currency: _ctx.currency,
    "scope-class": "fwcmp-overview",
    "onUpdate:open": _cache[10] || (_cache[10] = $event => _ctx.panelOpen = $event),
    onChanged: _ctx.load
  }, null, 8, ["open", "id-site", "row", "rows", "currency", "onChanged"]), _ctx.feedback ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_FeedbackBar, {
    key: 5,
    class: "fwcmp-page-feedback",
    "id-site": _ctx.idSite,
    topic: "overview",
    question: _ctx.tr('FeedbackQuestion_overview'),
    feedback: _ctx.feedback
  }, null, 8, ["id-site", "question", "feedback"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_PromoLine, {
    promo: _ctx.promo,
    "dismiss-label": _ctx.tr('PromoDismiss')
  }, null, 8, ["promo", "dismiss-label"])]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignOverview.vue?vue&type=template&id=6c27a054

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/CampaignDetailsPanel.vue?vue&type=template&id=17bd254e

const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_1 = {
  key: 0,
  class: "fwcmp-hint",
  role: "status"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_2 = {
  key: 1,
  class: "fwcmp-notice fwcmp-details__workspace"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_3 = {
  key: 2,
  class: "fwcmp-hint fwcmp-details__workspace",
  role: "status"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_4 = {
  key: 3,
  class: "fwcmp-hint fwcmp-details__localonly"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_5 = ["href", "title"];
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_6 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_7 = {
  class: "fwcmp-label",
  for: "fwcmp-d-name"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_8 = ["aria-required"];
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_9 = {
  key: 4,
  class: "fwcmp-details__value"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_10 = {
  class: "fwcmp-label"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_11 = {
  class: "fwcmp-card__value"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_12 = {
  key: 0,
  class: "fwcmp-hint fwcmp-details__fromname"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_13 = {
  class: "fwcmp-label",
  for: "fwcmp-d-campaign"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_14 = ["readonly", "aria-required", "aria-invalid"];
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_15 = {
  id: "fwcmp-d-campaign-help",
  class: "fwcmp-hint"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_16 = {
  key: 0,
  class: "fwcmp-msg fwcmp-msg--error"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_17 = {
  key: 1,
  class: "fwcmp-msg fwcmp-msg--error",
  role: "alert"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_18 = {
  class: "fwcmp-row"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_19 = {
  class: "fwcmp-col"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_20 = {
  class: "fwcmp-label",
  for: "fwcmp-d-start"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_21 = {
  class: "fwcmp-col"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_22 = {
  class: "fwcmp-label",
  for: "fwcmp-d-end"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_23 = {
  key: 6,
  class: "fwcmp-msg fwcmp-msg--error"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_24 = {
  class: "fwcmp-row"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_25 = {
  class: "fwcmp-col"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_26 = {
  class: "fwcmp-label",
  for: "fwcmp-d-metric"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_27 = ["value"];
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_28 = {
  key: 0,
  class: "fwcmp-col"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_29 = {
  class: "fwcmp-label",
  for: "fwcmp-d-target"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_30 = {
  class: "fwcmp-label",
  for: "fwcmp-d-goal"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_31 = {
  value: ""
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_32 = ["value"];
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_33 = {
  class: "fwcmp-label",
  for: "fwcmp-d-notes"
};
const CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_34 = ["disabled"];
function CampaignDetailsPanelvue_type_template_id_17bd254e_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_SidePanel = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("SidePanel");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_SidePanel, {
    open: _ctx.open,
    title: _ctx.panelTitle,
    "close-label": _ctx.tr('Close'),
    size: "narrow",
    "scope-class": _ctx.scopeClass,
    "onUpdate:open": _cache[13] || (_cache[13] = $event => _ctx.$emit('update:open', $event))
  }, {
    footer: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat",
      onClick: _cache[11] || (_cache[11] = $event => _ctx.$emit('update:open', false))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Cancel')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn",
      disabled: _ctx.saving || _ctx.checkingWorkspace || _ctx.datesWrong || !!_ctx.existingDetails,
      onClick: _cache[12] || (_cache[12] = (...args) => _ctx.saveDetails && _ctx.saveDetails(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.toWorkspace ? _ctx.tr('PlatformLinkCreate') : _ctx.tr('SaveDetails')), 9, CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_34)]),
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
      class: "fwcmp-details",
      onSubmit: _cache[10] || (_cache[10] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])((...args) => _ctx.saveDetails && _ctx.saveDetails(...args), ["prevent"]))
    }, [_ctx.checkingWorkspace ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_1, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignCheckingWorkspace')), 1)) : _ctx.toWorkspace ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignAlsoInWorkspace', _ctx.workspace.workspace, _ctx.workspace.website)), 1)) : _ctx.workspaceError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.workspaceError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.rowAppUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignDetailsLocalOnly')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "fwcmp-applink",
      href: _ctx.rowAppUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      title: _ctx.tr('PlatformOpenCampaignTooltip')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("Feinwerk Campaigns"), CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_6], 8, CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_5)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.toWorkspace ? _ctx.tr('CampaignNameLabel') : _ctx.tr('DisplayName')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      id: "fwcmp-d-name",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.form.name = $event),
      class: "fwcmp-input",
      type: "text",
      maxlength: "255",
      autocomplete: "off",
      "aria-required": _ctx.toWorkspace ? 'true' : 'false'
    }, null, 8, CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_8), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.name]]), _ctx.fixedValue ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignValue')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("code", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.fixedValue), 1)])) : !_ctx.editingCampaign ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 5
    }, [_ctx.toWorkspace && !_ctx.ownValue ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignValueFromName')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "fwcmp-linkbutton",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.setOwnValue && _ctx.setOwnValue(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignValueSetOwn')), 1)])) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 1
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.toWorkspace ? _ctx.tr('CampaignValueOptional') : _ctx.tr('FieldCampaign')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      id: "fwcmp-d-campaign",
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => _ctx.form.campaign = $event),
      class: "fwcmp-input",
      type: "text",
      autocomplete: "off",
      readonly: !!_ctx.createdParameter,
      "aria-required": _ctx.toWorkspace ? 'false' : 'true',
      "aria-invalid": _ctx.campaignMissing || _ctx.valueError ? 'true' : 'false',
      "aria-describedby": "fwcmp-d-campaign-help"
    }, null, 8, CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_14), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.campaign]])], 64)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_15, [_ctx.campaignMissing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(_ctx.toWorkspace ? 'CampaignNameOrValueMissing' : 'CampaignValueMissing')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.valueError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.valueError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.toWorkspace && _ctx.ownValue && !_ctx.valueError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 2
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignValueWorkspaceHelp')), 1)], 64)) : !_ctx.toWorkspace ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 3
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignValueHelp')), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignStart')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      id: "fwcmp-d-start",
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => _ctx.form.startDate = $event),
      class: "fwcmp-input",
      type: "date"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.startDate]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignEnd')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      id: "fwcmp-d-end",
      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => _ctx.form.endDate = $event),
      class: "fwcmp-input",
      type: "date"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.endDate]])])]), _ctx.datesWrong ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_23, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignEndBeforeStart')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_24, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_26, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('GoalMetric')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("select", {
      id: "fwcmp-d-metric",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => _ctx.form.goalMetric = $event),
      class: "fwcmp-input fwcmp-select browser-default"
    }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.metrics, m => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("option", {
        key: m,
        value: m
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`GoalMetric_${m}`)), 9, CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_27);
    }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelSelect"], _ctx.form.goalMetric]])]), _ctx.form.goalMetric !== 'none' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.targetLabel), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
      id: "fwcmp-d-target",
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => _ctx.form.goalTarget = $event),
      class: "fwcmp-input",
      type: "number",
      min: "0",
      step: "any",
      inputmode: "decimal"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.goalTarget]])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.form.goalMetric === 'conversions' || _ctx.form.goalMetric === 'revenue' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 7
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('MatomoGoal')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("select", {
      id: "fwcmp-d-goal",
      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => _ctx.form.idGoal = $event),
      class: "fwcmp-input fwcmp-select browser-default"
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("option", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_31, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('AllGoals')), 1), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.goals, g => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("option", {
        key: g.idgoal,
        value: `${g.idgoal}`
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(g.name), 9, CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_32);
    }), 128))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelSelect"], _ctx.form.idGoal]])], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("label", CampaignDetailsPanelvue_type_template_id_17bd254e_hoisted_33, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Note')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("textarea", {
      id: "fwcmp-d-notes",
      "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => _ctx.form.notes = $event),
      class: "fwcmp-input fwcmp-note browser-default",
      rows: "3",
      maxlength: "2000"
    }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.form.notes]]), _ctx.existingDetails ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
      key: 8,
      severity: "warning"
    }, {
      default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignHasDetails', _ctx.existingDetails.campaign)) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
        type: "button",
        class: "btn-flat fwcmp-retry",
        onClick: _cache[9] || (_cache[9] = (...args) => _ctx.editExisting && _ctx.editExisting(...args))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.existingDetails.archived ? _ctx.tr('RestoreAndEdit') : _ctx.tr('EditExistingDetails')), 1)]),
      _: 1
    })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.panelError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
      key: 9,
      severity: "danger"
    }, {
      default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.panelError), 1)]),
      _: 1
    })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 32)]),
    _: 1
  }, 8, ["open", "title", "close-label", "scope-class"]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignDetailsPanel.vue?vue&type=template&id=17bd254e

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/CampaignDetailsPanel.vue?vue&type=script&lang=ts






const CampaignDetailsPanelvue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
const METRICS = ['none', 'visits', 'conversions', 'revenue'];
function emptyDetails() {
  return {
    campaign: '',
    name: '',
    startDate: '',
    endDate: '',
    goalMetric: 'none',
    goalTarget: '',
    idGoal: '',
    notes: ''
  };
}
/* harmony default export */ var CampaignDetailsPanelvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idSite: {
      type: Number,
      required: true
    },
    open: {
      type: Boolean,
      required: true
    },
    /** the campaign to edit or to start from (its value prefilled); null for an empty new one */
    row: {
      type: Object,
      default: null
    },
    /** the campaigns on the page, to point out a value that has details already */
    rows: {
      type: Array,
      default: () => []
    },
    /** the website's currency code (ISO 4217), for a revenue goal */
    currency: {
      type: String,
      default: ''
    },
    /** the page's class, so its styles reach the panel (it is rendered at the end of <body>) */
    scopeClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update:open', 'changed'],
  components: {
    Alert: external_CoreHome_["Alert"],
    SidePanel: SidePanel
  },
  data() {
    return {
      goals: [],
      editingCampaign: '',
      editingName: '',
      form: emptyDetails(),
      panelError: '',
      saving: false,
      campaignMissing: false,
      existingSaved: null,
      workspace: null,
      checkingWorkspace: false,
      checkSeq: 0,
      workspaceError: '',
      createdParameter: '',
      valueError: '',
      ownValue: false,
      fixedValue: '',
      rowAppUrl: ''
    };
  },
  watch: {
    open(isOpen) {
      if (isOpen) {
        this.start(this.row);
      }
    },
    'form.campaign': function onCampaignTyped() {
      this.valueError = '';
      const typed = this.form.campaign.trim().toLowerCase();
      if (this.existingSaved && typed !== this.existingSaved.campaign) {
        this.existingSaved = null;
      }
    }
  },
  mounted() {
    if (this.open) {
      this.start(this.row);
    }
  },
  computed: {
    /** a new campaign that is also created in the workspace */
    toWorkspace() {
      return !!this.workspace && !this.editingCampaign && !this.fixedValue;
    },
    metrics() {
      return METRICS;
    },
    datesWrong() {
      return this.form.startDate !== '' && this.form.endDate !== '' && this.form.endDate < this.form.startDate;
    },
    panelTitle() {
      if (this.editingCampaign) {
        return this.tr('DetailsOf', this.editingName || this.editingCampaign);
      }
      return this.fixedValue ? this.tr('DetailsOf', this.form.name || this.fixedValue) : this.tr('NewCampaign');
    },
    /** saved details for the value typed into "New campaign", from the page or from the save */
    existingDetails() {
      if (this.editingCampaign) {
        return null;
      }
      if (this.existingSaved) {
        return {
          campaign: this.existingSaved.campaign,
          archived: this.existingSaved.archived
        };
      }
      const key = this.form.campaign.trim().replace(/\s+/g, ' ').toLowerCase();
      const row = key === '' ? undefined : this.rows.find(r => r.campaign === key && r.hasDetails);
      return row ? {
        campaign: row.campaign,
        archived: row.phase === 'archived'
      } : null;
    },
    targetLabel() {
      return this.form.goalMetric === 'revenue' && this.currency ? this.tr('GoalTargetIn', this.currency) : this.tr('GoalTarget');
    }
  },
  methods: {
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(CampaignDetailsPanelvue_type_script_lang_ts_PREFIX + key, ...args);
    },
    start(row) {
      this.panelError = '';
      this.campaignMissing = false;
      this.existingSaved = null;
      this.workspace = null;
      this.workspaceError = '';
      this.createdParameter = '';
      this.valueError = '';
      this.ownValue = false;
      this.checkSeq += 1;
      this.checkingWorkspace = false;
      this.editingCampaign = row && row.hasDetails ? row.campaign : '';
      this.fixedValue = row && !row.hasDetails ? row.campaign : '';
      this.rowAppUrl = row && row.platform && row.platform.appUrl ? row.platform.appUrl : '';
      this.editingName = row && row.hasDetails ? row.name || '' : '';
      this.form = emptyDetails();
      if (row) {
        this.form.campaign = row.campaign;
        this.form.name = row.name || '';
        this.form.startDate = row.startDate || '';
        this.form.endDate = row.endDate || '';
        this.form.notes = row.notes || '';
        if (row.goal) {
          this.form.goalMetric = row.goal.metric;
          this.form.goalTarget = `${row.goal.target}`;
          this.form.idGoal = row.goal.idGoal === null ? '' : `${row.goal.idGoal}`;
        }
      }
      if (this.goals.length === 0) {
        fetchGoals(this.idSite).then(goals => {
          this.goals = goals;
        }).catch(() => undefined);
      }
      // only "New campaign" goes to the workspace (Peter, 2026-11-26); "Add details" of a value
      // Matomo counts or links already stays in this Matomo (UI review F1)
      if (row === null) {
        this.checkWorkspace();
      }
    },
    /** connected: open the value field (the workspace would form the value from the name) */
    setOwnValue() {
      this.ownValue = true;
      this.$nextTick(() => {
        const field = document.getElementById('fwcmp-d-campaign');
        if (field) {
          field.focus();
        }
      });
    },
    checkWorkspace() {
      const seq = this.checkSeq;
      this.checkingWorkspace = true;
      fetchConnectionStatus().then(status => {
        if (status.mode !== 'connected' || !status.connected) {
          return undefined;
        }
        const workspace = status.workspace ? status.workspace.name : '';
        return fetchPlatformConvention(this.idSite).then(answer => {
          if (seq === this.checkSeq && !this.editingCampaign) {
            this.workspace = {
              workspace,
              website: answer.website.name
            };
            // a value typed while the check ran stays in sight
            this.ownValue = this.form.campaign.trim() !== '';
          }
        }).catch(e => {
          // a website the workspace does not have: details only, as without a connection
          const {
            reason
          } = splitPlatformError(e && e.message ? plainText(e.message) : '');
          if (seq === this.checkSeq && reason !== 'no_website') {
            this.workspaceError = this.tr('CampaignWorkspaceUnavailable');
          }
        });
      }).catch(() => undefined).finally(() => {
        if (seq === this.checkSeq) {
          this.checkingWorkspace = false;
        }
      });
    },
    saveDetails() {
      if (this.saving || this.checkingWorkspace || this.datesWrong) {
        return;
      }
      // with the workspace the value may stay empty: Feinwerk Campaigns forms it from the name
      const nameOnly = this.toWorkspace && this.form.name.trim() !== '';
      if (!this.editingCampaign && !this.fixedValue && this.form.campaign.trim() === '' && !nameOnly) {
        this.campaignMissing = true;
        const field = document.getElementById(this.toWorkspace ? 'fwcmp-d-name' : 'fwcmp-d-campaign');
        if (field) {
          field.focus();
        }
        return;
      }
      this.campaignMissing = false;
      this.saving = true;
      this.panelError = '';
      this.valueError = '';
      let request;
      if (this.editingCampaign) {
        request = updateCampaign(this.idSite, this.form).then(campaign => ({
          campaign,
          existed: false
        }));
      } else if (this.toWorkspace) {
        // first in the workspace, then the details here under the value the workspace gave it;
        // after a half-finished save only the details are tried again (UI review W1)
        const value = this.form.campaign.trim();
        const created = this.createdParameter ? Promise.resolve(this.createdParameter) : addPlatformCampaign(this.idSite, this.form.name.trim() || value, value, this.form.startDate, this.form.endDate).then(answer => {
          this.createdParameter = answer.campaign.parameter;
          this.form.campaign = answer.campaign.parameter;
          return answer.campaign.parameter;
        });
        request = created.then(parameter => addCampaign(this.idSite, Object.assign(Object.assign({}, this.form), {}, {
          campaign: parameter
        })));
      } else {
        request = addCampaign(this.idSite, this.form);
      }
      request.then(r => {
        if (r.existed) {
          // nothing was saved: the value has details already; the panel stays with what was typed
          this.existingSaved = r.campaign;
          return;
        }
        this.$emit('update:open', false);
        this.$emit('changed');
      }).catch(e => {
        const {
          reason,
          text
        } = splitPlatformError(e && e.message ? plainText(e.message) : '');
        if (this.toWorkspace && this.createdParameter) {
          this.panelError = this.tr('CampaignCreatedInWorkspaceOnly', this.createdParameter, text);
        } else if (this.toWorkspace && reason === 'validation' && this.form.campaign.trim() !== '') {
          // the typed value does not fit the workspace's naming convention: said at the field
          this.valueError = this.tr('CampaignValueNotInConvention');
          const field = document.getElementById('fwcmp-d-campaign');
          if (field) {
            field.focus();
          }
        } else {
          this.panelError = text || this.tr('CampaignSaveFailed');
        }
      }).finally(() => {
        this.saving = false;
      });
    },
    /** switches the panel to the saved details of the typed value (restored first if archived) */
    editExisting() {
      const existing = this.existingDetails;
      if (!existing) {
        return;
      }
      const row = this.rows.find(r => r.campaign === existing.campaign);
      const restore = existing.archived ? archiveCampaign(this.idSite, existing.campaign, false) : Promise.resolve(null);
      restore.then(() => {
        const saved = this.existingSaved;
        if (row && !saved) {
          this.start(row);
        } else if (saved) {
          this.fillFromDetails(saved);
        }
        if (existing.archived) {
          this.$emit('changed');
        }
      }).catch(e => {
        this.panelError = e && e.message ? plainText(e.message) : this.tr('CampaignRestoreFailed');
      });
    },
    fillFromDetails(d) {
      this.existingSaved = null;
      this.editingCampaign = d.campaign;
      this.editingName = d.name || '';
      this.form = {
        campaign: d.campaign,
        name: d.name || '',
        startDate: d.startDate || '',
        endDate: d.endDate || '',
        goalMetric: d.goal ? d.goal.metric : 'none',
        goalTarget: d.goal && d.goal.target !== null ? `${d.goal.target}` : '',
        idGoal: d.goal && d.goal.idGoal !== null ? `${d.goal.idGoal}` : '',
        notes: d.notes || ''
      };
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignDetailsPanel.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignDetailsPanel.vue



CampaignDetailsPanelvue_type_script_lang_ts.render = CampaignDetailsPanelvue_type_template_id_17bd254e_render

/* harmony default export */ var CampaignDetailsPanel = (CampaignDetailsPanelvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/workspaceStatus.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
/**
 * A workspace campaign shows its real status in Feinwerk Campaigns, and while it is not live a
 * way to start it there (Peter, 2026-11-26, relayed by CampaignsApp and CampaignsWeb: "ja, b mit
 * ergänzung gilt"). Starting stays in the app, with its start checklist.
 */
const WORKSPACE_STATUSES = ['draft', 'preparing', 'ready', 'live', 'paused', 'ended', 'archived'];
const STARTABLE = ['draft', 'preparing', 'ready', 'paused'];
/** the translation key of the row's status: the workspace's, else the phase */
function statusKey(row) {
  const status = row.platform ? row.platform.status : '';
  return WORKSPACE_STATUSES.includes(status) ? `WorkspaceStatus_${status}` : `CampaignPhase_${row.phase}`;
}
/** the app link where the campaign is started, '' when it is live, ended or not in the workspace */
function startUrl(row) {
  const p = row.platform;
  return p && p.appUrl && STARTABLE.includes(p.status) ? p.appUrl : '';
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/CampaignOverview.vue?vue&type=script&lang=ts









const CampaignOverviewvue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
const CampaignOverviewvue_type_script_lang_ts_CATEGORY = 'FeinwerkCampaignManager_Campaigns';
const PHASES = ['running', 'preparing', 'ended', 'archived'];
/** a newer load wins over a slower older one (switching to archived and back) */
let overviewLoads = 0;
function CampaignOverviewvue_type_script_lang_ts_lang() {
  return document.documentElement.lang || undefined;
}
/* harmony default export */ var CampaignOverviewvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idSite: {
      type: Number,
      required: true
    },
    canWrite: {
      type: Boolean,
      default: false
    },
    /** the website's currency code (ISO 4217), for revenue */
    currency: {
      type: String,
      default: ''
    },
    /** Matomo's Marketplace for super users ('' for everyone else or when it is off) */
    marketplaceUrl: {
      type: String,
      default: ''
    },
    /** the feedback row at the end of the page (Feinwerk kit); null in Widgetize embeds */
    feedback: {
      type: Object,
      default: null
    },
    /** the kit's tip line after the feedback row (Promo\PromoLine); null: none */
    promo: {
      type: Object,
      default: null
    }
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    Alert: external_CoreHome_["Alert"],
    FeedbackBar: FeedbackBar,
    PromoLine: PromoLine,
    CampaignDetailsPanel: CampaignDetailsPanel
  },
  data() {
    return {
      rows: [],
      checklist: null,
      loading: false,
      error: '',
      actionError: '',
      busy: '',
      showArchived: false,
      panelOpen: false,
      panelRow: null,
      notice: null,
      reportOnlyToggled: null
    };
  },
  created() {
    this.load();
  },
  computed: {
    period() {
      return `${external_CoreHome_["MatomoUrl"].parsed.value.period || 'day'}`;
    },
    date() {
      return `${external_CoreHome_["MatomoUrl"].parsed.value.date || 'today'}`;
    },
    segment() {
      return `${external_CoreHome_["MatomoUrl"].parsed.value.segment || ''}`;
    },
    scopeText() {
      return scopeText(this.tr);
    },
    /** planned campaigns by phase, then the values only Matomo counted (no details, no link) */
    groups() {
      const planned = this.rows.filter(r => r.source !== 'report');
      const groups = PHASES.map(phase => ({
        phase,
        rows: planned.filter(r => r.phase === phase)
      }));
      groups.push({
        phase: 'report',
        rows: this.rows.filter(r => r.source === 'report')
      });
      return groups.filter(g => g.rows.length > 0);
    },
    /** the report-only group is collapsed while planned campaigns exist, until the user opens it */
    reportOnlyOpen() {
      if (this.reportOnlyToggled !== null) {
        return this.reportOnlyToggled;
      }
      return !this.rows.some(r => r.source !== 'report');
    },
    /** every step while a required one is open; then only the open recommended ones, one line */
    checklistItems() {
      if (!this.checklist) {
        return [];
      }
      return this.checklist.complete ? this.checklist.items.filter(i => !i.done) : this.checklist.items;
    },
    emptyText() {
      if (this.showArchived) {
        return this.tr('NoArchivedCampaigns');
      }
      // links or details exist, only not in this period
      const used = this.checklist && this.checklist.items.some(i => (i.key === 'saved_link' || i.key === 'campaign_details') && i.done);
      return used ? this.tr('NoCampaignsInPeriod') : this.tr('NoCampaignsYet');
    },
    goalsUrl() {
      return `?module=Goals&action=manage&idSite=${this.idSite}&period=${encodeURIComponent(this.period)}` + `&date=${encodeURIComponent(this.date)}`;
    }
  },
  methods: {
    statusKey: statusKey,
    startUrl: startUrl,
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(CampaignOverviewvue_type_script_lang_ts_PREFIX + key, ...args);
    },
    label(row) {
      return row.name || row.campaign;
    },
    /** "2 saved links: 1 live, 1 draft" (Peter, 2026-11-25: the card counts the link states) */
    linksText(row) {
      const count = row.activeLinks === 1 ? this.tr('OneSavedLink') : this.tr('SavedLinksCount', `${row.activeLinks}`);
      const states = row.linkStates || {
        draft: 0,
        live: 0,
        ended: 0
      };
      const parts = [];
      [['live', 'Live'], ['draft', 'Draft'], ['ended', 'Ended']].forEach(([key, name]) => {
        const n = states[key];
        if (n > 0) {
          parts.push(n === 1 ? this.tr(`LinkState${name}One`) : this.tr(`LinkState${name}Many`, `${n}`));
        }
      });
      return parts.length ? this.tr('LinkStatesSummary', count, parts.join(', ')) : count;
    },
    archiveLabel(row) {
      return this.tr(row.phase === 'archived' ? 'RestoreCampaignOf' : 'ArchiveCampaignOf', this.label(row));
    },
    load() {
      overviewLoads += 1;
      const current = overviewLoads;
      this.loading = true;
      this.error = '';
      Promise.all([fetchCampaigns(this.idSite, this.period, this.date, this.segment, this.showArchived ? 'archived' : 'active'), fetchChecklist(this.idSite)]).then(([rows, checklist]) => {
        if (current === overviewLoads) {
          this.rows = rows;
          this.checklist = checklist;
        }
      }).catch(e => {
        if (current === overviewLoads) {
          this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
        }
      }).finally(() => {
        if (current === overviewLoads) {
          this.loading = false;
        }
      });
    },
    toggleShowArchived() {
      this.showArchived = !this.showArchived;
      this.notice = null;
      this.load();
    },
    number(value) {
      return new Intl.NumberFormat(CampaignOverviewvue_type_script_lang_ts_lang()).format(value);
    },
    /** as Matomo shows money: no decimals for whole amounts, exactly two otherwise ("206,10 €") */
    money(value) {
      const digits = Number.isInteger(Math.round(value * 100) / 100) ? 0 : 2;
      if (this.currency) {
        try {
          return new Intl.NumberFormat(CampaignOverviewvue_type_script_lang_ts_lang(), {
            style: 'currency',
            currency: this.currency,
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
          }).format(value);
        } catch (e) {
          // an unknown currency code: the number alone
        }
      }
      return new Intl.NumberFormat(CampaignOverviewvue_type_script_lang_ts_lang(), {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      }).format(value);
    },
    day(iso) {
      const parsed = new Date(`${iso}T00:00:00Z`);
      return Number.isNaN(parsed.getTime()) ? iso : parsed.toLocaleDateString(CampaignOverviewvue_type_script_lang_ts_lang(), {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      });
    },
    /** a campaign value only Matomo counted has no dates: its phase instead */
    cardMeta(row) {
      return row.source === 'report' ? this.tr(`CampaignPhase_${row.phase}`) : this.periodText(row);
    },
    periodText(row) {
      if (row.startDate && row.endDate) {
        return this.tr('FromTo', this.day(row.startDate), this.day(row.endDate));
      }
      if (row.startDate) {
        // a start still to come reads "from", not "since" (UI review R52 W7)
        return this.tr(row.phase === 'preparing' ? 'StartsOn' : 'Since', this.day(row.startDate));
      }
      if (row.endDate) {
        return this.tr('Until', this.day(row.endDate));
      }
      return this.tr('NoDates');
    },
    percent(row) {
      return row.goal && row.goal.progress !== null ? Math.round(row.goal.progress * 100) : 0;
    },
    goalText(row) {
      if (!row.goal) {
        return '';
      }
      const value = row.goal.metric === 'revenue' ? this.money(row.goal.value) : this.number(row.goal.value);
      const target = row.goal.metric === 'revenue' ? this.money(row.goal.target) : this.number(row.goal.target);
      return this.tr(`GoalProgress_${row.goal.metric}`, value, target, `${this.percent(row)}`, this.day(row.goal.from));
    },
    /**
     * Matomo's visitor log with the campaign as segment: it reads the visits themselves, so it
     * works where Matomo does not archive segments on request (most instances; a segmented
     * report would stay empty there)
     */
    analyseUrl(row) {
      // with the campaign referrer type: a website or search engine could carry the same name
      const segment = `referrerType==campaign;referrerName==${encodeURIComponent(row.campaign)}`;
      const base = `idSite=${this.idSite}&period=${encodeURIComponent(this.period)}` + `&date=${encodeURIComponent(this.date)}`;
      return `?module=CoreHome&action=index&${base}#?${base}` + `&category=General_Visitors&subcategory=Live_VisitorLog&segment=${encodeURIComponent(segment)}`;
    },
    /** the campaign's page under All campaigns */
    campaignPageUrl(campaign) {
      return `#?${external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: CampaignOverviewvue_type_script_lang_ts_CATEGORY,
        subcategory: 'FeinwerkCampaignManager_AllCampaigns',
        campaignPage: campaign,
        campaignTab: null
      }))}`;
    },
    openBuilder(campaign) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: CampaignOverviewvue_type_script_lang_ts_CATEGORY,
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink: null,
        campaign: campaign || null
      }));
    },
    openPanel(row) {
      this.panelRow = row;
      this.panelOpen = true;
    },
    toggleArchived(row) {
      this.setArchived(row.campaign, this.label(row), row.phase !== 'archived');
    },
    undoArchive() {
      if (this.notice) {
        const {
          campaign,
          archived,
          label
        } = this.notice;
        this.setArchived(campaign, label, !archived);
      }
    },
    /** archives or restores, then says so with an Undo that takes the focus (the card is gone) */
    setArchived(campaign, label, archived) {
      this.busy = campaign;
      this.actionError = '';
      this.notice = null;
      archiveCampaign(this.idSite, campaign, archived).then(() => {
        this.notice = {
          text: this.tr(archived ? 'CampaignArchived' : 'CampaignRestored', label),
          campaign,
          label,
          archived
        };
        this.load();
        this.$nextTick(() => {
          const undo = this.$refs.undo;
          if (undo) {
            undo.focus();
          }
        });
      }).catch(e => {
        this.actionError = e && e.message ? plainText(e.message) : this.tr(archived ? 'CampaignArchiveFailed' : 'CampaignRestoreFailed');
      }).finally(() => {
        this.busy = '';
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignOverview.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignOverview.vue



CampaignOverviewvue_type_script_lang_ts.render = CampaignOverviewvue_type_template_id_6c27a054_render

/* harmony default export */ var CampaignOverview = (CampaignOverviewvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/DataQuality.vue?vue&type=template&id=5e42711c

const DataQualityvue_type_template_id_5e42711c_hoisted_1 = {
  class: "fwcmp-quality"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_2 = {
  class: "fwcmp-hint fwcmp-quality__scope"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_3 = {
  class: "fwcmp-quality__tiles"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_4 = {
  class: "fwcmp-quality__tile"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_5 = {
  class: "fwcmp-quality__big"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_6 = {
  class: "fwcmp-quality__tile"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_7 = {
  class: "fwcmp-quality__big"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_8 = {
  class: "fwcmp-quality__tile"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_9 = {
  class: "fwcmp-quality__big"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_10 = ["aria-label"];
const DataQualityvue_type_template_id_5e42711c_hoisted_11 = {
  class: "fwcmp-step__title"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_12 = {
  class: "fwcmp-hint fwcmp-quality__intro"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_13 = {
  key: 0,
  class: "fwcmp-notice fwcmp-quality__hint"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_14 = ["href"];
const DataQualityvue_type_template_id_5e42711c_hoisted_15 = {
  key: 1,
  class: "fwcmp-quality__none"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_16 = {
  key: 2,
  class: "fwcmp-cards"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_17 = {
  class: "fwcmp-variants"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_18 = {
  class: "fwcmp-variants__value"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_19 = {
  key: 0,
  class: "fwcmp-badge fwcmp-badge--live"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_20 = {
  class: "fwcmp-variants__numbers"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_21 = ["href"];
const DataQualityvue_type_template_id_5e42711c_hoisted_22 = {
  class: "fwcmp-hint fwcmp-variants__why"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_23 = {
  class: "fwcmp-card__actions"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_24 = ["aria-label", "onClick"];
const DataQualityvue_type_template_id_5e42711c_hoisted_25 = ["aria-label"];
const DataQualityvue_type_template_id_5e42711c_hoisted_26 = {
  class: "fwcmp-step__title"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_27 = {
  class: "fwcmp-hint fwcmp-quality__intro"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_28 = {
  key: 0,
  class: "fwcmp-quality__none"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_29 = {
  key: 1,
  class: "fwcmp-cards"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_30 = {
  class: "fwcmp-card__head"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_31 = {
  class: "fwcmp-variants__value"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_32 = {
  class: "fwcmp-card__meta"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_33 = {
  class: "fwcmp-card__actions"
};
const DataQualityvue_type_template_id_5e42711c_hoisted_34 = ["aria-label", "onClick"];
const DataQualityvue_type_template_id_5e42711c_hoisted_35 = ["href", "aria-label"];
const DataQualityvue_type_template_id_5e42711c_hoisted_36 = {
  key: 2,
  class: "fwcmp-hint"
};
function DataQualityvue_type_template_id_5e42711c_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_FeedbackBar = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("FeedbackBar");
  const _component_PromoLine = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PromoLine");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.scopeText), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.loading
  }, null, 8, ["loading"]), _ctx.error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 0,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.load && _ctx.load(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Retry')), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.issues ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dl", DataQualityvue_type_template_id_5e42711c_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ExplainedShare')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", DataQualityvue_type_template_id_5e42711c_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.explainedPercent), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.explainedText), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('UnexplainedTitle')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", DataQualityvue_type_template_id_5e42711c_hoisted_7, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(_ctx.issues.counts.unexplained)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.countText(_ctx.issues.counts.unexplainedVisits, 'OneVisit', 'VisitsCount')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('VariantsTitle')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", DataQualityvue_type_template_id_5e42711c_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(_ctx.issues.counts.variants)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CountedApart')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", {
    class: "fwcmp-phase",
    "aria-label": _ctx.tr('VariantsTitle')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", DataQualityvue_type_template_id_5e42711c_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('VariantsTitle')) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.issues.counts.variants) + ") ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('VariantsIntro')), 1), _ctx.issues.variants.length && _ctx.promoteUrl && !_ctx.hintHidden ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_13, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('HintQualityConvention')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: _ctx.promoteUrl
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BenefitsOpen')), 9, DataQualityvue_type_template_id_5e42711c_hoisted_14), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "fwcmp-linkbutton",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.hideHint && _ctx.hideHint(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('HintDismiss')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.issues.variants.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_15, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('VariantsNone')), 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", DataQualityvue_type_template_id_5e42711c_hoisted_16, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.issues.variants, group => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: group.suggested,
      class: "fwcmp-card"
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", DataQualityvue_type_template_id_5e42711c_hoisted_17, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(group.values, v => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
        key: v.value,
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
          'is-suggested': v.value === group.suggested
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("code", DataQualityvue_type_template_id_5e42711c_hoisted_18, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(v.value), 1), v.value === group.suggested && !group.maybeDistinct ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", DataQualityvue_type_template_id_5e42711c_hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Recommended')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", DataQualityvue_type_template_id_5e42711c_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.countText(v.visits, 'OneVisit', 'VisitsCount')), 1), v.savedLinks > 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
        key: 0
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(", "), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: _ctx.listUrl(v.value)
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.linksText(v.savedLinks)), 9, DataQualityvue_type_template_id_5e42711c_hoisted_21)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 2);
    }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.whyRecommended(group)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_23, [_ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "fwcmp-action",
      "aria-label": _ctx.tr('NewLinkFor', group.suggested),
      onClick: $event => _ctx.openBuilder(group.suggested)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewLink')), 9, DataQualityvue_type_template_id_5e42711c_hoisted_24)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]);
  }), 128))]))], 8, DataQualityvue_type_template_id_5e42711c_hoisted_10), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", {
    class: "fwcmp-phase",
    "aria-label": _ctx.tr('UnexplainedTitle')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", DataQualityvue_type_template_id_5e42711c_hoisted_26, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('UnexplainedTitle')) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.issues.counts.unexplained - _ctx.inGroupsCount) + ") ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_27, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('UnexplainedIntro')), 1), !_ctx.unexplainedRows.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_28, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('UnexplainedNone')), 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", DataQualityvue_type_template_id_5e42711c_hoisted_29, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.unexplainedRows, row => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: row.value,
      class: "fwcmp-card"
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("code", DataQualityvue_type_template_id_5e42711c_hoisted_31, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.value), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_32, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.countText(row.visits, 'OneVisit', 'VisitsCount')) + ", " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.countText(row.conversions, 'OneConversion', 'ConversionsCount')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_33, [_ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "fwcmp-action",
      "aria-label": _ctx.tr('NewLinkFor', row.value),
      onClick: $event => _ctx.openBuilder(row.value)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewLink')), 9, DataQualityvue_type_template_id_5e42711c_hoisted_34)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      class: "fwcmp-action",
      href: _ctx.analyseUrl(row.value),
      "aria-label": _ctx.tr('AnalyseInMatomoOf', row.value)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('AnalyseInMatomo')), 9, DataQualityvue_type_template_id_5e42711c_hoisted_35)])]);
  }), 128))])), _ctx.hiddenUnexplained > 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", DataQualityvue_type_template_id_5e42711c_hoisted_36, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('UnexplainedMore', `${_ctx.hiddenUnexplained}`, _ctx.number(_ctx.hiddenVisits))), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 8, DataQualityvue_type_template_id_5e42711c_hoisted_25)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.feedback ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_FeedbackBar, {
    key: 2,
    class: "fwcmp-page-feedback",
    "id-site": _ctx.idSite,
    topic: "data_quality",
    question: _ctx.tr('FeedbackQuestion_data_quality'),
    feedback: _ctx.feedback
  }, null, 8, ["id-site", "question", "feedback"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_PromoLine, {
    promo: _ctx.promo,
    "dismiss-label": _ctx.tr('PromoDismiss')
  }, null, 8, ["promo", "dismiss-label"])]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/DataQuality.vue?vue&type=template&id=5e42711c

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/DataQuality.vue?vue&type=script&lang=ts







const DataQualityvue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
const DataQualityvue_type_script_lang_ts_CATEGORY = 'FeinwerkCampaignManager_Campaigns';
function DataQualityvue_type_script_lang_ts_lang() {
  return document.documentElement.lang || undefined;
}
/** the hint's dismissal, per browser (a convenience, never needed for the page to work) */
const HINT_KEY = 'fwcmp-hint-quality-convention';
function hintDismissed() {
  try {
    return window.localStorage.getItem(HINT_KEY) === '1';
  } catch (e) {
    return false;
  }
}
/* harmony default export */ var DataQualityvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idSite: {
      type: Number,
      required: true
    },
    canWrite: {
      type: Boolean,
      default: false
    },
    /** the feedback row at the end of the page (Feinwerk kit); null in Widgetize embeds */
    feedback: {
      type: Object,
      default: null
    },
    /** the kit's tip line after the feedback row (Promo\PromoLine); null: none */
    promo: {
      type: Object,
      default: null
    }
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    Alert: external_CoreHome_["Alert"],
    FeedbackBar: FeedbackBar,
    PromoLine: PromoLine
  },
  data() {
    return {
      issues: null,
      loading: false,
      error: '',
      promoteUrl: '',
      hintHidden: hintDismissed()
    };
  },
  created() {
    this.load();
    fetchConnectionStatus().then(status => {
      if (status.promote) {
        this.promoteUrl = status.connectUrl || status.moreUrl || '';
      }
    }).catch(() => undefined);
  },
  computed: {
    period() {
      return `${external_CoreHome_["MatomoUrl"].parsed.value.period || 'day'}`;
    },
    date() {
      return `${external_CoreHome_["MatomoUrl"].parsed.value.date || 'today'}`;
    },
    segment() {
      return `${external_CoreHome_["MatomoUrl"].parsed.value.segment || ''}`;
    },
    scopeText() {
      return scopeText(this.tr);
    },
    /** share of the period's campaign visits whose value has a saved link or campaign details */
    explainedPercent() {
      if (!this.issues || this.issues.counts.campaignVisits === 0) {
        return '-';
      }
      const {
        campaignVisits,
        unexplainedVisits
      } = this.issues.counts;
      return new Intl.NumberFormat(DataQualityvue_type_script_lang_ts_lang(), {
        style: 'percent',
        maximumFractionDigits: 0
      }).format((campaignVisits - unexplainedVisits) / campaignVisits);
    },
    explainedText() {
      if (!this.issues) {
        return '';
      }
      const {
        campaignVisits,
        unexplainedVisits
      } = this.issues.counts;
      return this.tr('ExplainedShareDetail', this.number(campaignVisits), this.number(campaignVisits - unexplainedVisits));
    },
    /** value => the recommended spelling of its group, for values that are a variant of another */
    /** the unexplained values that are no spelling variant (those stand in their group) */
    unexplainedRows() {
      return this.issues ? this.issues.unexplained.filter(r => !this.inGroups[r.value]) : [];
    },
    inGroups() {
      const out = {};
      (this.issues ? this.issues.variants : []).forEach(g => g.values.forEach(v => {
        out[v.value] = true;
      }));
      return out;
    },
    /** unexplained values left out above because their group shows them */
    inGroupsCount() {
      return this.issues ? this.issues.unexplained.length - this.unexplainedRows.length : 0;
    },
    hiddenUnexplained() {
      return this.issues ? this.issues.counts.unexplained - this.issues.unexplained.length : 0;
    },
    hiddenVisits() {
      if (!this.issues) {
        return 0;
      }
      const shown = this.issues.unexplained.reduce((sum, r) => sum + r.visits, 0);
      return this.issues.counts.unexplainedVisits - shown;
    }
  },
  methods: {
    /** the rule of getQualityIssues: most saved links, then most visits */
    whyRecommended(group) {
      // every value with its own saved links: maybe distinct campaigns, none recommended (F3)
      if (group.maybeDistinct) {
        return this.tr('VariantsMaybeDistinct');
      }
      const best = group.values.find(v => v.value === group.suggested);
      return best && best.savedLinks > 0 ? this.tr('RecommendedWhyLinks') : this.tr('RecommendedWhyVisits');
    },
    hideHint() {
      this.hintHidden = true;
      try {
        window.localStorage.setItem(HINT_KEY, '1');
      } catch (e) {
        // hidden for this page view only
      }
    },
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(DataQualityvue_type_script_lang_ts_PREFIX + key, ...args);
    },
    load() {
      this.loading = true;
      this.error = '';
      fetchQualityIssues(this.idSite, this.period, this.date, this.segment).then(issues => {
        this.issues = issues;
      }).catch(e => {
        this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
    },
    number(value) {
      return new Intl.NumberFormat(DataQualityvue_type_script_lang_ts_lang()).format(value);
    },
    countText(n, one, many) {
      return n === 1 ? this.tr(one) : this.tr(many, this.number(n));
    },
    linksText(n) {
      return n === 1 ? this.tr('OneSavedLink') : this.tr('SavedLinksCount', this.number(n));
    },
    /** the saved links page, searched for the value */
    listUrl(value) {
      return `#?${external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: DataQualityvue_type_script_lang_ts_CATEGORY,
        subcategory: 'FeinwerkCampaignManager_Links',
        search: value
      }))}`;
    },
    /** Matomo's visitor log with the campaign value as segment (works without segment archiving) */
    analyseUrl(value) {
      // with the campaign referrer type: a website or search engine could carry the same name
      const segment = `referrerType==campaign;referrerName==${encodeURIComponent(value)}`;
      const base = `idSite=${this.idSite}&period=${encodeURIComponent(this.period)}` + `&date=${encodeURIComponent(this.date)}`;
      return `?module=CoreHome&action=index&${base}#?${base}` + `&category=General_Visitors&subcategory=Live_VisitorLog&segment=${encodeURIComponent(segment)}`;
    },
    openBuilder(campaign) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: DataQualityvue_type_script_lang_ts_CATEGORY,
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink: null,
        campaign
      }));
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/DataQuality.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/DataQuality.vue



DataQualityvue_type_script_lang_ts.render = DataQualityvue_type_template_id_5e42711c_render

/* harmony default export */ var DataQuality = (DataQualityvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/CampaignPages.vue?vue&type=template&id=00e99403

const CampaignPagesvue_type_template_id_00e99403_hoisted_1 = {
  class: "fwcmp-hint fwcmp-pages__scope"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_2 = {
  key: 0,
  class: "fwcmp-empty"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_3 = {
  key: 0,
  class: "fwcmp-step__title fwcmp-pages__group"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_4 = ["aria-expanded"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_5 = {
  class: "fwcmp-disclosure__mark",
  "aria-hidden": "true"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_6 = ["id"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_7 = {
  class: "entityTable dataTable fwcmp-table fwcmp-pages__table"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_8 = ["aria-sort"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_9 = ["onClick"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_10 = {
  class: "fwcmp-sort__mark",
  "aria-hidden": "true"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_11 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_12 = {
  class: "fwcmp-table__mainvalue"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_13 = ["href", "aria-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_14 = {
  key: 0,
  class: "fwcmp-card__value"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_15 = ["href", "title", "aria-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_16 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const CampaignPagesvue_type_template_id_00e99403_hoisted_17 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_18 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_19 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_20 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_21 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_22 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_23 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_24 = ["aria-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_25 = ["href"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_26 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  "aria-hidden": "true"
}, " › ", -1);
const CampaignPagesvue_type_template_id_00e99403_hoisted_27 = {
  class: "fwcmp-campaign__head"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_28 = {
  class: "fwcmp-campaign__name"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_29 = ["href"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_30 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "fwcmp-campaign__sep",
  "aria-hidden": "true"
}, "›", -1);
const CampaignPagesvue_type_template_id_00e99403_hoisted_31 = {
  key: 0,
  class: "fwcmp-card__value"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_32 = ["href", "title", "aria-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_33 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const CampaignPagesvue_type_template_id_00e99403_hoisted_34 = {
  class: "fwcmp-badge"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_35 = ["href", "aria-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_36 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const CampaignPagesvue_type_template_id_00e99403_hoisted_37 = {
  class: "fwcmp-campaign__when"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_38 = {
  class: "fwcmp-campaign__kpis"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_39 = {
  class: "fwcmp-hint fwcmp-campaign__window"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_40 = {
  ref: "actions",
  class: "fwcmp-campaign__actions"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_41 = ["aria-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_42 = ["id", "aria-selected", "aria-controls", "tabindex", "onClick"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_43 = {
  id: "fwcmp-panel-prepare",
  role: "tabpanel",
  "aria-labelledby": "fwcmp-tab-prepare",
  class: "fwcmp-tabpanel"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_44 = {
  class: "fwcmp-step__title"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_45 = {
  class: "fwcmp-livecard__values"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_46 = {
  key: 0
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_47 = {
  class: "fwcmp-step__title"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_48 = {
  class: "fwcmp-checklist__items fwcmp-campaign__checks"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_49 = {
  class: "fwcmp-checklist__mark",
  "aria-hidden": "true"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_50 = {
  class: "fwcmp-sr-only"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_51 = {
  class: "fwcmp-checklist__text"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_52 = {
  class: "fwcmp-step__title"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_53 = {
  key: 0,
  class: "fwcmp-quality__none"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_54 = {
  key: 1,
  class: "fwcmp-tablewrap"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_55 = {
  class: "fwcmp-tablewrap"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_56 = {
  class: "entityTable dataTable fwcmp-table"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_57 = {
  class: "fwcmp-table__actions"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_58 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_59 = ["title"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_60 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_61 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_62 = ["title"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_63 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_64 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_65 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_66 = ["aria-label", "onClick"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_67 = ["aria-label", "onClick"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_68 = {
  id: "fwcmp-panel-progress",
  role: "tabpanel",
  "aria-labelledby": "fwcmp-tab-progress",
  class: "fwcmp-tabpanel"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_69 = {
  key: 0,
  class: "fwcmp-goal"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_70 = {
  class: "fwcmp-goal__label"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_71 = ["aria-valuenow", "aria-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_72 = {
  key: 1,
  class: "fwcmp-campaign__chart"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_73 = {
  class: "fwcmp-step__title"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_74 = {
  key: 2,
  class: "fwcmp-quality__none"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_75 = {
  key: 3,
  class: "fwcmp-tablewrap"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_76 = {
  class: "fwcmp-tablewrap"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_77 = {
  class: "entityTable dataTable fwcmp-table"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_78 = {
  class: "fwcmp-table__num"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_79 = {
  class: "fwcmp-table__num"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_80 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_81 = {
  key: 0,
  class: "fwcmp-table__note"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_82 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_83 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_84 = {
  class: "fwcmp-table__value"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_85 = {
  key: 0,
  class: "fwcmp-table__basis"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_86 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_87 = ["data-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_88 = {
  key: 1,
  class: "fwcmp-table__note"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_89 = {
  id: "fwcmp-panel-result",
  role: "tabpanel",
  "aria-labelledby": "fwcmp-tab-result",
  class: "fwcmp-tabpanel"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_90 = {
  class: "fwcmp-campaign__verdict"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_91 = {
  class: "fwcmp-hint"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_92 = {
  key: 1,
  class: "fwcmp-hint fwcmp-campaign__nogoal"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_93 = {
  class: "fwcmp-campaign__best"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_94 = {
  class: "fwcmp-campaign__best"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_95 = {
  key: 3,
  class: "fwcmp-hint"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_96 = {
  class: "fwcmp-step__title"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_97 = {
  key: 4,
  class: "fwcmp-campaign__notes"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_98 = {
  key: 5,
  class: "fwcmp-quality__none"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_99 = {
  class: "fwcmp-step__title"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_100 = {
  class: "fwcmp-campaign__analyse"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_101 = ["href"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_102 = ["aria-label"];
const CampaignPagesvue_type_template_id_00e99403_hoisted_103 = {
  class: "fwcmp-summary__bar"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_104 = {
  class: "fwcmp-summary__kicker"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_105 = {
  class: "fwcmp-summary__title"
};
const CampaignPagesvue_type_template_id_00e99403_hoisted_106 = {
  class: "fwcmp-summary__lead"
};
const _hoisted_107 = {
  class: "fwcmp-quality__tiles"
};
const _hoisted_108 = {
  class: "fwcmp-quality__tile"
};
const _hoisted_109 = {
  class: "fwcmp-quality__big"
};
const _hoisted_110 = {
  class: "fwcmp-quality__tile"
};
const _hoisted_111 = {
  class: "fwcmp-quality__big"
};
const _hoisted_112 = {
  class: "fwcmp-quality__tile"
};
const _hoisted_113 = {
  class: "fwcmp-quality__big"
};
const _hoisted_114 = {
  class: "fwcmp-step__title"
};
const _hoisted_115 = {
  class: "fwcmp-campaign__notes"
};
const _hoisted_116 = {
  class: "fwcmp-summary__footer"
};
function CampaignPagesvue_type_template_id_00e99403_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_ActionMenu = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActionMenu");
  const _component_WidgetLoader = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("WidgetLoader");
  const _component_CampaignDetailsPanel = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("CampaignDetailsPanel");
  const _component_FeedbackBar = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("FeedbackBar");
  const _component_PromoLine = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PromoLine");
  const _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["fwcmp-pages", {
      'is-summary': _ctx.summary
    }])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.loading
  }, null, 8, ["loading"]), _ctx.error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 0,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.load && _ctx.load(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Retry')), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.campaign && _ctx.rows ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_1, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.scopeText), 1), !_ctx.rows.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NoCampaignsTable')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.tableGroups, group => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: group.key
    }, [group.key === 'report' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("h3", CampaignPagesvue_type_template_id_00e99403_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "fwcmp-disclosure",
      "aria-expanded": _ctx.reportOpen ? 'true' : 'false',
      "aria-controls": "fwcmp-pages-reportonly",
      onClick: _cache[1] || (_cache[1] = $event => _ctx.reportOpen = !_ctx.reportOpen)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.reportOpen ? '▾' : '▸'), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('OnlyCountedGroup')) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(group.rows.length) + ") ", 1)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_4)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      id: group.key === 'report' ? 'fwcmp-pages-reportonly' : undefined,
      class: "fwcmp-tablewrap"
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", CampaignPagesvue_type_template_id_00e99403_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.columns, col => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("th", {
        key: col.key,
        class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(col.num ? 'fwcmp-table__num' : ''),
        "aria-sort": _ctx.ariaSort(col.key)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
        type: "button",
        class: "fwcmp-sort",
        onClick: $event => _ctx.sortBy(col.key)
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(col.label), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.sortKey === col.key ? _ctx.sortDesc ? ' ▾' : ' ▴' : ''), 1)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_9)], 10, CampaignPagesvue_type_template_id_00e99403_hoisted_8);
    }), 128))])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(group.rows, row => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
        key: row.campaign
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "fwcmp-table__main",
        "data-label": _ctx.tr('FieldCampaign')
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_12, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        href: _ctx.pageUrl(row.campaign),
        class: "fwcmp-table__campaign",
        "aria-label": _ctx.tr('OpenCampaign', _ctx.label(row))
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.label(row)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_13), row.name ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("code", CampaignPagesvue_type_template_id_00e99403_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.campaign), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), row.platform && row.platform.appUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
        key: 1,
        class: "fwcmp-applink",
        href: row.platform.appUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        title: _ctx.tr('PlatformOpenCampaignTooltip'),
        "aria-label": _ctx.tr('PlatformOpenCampaignOf', _ctx.label(row))
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("Feinwerk Campaigns"), CampaignPagesvue_type_template_id_00e99403_hoisted_16], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_15)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_11), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        "data-label": _ctx.tr('LinkStatusHead')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(_ctx.statusKey(row))), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_17), _ctx.show.period ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("td", {
        key: 0,
        "data-label": _ctx.tr('CampaignPeriod')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tablePeriodText(row)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_18)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "fwcmp-table__num",
        "data-label": _ctx.tr('Visits')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(row.period.visits)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_19), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "fwcmp-table__num",
        "data-label": _ctx.tr('Conversions')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(row.period.conversions)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_20), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
        class: "fwcmp-table__num fwcmp-nowrap",
        "data-label": _ctx.tr('Revenue')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.money(row.period.revenue)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_21), _ctx.show.goal ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("td", {
        key: 1,
        class: "fwcmp-nowrap",
        "data-label": _ctx.tr('GoalProgressHead')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(row.goal ? `${_ctx.percent(row)} %` : ''), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_22)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.show.links ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("td", {
        key: 2,
        "data-label": _ctx.tr('Links')
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.statesText(row)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_23)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
    }), 128))])])), [[_directive_content_table]])], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_6), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], group.key !== 'report' || _ctx.reportOpen]])], 64);
  }), 128))], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.campaign && !_ctx.results ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("nav", {
    key: 2,
    class: "fwcmp-crumbs",
    "aria-label": _ctx.tr('AllCampaigns')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: _ctx.pageUrl('')
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('AllCampaigns')), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_25), CampaignPagesvue_type_template_id_00e99403_hoisted_26, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.results ? _ctx.label(_ctx.results.campaign) : _ctx.campaign), 1)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_24)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.campaign && _ctx.results ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 3
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", CampaignPagesvue_type_template_id_00e99403_hoisted_28, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "fwcmp-campaign__back",
    href: _ctx.pageUrl('')
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('AllCampaigns')), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_29), CampaignPagesvue_type_template_id_00e99403_hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.label(_ctx.results.campaign)), 1)]), _ctx.results.campaign.name ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("code", CampaignPagesvue_type_template_id_00e99403_hoisted_31, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.results.campaign.campaign), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.results.campaign.platform && _ctx.results.campaign.platform.appUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 1,
    class: "fwcmp-applink",
    href: _ctx.results.campaign.platform.appUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    title: _ctx.tr('PlatformOpenCampaignTooltip'),
    "aria-label": _ctx.tr('PlatformOpenCampaignOf', _ctx.label(_ctx.results.campaign))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("Feinwerk Campaigns"), CampaignPagesvue_type_template_id_00e99403_hoisted_33], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_32)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_34, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(_ctx.statusKey(_ctx.results.campaign))), 1), _ctx.startUrl(_ctx.results.campaign) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 2,
    class: "fwcmp-applink fwcmp-startlink",
    href: _ctx.startUrl(_ctx.results.campaign),
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": _ctx.tr('PlatformStartCampaignOf', _ctx.label(_ctx.results.campaign))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformStartCampaign')), 1), CampaignPagesvue_type_template_id_00e99403_hoisted_36], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_35)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_37, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.periodText(_ctx.results.campaign)), 1), _ctx.dayOf ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(", " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.dayOf), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dl", CampaignPagesvue_type_template_id_00e99403_hoisted_38, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Visits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(_ctx.results.totals.visits)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Conversions')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(_ctx.results.totals.conversions)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Revenue')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.money(_ctx.results.totals.revenue)), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_39, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.windowText), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_40, [_ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 0,
    type: "button",
    class: "btn",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.openBuilder(_ctx.results.campaign.campaign))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NewLink')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActionMenu, {
    items: _ctx.menuItems,
    label: _ctx.tr('MoreActionsOf', _ctx.label(_ctx.results.campaign)),
    onSelect: _ctx.menuSelect
  }, null, 8, ["items", "label", "onSelect"])], 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "fwcmp-tabs",
    role: "tablist",
    "aria-label": _ctx.label(_ctx.results.campaign)
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.tabs, t => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      id: `fwcmp-tab-${t}`,
      key: t,
      type: "button",
      role: "tab",
      class: "fwcmp-tab",
      "aria-selected": _ctx.tab === t ? 'true' : 'false',
      "aria-controls": `fwcmp-panel-${t}`,
      tabindex: _ctx.tab === t ? 0 : -1,
      onClick: $event => _ctx.selectTab(t),
      onKeydown: [_cache[3] || (_cache[3] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withKeys"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.moveTab(1), ["prevent"]), ["right"])), _cache[4] || (_cache[4] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withKeys"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.moveTab(-1), ["prevent"]), ["left"]))]
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`Tab_${t}`)), 41, CampaignPagesvue_type_template_id_00e99403_hoisted_42);
  }), 128))], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_41), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", CampaignPagesvue_type_template_id_00e99403_hoisted_43, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", CampaignPagesvue_type_template_id_00e99403_hoisted_44, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('KeyData')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dl", CampaignPagesvue_type_template_id_00e99403_hoisted_45, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignPeriod')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.periodText(_ctx.results.campaign)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignValue')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.results.campaign.campaign), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('GoalMetric')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.goalTargetText), 1)]), _ctx.results.campaign.notes ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_46, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Note')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.results.campaign.notes), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", CampaignPagesvue_type_template_id_00e99403_hoisted_47, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StartChecklist')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", CampaignPagesvue_type_template_id_00e99403_hoisted_48, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.checks, c => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: c.key,
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
        'is-done': c.done
      })
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_49, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(c.done ? '✓' : '○'), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_50, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(c.done ? _ctx.tr('Done') : _ctx.tr('Open')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_51, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(c.done ? _ctx.tr(`Check_${c.key}`) : _ctx.tr(`Check_${c.key}_todo`)), 1)], 2);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", CampaignPagesvue_type_template_id_00e99403_hoisted_52, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('CampaignLinks')) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.results.links.length) + ")", 1), !_ctx.results.links.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_53, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NoCampaignLinks')), 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_54, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_55, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", CampaignPagesvue_type_template_id_00e99403_hoisted_56, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Channel')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('FieldContent')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('FieldTargetUrl')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('StartDate')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('LinkStatusHead')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", CampaignPagesvue_type_template_id_00e99403_hoisted_57, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Actions')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.results.links, item => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: item.link.idLink
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      "data-label": _ctx.tr('Channel')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.channel(item.link)) + " ", 1), item.link.platform && item.link.platform.shortUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("code", {
      key: 0,
      class: "fwcmp-shortpill",
      title: item.link.platform.shortUrl
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.link.platform.shortUrl.replace(/^https?:\/\//i, '')), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_59)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_58), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      "data-label": _ctx.tr('FieldContent')
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.detail(item.link)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_60), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      class: "fwcmp-table__target",
      "data-label": _ctx.tr('FieldTargetUrl')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      title: item.link.url
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.shortTarget(item.link.targetUrl)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_62)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_61), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      "data-label": _ctx.tr('StartDate')
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.link.startDate ? _ctx.day(item.link.startDate) : ''), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_63), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      "data-label": _ctx.tr('LinkStatusHead')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-badge fwcmp-badge--${item.link.status}`)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`LinkStatus_${item.link.status}`)), 3)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_64), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      class: "fwcmp-table__actions",
      "data-label": _ctx.tr('Actions')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "fwcmp-action",
      "aria-label": _ctx.tr('CopyLinkOf', item.link.values.campaign),
      onClick: $event => _ctx.copyLink(item.link)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.copiedLink === item.link.idLink ? _ctx.tr('Copied') : _ctx.tr('Copy')), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_66), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 0,
      type: "button",
      class: "fwcmp-action",
      "aria-label": _ctx.tr('EditLinkOf', item.link.values.campaign),
      onClick: $event => _ctx.openLink(item.link.idLink)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Edit')), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_67)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_65)]);
  }), 128))])])), [[_directive_content_table]])])]))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.tab === 'prepare']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", CampaignPagesvue_type_template_id_00e99403_hoisted_68, [_ctx.results.campaign.goal ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_69, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_70, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.goalText), 1), _ctx.timeShare !== null ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(", " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('TimePassed', `${_ctx.timeShare} %`)), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "fwcmp-goal__bar",
    role: "progressbar",
    "aria-valuenow": Math.min(100, _ctx.percent(_ctx.results.campaign)),
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-label": _ctx.goalText
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: "fwcmp-goal__fill",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      width: `${Math.min(100, _ctx.percent(_ctx.results.campaign))}%`
    })
  }, null, 4)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_71)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.warnings, w => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: w,
      class: "fwcmp-msg fwcmp-msg--warning"
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(w), 1);
  }), 128)), _ctx.tab === 'progress' && _ctx.chartParams ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_72, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_WidgetLoader, {
    "widget-params": _ctx.chartParams,
    "widget-name": _ctx.tr('VisitsPerDay')
  }, null, 8, ["widget-params", "widget-name"])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", CampaignPagesvue_type_template_id_00e99403_hoisted_73, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PerLink')), 1), !_ctx.results.links.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_74, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NoCampaignLinks')), 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_75, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_76, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("table", CampaignPagesvue_type_template_id_00e99403_hoisted_77, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Channel')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('LinkStatusHead')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", CampaignPagesvue_type_template_id_00e99403_hoisted_78, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Visits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", CampaignPagesvue_type_template_id_00e99403_hoisted_79, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Conversions')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('LastVisit')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.results.links, item => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: item.link.idLink
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      "data-label": _ctx.tr('Channel')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.channel(item.link)) + " ", 1), _ctx.detail(item.link) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_81, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.detail(item.link)), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_80), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      "data-label": _ctx.tr('LinkStatusHead')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-badge fwcmp-badge--${item.link.status}`)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`LinkStatus_${item.link.status}`)), 3)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_82), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      class: "fwcmp-table__num",
      "data-label": _ctx.tr('Visits')
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_84, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.results ? _ctx.number(item.results.visits) : '-') + " ", 1), item.results && (item.results.basis !== 'link_id' || item.results.sharedWith > 1) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_85, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`ResultsBasisShort_${item.results.basis}`)), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_83), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      class: "fwcmp-table__num",
      "data-label": _ctx.tr('Conversions')
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.results ? _ctx.number(item.results.conversions) : '-'), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_86), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      "data-label": _ctx.tr('LastVisit')
    }, [item.lastVisitDay ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 0
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.day(item.lastVisitDay)), 1)], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", CampaignPagesvue_type_template_id_00e99403_hoisted_88, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NoVisitYet')), 1))], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_87)]);
  }), 128))])])), [[_directive_content_table]])])]))], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.tab === 'progress']]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("section", CampaignPagesvue_type_template_id_00e99403_hoisted_89, [_ctx.results.campaign.goal ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", CampaignPagesvue_type_template_id_00e99403_hoisted_90, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.verdict), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_91, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.goalText), 1)], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_92, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('ResultGoalHint')) + " ", 1), _ctx.canWrite ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 0,
    type: "button",
    class: "fwcmp-linkbutton",
    onClick: _cache[5] || (_cache[5] = $event => _ctx.panelOpen = true)
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SetGoal')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])), _ctx.ownLinks.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_93, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BestLink', _ctx.linkSummary(_ctx.ownLinks[0]))), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_94, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('WeakestLink', _ctx.linkSummary(_ctx.ownLinks[_ctx.ownLinks.length - 1]))), 1)], 64)) : _ctx.results.links.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_95, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PerLinkNeedsMcr')), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", CampaignPagesvue_type_template_id_00e99403_hoisted_96, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NotesAndLearnings')), 1), _ctx.results.campaign.notes ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_97, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.results.campaign.notes), 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_98, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NoNotes')), 1)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", CampaignPagesvue_type_template_id_00e99403_hoisted_99, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('AnalyseInMatomo')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("ul", CampaignPagesvue_type_template_id_00e99403_hoisted_100, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.analyseLinks, a => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: a.text
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
      href: _ctx.analyseUrl(a.category, a.subcategory)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(a.text)), 9, CampaignPagesvue_type_template_id_00e99403_hoisted_101)]);
  }), 128))])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.tab === 'result']]), _ctx.summary ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("section", {
    key: 0,
    ref: "summary",
    class: "fwcmp-summary",
    "aria-label": _ctx.tr('Summary')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_103, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "printButton",
    type: "button",
    class: "btn",
    onClick: _cache[6] || (_cache[6] = (...args) => _ctx.print && _ctx.print(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PrintOrPdf')), 513), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    onClick: _cache[7] || (_cache[7] = (...args) => _ctx.closeSummary && _ctx.closeSummary(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Close')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_104, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SummaryTitle', _ctx.periodText(_ctx.results.campaign))), 1), _ctx.siteName ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(", " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.siteName), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", CampaignPagesvue_type_template_id_00e99403_hoisted_105, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.label(_ctx.results.campaign)) + ": " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.verdict), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", CampaignPagesvue_type_template_id_00e99403_hoisted_106, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.summaryLead), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dl", _hoisted_107, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_108, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Visits')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", _hoisted_109, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(_ctx.results.totals.visits)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.goalOf('visits')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_110, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Conversions')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", _hoisted_111, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.number(_ctx.results.totals.conversions)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.goalOf('conversions')), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_112, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dt", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Revenue')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", _hoisted_113, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.money(_ctx.results.totals.revenue)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("dd", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.goalOf('revenue')), 1)])]), _ctx.ownLinks.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('BestLink', _ctx.linkSummary(_ctx.ownLinks[0]))), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('WeakestLink', _ctx.linkSummary(_ctx.ownLinks[_ctx.ownLinks.length - 1]))), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h4", _hoisted_114, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('NotesAndLearnings')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_115, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.results.campaign.notes || _ctx.tr('NoNotes')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_116, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('SummaryFooter', _ctx.today)), 1)], 8, CampaignPagesvue_type_template_id_00e99403_hoisted_102)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_CampaignDetailsPanel, {
    open: _ctx.panelOpen,
    "id-site": _ctx.idSite,
    row: _ctx.results.campaign,
    currency: _ctx.currency,
    "scope-class": "fwcmp-pages",
    "onUpdate:open": _cache[8] || (_cache[8] = $event => _ctx.panelOpen = $event),
    onChanged: _ctx.load
  }, null, 8, ["open", "id-site", "row", "currency", "onChanged"])], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.feedback ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_FeedbackBar, {
    key: 4,
    class: "fwcmp-page-feedback",
    "id-site": _ctx.idSite,
    topic: "campaign_pages",
    question: _ctx.tr('FeedbackQuestion_campaign_pages'),
    feedback: _ctx.feedback
  }, null, 8, ["id-site", "question", "feedback"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_PromoLine, {
    promo: _ctx.promo,
    "dismiss-label": _ctx.tr('PromoDismiss')
  }, null, 8, ["promo", "dismiss-label"])], 2);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignPages.vue?vue&type=template&id=00e99403

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/ActionMenu.vue?vue&type=template&id=a5e458be

const ActionMenuvue_type_template_id_a5e458be_hoisted_1 = {
  ref: "root",
  class: "fwcmp-menu"
};
const ActionMenuvue_type_template_id_a5e458be_hoisted_2 = ["aria-expanded", "aria-label", "title"];
const ActionMenuvue_type_template_id_a5e458be_hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-more-horiz",
  "aria-hidden": "true"
}, null, -1);
const ActionMenuvue_type_template_id_a5e458be_hoisted_4 = [ActionMenuvue_type_template_id_a5e458be_hoisted_3];
const ActionMenuvue_type_template_id_a5e458be_hoisted_5 = ["aria-label"];
const ActionMenuvue_type_template_id_a5e458be_hoisted_6 = ["href"];
const ActionMenuvue_type_template_id_a5e458be_hoisted_7 = ["onClick"];
function ActionMenuvue_type_template_id_a5e458be_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", ActionMenuvue_type_template_id_a5e458be_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "toggle",
    type: "button",
    class: "fwcmp-action fwcmp-menu__toggle",
    "aria-haspopup": "true",
    "aria-expanded": _ctx.open ? 'true' : 'false',
    "aria-label": _ctx.label,
    title: _ctx.label,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggle && _ctx.toggle(...args)),
    onKeydown: _cache[1] || (_cache[1] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withKeys"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])($event => _ctx.openAt(0), ["prevent"]), ["down"]))
  }, ActionMenuvue_type_template_id_a5e458be_hoisted_4, 40, ActionMenuvue_type_template_id_a5e458be_hoisted_2), _ctx.open ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("ul", {
    key: 0,
    class: "fwcmp-menu__list",
    role: "menu",
    "aria-label": _ctx.label,
    onKeydown: _cache[3] || (_cache[3] = (...args) => _ctx.onKey && _ctx.onKey(...args))
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.items, item => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("li", {
      key: item.key,
      role: "none"
    }, [item.href ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 0,
      class: "fwcmp-menu__item",
      role: "menuitem",
      tabindex: "-1",
      href: item.href,
      onClick: _cache[2] || (_cache[2] = $event => _ctx.close(false))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.label), 9, ActionMenuvue_type_template_id_a5e458be_hoisted_6)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
      key: 1,
      type: "button",
      class: "fwcmp-menu__item",
      role: "menuitem",
      tabindex: "-1",
      onClick: $event => _ctx.choose(item.key)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.label), 9, ActionMenuvue_type_template_id_a5e458be_hoisted_7))]);
  }), 128))], 40, ActionMenuvue_type_template_id_a5e458be_hoisted_5)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 512);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/ActionMenu.vue?vue&type=template&id=a5e458be

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/ActionMenu.vue?vue&type=script&lang=ts

/* harmony default export */ var ActionMenuvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    items: {
      type: Array,
      required: true
    },
    /** the button's accessible name, e.g. "More actions for autumn-deals" */
    label: {
      type: String,
      required: true
    }
  },
  emits: ['select'],
  data() {
    return {
      open: false
    };
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.outside, true);
  },
  methods: {
    toggle() {
      if (this.open) {
        this.close(true);
      } else {
        this.openAt(0);
      }
    },
    openAt(index) {
      this.open = true;
      document.addEventListener('mousedown', this.outside, true);
      this.$nextTick(() => this.focusItem(index));
    },
    close(focusToggle) {
      this.open = false;
      document.removeEventListener('mousedown', this.outside, true);
      if (focusToggle) {
        const toggle = this.$refs.toggle;
        if (toggle) {
          toggle.focus();
        }
      }
    },
    choose(key) {
      this.close(true);
      this.$emit('select', key);
    },
    outside(event) {
      const root = this.$refs.root;
      if (root && !root.contains(event.target)) {
        this.close(false);
      }
    },
    itemsInDom() {
      const root = this.$refs.root;
      return root ? Array.from(root.querySelectorAll('.fwcmp-menu__item')) : [];
    },
    focusItem(index) {
      const all = this.itemsInDom();
      if (all.length) {
        all[(index + all.length) % all.length].focus();
      }
    },
    onKey(event) {
      const all = this.itemsInDom();
      const current = all.indexOf(document.activeElement);
      const moves = {
        ArrowDown: current + 1,
        ArrowUp: current - 1,
        Home: 0,
        End: all.length - 1
      };
      if (event.key === 'Escape' || event.key === 'Tab') {
        if (event.key === 'Escape') {
          // the menu's Escape is not the page's
          event.preventDefault();
          event.stopPropagation();
        }
        this.close(event.key === 'Escape');
        return;
      }
      if (moves[event.key] !== undefined) {
        event.preventDefault();
        this.focusItem(moves[event.key]);
      }
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/ActionMenu.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/ActionMenu.vue



ActionMenuvue_type_script_lang_ts.render = ActionMenuvue_type_template_id_a5e458be_render

/* harmony default export */ var ActionMenu = (ActionMenuvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/CampaignPages.vue?vue&type=script&lang=ts












const CampaignPagesvue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
const CampaignPagesvue_type_script_lang_ts_CATEGORY = 'FeinwerkCampaignManager_Campaigns';
const SUBCATEGORY = 'FeinwerkCampaignManager_AllCampaigns';
const TABS = ['prepare', 'progress', 'result'];
/** the class on <html> while the summary is open: only then the print rules apply */
const PRINT_CLASS = 'fwcmp-printing';
/** the top-level copy of the summary that is printed */
const PRINT_ROOT = 'fwcmp-print-root';
function CampaignPagesvue_type_script_lang_ts_lang() {
  return document.documentElement.lang || undefined;
}
function utcDay(day) {
  return Date.UTC(Number(day.slice(0, 4)), Number(day.slice(5, 7)) - 1, Number(day.slice(8, 10)));
}
function daysBetween(from, to) {
  return Math.round((utcDay(to) - utcDay(from)) / 86400000);
}
const ANALYSE_LINKS = [{
  category: 'General_Visitors',
  subcategory: 'Live_VisitorLog',
  text: 'AnalyseVisitorLog'
}, {
  category: 'General_Visitors',
  subcategory: 'DevicesDetection_Devices',
  text: 'AnalyseDevices'
}, {
  category: 'General_Actions',
  subcategory: 'General_Pages',
  text: 'AnalysePages'
}, {
  category: 'Goals_Goals',
  subcategory: 'General_Overview',
  text: 'AnalyseGoals'
}];
/** a newer load wins over a slower older one */
let CampaignPagesvue_type_script_lang_ts_loadCount = 0;
/* harmony default export */ var CampaignPagesvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    idSite: {
      type: Number,
      required: true
    },
    canWrite: {
      type: Boolean,
      default: false
    },
    /** the evolution graph's report (MarketingCampaignsReporting.getName while it is active) */
    evolutionApiMethod: {
      type: String,
      default: 'Referrers.getCampaigns'
    },
    /**
     * whether Matomo archives a segment on request here: then the result also links segmented
     * reports (devices, pages, goals), otherwise only the visitor log (needs no archiving)
     */
    segmentReports: {
      type: Boolean,
      default: false
    },
    /** the website's currency code (ISO 4217), for revenue */
    currency: {
      type: String,
      default: ''
    },
    siteName: {
      type: String,
      default: ''
    },
    /** the feedback row at the end of the page (Feinwerk kit); null in Widgetize embeds */
    feedback: {
      type: Object,
      default: null
    },
    /** the kit's tip line after the feedback row (Promo\PromoLine); null: none */
    promo: {
      type: Object,
      default: null
    }
  },
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    Alert: external_CoreHome_["Alert"],
    CampaignDetailsPanel: CampaignDetailsPanel,
    FeedbackBar: FeedbackBar,
    PromoLine: PromoLine,
    WidgetLoader: external_CoreHome_["WidgetLoader"],
    ActionMenu: ActionMenu
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data() {
    return {
      rows: null,
      copiedLink: 0,
      sortKey: '',
      sortDesc: false,
      reportOpen: false,
      results: null,
      loading: false,
      error: '',
      panelOpen: false,
      summary: false
    };
  },
  created() {
    this.load();
  },
  beforeUnmount() {
    this.closeSummary();
  },
  watch: {
    campaign() {
      this.closeSummary();
      // another campaign (or the table): the old page goes; a reload of the same one keeps it
      // until the answer comes
      this.results = null;
      this.load();
    }
  },
  computed: {
    /** columns every row would leave empty are not shown (R51 W10) */
    show() {
      const rows = this.rows || [];
      return {
        period: rows.some(r => !!(r.startDate || r.endDate)),
        goal: rows.some(r => !!r.goal),
        links: rows.some(r => r.activeLinks > 0)
      };
    },
    columns() {
      // key, label key, a number column, shown
      const all = [['name', 'FieldCampaign', false, true], ['phase', 'LinkStatusHead', false, true], ['period', 'CampaignPeriod', false, this.show.period], ['visits', 'Visits', true, true], ['conversions', 'Conversions', true, true], ['revenue', 'Revenue', true, true], ['goal', 'GoalProgressHead', false, this.show.goal], ['links', 'Links', false, this.show.links]];
      return all.filter(c => c[3]).map(([key, label, num]) => ({
        key,
        label: this.tr(label),
        num
      }));
    },
    /** planned campaigns, then the folded values only Matomo counted, each sorted (R50 D2) */
    tableGroups() {
      const rows = [...(this.rows || [])];
      if (this.sortKey) {
        const order = ['running', 'preparing', 'ended', 'archived'];
        const value = r => {
          switch (this.sortKey) {
            case 'name':
              return this.label(r).toLowerCase();
            case 'phase':
              return order.indexOf(r.phase);
            case 'period':
              return r.startDate || r.endDate || '';
            case 'visits':
              return r.period.visits;
            case 'conversions':
              return r.period.conversions;
            case 'revenue':
              return r.period.revenue;
            case 'goal':
              return r.goal && r.goal.progress !== null ? r.goal.progress : -1;
            default:
              return r.activeLinks;
          }
        };
        rows.sort((a, b) => {
          const va = value(a);
          const vb = value(b);
          const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : `${va}`.localeCompare(`${vb}`);
          return this.sortDesc ? -cmp : cmp;
        });
      }
      return [{
        key: 'planned',
        rows: rows.filter(r => r.source !== 'report')
      }, {
        key: 'report',
        rows: rows.filter(r => r.source === 'report')
      }].filter(g => g.rows.length > 0);
    },
    /** the campaign page's further actions (R50 D1) */
    menuItems() {
      if (!this.results) {
        return [];
      }
      const items = [];
      if (this.canWrite) {
        items.push({
          key: 'details',
          label: this.results.campaign.hasDetails ? this.tr('EditDetails') : this.tr('AddDetails')
        });
      }
      items.push({
        key: 'analyse',
        label: this.tr('AnalyseInMatomo'),
        href: this.analyseUrl('General_Visitors', 'Live_VisitorLog')
      });
      items.push({
        key: 'summary',
        label: this.tr('Summary')
      });
      return items;
    },
    /** the campaign value of the open page ('' for the table) */
    campaign() {
      const value = external_CoreHome_["MatomoUrl"].hashParsed.value.campaignPage;
      return typeof value === 'string' ? value : '';
    },
    tabs() {
      return TABS;
    },
    /** the visitor log always; segmented reports only where Matomo archives a segment on request */
    analyseLinks() {
      return this.segmentReports ? ANALYSE_LINKS : ANALYSE_LINKS.slice(0, 1);
    },
    checks() {
      return this.results ? this.checksFor(this.results) : [];
    },
    /** the tab in the hash, else by phase: preparing, running, ended or archived */
    tab() {
      const value = `${external_CoreHome_["MatomoUrl"].hashParsed.value.campaignTab || ''}`;
      if (TABS.includes(value)) {
        return value;
      }
      const phase = this.results ? this.results.campaign.phase : 'running';
      if (phase === 'preparing') {
        return 'prepare';
      }
      return phase === 'running' ? 'progress' : 'result';
    },
    scopeText() {
      return scopeText(this.tr);
    },
    today() {
      return new Date().toLocaleDateString(CampaignPagesvue_type_script_lang_ts_lang());
    },
    dayOf() {
      const c = this.results ? this.results.campaign : null;
      if (!c || c.phase !== 'running' || !c.startDate || !c.endDate) {
        return '';
      }
      const total = daysBetween(c.startDate, c.endDate) + 1;
      const done = Math.min(total, daysBetween(c.startDate, this.results.window.to) + 1);
      return this.tr('DayOf', `${done}`, `${total}`);
    },
    /** the share of the campaign's days passed, for the goal line */
    timeShare() {
      const c = this.results ? this.results.campaign : null;
      if (!c || !c.startDate || !c.endDate || c.phase !== 'running') {
        return null;
      }
      const total = daysBetween(c.startDate, c.endDate) + 1;
      const done = daysBetween(c.startDate, this.results.window.to) + 1;
      return Math.max(0, Math.min(100, Math.round(done / total * 100)));
    },
    windowText() {
      if (!this.results) {
        return '';
      }
      const {
        from,
        to,
        complete
      } = this.results.window;
      const c = this.results.campaign;
      if (c.phase === 'preparing' && c.startDate && c.startDate === from && from === to && this.results.series.length === 0) {
        return this.tr('NotStarted', this.day(from));
      }
      const text = this.tr('DaysOfCampaign', this.day(from), this.day(to));
      return complete ? text : `${text} ${this.tr('WindowIncomplete', this.day(from))}`;
    },
    summaryLead() {
      const goal = this.results && this.results.campaign.goal ? ` ${this.goalText}` : '';
      return `${this.summaryDaysText}${goal}`;
    },
    /** the summary is read without the period selector: only the days it counts */
    summaryDaysText() {
      if (!this.results) {
        return '';
      }
      const {
        from,
        to,
        complete
      } = this.results.window;
      const c = this.results.campaign;
      if (c.phase === 'preparing' && c.startDate && c.startDate === from && from === to && this.results.series.length === 0) {
        return this.tr('NotStarted', this.day(from));
      }
      const text = this.tr('SummaryDays', this.day(from), this.day(to));
      return complete ? text : `${text} ${this.tr('WindowIncomplete', this.day(from))}`;
    },
    goalTargetText() {
      const goal = this.results ? this.results.campaign.goal : null;
      if (!goal) {
        return this.tr('GoalMetric_none');
      }
      const target = goal.metric === 'revenue' ? this.money(goal.target) : this.number(goal.target);
      return `${this.tr(`GoalMetric_${goal.metric}`)}: ${target}`;
    },
    goalText() {
      const c = this.results ? this.results.campaign : null;
      if (!c || !c.goal) {
        return '';
      }
      const {
        metric
      } = c.goal;
      const value = metric === 'revenue' ? this.money(c.goal.value) : this.number(c.goal.value);
      const target = metric === 'revenue' ? this.money(c.goal.target) : this.number(c.goal.target);
      const share = `${this.percent(c)}`;
      return this.tr(`GoalProgress_${metric}`, value, target, share, this.day(c.goal.from));
    },
    /** reached, exceeded, missed, still running, or no goal */
    verdict() {
      const c = this.results ? this.results.campaign : null;
      if (!c || !c.goal) {
        return this.tr('Result_nogoal');
      }
      const p = this.percent(c);
      if (p > 100) {
        return this.tr('Result_exceeded');
      }
      if (p === 100) {
        return this.tr('Result_reached');
      }
      return c.phase === 'ended' || c.phase === 'archived' ? this.tr('Result_missed') : this.tr('Result_interim');
    },
    warnings() {
      if (!this.results) {
        return [];
      }
      const out = this.results.campaign.warnings.map(w => this.tr(`Warning_${w}`));
      this.results.warnings.forEach(w => {
        const item = this.results.links.find(l => l.link.idLink === w.idLink);
        if (item) {
          const name = this.channel(item.link);
          out.push(this.tr('Warning_link_quiet', name, this.day(w.lastVisitDay)));
        }
      });
      return out;
    },
    /** links counted by their own link ID, most conversions (then visits) first */
    ownLinks() {
      if (!this.results) {
        return [];
      }
      return this.results.links.filter(l => l.results && l.results.basis === 'link_id' && l.results.sharedWith === 1).sort((a, b) => b.results.conversions - a.results.conversions || b.results.visits - a.results.visits);
    },
    /** Matomo's own evolution graph of the campaign row (report: evolutionApiMethod) */
    chartParams() {
      if (!this.results || this.results.series.length === 0) {
        return null;
      }
      return {
        module: 'CoreHome',
        action: 'getRowEvolutionGraph',
        apiMethod: this.evolutionApiMethod,
        label: this.results.campaign.campaign,
        idSite: this.idSite,
        period: 'day',
        date: this.results.window.to,
        // the same days as the numbers above (Matomo's graph reads it, also at 5.0)
        evolution_day_last_n: Math.max(2, daysBetween(this.results.window.from, this.results.window.to) + 1),
        column: 'nb_visits',
        widget: 1
      };
    }
  },
  methods: {
    statusKey: statusKey,
    startUrl: startUrl,
    copyLink(link) {
      const url = link.platform && link.platform.shortUrl ? link.platform.shortUrl : link.url;
      copyText(url).then(() => {
        this.copiedLink = link.idLink;
        window.setTimeout(() => {
          this.copiedLink = 0;
        }, 2000);
      }).catch(() => undefined);
    },
    ariaSort(key) {
      if (this.sortKey !== key) {
        return undefined;
      }
      return this.sortDesc ? 'descending' : 'ascending';
    },
    /** a click on a column head: sort by it, again to turn the order; numbers start high */
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDesc = !this.sortDesc;
      } else {
        this.sortKey = key;
        this.sortDesc = ['visits', 'conversions', 'revenue', 'goal', 'links'].includes(key);
      }
    },
    menuSelect(key) {
      if (key === 'details') {
        this.panelOpen = true;
      } else if (key === 'summary') {
        this.openSummary();
      }
    },
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(CampaignPagesvue_type_script_lang_ts_PREFIX + key, ...args);
    },
    load() {
      CampaignPagesvue_type_script_lang_ts_loadCount += 1;
      const current = CampaignPagesvue_type_script_lang_ts_loadCount;
      this.loading = true;
      this.error = '';
      const url = external_CoreHome_["MatomoUrl"].parsed.value;
      const segment = `${url.segment || ''}`;
      const request = this.campaign ? fetchCampaignResults(this.idSite, this.campaign, segment).then(r => {
        if (current === CampaignPagesvue_type_script_lang_ts_loadCount) {
          this.results = r;
        }
      }) : fetchCampaigns(this.idSite, `${url.period || 'day'}`, `${url.date || 'today'}`, segment, 'active').then(rows => {
        if (current === CampaignPagesvue_type_script_lang_ts_loadCount) {
          this.rows = rows.filter(r => r.source !== 'report' || r.period.visits > 0);
          // only values Matomo counted: their group is open
          this.reportOpen = !this.rows.some(r => r.source !== 'report');
        }
      });
      request.catch(e => {
        if (current === CampaignPagesvue_type_script_lang_ts_loadCount) {
          this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
        }
      }).finally(() => {
        if (current === CampaignPagesvue_type_script_lang_ts_loadCount) {
          this.loading = false;
        }
      });
    },
    label(row) {
      return row.name || row.campaign;
    },
    number(value) {
      return new Intl.NumberFormat(CampaignPagesvue_type_script_lang_ts_lang()).format(value);
    },
    /** as Matomo shows money: no decimals for whole amounts, exactly two otherwise */
    money(value) {
      const digits = Number.isInteger(Math.round(value * 100) / 100) ? 0 : 2;
      if (this.currency) {
        try {
          return new Intl.NumberFormat(CampaignPagesvue_type_script_lang_ts_lang(), {
            style: 'currency',
            currency: this.currency,
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
          }).format(value);
        } catch (e) {
          // an unknown currency code: the number alone
        }
      }
      return new Intl.NumberFormat(CampaignPagesvue_type_script_lang_ts_lang(), {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      }).format(value);
    },
    day(iso) {
      return shortDay(iso);
    },
    /** in the table, no dates leave the cell empty (the phrase would repeat on most rows) */
    tablePeriodText(row) {
      return row.startDate || row.endDate ? this.periodText(row) : '';
    },
    periodText(row) {
      if (row.startDate && row.endDate) {
        return this.tr('FromTo', this.day(row.startDate), this.day(row.endDate));
      }
      if (row.startDate) {
        // a start still to come reads "from", not "since" (UI review R52 W7)
        return this.tr(row.phase === 'preparing' ? 'StartsOn' : 'Since', this.day(row.startDate));
      }
      if (row.endDate) {
        return this.tr('Until', this.day(row.endDate));
      }
      return this.tr('NoDates');
    },
    percent(row) {
      return row.goal && row.goal.progress !== null ? Math.round(row.goal.progress * 100) : 0;
    },
    goalOf(metric) {
      const goal = this.results ? this.results.campaign.goal : null;
      if (!goal || goal.metric !== metric) {
        return '';
      }
      const target = metric === 'revenue' ? this.money(goal.target) : this.number(goal.target);
      return this.tr('OfGoal', target);
    },
    statesText(row) {
      const states = row.linkStates || {
        draft: 0,
        live: 0,
        ended: 0
      };
      const parts = [];
      const names = [['live', 'Live'], ['draft', 'Draft'], ['ended', 'Ended']];
      names.forEach(([key, name]) => {
        const n = states[key];
        if (n > 0) {
          parts.push(n === 1 ? this.tr(`LinkState${name}One`) : this.tr(`LinkState${name}Many`, `${n}`));
        }
      });
      return parts.join(', ');
    },
    channel(link) {
      return [link.values.source, link.values.medium].filter(v => v !== '').join(' / ') || link.values.campaign;
    },
    detail(link) {
      return [link.values.content, link.values.placement, link.values.keyword].filter(v => v !== '').join(', ');
    },
    shortTarget(url) {
      return url.replace(/^https?:\/\//, '');
    },
    linkSummary(item) {
      const r = item.results;
      const visits = r.visits === 1 ? this.tr('OneVisit') : this.tr('VisitsCount', this.number(r.visits));
      const conversions = r.conversions === 1 ? this.tr('OneConversion') : this.tr('ConversionsCount', this.number(r.conversions));
      return `${this.channel(item.link)} (${visits}, ${conversions})`;
    },
    checksFor(r) {
      const c = r.campaign;
      return [{
        key: 'period',
        done: !!(c.startDate && c.endDate)
      }, {
        key: 'goal',
        done: !!c.goal
      }, {
        key: 'links',
        done: r.links.length > 0
      }];
    },
    pageUrl(campaign) {
      return `#?${external_CoreHome_["MatomoUrl"].stringify(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: CampaignPagesvue_type_script_lang_ts_CATEGORY,
        subcategory: SUBCATEGORY,
        campaignPage: campaign || null,
        campaignTab: null
      }))}`;
    },
    selectTab(t) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        campaignTab: t
      }));
    },
    moveTab(step) {
      const next = TABS[(TABS.indexOf(this.tab) + step + TABS.length) % TABS.length];
      this.selectTab(next);
      this.$nextTick(() => {
        const button = document.getElementById(`fwcmp-tab-${next}`);
        if (button) {
          button.focus();
        }
      });
    },
    /** a Matomo report page with the campaign as segment (with the campaign referrer type) */
    analyseUrl(category, subcategory) {
      const value = this.results ? this.results.campaign.campaign : '';
      const segment = `referrerType==campaign;referrerName==${encodeURIComponent(value)}`;
      const url = external_CoreHome_["MatomoUrl"].parsed.value;
      const base = `idSite=${this.idSite}&period=${encodeURIComponent(`${url.period || 'day'}`)}` + `&date=${encodeURIComponent(`${url.date || 'today'}`)}`;
      return `?module=CoreHome&action=index&${base}#?${base}&category=${category}` + `&subcategory=${subcategory}&segment=${encodeURIComponent(segment)}`;
    },
    openBuilder(campaign) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: CampaignPagesvue_type_script_lang_ts_CATEGORY,
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink: null,
        campaign,
        campaignPage: null,
        campaignTab: null
      }));
    },
    openLink(idLink) {
      external_CoreHome_["MatomoUrl"].updateHash(Object.assign(Object.assign({}, external_CoreHome_["MatomoUrl"].hashParsed.value), {}, {
        category: CampaignPagesvue_type_script_lang_ts_CATEGORY,
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink,
        campaign: null,
        campaignPage: null,
        campaignTab: null
      }));
    },
    openSummary() {
      this.summary = true;
      document.documentElement.classList.add(PRINT_CLASS);
      window.addEventListener('beforeprint', this.beforePrint);
      window.addEventListener('afterprint', this.afterPrint);
      window.addEventListener('keydown', this.closeOnEscape);
      this.$nextTick(() => {
        const button = this.$refs.printButton;
        if (button) {
          button.focus();
        }
      });
    },
    closeSummary() {
      const wasOpen = this.summary;
      this.summary = false;
      document.documentElement.classList.remove(PRINT_CLASS);
      window.removeEventListener('beforeprint', this.beforePrint);
      window.removeEventListener('afterprint', this.afterPrint);
      window.removeEventListener('keydown', this.closeOnEscape);
      this.afterPrint();
      if (wasOpen) {
        // back to the menu the summary was opened from
        this.$nextTick(() => {
          const actions = this.$refs.actions;
          const button = actions ? actions.querySelector('.fwcmp-menu__toggle') : null;
          if (button) {
            button.focus();
          }
        });
      }
    },
    /** Escape closes the summary wherever the focus is */
    closeOnEscape(event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.closeSummary();
      }
    },
    /** prints a copy of the summary at the page's top level, so Matomo's layout takes no pages */
    beforePrint() {
      this.afterPrint();
      const summary = this.$refs.summary;
      if (!summary) {
        return;
      }
      const root = document.createElement('div');
      root.className = `${PRINT_ROOT} fwcmp-pages`;
      root.appendChild(summary.cloneNode(true));
      document.body.appendChild(root);
    },
    afterPrint() {
      document.querySelectorAll(`.${PRINT_ROOT}`).forEach(node => node.remove());
    },
    print() {
      window.print();
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignPages.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/CampaignPages.vue



CampaignPagesvue_type_script_lang_ts.render = CampaignPagesvue_type_template_id_00e99403_render

/* harmony default export */ var CampaignPages = (CampaignPagesvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PlatformConnection.vue?vue&type=template&id=7aa5d9ac

const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_1 = {
  class: "fwcmp-platform"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_2 = {
  class: "card"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_3 = {
  class: "card-content"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_4 = {
  class: "card-title"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_5 = {
  class: "fwcmp-platform__line"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_6 = {
  key: 1,
  class: "fwcmp-platform__line"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_7 = ["href"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_8 = {
  key: 2,
  class: "fwcmp-notice",
  role: "status"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_9 = ["href"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_10 = {
  class: "fwcmp-platform__actions"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_11 = ["href", "title"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_12 = ["action"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_13 = ["value"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_14 = {
  type: "submit",
  class: "btn"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_15 = ["aria-label"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_16 = {
  class: "fwcmp-step__title"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_17 = {
  class: "fwcmp-hint"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_18 = {
  key: 0,
  class: "fwcmp-msg fwcmp-msg--error"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_19 = {
  key: 1,
  class: "fwcmp-tablewrap"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_20 = {
  class: "entityTable dataTable fwcmp-table fwcmp-platform__table"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_21 = {
  class: "fwcmp-sr-only"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_22 = {
  class: "fwcmp-platform__host"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_23 = ["href"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_24 = ["disabled"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_25 = {
  key: 3,
  class: "fwcmp-hint"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_26 = ["href", "title"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_27 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "icon-outlink",
  "aria-hidden": "true"
}, null, -1);
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_28 = ["aria-label"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_29 = ["disabled"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_30 = {
  class: "fwcmp-platform__sent"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_31 = {
  key: 1,
  class: "fwcmp-hint"
};
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_32 = ["action"];
const PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_33 = ["value"];
function PlatformConnectionvue_type_template_id_7aa5d9ac_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ActivityIndicator = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ActivityIndicator");
  const _component_Alert = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Alert");
  const _component_PlatformBenefits = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("PlatformBenefits");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h2", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformTitle')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.loading
  }, null, 8, ["loading"]), _ctx.error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_Alert, {
    key: 0,
    severity: "danger"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      type: "button",
      class: "btn-flat fwcmp-retry",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.load && _ctx.load(...args))
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Retry')), 1)]),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.status ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [_ctx.status.mode === 'connected' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [_ctx.stateMessage ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`fwcmp-msg fwcmp-msg--${_ctx.stateKind}`),
    role: "status"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.stateMessage), 3)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformConnectedTo', _ctx.workspaceName)) + " ", 1), _ctx.status.person && _ctx.status.person.name ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformApprovedBy', _ctx.status.person.name)), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.trialText || _ctx.status.canBuy && _ctx.status.links.buy ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("p", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.trialText) + " ", 1), _ctx.inUseText ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.inUseText), 1)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.status.canBuy && _ctx.status.links.buy ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 1,
    href: _ctx.status.links.buy,
    target: "_blank",
    rel: "noopener noreferrer"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformBuy')), 9, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_7)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.status.connected && _ctx.status.inUse && _ctx.status.inUse.shortLinks === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformFirstShortLink')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: _ctx.builderUrl(_ctx.currentSite)
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('OpenBuilder')), 9, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_9)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_10, [_ctx.status.links.app && !_ctx.confirming ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    class: "btn",
    href: _ctx.status.links.app,
    target: "_blank",
    rel: "noopener noreferrer",
    title: _ctx.tr('PlatformOpenTooltip')
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformOpen')), 9, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_11)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.status.state === 'lost' && _ctx.status.canConnect ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("form", {
    key: 1,
    method: "post",
    action: _ctx.connectAction,
    class: "fwcmp-platform__form"
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "hidden",
    name: "nonce",
    value: _ctx.connectNonce
  }, null, 8, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_13), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_14, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformReconnect')), 1)], 8, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_12)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.confirming ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 2,
    ref: "disconnectButton",
    type: "button",
    class: "btn-flat",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.askDisconnect && _ctx.askDisconnect(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformDisconnect')), 513)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.status.connected ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("section", {
    key: 3,
    class: "fwcmp-platform__sites",
    "aria-label": _ctx.tr('PlatformSitesTitle')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("h3", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformSitesTitle')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformSitesHelp')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ActivityIndicator, {
    loading: _ctx.sitesLoading
  }, null, 8, ["loading"]), _ctx.sitesError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_18, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.sitesError), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.sites.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_20, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformSiteColumn')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformWebsiteColumn')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformMatchColumn')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_21, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('LinkBuilder')), 1)])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.sites, s => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
      key: s.idSite
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(s.name) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.host(s.url)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(s.website ? s.website.name : ''), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
        'fwcmp-platform__none': !s.match
      })
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(`PlatformMatch_${s.match || 'none'}`)), 3), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", null, [s.website ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
      key: 0,
      href: _ctx.builderUrl(s.idSite)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('OpenBuilder')), 9, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_23)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])]);
  }), 128))])])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.sites.length < _ctx.sitesTotal ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 2,
    type: "button",
    class: "btn-flat",
    disabled: _ctx.sitesLoading,
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.loadSites && _ctx.loadSites(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformSitesMore')), 9, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_24)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.sites.some(s => !s.website) && _ctx.status.links.app ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformSitesUnmappedHelp')) + " ", 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    class: "fwcmp-applink",
    href: _ctx.status.links.app,
    target: "_blank",
    rel: "noopener noreferrer",
    title: _ctx.tr('PlatformOpenTooltip')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])("Feinwerk Campaigns"), PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_27], 8, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_26)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 8, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_15)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.confirming ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 4,
    class: "fwcmp-confirm",
    role: "group",
    "aria-label": _ctx.tr('PlatformDisconnect')
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformDisconnectConfirm')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "confirmButton",
    type: "button",
    class: "btn",
    disabled: _ctx.busy,
    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.disconnect && _ctx.disconnect(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformDisconnectYes')), 9, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_29), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    type: "button",
    class: "btn-flat",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.cancelDisconnect && _ctx.cancelDisconnect(...args))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('Cancel')), 1)], 8, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_28)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("p", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformIntro')), 1), _ctx.status.promote ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_PlatformBenefits, {
    key: 0,
    "more-url": _ctx.status.moreUrl || ''
  }, null, 8, ["more-url"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_30, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformWhatIsSent')), 1), _ctx.wordPress ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_31, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformWordPress')), 1)) : _ctx.status.canConnect ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("form", {
    key: 2,
    method: "post",
    action: _ctx.connectAction,
    class: "fwcmp-platform__form"
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    type: "hidden",
    name: "nonce",
    value: _ctx.connectNonce
  }, null, 8, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_33), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    ref: "connectButton",
    type: "submit",
    class: "btn"
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformConnect')), 513)], 8, PlatformConnectionvue_type_template_id_7aa5d9ac_hoisted_32)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64))], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])]);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformConnection.vue?vue&type=template&id=7aa5d9ac

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PlatformConnection.vue?vue&type=script&lang=ts






const PlatformConnectionvue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
const SITES_PAGE = 100;
/* harmony default export */ var PlatformConnectionvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {
    ActivityIndicator: external_CoreHome_["ActivityIndicator"],
    Alert: external_CoreHome_["Alert"],
    PlatformBenefits: PlatformBenefits
  },
  props: {
    connectAction: {
      type: String,
      required: true
    },
    connectNonce: {
      type: String,
      required: true
    },
    wordPress: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status: null,
      loading: false,
      error: '',
      confirming: false,
      busy: false,
      sites: [],
      sitesTotal: 0,
      sitesLoading: false,
      sitesError: ''
    };
  },
  created() {
    this.load();
  },
  computed: {
    /** the site the admin page was opened for (its idSite), for the builder link */
    currentSite() {
      const m = /[?&]idSite=(\d+)/.exec(window.location.search);
      return m ? Number(m[1]) : 1;
    },
    /** during the trial and after it: what this Matomo uses of the platform */
    inUseText() {
      const s = this.status;
      if (!s || !s.inUse || s.state !== 'trial' && s.state !== 'expired' || s.inUse.shortLinks + s.inUse.qrCodes === 0) {
        return '';
      }
      return this.tr('PlatformInUse', `${s.inUse.shortLinks}`, `${s.inUse.qrCodes}`);
    },
    workspaceName() {
      return this.status && this.status.workspace ? this.status.workspace.name : '';
    },
    trialText() {
      const trial = this.status ? this.status.trial : null;
      if (!trial || this.status.state !== 'trial') {
        return '';
      }
      return trial.daysLeft === 1 ? this.tr('PlatformTrialOneDay') : this.tr('PlatformTrialDays', `${trial.daysLeft}`);
    },
    stateKind() {
      const state = this.status ? this.status.state : '';
      return state === 'lost' || state === 'blocked' ? 'error' : 'warning';
    },
    stateMessage() {
      const key = this.status ? REASON_TEXT[this.status.reason] : '';
      return key ? this.tr(key) : '';
    }
  },
  methods: {
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(PlatformConnectionvue_type_script_lang_ts_PREFIX + key, ...args);
    },
    load() {
      this.loading = true;
      this.error = '';
      fetchConnectionStatus().then(status => {
        this.status = status;
        this.sites = [];
        this.sitesTotal = 0;
        if (status.mode === 'connected' && status.connected) {
          this.loadSites();
        }
      }).catch(e => {
        this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
    },
    /** the next page of this Matomo's websites against the workspace's */
    loadSites() {
      this.sitesLoading = true;
      this.sitesError = '';
      fetchPlatformWebsites(SITES_PAGE, this.sites.length).then(answer => {
        this.sites = this.sites.concat(answer.sites);
        this.sitesTotal = answer.total;
      }).catch(e => {
        const {
          text
        } = splitPlatformError(e && e.message ? plainText(e.message) : '');
        this.sitesError = text || this.tr('LoadFailed');
      }).finally(() => {
        this.sitesLoading = false;
      });
    },
    host(url) {
      try {
        return new URL(url).host;
      } catch (e) {
        return url;
      }
    },
    builderUrl(idSite) {
      const q = `idSite=${idSite}&period=day&date=yesterday`;
      return `index.php?module=CoreHome&action=index&${q}#?${q}` + '&category=FeinwerkCampaignManager_Campaigns&subcategory=FeinwerkCampaignManager_LinkBuilder';
    },
    askDisconnect() {
      this.confirming = true;
      this.$nextTick(() => {
        const button = this.$refs.confirmButton;
        if (button) {
          button.focus();
        }
      });
    },
    cancelDisconnect() {
      this.confirming = false;
      this.$nextTick(() => {
        const button = this.$refs.disconnectButton;
        if (button) {
          button.focus();
        }
      });
    },
    disconnect() {
      this.busy = true;
      this.error = '';
      disconnectPlatform().then(status => {
        this.status = status;
        this.confirming = false;
        // the confirmation and its button are gone: on to Connect (UI review F7)
        this.$nextTick(() => {
          const button = this.$refs.connectButton;
          if (button) {
            button.focus();
          }
        });
      }).catch(e => {
        this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.busy = false;
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformConnection.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformConnection.vue



PlatformConnectionvue_type_script_lang_ts.render = PlatformConnectionvue_type_template_id_7aa5d9ac_render

/* harmony default export */ var PlatformConnection = (PlatformConnectionvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PlatformStatus.vue?vue&type=template&id=7c2b4f2c

const PlatformStatusvue_type_template_id_7c2b4f2c_hoisted_1 = {
  key: 0,
  class: "fwcmp-platformstatus"
};
const PlatformStatusvue_type_template_id_7c2b4f2c_hoisted_2 = ["href", "title"];
const PlatformStatusvue_type_template_id_7c2b4f2c_hoisted_3 = ["href"];
const PlatformStatusvue_type_template_id_7c2b4f2c_hoisted_4 = ["href"];
function PlatformStatusvue_type_template_id_7c2b4f2c_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.visible ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", PlatformStatusvue_type_template_id_7c2b4f2c_hoisted_1, [_ctx.status.mode === 'connected' && _ctx.status.connected && _ctx.status.links.app ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    href: _ctx.status.links.app,
    target: "_blank",
    rel: "noopener noreferrer",
    title: _ctx.tr('PlatformOpenTooltip')
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformOpen')), 9, PlatformStatusvue_type_template_id_7c2b4f2c_hoisted_2)) : _ctx.status.mode === 'connected' && _ctx.status.connectUrl ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 1
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(_ctx.shortReason)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: _ctx.status.connectUrl
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr(_ctx.canReconnect(_ctx.status.reason) ? 'PlatformReconnect' : 'PlatformDetails')), 9, PlatformStatusvue_type_template_id_7c2b4f2c_hoisted_3)], 64)) : _ctx.status.mode === 'standalone' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformNotConnected')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
    href: _ctx.status.connectUrl
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.tr('PlatformConnect')), 9, PlatformStatusvue_type_template_id_7c2b4f2c_hoisted_4)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformStatus.vue?vue&type=template&id=7c2b4f2c

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--15-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--1-1!./plugins/FeinwerkCampaignManager/vue/src/PlatformStatus.vue?vue&type=script&lang=ts




const PlatformStatusvue_type_script_lang_ts_PREFIX = 'FeinwerkCampaignManager_';
/* harmony default export */ var PlatformStatusvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    /** not connected: show nothing here, the page offers Connect in its own place */
    hideConnect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status: null
    };
  },
  created() {
    fetchConnectionStatus().then(status => {
      this.status = status;
    }).catch(() => {
      // a status line never shows an error of its own
    });
  },
  computed: {
    shortReason() {
      return this.status && REASON_SHORT[this.status.reason] || 'PlatformInterrupted';
    },
    visible() {
      const s = this.status;
      if (!s) {
        return false;
      }
      if (s.mode === 'connected') {
        return s.connected ? !!s.links.app : !!s.connectUrl;
      }
      return s.mode === 'standalone' && s.canConnect && !!s.connectUrl && !this.hideConnect;
    }
  },
  methods: {
    canReconnect: canReconnect,
    tr(key, ...args) {
      return Object(external_CoreHome_["translate"])(PlatformStatusvue_type_script_lang_ts_PREFIX + key, ...args);
    }
  }
}));
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformStatus.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/PlatformStatus.vue



PlatformStatusvue_type_script_lang_ts.render = PlatformStatusvue_type_template_id_7c2b4f2c_render

/* harmony default export */ var PlatformStatus = (PlatformStatusvue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/FeinwerkCampaignManager/vue/src/index.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */







// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ })

/******/ });
});
//# sourceMappingURL=FeinwerkCampaignManager.umd.js.map