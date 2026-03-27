var Rv=Object.defineProperty;var Cv=(n,e,t)=>e in n?Rv(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var He=(n,e,t)=>Cv(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();var so=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Pv(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var _g={exports:{}},sc={},vg={exports:{}},Ge={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ca=Symbol.for("react.element"),Lv=Symbol.for("react.portal"),Iv=Symbol.for("react.fragment"),Dv=Symbol.for("react.strict_mode"),Nv=Symbol.for("react.profiler"),Uv=Symbol.for("react.provider"),Fv=Symbol.for("react.context"),Ov=Symbol.for("react.forward_ref"),kv=Symbol.for("react.suspense"),Bv=Symbol.for("react.memo"),zv=Symbol.for("react.lazy"),rp=Symbol.iterator;function Vv(n){return n===null||typeof n!="object"?null:(n=rp&&n[rp]||n["@@iterator"],typeof n=="function"?n:null)}var xg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},yg=Object.assign,Sg={};function Js(n,e,t){this.props=n,this.context=e,this.refs=Sg,this.updater=t||xg}Js.prototype.isReactComponent={};Js.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};Js.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function Mg(){}Mg.prototype=Js.prototype;function Ld(n,e,t){this.props=n,this.context=e,this.refs=Sg,this.updater=t||xg}var Id=Ld.prototype=new Mg;Id.constructor=Ld;yg(Id,Js.prototype);Id.isPureReactComponent=!0;var sp=Array.isArray,Eg=Object.prototype.hasOwnProperty,Dd={current:null},wg={key:!0,ref:!0,__self:!0,__source:!0};function Tg(n,e,t){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Eg.call(e,i)&&!wg.hasOwnProperty(i)&&(r[i]=e[i]);var c=arguments.length-2;if(c===1)r.children=t;else if(1<c){for(var u=Array(c),d=0;d<c;d++)u[d]=arguments[d+2];r.children=u}if(n&&n.defaultProps)for(i in c=n.defaultProps,c)r[i]===void 0&&(r[i]=c[i]);return{$$typeof:ca,type:n,key:s,ref:o,props:r,_owner:Dd.current}}function Hv(n,e){return{$$typeof:ca,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function Nd(n){return typeof n=="object"&&n!==null&&n.$$typeof===ca}function Gv(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var op=/\/+/g;function Cc(n,e){return typeof n=="object"&&n!==null&&n.key!=null?Gv(""+n.key):e.toString(36)}function ll(n,e,t,i,r){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case ca:case Lv:o=!0}}if(o)return o=n,r=r(o),n=i===""?"."+Cc(o,0):i,sp(r)?(t="",n!=null&&(t=n.replace(op,"$&/")+"/"),ll(r,e,t,"",function(d){return d})):r!=null&&(Nd(r)&&(r=Hv(r,t+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(op,"$&/")+"/")+n)),e.push(r)),1;if(o=0,i=i===""?".":i+":",sp(n))for(var c=0;c<n.length;c++){s=n[c];var u=i+Cc(s,c);o+=ll(s,e,t,u,r)}else if(u=Vv(n),typeof u=="function")for(n=u.call(n),c=0;!(s=n.next()).done;)s=s.value,u=i+Cc(s,c++),o+=ll(s,e,t,u,r);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function xa(n,e,t){if(n==null)return n;var i=[],r=0;return ll(n,i,"","",function(s){return e.call(t,s,r++)}),i}function Wv(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var un={current:null},cl={transition:null},Xv={ReactCurrentDispatcher:un,ReactCurrentBatchConfig:cl,ReactCurrentOwner:Dd};function Ag(){throw Error("act(...) is not supported in production builds of React.")}Ge.Children={map:xa,forEach:function(n,e,t){xa(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return xa(n,function(){e++}),e},toArray:function(n){return xa(n,function(e){return e})||[]},only:function(n){if(!Nd(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};Ge.Component=Js;Ge.Fragment=Iv;Ge.Profiler=Nv;Ge.PureComponent=Ld;Ge.StrictMode=Dv;Ge.Suspense=kv;Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xv;Ge.act=Ag;Ge.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=yg({},n.props),r=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Dd.current),e.key!==void 0&&(r=""+e.key),n.type&&n.type.defaultProps)var c=n.type.defaultProps;for(u in e)Eg.call(e,u)&&!wg.hasOwnProperty(u)&&(i[u]=e[u]===void 0&&c!==void 0?c[u]:e[u])}var u=arguments.length-2;if(u===1)i.children=t;else if(1<u){c=Array(u);for(var d=0;d<u;d++)c[d]=arguments[d+2];i.children=c}return{$$typeof:ca,type:n.type,key:r,ref:s,props:i,_owner:o}};Ge.createContext=function(n){return n={$$typeof:Fv,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:Uv,_context:n},n.Consumer=n};Ge.createElement=Tg;Ge.createFactory=function(n){var e=Tg.bind(null,n);return e.type=n,e};Ge.createRef=function(){return{current:null}};Ge.forwardRef=function(n){return{$$typeof:Ov,render:n}};Ge.isValidElement=Nd;Ge.lazy=function(n){return{$$typeof:zv,_payload:{_status:-1,_result:n},_init:Wv}};Ge.memo=function(n,e){return{$$typeof:Bv,type:n,compare:e===void 0?null:e}};Ge.startTransition=function(n){var e=cl.transition;cl.transition={};try{n()}finally{cl.transition=e}};Ge.unstable_act=Ag;Ge.useCallback=function(n,e){return un.current.useCallback(n,e)};Ge.useContext=function(n){return un.current.useContext(n)};Ge.useDebugValue=function(){};Ge.useDeferredValue=function(n){return un.current.useDeferredValue(n)};Ge.useEffect=function(n,e){return un.current.useEffect(n,e)};Ge.useId=function(){return un.current.useId()};Ge.useImperativeHandle=function(n,e,t){return un.current.useImperativeHandle(n,e,t)};Ge.useInsertionEffect=function(n,e){return un.current.useInsertionEffect(n,e)};Ge.useLayoutEffect=function(n,e){return un.current.useLayoutEffect(n,e)};Ge.useMemo=function(n,e){return un.current.useMemo(n,e)};Ge.useReducer=function(n,e,t){return un.current.useReducer(n,e,t)};Ge.useRef=function(n){return un.current.useRef(n)};Ge.useState=function(n){return un.current.useState(n)};Ge.useSyncExternalStore=function(n,e,t){return un.current.useSyncExternalStore(n,e,t)};Ge.useTransition=function(){return un.current.useTransition()};Ge.version="18.3.1";vg.exports=Ge;var Ne=vg.exports;const bg=Pv(Ne);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jv=Ne,qv=Symbol.for("react.element"),Yv=Symbol.for("react.fragment"),$v=Object.prototype.hasOwnProperty,Kv=jv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Zv={key:!0,ref:!0,__self:!0,__source:!0};function Rg(n,e,t){var i,r={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)$v.call(e,i)&&!Zv.hasOwnProperty(i)&&(r[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:qv,type:n,key:s,ref:o,props:r,_owner:Kv.current}}sc.Fragment=Yv;sc.jsx=Rg;sc.jsxs=Rg;_g.exports=sc;var j=_g.exports,zu={},Cg={exports:{}},Ln={},Pg={exports:{}},Lg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(V,q){var J=V.length;V.push(q);e:for(;0<J;){var ae=J-1>>>1,re=V[ae];if(0<r(re,q))V[ae]=q,V[J]=re,J=ae;else break e}}function t(V){return V.length===0?null:V[0]}function i(V){if(V.length===0)return null;var q=V[0],J=V.pop();if(J!==q){V[0]=J;e:for(var ae=0,re=V.length,Pe=re>>>1;ae<Pe;){var Je=2*(ae+1)-1,nt=V[Je],K=Je+1,ie=V[K];if(0>r(nt,J))K<re&&0>r(ie,nt)?(V[ae]=ie,V[K]=J,ae=K):(V[ae]=nt,V[Je]=J,ae=Je);else if(K<re&&0>r(ie,J))V[ae]=ie,V[K]=J,ae=K;else break e}}return q}function r(V,q){var J=V.sortIndex-q.sortIndex;return J!==0?J:V.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,c=o.now();n.unstable_now=function(){return o.now()-c}}var u=[],d=[],_=1,a=null,l=3,h=!1,m=!1,x=!1,p=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(V){for(var q=t(d);q!==null;){if(q.callback===null)i(d);else if(q.startTime<=V)i(d),q.sortIndex=q.expirationTime,e(u,q);else break;q=t(d)}}function S(V){if(x=!1,v(V),!m)if(t(u)!==null)m=!0,G(A);else{var q=t(d);q!==null&&O(S,q.startTime-V)}}function A(V,q){m=!1,x&&(x=!1,f(y),y=-1),h=!0;var J=l;try{for(v(q),a=t(u);a!==null&&(!(a.expirationTime>q)||V&&!C());){var ae=a.callback;if(typeof ae=="function"){a.callback=null,l=a.priorityLevel;var re=ae(a.expirationTime<=q);q=n.unstable_now(),typeof re=="function"?a.callback=re:a===t(u)&&i(u),v(q)}else i(u);a=t(u)}if(a!==null)var Pe=!0;else{var Je=t(d);Je!==null&&O(S,Je.startTime-q),Pe=!1}return Pe}finally{a=null,l=J,h=!1}}var T=!1,b=null,y=-1,E=5,I=-1;function C(){return!(n.unstable_now()-I<E)}function U(){if(b!==null){var V=n.unstable_now();I=V;var q=!0;try{q=b(!0,V)}finally{q?k():(T=!1,b=null)}}else T=!1}var k;if(typeof g=="function")k=function(){g(U)};else if(typeof MessageChannel<"u"){var W=new MessageChannel,B=W.port2;W.port1.onmessage=U,k=function(){B.postMessage(null)}}else k=function(){p(U,0)};function G(V){b=V,T||(T=!0,k())}function O(V,q){y=p(function(){V(n.unstable_now())},q)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(V){V.callback=null},n.unstable_continueExecution=function(){m||h||(m=!0,G(A))},n.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<V?Math.floor(1e3/V):5},n.unstable_getCurrentPriorityLevel=function(){return l},n.unstable_getFirstCallbackNode=function(){return t(u)},n.unstable_next=function(V){switch(l){case 1:case 2:case 3:var q=3;break;default:q=l}var J=l;l=q;try{return V()}finally{l=J}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(V,q){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var J=l;l=V;try{return q()}finally{l=J}},n.unstable_scheduleCallback=function(V,q,J){var ae=n.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?ae+J:ae):J=ae,V){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=J+re,V={id:_++,callback:q,priorityLevel:V,startTime:J,expirationTime:re,sortIndex:-1},J>ae?(V.sortIndex=J,e(d,V),t(u)===null&&V===t(d)&&(x?(f(y),y=-1):x=!0,O(S,J-ae))):(V.sortIndex=re,e(u,V),m||h||(m=!0,G(A))),V},n.unstable_shouldYield=C,n.unstable_wrapCallback=function(V){var q=l;return function(){var J=l;l=q;try{return V.apply(this,arguments)}finally{l=J}}}})(Lg);Pg.exports=Lg;var Jv=Pg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qv=Ne,Pn=Jv;function ee(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ig=new Set,Ho={};function Qr(n,e){Bs(n,e),Bs(n+"Capture",e)}function Bs(n,e){for(Ho[n]=e,n=0;n<e.length;n++)Ig.add(e[n])}var Hi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Vu=Object.prototype.hasOwnProperty,ex=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ap={},lp={};function tx(n){return Vu.call(lp,n)?!0:Vu.call(ap,n)?!1:ex.test(n)?lp[n]=!0:(ap[n]=!0,!1)}function nx(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function ix(n,e,t,i){if(e===null||typeof e>"u"||nx(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function fn(n,e,t,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var $t={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){$t[n]=new fn(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];$t[e]=new fn(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){$t[n]=new fn(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){$t[n]=new fn(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){$t[n]=new fn(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){$t[n]=new fn(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){$t[n]=new fn(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){$t[n]=new fn(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){$t[n]=new fn(n,5,!1,n.toLowerCase(),null,!1,!1)});var Ud=/[\-:]([a-z])/g;function Fd(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(Ud,Fd);$t[e]=new fn(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(Ud,Fd);$t[e]=new fn(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(Ud,Fd);$t[e]=new fn(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){$t[n]=new fn(n,1,!1,n.toLowerCase(),null,!1,!1)});$t.xlinkHref=new fn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){$t[n]=new fn(n,1,!1,n.toLowerCase(),null,!0,!0)});function Od(n,e,t,i){var r=$t.hasOwnProperty(e)?$t[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(ix(e,t,r,i)&&(t=null),i||r===null?tx(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):r.mustUseProperty?n[r.propertyName]=t===null?r.type===3?!1:"":t:(e=r.attributeName,i=r.attributeNamespace,t===null?n.removeAttribute(e):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var Yi=Qv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ya=Symbol.for("react.element"),xs=Symbol.for("react.portal"),ys=Symbol.for("react.fragment"),kd=Symbol.for("react.strict_mode"),Hu=Symbol.for("react.profiler"),Dg=Symbol.for("react.provider"),Ng=Symbol.for("react.context"),Bd=Symbol.for("react.forward_ref"),Gu=Symbol.for("react.suspense"),Wu=Symbol.for("react.suspense_list"),zd=Symbol.for("react.memo"),rr=Symbol.for("react.lazy"),Ug=Symbol.for("react.offscreen"),cp=Symbol.iterator;function oo(n){return n===null||typeof n!="object"?null:(n=cp&&n[cp]||n["@@iterator"],typeof n=="function"?n:null)}var yt=Object.assign,Pc;function wo(n){if(Pc===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);Pc=e&&e[1]||""}return`
`+Pc+n}var Lc=!1;function Ic(n,e){if(!n||Lc)return"";Lc=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(d){var i=d}Reflect.construct(n,[],e)}else{try{e.call()}catch(d){i=d}n.call(e.prototype)}else{try{throw Error()}catch(d){i=d}n()}}catch(d){if(d&&i&&typeof d.stack=="string"){for(var r=d.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,c=s.length-1;1<=o&&0<=c&&r[o]!==s[c];)c--;for(;1<=o&&0<=c;o--,c--)if(r[o]!==s[c]){if(o!==1||c!==1)do if(o--,c--,0>c||r[o]!==s[c]){var u=`
`+r[o].replace(" at new "," at ");return n.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",n.displayName)),u}while(1<=o&&0<=c);break}}}finally{Lc=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?wo(n):""}function rx(n){switch(n.tag){case 5:return wo(n.type);case 16:return wo("Lazy");case 13:return wo("Suspense");case 19:return wo("SuspenseList");case 0:case 2:case 15:return n=Ic(n.type,!1),n;case 11:return n=Ic(n.type.render,!1),n;case 1:return n=Ic(n.type,!0),n;default:return""}}function Xu(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case ys:return"Fragment";case xs:return"Portal";case Hu:return"Profiler";case kd:return"StrictMode";case Gu:return"Suspense";case Wu:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case Ng:return(n.displayName||"Context")+".Consumer";case Dg:return(n._context.displayName||"Context")+".Provider";case Bd:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case zd:return e=n.displayName||null,e!==null?e:Xu(n.type)||"Memo";case rr:e=n._payload,n=n._init;try{return Xu(n(e))}catch{}}return null}function sx(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Xu(e);case 8:return e===kd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Sr(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Fg(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function ox(n){var e=Fg(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Sa(n){n._valueTracker||(n._valueTracker=ox(n))}function Og(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=Fg(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function Pl(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function ju(n,e){var t=e.checked;return yt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function up(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=Sr(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function kg(n,e){e=e.checked,e!=null&&Od(n,"checked",e,!1)}function qu(n,e){kg(n,e);var t=Sr(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?Yu(n,e.type,t):e.hasOwnProperty("defaultValue")&&Yu(n,e.type,Sr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function fp(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function Yu(n,e,t){(e!=="number"||Pl(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var To=Array.isArray;function Ls(n,e,t,i){if(n=n.options,e){e={};for(var r=0;r<t.length;r++)e["$"+t[r]]=!0;for(t=0;t<n.length;t++)r=e.hasOwnProperty("$"+n[t].value),n[t].selected!==r&&(n[t].selected=r),r&&i&&(n[t].defaultSelected=!0)}else{for(t=""+Sr(t),e=null,r=0;r<n.length;r++){if(n[r].value===t){n[r].selected=!0,i&&(n[r].defaultSelected=!0);return}e!==null||n[r].disabled||(e=n[r])}e!==null&&(e.selected=!0)}}function $u(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ee(91));return yt({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function dp(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(ee(92));if(To(t)){if(1<t.length)throw Error(ee(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:Sr(t)}}function Bg(n,e){var t=Sr(e.value),i=Sr(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function hp(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function zg(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ku(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?zg(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ma,Vg=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,r){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,r)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(Ma=Ma||document.createElement("div"),Ma.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ma.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Go(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var Lo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ax=["Webkit","ms","Moz","O"];Object.keys(Lo).forEach(function(n){ax.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Lo[e]=Lo[n]})});function Hg(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||Lo.hasOwnProperty(n)&&Lo[n]?(""+e).trim():e+"px"}function Gg(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=Hg(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,r):n[t]=r}}var lx=yt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Zu(n,e){if(e){if(lx[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ee(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ee(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ee(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ee(62))}}function Ju(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Qu=null;function Vd(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var ef=null,Is=null,Ds=null;function pp(n){if(n=da(n)){if(typeof ef!="function")throw Error(ee(280));var e=n.stateNode;e&&(e=uc(e),ef(n.stateNode,n.type,e))}}function Wg(n){Is?Ds?Ds.push(n):Ds=[n]:Is=n}function Xg(){if(Is){var n=Is,e=Ds;if(Ds=Is=null,pp(n),e)for(n=0;n<e.length;n++)pp(e[n])}}function jg(n,e){return n(e)}function qg(){}var Dc=!1;function Yg(n,e,t){if(Dc)return n(e,t);Dc=!0;try{return jg(n,e,t)}finally{Dc=!1,(Is!==null||Ds!==null)&&(qg(),Xg())}}function Wo(n,e){var t=n.stateNode;if(t===null)return null;var i=uc(t);if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(ee(231,e,typeof t));return t}var tf=!1;if(Hi)try{var ao={};Object.defineProperty(ao,"passive",{get:function(){tf=!0}}),window.addEventListener("test",ao,ao),window.removeEventListener("test",ao,ao)}catch{tf=!1}function cx(n,e,t,i,r,s,o,c,u){var d=Array.prototype.slice.call(arguments,3);try{e.apply(t,d)}catch(_){this.onError(_)}}var Io=!1,Ll=null,Il=!1,nf=null,ux={onError:function(n){Io=!0,Ll=n}};function fx(n,e,t,i,r,s,o,c,u){Io=!1,Ll=null,cx.apply(ux,arguments)}function dx(n,e,t,i,r,s,o,c,u){if(fx.apply(this,arguments),Io){if(Io){var d=Ll;Io=!1,Ll=null}else throw Error(ee(198));Il||(Il=!0,nf=d)}}function es(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function $g(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function mp(n){if(es(n)!==n)throw Error(ee(188))}function hx(n){var e=n.alternate;if(!e){if(e=es(n),e===null)throw Error(ee(188));return e!==n?null:n}for(var t=n,i=e;;){var r=t.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===t)return mp(r),n;if(s===i)return mp(r),e;s=s.sibling}throw Error(ee(188))}if(t.return!==i.return)t=r,i=s;else{for(var o=!1,c=r.child;c;){if(c===t){o=!0,t=r,i=s;break}if(c===i){o=!0,i=r,t=s;break}c=c.sibling}if(!o){for(c=s.child;c;){if(c===t){o=!0,t=s,i=r;break}if(c===i){o=!0,i=s,t=r;break}c=c.sibling}if(!o)throw Error(ee(189))}}if(t.alternate!==i)throw Error(ee(190))}if(t.tag!==3)throw Error(ee(188));return t.stateNode.current===t?n:e}function Kg(n){return n=hx(n),n!==null?Zg(n):null}function Zg(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=Zg(n);if(e!==null)return e;n=n.sibling}return null}var Jg=Pn.unstable_scheduleCallback,gp=Pn.unstable_cancelCallback,px=Pn.unstable_shouldYield,mx=Pn.unstable_requestPaint,Rt=Pn.unstable_now,gx=Pn.unstable_getCurrentPriorityLevel,Hd=Pn.unstable_ImmediatePriority,Qg=Pn.unstable_UserBlockingPriority,Dl=Pn.unstable_NormalPriority,_x=Pn.unstable_LowPriority,e_=Pn.unstable_IdlePriority,oc=null,gi=null;function vx(n){if(gi&&typeof gi.onCommitFiberRoot=="function")try{gi.onCommitFiberRoot(oc,n,void 0,(n.current.flags&128)===128)}catch{}}var ti=Math.clz32?Math.clz32:Sx,xx=Math.log,yx=Math.LN2;function Sx(n){return n>>>=0,n===0?32:31-(xx(n)/yx|0)|0}var Ea=64,wa=4194304;function Ao(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Nl(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,r=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var c=o&~r;c!==0?i=Ao(c):(s&=o,s!==0&&(i=Ao(s)))}else o=t&~r,o!==0?i=Ao(o):s!==0&&(i=Ao(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-ti(e),r=1<<t,i|=n[t],e&=~r;return i}function Mx(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ex(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,r=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-ti(s),c=1<<o,u=r[o];u===-1?(!(c&t)||c&i)&&(r[o]=Mx(c,e)):u<=e&&(n.expiredLanes|=c),s&=~c}}function rf(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function t_(){var n=Ea;return Ea<<=1,!(Ea&4194240)&&(Ea=64),n}function Nc(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function ua(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-ti(e),n[e]=t}function wx(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var r=31-ti(t),s=1<<r;e[r]=0,i[r]=-1,n[r]=-1,t&=~s}}function Gd(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-ti(t),r=1<<i;r&e|n[i]&e&&(n[i]|=e),t&=~r}}var ot=0;function n_(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var i_,Wd,r_,s_,o_,sf=!1,Ta=[],dr=null,hr=null,pr=null,Xo=new Map,jo=new Map,or=[],Tx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _p(n,e){switch(n){case"focusin":case"focusout":dr=null;break;case"dragenter":case"dragleave":hr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":Xo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":jo.delete(e.pointerId)}}function lo(n,e,t,i,r,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=da(e),e!==null&&Wd(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),n)}function Ax(n,e,t,i,r){switch(e){case"focusin":return dr=lo(dr,n,e,t,i,r),!0;case"dragenter":return hr=lo(hr,n,e,t,i,r),!0;case"mouseover":return pr=lo(pr,n,e,t,i,r),!0;case"pointerover":var s=r.pointerId;return Xo.set(s,lo(Xo.get(s)||null,n,e,t,i,r)),!0;case"gotpointercapture":return s=r.pointerId,jo.set(s,lo(jo.get(s)||null,n,e,t,i,r)),!0}return!1}function a_(n){var e=zr(n.target);if(e!==null){var t=es(e);if(t!==null){if(e=t.tag,e===13){if(e=$g(t),e!==null){n.blockedOn=e,o_(n.priority,function(){r_(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function ul(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=of(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);Qu=i,t.target.dispatchEvent(i),Qu=null}else return e=da(t),e!==null&&Wd(e),n.blockedOn=t,!1;e.shift()}return!0}function vp(n,e,t){ul(n)&&t.delete(e)}function bx(){sf=!1,dr!==null&&ul(dr)&&(dr=null),hr!==null&&ul(hr)&&(hr=null),pr!==null&&ul(pr)&&(pr=null),Xo.forEach(vp),jo.forEach(vp)}function co(n,e){n.blockedOn===e&&(n.blockedOn=null,sf||(sf=!0,Pn.unstable_scheduleCallback(Pn.unstable_NormalPriority,bx)))}function qo(n){function e(r){return co(r,n)}if(0<Ta.length){co(Ta[0],n);for(var t=1;t<Ta.length;t++){var i=Ta[t];i.blockedOn===n&&(i.blockedOn=null)}}for(dr!==null&&co(dr,n),hr!==null&&co(hr,n),pr!==null&&co(pr,n),Xo.forEach(e),jo.forEach(e),t=0;t<or.length;t++)i=or[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<or.length&&(t=or[0],t.blockedOn===null);)a_(t),t.blockedOn===null&&or.shift()}var Ns=Yi.ReactCurrentBatchConfig,Ul=!0;function Rx(n,e,t,i){var r=ot,s=Ns.transition;Ns.transition=null;try{ot=1,Xd(n,e,t,i)}finally{ot=r,Ns.transition=s}}function Cx(n,e,t,i){var r=ot,s=Ns.transition;Ns.transition=null;try{ot=4,Xd(n,e,t,i)}finally{ot=r,Ns.transition=s}}function Xd(n,e,t,i){if(Ul){var r=of(n,e,t,i);if(r===null)Wc(n,e,i,Fl,t),_p(n,i);else if(Ax(r,n,e,t,i))i.stopPropagation();else if(_p(n,i),e&4&&-1<Tx.indexOf(n)){for(;r!==null;){var s=da(r);if(s!==null&&i_(s),s=of(n,e,t,i),s===null&&Wc(n,e,i,Fl,t),s===r)break;r=s}r!==null&&i.stopPropagation()}else Wc(n,e,i,null,t)}}var Fl=null;function of(n,e,t,i){if(Fl=null,n=Vd(i),n=zr(n),n!==null)if(e=es(n),e===null)n=null;else if(t=e.tag,t===13){if(n=$g(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Fl=n,null}function l_(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gx()){case Hd:return 1;case Qg:return 4;case Dl:case _x:return 16;case e_:return 536870912;default:return 16}default:return 16}}var cr=null,jd=null,fl=null;function c_(){if(fl)return fl;var n,e=jd,t=e.length,i,r="value"in cr?cr.value:cr.textContent,s=r.length;for(n=0;n<t&&e[n]===r[n];n++);var o=t-n;for(i=1;i<=o&&e[t-i]===r[s-i];i++);return fl=r.slice(n,1<i?1-i:void 0)}function dl(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function Aa(){return!0}function xp(){return!1}function In(n){function e(t,i,r,s,o){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var c in n)n.hasOwnProperty(c)&&(t=n[c],this[c]=t?t(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Aa:xp,this.isPropagationStopped=xp,this}return yt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Aa)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Aa)},persist:function(){},isPersistent:Aa}),e}var Qs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qd=In(Qs),fa=yt({},Qs,{view:0,detail:0}),Px=In(fa),Uc,Fc,uo,ac=yt({},fa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Yd,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==uo&&(uo&&n.type==="mousemove"?(Uc=n.screenX-uo.screenX,Fc=n.screenY-uo.screenY):Fc=Uc=0,uo=n),Uc)},movementY:function(n){return"movementY"in n?n.movementY:Fc}}),yp=In(ac),Lx=yt({},ac,{dataTransfer:0}),Ix=In(Lx),Dx=yt({},fa,{relatedTarget:0}),Oc=In(Dx),Nx=yt({},Qs,{animationName:0,elapsedTime:0,pseudoElement:0}),Ux=In(Nx),Fx=yt({},Qs,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),Ox=In(Fx),kx=yt({},Qs,{data:0}),Sp=In(kx),Bx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},zx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Vx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Hx(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=Vx[n])?!!e[n]:!1}function Yd(){return Hx}var Gx=yt({},fa,{key:function(n){if(n.key){var e=Bx[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=dl(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?zx[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Yd,charCode:function(n){return n.type==="keypress"?dl(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?dl(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),Wx=In(Gx),Xx=yt({},ac,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mp=In(Xx),jx=yt({},fa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Yd}),qx=In(jx),Yx=yt({},Qs,{propertyName:0,elapsedTime:0,pseudoElement:0}),$x=In(Yx),Kx=yt({},ac,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Zx=In(Kx),Jx=[9,13,27,32],$d=Hi&&"CompositionEvent"in window,Do=null;Hi&&"documentMode"in document&&(Do=document.documentMode);var Qx=Hi&&"TextEvent"in window&&!Do,u_=Hi&&(!$d||Do&&8<Do&&11>=Do),Ep=" ",wp=!1;function f_(n,e){switch(n){case"keyup":return Jx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function d_(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Ss=!1;function ey(n,e){switch(n){case"compositionend":return d_(e);case"keypress":return e.which!==32?null:(wp=!0,Ep);case"textInput":return n=e.data,n===Ep&&wp?null:n;default:return null}}function ty(n,e){if(Ss)return n==="compositionend"||!$d&&f_(n,e)?(n=c_(),fl=jd=cr=null,Ss=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return u_&&e.locale!=="ko"?null:e.data;default:return null}}var ny={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tp(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!ny[n.type]:e==="textarea"}function h_(n,e,t,i){Wg(i),e=Ol(e,"onChange"),0<e.length&&(t=new qd("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var No=null,Yo=null;function iy(n){w_(n,0)}function lc(n){var e=ws(n);if(Og(e))return n}function ry(n,e){if(n==="change")return e}var p_=!1;if(Hi){var kc;if(Hi){var Bc="oninput"in document;if(!Bc){var Ap=document.createElement("div");Ap.setAttribute("oninput","return;"),Bc=typeof Ap.oninput=="function"}kc=Bc}else kc=!1;p_=kc&&(!document.documentMode||9<document.documentMode)}function bp(){No&&(No.detachEvent("onpropertychange",m_),Yo=No=null)}function m_(n){if(n.propertyName==="value"&&lc(Yo)){var e=[];h_(e,Yo,n,Vd(n)),Yg(iy,e)}}function sy(n,e,t){n==="focusin"?(bp(),No=e,Yo=t,No.attachEvent("onpropertychange",m_)):n==="focusout"&&bp()}function oy(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return lc(Yo)}function ay(n,e){if(n==="click")return lc(e)}function ly(n,e){if(n==="input"||n==="change")return lc(e)}function cy(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var ii=typeof Object.is=="function"?Object.is:cy;function $o(n,e){if(ii(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!Vu.call(e,r)||!ii(n[r],e[r]))return!1}return!0}function Rp(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Cp(n,e){var t=Rp(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Rp(t)}}function g_(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?g_(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function __(){for(var n=window,e=Pl();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=Pl(n.document)}return e}function Kd(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function uy(n){var e=__(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&g_(t.ownerDocument.documentElement,t)){if(i!==null&&Kd(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var r=t.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!n.extend&&s>i&&(r=i,i=s,s=r),r=Cp(t,s);var o=Cp(t,i);r&&o&&(n.rangeCount!==1||n.anchorNode!==r.node||n.anchorOffset!==r.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),n.removeAllRanges(),s>i?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var fy=Hi&&"documentMode"in document&&11>=document.documentMode,Ms=null,af=null,Uo=null,lf=!1;function Pp(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;lf||Ms==null||Ms!==Pl(i)||(i=Ms,"selectionStart"in i&&Kd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Uo&&$o(Uo,i)||(Uo=i,i=Ol(af,"onSelect"),0<i.length&&(e=new qd("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=Ms)))}function ba(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var Es={animationend:ba("Animation","AnimationEnd"),animationiteration:ba("Animation","AnimationIteration"),animationstart:ba("Animation","AnimationStart"),transitionend:ba("Transition","TransitionEnd")},zc={},v_={};Hi&&(v_=document.createElement("div").style,"AnimationEvent"in window||(delete Es.animationend.animation,delete Es.animationiteration.animation,delete Es.animationstart.animation),"TransitionEvent"in window||delete Es.transitionend.transition);function cc(n){if(zc[n])return zc[n];if(!Es[n])return n;var e=Es[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in v_)return zc[n]=e[t];return n}var x_=cc("animationend"),y_=cc("animationiteration"),S_=cc("animationstart"),M_=cc("transitionend"),E_=new Map,Lp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function wr(n,e){E_.set(n,e),Qr(e,[n])}for(var Vc=0;Vc<Lp.length;Vc++){var Hc=Lp[Vc],dy=Hc.toLowerCase(),hy=Hc[0].toUpperCase()+Hc.slice(1);wr(dy,"on"+hy)}wr(x_,"onAnimationEnd");wr(y_,"onAnimationIteration");wr(S_,"onAnimationStart");wr("dblclick","onDoubleClick");wr("focusin","onFocus");wr("focusout","onBlur");wr(M_,"onTransitionEnd");Bs("onMouseEnter",["mouseout","mouseover"]);Bs("onMouseLeave",["mouseout","mouseover"]);Bs("onPointerEnter",["pointerout","pointerover"]);Bs("onPointerLeave",["pointerout","pointerover"]);Qr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),py=new Set("cancel close invalid load scroll toggle".split(" ").concat(bo));function Ip(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,dx(i,e,void 0,n),n.currentTarget=null}function w_(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var c=i[o],u=c.instance,d=c.currentTarget;if(c=c.listener,u!==s&&r.isPropagationStopped())break e;Ip(r,c,d),s=u}else for(o=0;o<i.length;o++){if(c=i[o],u=c.instance,d=c.currentTarget,c=c.listener,u!==s&&r.isPropagationStopped())break e;Ip(r,c,d),s=u}}}if(Il)throw n=nf,Il=!1,nf=null,n}function mt(n,e){var t=e[hf];t===void 0&&(t=e[hf]=new Set);var i=n+"__bubble";t.has(i)||(T_(e,n,2,!1),t.add(i))}function Gc(n,e,t){var i=0;e&&(i|=4),T_(t,n,i,e)}var Ra="_reactListening"+Math.random().toString(36).slice(2);function Ko(n){if(!n[Ra]){n[Ra]=!0,Ig.forEach(function(t){t!=="selectionchange"&&(py.has(t)||Gc(t,!1,n),Gc(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Ra]||(e[Ra]=!0,Gc("selectionchange",!1,e))}}function T_(n,e,t,i){switch(l_(e)){case 1:var r=Rx;break;case 4:r=Cx;break;default:r=Xd}t=r.bind(null,e,t,n),r=void 0,!tf||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?n.addEventListener(e,t,{capture:!0,passive:r}):n.addEventListener(e,t,!0):r!==void 0?n.addEventListener(e,t,{passive:r}):n.addEventListener(e,t,!1)}function Wc(n,e,t,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var c=i.stateNode.containerInfo;if(c===r||c.nodeType===8&&c.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===r||u.nodeType===8&&u.parentNode===r))return;o=o.return}for(;c!==null;){if(o=zr(c),o===null)return;if(u=o.tag,u===5||u===6){i=s=o;continue e}c=c.parentNode}}i=i.return}Yg(function(){var d=s,_=Vd(t),a=[];e:{var l=E_.get(n);if(l!==void 0){var h=qd,m=n;switch(n){case"keypress":if(dl(t)===0)break e;case"keydown":case"keyup":h=Wx;break;case"focusin":m="focus",h=Oc;break;case"focusout":m="blur",h=Oc;break;case"beforeblur":case"afterblur":h=Oc;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=yp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Ix;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=qx;break;case x_:case y_:case S_:h=Ux;break;case M_:h=$x;break;case"scroll":h=Px;break;case"wheel":h=Zx;break;case"copy":case"cut":case"paste":h=Ox;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=Mp}var x=(e&4)!==0,p=!x&&n==="scroll",f=x?l!==null?l+"Capture":null:l;x=[];for(var g=d,v;g!==null;){v=g;var S=v.stateNode;if(v.tag===5&&S!==null&&(v=S,f!==null&&(S=Wo(g,f),S!=null&&x.push(Zo(g,S,v)))),p)break;g=g.return}0<x.length&&(l=new h(l,m,null,t,_),a.push({event:l,listeners:x}))}}if(!(e&7)){e:{if(l=n==="mouseover"||n==="pointerover",h=n==="mouseout"||n==="pointerout",l&&t!==Qu&&(m=t.relatedTarget||t.fromElement)&&(zr(m)||m[Gi]))break e;if((h||l)&&(l=_.window===_?_:(l=_.ownerDocument)?l.defaultView||l.parentWindow:window,h?(m=t.relatedTarget||t.toElement,h=d,m=m?zr(m):null,m!==null&&(p=es(m),m!==p||m.tag!==5&&m.tag!==6)&&(m=null)):(h=null,m=d),h!==m)){if(x=yp,S="onMouseLeave",f="onMouseEnter",g="mouse",(n==="pointerout"||n==="pointerover")&&(x=Mp,S="onPointerLeave",f="onPointerEnter",g="pointer"),p=h==null?l:ws(h),v=m==null?l:ws(m),l=new x(S,g+"leave",h,t,_),l.target=p,l.relatedTarget=v,S=null,zr(_)===d&&(x=new x(f,g+"enter",m,t,_),x.target=v,x.relatedTarget=p,S=x),p=S,h&&m)t:{for(x=h,f=m,g=0,v=x;v;v=is(v))g++;for(v=0,S=f;S;S=is(S))v++;for(;0<g-v;)x=is(x),g--;for(;0<v-g;)f=is(f),v--;for(;g--;){if(x===f||f!==null&&x===f.alternate)break t;x=is(x),f=is(f)}x=null}else x=null;h!==null&&Dp(a,l,h,x,!1),m!==null&&p!==null&&Dp(a,p,m,x,!0)}}e:{if(l=d?ws(d):window,h=l.nodeName&&l.nodeName.toLowerCase(),h==="select"||h==="input"&&l.type==="file")var A=ry;else if(Tp(l))if(p_)A=ly;else{A=oy;var T=sy}else(h=l.nodeName)&&h.toLowerCase()==="input"&&(l.type==="checkbox"||l.type==="radio")&&(A=ay);if(A&&(A=A(n,d))){h_(a,A,t,_);break e}T&&T(n,l,d),n==="focusout"&&(T=l._wrapperState)&&T.controlled&&l.type==="number"&&Yu(l,"number",l.value)}switch(T=d?ws(d):window,n){case"focusin":(Tp(T)||T.contentEditable==="true")&&(Ms=T,af=d,Uo=null);break;case"focusout":Uo=af=Ms=null;break;case"mousedown":lf=!0;break;case"contextmenu":case"mouseup":case"dragend":lf=!1,Pp(a,t,_);break;case"selectionchange":if(fy)break;case"keydown":case"keyup":Pp(a,t,_)}var b;if($d)e:{switch(n){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Ss?f_(n,t)&&(y="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(y="onCompositionStart");y&&(u_&&t.locale!=="ko"&&(Ss||y!=="onCompositionStart"?y==="onCompositionEnd"&&Ss&&(b=c_()):(cr=_,jd="value"in cr?cr.value:cr.textContent,Ss=!0)),T=Ol(d,y),0<T.length&&(y=new Sp(y,n,null,t,_),a.push({event:y,listeners:T}),b?y.data=b:(b=d_(t),b!==null&&(y.data=b)))),(b=Qx?ey(n,t):ty(n,t))&&(d=Ol(d,"onBeforeInput"),0<d.length&&(_=new Sp("onBeforeInput","beforeinput",null,t,_),a.push({event:_,listeners:d}),_.data=b))}w_(a,e)})}function Zo(n,e,t){return{instance:n,listener:e,currentTarget:t}}function Ol(n,e){for(var t=e+"Capture",i=[];n!==null;){var r=n,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Wo(n,t),s!=null&&i.unshift(Zo(n,s,r)),s=Wo(n,e),s!=null&&i.push(Zo(n,s,r))),n=n.return}return i}function is(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Dp(n,e,t,i,r){for(var s=e._reactName,o=[];t!==null&&t!==i;){var c=t,u=c.alternate,d=c.stateNode;if(u!==null&&u===i)break;c.tag===5&&d!==null&&(c=d,r?(u=Wo(t,s),u!=null&&o.unshift(Zo(t,u,c))):r||(u=Wo(t,s),u!=null&&o.push(Zo(t,u,c)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var my=/\r\n?/g,gy=/\u0000|\uFFFD/g;function Np(n){return(typeof n=="string"?n:""+n).replace(my,`
`).replace(gy,"")}function Ca(n,e,t){if(e=Np(e),Np(n)!==e&&t)throw Error(ee(425))}function kl(){}var cf=null,uf=null;function ff(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var df=typeof setTimeout=="function"?setTimeout:void 0,_y=typeof clearTimeout=="function"?clearTimeout:void 0,Up=typeof Promise=="function"?Promise:void 0,vy=typeof queueMicrotask=="function"?queueMicrotask:typeof Up<"u"?function(n){return Up.resolve(null).then(n).catch(xy)}:df;function xy(n){setTimeout(function(){throw n})}function Xc(n,e){var t=e,i=0;do{var r=t.nextSibling;if(n.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){n.removeChild(r),qo(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);qo(e)}function mr(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function Fp(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var eo=Math.random().toString(36).slice(2),di="__reactFiber$"+eo,Jo="__reactProps$"+eo,Gi="__reactContainer$"+eo,hf="__reactEvents$"+eo,yy="__reactListeners$"+eo,Sy="__reactHandles$"+eo;function zr(n){var e=n[di];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Gi]||t[di]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Fp(n);n!==null;){if(t=n[di])return t;n=Fp(n)}return e}n=t,t=n.parentNode}return null}function da(n){return n=n[di]||n[Gi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ws(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(ee(33))}function uc(n){return n[Jo]||null}var pf=[],Ts=-1;function Tr(n){return{current:n}}function gt(n){0>Ts||(n.current=pf[Ts],pf[Ts]=null,Ts--)}function pt(n,e){Ts++,pf[Ts]=n.current,n.current=e}var Mr={},rn=Tr(Mr),gn=Tr(!1),qr=Mr;function zs(n,e){var t=n.type.contextTypes;if(!t)return Mr;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in t)r[s]=e[s];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=r),r}function _n(n){return n=n.childContextTypes,n!=null}function Bl(){gt(gn),gt(rn)}function Op(n,e,t){if(rn.current!==Mr)throw Error(ee(168));pt(rn,e),pt(gn,t)}function A_(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ee(108,sx(n)||"Unknown",r));return yt({},t,i)}function zl(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Mr,qr=rn.current,pt(rn,n),pt(gn,gn.current),!0}function kp(n,e,t){var i=n.stateNode;if(!i)throw Error(ee(169));t?(n=A_(n,e,qr),i.__reactInternalMemoizedMergedChildContext=n,gt(gn),gt(rn),pt(rn,n)):gt(gn),pt(gn,t)}var Di=null,fc=!1,jc=!1;function b_(n){Di===null?Di=[n]:Di.push(n)}function My(n){fc=!0,b_(n)}function Ar(){if(!jc&&Di!==null){jc=!0;var n=0,e=ot;try{var t=Di;for(ot=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}Di=null,fc=!1}catch(r){throw Di!==null&&(Di=Di.slice(n+1)),Jg(Hd,Ar),r}finally{ot=e,jc=!1}}return null}var As=[],bs=0,Vl=null,Hl=0,Un=[],Fn=0,Yr=null,Fi=1,Oi="";function Ur(n,e){As[bs++]=Hl,As[bs++]=Vl,Vl=n,Hl=e}function R_(n,e,t){Un[Fn++]=Fi,Un[Fn++]=Oi,Un[Fn++]=Yr,Yr=n;var i=Fi;n=Oi;var r=32-ti(i)-1;i&=~(1<<r),t+=1;var s=32-ti(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Fi=1<<32-ti(e)+r|t<<r|i,Oi=s+n}else Fi=1<<s|t<<r|i,Oi=n}function Zd(n){n.return!==null&&(Ur(n,1),R_(n,1,0))}function Jd(n){for(;n===Vl;)Vl=As[--bs],As[bs]=null,Hl=As[--bs],As[bs]=null;for(;n===Yr;)Yr=Un[--Fn],Un[Fn]=null,Oi=Un[--Fn],Un[Fn]=null,Fi=Un[--Fn],Un[Fn]=null}var Cn=null,Rn=null,_t=!1,Jn=null;function C_(n,e){var t=kn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Bp(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,Cn=n,Rn=mr(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,Cn=n,Rn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Yr!==null?{id:Fi,overflow:Oi}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=kn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,Cn=n,Rn=null,!0):!1;default:return!1}}function mf(n){return(n.mode&1)!==0&&(n.flags&128)===0}function gf(n){if(_t){var e=Rn;if(e){var t=e;if(!Bp(n,e)){if(mf(n))throw Error(ee(418));e=mr(t.nextSibling);var i=Cn;e&&Bp(n,e)?C_(i,t):(n.flags=n.flags&-4097|2,_t=!1,Cn=n)}}else{if(mf(n))throw Error(ee(418));n.flags=n.flags&-4097|2,_t=!1,Cn=n}}}function zp(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Cn=n}function Pa(n){if(n!==Cn)return!1;if(!_t)return zp(n),_t=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!ff(n.type,n.memoizedProps)),e&&(e=Rn)){if(mf(n))throw P_(),Error(ee(418));for(;e;)C_(n,e),e=mr(e.nextSibling)}if(zp(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(ee(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){Rn=mr(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}Rn=null}}else Rn=Cn?mr(n.stateNode.nextSibling):null;return!0}function P_(){for(var n=Rn;n;)n=mr(n.nextSibling)}function Vs(){Rn=Cn=null,_t=!1}function Qd(n){Jn===null?Jn=[n]:Jn.push(n)}var Ey=Yi.ReactCurrentBatchConfig;function fo(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(ee(309));var i=t.stateNode}if(!i)throw Error(ee(147,n));var r=i,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var c=r.refs;o===null?delete c[s]:c[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(ee(284));if(!t._owner)throw Error(ee(290,n))}return n}function La(n,e){throw n=Object.prototype.toString.call(e),Error(ee(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Vp(n){var e=n._init;return e(n._payload)}function L_(n){function e(f,g){if(n){var v=f.deletions;v===null?(f.deletions=[g],f.flags|=16):v.push(g)}}function t(f,g){if(!n)return null;for(;g!==null;)e(f,g),g=g.sibling;return null}function i(f,g){for(f=new Map;g!==null;)g.key!==null?f.set(g.key,g):f.set(g.index,g),g=g.sibling;return f}function r(f,g){return f=xr(f,g),f.index=0,f.sibling=null,f}function s(f,g,v){return f.index=v,n?(v=f.alternate,v!==null?(v=v.index,v<g?(f.flags|=2,g):v):(f.flags|=2,g)):(f.flags|=1048576,g)}function o(f){return n&&f.alternate===null&&(f.flags|=2),f}function c(f,g,v,S){return g===null||g.tag!==6?(g=Qc(v,f.mode,S),g.return=f,g):(g=r(g,v),g.return=f,g)}function u(f,g,v,S){var A=v.type;return A===ys?_(f,g,v.props.children,S,v.key):g!==null&&(g.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===rr&&Vp(A)===g.type)?(S=r(g,v.props),S.ref=fo(f,g,v),S.return=f,S):(S=xl(v.type,v.key,v.props,null,f.mode,S),S.ref=fo(f,g,v),S.return=f,S)}function d(f,g,v,S){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=eu(v,f.mode,S),g.return=f,g):(g=r(g,v.children||[]),g.return=f,g)}function _(f,g,v,S,A){return g===null||g.tag!==7?(g=jr(v,f.mode,S,A),g.return=f,g):(g=r(g,v),g.return=f,g)}function a(f,g,v){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Qc(""+g,f.mode,v),g.return=f,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ya:return v=xl(g.type,g.key,g.props,null,f.mode,v),v.ref=fo(f,null,g),v.return=f,v;case xs:return g=eu(g,f.mode,v),g.return=f,g;case rr:var S=g._init;return a(f,S(g._payload),v)}if(To(g)||oo(g))return g=jr(g,f.mode,v,null),g.return=f,g;La(f,g)}return null}function l(f,g,v,S){var A=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return A!==null?null:c(f,g,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ya:return v.key===A?u(f,g,v,S):null;case xs:return v.key===A?d(f,g,v,S):null;case rr:return A=v._init,l(f,g,A(v._payload),S)}if(To(v)||oo(v))return A!==null?null:_(f,g,v,S,null);La(f,v)}return null}function h(f,g,v,S,A){if(typeof S=="string"&&S!==""||typeof S=="number")return f=f.get(v)||null,c(g,f,""+S,A);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case ya:return f=f.get(S.key===null?v:S.key)||null,u(g,f,S,A);case xs:return f=f.get(S.key===null?v:S.key)||null,d(g,f,S,A);case rr:var T=S._init;return h(f,g,v,T(S._payload),A)}if(To(S)||oo(S))return f=f.get(v)||null,_(g,f,S,A,null);La(g,S)}return null}function m(f,g,v,S){for(var A=null,T=null,b=g,y=g=0,E=null;b!==null&&y<v.length;y++){b.index>y?(E=b,b=null):E=b.sibling;var I=l(f,b,v[y],S);if(I===null){b===null&&(b=E);break}n&&b&&I.alternate===null&&e(f,b),g=s(I,g,y),T===null?A=I:T.sibling=I,T=I,b=E}if(y===v.length)return t(f,b),_t&&Ur(f,y),A;if(b===null){for(;y<v.length;y++)b=a(f,v[y],S),b!==null&&(g=s(b,g,y),T===null?A=b:T.sibling=b,T=b);return _t&&Ur(f,y),A}for(b=i(f,b);y<v.length;y++)E=h(b,f,y,v[y],S),E!==null&&(n&&E.alternate!==null&&b.delete(E.key===null?y:E.key),g=s(E,g,y),T===null?A=E:T.sibling=E,T=E);return n&&b.forEach(function(C){return e(f,C)}),_t&&Ur(f,y),A}function x(f,g,v,S){var A=oo(v);if(typeof A!="function")throw Error(ee(150));if(v=A.call(v),v==null)throw Error(ee(151));for(var T=A=null,b=g,y=g=0,E=null,I=v.next();b!==null&&!I.done;y++,I=v.next()){b.index>y?(E=b,b=null):E=b.sibling;var C=l(f,b,I.value,S);if(C===null){b===null&&(b=E);break}n&&b&&C.alternate===null&&e(f,b),g=s(C,g,y),T===null?A=C:T.sibling=C,T=C,b=E}if(I.done)return t(f,b),_t&&Ur(f,y),A;if(b===null){for(;!I.done;y++,I=v.next())I=a(f,I.value,S),I!==null&&(g=s(I,g,y),T===null?A=I:T.sibling=I,T=I);return _t&&Ur(f,y),A}for(b=i(f,b);!I.done;y++,I=v.next())I=h(b,f,y,I.value,S),I!==null&&(n&&I.alternate!==null&&b.delete(I.key===null?y:I.key),g=s(I,g,y),T===null?A=I:T.sibling=I,T=I);return n&&b.forEach(function(U){return e(f,U)}),_t&&Ur(f,y),A}function p(f,g,v,S){if(typeof v=="object"&&v!==null&&v.type===ys&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case ya:e:{for(var A=v.key,T=g;T!==null;){if(T.key===A){if(A=v.type,A===ys){if(T.tag===7){t(f,T.sibling),g=r(T,v.props.children),g.return=f,f=g;break e}}else if(T.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===rr&&Vp(A)===T.type){t(f,T.sibling),g=r(T,v.props),g.ref=fo(f,T,v),g.return=f,f=g;break e}t(f,T);break}else e(f,T);T=T.sibling}v.type===ys?(g=jr(v.props.children,f.mode,S,v.key),g.return=f,f=g):(S=xl(v.type,v.key,v.props,null,f.mode,S),S.ref=fo(f,g,v),S.return=f,f=S)}return o(f);case xs:e:{for(T=v.key;g!==null;){if(g.key===T)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){t(f,g.sibling),g=r(g,v.children||[]),g.return=f,f=g;break e}else{t(f,g);break}else e(f,g);g=g.sibling}g=eu(v,f.mode,S),g.return=f,f=g}return o(f);case rr:return T=v._init,p(f,g,T(v._payload),S)}if(To(v))return m(f,g,v,S);if(oo(v))return x(f,g,v,S);La(f,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,g!==null&&g.tag===6?(t(f,g.sibling),g=r(g,v),g.return=f,f=g):(t(f,g),g=Qc(v,f.mode,S),g.return=f,f=g),o(f)):t(f,g)}return p}var Hs=L_(!0),I_=L_(!1),Gl=Tr(null),Wl=null,Rs=null,eh=null;function th(){eh=Rs=Wl=null}function nh(n){var e=Gl.current;gt(Gl),n._currentValue=e}function _f(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function Us(n,e){Wl=n,eh=Rs=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(mn=!0),n.firstContext=null)}function Vn(n){var e=n._currentValue;if(eh!==n)if(n={context:n,memoizedValue:e,next:null},Rs===null){if(Wl===null)throw Error(ee(308));Rs=n,Wl.dependencies={lanes:0,firstContext:n}}else Rs=Rs.next=n;return e}var Vr=null;function ih(n){Vr===null?Vr=[n]:Vr.push(n)}function D_(n,e,t,i){var r=e.interleaved;return r===null?(t.next=t,ih(e)):(t.next=r.next,r.next=t),e.interleaved=t,Wi(n,i)}function Wi(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var sr=!1;function rh(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function N_(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Bi(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function gr(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,Ze&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Wi(n,t)}return r=i.interleaved,r===null?(e.next=e,ih(i)):(e.next=r.next,r.next=e),i.interleaved=e,Wi(n,t)}function hl(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,Gd(n,t)}}function Hp(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?r=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?r=s=e:s=s.next=e}else r=s=e;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function Xl(n,e,t,i){var r=n.updateQueue;sr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,c=r.shared.pending;if(c!==null){r.shared.pending=null;var u=c,d=u.next;u.next=null,o===null?s=d:o.next=d,o=u;var _=n.alternate;_!==null&&(_=_.updateQueue,c=_.lastBaseUpdate,c!==o&&(c===null?_.firstBaseUpdate=d:c.next=d,_.lastBaseUpdate=u))}if(s!==null){var a=r.baseState;o=0,_=d=u=null,c=s;do{var l=c.lane,h=c.eventTime;if((i&l)===l){_!==null&&(_=_.next={eventTime:h,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var m=n,x=c;switch(l=e,h=t,x.tag){case 1:if(m=x.payload,typeof m=="function"){a=m.call(h,a,l);break e}a=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=x.payload,l=typeof m=="function"?m.call(h,a,l):m,l==null)break e;a=yt({},a,l);break e;case 2:sr=!0}}c.callback!==null&&c.lane!==0&&(n.flags|=64,l=r.effects,l===null?r.effects=[c]:l.push(c))}else h={eventTime:h,lane:l,tag:c.tag,payload:c.payload,callback:c.callback,next:null},_===null?(d=_=h,u=a):_=_.next=h,o|=l;if(c=c.next,c===null){if(c=r.shared.pending,c===null)break;l=c,c=l.next,l.next=null,r.lastBaseUpdate=l,r.shared.pending=null}}while(!0);if(_===null&&(u=a),r.baseState=u,r.firstBaseUpdate=d,r.lastBaseUpdate=_,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Kr|=o,n.lanes=o,n.memoizedState=a}}function Gp(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(ee(191,r));r.call(i)}}}var ha={},_i=Tr(ha),Qo=Tr(ha),ea=Tr(ha);function Hr(n){if(n===ha)throw Error(ee(174));return n}function sh(n,e){switch(pt(ea,e),pt(Qo,n),pt(_i,ha),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ku(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=Ku(e,n)}gt(_i),pt(_i,e)}function Gs(){gt(_i),gt(Qo),gt(ea)}function U_(n){Hr(ea.current);var e=Hr(_i.current),t=Ku(e,n.type);e!==t&&(pt(Qo,n),pt(_i,t))}function oh(n){Qo.current===n&&(gt(_i),gt(Qo))}var vt=Tr(0);function jl(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var qc=[];function ah(){for(var n=0;n<qc.length;n++)qc[n]._workInProgressVersionPrimary=null;qc.length=0}var pl=Yi.ReactCurrentDispatcher,Yc=Yi.ReactCurrentBatchConfig,$r=0,xt=null,Dt=null,Ht=null,ql=!1,Fo=!1,ta=0,wy=0;function Zt(){throw Error(ee(321))}function lh(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!ii(n[t],e[t]))return!1;return!0}function ch(n,e,t,i,r,s){if($r=s,xt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,pl.current=n===null||n.memoizedState===null?Ry:Cy,n=t(i,r),Fo){s=0;do{if(Fo=!1,ta=0,25<=s)throw Error(ee(301));s+=1,Ht=Dt=null,e.updateQueue=null,pl.current=Py,n=t(i,r)}while(Fo)}if(pl.current=Yl,e=Dt!==null&&Dt.next!==null,$r=0,Ht=Dt=xt=null,ql=!1,e)throw Error(ee(300));return n}function uh(){var n=ta!==0;return ta=0,n}function ui(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ht===null?xt.memoizedState=Ht=n:Ht=Ht.next=n,Ht}function Hn(){if(Dt===null){var n=xt.alternate;n=n!==null?n.memoizedState:null}else n=Dt.next;var e=Ht===null?xt.memoizedState:Ht.next;if(e!==null)Ht=e,Dt=n;else{if(n===null)throw Error(ee(310));Dt=n,n={memoizedState:Dt.memoizedState,baseState:Dt.baseState,baseQueue:Dt.baseQueue,queue:Dt.queue,next:null},Ht===null?xt.memoizedState=Ht=n:Ht=Ht.next=n}return Ht}function na(n,e){return typeof e=="function"?e(n):e}function $c(n){var e=Hn(),t=e.queue;if(t===null)throw Error(ee(311));t.lastRenderedReducer=n;var i=Dt,r=i.baseQueue,s=t.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,t.pending=null}if(r!==null){s=r.next,i=i.baseState;var c=o=null,u=null,d=s;do{var _=d.lane;if(($r&_)===_)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),i=d.hasEagerState?d.eagerState:n(i,d.action);else{var a={lane:_,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(c=u=a,o=i):u=u.next=a,xt.lanes|=_,Kr|=_}d=d.next}while(d!==null&&d!==s);u===null?o=i:u.next=c,ii(i,e.memoizedState)||(mn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=u,t.lastRenderedState=i}if(n=t.interleaved,n!==null){r=n;do s=r.lane,xt.lanes|=s,Kr|=s,r=r.next;while(r!==n)}else r===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Kc(n){var e=Hn(),t=e.queue;if(t===null)throw Error(ee(311));t.lastRenderedReducer=n;var i=t.dispatch,r=t.pending,s=e.memoizedState;if(r!==null){t.pending=null;var o=r=r.next;do s=n(s,o.action),o=o.next;while(o!==r);ii(s,e.memoizedState)||(mn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,i]}function F_(){}function O_(n,e){var t=xt,i=Hn(),r=e(),s=!ii(i.memoizedState,r);if(s&&(i.memoizedState=r,mn=!0),i=i.queue,fh(z_.bind(null,t,i,n),[n]),i.getSnapshot!==e||s||Ht!==null&&Ht.memoizedState.tag&1){if(t.flags|=2048,ia(9,B_.bind(null,t,i,r,e),void 0,null),Gt===null)throw Error(ee(349));$r&30||k_(t,e,r)}return r}function k_(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=xt.updateQueue,e===null?(e={lastEffect:null,stores:null},xt.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function B_(n,e,t,i){e.value=t,e.getSnapshot=i,V_(e)&&H_(n)}function z_(n,e,t){return t(function(){V_(e)&&H_(n)})}function V_(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!ii(n,t)}catch{return!0}}function H_(n){var e=Wi(n,1);e!==null&&ni(e,n,1,-1)}function Wp(n){var e=ui();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:n},e.queue=n,n=n.dispatch=by.bind(null,xt,n),[e.memoizedState,n]}function ia(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=xt.updateQueue,e===null?(e={lastEffect:null,stores:null},xt.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function G_(){return Hn().memoizedState}function ml(n,e,t,i){var r=ui();xt.flags|=n,r.memoizedState=ia(1|e,t,void 0,i===void 0?null:i)}function dc(n,e,t,i){var r=Hn();i=i===void 0?null:i;var s=void 0;if(Dt!==null){var o=Dt.memoizedState;if(s=o.destroy,i!==null&&lh(i,o.deps)){r.memoizedState=ia(e,t,s,i);return}}xt.flags|=n,r.memoizedState=ia(1|e,t,s,i)}function Xp(n,e){return ml(8390656,8,n,e)}function fh(n,e){return dc(2048,8,n,e)}function W_(n,e){return dc(4,2,n,e)}function X_(n,e){return dc(4,4,n,e)}function j_(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function q_(n,e,t){return t=t!=null?t.concat([n]):null,dc(4,4,j_.bind(null,e,n),t)}function dh(){}function Y_(n,e){var t=Hn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&lh(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function $_(n,e){var t=Hn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&lh(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function K_(n,e,t){return $r&21?(ii(t,e)||(t=t_(),xt.lanes|=t,Kr|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,mn=!0),n.memoizedState=t)}function Ty(n,e){var t=ot;ot=t!==0&&4>t?t:4,n(!0);var i=Yc.transition;Yc.transition={};try{n(!1),e()}finally{ot=t,Yc.transition=i}}function Z_(){return Hn().memoizedState}function Ay(n,e,t){var i=vr(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},J_(n))Q_(e,t);else if(t=D_(n,e,t,i),t!==null){var r=ln();ni(t,n,i,r),e0(t,e,i)}}function by(n,e,t){var i=vr(n),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(J_(n))Q_(e,r);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,c=s(o,t);if(r.hasEagerState=!0,r.eagerState=c,ii(c,o)){var u=e.interleaved;u===null?(r.next=r,ih(e)):(r.next=u.next,u.next=r),e.interleaved=r;return}}catch{}finally{}t=D_(n,e,r,i),t!==null&&(r=ln(),ni(t,n,i,r),e0(t,e,i))}}function J_(n){var e=n.alternate;return n===xt||e!==null&&e===xt}function Q_(n,e){Fo=ql=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function e0(n,e,t){if(t&4194240){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,Gd(n,t)}}var Yl={readContext:Vn,useCallback:Zt,useContext:Zt,useEffect:Zt,useImperativeHandle:Zt,useInsertionEffect:Zt,useLayoutEffect:Zt,useMemo:Zt,useReducer:Zt,useRef:Zt,useState:Zt,useDebugValue:Zt,useDeferredValue:Zt,useTransition:Zt,useMutableSource:Zt,useSyncExternalStore:Zt,useId:Zt,unstable_isNewReconciler:!1},Ry={readContext:Vn,useCallback:function(n,e){return ui().memoizedState=[n,e===void 0?null:e],n},useContext:Vn,useEffect:Xp,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,ml(4194308,4,j_.bind(null,e,n),t)},useLayoutEffect:function(n,e){return ml(4194308,4,n,e)},useInsertionEffect:function(n,e){return ml(4,2,n,e)},useMemo:function(n,e){var t=ui();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=ui();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=Ay.bind(null,xt,n),[i.memoizedState,n]},useRef:function(n){var e=ui();return n={current:n},e.memoizedState=n},useState:Wp,useDebugValue:dh,useDeferredValue:function(n){return ui().memoizedState=n},useTransition:function(){var n=Wp(!1),e=n[0];return n=Ty.bind(null,n[1]),ui().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=xt,r=ui();if(_t){if(t===void 0)throw Error(ee(407));t=t()}else{if(t=e(),Gt===null)throw Error(ee(349));$r&30||k_(i,e,t)}r.memoizedState=t;var s={value:t,getSnapshot:e};return r.queue=s,Xp(z_.bind(null,i,s,n),[n]),i.flags|=2048,ia(9,B_.bind(null,i,s,t,e),void 0,null),t},useId:function(){var n=ui(),e=Gt.identifierPrefix;if(_t){var t=Oi,i=Fi;t=(i&~(1<<32-ti(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=ta++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=wy++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},Cy={readContext:Vn,useCallback:Y_,useContext:Vn,useEffect:fh,useImperativeHandle:q_,useInsertionEffect:W_,useLayoutEffect:X_,useMemo:$_,useReducer:$c,useRef:G_,useState:function(){return $c(na)},useDebugValue:dh,useDeferredValue:function(n){var e=Hn();return K_(e,Dt.memoizedState,n)},useTransition:function(){var n=$c(na)[0],e=Hn().memoizedState;return[n,e]},useMutableSource:F_,useSyncExternalStore:O_,useId:Z_,unstable_isNewReconciler:!1},Py={readContext:Vn,useCallback:Y_,useContext:Vn,useEffect:fh,useImperativeHandle:q_,useInsertionEffect:W_,useLayoutEffect:X_,useMemo:$_,useReducer:Kc,useRef:G_,useState:function(){return Kc(na)},useDebugValue:dh,useDeferredValue:function(n){var e=Hn();return Dt===null?e.memoizedState=n:K_(e,Dt.memoizedState,n)},useTransition:function(){var n=Kc(na)[0],e=Hn().memoizedState;return[n,e]},useMutableSource:F_,useSyncExternalStore:O_,useId:Z_,unstable_isNewReconciler:!1};function $n(n,e){if(n&&n.defaultProps){e=yt({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function vf(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:yt({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var hc={isMounted:function(n){return(n=n._reactInternals)?es(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=ln(),r=vr(n),s=Bi(i,r);s.payload=e,t!=null&&(s.callback=t),e=gr(n,s,r),e!==null&&(ni(e,n,r,i),hl(e,n,r))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=ln(),r=vr(n),s=Bi(i,r);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=gr(n,s,r),e!==null&&(ni(e,n,r,i),hl(e,n,r))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=ln(),i=vr(n),r=Bi(t,i);r.tag=2,e!=null&&(r.callback=e),e=gr(n,r,i),e!==null&&(ni(e,n,i,t),hl(e,n,i))}};function jp(n,e,t,i,r,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!$o(t,i)||!$o(r,s):!0}function t0(n,e,t){var i=!1,r=Mr,s=e.contextType;return typeof s=="object"&&s!==null?s=Vn(s):(r=_n(e)?qr:rn.current,i=e.contextTypes,s=(i=i!=null)?zs(n,r):Mr),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=hc,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=s),e}function qp(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&hc.enqueueReplaceState(e,e.state,null)}function xf(n,e,t,i){var r=n.stateNode;r.props=t,r.state=n.memoizedState,r.refs={},rh(n);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Vn(s):(s=_n(e)?qr:rn.current,r.context=zs(n,s)),r.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(vf(n,e,s,t),r.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&hc.enqueueReplaceState(r,r.state,null),Xl(n,t,r,i),r.state=n.memoizedState),typeof r.componentDidMount=="function"&&(n.flags|=4194308)}function Ws(n,e){try{var t="",i=e;do t+=rx(i),i=i.return;while(i);var r=t}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:r,digest:null}}function Zc(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function yf(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var Ly=typeof WeakMap=="function"?WeakMap:Map;function n0(n,e,t){t=Bi(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){Kl||(Kl=!0,Pf=i),yf(n,e)},t}function i0(n,e,t){t=Bi(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;t.payload=function(){return i(r)},t.callback=function(){yf(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){yf(n,e),typeof i!="function"&&(_r===null?_r=new Set([this]):_r.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function Yp(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new Ly;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(t)||(r.add(t),n=Xy.bind(null,n,e,t),e.then(n,n))}function $p(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Kp(n,e,t,i,r){return n.mode&1?(n.flags|=65536,n.lanes=r,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Bi(-1,1),e.tag=2,gr(t,e,1))),t.lanes|=1),n)}var Iy=Yi.ReactCurrentOwner,mn=!1;function on(n,e,t,i){e.child=n===null?I_(e,null,t,i):Hs(e,n.child,t,i)}function Zp(n,e,t,i,r){t=t.render;var s=e.ref;return Us(e,r),i=ch(n,e,t,i,s,r),t=uh(),n!==null&&!mn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,Xi(n,e,r)):(_t&&t&&Zd(e),e.flags|=1,on(n,e,i,r),e.child)}function Jp(n,e,t,i,r){if(n===null){var s=t.type;return typeof s=="function"&&!yh(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,r0(n,e,s,i,r)):(n=xl(t.type,null,i,e,e.mode,r),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&r)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:$o,t(o,i)&&n.ref===e.ref)return Xi(n,e,r)}return e.flags|=1,n=xr(s,i),n.ref=e.ref,n.return=e,e.child=n}function r0(n,e,t,i,r){if(n!==null){var s=n.memoizedProps;if($o(s,i)&&n.ref===e.ref)if(mn=!1,e.pendingProps=i=s,(n.lanes&r)!==0)n.flags&131072&&(mn=!0);else return e.lanes=n.lanes,Xi(n,e,r)}return Sf(n,e,t,i,r)}function s0(n,e,t){var i=e.pendingProps,r=i.children,s=n!==null?n.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},pt(Ps,Tn),Tn|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,pt(Ps,Tn),Tn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:t,pt(Ps,Tn),Tn|=i}else s!==null?(i=s.baseLanes|t,e.memoizedState=null):i=t,pt(Ps,Tn),Tn|=i;return on(n,e,r,t),e.child}function o0(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Sf(n,e,t,i,r){var s=_n(t)?qr:rn.current;return s=zs(e,s),Us(e,r),t=ch(n,e,t,i,s,r),i=uh(),n!==null&&!mn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,Xi(n,e,r)):(_t&&i&&Zd(e),e.flags|=1,on(n,e,t,r),e.child)}function Qp(n,e,t,i,r){if(_n(t)){var s=!0;zl(e)}else s=!1;if(Us(e,r),e.stateNode===null)gl(n,e),t0(e,t,i),xf(e,t,i,r),i=!0;else if(n===null){var o=e.stateNode,c=e.memoizedProps;o.props=c;var u=o.context,d=t.contextType;typeof d=="object"&&d!==null?d=Vn(d):(d=_n(t)?qr:rn.current,d=zs(e,d));var _=t.getDerivedStateFromProps,a=typeof _=="function"||typeof o.getSnapshotBeforeUpdate=="function";a||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==i||u!==d)&&qp(e,o,i,d),sr=!1;var l=e.memoizedState;o.state=l,Xl(e,i,o,r),u=e.memoizedState,c!==i||l!==u||gn.current||sr?(typeof _=="function"&&(vf(e,t,_,i),u=e.memoizedState),(c=sr||jp(e,t,c,i,l,u,d))?(a||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=u),o.props=i,o.state=u,o.context=d,i=c):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,N_(n,e),c=e.memoizedProps,d=e.type===e.elementType?c:$n(e.type,c),o.props=d,a=e.pendingProps,l=o.context,u=t.contextType,typeof u=="object"&&u!==null?u=Vn(u):(u=_n(t)?qr:rn.current,u=zs(e,u));var h=t.getDerivedStateFromProps;(_=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==a||l!==u)&&qp(e,o,i,u),sr=!1,l=e.memoizedState,o.state=l,Xl(e,i,o,r);var m=e.memoizedState;c!==a||l!==m||gn.current||sr?(typeof h=="function"&&(vf(e,t,h,i),m=e.memoizedState),(d=sr||jp(e,t,d,i,l,m,u)||!1)?(_||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,m,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,m,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||c===n.memoizedProps&&l===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===n.memoizedProps&&l===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=m),o.props=i,o.state=m,o.context=u,i=d):(typeof o.componentDidUpdate!="function"||c===n.memoizedProps&&l===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===n.memoizedProps&&l===n.memoizedState||(e.flags|=1024),i=!1)}return Mf(n,e,t,i,s,r)}function Mf(n,e,t,i,r,s){o0(n,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&kp(e,t,!1),Xi(n,e,s);i=e.stateNode,Iy.current=e;var c=o&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&o?(e.child=Hs(e,n.child,null,s),e.child=Hs(e,null,c,s)):on(n,e,c,s),e.memoizedState=i.state,r&&kp(e,t,!0),e.child}function a0(n){var e=n.stateNode;e.pendingContext?Op(n,e.pendingContext,e.pendingContext!==e.context):e.context&&Op(n,e.context,!1),sh(n,e.containerInfo)}function em(n,e,t,i,r){return Vs(),Qd(r),e.flags|=256,on(n,e,t,i),e.child}var Ef={dehydrated:null,treeContext:null,retryLane:0};function wf(n){return{baseLanes:n,cachePool:null,transitions:null}}function l0(n,e,t){var i=e.pendingProps,r=vt.current,s=!1,o=(e.flags&128)!==0,c;if((c=o)||(c=n!==null&&n.memoizedState===null?!1:(r&2)!==0),c?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(r|=1),pt(vt,r&1),n===null)return gf(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,n=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=gc(o,i,0,null),n=jr(n,i,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=wf(t),e.memoizedState=Ef,n):hh(e,o));if(r=n.memoizedState,r!==null&&(c=r.dehydrated,c!==null))return Dy(n,e,o,i,c,r,t);if(s){s=i.fallback,o=e.mode,r=n.child,c=r.sibling;var u={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=u,e.deletions=null):(i=xr(r,u),i.subtreeFlags=r.subtreeFlags&14680064),c!==null?s=xr(c,s):(s=jr(s,o,t,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=n.child.memoizedState,o=o===null?wf(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=Ef,i}return s=n.child,n=s.sibling,i=xr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function hh(n,e){return e=gc({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Ia(n,e,t,i){return i!==null&&Qd(i),Hs(e,n.child,null,t),n=hh(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function Dy(n,e,t,i,r,s,o){if(t)return e.flags&256?(e.flags&=-257,i=Zc(Error(ee(422))),Ia(n,e,o,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=gc({mode:"visible",children:i.children},r,0,null),s=jr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Hs(e,n.child,null,o),e.child.memoizedState=wf(o),e.memoizedState=Ef,s);if(!(e.mode&1))return Ia(n,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var c=i.dgst;return i=c,s=Error(ee(419)),i=Zc(s,i,void 0),Ia(n,e,o,i)}if(c=(o&n.childLanes)!==0,mn||c){if(i=Gt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Wi(n,r),ni(i,n,r,-1))}return xh(),i=Zc(Error(ee(421))),Ia(n,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=n.child,e=jy.bind(null,n),r._reactRetry=e,null):(n=s.treeContext,Rn=mr(r.nextSibling),Cn=e,_t=!0,Jn=null,n!==null&&(Un[Fn++]=Fi,Un[Fn++]=Oi,Un[Fn++]=Yr,Fi=n.id,Oi=n.overflow,Yr=e),e=hh(e,i.children),e.flags|=4096,e)}function tm(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),_f(n.return,e,t)}function Jc(n,e,t,i,r){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=t,s.tailMode=r)}function c0(n,e,t){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(on(n,e,i.children,t),i=vt.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&tm(n,t,e);else if(n.tag===19)tm(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(pt(vt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(t=e.child,r=null;t!==null;)n=t.alternate,n!==null&&jl(n)===null&&(r=t),t=t.sibling;t=r,t===null?(r=e.child,e.child=null):(r=t.sibling,t.sibling=null),Jc(e,!1,r,t,s);break;case"backwards":for(t=null,r=e.child,e.child=null;r!==null;){if(n=r.alternate,n!==null&&jl(n)===null){e.child=r;break}n=r.sibling,r.sibling=t,t=r,r=n}Jc(e,!0,t,null,s);break;case"together":Jc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function gl(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Xi(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Kr|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(ee(153));if(e.child!==null){for(n=e.child,t=xr(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=xr(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function Ny(n,e,t){switch(e.tag){case 3:a0(e),Vs();break;case 5:U_(e);break;case 1:_n(e.type)&&zl(e);break;case 4:sh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;pt(Gl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(pt(vt,vt.current&1),e.flags|=128,null):t&e.child.childLanes?l0(n,e,t):(pt(vt,vt.current&1),n=Xi(n,e,t),n!==null?n.sibling:null);pt(vt,vt.current&1);break;case 19:if(i=(t&e.childLanes)!==0,n.flags&128){if(i)return c0(n,e,t);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),pt(vt,vt.current),i)break;return null;case 22:case 23:return e.lanes=0,s0(n,e,t)}return Xi(n,e,t)}var u0,Tf,f0,d0;u0=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Tf=function(){};f0=function(n,e,t,i){var r=n.memoizedProps;if(r!==i){n=e.stateNode,Hr(_i.current);var s=null;switch(t){case"input":r=ju(n,r),i=ju(n,i),s=[];break;case"select":r=yt({},r,{value:void 0}),i=yt({},i,{value:void 0}),s=[];break;case"textarea":r=$u(n,r),i=$u(n,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=kl)}Zu(t,i);var o;t=null;for(d in r)if(!i.hasOwnProperty(d)&&r.hasOwnProperty(d)&&r[d]!=null)if(d==="style"){var c=r[d];for(o in c)c.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Ho.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in i){var u=i[d];if(c=r!=null?r[d]:void 0,i.hasOwnProperty(d)&&u!==c&&(u!=null||c!=null))if(d==="style")if(c){for(o in c)!c.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in u)u.hasOwnProperty(o)&&c[o]!==u[o]&&(t||(t={}),t[o]=u[o])}else t||(s||(s=[]),s.push(d,t)),t=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,c=c?c.__html:void 0,u!=null&&c!==u&&(s=s||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Ho.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&mt("scroll",n),s||c===u||(s=[])):(s=s||[]).push(d,u))}t&&(s=s||[]).push("style",t);var d=s;(e.updateQueue=d)&&(e.flags|=4)}};d0=function(n,e,t,i){t!==i&&(e.flags|=4)};function ho(n,e){if(!_t)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function Jt(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=n,r=r.sibling;else for(r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=n,r=r.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function Uy(n,e,t){var i=e.pendingProps;switch(Jd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Jt(e),null;case 1:return _n(e.type)&&Bl(),Jt(e),null;case 3:return i=e.stateNode,Gs(),gt(gn),gt(rn),ah(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(Pa(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Jn!==null&&(Df(Jn),Jn=null))),Tf(n,e),Jt(e),null;case 5:oh(e);var r=Hr(ea.current);if(t=e.type,n!==null&&e.stateNode!=null)f0(n,e,t,i,r),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ee(166));return Jt(e),null}if(n=Hr(_i.current),Pa(e)){i=e.stateNode,t=e.type;var s=e.memoizedProps;switch(i[di]=e,i[Jo]=s,n=(e.mode&1)!==0,t){case"dialog":mt("cancel",i),mt("close",i);break;case"iframe":case"object":case"embed":mt("load",i);break;case"video":case"audio":for(r=0;r<bo.length;r++)mt(bo[r],i);break;case"source":mt("error",i);break;case"img":case"image":case"link":mt("error",i),mt("load",i);break;case"details":mt("toggle",i);break;case"input":up(i,s),mt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},mt("invalid",i);break;case"textarea":dp(i,s),mt("invalid",i)}Zu(t,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var c=s[o];o==="children"?typeof c=="string"?i.textContent!==c&&(s.suppressHydrationWarning!==!0&&Ca(i.textContent,c,n),r=["children",c]):typeof c=="number"&&i.textContent!==""+c&&(s.suppressHydrationWarning!==!0&&Ca(i.textContent,c,n),r=["children",""+c]):Ho.hasOwnProperty(o)&&c!=null&&o==="onScroll"&&mt("scroll",i)}switch(t){case"input":Sa(i),fp(i,s,!0);break;case"textarea":Sa(i),hp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=kl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=zg(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=o.createElement(t,{is:i.is}):(n=o.createElement(t),t==="select"&&(o=n,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):n=o.createElementNS(n,t),n[di]=e,n[Jo]=i,u0(n,e,!1,!1),e.stateNode=n;e:{switch(o=Ju(t,i),t){case"dialog":mt("cancel",n),mt("close",n),r=i;break;case"iframe":case"object":case"embed":mt("load",n),r=i;break;case"video":case"audio":for(r=0;r<bo.length;r++)mt(bo[r],n);r=i;break;case"source":mt("error",n),r=i;break;case"img":case"image":case"link":mt("error",n),mt("load",n),r=i;break;case"details":mt("toggle",n),r=i;break;case"input":up(n,i),r=ju(n,i),mt("invalid",n);break;case"option":r=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},r=yt({},i,{value:void 0}),mt("invalid",n);break;case"textarea":dp(n,i),r=$u(n,i),mt("invalid",n);break;default:r=i}Zu(t,r),c=r;for(s in c)if(c.hasOwnProperty(s)){var u=c[s];s==="style"?Gg(n,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Vg(n,u)):s==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&Go(n,u):typeof u=="number"&&Go(n,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ho.hasOwnProperty(s)?u!=null&&s==="onScroll"&&mt("scroll",n):u!=null&&Od(n,s,u,o))}switch(t){case"input":Sa(n),fp(n,i,!1);break;case"textarea":Sa(n),hp(n);break;case"option":i.value!=null&&n.setAttribute("value",""+Sr(i.value));break;case"select":n.multiple=!!i.multiple,s=i.value,s!=null?Ls(n,!!i.multiple,s,!1):i.defaultValue!=null&&Ls(n,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=kl)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Jt(e),null;case 6:if(n&&e.stateNode!=null)d0(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ee(166));if(t=Hr(ea.current),Hr(_i.current),Pa(e)){if(i=e.stateNode,t=e.memoizedProps,i[di]=e,(s=i.nodeValue!==t)&&(n=Cn,n!==null))switch(n.tag){case 3:Ca(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ca(i.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[di]=e,e.stateNode=i}return Jt(e),null;case 13:if(gt(vt),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(_t&&Rn!==null&&e.mode&1&&!(e.flags&128))P_(),Vs(),e.flags|=98560,s=!1;else if(s=Pa(e),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(ee(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ee(317));s[di]=e}else Vs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Jt(e),s=!1}else Jn!==null&&(Df(Jn),Jn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(n===null||vt.current&1?Nt===0&&(Nt=3):xh())),e.updateQueue!==null&&(e.flags|=4),Jt(e),null);case 4:return Gs(),Tf(n,e),n===null&&Ko(e.stateNode.containerInfo),Jt(e),null;case 10:return nh(e.type._context),Jt(e),null;case 17:return _n(e.type)&&Bl(),Jt(e),null;case 19:if(gt(vt),s=e.memoizedState,s===null)return Jt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)ho(s,!1);else{if(Nt!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=jl(n),o!==null){for(e.flags|=128,ho(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)s=t,n=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return pt(vt,vt.current&1|2),e.child}n=n.sibling}s.tail!==null&&Rt()>Xs&&(e.flags|=128,i=!0,ho(s,!1),e.lanes=4194304)}else{if(!i)if(n=jl(o),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),ho(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!_t)return Jt(e),null}else 2*Rt()-s.renderingStartTime>Xs&&t!==1073741824&&(e.flags|=128,i=!0,ho(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Rt(),e.sibling=null,t=vt.current,pt(vt,i?t&1|2:t&1),e):(Jt(e),null);case 22:case 23:return vh(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Tn&1073741824&&(Jt(e),e.subtreeFlags&6&&(e.flags|=8192)):Jt(e),null;case 24:return null;case 25:return null}throw Error(ee(156,e.tag))}function Fy(n,e){switch(Jd(e),e.tag){case 1:return _n(e.type)&&Bl(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Gs(),gt(gn),gt(rn),ah(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return oh(e),null;case 13:if(gt(vt),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(ee(340));Vs()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return gt(vt),null;case 4:return Gs(),null;case 10:return nh(e.type._context),null;case 22:case 23:return vh(),null;case 24:return null;default:return null}}var Da=!1,tn=!1,Oy=typeof WeakSet=="function"?WeakSet:Set,ge=null;function Cs(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){Mt(n,e,i)}else t.current=null}function Af(n,e,t){try{t()}catch(i){Mt(n,e,i)}}var nm=!1;function ky(n,e){if(cf=Ul,n=__(),Kd(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,c=-1,u=-1,d=0,_=0,a=n,l=null;t:for(;;){for(var h;a!==t||r!==0&&a.nodeType!==3||(c=o+r),a!==s||i!==0&&a.nodeType!==3||(u=o+i),a.nodeType===3&&(o+=a.nodeValue.length),(h=a.firstChild)!==null;)l=a,a=h;for(;;){if(a===n)break t;if(l===t&&++d===r&&(c=o),l===s&&++_===i&&(u=o),(h=a.nextSibling)!==null)break;a=l,l=a.parentNode}a=h}t=c===-1||u===-1?null:{start:c,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(uf={focusedElem:n,selectionRange:t},Ul=!1,ge=e;ge!==null;)if(e=ge,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,ge=n;else for(;ge!==null;){e=ge;try{var m=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var x=m.memoizedProps,p=m.memoizedState,f=e.stateNode,g=f.getSnapshotBeforeUpdate(e.elementType===e.type?x:$n(e.type,x),p);f.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ee(163))}}catch(S){Mt(e,e.return,S)}if(n=e.sibling,n!==null){n.return=e.return,ge=n;break}ge=e.return}return m=nm,nm=!1,m}function Oo(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&n)===n){var s=r.destroy;r.destroy=void 0,s!==void 0&&Af(e,t,s)}r=r.next}while(r!==i)}}function pc(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function bf(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function h0(n){var e=n.alternate;e!==null&&(n.alternate=null,h0(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[di],delete e[Jo],delete e[hf],delete e[yy],delete e[Sy])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function p0(n){return n.tag===5||n.tag===3||n.tag===4}function im(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||p0(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Rf(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=kl));else if(i!==4&&(n=n.child,n!==null))for(Rf(n,e,t),n=n.sibling;n!==null;)Rf(n,e,t),n=n.sibling}function Cf(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(Cf(n,e,t),n=n.sibling;n!==null;)Cf(n,e,t),n=n.sibling}var jt=null,Kn=!1;function Zi(n,e,t){for(t=t.child;t!==null;)m0(n,e,t),t=t.sibling}function m0(n,e,t){if(gi&&typeof gi.onCommitFiberUnmount=="function")try{gi.onCommitFiberUnmount(oc,t)}catch{}switch(t.tag){case 5:tn||Cs(t,e);case 6:var i=jt,r=Kn;jt=null,Zi(n,e,t),jt=i,Kn=r,jt!==null&&(Kn?(n=jt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):jt.removeChild(t.stateNode));break;case 18:jt!==null&&(Kn?(n=jt,t=t.stateNode,n.nodeType===8?Xc(n.parentNode,t):n.nodeType===1&&Xc(n,t),qo(n)):Xc(jt,t.stateNode));break;case 4:i=jt,r=Kn,jt=t.stateNode.containerInfo,Kn=!0,Zi(n,e,t),jt=i,Kn=r;break;case 0:case 11:case 14:case 15:if(!tn&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Af(t,e,o),r=r.next}while(r!==i)}Zi(n,e,t);break;case 1:if(!tn&&(Cs(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(c){Mt(t,e,c)}Zi(n,e,t);break;case 21:Zi(n,e,t);break;case 22:t.mode&1?(tn=(i=tn)||t.memoizedState!==null,Zi(n,e,t),tn=i):Zi(n,e,t);break;default:Zi(n,e,t)}}function rm(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new Oy),e.forEach(function(i){var r=qy.bind(null,n,i);t.has(i)||(t.add(i),i.then(r,r))})}}function Xn(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var s=n,o=e,c=o;e:for(;c!==null;){switch(c.tag){case 5:jt=c.stateNode,Kn=!1;break e;case 3:jt=c.stateNode.containerInfo,Kn=!0;break e;case 4:jt=c.stateNode.containerInfo,Kn=!0;break e}c=c.return}if(jt===null)throw Error(ee(160));m0(s,o,r),jt=null,Kn=!1;var u=r.alternate;u!==null&&(u.return=null),r.return=null}catch(d){Mt(r,e,d)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)g0(e,n),e=e.sibling}function g0(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Xn(e,n),oi(n),i&4){try{Oo(3,n,n.return),pc(3,n)}catch(x){Mt(n,n.return,x)}try{Oo(5,n,n.return)}catch(x){Mt(n,n.return,x)}}break;case 1:Xn(e,n),oi(n),i&512&&t!==null&&Cs(t,t.return);break;case 5:if(Xn(e,n),oi(n),i&512&&t!==null&&Cs(t,t.return),n.flags&32){var r=n.stateNode;try{Go(r,"")}catch(x){Mt(n,n.return,x)}}if(i&4&&(r=n.stateNode,r!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,c=n.type,u=n.updateQueue;if(n.updateQueue=null,u!==null)try{c==="input"&&s.type==="radio"&&s.name!=null&&kg(r,s),Ju(c,o);var d=Ju(c,s);for(o=0;o<u.length;o+=2){var _=u[o],a=u[o+1];_==="style"?Gg(r,a):_==="dangerouslySetInnerHTML"?Vg(r,a):_==="children"?Go(r,a):Od(r,_,a,d)}switch(c){case"input":qu(r,s);break;case"textarea":Bg(r,s);break;case"select":var l=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var h=s.value;h!=null?Ls(r,!!s.multiple,h,!1):l!==!!s.multiple&&(s.defaultValue!=null?Ls(r,!!s.multiple,s.defaultValue,!0):Ls(r,!!s.multiple,s.multiple?[]:"",!1))}r[Jo]=s}catch(x){Mt(n,n.return,x)}}break;case 6:if(Xn(e,n),oi(n),i&4){if(n.stateNode===null)throw Error(ee(162));r=n.stateNode,s=n.memoizedProps;try{r.nodeValue=s}catch(x){Mt(n,n.return,x)}}break;case 3:if(Xn(e,n),oi(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{qo(e.containerInfo)}catch(x){Mt(n,n.return,x)}break;case 4:Xn(e,n),oi(n);break;case 13:Xn(e,n),oi(n),r=n.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(gh=Rt())),i&4&&rm(n);break;case 22:if(_=t!==null&&t.memoizedState!==null,n.mode&1?(tn=(d=tn)||_,Xn(e,n),tn=d):Xn(e,n),oi(n),i&8192){if(d=n.memoizedState!==null,(n.stateNode.isHidden=d)&&!_&&n.mode&1)for(ge=n,_=n.child;_!==null;){for(a=ge=_;ge!==null;){switch(l=ge,h=l.child,l.tag){case 0:case 11:case 14:case 15:Oo(4,l,l.return);break;case 1:Cs(l,l.return);var m=l.stateNode;if(typeof m.componentWillUnmount=="function"){i=l,t=l.return;try{e=i,m.props=e.memoizedProps,m.state=e.memoizedState,m.componentWillUnmount()}catch(x){Mt(i,t,x)}}break;case 5:Cs(l,l.return);break;case 22:if(l.memoizedState!==null){om(a);continue}}h!==null?(h.return=l,ge=h):om(a)}_=_.sibling}e:for(_=null,a=n;;){if(a.tag===5){if(_===null){_=a;try{r=a.stateNode,d?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(c=a.stateNode,u=a.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,c.style.display=Hg("display",o))}catch(x){Mt(n,n.return,x)}}}else if(a.tag===6){if(_===null)try{a.stateNode.nodeValue=d?"":a.memoizedProps}catch(x){Mt(n,n.return,x)}}else if((a.tag!==22&&a.tag!==23||a.memoizedState===null||a===n)&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===n)break e;for(;a.sibling===null;){if(a.return===null||a.return===n)break e;_===a&&(_=null),a=a.return}_===a&&(_=null),a.sibling.return=a.return,a=a.sibling}}break;case 19:Xn(e,n),oi(n),i&4&&rm(n);break;case 21:break;default:Xn(e,n),oi(n)}}function oi(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(p0(t)){var i=t;break e}t=t.return}throw Error(ee(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Go(r,""),i.flags&=-33);var s=im(n);Cf(n,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,c=im(n);Rf(n,c,o);break;default:throw Error(ee(161))}}catch(u){Mt(n,n.return,u)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function By(n,e,t){ge=n,_0(n)}function _0(n,e,t){for(var i=(n.mode&1)!==0;ge!==null;){var r=ge,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Da;if(!o){var c=r.alternate,u=c!==null&&c.memoizedState!==null||tn;c=Da;var d=tn;if(Da=o,(tn=u)&&!d)for(ge=r;ge!==null;)o=ge,u=o.child,o.tag===22&&o.memoizedState!==null?am(r):u!==null?(u.return=o,ge=u):am(r);for(;s!==null;)ge=s,_0(s),s=s.sibling;ge=r,Da=c,tn=d}sm(n)}else r.subtreeFlags&8772&&s!==null?(s.return=r,ge=s):sm(n)}}function sm(n){for(;ge!==null;){var e=ge;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:tn||pc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!tn)if(t===null)i.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:$n(e.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Gp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Gp(e,o,t)}break;case 5:var c=e.stateNode;if(t===null&&e.flags&4){t=c;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var d=e.alternate;if(d!==null){var _=d.memoizedState;if(_!==null){var a=_.dehydrated;a!==null&&qo(a)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ee(163))}tn||e.flags&512&&bf(e)}catch(l){Mt(e,e.return,l)}}if(e===n){ge=null;break}if(t=e.sibling,t!==null){t.return=e.return,ge=t;break}ge=e.return}}function om(n){for(;ge!==null;){var e=ge;if(e===n){ge=null;break}var t=e.sibling;if(t!==null){t.return=e.return,ge=t;break}ge=e.return}}function am(n){for(;ge!==null;){var e=ge;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{pc(4,e)}catch(u){Mt(e,t,u)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(u){Mt(e,r,u)}}var s=e.return;try{bf(e)}catch(u){Mt(e,s,u)}break;case 5:var o=e.return;try{bf(e)}catch(u){Mt(e,o,u)}}}catch(u){Mt(e,e.return,u)}if(e===n){ge=null;break}var c=e.sibling;if(c!==null){c.return=e.return,ge=c;break}ge=e.return}}var zy=Math.ceil,$l=Yi.ReactCurrentDispatcher,ph=Yi.ReactCurrentOwner,zn=Yi.ReactCurrentBatchConfig,Ze=0,Gt=null,Lt=null,Yt=0,Tn=0,Ps=Tr(0),Nt=0,ra=null,Kr=0,mc=0,mh=0,ko=null,hn=null,gh=0,Xs=1/0,Ii=null,Kl=!1,Pf=null,_r=null,Na=!1,ur=null,Zl=0,Bo=0,Lf=null,_l=-1,vl=0;function ln(){return Ze&6?Rt():_l!==-1?_l:_l=Rt()}function vr(n){return n.mode&1?Ze&2&&Yt!==0?Yt&-Yt:Ey.transition!==null?(vl===0&&(vl=t_()),vl):(n=ot,n!==0||(n=window.event,n=n===void 0?16:l_(n.type)),n):1}function ni(n,e,t,i){if(50<Bo)throw Bo=0,Lf=null,Error(ee(185));ua(n,t,i),(!(Ze&2)||n!==Gt)&&(n===Gt&&(!(Ze&2)&&(mc|=t),Nt===4&&ar(n,Yt)),vn(n,i),t===1&&Ze===0&&!(e.mode&1)&&(Xs=Rt()+500,fc&&Ar()))}function vn(n,e){var t=n.callbackNode;Ex(n,e);var i=Nl(n,n===Gt?Yt:0);if(i===0)t!==null&&gp(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&gp(t),e===1)n.tag===0?My(lm.bind(null,n)):b_(lm.bind(null,n)),vy(function(){!(Ze&6)&&Ar()}),t=null;else{switch(n_(i)){case 1:t=Hd;break;case 4:t=Qg;break;case 16:t=Dl;break;case 536870912:t=e_;break;default:t=Dl}t=T0(t,v0.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function v0(n,e){if(_l=-1,vl=0,Ze&6)throw Error(ee(327));var t=n.callbackNode;if(Fs()&&n.callbackNode!==t)return null;var i=Nl(n,n===Gt?Yt:0);if(i===0)return null;if(i&30||i&n.expiredLanes||e)e=Jl(n,i);else{e=i;var r=Ze;Ze|=2;var s=y0();(Gt!==n||Yt!==e)&&(Ii=null,Xs=Rt()+500,Xr(n,e));do try{Gy();break}catch(c){x0(n,c)}while(!0);th(),$l.current=s,Ze=r,Lt!==null?e=0:(Gt=null,Yt=0,e=Nt)}if(e!==0){if(e===2&&(r=rf(n),r!==0&&(i=r,e=If(n,r))),e===1)throw t=ra,Xr(n,0),ar(n,i),vn(n,Rt()),t;if(e===6)ar(n,i);else{if(r=n.current.alternate,!(i&30)&&!Vy(r)&&(e=Jl(n,i),e===2&&(s=rf(n),s!==0&&(i=s,e=If(n,s))),e===1))throw t=ra,Xr(n,0),ar(n,i),vn(n,Rt()),t;switch(n.finishedWork=r,n.finishedLanes=i,e){case 0:case 1:throw Error(ee(345));case 2:Fr(n,hn,Ii);break;case 3:if(ar(n,i),(i&130023424)===i&&(e=gh+500-Rt(),10<e)){if(Nl(n,0)!==0)break;if(r=n.suspendedLanes,(r&i)!==i){ln(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=df(Fr.bind(null,n,hn,Ii),e);break}Fr(n,hn,Ii);break;case 4:if(ar(n,i),(i&4194240)===i)break;for(e=n.eventTimes,r=-1;0<i;){var o=31-ti(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Rt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*zy(i/1960))-i,10<i){n.timeoutHandle=df(Fr.bind(null,n,hn,Ii),i);break}Fr(n,hn,Ii);break;case 5:Fr(n,hn,Ii);break;default:throw Error(ee(329))}}}return vn(n,Rt()),n.callbackNode===t?v0.bind(null,n):null}function If(n,e){var t=ko;return n.current.memoizedState.isDehydrated&&(Xr(n,e).flags|=256),n=Jl(n,e),n!==2&&(e=hn,hn=t,e!==null&&Df(e)),n}function Df(n){hn===null?hn=n:hn.push.apply(hn,n)}function Vy(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],s=r.getSnapshot;r=r.value;try{if(!ii(s(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ar(n,e){for(e&=~mh,e&=~mc,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-ti(e),i=1<<t;n[t]=-1,e&=~i}}function lm(n){if(Ze&6)throw Error(ee(327));Fs();var e=Nl(n,0);if(!(e&1))return vn(n,Rt()),null;var t=Jl(n,e);if(n.tag!==0&&t===2){var i=rf(n);i!==0&&(e=i,t=If(n,i))}if(t===1)throw t=ra,Xr(n,0),ar(n,e),vn(n,Rt()),t;if(t===6)throw Error(ee(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Fr(n,hn,Ii),vn(n,Rt()),null}function _h(n,e){var t=Ze;Ze|=1;try{return n(e)}finally{Ze=t,Ze===0&&(Xs=Rt()+500,fc&&Ar())}}function Zr(n){ur!==null&&ur.tag===0&&!(Ze&6)&&Fs();var e=Ze;Ze|=1;var t=zn.transition,i=ot;try{if(zn.transition=null,ot=1,n)return n()}finally{ot=i,zn.transition=t,Ze=e,!(Ze&6)&&Ar()}}function vh(){Tn=Ps.current,gt(Ps)}function Xr(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,_y(t)),Lt!==null)for(t=Lt.return;t!==null;){var i=t;switch(Jd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Bl();break;case 3:Gs(),gt(gn),gt(rn),ah();break;case 5:oh(i);break;case 4:Gs();break;case 13:gt(vt);break;case 19:gt(vt);break;case 10:nh(i.type._context);break;case 22:case 23:vh()}t=t.return}if(Gt=n,Lt=n=xr(n.current,null),Yt=Tn=e,Nt=0,ra=null,mh=mc=Kr=0,hn=ko=null,Vr!==null){for(e=0;e<Vr.length;e++)if(t=Vr[e],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,s=t.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}t.pending=i}Vr=null}return n}function x0(n,e){do{var t=Lt;try{if(th(),pl.current=Yl,ql){for(var i=xt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}ql=!1}if($r=0,Ht=Dt=xt=null,Fo=!1,ta=0,ph.current=null,t===null||t.return===null){Nt=1,ra=e,Lt=null;break}e:{var s=n,o=t.return,c=t,u=e;if(e=Yt,c.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,_=c,a=_.tag;if(!(_.mode&1)&&(a===0||a===11||a===15)){var l=_.alternate;l?(_.updateQueue=l.updateQueue,_.memoizedState=l.memoizedState,_.lanes=l.lanes):(_.updateQueue=null,_.memoizedState=null)}var h=$p(o);if(h!==null){h.flags&=-257,Kp(h,o,c,s,e),h.mode&1&&Yp(s,d,e),e=h,u=d;var m=e.updateQueue;if(m===null){var x=new Set;x.add(u),e.updateQueue=x}else m.add(u);break e}else{if(!(e&1)){Yp(s,d,e),xh();break e}u=Error(ee(426))}}else if(_t&&c.mode&1){var p=$p(o);if(p!==null){!(p.flags&65536)&&(p.flags|=256),Kp(p,o,c,s,e),Qd(Ws(u,c));break e}}s=u=Ws(u,c),Nt!==4&&(Nt=2),ko===null?ko=[s]:ko.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var f=n0(s,u,e);Hp(s,f);break e;case 1:c=u;var g=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(_r===null||!_r.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=i0(s,c,e);Hp(s,S);break e}}s=s.return}while(s!==null)}M0(t)}catch(A){e=A,Lt===t&&t!==null&&(Lt=t=t.return);continue}break}while(!0)}function y0(){var n=$l.current;return $l.current=Yl,n===null?Yl:n}function xh(){(Nt===0||Nt===3||Nt===2)&&(Nt=4),Gt===null||!(Kr&268435455)&&!(mc&268435455)||ar(Gt,Yt)}function Jl(n,e){var t=Ze;Ze|=2;var i=y0();(Gt!==n||Yt!==e)&&(Ii=null,Xr(n,e));do try{Hy();break}catch(r){x0(n,r)}while(!0);if(th(),Ze=t,$l.current=i,Lt!==null)throw Error(ee(261));return Gt=null,Yt=0,Nt}function Hy(){for(;Lt!==null;)S0(Lt)}function Gy(){for(;Lt!==null&&!px();)S0(Lt)}function S0(n){var e=w0(n.alternate,n,Tn);n.memoizedProps=n.pendingProps,e===null?M0(n):Lt=e,ph.current=null}function M0(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=Fy(t,e),t!==null){t.flags&=32767,Lt=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Nt=6,Lt=null;return}}else if(t=Uy(t,e,Tn),t!==null){Lt=t;return}if(e=e.sibling,e!==null){Lt=e;return}Lt=e=n}while(e!==null);Nt===0&&(Nt=5)}function Fr(n,e,t){var i=ot,r=zn.transition;try{zn.transition=null,ot=1,Wy(n,e,t,i)}finally{zn.transition=r,ot=i}return null}function Wy(n,e,t,i){do Fs();while(ur!==null);if(Ze&6)throw Error(ee(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(ee(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(wx(n,s),n===Gt&&(Lt=Gt=null,Yt=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Na||(Na=!0,T0(Dl,function(){return Fs(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=zn.transition,zn.transition=null;var o=ot;ot=1;var c=Ze;Ze|=4,ph.current=null,ky(n,t),g0(t,n),uy(uf),Ul=!!cf,uf=cf=null,n.current=t,By(t),mx(),Ze=c,ot=o,zn.transition=s}else n.current=t;if(Na&&(Na=!1,ur=n,Zl=r),s=n.pendingLanes,s===0&&(_r=null),vx(t.stateNode),vn(n,Rt()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(Kl)throw Kl=!1,n=Pf,Pf=null,n;return Zl&1&&n.tag!==0&&Fs(),s=n.pendingLanes,s&1?n===Lf?Bo++:(Bo=0,Lf=n):Bo=0,Ar(),null}function Fs(){if(ur!==null){var n=n_(Zl),e=zn.transition,t=ot;try{if(zn.transition=null,ot=16>n?16:n,ur===null)var i=!1;else{if(n=ur,ur=null,Zl=0,Ze&6)throw Error(ee(331));var r=Ze;for(Ze|=4,ge=n.current;ge!==null;){var s=ge,o=s.child;if(ge.flags&16){var c=s.deletions;if(c!==null){for(var u=0;u<c.length;u++){var d=c[u];for(ge=d;ge!==null;){var _=ge;switch(_.tag){case 0:case 11:case 15:Oo(8,_,s)}var a=_.child;if(a!==null)a.return=_,ge=a;else for(;ge!==null;){_=ge;var l=_.sibling,h=_.return;if(h0(_),_===d){ge=null;break}if(l!==null){l.return=h,ge=l;break}ge=h}}}var m=s.alternate;if(m!==null){var x=m.child;if(x!==null){m.child=null;do{var p=x.sibling;x.sibling=null,x=p}while(x!==null)}}ge=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,ge=o;else e:for(;ge!==null;){if(s=ge,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Oo(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,ge=f;break e}ge=s.return}}var g=n.current;for(ge=g;ge!==null;){o=ge;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,ge=v;else e:for(o=g;ge!==null;){if(c=ge,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:pc(9,c)}}catch(A){Mt(c,c.return,A)}if(c===o){ge=null;break e}var S=c.sibling;if(S!==null){S.return=c.return,ge=S;break e}ge=c.return}}if(Ze=r,Ar(),gi&&typeof gi.onPostCommitFiberRoot=="function")try{gi.onPostCommitFiberRoot(oc,n)}catch{}i=!0}return i}finally{ot=t,zn.transition=e}}return!1}function cm(n,e,t){e=Ws(t,e),e=n0(n,e,1),n=gr(n,e,1),e=ln(),n!==null&&(ua(n,1,e),vn(n,e))}function Mt(n,e,t){if(n.tag===3)cm(n,n,t);else for(;e!==null;){if(e.tag===3){cm(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(_r===null||!_r.has(i))){n=Ws(t,n),n=i0(e,n,1),e=gr(e,n,1),n=ln(),e!==null&&(ua(e,1,n),vn(e,n));break}}e=e.return}}function Xy(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=ln(),n.pingedLanes|=n.suspendedLanes&t,Gt===n&&(Yt&t)===t&&(Nt===4||Nt===3&&(Yt&130023424)===Yt&&500>Rt()-gh?Xr(n,0):mh|=t),vn(n,e)}function E0(n,e){e===0&&(n.mode&1?(e=wa,wa<<=1,!(wa&130023424)&&(wa=4194304)):e=1);var t=ln();n=Wi(n,e),n!==null&&(ua(n,e,t),vn(n,t))}function jy(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),E0(n,t)}function qy(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(ee(314))}i!==null&&i.delete(e),E0(n,t)}var w0;w0=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||gn.current)mn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return mn=!1,Ny(n,e,t);mn=!!(n.flags&131072)}else mn=!1,_t&&e.flags&1048576&&R_(e,Hl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;gl(n,e),n=e.pendingProps;var r=zs(e,rn.current);Us(e,t),r=ch(null,e,i,n,r,t);var s=uh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,_n(i)?(s=!0,zl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,rh(e),r.updater=hc,e.stateNode=r,r._reactInternals=e,xf(e,i,n,t),e=Mf(null,e,i,!0,s,t)):(e.tag=0,_t&&s&&Zd(e),on(null,e,r,t),e=e.child),e;case 16:i=e.elementType;e:{switch(gl(n,e),n=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=$y(i),n=$n(i,n),r){case 0:e=Sf(null,e,i,n,t);break e;case 1:e=Qp(null,e,i,n,t);break e;case 11:e=Zp(null,e,i,n,t);break e;case 14:e=Jp(null,e,i,$n(i.type,n),t);break e}throw Error(ee(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:$n(i,r),Sf(n,e,i,r,t);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:$n(i,r),Qp(n,e,i,r,t);case 3:e:{if(a0(e),n===null)throw Error(ee(387));i=e.pendingProps,s=e.memoizedState,r=s.element,N_(n,e),Xl(e,i,null,t);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ws(Error(ee(423)),e),e=em(n,e,i,t,r);break e}else if(i!==r){r=Ws(Error(ee(424)),e),e=em(n,e,i,t,r);break e}else for(Rn=mr(e.stateNode.containerInfo.firstChild),Cn=e,_t=!0,Jn=null,t=I_(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Vs(),i===r){e=Xi(n,e,t);break e}on(n,e,i,t)}e=e.child}return e;case 5:return U_(e),n===null&&gf(e),i=e.type,r=e.pendingProps,s=n!==null?n.memoizedProps:null,o=r.children,ff(i,r)?o=null:s!==null&&ff(i,s)&&(e.flags|=32),o0(n,e),on(n,e,o,t),e.child;case 6:return n===null&&gf(e),null;case 13:return l0(n,e,t);case 4:return sh(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=Hs(e,null,i,t):on(n,e,i,t),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:$n(i,r),Zp(n,e,i,r,t);case 7:return on(n,e,e.pendingProps,t),e.child;case 8:return on(n,e,e.pendingProps.children,t),e.child;case 12:return on(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,pt(Gl,i._currentValue),i._currentValue=o,s!==null)if(ii(s.value,o)){if(s.children===r.children&&!gn.current){e=Xi(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var c=s.dependencies;if(c!==null){o=s.child;for(var u=c.firstContext;u!==null;){if(u.context===i){if(s.tag===1){u=Bi(-1,t&-t),u.tag=2;var d=s.updateQueue;if(d!==null){d=d.shared;var _=d.pending;_===null?u.next=u:(u.next=_.next,_.next=u),d.pending=u}}s.lanes|=t,u=s.alternate,u!==null&&(u.lanes|=t),_f(s.return,t,e),c.lanes|=t;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ee(341));o.lanes|=t,c=o.alternate,c!==null&&(c.lanes|=t),_f(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}on(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Us(e,t),r=Vn(r),i=i(r),e.flags|=1,on(n,e,i,t),e.child;case 14:return i=e.type,r=$n(i,e.pendingProps),r=$n(i.type,r),Jp(n,e,i,r,t);case 15:return r0(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:$n(i,r),gl(n,e),e.tag=1,_n(i)?(n=!0,zl(e)):n=!1,Us(e,t),t0(e,i,r),xf(e,i,r,t),Mf(null,e,i,!0,n,t);case 19:return c0(n,e,t);case 22:return s0(n,e,t)}throw Error(ee(156,e.tag))};function T0(n,e){return Jg(n,e)}function Yy(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kn(n,e,t,i){return new Yy(n,e,t,i)}function yh(n){return n=n.prototype,!(!n||!n.isReactComponent)}function $y(n){if(typeof n=="function")return yh(n)?1:0;if(n!=null){if(n=n.$$typeof,n===Bd)return 11;if(n===zd)return 14}return 2}function xr(n,e){var t=n.alternate;return t===null?(t=kn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function xl(n,e,t,i,r,s){var o=2;if(i=n,typeof n=="function")yh(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case ys:return jr(t.children,r,s,e);case kd:o=8,r|=8;break;case Hu:return n=kn(12,t,e,r|2),n.elementType=Hu,n.lanes=s,n;case Gu:return n=kn(13,t,e,r),n.elementType=Gu,n.lanes=s,n;case Wu:return n=kn(19,t,e,r),n.elementType=Wu,n.lanes=s,n;case Ug:return gc(t,r,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case Dg:o=10;break e;case Ng:o=9;break e;case Bd:o=11;break e;case zd:o=14;break e;case rr:o=16,i=null;break e}throw Error(ee(130,n==null?n:typeof n,""))}return e=kn(o,t,e,r),e.elementType=n,e.type=i,e.lanes=s,e}function jr(n,e,t,i){return n=kn(7,n,i,e),n.lanes=t,n}function gc(n,e,t,i){return n=kn(22,n,i,e),n.elementType=Ug,n.lanes=t,n.stateNode={isHidden:!1},n}function Qc(n,e,t){return n=kn(6,n,null,e),n.lanes=t,n}function eu(n,e,t){return e=kn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function Ky(n,e,t,i,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Nc(0),this.expirationTimes=Nc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Nc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Sh(n,e,t,i,r,s,o,c,u){return n=new Ky(n,e,t,c,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=kn(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},rh(s),n}function Zy(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:xs,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function A0(n){if(!n)return Mr;n=n._reactInternals;e:{if(es(n)!==n||n.tag!==1)throw Error(ee(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(_n(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ee(171))}if(n.tag===1){var t=n.type;if(_n(t))return A_(n,t,e)}return e}function b0(n,e,t,i,r,s,o,c,u){return n=Sh(t,i,!0,n,r,s,o,c,u),n.context=A0(null),t=n.current,i=ln(),r=vr(t),s=Bi(i,r),s.callback=e??null,gr(t,s,r),n.current.lanes=r,ua(n,r,i),vn(n,i),n}function _c(n,e,t,i){var r=e.current,s=ln(),o=vr(r);return t=A0(t),e.context===null?e.context=t:e.pendingContext=t,e=Bi(s,o),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=gr(r,e,o),n!==null&&(ni(n,r,o,s),hl(n,r,o)),o}function Ql(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function um(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function Mh(n,e){um(n,e),(n=n.alternate)&&um(n,e)}function Jy(){return null}var R0=typeof reportError=="function"?reportError:function(n){console.error(n)};function Eh(n){this._internalRoot=n}vc.prototype.render=Eh.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(ee(409));_c(n,e,null,null)};vc.prototype.unmount=Eh.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Zr(function(){_c(null,n,null,null)}),e[Gi]=null}};function vc(n){this._internalRoot=n}vc.prototype.unstable_scheduleHydration=function(n){if(n){var e=s_();n={blockedOn:null,target:n,priority:e};for(var t=0;t<or.length&&e!==0&&e<or[t].priority;t++);or.splice(t,0,n),t===0&&a_(n)}};function wh(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function xc(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function fm(){}function Qy(n,e,t,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var d=Ql(o);s.call(d)}}var o=b0(e,i,n,0,null,!1,!1,"",fm);return n._reactRootContainer=o,n[Gi]=o.current,Ko(n.nodeType===8?n.parentNode:n),Zr(),o}for(;r=n.lastChild;)n.removeChild(r);if(typeof i=="function"){var c=i;i=function(){var d=Ql(u);c.call(d)}}var u=Sh(n,0,!1,null,null,!1,!1,"",fm);return n._reactRootContainer=u,n[Gi]=u.current,Ko(n.nodeType===8?n.parentNode:n),Zr(function(){_c(e,u,t,i)}),u}function yc(n,e,t,i,r){var s=t._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var c=r;r=function(){var u=Ql(o);c.call(u)}}_c(e,o,n,r)}else o=Qy(t,e,n,r,i);return Ql(o)}i_=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=Ao(e.pendingLanes);t!==0&&(Gd(e,t|1),vn(e,Rt()),!(Ze&6)&&(Xs=Rt()+500,Ar()))}break;case 13:Zr(function(){var i=Wi(n,1);if(i!==null){var r=ln();ni(i,n,1,r)}}),Mh(n,1)}};Wd=function(n){if(n.tag===13){var e=Wi(n,134217728);if(e!==null){var t=ln();ni(e,n,134217728,t)}Mh(n,134217728)}};r_=function(n){if(n.tag===13){var e=vr(n),t=Wi(n,e);if(t!==null){var i=ln();ni(t,n,e,i)}Mh(n,e)}};s_=function(){return ot};o_=function(n,e){var t=ot;try{return ot=n,e()}finally{ot=t}};ef=function(n,e,t){switch(e){case"input":if(qu(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var r=uc(i);if(!r)throw Error(ee(90));Og(i),qu(i,r)}}}break;case"textarea":Bg(n,t);break;case"select":e=t.value,e!=null&&Ls(n,!!t.multiple,e,!1)}};jg=_h;qg=Zr;var eS={usingClientEntryPoint:!1,Events:[da,ws,uc,Wg,Xg,_h]},po={findFiberByHostInstance:zr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},tS={bundleType:po.bundleType,version:po.version,rendererPackageName:po.rendererPackageName,rendererConfig:po.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Yi.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Kg(n),n===null?null:n.stateNode},findFiberByHostInstance:po.findFiberByHostInstance||Jy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ua=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ua.isDisabled&&Ua.supportsFiber)try{oc=Ua.inject(tS),gi=Ua}catch{}}Ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=eS;Ln.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!wh(e))throw Error(ee(200));return Zy(n,e,null,t)};Ln.createRoot=function(n,e){if(!wh(n))throw Error(ee(299));var t=!1,i="",r=R0;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Sh(n,1,!1,null,null,t,!1,i,r),n[Gi]=e.current,Ko(n.nodeType===8?n.parentNode:n),new Eh(e)};Ln.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(ee(188)):(n=Object.keys(n).join(","),Error(ee(268,n)));return n=Kg(e),n=n===null?null:n.stateNode,n};Ln.flushSync=function(n){return Zr(n)};Ln.hydrate=function(n,e,t){if(!xc(e))throw Error(ee(200));return yc(null,n,e,!0,t)};Ln.hydrateRoot=function(n,e,t){if(!wh(n))throw Error(ee(405));var i=t!=null&&t.hydratedSources||null,r=!1,s="",o=R0;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=b0(e,null,n,1,t??null,r,!1,s,o),n[Gi]=e.current,Ko(n),i)for(n=0;n<i.length;n++)t=i[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new vc(e)};Ln.render=function(n,e,t){if(!xc(e))throw Error(ee(200));return yc(null,n,e,!1,t)};Ln.unmountComponentAtNode=function(n){if(!xc(n))throw Error(ee(40));return n._reactRootContainer?(Zr(function(){yc(null,null,n,!1,function(){n._reactRootContainer=null,n[Gi]=null})}),!0):!1};Ln.unstable_batchedUpdates=_h;Ln.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!xc(t))throw Error(ee(200));if(n==null||n._reactInternals===void 0)throw Error(ee(38));return yc(n,e,t,!1,i)};Ln.version="18.3.1-next-f1338f8080-20240426";function C0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(C0)}catch(n){console.error(n)}}C0(),Cg.exports=Ln;var nS=Cg.exports,dm=nS;zu.createRoot=dm.createRoot,zu.hydrateRoot=dm.hydrateRoot;var Bn=(n=>(n.LOBBY="lobby",n.PLAYING="playing",n.GAME_OVER="game_over",n.WIN="win",n))(Bn||{}),ht=(n=>(n.JOIN_ROOM="join_room",n.LEAVE_ROOM="leave_room",n.PLAYER_MOVE="player_move",n.COLLECT_PAGE="collect_page",n.PUZZLE_INTERACT="puzzle_interact",n.PLAYER_DIED="player_died",n.VOICE_DATA="voice_data",n.PLAYER_LOOKING_AT_MONSTER="player_looking_at_monster",n.ROOM_STATE="room_state",n.PLAYER_JOINED="player_joined",n.PLAYER_LEFT="player_left",n.GAME_START="game_start",n.GAME_OVER="game_over",n.GAME_WIN="game_win",n.MONSTER_UPDATE="monster_update",n.PAGE_COLLECTED="page_collected",n.PUZZLE_UPDATE="puzzle_update",n.JUMPSCARE="jumpscare",n.AMBIENT_EVENT="ambient_event",n.VOICE_RECEIVE="voice_receive",n.PLAYER_SCREAMED="player_screamed",n))(ht||{});const Mi=Object.create(null);Mi.open="0";Mi.close="1";Mi.ping="2";Mi.pong="3";Mi.message="4";Mi.upgrade="5";Mi.noop="6";const yl=Object.create(null);Object.keys(Mi).forEach(n=>{yl[Mi[n]]=n});const Nf={type:"error",data:"parser error"},P0=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",L0=typeof ArrayBuffer=="function",I0=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,Th=({type:n,data:e},t,i)=>P0&&e instanceof Blob?t?i(e):hm(e,i):L0&&(e instanceof ArrayBuffer||I0(e))?t?i(e):hm(new Blob([e]),i):i(Mi[n]+(e||"")),hm=(n,e)=>{const t=new FileReader;return t.onload=function(){const i=t.result.split(",")[1];e("b"+(i||""))},t.readAsDataURL(n)};function pm(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}let tu;function iS(n,e){if(P0&&n.data instanceof Blob)return n.data.arrayBuffer().then(pm).then(e);if(L0&&(n.data instanceof ArrayBuffer||I0(n.data)))return e(pm(n.data));Th(n,!1,t=>{tu||(tu=new TextEncoder),e(tu.encode(t))})}const mm="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ro=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<mm.length;n++)Ro[mm.charCodeAt(n)]=n;const rS=n=>{let e=n.length*.75,t=n.length,i,r=0,s,o,c,u;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);const d=new ArrayBuffer(e),_=new Uint8Array(d);for(i=0;i<t;i+=4)s=Ro[n.charCodeAt(i)],o=Ro[n.charCodeAt(i+1)],c=Ro[n.charCodeAt(i+2)],u=Ro[n.charCodeAt(i+3)],_[r++]=s<<2|o>>4,_[r++]=(o&15)<<4|c>>2,_[r++]=(c&3)<<6|u&63;return d},sS=typeof ArrayBuffer=="function",Ah=(n,e)=>{if(typeof n!="string")return{type:"message",data:D0(n,e)};const t=n.charAt(0);return t==="b"?{type:"message",data:oS(n.substring(1),e)}:yl[t]?n.length>1?{type:yl[t],data:n.substring(1)}:{type:yl[t]}:Nf},oS=(n,e)=>{if(sS){const t=rS(n);return D0(t,e)}else return{base64:!0,data:n}},D0=(n,e)=>{switch(e){case"blob":return n instanceof Blob?n:new Blob([n]);case"arraybuffer":default:return n instanceof ArrayBuffer?n:n.buffer}},N0="",aS=(n,e)=>{const t=n.length,i=new Array(t);let r=0;n.forEach((s,o)=>{Th(s,!1,c=>{i[o]=c,++r===t&&e(i.join(N0))})})},lS=(n,e)=>{const t=n.split(N0),i=[];for(let r=0;r<t.length;r++){const s=Ah(t[r],e);if(i.push(s),s.type==="error")break}return i};function cS(){return new TransformStream({transform(n,e){iS(n,t=>{const i=t.length;let r;if(i<126)r=new Uint8Array(1),new DataView(r.buffer).setUint8(0,i);else if(i<65536){r=new Uint8Array(3);const s=new DataView(r.buffer);s.setUint8(0,126),s.setUint16(1,i)}else{r=new Uint8Array(9);const s=new DataView(r.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(i))}n.data&&typeof n.data!="string"&&(r[0]|=128),e.enqueue(r),e.enqueue(t)})}})}let nu;function Fa(n){return n.reduce((e,t)=>e+t.length,0)}function Oa(n,e){if(n[0].length===e)return n.shift();const t=new Uint8Array(e);let i=0;for(let r=0;r<e;r++)t[r]=n[0][i++],i===n[0].length&&(n.shift(),i=0);return n.length&&i<n[0].length&&(n[0]=n[0].slice(i)),t}function uS(n,e){nu||(nu=new TextDecoder);const t=[];let i=0,r=-1,s=!1;return new TransformStream({transform(o,c){for(t.push(o);;){if(i===0){if(Fa(t)<1)break;const u=Oa(t,1);s=(u[0]&128)===128,r=u[0]&127,r<126?i=3:r===126?i=1:i=2}else if(i===1){if(Fa(t)<2)break;const u=Oa(t,2);r=new DataView(u.buffer,u.byteOffset,u.length).getUint16(0),i=3}else if(i===2){if(Fa(t)<8)break;const u=Oa(t,8),d=new DataView(u.buffer,u.byteOffset,u.length),_=d.getUint32(0);if(_>Math.pow(2,21)-1){c.enqueue(Nf);break}r=_*Math.pow(2,32)+d.getUint32(4),i=3}else{if(Fa(t)<r)break;const u=Oa(t,r);c.enqueue(Ah(s?u:nu.decode(u),e)),i=0}if(r===0||r>n){c.enqueue(Nf);break}}}})}const U0=4;function It(n){if(n)return fS(n)}function fS(n){for(var e in It.prototype)n[e]=It.prototype[e];return n}It.prototype.on=It.prototype.addEventListener=function(n,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(e),this};It.prototype.once=function(n,e){function t(){this.off(n,t),e.apply(this,arguments)}return t.fn=e,this.on(n,t),this};It.prototype.off=It.prototype.removeListener=It.prototype.removeAllListeners=It.prototype.removeEventListener=function(n,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+n];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var i,r=0;r<t.length;r++)if(i=t[r],i===e||i.fn===e){t.splice(r,1);break}return t.length===0&&delete this._callbacks["$"+n],this};It.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+n],i=1;i<arguments.length;i++)e[i-1]=arguments[i];if(t){t=t.slice(0);for(var i=0,r=t.length;i<r;++i)t[i].apply(this,e)}return this};It.prototype.emitReserved=It.prototype.emit;It.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};It.prototype.hasListeners=function(n){return!!this.listeners(n).length};const Sc=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),On=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),dS="arraybuffer";function F0(n,...e){return e.reduce((t,i)=>(n.hasOwnProperty(i)&&(t[i]=n[i]),t),{})}const hS=On.setTimeout,pS=On.clearTimeout;function Mc(n,e){e.useNativeTimers?(n.setTimeoutFn=hS.bind(On),n.clearTimeoutFn=pS.bind(On)):(n.setTimeoutFn=On.setTimeout.bind(On),n.clearTimeoutFn=On.clearTimeout.bind(On))}const mS=1.33;function gS(n){return typeof n=="string"?_S(n):Math.ceil((n.byteLength||n.size)*mS)}function _S(n){let e=0,t=0;for(let i=0,r=n.length;i<r;i++)e=n.charCodeAt(i),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(i++,t+=4);return t}function O0(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function vS(n){let e="";for(let t in n)n.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(n[t]));return e}function xS(n){let e={},t=n.split("&");for(let i=0,r=t.length;i<r;i++){let s=t[i].split("=");e[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return e}class yS extends Error{constructor(e,t,i){super(e),this.description=t,this.context=i,this.type="TransportError"}}class bh extends It{constructor(e){super(),this.writable=!1,Mc(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,i){return super.emitReserved("error",new yS(e,t,i)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=Ah(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const t=vS(e);return t.length?"?"+t:""}}class SS extends bh{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let i=0;this._polling&&(i++,this.once("pollComplete",function(){--i||t()})),this.writable||(i++,this.once("drain",function(){--i||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=i=>{if(this.readyState==="opening"&&i.type==="open"&&this.onOpen(),i.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(i)};lS(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,aS(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=O0()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}}let k0=!1;try{k0=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const MS=k0;function ES(){}class wS extends SS{constructor(e){if(super(e),typeof location<"u"){const t=location.protocol==="https:";let i=location.port;i||(i=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||i!==e.port}}doWrite(e,t){const i=this.request({method:"POST",data:e});i.on("success",t),i.on("error",(r,s)=>{this.onError("xhr post error",r,s)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,i)=>{this.onError("xhr poll error",t,i)}),this.pollXhr=e}}class vi extends It{constructor(e,t,i){super(),this.createRequest=e,Mc(this,i),this._opts=i,this._method=i.method||"GET",this._uri=t,this._data=i.data!==void 0?i.data:null,this._create()}_create(){var e;const t=F0(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const i=this._xhr=this.createRequest(t);try{i.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){i.setDisableHeaderCheck&&i.setDisableHeaderCheck(!0);for(let r in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(r)&&i.setRequestHeader(r,this._opts.extraHeaders[r])}}catch{}if(this._method==="POST")try{i.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{i.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(i),"withCredentials"in i&&(i.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(i.timeout=this._opts.requestTimeout),i.onreadystatechange=()=>{var r;i.readyState===3&&((r=this._opts.cookieJar)===null||r===void 0||r.parseCookies(i.getResponseHeader("set-cookie"))),i.readyState===4&&(i.status===200||i.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof i.status=="number"?i.status:0)},0))},i.send(this._data)}catch(r){this.setTimeoutFn(()=>{this._onError(r)},0);return}typeof document<"u"&&(this._index=vi.requestsCount++,vi.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=ES,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete vi.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}vi.requestsCount=0;vi.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",gm);else if(typeof addEventListener=="function"){const n="onpagehide"in On?"pagehide":"unload";addEventListener(n,gm,!1)}}function gm(){for(let n in vi.requests)vi.requests.hasOwnProperty(n)&&vi.requests[n].abort()}const TS=function(){const n=B0({xdomain:!1});return n&&n.responseType!==null}();class AS extends wS{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=TS&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new vi(B0,this.uri(),e)}}function B0(n){const e=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||MS))return new XMLHttpRequest}catch{}if(!e)try{return new On[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const z0=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class bS extends bh{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,i=z0?{}:F0(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(i.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,i)}catch(r){return this.emitReserved("error",r)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const i=e[t],r=t===e.length-1;Th(i,this.supportsBinary,s=>{try{this.doWrite(i,s)}catch{}r&&Sc(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=O0()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const iu=On.WebSocket||On.MozWebSocket;class RS extends bS{createSocket(e,t,i){return z0?new iu(e,t,i):t?new iu(e,t):new iu(e)}doWrite(e,t){this.ws.send(t)}}class CS extends bh{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=uS(Number.MAX_SAFE_INTEGER,this.socket.binaryType),i=e.readable.pipeThrough(t).getReader(),r=cS();r.readable.pipeTo(e.writable),this._writer=r.writable.getWriter();const s=()=>{i.read().then(({done:c,value:u})=>{c||(this.onPacket(u),s())}).catch(c=>{})};s();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this._writer.write(o).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const i=e[t],r=t===e.length-1;this._writer.write(i).then(()=>{r&&Sc(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const PS={websocket:RS,webtransport:CS,polling:AS},LS=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,IS=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Uf(n){if(n.length>8e3)throw"URI too long";const e=n,t=n.indexOf("["),i=n.indexOf("]");t!=-1&&i!=-1&&(n=n.substring(0,t)+n.substring(t,i).replace(/:/g,";")+n.substring(i,n.length));let r=LS.exec(n||""),s={},o=14;for(;o--;)s[IS[o]]=r[o]||"";return t!=-1&&i!=-1&&(s.source=e,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s.pathNames=DS(s,s.path),s.queryKey=NS(s,s.query),s}function DS(n,e){const t=/\/{2,9}/g,i=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&i.splice(0,1),e.slice(-1)=="/"&&i.splice(i.length-1,1),i}function NS(n,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(i,r,s){r&&(t[r]=s)}),t}const Ff=typeof addEventListener=="function"&&typeof removeEventListener=="function",Sl=[];Ff&&addEventListener("offline",()=>{Sl.forEach(n=>n())},!1);class yr extends It{constructor(e,t){if(super(),this.binaryType=dS,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(t=e,e=null),e){const i=Uf(e);t.hostname=i.host,t.secure=i.protocol==="https"||i.protocol==="wss",t.port=i.port,i.query&&(t.query=i.query)}else t.host&&(t.hostname=Uf(t.host).host);Mc(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},t.transports.forEach(i=>{const r=i.prototype.name;this.transports.push(r),this._transportsByName[r]=i}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=xS(this.opts.query)),Ff&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Sl.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=U0,t.transport=e,this.id&&(t.sid=this.id);const i=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](i)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&yr.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",t=>this._onClose("transport close",t))}onOpen(){this.readyState="open",yr.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let i=0;i<this.writeBuffer.length;i++){const r=this.writeBuffer[i].data;if(r&&(t+=gS(r)),i>0&&t>this._maxPayload)return this.writeBuffer.slice(0,i);t+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,Sc(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,i){return this._sendPacket("message",e,t,i),this}send(e,t,i){return this._sendPacket("message",e,t,i),this}_sendPacket(e,t,i,r){if(typeof t=="function"&&(r=t,t=void 0),typeof i=="function"&&(r=i,i=null),this.readyState==="closing"||this.readyState==="closed")return;i=i||{},i.compress=i.compress!==!1;const s={type:e,data:t,options:i};this.emitReserved("packetCreate",s),this.writeBuffer.push(s),r&&this.once("flush",r),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},i=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?i():e()}):this.upgrading?i():e()),this}_onError(e){if(yr.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Ff&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const i=Sl.indexOf(this._offlineEventListener);i!==-1&&Sl.splice(i,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}}yr.protocol=U0;class US extends yr{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),i=!1;yr.priorWebsocketSuccess=!1;const r=()=>{i||(t.send([{type:"ping",data:"probe"}]),t.once("packet",a=>{if(!i)if(a.type==="pong"&&a.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;yr.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{i||this.readyState!=="closed"&&(_(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const l=new Error("probe error");l.transport=t.name,this.emitReserved("upgradeError",l)}}))};function s(){i||(i=!0,_(),t.close(),t=null)}const o=a=>{const l=new Error("probe error: "+a);l.transport=t.name,s(),this.emitReserved("upgradeError",l)};function c(){o("transport closed")}function u(){o("socket closed")}function d(a){t&&a.name!==t.name&&s()}const _=()=>{t.removeListener("open",r),t.removeListener("error",o),t.removeListener("close",c),this.off("close",u),this.off("upgrading",d)};t.once("open",r),t.once("error",o),t.once("close",c),this.once("close",u),this.once("upgrading",d),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{i||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const t=[];for(let i=0;i<e.length;i++)~this.transports.indexOf(e[i])&&t.push(e[i]);return t}}let FS=class extends US{constructor(e,t={}){const i=typeof e=="object"?e:t;(!i.transports||i.transports&&typeof i.transports[0]=="string")&&(i.transports=(i.transports||["polling","websocket","webtransport"]).map(r=>PS[r]).filter(r=>!!r)),super(e,i)}};function OS(n,e="",t){let i=n;t=t||typeof location<"u"&&location,n==null&&(n=t.protocol+"//"+t.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=t.protocol+n:n=t.host+n),/^(https?|wss?):\/\//.test(n)||(typeof t<"u"?n=t.protocol+"//"+n:n="https://"+n),i=Uf(n)),i.port||(/^(http|ws)$/.test(i.protocol)?i.port="80":/^(http|ws)s$/.test(i.protocol)&&(i.port="443")),i.path=i.path||"/";const s=i.host.indexOf(":")!==-1?"["+i.host+"]":i.host;return i.id=i.protocol+"://"+s+":"+i.port+e,i.href=i.protocol+"://"+s+(t&&t.port===i.port?"":":"+i.port),i}const kS=typeof ArrayBuffer=="function",BS=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,V0=Object.prototype.toString,zS=typeof Blob=="function"||typeof Blob<"u"&&V0.call(Blob)==="[object BlobConstructor]",VS=typeof File=="function"||typeof File<"u"&&V0.call(File)==="[object FileConstructor]";function Rh(n){return kS&&(n instanceof ArrayBuffer||BS(n))||zS&&n instanceof Blob||VS&&n instanceof File}function Ml(n,e){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let t=0,i=n.length;t<i;t++)if(Ml(n[t]))return!0;return!1}if(Rh(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return Ml(n.toJSON(),!0);for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&Ml(n[t]))return!0;return!1}function HS(n){const e=[],t=n.data,i=n;return i.data=Of(t,e),i.attachments=e.length,{packet:i,buffers:e}}function Of(n,e){if(!n)return n;if(Rh(n)){const t={_placeholder:!0,num:e.length};return e.push(n),t}else if(Array.isArray(n)){const t=new Array(n.length);for(let i=0;i<n.length;i++)t[i]=Of(n[i],e);return t}else if(typeof n=="object"&&!(n instanceof Date)){const t={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=Of(n[i],e));return t}return n}function GS(n,e){return n.data=kf(n.data,e),delete n.attachments,n}function kf(n,e){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<e.length)return e[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let t=0;t<n.length;t++)n[t]=kf(n[t],e);else if(typeof n=="object")for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&(n[t]=kf(n[t],e));return n}const WS=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var We;(function(n){n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK"})(We||(We={}));class XS{constructor(e){this.replacer=e}encode(e){return(e.type===We.EVENT||e.type===We.ACK)&&Ml(e)?this.encodeAsBinary({type:e.type===We.EVENT?We.BINARY_EVENT:We.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===We.BINARY_EVENT||e.type===We.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=HS(e),i=this.encodeAsString(t.packet),r=t.buffers;return r.unshift(i),r}}class Ch extends It{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e=="function"?{reviver:e}:e)}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const i=t.type===We.BINARY_EVENT;i||t.type===We.BINARY_ACK?(t.type=i?We.EVENT:We.ACK,this.reconstructor=new jS(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(Rh(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const i={type:Number(e.charAt(0))};if(We[i.type]===void 0)throw new Error("unknown packet type "+i.type);if(i.type===We.BINARY_EVENT||i.type===We.BINARY_ACK){const s=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const o=e.substring(s,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");const c=Number(o);if(!qS(c)||c<0)throw new Error("Illegal attachments");if(c>this.opts.maxAttachments)throw new Error("too many attachments");i.attachments=c}if(e.charAt(t+1)==="/"){const s=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););i.nsp=e.substring(s,t)}else i.nsp="/";const r=e.charAt(t+1);if(r!==""&&Number(r)==r){const s=t+1;for(;++t;){const o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}i.id=Number(e.substring(s,t+1))}if(e.charAt(++t)){const s=this.tryParse(e.substr(t));if(Ch.isPayloadValid(i.type,s))i.data=s;else throw new Error("invalid payload")}return i}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case We.CONNECT:return _m(t);case We.DISCONNECT:return t===void 0;case We.CONNECT_ERROR:return typeof t=="string"||_m(t);case We.EVENT:case We.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&WS.indexOf(t[0])===-1);case We.ACK:case We.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class jS{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=GS(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const qS=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function _m(n){return Object.prototype.toString.call(n)==="[object Object]"}const YS=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Ch,Encoder:XS,get PacketType(){return We}},Symbol.toStringTag,{value:"Module"}));function Zn(n,e,t){return n.on(e,t),function(){n.off(e,t)}}const $S=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class H0 extends It{constructor(e,t,i){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,i&&i.auth&&(this.auth=i.auth),this._opts=Object.assign({},i),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[Zn(e,"open",this.onopen.bind(this)),Zn(e,"packet",this.onpacket.bind(this)),Zn(e,"error",this.onerror.bind(this)),Zn(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var i,r,s;if($S.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const o={type:We.EVENT,data:t};if(o.options={},o.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const _=this.ids++,a=t.pop();this._registerAckCallback(_,a),o.id=_}const c=(r=(i=this.io.engine)===null||i===void 0?void 0:i.transport)===null||r===void 0?void 0:r.writable,u=this.connected&&!(!((s=this.io.engine)===null||s===void 0)&&s._hasPingExpired());return this.flags.volatile&&!c||(u?(this.notifyOutgoingListeners(o),this.packet(o)):this.sendBuffer.push(o)),this.flags={},this}_registerAckCallback(e,t){var i;const r=(i=this.flags.timeout)!==null&&i!==void 0?i:this._opts.ackTimeout;if(r===void 0){this.acks[e]=t;return}const s=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let c=0;c<this.sendBuffer.length;c++)this.sendBuffer[c].id===e&&this.sendBuffer.splice(c,1);t.call(this,new Error("operation has timed out"))},r),o=(...c)=>{this.io.clearTimeoutFn(s),t.apply(this,c)};o.withError=!0,this.acks[e]=o}emitWithAck(e,...t){return new Promise((i,r)=>{const s=(o,c)=>o?r(o):i(c);s.withError=!0,t.push(s),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const i={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((r,...s)=>(this._queue[0],r!==null?i.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(r)):(this._queue.shift(),t&&t(null,...s)),i.pending=!1,this._drainQueue())),this._queue.push(i),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:We.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(i=>String(i.id)===e)){const i=this.acks[e];delete this.acks[e],i.withError&&i.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case We.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case We.EVENT:case We.BINARY_EVENT:this.onevent(e);break;case We.ACK:case We.BINARY_ACK:this.onack(e);break;case We.DISCONNECT:this.ondisconnect();break;case We.CONNECT_ERROR:this.destroy();const i=new Error(e.data.message);i.data=e.data.data,this.emitReserved("connect_error",i);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const i of t)i.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let i=!1;return function(...r){i||(i=!0,t.packet({type:We.ACK,id:e,data:r}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:We.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const i of t)i.apply(this,e.data)}}}function to(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}to.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*n);n=Math.floor(e*10)&1?n+t:n-t}return Math.min(n,this.max)|0};to.prototype.reset=function(){this.attempts=0};to.prototype.setMin=function(n){this.ms=n};to.prototype.setMax=function(n){this.max=n};to.prototype.setJitter=function(n){this.jitter=n};class Bf extends It{constructor(e,t){var i;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,Mc(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((i=t.randomizationFactor)!==null&&i!==void 0?i:.5),this.backoff=new to({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const r=t.parser||YS;this.encoder=new r.Encoder,this.decoder=new r.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new FS(this.uri,this.opts);const t=this.engine,i=this;this._readyState="opening",this.skipReconnect=!1;const r=Zn(t,"open",function(){i.onopen(),e&&e()}),s=c=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",c),e?e(c):this.maybeReconnectOnOpen()},o=Zn(t,"error",s);if(this._timeout!==!1){const c=this._timeout,u=this.setTimeoutFn(()=>{r(),s(new Error("timeout")),t.close()},c);this.opts.autoUnref&&u.unref(),this.subs.push(()=>{this.clearTimeoutFn(u)})}return this.subs.push(r),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(Zn(e,"ping",this.onping.bind(this)),Zn(e,"data",this.ondata.bind(this)),Zn(e,"error",this.onerror.bind(this)),Zn(e,"close",this.onclose.bind(this)),Zn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){Sc(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let i=this.nsps[e];return i?this._autoConnect&&!i.active&&i.connect():(i=new H0(this,e,t),this.nsps[e]=i),i}_destroy(e){const t=Object.keys(this.nsps);for(const i of t)if(this.nsps[i].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let i=0;i<t.length;i++)this.engine.write(t[i],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var i;this.cleanup(),(i=this.engine)===null||i===void 0||i.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const i=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(r=>{r?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",r)):e.onreconnect()}))},t);this.opts.autoUnref&&i.unref(),this.subs.push(()=>{this.clearTimeoutFn(i)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const mo={};function El(n,e){typeof n=="object"&&(e=n,n=void 0),e=e||{};const t=OS(n,e.path||"/socket.io"),i=t.source,r=t.id,s=t.path,o=mo[r]&&s in mo[r].nsps,c=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let u;return c?u=new Bf(i,e):(mo[r]||(mo[r]=new Bf(i,e)),u=mo[r]),t.query&&!e.query&&(e.query=t.queryKey),u.socket(t.path,e)}Object.assign(El,{Manager:Bf,Socket:H0,io:El,connect:El});const ka="http://localhost:3001";class KS{constructor(){He(this,"socket",null);He(this,"state",{phase:Bn.LOBBY,roomId:null,roomName:null,playerId:null,playerName:"Player",players:new Map,pages:[],puzzles:[],monster:null,pagesCollected:0,totalPages:8,availableRooms:[],myPlayer:null,showInteraction:null,monsterDistance:1/0,isConnected:!1});He(this,"listeners",new Set)}connect(){var e;(e=this.socket)!=null&&e.connected||(this.socket=El(ka,{autoConnect:!0}),this.socket.on("connect",()=>{this.update({playerId:this.socket.id??null,isConnected:!0}),this.fetchRooms()}),this.socket.on("disconnect",()=>{this.update({isConnected:!1})}),this.socket.on(ht.ROOM_STATE,t=>{var s;const i=new Map;t.players.forEach(o=>i.set(o.id,o));const r=i.get(((s=this.socket)==null?void 0:s.id)||"")||null;this.update({roomId:t.room.id,roomName:t.room.name,phase:t.room.phase,pages:t.room.pages,puzzles:t.room.puzzles,monster:t.room.monster,pagesCollected:t.room.pagesCollected,totalPages:t.room.totalPages,players:i,myPlayer:r})}),this.socket.on(ht.GAME_START,t=>{var s;const i=new Map;t.players.forEach(o=>i.set(o.id,o));const r=i.get(((s=this.socket)==null?void 0:s.id)||"")||null;this.update({phase:Bn.PLAYING,pages:t.room.pages,puzzles:t.room.puzzles,monster:t.room.monster,pagesCollected:0,players:i,myPlayer:r})}),this.socket.on(ht.PLAYER_JOINED,({player:t})=>{const i=new Map(this.state.players);i.set(t.id,t),this.update({players:i})}),this.socket.on(ht.PLAYER_LEFT,({playerId:t})=>{const i=new Map(this.state.players);i.delete(t),this.update({players:i})}),this.socket.on(ht.MONSTER_UPDATE,t=>{var c;const i=(c=this.socket)==null?void 0:c.id;let r=1/0;const s=new Map(this.state.players);t.players.forEach(u=>{const d=s.get(u.id);if(d&&s.set(u.id,{...d,...u}),i&&u.id===i){const _=s.get(i);if(_&&t.monster){const a=_.position.x-t.monster.position.x,l=_.position.z-t.monster.position.z;r=Math.sqrt(a*a+l*l)}}});const o=s.get(i||"")||this.state.myPlayer;this.update({monster:t.monster,players:s,myPlayer:o||null,monsterDistance:r})}),this.socket.on(ht.PAGE_COLLECTED,t=>{const i=this.state.pages.map(r=>r.id===t.pageId?{...r,collected:!0,collectedBy:t.playerId}:r);this.update({pages:i,pagesCollected:t.pagesCollected})}),this.socket.on(ht.PUZZLE_UPDATE,t=>{const i=this.state.puzzles.map(r=>r.id===t.puzzle.id?t.puzzle:r);this.update({puzzles:i})}),this.socket.on(ht.GAME_OVER,()=>{this.update({phase:Bn.GAME_OVER})}),this.socket.on(ht.GAME_WIN,()=>{this.update({phase:Bn.WIN})}),this.socket.on("error",t=>{console.error("[GameState] Server error:",t.message)}))}update(e){this.state={...this.state,...e},this.notify()}notify(){this.listeners.forEach(e=>e(this.state))}subscribe(e){return this.listeners.add(e),e(this.state),()=>this.listeners.delete(e)}getState(){return this.state}getSocket(){return this.socket}async fetchRooms(){try{const t=await(await fetch(`${ka}/rooms`)).json();this.update({availableRooms:t})}catch(e){console.error("Failed to fetch rooms",e)}}async createRoom(e){try{return(await(await fetch(`${ka}/rooms`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})})).json()).id}catch{return null}}joinRoom(e,t){var i;this.update({playerName:t}),(i=this.socket)==null||i.emit(ht.JOIN_ROOM,{roomId:e,playerName:t})}startGame(e){fetch(`${ka}/rooms/${e}/start`,{method:"POST"})}sendPlayerMove(e,t,i,r){var s;if((s=this.socket)==null||s.emit(ht.PLAYER_MOVE,{position:e,rotation:t,pitch:i,isSprinting:r}),this.state.myPlayer){const o={...this.state.myPlayer,position:e,rotation:t,pitch:i,isSprinting:r},c=new Map(this.state.players);c.set(o.id,o),this.state.myPlayer=o,this.state.players=c}}sendCollectPage(e){var t;(t=this.socket)==null||t.emit(ht.COLLECT_PAGE,{pageId:e})}sendPuzzleInteract(e,t){var i;(i=this.socket)==null||i.emit(ht.PUZZLE_INTERACT,{puzzleId:e,code:t})}sendLookingAtMonster(e){var t;(t=this.socket)==null||t.emit(ht.PLAYER_LOOKING_AT_MONSTER,{isLooking:e})}sendVoiceData(e){var t;(t=this.socket)==null||t.emit(ht.VOICE_DATA,e)}setInteractionPrompt(e){this.state.showInteraction!==e&&this.update({showInteraction:e})}disconnect(){var e;(e=this.socket)==null||e.disconnect()}}const bt=new KS;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ph="183",ZS=0,vm=1,JS=2,wl=1,G0=2,Co=3,Er=0,xn=1,hi=2,zi=0,Os=1,xm=2,ym=3,Sm=4,QS=5,kr=100,eM=101,tM=102,nM=103,iM=104,rM=200,sM=201,oM=202,aM=203,zf=204,Vf=205,lM=206,cM=207,uM=208,fM=209,dM=210,hM=211,pM=212,mM=213,gM=214,Hf=0,Gf=1,Wf=2,js=3,Xf=4,jf=5,qf=6,Yf=7,Lh=0,_M=1,vM=2,xi=0,W0=1,X0=2,j0=3,Ih=4,q0=5,Y0=6,$0=7,K0=300,Jr=301,qs=302,ru=303,su=304,Ec=306,$f=1e3,ki=1001,Kf=1002,qt=1003,xM=1004,Ba=1005,nn=1006,ou=1007,Gr=1008,bn=1009,Z0=1010,J0=1011,sa=1012,Dh=1013,Ei=1014,pi=1015,ji=1016,Nh=1017,Uh=1018,oa=1020,Q0=35902,ev=35899,tv=1021,nv=1022,ei=1023,qi=1026,Wr=1027,iv=1028,Fh=1029,Ys=1030,Oh=1031,kh=1033,Tl=33776,Al=33777,bl=33778,Rl=33779,Zf=35840,Jf=35841,Qf=35842,ed=35843,td=36196,nd=37492,id=37496,rd=37488,sd=37489,od=37490,ad=37491,ld=37808,cd=37809,ud=37810,fd=37811,dd=37812,hd=37813,pd=37814,md=37815,gd=37816,_d=37817,vd=37818,xd=37819,yd=37820,Sd=37821,Md=36492,Ed=36494,wd=36495,Td=36283,Ad=36284,bd=36285,Rd=36286,yM=3200,rv=0,SM=1,lr="",Nn="srgb",$s="srgb-linear",ec="linear",st="srgb",rs=7680,Mm=519,MM=512,EM=513,wM=514,Bh=515,TM=516,AM=517,zh=518,bM=519,Em=35044,wm="300 es",mi=2e3,aa=2001;function RM(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function tc(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function CM(){const n=tc("canvas");return n.style.display="block",n}const Tm={};function Am(...n){const e="THREE."+n.shift();console.log(e,...n)}function sv(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ie(...n){n=sv(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=sv(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function nc(...n){const e=n.join(" ");e in Tm||(Tm[e]=!0,Ie(...n))}function PM(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const LM={[Hf]:Gf,[Wf]:qf,[Xf]:Yf,[js]:jf,[Gf]:Hf,[qf]:Wf,[Yf]:Xf,[jf]:js};class no{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],au=Math.PI/180,ic=180/Math.PI;function pa(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function IM(n,e){return(n%e+e)%e}function lu(n,e,t){return(1-t)*n+t*e}function go(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class io{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,c){let u=i[r+0],d=i[r+1],_=i[r+2],a=i[r+3],l=s[o+0],h=s[o+1],m=s[o+2],x=s[o+3];if(a!==x||u!==l||d!==h||_!==m){let p=u*l+d*h+_*m+a*x;p<0&&(l=-l,h=-h,m=-m,x=-x,p=-p);let f=1-c;if(p<.9995){const g=Math.acos(p),v=Math.sin(g);f=Math.sin(f*g)/v,c=Math.sin(c*g)/v,u=u*f+l*c,d=d*f+h*c,_=_*f+m*c,a=a*f+x*c}else{u=u*f+l*c,d=d*f+h*c,_=_*f+m*c,a=a*f+x*c;const g=1/Math.sqrt(u*u+d*d+_*_+a*a);u*=g,d*=g,_*=g,a*=g}}e[t]=u,e[t+1]=d,e[t+2]=_,e[t+3]=a}static multiplyQuaternionsFlat(e,t,i,r,s,o){const c=i[r],u=i[r+1],d=i[r+2],_=i[r+3],a=s[o],l=s[o+1],h=s[o+2],m=s[o+3];return e[t]=c*m+_*a+u*h-d*l,e[t+1]=u*m+_*l+d*a-c*h,e[t+2]=d*m+_*h+c*l-u*a,e[t+3]=_*m-c*a-u*l-d*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,c=Math.cos,u=Math.sin,d=c(i/2),_=c(r/2),a=c(s/2),l=u(i/2),h=u(r/2),m=u(s/2);switch(o){case"XYZ":this._x=l*_*a+d*h*m,this._y=d*h*a-l*_*m,this._z=d*_*m+l*h*a,this._w=d*_*a-l*h*m;break;case"YXZ":this._x=l*_*a+d*h*m,this._y=d*h*a-l*_*m,this._z=d*_*m-l*h*a,this._w=d*_*a+l*h*m;break;case"ZXY":this._x=l*_*a-d*h*m,this._y=d*h*a+l*_*m,this._z=d*_*m+l*h*a,this._w=d*_*a-l*h*m;break;case"ZYX":this._x=l*_*a-d*h*m,this._y=d*h*a+l*_*m,this._z=d*_*m-l*h*a,this._w=d*_*a+l*h*m;break;case"YZX":this._x=l*_*a+d*h*m,this._y=d*h*a+l*_*m,this._z=d*_*m-l*h*a,this._w=d*_*a-l*h*m;break;case"XZY":this._x=l*_*a-d*h*m,this._y=d*h*a-l*_*m,this._z=d*_*m+l*h*a,this._w=d*_*a+l*h*m;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],c=t[5],u=t[9],d=t[2],_=t[6],a=t[10],l=i+c+a;if(l>0){const h=.5/Math.sqrt(l+1);this._w=.25/h,this._x=(_-u)*h,this._y=(s-d)*h,this._z=(o-r)*h}else if(i>c&&i>a){const h=2*Math.sqrt(1+i-c-a);this._w=(_-u)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+d)/h}else if(c>a){const h=2*Math.sqrt(1+c-i-a);this._w=(s-d)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(u+_)/h}else{const h=2*Math.sqrt(1+a-i-c);this._w=(o-r)/h,this._x=(s+d)/h,this._y=(u+_)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,c=t._x,u=t._y,d=t._z,_=t._w;return this._x=i*_+o*c+r*d-s*u,this._y=r*_+o*u+s*c-i*d,this._z=s*_+o*d+i*u-r*c,this._w=o*_-i*c-r*u-s*d,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,c=this.dot(e);c<0&&(i=-i,r=-r,s=-s,o=-o,c=-c);let u=1-t;if(c<.9995){const d=Math.acos(c),_=Math.sin(d);u=Math.sin(u*d)/_,t=Math.sin(t*d)/_,this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+s*t,this._w=this._w*u+o*t,this._onChangeCallback()}else this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+s*t,this._w=this._w*u+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,c=e.z,u=e.w,d=2*(o*r-c*i),_=2*(c*t-s*r),a=2*(s*i-o*t);return this.x=t+u*d+o*a-c*_,this.y=i+u*_+c*d-s*a,this.z=r+u*a+s*_-o*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,c=t.y,u=t.z;return this.x=r*u-s*c,this.y=s*o-i*u,this.z=i*c-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return cu.copy(this).projectOnVector(e),this.sub(cu)}reflect(e){return this.sub(cu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cu=new F,bm=new io;class Oe{constructor(e,t,i,r,s,o,c,u,d){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,c,u,d)}set(e,t,i,r,s,o,c,u,d){const _=this.elements;return _[0]=e,_[1]=r,_[2]=c,_[3]=t,_[4]=s,_[5]=u,_[6]=i,_[7]=o,_[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],c=i[3],u=i[6],d=i[1],_=i[4],a=i[7],l=i[2],h=i[5],m=i[8],x=r[0],p=r[3],f=r[6],g=r[1],v=r[4],S=r[7],A=r[2],T=r[5],b=r[8];return s[0]=o*x+c*g+u*A,s[3]=o*p+c*v+u*T,s[6]=o*f+c*S+u*b,s[1]=d*x+_*g+a*A,s[4]=d*p+_*v+a*T,s[7]=d*f+_*S+a*b,s[2]=l*x+h*g+m*A,s[5]=l*p+h*v+m*T,s[8]=l*f+h*S+m*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],c=e[5],u=e[6],d=e[7],_=e[8];return t*o*_-t*c*d-i*s*_+i*c*u+r*s*d-r*o*u}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],c=e[5],u=e[6],d=e[7],_=e[8],a=_*o-c*d,l=c*u-_*s,h=d*s-o*u,m=t*a+i*l+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=a*x,e[1]=(r*d-_*i)*x,e[2]=(c*i-r*o)*x,e[3]=l*x,e[4]=(_*t-r*u)*x,e[5]=(r*s-c*t)*x,e[6]=h*x,e[7]=(i*u-d*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,c){const u=Math.cos(s),d=Math.sin(s);return this.set(i*u,i*d,-i*(u*o+d*c)+o+e,-r*d,r*u,-r*(-d*o+u*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(uu.makeScale(e,t)),this}rotate(e){return this.premultiply(uu.makeRotation(-e)),this}translate(e,t){return this.premultiply(uu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uu=new Oe,Rm=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cm=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function DM(){const n={enabled:!0,workingColorSpace:$s,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===st&&(r.r=Vi(r.r),r.g=Vi(r.g),r.b=Vi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===st&&(r.r=ks(r.r),r.g=ks(r.g),r.b=ks(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===lr?ec:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return nc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return nc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[$s]:{primaries:e,whitePoint:i,transfer:ec,toXYZ:Rm,fromXYZ:Cm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nn},outputColorSpaceConfig:{drawingBufferColorSpace:Nn}},[Nn]:{primaries:e,whitePoint:i,transfer:st,toXYZ:Rm,fromXYZ:Cm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nn}}}),n}const Ke=DM();function Vi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ks(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ss;class NM{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ss===void 0&&(ss=tc("canvas")),ss.width=e.width,ss.height=e.height;const r=ss.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ss}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=tc("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Vi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Vi(t[i]/255)*255):t[i]=Vi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let UM=0;class Vh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:UM++}),this.uuid=pa(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,c=r.length;o<c;o++)r[o].isDataTexture?s.push(fu(r[o].image)):s.push(fu(r[o]))}else s=fu(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function fu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?NM.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}let FM=0;const du=new F;class cn extends no{constructor(e=cn.DEFAULT_IMAGE,t=cn.DEFAULT_MAPPING,i=ki,r=ki,s=nn,o=Gr,c=ei,u=bn,d=cn.DEFAULT_ANISOTROPY,_=lr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:FM++}),this.uuid=pa(),this.name="",this.source=new Vh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=u,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(du).x}get height(){return this.source.getSize(du).y}get depth(){return this.source.getSize(du).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ie(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ie(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==K0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $f:e.x=e.x-Math.floor(e.x);break;case ki:e.x=e.x<0?0:1;break;case Kf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $f:e.y=e.y-Math.floor(e.y);break;case ki:e.y=e.y<0?0:1;break;case Kf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=K0;cn.DEFAULT_ANISOTROPY=1;class Et{constructor(e=0,t=0,i=0,r=1){Et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const u=e.elements,d=u[0],_=u[4],a=u[8],l=u[1],h=u[5],m=u[9],x=u[2],p=u[6],f=u[10];if(Math.abs(_-l)<.01&&Math.abs(a-x)<.01&&Math.abs(m-p)<.01){if(Math.abs(_+l)<.1&&Math.abs(a+x)<.1&&Math.abs(m+p)<.1&&Math.abs(d+h+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(d+1)/2,S=(h+1)/2,A=(f+1)/2,T=(_+l)/4,b=(a+x)/4,y=(m+p)/4;return v>S&&v>A?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=T/i,s=b/i):S>A?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=T/r,s=y/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=b/s,r=y/s),this.set(i,r,s,t),this}let g=Math.sqrt((p-m)*(p-m)+(a-x)*(a-x)+(l-_)*(l-_));return Math.abs(g)<.001&&(g=1),this.x=(p-m)/g,this.y=(a-x)/g,this.z=(l-_)/g,this.w=Math.acos((d+h+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class OM extends no{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new cn(r),o=i.count;for(let c=0;c<o;c++)this.textures[c]=s.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Vh(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends OM{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ov extends cn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class kM extends cn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wt{constructor(e,t,i,r,s,o,c,u,d,_,a,l,h,m,x,p){wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,c,u,d,_,a,l,h,m,x,p)}set(e,t,i,r,s,o,c,u,d,_,a,l,h,m,x,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=c,f[13]=u,f[2]=d,f[6]=_,f[10]=a,f[14]=l,f[3]=h,f[7]=m,f[11]=x,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/os.setFromMatrixColumn(e,0).length(),s=1/os.setFromMatrixColumn(e,1).length(),o=1/os.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),c=Math.sin(i),u=Math.cos(r),d=Math.sin(r),_=Math.cos(s),a=Math.sin(s);if(e.order==="XYZ"){const l=o*_,h=o*a,m=c*_,x=c*a;t[0]=u*_,t[4]=-u*a,t[8]=d,t[1]=h+m*d,t[5]=l-x*d,t[9]=-c*u,t[2]=x-l*d,t[6]=m+h*d,t[10]=o*u}else if(e.order==="YXZ"){const l=u*_,h=u*a,m=d*_,x=d*a;t[0]=l+x*c,t[4]=m*c-h,t[8]=o*d,t[1]=o*a,t[5]=o*_,t[9]=-c,t[2]=h*c-m,t[6]=x+l*c,t[10]=o*u}else if(e.order==="ZXY"){const l=u*_,h=u*a,m=d*_,x=d*a;t[0]=l-x*c,t[4]=-o*a,t[8]=m+h*c,t[1]=h+m*c,t[5]=o*_,t[9]=x-l*c,t[2]=-o*d,t[6]=c,t[10]=o*u}else if(e.order==="ZYX"){const l=o*_,h=o*a,m=c*_,x=c*a;t[0]=u*_,t[4]=m*d-h,t[8]=l*d+x,t[1]=u*a,t[5]=x*d+l,t[9]=h*d-m,t[2]=-d,t[6]=c*u,t[10]=o*u}else if(e.order==="YZX"){const l=o*u,h=o*d,m=c*u,x=c*d;t[0]=u*_,t[4]=x-l*a,t[8]=m*a+h,t[1]=a,t[5]=o*_,t[9]=-c*_,t[2]=-d*_,t[6]=h*a+m,t[10]=l-x*a}else if(e.order==="XZY"){const l=o*u,h=o*d,m=c*u,x=c*d;t[0]=u*_,t[4]=-a,t[8]=d*_,t[1]=l*a+x,t[5]=o*_,t[9]=h*a-m,t[2]=m*a-h,t[6]=c*_,t[10]=x*a+l}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(BM,e,zM)}lookAt(e,t,i){const r=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),Ji.crossVectors(i,Sn),Ji.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),Ji.crossVectors(i,Sn)),Ji.normalize(),za.crossVectors(Sn,Ji),r[0]=Ji.x,r[4]=za.x,r[8]=Sn.x,r[1]=Ji.y,r[5]=za.y,r[9]=Sn.y,r[2]=Ji.z,r[6]=za.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],c=i[4],u=i[8],d=i[12],_=i[1],a=i[5],l=i[9],h=i[13],m=i[2],x=i[6],p=i[10],f=i[14],g=i[3],v=i[7],S=i[11],A=i[15],T=r[0],b=r[4],y=r[8],E=r[12],I=r[1],C=r[5],U=r[9],k=r[13],W=r[2],B=r[6],G=r[10],O=r[14],V=r[3],q=r[7],J=r[11],ae=r[15];return s[0]=o*T+c*I+u*W+d*V,s[4]=o*b+c*C+u*B+d*q,s[8]=o*y+c*U+u*G+d*J,s[12]=o*E+c*k+u*O+d*ae,s[1]=_*T+a*I+l*W+h*V,s[5]=_*b+a*C+l*B+h*q,s[9]=_*y+a*U+l*G+h*J,s[13]=_*E+a*k+l*O+h*ae,s[2]=m*T+x*I+p*W+f*V,s[6]=m*b+x*C+p*B+f*q,s[10]=m*y+x*U+p*G+f*J,s[14]=m*E+x*k+p*O+f*ae,s[3]=g*T+v*I+S*W+A*V,s[7]=g*b+v*C+S*B+A*q,s[11]=g*y+v*U+S*G+A*J,s[15]=g*E+v*k+S*O+A*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],c=e[5],u=e[9],d=e[13],_=e[2],a=e[6],l=e[10],h=e[14],m=e[3],x=e[7],p=e[11],f=e[15],g=u*h-d*l,v=c*h-d*a,S=c*l-u*a,A=o*h-d*_,T=o*l-u*_,b=o*a-c*_;return t*(x*g-p*v+f*S)-i*(m*g-p*A+f*T)+r*(m*v-x*A+f*b)-s*(m*S-x*T+p*b)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],c=e[5],u=e[6],d=e[7],_=e[8],a=e[9],l=e[10],h=e[11],m=e[12],x=e[13],p=e[14],f=e[15],g=t*c-i*o,v=t*u-r*o,S=t*d-s*o,A=i*u-r*c,T=i*d-s*c,b=r*d-s*u,y=_*x-a*m,E=_*p-l*m,I=_*f-h*m,C=a*p-l*x,U=a*f-h*x,k=l*f-h*p,W=g*k-v*U+S*C+A*I-T*E+b*y;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/W;return e[0]=(c*k-u*U+d*C)*B,e[1]=(r*U-i*k-s*C)*B,e[2]=(x*b-p*T+f*A)*B,e[3]=(l*T-a*b-h*A)*B,e[4]=(u*I-o*k-d*E)*B,e[5]=(t*k-r*I+s*E)*B,e[6]=(p*S-m*b-f*v)*B,e[7]=(_*b-l*S+h*v)*B,e[8]=(o*U-c*I+d*y)*B,e[9]=(i*I-t*U-s*y)*B,e[10]=(m*T-x*S+f*g)*B,e[11]=(a*S-_*T-h*g)*B,e[12]=(c*E-o*C-u*y)*B,e[13]=(t*C-i*E+r*y)*B,e[14]=(x*v-m*A-p*g)*B,e[15]=(_*A-a*v+l*g)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,c=e.y,u=e.z,d=s*o,_=s*c;return this.set(d*o+i,d*c-r*u,d*u+r*c,0,d*c+r*u,_*c+i,_*u-r*o,0,d*u-r*c,_*u+r*o,s*u*u+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,c=t._z,u=t._w,d=s+s,_=o+o,a=c+c,l=s*d,h=s*_,m=s*a,x=o*_,p=o*a,f=c*a,g=u*d,v=u*_,S=u*a,A=i.x,T=i.y,b=i.z;return r[0]=(1-(x+f))*A,r[1]=(h+S)*A,r[2]=(m-v)*A,r[3]=0,r[4]=(h-S)*T,r[5]=(1-(l+f))*T,r[6]=(p+g)*T,r[7]=0,r[8]=(m+v)*b,r[9]=(p-g)*b,r[10]=(1-(l+x))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=os.set(r[0],r[1],r[2]).length();const c=os.set(r[4],r[5],r[6]).length(),u=os.set(r[8],r[9],r[10]).length();s<0&&(o=-o),jn.copy(this);const d=1/o,_=1/c,a=1/u;return jn.elements[0]*=d,jn.elements[1]*=d,jn.elements[2]*=d,jn.elements[4]*=_,jn.elements[5]*=_,jn.elements[6]*=_,jn.elements[8]*=a,jn.elements[9]*=a,jn.elements[10]*=a,t.setFromRotationMatrix(jn),i.x=o,i.y=c,i.z=u,this}makePerspective(e,t,i,r,s,o,c=mi,u=!1){const d=this.elements,_=2*s/(t-e),a=2*s/(i-r),l=(t+e)/(t-e),h=(i+r)/(i-r);let m,x;if(u)m=s/(o-s),x=o*s/(o-s);else if(c===mi)m=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(c===aa)m=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return d[0]=_,d[4]=0,d[8]=l,d[12]=0,d[1]=0,d[5]=a,d[9]=h,d[13]=0,d[2]=0,d[6]=0,d[10]=m,d[14]=x,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,t,i,r,s,o,c=mi,u=!1){const d=this.elements,_=2/(t-e),a=2/(i-r),l=-(t+e)/(t-e),h=-(i+r)/(i-r);let m,x;if(u)m=1/(o-s),x=o/(o-s);else if(c===mi)m=-2/(o-s),x=-(o+s)/(o-s);else if(c===aa)m=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return d[0]=_,d[4]=0,d[8]=0,d[12]=l,d[1]=0,d[5]=a,d[9]=0,d[13]=h,d[2]=0,d[6]=0,d[10]=m,d[14]=x,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const os=new F,jn=new wt,BM=new F(0,0,0),zM=new F(1,1,1),Ji=new F,za=new F,Sn=new F,Pm=new wt,Lm=new io;class ri{constructor(e=0,t=0,i=0,r=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],c=r[8],u=r[1],d=r[5],_=r[9],a=r[2],l=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-_,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(l,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(c,h),this._z=Math.atan2(u,d)):(this._y=Math.atan2(-a,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(-a,h),this._z=Math.atan2(-o,d)):(this._y=0,this._z=Math.atan2(u,s));break;case"ZYX":this._y=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(l,h),this._z=Math.atan2(u,s)):(this._x=0,this._z=Math.atan2(-o,d));break;case"YZX":this._z=Math.asin(Xe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-_,d),this._y=Math.atan2(-a,s)):(this._x=0,this._y=Math.atan2(c,h));break;case"XZY":this._z=Math.asin(-Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(l,d),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-_,h),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Pm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lm.setFromEuler(this),this.setFromQuaternion(Lm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ri.DEFAULT_ORDER="XYZ";class av{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let VM=0;const Im=new F,as=new io,bi=new wt,Va=new F,_o=new F,HM=new F,GM=new io,Dm=new F(1,0,0),Nm=new F(0,1,0),Um=new F(0,0,1),Fm={type:"added"},WM={type:"removed"},ls={type:"childadded",child:null},hu={type:"childremoved",child:null};class Ut extends no{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:VM++}),this.uuid=pa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new F,t=new ri,i=new io,r=new F(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new Oe}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new av,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(Dm,e)}rotateY(e){return this.rotateOnAxis(Nm,e)}rotateZ(e){return this.rotateOnAxis(Um,e)}translateOnAxis(e,t){return Im.copy(e).applyQuaternion(this.quaternion),this.position.add(Im.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dm,e)}translateY(e){return this.translateOnAxis(Nm,e)}translateZ(e){return this.translateOnAxis(Um,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Va.copy(e):Va.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),_o.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(_o,Va,this.up):bi.lookAt(Va,_o,this.up),this.quaternion.setFromRotationMatrix(bi),r&&(bi.extractRotation(r.matrixWorld),as.setFromRotationMatrix(bi),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fm),ls.child=e,this.dispatchEvent(ls),ls.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(WM),hu.child=e,this.dispatchEvent(hu),hu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fm),ls.child=e,this.dispatchEvent(ls),ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_o,e,HM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_o,GM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(c=>({...c})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let d=0,_=u.length;d<_;d++){const a=u[d];s(e.shapes,a)}else s(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,d=this.material.length;u<d;u++)c.push(s(e.materials,this.material[u]));r.material=c}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];r.animations.push(s(e.animations,u))}}if(t){const c=o(e.geometries),u=o(e.materials),d=o(e.textures),_=o(e.images),a=o(e.shapes),l=o(e.skeletons),h=o(e.animations),m=o(e.nodes);c.length>0&&(i.geometries=c),u.length>0&&(i.materials=u),d.length>0&&(i.textures=d),_.length>0&&(i.images=_),a.length>0&&(i.shapes=a),l.length>0&&(i.skeletons=l),h.length>0&&(i.animations=h),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(c){const u=[];for(const d in c){const _=c[d];delete _.metadata,u.push(_)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ut.DEFAULT_UP=new F(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ui extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const XM={type:"move"};class pu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const c=this._targetRay,u=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){o=!0;for(const x of e.hand.values()){const p=t.getJointPose(x,i),f=this._getHandJoint(d,x);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const _=d.joints["index-finger-tip"],a=d.joints["thumb-tip"],l=_.position.distanceTo(a.position),h=.02,m=.005;d.inputState.pinching&&l>h+m?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&l<=h-m&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(XM)))}return c!==null&&(c.visible=r!==null),u!==null&&(u.visible=s!==null),d!==null&&(d.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ui;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const lv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qi={h:0,s:0,l:0},Ha={h:0,s:0,l:0};function mu(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=IM(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=mu(o,s,e+1/3),this.g=mu(o,s,e),this.b=mu(o,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,t=Nn){function i(s){s!==void 0&&parseFloat(s)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],c=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ie("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nn){const i=lv[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nn){return Ke.workingToColorSpace(en.copy(this),e),Math.round(Xe(en.r*255,0,255))*65536+Math.round(Xe(en.g*255,0,255))*256+Math.round(Xe(en.b*255,0,255))}getHexString(e=Nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(en.copy(this),t);const i=en.r,r=en.g,s=en.b,o=Math.max(i,r,s),c=Math.min(i,r,s);let u,d;const _=(c+o)/2;if(c===o)u=0,d=0;else{const a=o-c;switch(d=_<=.5?a/(o+c):a/(2-o-c),o){case i:u=(r-s)/a+(r<s?6:0);break;case r:u=(s-i)/a+2;break;case s:u=(i-r)/a+4;break}u/=6}return e.h=u,e.s=d,e.l=_,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(en.copy(this),t),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=Nn){Ke.workingToColorSpace(en.copy(this),e);const t=en.r,i=en.g,r=en.b;return e!==Nn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qi),this.setHSL(Qi.h+e,Qi.s+t,Qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qi),e.getHSL(Ha);const i=lu(Qi.h,Ha.h,t),r=lu(Qi.s,Ha.s,t),s=lu(Qi.l,Ha.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new je;je.NAMES=lv;class Hh{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new je(e),this.density=t}clone(){return new Hh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jM extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const qn=new F,Ri=new F,gu=new F,Ci=new F,cs=new F,us=new F,Om=new F,_u=new F,vu=new F,xu=new F,yu=new Et,Su=new Et,Mu=new Et;class Qn{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),qn.subVectors(e,t),r.cross(qn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){qn.subVectors(r,t),Ri.subVectors(i,t),gu.subVectors(e,t);const o=qn.dot(qn),c=qn.dot(Ri),u=qn.dot(gu),d=Ri.dot(Ri),_=Ri.dot(gu),a=o*d-c*c;if(a===0)return s.set(0,0,0),null;const l=1/a,h=(d*u-c*_)*l,m=(o*_-c*u)*l;return s.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(e,t,i,r,s,o,c,u){return this.getBarycoord(e,t,i,r,Ci)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(s,Ci.x),u.addScaledVector(o,Ci.y),u.addScaledVector(c,Ci.z),u)}static getInterpolatedAttribute(e,t,i,r,s,o){return yu.setScalar(0),Su.setScalar(0),Mu.setScalar(0),yu.fromBufferAttribute(e,t),Su.fromBufferAttribute(e,i),Mu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(yu,s.x),o.addScaledVector(Su,s.y),o.addScaledVector(Mu,s.z),o}static isFrontFacing(e,t,i,r){return qn.subVectors(i,t),Ri.subVectors(e,t),qn.cross(Ri).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qn.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),qn.cross(Ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Qn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,c;cs.subVectors(r,i),us.subVectors(s,i),_u.subVectors(e,i);const u=cs.dot(_u),d=us.dot(_u);if(u<=0&&d<=0)return t.copy(i);vu.subVectors(e,r);const _=cs.dot(vu),a=us.dot(vu);if(_>=0&&a<=_)return t.copy(r);const l=u*a-_*d;if(l<=0&&u>=0&&_<=0)return o=u/(u-_),t.copy(i).addScaledVector(cs,o);xu.subVectors(e,s);const h=cs.dot(xu),m=us.dot(xu);if(m>=0&&h<=m)return t.copy(s);const x=h*d-u*m;if(x<=0&&d>=0&&m<=0)return c=d/(d-m),t.copy(i).addScaledVector(us,c);const p=_*m-h*a;if(p<=0&&a-_>=0&&h-m>=0)return Om.subVectors(s,r),c=(a-_)/(a-_+(h-m)),t.copy(r).addScaledVector(Om,c);const f=1/(p+x+l);return o=x*f,c=l*f,t.copy(i).addScaledVector(cs,o).addScaledVector(us,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ma{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,c=s.count;o<c;o++)e.isMesh===!0?e.getVertexPosition(o,Yn):Yn.fromBufferAttribute(s,o),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ga.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ga.copy(i.boundingBox)),Ga.applyMatrix4(e.matrixWorld),this.union(Ga)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vo),Wa.subVectors(this.max,vo),fs.subVectors(e.a,vo),ds.subVectors(e.b,vo),hs.subVectors(e.c,vo),er.subVectors(ds,fs),tr.subVectors(hs,ds),Cr.subVectors(fs,hs);let t=[0,-er.z,er.y,0,-tr.z,tr.y,0,-Cr.z,Cr.y,er.z,0,-er.x,tr.z,0,-tr.x,Cr.z,0,-Cr.x,-er.y,er.x,0,-tr.y,tr.x,0,-Cr.y,Cr.x,0];return!Eu(t,fs,ds,hs,Wa)||(t=[1,0,0,0,1,0,0,0,1],!Eu(t,fs,ds,hs,Wa))?!1:(Xa.crossVectors(er,tr),t=[Xa.x,Xa.y,Xa.z],Eu(t,fs,ds,hs,Wa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Pi=[new F,new F,new F,new F,new F,new F,new F,new F],Yn=new F,Ga=new ma,fs=new F,ds=new F,hs=new F,er=new F,tr=new F,Cr=new F,vo=new F,Wa=new F,Xa=new F,Pr=new F;function Eu(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Pr.fromArray(n,s);const c=r.x*Math.abs(Pr.x)+r.y*Math.abs(Pr.y)+r.z*Math.abs(Pr.z),u=e.dot(Pr),d=t.dot(Pr),_=i.dot(Pr);if(Math.max(-Math.max(u,d,_),Math.min(u,d,_))>c)return!1}return!0}const Pt=new F,ja=new qe;let qM=0;class Si{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qM++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Em,this.updateRanges=[],this.gpuType=pi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ja.fromBufferAttribute(this,t),ja.applyMatrix3(e),this.setXY(t,ja.x,ja.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=go(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=dn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=go(t,this.array)),t}setX(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=go(t,this.array)),t}setY(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=go(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=go(t,this.array)),t}setW(e,t){return this.normalized&&(t=dn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=dn(t,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Em&&(e.usage=this.usage),e}}class cv extends Si{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class uv extends Si{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Wt extends Si{constructor(e,t,i){super(new Float32Array(e),t,i)}}const YM=new ma,xo=new F,wu=new F;class Gh{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):YM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xo.subVectors(e,this.center);const t=xo.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(xo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xo.copy(e.center).add(wu)),this.expandByPoint(xo.copy(e.center).sub(wu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let $M=0;const Dn=new wt,Tu=new Ut,ps=new F,Mn=new ma,yo=new ma,zt=new F;class Gn extends no{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$M++}),this.uuid=pa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(RM(e)?uv:cv)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Oe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,i){return Dn.makeTranslation(e,t,i),this.applyMatrix4(Dn),this}scale(e,t,i){return Dn.makeScale(e,t,i),this.applyMatrix4(Dn),this}lookAt(e){return Tu.lookAt(e),Tu.updateMatrix(),this.applyMatrix4(Tu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ma);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gh);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const c=t[s];yo.setFromBufferAttribute(c),this.morphTargetsRelative?(zt.addVectors(Mn.min,yo.min),Mn.expandByPoint(zt),zt.addVectors(Mn.max,yo.max),Mn.expandByPoint(zt)):(Mn.expandByPoint(yo.min),Mn.expandByPoint(yo.max))}Mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(zt));if(t)for(let s=0,o=t.length;s<o;s++){const c=t[s],u=this.morphTargetsRelative;for(let d=0,_=c.count;d<_;d++)zt.fromBufferAttribute(c,d),u&&(ps.fromBufferAttribute(e,d),zt.add(ps)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Si(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),c=[],u=[];for(let y=0;y<i.count;y++)c[y]=new F,u[y]=new F;const d=new F,_=new F,a=new F,l=new qe,h=new qe,m=new qe,x=new F,p=new F;function f(y,E,I){d.fromBufferAttribute(i,y),_.fromBufferAttribute(i,E),a.fromBufferAttribute(i,I),l.fromBufferAttribute(s,y),h.fromBufferAttribute(s,E),m.fromBufferAttribute(s,I),_.sub(d),a.sub(d),h.sub(l),m.sub(l);const C=1/(h.x*m.y-m.x*h.y);isFinite(C)&&(x.copy(_).multiplyScalar(m.y).addScaledVector(a,-h.y).multiplyScalar(C),p.copy(a).multiplyScalar(h.x).addScaledVector(_,-m.x).multiplyScalar(C),c[y].add(x),c[E].add(x),c[I].add(x),u[y].add(p),u[E].add(p),u[I].add(p))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let y=0,E=g.length;y<E;++y){const I=g[y],C=I.start,U=I.count;for(let k=C,W=C+U;k<W;k+=3)f(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const v=new F,S=new F,A=new F,T=new F;function b(y){A.fromBufferAttribute(r,y),T.copy(A);const E=c[y];v.copy(E),v.sub(A.multiplyScalar(A.dot(E))).normalize(),S.crossVectors(T,E);const C=S.dot(u[y])<0?-1:1;o.setXYZW(y,v.x,v.y,v.z,C)}for(let y=0,E=g.length;y<E;++y){const I=g[y],C=I.start,U=I.count;for(let k=C,W=C+U;k<W;k+=3)b(e.getX(k+0)),b(e.getX(k+1)),b(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Si(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let l=0,h=i.count;l<h;l++)i.setXYZ(l,0,0,0);const r=new F,s=new F,o=new F,c=new F,u=new F,d=new F,_=new F,a=new F;if(e)for(let l=0,h=e.count;l<h;l+=3){const m=e.getX(l+0),x=e.getX(l+1),p=e.getX(l+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,p),_.subVectors(o,s),a.subVectors(r,s),_.cross(a),c.fromBufferAttribute(i,m),u.fromBufferAttribute(i,x),d.fromBufferAttribute(i,p),c.add(_),u.add(_),d.add(_),i.setXYZ(m,c.x,c.y,c.z),i.setXYZ(x,u.x,u.y,u.z),i.setXYZ(p,d.x,d.y,d.z)}else for(let l=0,h=t.count;l<h;l+=3)r.fromBufferAttribute(t,l+0),s.fromBufferAttribute(t,l+1),o.fromBufferAttribute(t,l+2),_.subVectors(o,s),a.subVectors(r,s),_.cross(a),i.setXYZ(l+0,_.x,_.y,_.z),i.setXYZ(l+1,_.x,_.y,_.z),i.setXYZ(l+2,_.x,_.y,_.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(c,u){const d=c.array,_=c.itemSize,a=c.normalized,l=new d.constructor(u.length*_);let h=0,m=0;for(let x=0,p=u.length;x<p;x++){c.isInterleavedBufferAttribute?h=u[x]*c.data.stride+c.offset:h=u[x]*_;for(let f=0;f<_;f++)l[m++]=d[h++]}return new Si(l,_,a)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gn,i=this.index.array,r=this.attributes;for(const c in r){const u=r[c],d=e(u,i);t.setAttribute(c,d)}const s=this.morphAttributes;for(const c in s){const u=[],d=s[c];for(let _=0,a=d.length;_<a;_++){const l=d[_],h=e(l,i);u.push(h)}t.morphAttributes[c]=u}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const d in u)u[d]!==void 0&&(e[d]=u[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const u in i){const d=i[u];e.data.attributes[u]=d.toJSON(e.data)}const r={};let s=!1;for(const u in this.morphAttributes){const d=this.morphAttributes[u],_=[];for(let a=0,l=d.length;a<l;a++){const h=d[a];_.push(h.toJSON(e.data))}_.length>0&&(r[u]=_,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const d in r){const _=r[d];this.setAttribute(d,_.clone(t))}const s=e.morphAttributes;for(const d in s){const _=[],a=s[d];for(let l=0,h=a.length;l<h;l++)_.push(a[l].clone(t));this.morphAttributes[d]=_}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let d=0,_=o.length;d<_;d++){const a=o[d];this.addGroup(a.start,a.count,a.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let KM=0;class ga extends no{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:KM++}),this.uuid=pa(),this.name="",this.type="Material",this.blending=Os,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zf,this.blendDst=Vf,this.blendEquation=kr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rs,this.stencilZFail=rs,this.stencilZPass=rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ie(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ie(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Os&&(i.blending=this.blending),this.side!==Er&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zf&&(i.blendSrc=this.blendSrc),this.blendDst!==Vf&&(i.blendDst=this.blendDst),this.blendEquation!==kr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==rs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==rs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const c in s){const u=s[c];delete u.metadata,o.push(u)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Li=new F,Au=new F,qa=new F,nr=new F,bu=new F,Ya=new F,Ru=new F;class ZM{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,t),Li.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Au.copy(e).add(t).multiplyScalar(.5),qa.copy(t).sub(e).normalize(),nr.copy(this.origin).sub(Au);const s=e.distanceTo(t)*.5,o=-this.direction.dot(qa),c=nr.dot(this.direction),u=-nr.dot(qa),d=nr.lengthSq(),_=Math.abs(1-o*o);let a,l,h,m;if(_>0)if(a=o*u-c,l=o*c-u,m=s*_,a>=0)if(l>=-m)if(l<=m){const x=1/_;a*=x,l*=x,h=a*(a+o*l+2*c)+l*(o*a+l+2*u)+d}else l=s,a=Math.max(0,-(o*l+c)),h=-a*a+l*(l+2*u)+d;else l=-s,a=Math.max(0,-(o*l+c)),h=-a*a+l*(l+2*u)+d;else l<=-m?(a=Math.max(0,-(-o*s+c)),l=a>0?-s:Math.min(Math.max(-s,-u),s),h=-a*a+l*(l+2*u)+d):l<=m?(a=0,l=Math.min(Math.max(-s,-u),s),h=l*(l+2*u)+d):(a=Math.max(0,-(o*s+c)),l=a>0?s:Math.min(Math.max(-s,-u),s),h=-a*a+l*(l+2*u)+d);else l=o>0?-s:s,a=Math.max(0,-(o*l+c)),h=-a*a+l*(l+2*u)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,a),r&&r.copy(Au).addScaledVector(qa,l),h}intersectSphere(e,t){Li.subVectors(e.center,this.origin);const i=Li.dot(this.direction),r=Li.dot(Li)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),c=i-o,u=i+o;return u<0?null:c<0?this.at(u,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,c,u;const d=1/this.direction.x,_=1/this.direction.y,a=1/this.direction.z,l=this.origin;return d>=0?(i=(e.min.x-l.x)*d,r=(e.max.x-l.x)*d):(i=(e.max.x-l.x)*d,r=(e.min.x-l.x)*d),_>=0?(s=(e.min.y-l.y)*_,o=(e.max.y-l.y)*_):(s=(e.max.y-l.y)*_,o=(e.min.y-l.y)*_),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),a>=0?(c=(e.min.z-l.z)*a,u=(e.max.z-l.z)*a):(c=(e.max.z-l.z)*a,u=(e.min.z-l.z)*a),i>u||c>r)||((c>i||i!==i)&&(i=c),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,t,i,r,s){bu.subVectors(t,e),Ya.subVectors(i,e),Ru.crossVectors(bu,Ya);let o=this.direction.dot(Ru),c;if(o>0){if(r)return null;c=1}else if(o<0)c=-1,o=-o;else return null;nr.subVectors(this.origin,e);const u=c*this.direction.dot(Ya.crossVectors(nr,Ya));if(u<0)return null;const d=c*this.direction.dot(bu.cross(nr));if(d<0||u+d>o)return null;const _=-c*nr.dot(Ru);return _<0?null:this.at(_/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zo extends ga{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=Lh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const km=new wt,Lr=new ZM,$a=new Gh,Bm=new F,Ka=new F,Za=new F,Ja=new F,Cu=new F,Qa=new F,zm=new F,el=new F;class $e extends Ut{constructor(e=new Gn,t=new zo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const c=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const c=this.morphTargetInfluences;if(s&&c){Qa.set(0,0,0);for(let u=0,d=s.length;u<d;u++){const _=c[u],a=s[u];_!==0&&(Cu.fromBufferAttribute(a,e),o?Qa.addScaledVector(Cu,_):Qa.addScaledVector(Cu.sub(t),_))}t.add(Qa)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$a.copy(i.boundingSphere),$a.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!($a.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere($a,Bm)===null||Lr.origin.distanceToSquared(Bm)>(e.far-e.near)**2))&&(km.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(km),!(i.boundingBox!==null&&Lr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Lr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,c=s.index,u=s.attributes.position,d=s.attributes.uv,_=s.attributes.uv1,a=s.attributes.normal,l=s.groups,h=s.drawRange;if(c!==null)if(Array.isArray(o))for(let m=0,x=l.length;m<x;m++){const p=l[m],f=o[p.materialIndex],g=Math.max(p.start,h.start),v=Math.min(c.count,Math.min(p.start+p.count,h.start+h.count));for(let S=g,A=v;S<A;S+=3){const T=c.getX(S),b=c.getX(S+1),y=c.getX(S+2);r=tl(this,f,e,i,d,_,a,T,b,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const m=Math.max(0,h.start),x=Math.min(c.count,h.start+h.count);for(let p=m,f=x;p<f;p+=3){const g=c.getX(p),v=c.getX(p+1),S=c.getX(p+2);r=tl(this,o,e,i,d,_,a,g,v,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(u!==void 0)if(Array.isArray(o))for(let m=0,x=l.length;m<x;m++){const p=l[m],f=o[p.materialIndex],g=Math.max(p.start,h.start),v=Math.min(u.count,Math.min(p.start+p.count,h.start+h.count));for(let S=g,A=v;S<A;S+=3){const T=S,b=S+1,y=S+2;r=tl(this,f,e,i,d,_,a,T,b,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const m=Math.max(0,h.start),x=Math.min(u.count,h.start+h.count);for(let p=m,f=x;p<f;p+=3){const g=p,v=p+1,S=p+2;r=tl(this,o,e,i,d,_,a,g,v,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function JM(n,e,t,i,r,s,o,c){let u;if(e.side===xn?u=i.intersectTriangle(o,s,r,!0,c):u=i.intersectTriangle(r,s,o,e.side===Er,c),u===null)return null;el.copy(c),el.applyMatrix4(n.matrixWorld);const d=t.ray.origin.distanceTo(el);return d<t.near||d>t.far?null:{distance:d,point:el.clone(),object:n}}function tl(n,e,t,i,r,s,o,c,u,d){n.getVertexPosition(c,Ka),n.getVertexPosition(u,Za),n.getVertexPosition(d,Ja);const _=JM(n,e,t,i,Ka,Za,Ja,zm);if(_){const a=new F;Qn.getBarycoord(zm,Ka,Za,Ja,a),r&&(_.uv=Qn.getInterpolatedAttribute(r,c,u,d,a,new qe)),s&&(_.uv1=Qn.getInterpolatedAttribute(s,c,u,d,a,new qe)),o&&(_.normal=Qn.getInterpolatedAttribute(o,c,u,d,a,new F),_.normal.dot(i.direction)>0&&_.normal.multiplyScalar(-1));const l={a:c,b:u,c:d,normal:new F,materialIndex:0};Qn.getNormal(Ka,Za,Ja,l.normal),_.face=l,_.barycoord=a}return _}class QM extends cn{constructor(e=null,t=1,i=1,r,s,o,c,u,d=qt,_=qt,a,l){super(null,o,c,u,d,_,r,s,a,l),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pu=new F,eE=new F,tE=new Oe;class Or{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Pu.subVectors(i,t).cross(eE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Pu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||tE.getNormalMatrix(e),r=this.coplanarPoint(Pu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ir=new Gh,nE=new qe(.5,.5),nl=new F;class Wh{constructor(e=new Or,t=new Or,i=new Or,r=new Or,s=new Or,o=new Or){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(i),c[3].copy(r),c[4].copy(s),c[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=mi,i=!1){const r=this.planes,s=e.elements,o=s[0],c=s[1],u=s[2],d=s[3],_=s[4],a=s[5],l=s[6],h=s[7],m=s[8],x=s[9],p=s[10],f=s[11],g=s[12],v=s[13],S=s[14],A=s[15];if(r[0].setComponents(d-o,h-_,f-m,A-g).normalize(),r[1].setComponents(d+o,h+_,f+m,A+g).normalize(),r[2].setComponents(d+c,h+a,f+x,A+v).normalize(),r[3].setComponents(d-c,h-a,f-x,A-v).normalize(),i)r[4].setComponents(u,l,p,S).normalize(),r[5].setComponents(d-u,h-l,f-p,A-S).normalize();else if(r[4].setComponents(d-u,h-l,f-p,A-S).normalize(),t===mi)r[5].setComponents(d+u,h+l,f+p,A+S).normalize();else if(t===aa)r[5].setComponents(u,l,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ir.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ir.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ir)}intersectsSprite(e){Ir.center.set(0,0,0);const t=nE.distanceTo(e.center);return Ir.radius=.7071067811865476+t,Ir.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ir)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(nl.x=r.normal.x>0?e.max.x:e.min.x,nl.y=r.normal.y>0?e.max.y:e.min.y,nl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(nl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fv extends cn{constructor(e=[],t=Jr,i,r,s,o,c,u,d,_){super(e,t,i,r,s,o,c,u,d,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class la extends cn{constructor(e,t,i=Ei,r,s,o,c=qt,u=qt,d,_=qi,a=1){if(_!==qi&&_!==Wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const l={width:e,height:t,depth:a};super(l,r,s,o,c,u,_,i,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class iE extends la{constructor(e,t=Ei,i=Jr,r,s,o=qt,c=qt,u,d=qi){const _={width:e,height:e,depth:1},a=[_,_,_,_,_,_];super(e,e,t,i,r,s,o,c,u,d),this.image=a,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class dv extends cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class An extends Gn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const c=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const u=[],d=[],_=[],a=[];let l=0,h=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(u),this.setAttribute("position",new Wt(d,3)),this.setAttribute("normal",new Wt(_,3)),this.setAttribute("uv",new Wt(a,2));function m(x,p,f,g,v,S,A,T,b,y,E){const I=S/b,C=A/y,U=S/2,k=A/2,W=T/2,B=b+1,G=y+1;let O=0,V=0;const q=new F;for(let J=0;J<G;J++){const ae=J*C-k;for(let re=0;re<B;re++){const Pe=re*I-U;q[x]=Pe*g,q[p]=ae*v,q[f]=W,d.push(q.x,q.y,q.z),q[x]=0,q[p]=0,q[f]=T>0?1:-1,_.push(q.x,q.y,q.z),a.push(re/b),a.push(1-J/y),O+=1}}for(let J=0;J<y;J++)for(let ae=0;ae<b;ae++){const re=l+ae+B*J,Pe=l+ae+B*(J+1),Je=l+(ae+1)+B*(J+1),nt=l+(ae+1)+B*J;u.push(re,Pe,nt),u.push(Pe,Je,nt),V+=6}c.addGroup(h,V,E),h+=V,l+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new An(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ni extends Gn{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:c,thetaLength:u};const d=this;r=Math.floor(r),s=Math.floor(s);const _=[],a=[],l=[],h=[];let m=0;const x=[],p=i/2;let f=0;g(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(_),this.setAttribute("position",new Wt(a,3)),this.setAttribute("normal",new Wt(l,3)),this.setAttribute("uv",new Wt(h,2));function g(){const S=new F,A=new F;let T=0;const b=(t-e)/i;for(let y=0;y<=s;y++){const E=[],I=y/s,C=I*(t-e)+e;for(let U=0;U<=r;U++){const k=U/r,W=k*u+c,B=Math.sin(W),G=Math.cos(W);A.x=C*B,A.y=-I*i+p,A.z=C*G,a.push(A.x,A.y,A.z),S.set(B,b,G).normalize(),l.push(S.x,S.y,S.z),h.push(k,1-I),E.push(m++)}x.push(E)}for(let y=0;y<r;y++)for(let E=0;E<s;E++){const I=x[E][y],C=x[E+1][y],U=x[E+1][y+1],k=x[E][y+1];(e>0||E!==0)&&(_.push(I,C,k),T+=3),(t>0||E!==s-1)&&(_.push(C,U,k),T+=3)}d.addGroup(f,T,0),f+=T}function v(S){const A=m,T=new qe,b=new F;let y=0;const E=S===!0?e:t,I=S===!0?1:-1;for(let U=1;U<=r;U++)a.push(0,p*I,0),l.push(0,I,0),h.push(.5,.5),m++;const C=m;for(let U=0;U<=r;U++){const W=U/r*u+c,B=Math.cos(W),G=Math.sin(W);b.x=E*G,b.y=p*I,b.z=E*B,a.push(b.x,b.y,b.z),l.push(0,I,0),T.x=B*.5+.5,T.y=G*.5*I+.5,h.push(T.x,T.y),m++}for(let U=0;U<r;U++){const k=A+U,W=C+U;S===!0?_.push(W,W+1,k):_.push(W+1,W,k),y+=3}d.addGroup(f,y,S===!0?1:2),f+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class rc extends Ni{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,c=Math.PI*2){super(0,e,t,i,r,s,o,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:c}}static fromJSON(e){return new rc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xh extends Gn{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];c(r),d(i),_(),this.setAttribute("position",new Wt(s,3)),this.setAttribute("normal",new Wt(s.slice(),3)),this.setAttribute("uv",new Wt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function c(g){const v=new F,S=new F,A=new F;for(let T=0;T<t.length;T+=3)h(t[T+0],v),h(t[T+1],S),h(t[T+2],A),u(v,S,A,g)}function u(g,v,S,A){const T=A+1,b=[];for(let y=0;y<=T;y++){b[y]=[];const E=g.clone().lerp(S,y/T),I=v.clone().lerp(S,y/T),C=T-y;for(let U=0;U<=C;U++)U===0&&y===T?b[y][U]=E:b[y][U]=E.clone().lerp(I,U/C)}for(let y=0;y<T;y++)for(let E=0;E<2*(T-y)-1;E++){const I=Math.floor(E/2);E%2===0?(l(b[y][I+1]),l(b[y+1][I]),l(b[y][I])):(l(b[y][I+1]),l(b[y+1][I+1]),l(b[y+1][I]))}}function d(g){const v=new F;for(let S=0;S<s.length;S+=3)v.x=s[S+0],v.y=s[S+1],v.z=s[S+2],v.normalize().multiplyScalar(g),s[S+0]=v.x,s[S+1]=v.y,s[S+2]=v.z}function _(){const g=new F;for(let v=0;v<s.length;v+=3){g.x=s[v+0],g.y=s[v+1],g.z=s[v+2];const S=p(g)/2/Math.PI+.5,A=f(g)/Math.PI+.5;o.push(S,1-A)}m(),a()}function a(){for(let g=0;g<o.length;g+=6){const v=o[g+0],S=o[g+2],A=o[g+4],T=Math.max(v,S,A),b=Math.min(v,S,A);T>.9&&b<.1&&(v<.2&&(o[g+0]+=1),S<.2&&(o[g+2]+=1),A<.2&&(o[g+4]+=1))}}function l(g){s.push(g.x,g.y,g.z)}function h(g,v){const S=g*3;v.x=e[S+0],v.y=e[S+1],v.z=e[S+2]}function m(){const g=new F,v=new F,S=new F,A=new F,T=new qe,b=new qe,y=new qe;for(let E=0,I=0;E<s.length;E+=9,I+=6){g.set(s[E+0],s[E+1],s[E+2]),v.set(s[E+3],s[E+4],s[E+5]),S.set(s[E+6],s[E+7],s[E+8]),T.set(o[I+0],o[I+1]),b.set(o[I+2],o[I+3]),y.set(o[I+4],o[I+5]),A.copy(g).add(v).add(S).divideScalar(3);const C=p(A);x(T,I+0,g,C),x(b,I+2,v,C),x(y,I+4,S,C)}}function x(g,v,S,A){A<0&&g.x===1&&(o[v]=g.x-1),S.x===0&&S.z===0&&(o[v]=A/2/Math.PI+.5)}function p(g){return Math.atan2(g.z,-g.x)}function f(g){return Math.atan2(-g.y,Math.sqrt(g.x*g.x+g.z*g.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xh(e.vertices,e.indices,e.radius,e.detail)}}class jh extends Xh{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new jh(e.radius,e.detail)}}class Ks extends Gn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,c=Math.floor(i),u=Math.floor(r),d=c+1,_=u+1,a=e/c,l=t/u,h=[],m=[],x=[],p=[];for(let f=0;f<_;f++){const g=f*l-o;for(let v=0;v<d;v++){const S=v*a-s;m.push(S,-g,0),x.push(0,0,1),p.push(v/c),p.push(1-f/u)}}for(let f=0;f<u;f++)for(let g=0;g<c;g++){const v=g+d*f,S=g+d*(f+1),A=g+1+d*(f+1),T=g+1+d*f;h.push(v,S,T),h.push(S,A,T)}this.setIndex(h),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ks(e.width,e.height,e.widthSegments,e.heightSegments)}}class Vo extends Gn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:c},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const u=Math.min(o+c,Math.PI);let d=0;const _=[],a=new F,l=new F,h=[],m=[],x=[],p=[];for(let f=0;f<=i;f++){const g=[],v=f/i;let S=0;f===0&&o===0?S=.5/t:f===i&&u===Math.PI&&(S=-.5/t);for(let A=0;A<=t;A++){const T=A/t;a.x=-e*Math.cos(r+T*s)*Math.sin(o+v*c),a.y=e*Math.cos(o+v*c),a.z=e*Math.sin(r+T*s)*Math.sin(o+v*c),m.push(a.x,a.y,a.z),l.copy(a).normalize(),x.push(l.x,l.y,l.z),p.push(T+S,1-v),g.push(d++)}_.push(g)}for(let f=0;f<i;f++)for(let g=0;g<t;g++){const v=_[f][g+1],S=_[f][g],A=_[f+1][g],T=_[f+1][g+1];(f!==0||o>0)&&h.push(v,S,T),(f!==i-1||u<Math.PI)&&h.push(S,A,T)}this.setIndex(h),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Zs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function sn(n){const e={};for(let t=0;t<n.length;t++){const i=Zs(n[t]);for(const r in i)e[r]=i[r]}return e}function rE(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function hv(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const sE={clone:Zs,merge:sn};var oE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wi extends ga{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oE,this.fragmentShader=aE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Zs(e.uniforms),this.uniformsGroups=rE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class lE extends wi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class En extends ga{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rv,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=Lh,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cE extends ga{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uE extends ga{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class wc extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Lu=new wt,Vm=new F,Hm=new F;class qh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wh,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Vm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vm),Hm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hm),t.updateMatrixWorld(),Lu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lu,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===aa||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Lu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const il=new F,rl=new io,ai=new F;class pv extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=mi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(il,rl,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(il,rl,ai.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(il,rl,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(il,rl,ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ir=new F,Gm=new qe,Wm=new qe;class pn extends pv{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ic*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(au*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ic*2*Math.atan(Math.tan(au*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ir.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ir.x,ir.y).multiplyScalar(-e/ir.z),ir.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ir.x,ir.y).multiplyScalar(-e/ir.z)}getViewSize(e,t){return this.getViewBounds(e,Gm,Wm),t.subVectors(Wm,Gm)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(au*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const u=o.fullWidth,d=o.fullHeight;s+=o.offsetX*r/u,t-=o.offsetY*i/d,r*=o.width/u,i*=o.height/d}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class fE extends qh{constructor(){super(new pn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=ic*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class dE extends wc{constructor(e,t,i=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new fE}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class hE extends qh{constructor(){super(new pn(90,1,.5,500)),this.isPointLightShadow=!0}}class Iu extends wc{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new hE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Yh extends pv{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,c=r+t,u=r-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=d*this.view.offsetX,o=s+d*this.view.width,c-=_*this.view.offsetY,u=c-_*this.view.height}this.projectionMatrix.makeOrthographic(s,o,c,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class pE extends qh{constructor(){super(new Yh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mE extends wc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new pE}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class gE extends wc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const ms=-90,gs=1;class _E extends Ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new pn(ms,gs,e,t);r.layers=this.layers,this.add(r);const s=new pn(ms,gs,e,t);s.layers=this.layers,this.add(s);const o=new pn(ms,gs,e,t);o.layers=this.layers,this.add(o);const c=new pn(ms,gs,e,t);c.layers=this.layers,this.add(c);const u=new pn(ms,gs,e,t);u.layers=this.layers,this.add(u);const d=new pn(ms,gs,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,c,u]=t;for(const d of t)this.remove(d);if(e===mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===aa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,c,u,d,_]=this.children,a=e.getRenderTarget(),l=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,_),e.setRenderTarget(a,l,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class vE extends pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class xE{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ie("THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Xm(n,e,t,i){const r=yE(i);switch(t){case tv:return n*e;case iv:return n*e/r.components*r.byteLength;case Fh:return n*e/r.components*r.byteLength;case Ys:return n*e*2/r.components*r.byteLength;case Oh:return n*e*2/r.components*r.byteLength;case nv:return n*e*3/r.components*r.byteLength;case ei:return n*e*4/r.components*r.byteLength;case kh:return n*e*4/r.components*r.byteLength;case Tl:case Al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case bl:case Rl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Jf:case ed:return Math.max(n,16)*Math.max(e,8)/4;case Zf:case Qf:return Math.max(n,8)*Math.max(e,8)/2;case td:case nd:case rd:case sd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case id:case od:case ad:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ld:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case cd:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ud:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case fd:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case dd:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case hd:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case pd:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case md:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case gd:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case _d:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case vd:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case xd:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case yd:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Sd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Md:case Ed:case wd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Td:case Ad:return Math.ceil(n/4)*Math.ceil(e/4)*8;case bd:case Rd:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function yE(n){switch(n){case bn:case Z0:return{byteLength:1,components:1};case sa:case J0:case ji:return{byteLength:2,components:1};case Nh:case Uh:return{byteLength:2,components:4};case Ei:case Dh:case pi:return{byteLength:4,components:1};case Q0:case ev:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ph}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ph);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function mv(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function SE(n){const e=new WeakMap;function t(c,u){const d=c.array,_=c.usage,a=d.byteLength,l=n.createBuffer();n.bindBuffer(u,l),n.bufferData(u,d,_),c.onUploadCallback();let h;if(d instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)h=n.HALF_FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)h=n.SHORT;else if(d instanceof Uint32Array)h=n.UNSIGNED_INT;else if(d instanceof Int32Array)h=n.INT;else if(d instanceof Int8Array)h=n.BYTE;else if(d instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:l,type:h,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:a}}function i(c,u,d){const _=u.array,a=u.updateRanges;if(n.bindBuffer(d,c),a.length===0)n.bufferSubData(d,0,_);else{a.sort((h,m)=>h.start-m.start);let l=0;for(let h=1;h<a.length;h++){const m=a[l],x=a[h];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++l,a[l]=x)}a.length=l+1;for(let h=0,m=a.length;h<m;h++){const x=a[h];n.bufferSubData(d,x.start*_.BYTES_PER_ELEMENT,_,x.start,x.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=e.get(c);u&&(n.deleteBuffer(u.buffer),e.delete(c))}function o(c,u){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const _=e.get(c);(!_||_.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const d=e.get(c);if(d===void 0)e.set(c,t(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(d.buffer,c,u),d.version=c.version}}return{get:r,remove:s,update:o}}var ME=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,EE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,TE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,AE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,RE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,CE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,PE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,LE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,IE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,DE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,NE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,UE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,FE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,OE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,BE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,VE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,HE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,GE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,WE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,XE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,YE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$E=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,KE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ZE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,JE="gl_FragColor = linearToOutputTexel( gl_FragColor );",QE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,e1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,t1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,n1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,i1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,r1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,s1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,o1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,a1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,l1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,c1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,u1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,f1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,d1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,h1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,p1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,m1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,g1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,v1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,x1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,y1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,S1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,M1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,E1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,T1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,A1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,R1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,C1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,P1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,L1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,I1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,D1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,N1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,U1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,F1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,k1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,B1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,z1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,V1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,H1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,W1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,X1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,j1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,q1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Y1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,K1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Z1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,J1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Q1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ew=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,rw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ow=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,aw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_w=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ew=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ww=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Aw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Rw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Cw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Lw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Iw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Uw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ow=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ww=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$w=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Kw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:ME,alphahash_pars_fragment:EE,alphamap_fragment:wE,alphamap_pars_fragment:TE,alphatest_fragment:AE,alphatest_pars_fragment:bE,aomap_fragment:RE,aomap_pars_fragment:CE,batching_pars_vertex:PE,batching_vertex:LE,begin_vertex:IE,beginnormal_vertex:DE,bsdfs:NE,iridescence_fragment:UE,bumpmap_pars_fragment:FE,clipping_planes_fragment:OE,clipping_planes_pars_fragment:kE,clipping_planes_pars_vertex:BE,clipping_planes_vertex:zE,color_fragment:VE,color_pars_fragment:HE,color_pars_vertex:GE,color_vertex:WE,common:XE,cube_uv_reflection_fragment:jE,defaultnormal_vertex:qE,displacementmap_pars_vertex:YE,displacementmap_vertex:$E,emissivemap_fragment:KE,emissivemap_pars_fragment:ZE,colorspace_fragment:JE,colorspace_pars_fragment:QE,envmap_fragment:e1,envmap_common_pars_fragment:t1,envmap_pars_fragment:n1,envmap_pars_vertex:i1,envmap_physical_pars_fragment:p1,envmap_vertex:r1,fog_vertex:s1,fog_pars_vertex:o1,fog_fragment:a1,fog_pars_fragment:l1,gradientmap_pars_fragment:c1,lightmap_pars_fragment:u1,lights_lambert_fragment:f1,lights_lambert_pars_fragment:d1,lights_pars_begin:h1,lights_toon_fragment:m1,lights_toon_pars_fragment:g1,lights_phong_fragment:_1,lights_phong_pars_fragment:v1,lights_physical_fragment:x1,lights_physical_pars_fragment:y1,lights_fragment_begin:S1,lights_fragment_maps:M1,lights_fragment_end:E1,logdepthbuf_fragment:w1,logdepthbuf_pars_fragment:T1,logdepthbuf_pars_vertex:A1,logdepthbuf_vertex:b1,map_fragment:R1,map_pars_fragment:C1,map_particle_fragment:P1,map_particle_pars_fragment:L1,metalnessmap_fragment:I1,metalnessmap_pars_fragment:D1,morphinstance_vertex:N1,morphcolor_vertex:U1,morphnormal_vertex:F1,morphtarget_pars_vertex:O1,morphtarget_vertex:k1,normal_fragment_begin:B1,normal_fragment_maps:z1,normal_pars_fragment:V1,normal_pars_vertex:H1,normal_vertex:G1,normalmap_pars_fragment:W1,clearcoat_normal_fragment_begin:X1,clearcoat_normal_fragment_maps:j1,clearcoat_pars_fragment:q1,iridescence_pars_fragment:Y1,opaque_fragment:$1,packing:K1,premultiplied_alpha_fragment:Z1,project_vertex:J1,dithering_fragment:Q1,dithering_pars_fragment:ew,roughnessmap_fragment:tw,roughnessmap_pars_fragment:nw,shadowmap_pars_fragment:iw,shadowmap_pars_vertex:rw,shadowmap_vertex:sw,shadowmask_pars_fragment:ow,skinbase_vertex:aw,skinning_pars_vertex:lw,skinning_vertex:cw,skinnormal_vertex:uw,specularmap_fragment:fw,specularmap_pars_fragment:dw,tonemapping_fragment:hw,tonemapping_pars_fragment:pw,transmission_fragment:mw,transmission_pars_fragment:gw,uv_pars_fragment:_w,uv_pars_vertex:vw,uv_vertex:xw,worldpos_vertex:yw,background_vert:Sw,background_frag:Mw,backgroundCube_vert:Ew,backgroundCube_frag:ww,cube_vert:Tw,cube_frag:Aw,depth_vert:bw,depth_frag:Rw,distance_vert:Cw,distance_frag:Pw,equirect_vert:Lw,equirect_frag:Iw,linedashed_vert:Dw,linedashed_frag:Nw,meshbasic_vert:Uw,meshbasic_frag:Fw,meshlambert_vert:Ow,meshlambert_frag:kw,meshmatcap_vert:Bw,meshmatcap_frag:zw,meshnormal_vert:Vw,meshnormal_frag:Hw,meshphong_vert:Gw,meshphong_frag:Ww,meshphysical_vert:Xw,meshphysical_frag:jw,meshtoon_vert:qw,meshtoon_frag:Yw,points_vert:$w,points_frag:Kw,shadow_vert:Zw,shadow_frag:Jw,sprite_vert:Qw,sprite_frag:eT},fe={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},fi={basic:{uniforms:sn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:sn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new je(0)},envMapIntensity:{value:1}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:sn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:sn([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:sn([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new je(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:sn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:sn([fe.points,fe.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:sn([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:sn([fe.common,fe.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:sn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:sn([fe.sprite,fe.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distance:{uniforms:sn([fe.common,fe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distance_vert,fragmentShader:ke.distance_frag},shadow:{uniforms:sn([fe.lights,fe.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};fi.physical={uniforms:sn([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const sl={r:0,b:0,g:0},Dr=new ri,tT=new wt;function nT(n,e,t,i,r,s){const o=new je(0);let c=r===!0?0:1,u,d,_=null,a=0,l=null;function h(g){let v=g.isScene===!0?g.background:null;if(v&&v.isTexture){const S=g.backgroundBlurriness>0;v=e.get(v,S)}return v}function m(g){let v=!1;const S=h(g);S===null?p(o,c):S&&S.isColor&&(p(S,1),v=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(g,v){const S=h(v);S&&(S.isCubeTexture||S.mapping===Ec)?(d===void 0&&(d=new $e(new An(1,1,1),new wi({name:"BackgroundCubeMaterial",uniforms:Zs(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(A,T,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),Dr.copy(v.backgroundRotation),Dr.x*=-1,Dr.y*=-1,Dr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Dr.y*=-1,Dr.z*=-1),d.material.uniforms.envMap.value=S,d.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(tT.makeRotationFromEuler(Dr)),d.material.toneMapped=Ke.getTransfer(S.colorSpace)!==st,(_!==S||a!==S.version||l!==n.toneMapping)&&(d.material.needsUpdate=!0,_=S,a=S.version,l=n.toneMapping),d.layers.enableAll(),g.unshift(d,d.geometry,d.material,0,0,null)):S&&S.isTexture&&(u===void 0&&(u=new $e(new Ks(2,2),new wi({name:"BackgroundMaterial",uniforms:Zs(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=S,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.toneMapped=Ke.getTransfer(S.colorSpace)!==st,S.matrixAutoUpdate===!0&&S.updateMatrix(),u.material.uniforms.uvTransform.value.copy(S.matrix),(_!==S||a!==S.version||l!==n.toneMapping)&&(u.material.needsUpdate=!0,_=S,a=S.version,l=n.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null))}function p(g,v){g.getRGB(sl,hv(n)),t.buffers.color.setClear(sl.r,sl.g,sl.b,v,s)}function f(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return o},setClearColor:function(g,v=1){o.set(g),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(g){c=g,p(o,c)},render:m,addToRenderList:x,dispose:f}}function iT(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=l(null);let s=r,o=!1;function c(C,U,k,W,B){let G=!1;const O=a(C,W,k,U);s!==O&&(s=O,d(s.object)),G=h(C,W,k,B),G&&m(C,W,k,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,S(C,U,k,W),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function u(){return n.createVertexArray()}function d(C){return n.bindVertexArray(C)}function _(C){return n.deleteVertexArray(C)}function a(C,U,k,W){const B=W.wireframe===!0;let G=i[U.id];G===void 0&&(G={},i[U.id]=G);const O=C.isInstancedMesh===!0?C.id:0;let V=G[O];V===void 0&&(V={},G[O]=V);let q=V[k.id];q===void 0&&(q={},V[k.id]=q);let J=q[B];return J===void 0&&(J=l(u()),q[B]=J),J}function l(C){const U=[],k=[],W=[];for(let B=0;B<t;B++)U[B]=0,k[B]=0,W[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:k,attributeDivisors:W,object:C,attributes:{},index:null}}function h(C,U,k,W){const B=s.attributes,G=U.attributes;let O=0;const V=k.getAttributes();for(const q in V)if(V[q].location>=0){const ae=B[q];let re=G[q];if(re===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),ae===void 0||ae.attribute!==re||re&&ae.data!==re.data)return!0;O++}return s.attributesNum!==O||s.index!==W}function m(C,U,k,W){const B={},G=U.attributes;let O=0;const V=k.getAttributes();for(const q in V)if(V[q].location>=0){let ae=G[q];ae===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(ae=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(ae=C.instanceColor));const re={};re.attribute=ae,ae&&ae.data&&(re.data=ae.data),B[q]=re,O++}s.attributes=B,s.attributesNum=O,s.index=W}function x(){const C=s.newAttributes;for(let U=0,k=C.length;U<k;U++)C[U]=0}function p(C){f(C,0)}function f(C,U){const k=s.newAttributes,W=s.enabledAttributes,B=s.attributeDivisors;k[C]=1,W[C]===0&&(n.enableVertexAttribArray(C),W[C]=1),B[C]!==U&&(n.vertexAttribDivisor(C,U),B[C]=U)}function g(){const C=s.newAttributes,U=s.enabledAttributes;for(let k=0,W=U.length;k<W;k++)U[k]!==C[k]&&(n.disableVertexAttribArray(k),U[k]=0)}function v(C,U,k,W,B,G,O){O===!0?n.vertexAttribIPointer(C,U,k,B,G):n.vertexAttribPointer(C,U,k,W,B,G)}function S(C,U,k,W){x();const B=W.attributes,G=k.getAttributes(),O=U.defaultAttributeValues;for(const V in G){const q=G[V];if(q.location>=0){let J=B[V];if(J===void 0&&(V==="instanceMatrix"&&C.instanceMatrix&&(J=C.instanceMatrix),V==="instanceColor"&&C.instanceColor&&(J=C.instanceColor)),J!==void 0){const ae=J.normalized,re=J.itemSize,Pe=e.get(J);if(Pe===void 0)continue;const Je=Pe.buffer,nt=Pe.type,K=Pe.bytesPerElement,ie=nt===n.INT||nt===n.UNSIGNED_INT||J.gpuType===Dh;if(J.isInterleavedBufferAttribute){const ue=J.data,Fe=ue.stride,Re=J.offset;if(ue.isInstancedInterleavedBuffer){for(let Le=0;Le<q.locationSize;Le++)f(q.location+Le,ue.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Le=0;Le<q.locationSize;Le++)p(q.location+Le);n.bindBuffer(n.ARRAY_BUFFER,Je);for(let Le=0;Le<q.locationSize;Le++)v(q.location+Le,re/q.locationSize,nt,ae,Fe*K,(Re+re/q.locationSize*Le)*K,ie)}else{if(J.isInstancedBufferAttribute){for(let ue=0;ue<q.locationSize;ue++)f(q.location+ue,J.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ue=0;ue<q.locationSize;ue++)p(q.location+ue);n.bindBuffer(n.ARRAY_BUFFER,Je);for(let ue=0;ue<q.locationSize;ue++)v(q.location+ue,re/q.locationSize,nt,ae,re*K,re/q.locationSize*ue*K,ie)}}else if(O!==void 0){const ae=O[V];if(ae!==void 0)switch(ae.length){case 2:n.vertexAttrib2fv(q.location,ae);break;case 3:n.vertexAttrib3fv(q.location,ae);break;case 4:n.vertexAttrib4fv(q.location,ae);break;default:n.vertexAttrib1fv(q.location,ae)}}}}g()}function A(){E();for(const C in i){const U=i[C];for(const k in U){const W=U[k];for(const B in W){const G=W[B];for(const O in G)_(G[O].object),delete G[O];delete W[B]}}delete i[C]}}function T(C){if(i[C.id]===void 0)return;const U=i[C.id];for(const k in U){const W=U[k];for(const B in W){const G=W[B];for(const O in G)_(G[O].object),delete G[O];delete W[B]}}delete i[C.id]}function b(C){for(const U in i){const k=i[U];for(const W in k){const B=k[W];if(B[C.id]===void 0)continue;const G=B[C.id];for(const O in G)_(G[O].object),delete G[O];delete B[C.id]}}}function y(C){for(const U in i){const k=i[U],W=C.isInstancedMesh===!0?C.id:0,B=k[W];if(B!==void 0){for(const G in B){const O=B[G];for(const V in O)_(O[V].object),delete O[V];delete B[G]}delete k[W],Object.keys(k).length===0&&delete i[U]}}}function E(){I(),o=!0,s!==r&&(s=r,d(s.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:E,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:b,initAttributes:x,enableAttribute:p,disableUnusedAttributes:g}}function rT(n,e,t){let i;function r(d){i=d}function s(d,_){n.drawArrays(i,d,_),t.update(_,i,1)}function o(d,_,a){a!==0&&(n.drawArraysInstanced(i,d,_,a),t.update(_,i,a))}function c(d,_,a){if(a===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,_,0,a);let h=0;for(let m=0;m<a;m++)h+=_[m];t.update(h,i,1)}function u(d,_,a,l){if(a===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<d.length;m++)o(d[m],_[m],l[m]);else{h.multiDrawArraysInstancedWEBGL(i,d,0,_,0,l,0,a);let m=0;for(let x=0;x<a;x++)m+=_[x]*l[x];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function sT(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(b){return!(b!==ei&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(b){const y=b===ji&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==bn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==pi&&!y)}function u(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const _=u(d);_!==d&&(Ie("WebGLRenderer:",d,"not supported, using",_,"instead."),d=_);const a=t.logarithmicDepthBuffer===!0,l=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),g=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:u,textureFormatReadable:o,textureTypeReadable:c,precision:d,logarithmicDepthBuffer:a,reversedDepthBuffer:l,maxTextures:h,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:S,maxSamples:A,samples:T}}function oT(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Or,c=new Oe,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(a,l){const h=a.length!==0||l||i!==0||r;return r=l,i=a.length,h},this.beginShadows=function(){s=!0,_(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(a,l){t=_(a,l,0)},this.setState=function(a,l,h){const m=a.clippingPlanes,x=a.clipIntersection,p=a.clipShadows,f=n.get(a);if(!r||m===null||m.length===0||s&&!p)s?_(null):d();else{const g=s?0:i,v=g*4;let S=f.clippingState||null;u.value=S,S=_(m,l,v,h);for(let A=0;A!==v;++A)S[A]=t[A];f.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=g}};function d(){u.value!==t&&(u.value=t,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function _(a,l,h,m){const x=a!==null?a.length:0;let p=null;if(x!==0){if(p=u.value,m!==!0||p===null){const f=h+x*4,g=l.matrixWorldInverse;c.getNormalMatrix(g),(p===null||p.length<f)&&(p=new Float32Array(f));for(let v=0,S=h;v!==x;++v,S+=4)o.copy(a[v]).applyMatrix4(g,c),o.normal.toArray(p,S),p[S+3]=o.constant}u.value=p,u.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}const fr=4,jm=[.125,.215,.35,.446,.526,.582],Br=20,aT=256,So=new Yh,qm=new je;let Du=null,Nu=0,Uu=0,Fu=!1;const lT=new F;class Ym{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:c=lT}=s;Du=this._renderer.getRenderTarget(),Nu=this._renderer.getActiveCubeFace(),Uu=this._renderer.getActiveMipmapLevel(),Fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,i,r,u,c),t>0&&this._blur(u,0,0,t),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Km(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Du,Nu,Uu),this._renderer.xr.enabled=Fu,e.scissorTest=!1,_s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Jr||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Du=this._renderer.getRenderTarget(),Nu=this._renderer.getActiveCubeFace(),Uu=this._renderer.getActiveMipmapLevel(),Fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:ji,format:ei,colorSpace:$s,depthBuffer:!1},r=$m(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$m(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cT(s)),this._blurMaterial=fT(s,e,t),this._ggxMaterial=uT(s,e,t)}return r}_compileMaterial(e){const t=new $e(new Gn,e);this._renderer.compile(t,So)}_sceneToCubeUV(e,t,i,r,s){const u=new pn(90,1,t,i),d=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],a=this._renderer,l=a.autoClear,h=a.toneMapping;a.getClearColor(qm),a.toneMapping=xi,a.autoClear=!1,a.state.buffers.depth.getReversed()&&(a.setRenderTarget(r),a.clearDepth(),a.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $e(new An,new zo({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,p=x.material;let f=!1;const g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,f=!0):(p.color.copy(qm),f=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(u.up.set(0,d[v],0),u.position.set(s.x,s.y,s.z),u.lookAt(s.x+_[v],s.y,s.z)):S===1?(u.up.set(0,0,d[v]),u.position.set(s.x,s.y,s.z),u.lookAt(s.x,s.y+_[v],s.z)):(u.up.set(0,d[v],0),u.position.set(s.x,s.y,s.z),u.lookAt(s.x,s.y,s.z+_[v]));const A=this._cubeSize;_s(r,S*A,v>2?A:0,A,A),a.setRenderTarget(r),f&&a.render(x,u),a.render(e,u)}a.toneMapping=h,a.autoClear=l,e.background=g}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Jr||e.mapping===qs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Km());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const c=s.uniforms;c.envMap.value=e;const u=this._cubeSize;_s(t,0,0,3*u,2*u),i.setRenderTarget(t),i.render(o,So)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,c=this._lodMeshes[i];c.material=o;const u=o.uniforms,d=i/(this._lodMeshes.length-1),_=t/(this._lodMeshes.length-1),a=Math.sqrt(d*d-_*_),l=0+d*1.25,h=a*l,{_lodMax:m}=this,x=this._sizeLods[i],p=3*x*(i>m-fr?i-m+fr:0),f=4*(this._cubeSize-x);u.envMap.value=e.texture,u.roughness.value=h,u.mipInt.value=m-t,_s(s,p,f,3*x,2*x),r.setRenderTarget(s),r.render(c,So),u.envMap.value=s.texture,u.roughness.value=0,u.mipInt.value=m-i,_s(e,p,f,3*x,2*x),r.setRenderTarget(e),r.render(c,So)}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,c){const u=this._renderer,d=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const _=3,a=this._lodMeshes[r];a.material=d;const l=d.uniforms,h=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Br-1),x=s/m,p=isFinite(s)?1+Math.floor(_*x):Br;p>Br&&Ie(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Br}`);const f=[];let g=0;for(let b=0;b<Br;++b){const y=b/x,E=Math.exp(-y*y/2);f.push(E),b===0?g+=E:b<p&&(g+=2*E)}for(let b=0;b<f.length;b++)f[b]=f[b]/g;l.envMap.value=e.texture,l.samples.value=p,l.weights.value=f,l.latitudinal.value=o==="latitudinal",c&&(l.poleAxis.value=c);const{_lodMax:v}=this;l.dTheta.value=m,l.mipInt.value=v-i;const S=this._sizeLods[r],A=3*S*(r>v-fr?r-v+fr:0),T=4*(this._cubeSize-S);_s(t,A,T,3*S,2*S),u.setRenderTarget(t),u.render(a,So)}}function cT(n){const e=[],t=[],i=[];let r=n;const s=n-fr+1+jm.length;for(let o=0;o<s;o++){const c=Math.pow(2,r);e.push(c);let u=1/c;o>n-fr?u=jm[o-n+fr-1]:o===0&&(u=0),t.push(u);const d=1/(c-2),_=-d,a=1+d,l=[_,_,a,_,a,a,_,_,a,a,_,a],h=6,m=6,x=3,p=2,f=1,g=new Float32Array(x*m*h),v=new Float32Array(p*m*h),S=new Float32Array(f*m*h);for(let T=0;T<h;T++){const b=T%3*2/3-1,y=T>2?0:-1,E=[b,y,0,b+2/3,y,0,b+2/3,y+1,0,b,y,0,b+2/3,y+1,0,b,y+1,0];g.set(E,x*m*T),v.set(l,p*m*T);const I=[T,T,T,T,T,T];S.set(I,f*m*T)}const A=new Gn;A.setAttribute("position",new Si(g,x)),A.setAttribute("uv",new Si(v,p)),A.setAttribute("faceIndex",new Si(S,f)),i.push(new $e(A,null)),r>fr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function $m(n,e,t){const i=new yi(n,e,t);return i.texture.mapping=Ec,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _s(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function uT(n,e,t){return new wi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:aT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Tc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function fT(n,e,t){const i=new Float32Array(Br),r=new F(0,1,0);return new wi({name:"SphericalGaussianBlur",defines:{n:Br,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function Km(){return new wi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function Zm(){return new wi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function Tc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class gv extends yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new fv(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new An(5,5,5),s=new wi({name:"CubemapFromEquirect",uniforms:Zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:xn,blending:zi});s.uniforms.tEquirect.value=t;const o=new $e(r,s),c=t.minFilter;return t.minFilter===Gr&&(t.minFilter=nn),new _E(1,10,this).update(e,o),t.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}function dT(n){let e=new WeakMap,t=new WeakMap,i=null;function r(l,h=!1){return l==null?null:h?o(l):s(l)}function s(l){if(l&&l.isTexture){const h=l.mapping;if(h===ru||h===su)if(e.has(l)){const m=e.get(l).texture;return c(m,l.mapping)}else{const m=l.image;if(m&&m.height>0){const x=new gv(m.height);return x.fromEquirectangularTexture(n,l),e.set(l,x),l.addEventListener("dispose",d),c(x.texture,l.mapping)}else return null}}return l}function o(l){if(l&&l.isTexture){const h=l.mapping,m=h===ru||h===su,x=h===Jr||h===qs;if(m||x){let p=t.get(l);const f=p!==void 0?p.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==f)return i===null&&(i=new Ym(n)),p=m?i.fromEquirectangular(l,p):i.fromCubemap(l,p),p.texture.pmremVersion=l.pmremVersion,t.set(l,p),p.texture;if(p!==void 0)return p.texture;{const g=l.image;return m&&g&&g.height>0||x&&g&&u(g)?(i===null&&(i=new Ym(n)),p=m?i.fromEquirectangular(l):i.fromCubemap(l),p.texture.pmremVersion=l.pmremVersion,t.set(l,p),l.addEventListener("dispose",_),p.texture):null}}}return l}function c(l,h){return h===ru?l.mapping=Jr:h===su&&(l.mapping=qs),l}function u(l){let h=0;const m=6;for(let x=0;x<m;x++)l[x]!==void 0&&h++;return h===m}function d(l){const h=l.target;h.removeEventListener("dispose",d);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function _(l){const h=l.target;h.removeEventListener("dispose",_);const m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function a(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:a}}function hT(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&nc("WebGLRenderer: "+i+" extension not supported."),r}}}function pT(n,e,t,i){const r={},s=new WeakMap;function o(a){const l=a.target;l.index!==null&&e.remove(l.index);for(const m in l.attributes)e.remove(l.attributes[m]);l.removeEventListener("dispose",o),delete r[l.id];const h=s.get(l);h&&(e.remove(h),s.delete(l)),i.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,t.memory.geometries--}function c(a,l){return r[l.id]===!0||(l.addEventListener("dispose",o),r[l.id]=!0,t.memory.geometries++),l}function u(a){const l=a.attributes;for(const h in l)e.update(l[h],n.ARRAY_BUFFER)}function d(a){const l=[],h=a.index,m=a.attributes.position;let x=0;if(m===void 0)return;if(h!==null){const g=h.array;x=h.version;for(let v=0,S=g.length;v<S;v+=3){const A=g[v+0],T=g[v+1],b=g[v+2];l.push(A,T,T,b,b,A)}}else{const g=m.array;x=m.version;for(let v=0,S=g.length/3-1;v<S;v+=3){const A=v+0,T=v+1,b=v+2;l.push(A,T,T,b,b,A)}}const p=new(m.count>=65535?uv:cv)(l,1);p.version=x;const f=s.get(a);f&&e.remove(f),s.set(a,p)}function _(a){const l=s.get(a);if(l){const h=a.index;h!==null&&l.version<h.version&&d(a)}else d(a);return s.get(a)}return{get:c,update:u,getWireframeAttribute:_}}function mT(n,e,t){let i;function r(l){i=l}let s,o;function c(l){s=l.type,o=l.bytesPerElement}function u(l,h){n.drawElements(i,h,s,l*o),t.update(h,i,1)}function d(l,h,m){m!==0&&(n.drawElementsInstanced(i,h,s,l*o,m),t.update(h,i,m))}function _(l,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,l,0,m);let p=0;for(let f=0;f<m;f++)p+=h[f];t.update(p,i,1)}function a(l,h,m,x){if(m===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<l.length;f++)d(l[f]/o,h[f],x[f]);else{p.multiDrawElementsInstancedWEBGL(i,h,0,s,l,0,x,0,m);let f=0;for(let g=0;g<m;g++)f+=h[g]*x[g];t.update(f,i,1)}}this.setMode=r,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=_,this.renderMultiDrawInstances=a}function gT(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,c){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=c*(s/3);break;case n.LINES:t.lines+=c*(s/2);break;case n.LINE_STRIP:t.lines+=c*(s-1);break;case n.LINE_LOOP:t.lines+=c*s;break;case n.POINTS:t.points+=c*s;break;default:et("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function _T(n,e,t){const i=new WeakMap,r=new Et;function s(o,c,u){const d=o.morphTargetInfluences,_=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,a=_!==void 0?_.length:0;let l=i.get(c);if(l===void 0||l.count!==a){let I=function(){y.dispose(),i.delete(c),c.removeEventListener("dispose",I)};var h=I;l!==void 0&&l.texture.dispose();const m=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,p=c.morphAttributes.color!==void 0,f=c.morphAttributes.position||[],g=c.morphAttributes.normal||[],v=c.morphAttributes.color||[];let S=0;m===!0&&(S=1),x===!0&&(S=2),p===!0&&(S=3);let A=c.attributes.position.count*S,T=1;A>e.maxTextureSize&&(T=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const b=new Float32Array(A*T*4*a),y=new ov(b,A,T,a);y.type=pi,y.needsUpdate=!0;const E=S*4;for(let C=0;C<a;C++){const U=f[C],k=g[C],W=v[C],B=A*T*4*C;for(let G=0;G<U.count;G++){const O=G*E;m===!0&&(r.fromBufferAttribute(U,G),b[B+O+0]=r.x,b[B+O+1]=r.y,b[B+O+2]=r.z,b[B+O+3]=0),x===!0&&(r.fromBufferAttribute(k,G),b[B+O+4]=r.x,b[B+O+5]=r.y,b[B+O+6]=r.z,b[B+O+7]=0),p===!0&&(r.fromBufferAttribute(W,G),b[B+O+8]=r.x,b[B+O+9]=r.y,b[B+O+10]=r.z,b[B+O+11]=W.itemSize===4?r.w:1)}}l={count:a,texture:y,size:new qe(A,T)},i.set(c,l),c.addEventListener("dispose",I)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)u.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let p=0;p<d.length;p++)m+=d[p];const x=c.morphTargetsRelative?1:1-m;u.getUniforms().setValue(n,"morphTargetBaseInfluence",x),u.getUniforms().setValue(n,"morphTargetInfluences",d)}u.getUniforms().setValue(n,"morphTargetsTexture",l.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",l.size)}return{update:s}}function vT(n,e,t,i,r){let s=new WeakMap;function o(d){const _=r.render.frame,a=d.geometry,l=e.get(d,a);if(s.get(l)!==_&&(e.update(l),s.set(l,_)),d.isInstancedMesh&&(d.hasEventListener("dispose",u)===!1&&d.addEventListener("dispose",u),s.get(d)!==_&&(t.update(d.instanceMatrix,n.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,n.ARRAY_BUFFER),s.set(d,_))),d.isSkinnedMesh){const h=d.skeleton;s.get(h)!==_&&(h.update(),s.set(h,_))}return l}function c(){s=new WeakMap}function u(d){const _=d.target;_.removeEventListener("dispose",u),i.releaseStatesOfObject(_),t.remove(_.instanceMatrix),_.instanceColor!==null&&t.remove(_.instanceColor)}return{update:o,dispose:c}}const xT={[W0]:"LINEAR_TONE_MAPPING",[X0]:"REINHARD_TONE_MAPPING",[j0]:"CINEON_TONE_MAPPING",[Ih]:"ACES_FILMIC_TONE_MAPPING",[Y0]:"AGX_TONE_MAPPING",[$0]:"NEUTRAL_TONE_MAPPING",[q0]:"CUSTOM_TONE_MAPPING"};function yT(n,e,t,i,r){const s=new yi(e,t,{type:n,depthBuffer:i,stencilBuffer:r}),o=new yi(e,t,{type:ji,depthBuffer:!1,stencilBuffer:!1}),c=new Gn;c.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Wt([0,2,0,0,2,0],2));const u=new lE({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new $e(c,u),_=new Yh(-1,1,1,-1,0,1);let a=null,l=null,h=!1,m,x=null,p=[],f=!1;this.setSize=function(g,v){s.setSize(g,v),o.setSize(g,v);for(let S=0;S<p.length;S++){const A=p[S];A.setSize&&A.setSize(g,v)}},this.setEffects=function(g){p=g,f=p.length>0&&p[0].isRenderPass===!0;const v=s.width,S=s.height;for(let A=0;A<p.length;A++){const T=p[A];T.setSize&&T.setSize(v,S)}},this.begin=function(g,v){if(h||g.toneMapping===xi&&p.length===0)return!1;if(x=v,v!==null){const S=v.width,A=v.height;(s.width!==S||s.height!==A)&&this.setSize(S,A)}return f===!1&&g.setRenderTarget(s),m=g.toneMapping,g.toneMapping=xi,!0},this.hasRenderPass=function(){return f},this.end=function(g,v){g.toneMapping=m,h=!0;let S=s,A=o;for(let T=0;T<p.length;T++){const b=p[T];if(b.enabled!==!1&&(b.render(g,A,S,v),b.needsSwap!==!1)){const y=S;S=A,A=y}}if(a!==g.outputColorSpace||l!==g.toneMapping){a=g.outputColorSpace,l=g.toneMapping,u.defines={},Ke.getTransfer(a)===st&&(u.defines.SRGB_TRANSFER="");const T=xT[l];T&&(u.defines[T]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,g.setRenderTarget(x),g.render(d,_),x=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.dispose(),o.dispose(),c.dispose(),u.dispose()}}const _v=new cn,Cd=new la(1,1),vv=new ov,xv=new kM,yv=new fv,Jm=[],Qm=[],eg=new Float32Array(16),tg=new Float32Array(9),ng=new Float32Array(4);function ro(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Jm[r];if(s===void 0&&(s=new Float32Array(r),Jm[r]=s),e!==0){i.toArray(s,0);for(let o=1,c=0;o!==e;++o)c+=t,n[o].toArray(s,c)}return s}function Ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ac(n,e){let t=Qm[e];t===void 0&&(t=new Int32Array(e),Qm[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ST(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function MT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function ET(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function wT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function TT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;ng.set(i),n.uniformMatrix2fv(this.addr,!1,ng),Ot(t,i)}}function AT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;tg.set(i),n.uniformMatrix3fv(this.addr,!1,tg),Ot(t,i)}}function bT(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,i))return;eg.set(i),n.uniformMatrix4fv(this.addr,!1,eg),Ot(t,i)}}function RT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function CT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function PT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function LT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function IT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function DT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function NT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function UT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function FT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Cd.compareFunction=t.isReversedDepthBuffer()?zh:Bh,s=Cd):s=_v,t.setTexture2D(e||s,r)}function OT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||xv,r)}function kT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||yv,r)}function BT(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||vv,r)}function zT(n){switch(n){case 5126:return ST;case 35664:return MT;case 35665:return ET;case 35666:return wT;case 35674:return TT;case 35675:return AT;case 35676:return bT;case 5124:case 35670:return RT;case 35667:case 35671:return CT;case 35668:case 35672:return PT;case 35669:case 35673:return LT;case 5125:return IT;case 36294:return DT;case 36295:return NT;case 36296:return UT;case 35678:case 36198:case 36298:case 36306:case 35682:return FT;case 35679:case 36299:case 36307:return OT;case 35680:case 36300:case 36308:case 36293:return kT;case 36289:case 36303:case 36311:case 36292:return BT}}function VT(n,e){n.uniform1fv(this.addr,e)}function HT(n,e){const t=ro(e,this.size,2);n.uniform2fv(this.addr,t)}function GT(n,e){const t=ro(e,this.size,3);n.uniform3fv(this.addr,t)}function WT(n,e){const t=ro(e,this.size,4);n.uniform4fv(this.addr,t)}function XT(n,e){const t=ro(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function jT(n,e){const t=ro(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function qT(n,e){const t=ro(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function YT(n,e){n.uniform1iv(this.addr,e)}function $T(n,e){n.uniform2iv(this.addr,e)}function KT(n,e){n.uniform3iv(this.addr,e)}function ZT(n,e){n.uniform4iv(this.addr,e)}function JT(n,e){n.uniform1uiv(this.addr,e)}function QT(n,e){n.uniform2uiv(this.addr,e)}function eA(n,e){n.uniform3uiv(this.addr,e)}function tA(n,e){n.uniform4uiv(this.addr,e)}function nA(n,e,t){const i=this.cache,r=e.length,s=Ac(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=Cd:o=_v;for(let c=0;c!==r;++c)t.setTexture2D(e[c]||o,s[c])}function iA(n,e,t){const i=this.cache,r=e.length,s=Ac(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||xv,s[o])}function rA(n,e,t){const i=this.cache,r=e.length,s=Ac(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||yv,s[o])}function sA(n,e,t){const i=this.cache,r=e.length,s=Ac(t,r);Ft(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||vv,s[o])}function oA(n){switch(n){case 5126:return VT;case 35664:return HT;case 35665:return GT;case 35666:return WT;case 35674:return XT;case 35675:return jT;case 35676:return qT;case 5124:case 35670:return YT;case 35667:case 35671:return $T;case 35668:case 35672:return KT;case 35669:case 35673:return ZT;case 5125:return JT;case 36294:return QT;case 36295:return eA;case 36296:return tA;case 35678:case 36198:case 36298:case 36306:case 35682:return nA;case 35679:case 36299:case 36307:return iA;case 35680:case 36300:case 36308:case 36293:return rA;case 36289:case 36303:case 36311:case 36292:return sA}}class aA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=zT(t.type)}}class lA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=oA(t.type)}}class cA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const c=r[s];c.setValue(e,t[c.id],i)}}}const Ou=/(\w+)(\])?(\[|\.)?/g;function ig(n,e){n.seq.push(e),n.map[e.id]=e}function uA(n,e,t){const i=n.name,r=i.length;for(Ou.lastIndex=0;;){const s=Ou.exec(i),o=Ou.lastIndex;let c=s[1];const u=s[2]==="]",d=s[3];if(u&&(c=c|0),d===void 0||d==="["&&o+2===r){ig(t,d===void 0?new aA(c,n,e):new lA(c,n,e));break}else{let a=t.map[c];a===void 0&&(a=new cA(c),ig(t,a)),t=a}}}class Cl{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const c=e.getActiveUniform(t,o),u=e.getUniformLocation(t,c.name);uA(c,u,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const c=t[s],u=i[c.id];u.needsUpdate!==!1&&c.setValue(e,u.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function rg(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const fA=37297;let dA=0;function hA(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const c=o+1;i.push(`${c===e?">":" "} ${c}: ${t[o]}`)}return i.join(`
`)}const sg=new Oe;function pA(n){Ke._getMatrix(sg,Ke.workingColorSpace,n);const e=`mat3( ${sg.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case ec:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function og(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const c=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+hA(n.getShaderSource(e),c)}else return s}function mA(n,e){const t=pA(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const gA={[W0]:"Linear",[X0]:"Reinhard",[j0]:"Cineon",[Ih]:"ACESFilmic",[Y0]:"AgX",[$0]:"Neutral",[q0]:"Custom"};function _A(n,e){const t=gA[e];return t===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ol=new F;function vA(){Ke.getLuminanceCoefficients(ol);const n=ol.x.toFixed(4),e=ol.y.toFixed(4),t=ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xA(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Po).join(`
`)}function yA(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function SA(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let c=1;s.type===n.FLOAT_MAT2&&(c=2),s.type===n.FLOAT_MAT3&&(c=3),s.type===n.FLOAT_MAT4&&(c=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:c}}return t}function Po(n){return n!==""}function ag(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function lg(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const MA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pd(n){return n.replace(MA,wA)}const EA=new Map;function wA(n,e){let t=ke[e];if(t===void 0){const i=EA.get(e);if(i!==void 0)t=ke[i],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Pd(t)}const TA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cg(n){return n.replace(TA,AA)}function AA(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ug(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const bA={[wl]:"SHADOWMAP_TYPE_PCF",[Co]:"SHADOWMAP_TYPE_VSM"};function RA(n){return bA[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const CA={[Jr]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE",[Ec]:"ENVMAP_TYPE_CUBE_UV"};function PA(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":CA[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const LA={[qs]:"ENVMAP_MODE_REFRACTION"};function IA(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":LA[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const DA={[Lh]:"ENVMAP_BLENDING_MULTIPLY",[_M]:"ENVMAP_BLENDING_MIX",[vM]:"ENVMAP_BLENDING_ADD"};function NA(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":DA[n.combine]||"ENVMAP_BLENDING_NONE"}function UA(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function FA(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,c=t.fragmentShader;const u=RA(t),d=PA(t),_=IA(t),a=NA(t),l=UA(t),h=xA(t),m=yA(s),x=r.createProgram();let p,f,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Po).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Po).join(`
`),f.length>0&&(f+=`
`)):(p=[ug(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+_:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Po).join(`
`),f=[ug(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+_:"",t.envMap?"#define "+a:"",l?"#define CUBEUV_TEXEL_WIDTH "+l.texelWidth:"",l?"#define CUBEUV_TEXEL_HEIGHT "+l.texelHeight:"",l?"#define CUBEUV_MAX_MIP "+l.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xi?"#define TONE_MAPPING":"",t.toneMapping!==xi?ke.tonemapping_pars_fragment:"",t.toneMapping!==xi?_A("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,mA("linearToOutputTexel",t.outputColorSpace),vA(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Po).join(`
`)),o=Pd(o),o=ag(o,t),o=lg(o,t),c=Pd(c),c=ag(c,t),c=lg(c,t),o=cg(o),c=cg(c),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,p=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===wm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=g+p+o,S=g+f+c,A=rg(r,r.VERTEX_SHADER,v),T=rg(r,r.FRAGMENT_SHADER,S);r.attachShader(x,A),r.attachShader(x,T),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function b(C){if(n.debug.checkShaderErrors){const U=r.getProgramInfoLog(x)||"",k=r.getShaderInfoLog(A)||"",W=r.getShaderInfoLog(T)||"",B=U.trim(),G=k.trim(),O=W.trim();let V=!0,q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,A,T);else{const J=og(r,A,"vertex"),ae=og(r,T,"fragment");et("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+J+`
`+ae)}else B!==""?Ie("WebGLProgram: Program Info Log:",B):(G===""||O==="")&&(q=!1);q&&(C.diagnostics={runnable:V,programLog:B,vertexShader:{log:G,prefix:p},fragmentShader:{log:O,prefix:f}})}r.deleteShader(A),r.deleteShader(T),y=new Cl(r,x),E=SA(r,x)}let y;this.getUniforms=function(){return y===void 0&&b(this),y};let E;this.getAttributes=function(){return E===void 0&&b(this),E};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(x,fA)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dA++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=T,this}let OA=0;class kA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new BA(e),t.set(e,i)),i}}class BA{constructor(e){this.id=OA++,this.code=e,this.usedTimes=0}}function zA(n,e,t,i,r,s){const o=new av,c=new kA,u=new Set,d=[],_=new Map,a=i.logarithmicDepthBuffer;let l=i.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return u.add(y),y===0?"uv":`uv${y}`}function x(y,E,I,C,U){const k=C.fog,W=U.geometry,B=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?C.environment:null,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,O=e.get(y.envMap||B,G),V=O&&O.mapping===Ec?O.image.height:null,q=h[y.type];y.precision!==null&&(l=i.getMaxPrecision(y.precision),l!==y.precision&&Ie("WebGLProgram.getParameters:",y.precision,"not supported, using",l,"instead."));const J=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ae=J!==void 0?J.length:0;let re=0;W.morphAttributes.position!==void 0&&(re=1),W.morphAttributes.normal!==void 0&&(re=2),W.morphAttributes.color!==void 0&&(re=3);let Pe,Je,nt,K;if(q){const rt=fi[q];Pe=rt.vertexShader,Je=rt.fragmentShader}else Pe=y.vertexShader,Je=y.fragmentShader,c.update(y),nt=c.getVertexShaderID(y),K=c.getFragmentShaderID(y);const ie=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),Fe=U.isInstancedMesh===!0,Re=U.isBatchedMesh===!0,Le=!!y.map,kt=!!y.matcap,Ye=!!O,it=!!y.aoMap,ct=!!y.lightMap,Be=!!y.bumpMap,Tt=!!y.normalMap,P=!!y.displacementMap,Ct=!!y.emissiveMap,tt=!!y.metalnessMap,ft=!!y.roughnessMap,Ee=y.anisotropy>0,R=y.clearcoat>0,M=y.dispersion>0,D=y.iridescence>0,Z=y.sheen>0,Q=y.transmission>0,$=Ee&&!!y.anisotropyMap,ve=R&&!!y.clearcoatMap,le=R&&!!y.clearcoatNormalMap,be=R&&!!y.clearcoatRoughnessMap,Ce=D&&!!y.iridescenceMap,te=D&&!!y.iridescenceThicknessMap,se=Z&&!!y.sheenColorMap,xe=Z&&!!y.sheenRoughnessMap,Se=!!y.specularMap,pe=!!y.specularColorMap,ze=!!y.specularIntensityMap,L=Q&&!!y.transmissionMap,ce=Q&&!!y.thicknessMap,oe=!!y.gradientMap,_e=!!y.alphaMap,ne=y.alphaTest>0,Y=!!y.alphaHash,ye=!!y.extensions;let De=xi;y.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(De=n.toneMapping);const dt={shaderID:q,shaderType:y.type,shaderName:y.name,vertexShader:Pe,fragmentShader:Je,defines:y.defines,customVertexShaderID:nt,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:l,batching:Re,batchingColor:Re&&U._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&U.instanceColor!==null,instancingMorph:Fe&&U.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:$s,alphaToCoverage:!!y.alphaToCoverage,map:Le,matcap:kt,envMap:Ye,envMapMode:Ye&&O.mapping,envMapCubeUVHeight:V,aoMap:it,lightMap:ct,bumpMap:Be,normalMap:Tt,displacementMap:P,emissiveMap:Ct,normalMapObjectSpace:Tt&&y.normalMapType===SM,normalMapTangentSpace:Tt&&y.normalMapType===rv,metalnessMap:tt,roughnessMap:ft,anisotropy:Ee,anisotropyMap:$,clearcoat:R,clearcoatMap:ve,clearcoatNormalMap:le,clearcoatRoughnessMap:be,dispersion:M,iridescence:D,iridescenceMap:Ce,iridescenceThicknessMap:te,sheen:Z,sheenColorMap:se,sheenRoughnessMap:xe,specularMap:Se,specularColorMap:pe,specularIntensityMap:ze,transmission:Q,transmissionMap:L,thicknessMap:ce,gradientMap:oe,opaque:y.transparent===!1&&y.blending===Os&&y.alphaToCoverage===!1,alphaMap:_e,alphaTest:ne,alphaHash:Y,combine:y.combine,mapUv:Le&&m(y.map.channel),aoMapUv:it&&m(y.aoMap.channel),lightMapUv:ct&&m(y.lightMap.channel),bumpMapUv:Be&&m(y.bumpMap.channel),normalMapUv:Tt&&m(y.normalMap.channel),displacementMapUv:P&&m(y.displacementMap.channel),emissiveMapUv:Ct&&m(y.emissiveMap.channel),metalnessMapUv:tt&&m(y.metalnessMap.channel),roughnessMapUv:ft&&m(y.roughnessMap.channel),anisotropyMapUv:$&&m(y.anisotropyMap.channel),clearcoatMapUv:ve&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:le&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:te&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:se&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(y.sheenRoughnessMap.channel),specularMapUv:Se&&m(y.specularMap.channel),specularColorMapUv:pe&&m(y.specularColorMap.channel),specularIntensityMapUv:ze&&m(y.specularIntensityMap.channel),transmissionMapUv:L&&m(y.transmissionMap.channel),thicknessMapUv:ce&&m(y.thicknessMap.channel),alphaMapUv:_e&&m(y.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Tt||Ee),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&(Le||_e),fog:!!k,useFog:y.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||W.attributes.normal===void 0&&Tt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:a,reversedDepthBuffer:ue,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:re,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:De,decodeVideoTexture:Le&&y.map.isVideoTexture===!0&&Ke.getTransfer(y.map.colorSpace)===st,decodeVideoTextureEmissive:Ct&&y.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(y.emissiveMap.colorSpace)===st,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===hi,flipSided:y.side===xn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ye&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&y.extensions.multiDraw===!0||Re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return dt.vertexUv1s=u.has(1),dt.vertexUv2s=u.has(2),dt.vertexUv3s=u.has(3),u.clear(),dt}function p(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)E.push(I),E.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(f(E,y),g(E,y),E.push(n.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function f(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function g(y,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),y.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),y.push(o.mask)}function v(y){const E=h[y.type];let I;if(E){const C=fi[E];I=sE.clone(C.uniforms)}else I=y.uniforms;return I}function S(y,E){let I=_.get(E);return I!==void 0?++I.usedTimes:(I=new FA(n,E,y,r),d.push(I),_.set(E,I)),I}function A(y){if(--y.usedTimes===0){const E=d.indexOf(y);d[E]=d[d.length-1],d.pop(),_.delete(y.cacheKey),y.destroy()}}function T(y){c.remove(y)}function b(){c.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:v,acquireProgram:S,releaseProgram:A,releaseShaderCache:T,programs:d,dispose:b}}function VA(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let c=n.get(o);return c===void 0&&(c={},n.set(o,c)),c}function i(o){n.delete(o)}function r(o,c,u){n.get(o)[c]=u}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function HA(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function fg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function dg(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(l){let h=0;return l.isInstancedMesh&&(h+=2),l.isSkinnedMesh&&(h+=1),h}function c(l,h,m,x,p,f){let g=n[e];return g===void 0?(g={id:l.id,object:l,geometry:h,material:m,materialVariant:o(l),groupOrder:x,renderOrder:l.renderOrder,z:p,group:f},n[e]=g):(g.id=l.id,g.object=l,g.geometry=h,g.material=m,g.materialVariant=o(l),g.groupOrder=x,g.renderOrder=l.renderOrder,g.z=p,g.group=f),e++,g}function u(l,h,m,x,p,f){const g=c(l,h,m,x,p,f);m.transmission>0?i.push(g):m.transparent===!0?r.push(g):t.push(g)}function d(l,h,m,x,p,f){const g=c(l,h,m,x,p,f);m.transmission>0?i.unshift(g):m.transparent===!0?r.unshift(g):t.unshift(g)}function _(l,h){t.length>1&&t.sort(l||HA),i.length>1&&i.sort(h||fg),r.length>1&&r.sort(h||fg)}function a(){for(let l=e,h=n.length;l<h;l++){const m=n[l];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:u,unshift:d,finish:a,sort:_}}function GA(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new dg,n.set(i,[o])):r>=s.length?(o=new dg,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function WA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new je};break;case"SpotLight":t={position:new F,direction:new F,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function XA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let jA=0;function qA(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function YA(n){const e=new WA,t=XA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new F);const r=new F,s=new wt,o=new wt;function c(d){let _=0,a=0,l=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let h=0,m=0,x=0,p=0,f=0,g=0,v=0,S=0,A=0,T=0,b=0;d.sort(qA);for(let E=0,I=d.length;E<I;E++){const C=d[E],U=C.color,k=C.intensity,W=C.distance;let B=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Ys?B=C.shadow.map.texture:B=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)_+=U.r*k,a+=U.g*k,l+=U.b*k;else if(C.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(C.sh.coefficients[G],k);b++}else if(C.isDirectionalLight){const G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const O=C.shadow,V=t.get(C);V.shadowIntensity=O.intensity,V.shadowBias=O.bias,V.shadowNormalBias=O.normalBias,V.shadowRadius=O.radius,V.shadowMapSize=O.mapSize,i.directionalShadow[h]=V,i.directionalShadowMap[h]=B,i.directionalShadowMatrix[h]=C.shadow.matrix,g++}i.directional[h]=G,h++}else if(C.isSpotLight){const G=e.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(U).multiplyScalar(k),G.distance=W,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,i.spot[x]=G;const O=C.shadow;if(C.map&&(i.spotLightMap[A]=C.map,A++,O.updateMatrices(C),C.castShadow&&T++),i.spotLightMatrix[x]=O.matrix,C.castShadow){const V=t.get(C);V.shadowIntensity=O.intensity,V.shadowBias=O.bias,V.shadowNormalBias=O.normalBias,V.shadowRadius=O.radius,V.shadowMapSize=O.mapSize,i.spotShadow[x]=V,i.spotShadowMap[x]=B,S++}x++}else if(C.isRectAreaLight){const G=e.get(C);G.color.copy(U).multiplyScalar(k),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),i.rectArea[p]=G,p++}else if(C.isPointLight){const G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){const O=C.shadow,V=t.get(C);V.shadowIntensity=O.intensity,V.shadowBias=O.bias,V.shadowNormalBias=O.normalBias,V.shadowRadius=O.radius,V.shadowMapSize=O.mapSize,V.shadowCameraNear=O.camera.near,V.shadowCameraFar=O.camera.far,i.pointShadow[m]=V,i.pointShadowMap[m]=B,i.pointShadowMatrix[m]=C.shadow.matrix,v++}i.point[m]=G,m++}else if(C.isHemisphereLight){const G=e.get(C);G.skyColor.copy(C.color).multiplyScalar(k),G.groundColor.copy(C.groundColor).multiplyScalar(k),i.hemi[f]=G,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=_,i.ambient[1]=a,i.ambient[2]=l;const y=i.hash;(y.directionalLength!==h||y.pointLength!==m||y.spotLength!==x||y.rectAreaLength!==p||y.hemiLength!==f||y.numDirectionalShadows!==g||y.numPointShadows!==v||y.numSpotShadows!==S||y.numSpotMaps!==A||y.numLightProbes!==b)&&(i.directional.length=h,i.spot.length=x,i.rectArea.length=p,i.point.length=m,i.hemi.length=f,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+A-T,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=b,y.directionalLength=h,y.pointLength=m,y.spotLength=x,y.rectAreaLength=p,y.hemiLength=f,y.numDirectionalShadows=g,y.numPointShadows=v,y.numSpotShadows=S,y.numSpotMaps=A,y.numLightProbes=b,i.version=jA++)}function u(d,_){let a=0,l=0,h=0,m=0,x=0;const p=_.matrixWorldInverse;for(let f=0,g=d.length;f<g;f++){const v=d[f];if(v.isDirectionalLight){const S=i.directional[a];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),a++}else if(v.isSpotLight){const S=i.spot[h];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),h++}else if(v.isRectAreaLight){const S=i.rectArea[m];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),o.identity(),s.copy(v.matrixWorld),s.premultiply(p),o.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){const S=i.point[l];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),l++}else if(v.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),x++}}}return{setup:c,setupView:u,state:i}}function hg(n){const e=new YA(n),t=[],i=[];function r(_){d.camera=_,t.length=0,i.length=0}function s(_){t.push(_)}function o(_){i.push(_)}function c(){e.setup(t)}function u(_){e.setupView(t,_)}const d={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:s,pushShadow:o}}function $A(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let c;return o===void 0?(c=new hg(n),e.set(r,[c])):s>=o.length?(c=new hg(n),o.push(c)):c=o[s],c}function i(){e=new WeakMap}return{get:t,dispose:i}}const KA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,JA=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],QA=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],pg=new wt,Mo=new F,ku=new F;function eb(n,e,t){let i=new Wh;const r=new qe,s=new qe,o=new Et,c=new cE,u=new uE,d={},_=t.maxTextureSize,a={[Er]:xn,[xn]:Er,[hi]:hi},l=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:KA,fragmentShader:ZA}),h=l.clone();h.defines.HORIZONTAL_PASS=1;const m=new Gn;m.setAttribute("position",new Si(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new $e(m,l),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wl;let f=this.type;this.render=function(T,b,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===G0&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=wl);const E=n.getRenderTarget(),I=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),U=n.state;U.setBlending(zi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const k=f!==this.type;k&&b.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(B=>B.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,B=T.length;W<B;W++){const G=T[W],O=G.shadow;if(O===void 0){Ie("WebGLShadowMap:",G,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const V=O.getFrameExtents();r.multiply(V),s.copy(O.mapSize),(r.x>_||r.y>_)&&(r.x>_&&(s.x=Math.floor(_/V.x),r.x=s.x*V.x,O.mapSize.x=s.x),r.y>_&&(s.y=Math.floor(_/V.y),r.y=s.y*V.y,O.mapSize.y=s.y));const q=n.state.buffers.depth.getReversed();if(O.camera._reversedDepth=q,O.map===null||k===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Co){if(G.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new yi(r.x,r.y,{format:Ys,type:ji,minFilter:nn,magFilter:nn,generateMipmaps:!1}),O.map.texture.name=G.name+".shadowMap",O.map.depthTexture=new la(r.x,r.y,pi),O.map.depthTexture.name=G.name+".shadowMapDepth",O.map.depthTexture.format=qi,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=qt,O.map.depthTexture.magFilter=qt}else G.isPointLight?(O.map=new gv(r.x),O.map.depthTexture=new iE(r.x,Ei)):(O.map=new yi(r.x,r.y),O.map.depthTexture=new la(r.x,r.y,Ei)),O.map.depthTexture.name=G.name+".shadowMap",O.map.depthTexture.format=qi,this.type===wl?(O.map.depthTexture.compareFunction=q?zh:Bh,O.map.depthTexture.minFilter=nn,O.map.depthTexture.magFilter=nn):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=qt,O.map.depthTexture.magFilter=qt);O.camera.updateProjectionMatrix()}const J=O.map.isWebGLCubeRenderTarget?6:1;for(let ae=0;ae<J;ae++){if(O.map.isWebGLCubeRenderTarget)n.setRenderTarget(O.map,ae),n.clear();else{ae===0&&(n.setRenderTarget(O.map),n.clear());const re=O.getViewport(ae);o.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),U.viewport(o)}if(G.isPointLight){const re=O.camera,Pe=O.matrix,Je=G.distance||re.far;Je!==re.far&&(re.far=Je,re.updateProjectionMatrix()),Mo.setFromMatrixPosition(G.matrixWorld),re.position.copy(Mo),ku.copy(re.position),ku.add(JA[ae]),re.up.copy(QA[ae]),re.lookAt(ku),re.updateMatrixWorld(),Pe.makeTranslation(-Mo.x,-Mo.y,-Mo.z),pg.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),O._frustum.setFromProjectionMatrix(pg,re.coordinateSystem,re.reversedDepth)}else O.updateMatrices(G);i=O.getFrustum(),S(b,y,O.camera,G,this.type)}O.isPointLightShadow!==!0&&this.type===Co&&g(O,y),O.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(E,I,C)};function g(T,b){const y=e.update(x);l.defines.VSM_SAMPLES!==T.blurSamples&&(l.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,l.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new yi(r.x,r.y,{format:Ys,type:ji})),l.uniforms.shadow_pass.value=T.map.depthTexture,l.uniforms.resolution.value=T.mapSize,l.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(b,null,y,l,x,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(b,null,y,h,x,null)}function v(T,b,y,E){let I=null;const C=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)I=C;else if(I=y.isPointLight===!0?u:c,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const U=I.uuid,k=b.uuid;let W=d[U];W===void 0&&(W={},d[U]=W);let B=W[k];B===void 0&&(B=I.clone(),W[k]=B,b.addEventListener("dispose",A)),I=B}if(I.visible=b.visible,I.wireframe=b.wireframe,E===Co?I.side=b.shadowSide!==null?b.shadowSide:b.side:I.side=b.shadowSide!==null?b.shadowSide:a[b.side],I.alphaMap=b.alphaMap,I.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,I.map=b.map,I.clipShadows=b.clipShadows,I.clippingPlanes=b.clippingPlanes,I.clipIntersection=b.clipIntersection,I.displacementMap=b.displacementMap,I.displacementScale=b.displacementScale,I.displacementBias=b.displacementBias,I.wireframeLinewidth=b.wireframeLinewidth,I.linewidth=b.linewidth,y.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const U=n.properties.get(I);U.light=y}return I}function S(T,b,y,E,I){if(T.visible===!1)return;if(T.layers.test(b.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&I===Co)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);const k=e.update(T),W=T.material;if(Array.isArray(W)){const B=k.groups;for(let G=0,O=B.length;G<O;G++){const V=B[G],q=W[V.materialIndex];if(q&&q.visible){const J=v(T,q,E,I);T.onBeforeShadow(n,T,b,y,k,J,V),n.renderBufferDirect(y,null,k,J,T,V),T.onAfterShadow(n,T,b,y,k,J,V)}}}else if(W.visible){const B=v(T,W,E,I);T.onBeforeShadow(n,T,b,y,k,B,null),n.renderBufferDirect(y,null,k,B,T,null),T.onAfterShadow(n,T,b,y,k,B,null)}}const U=T.children;for(let k=0,W=U.length;k<W;k++)S(U[k],b,y,E,I)}function A(T){T.target.removeEventListener("dispose",A);for(const y in d){const E=d[y],I=T.target.uuid;I in E&&(E[I].dispose(),delete E[I])}}}function tb(n,e){function t(){let L=!1;const ce=new Et;let oe=null;const _e=new Et(0,0,0,0);return{setMask:function(ne){oe!==ne&&!L&&(n.colorMask(ne,ne,ne,ne),oe=ne)},setLocked:function(ne){L=ne},setClear:function(ne,Y,ye,De,dt){dt===!0&&(ne*=De,Y*=De,ye*=De),ce.set(ne,Y,ye,De),_e.equals(ce)===!1&&(n.clearColor(ne,Y,ye,De),_e.copy(ce))},reset:function(){L=!1,oe=null,_e.set(-1,0,0,0)}}}function i(){let L=!1,ce=!1,oe=null,_e=null,ne=null;return{setReversed:function(Y){if(ce!==Y){const ye=e.get("EXT_clip_control");Y?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),ce=Y;const De=ne;ne=null,this.setClear(De)}},getReversed:function(){return ce},setTest:function(Y){Y?ie(n.DEPTH_TEST):ue(n.DEPTH_TEST)},setMask:function(Y){oe!==Y&&!L&&(n.depthMask(Y),oe=Y)},setFunc:function(Y){if(ce&&(Y=LM[Y]),_e!==Y){switch(Y){case Hf:n.depthFunc(n.NEVER);break;case Gf:n.depthFunc(n.ALWAYS);break;case Wf:n.depthFunc(n.LESS);break;case js:n.depthFunc(n.LEQUAL);break;case Xf:n.depthFunc(n.EQUAL);break;case jf:n.depthFunc(n.GEQUAL);break;case qf:n.depthFunc(n.GREATER);break;case Yf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=Y}},setLocked:function(Y){L=Y},setClear:function(Y){ne!==Y&&(ne=Y,ce&&(Y=1-Y),n.clearDepth(Y))},reset:function(){L=!1,oe=null,_e=null,ne=null,ce=!1}}}function r(){let L=!1,ce=null,oe=null,_e=null,ne=null,Y=null,ye=null,De=null,dt=null;return{setTest:function(rt){L||(rt?ie(n.STENCIL_TEST):ue(n.STENCIL_TEST))},setMask:function(rt){ce!==rt&&!L&&(n.stencilMask(rt),ce=rt)},setFunc:function(rt,Ti,Ai){(oe!==rt||_e!==Ti||ne!==Ai)&&(n.stencilFunc(rt,Ti,Ai),oe=rt,_e=Ti,ne=Ai)},setOp:function(rt,Ti,Ai){(Y!==rt||ye!==Ti||De!==Ai)&&(n.stencilOp(rt,Ti,Ai),Y=rt,ye=Ti,De=Ai)},setLocked:function(rt){L=rt},setClear:function(rt){dt!==rt&&(n.clearStencil(rt),dt=rt)},reset:function(){L=!1,ce=null,oe=null,_e=null,ne=null,Y=null,ye=null,De=null,dt=null}}}const s=new t,o=new i,c=new r,u=new WeakMap,d=new WeakMap;let _={},a={},l=new WeakMap,h=[],m=null,x=!1,p=null,f=null,g=null,v=null,S=null,A=null,T=null,b=new je(0,0,0),y=0,E=!1,I=null,C=null,U=null,k=null,W=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,O=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=O>=1):V.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=O>=2);let q=null,J={};const ae=n.getParameter(n.SCISSOR_BOX),re=n.getParameter(n.VIEWPORT),Pe=new Et().fromArray(ae),Je=new Et().fromArray(re);function nt(L,ce,oe,_e){const ne=new Uint8Array(4),Y=n.createTexture();n.bindTexture(L,Y),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ye=0;ye<oe;ye++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,ne):n.texImage2D(ce+ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ne);return Y}const K={};K[n.TEXTURE_2D]=nt(n.TEXTURE_2D,n.TEXTURE_2D,1),K[n.TEXTURE_CUBE_MAP]=nt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[n.TEXTURE_2D_ARRAY]=nt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),K[n.TEXTURE_3D]=nt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),c.setClear(0),ie(n.DEPTH_TEST),o.setFunc(js),Be(!1),Tt(vm),ie(n.CULL_FACE),it(zi);function ie(L){_[L]!==!0&&(n.enable(L),_[L]=!0)}function ue(L){_[L]!==!1&&(n.disable(L),_[L]=!1)}function Fe(L,ce){return a[L]!==ce?(n.bindFramebuffer(L,ce),a[L]=ce,L===n.DRAW_FRAMEBUFFER&&(a[n.FRAMEBUFFER]=ce),L===n.FRAMEBUFFER&&(a[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function Re(L,ce){let oe=h,_e=!1;if(L){oe=l.get(ce),oe===void 0&&(oe=[],l.set(ce,oe));const ne=L.textures;if(oe.length!==ne.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let Y=0,ye=ne.length;Y<ye;Y++)oe[Y]=n.COLOR_ATTACHMENT0+Y;oe.length=ne.length,_e=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,_e=!0);_e&&n.drawBuffers(oe)}function Le(L){return m!==L?(n.useProgram(L),m=L,!0):!1}const kt={[kr]:n.FUNC_ADD,[eM]:n.FUNC_SUBTRACT,[tM]:n.FUNC_REVERSE_SUBTRACT};kt[nM]=n.MIN,kt[iM]=n.MAX;const Ye={[rM]:n.ZERO,[sM]:n.ONE,[oM]:n.SRC_COLOR,[zf]:n.SRC_ALPHA,[dM]:n.SRC_ALPHA_SATURATE,[uM]:n.DST_COLOR,[lM]:n.DST_ALPHA,[aM]:n.ONE_MINUS_SRC_COLOR,[Vf]:n.ONE_MINUS_SRC_ALPHA,[fM]:n.ONE_MINUS_DST_COLOR,[cM]:n.ONE_MINUS_DST_ALPHA,[hM]:n.CONSTANT_COLOR,[pM]:n.ONE_MINUS_CONSTANT_COLOR,[mM]:n.CONSTANT_ALPHA,[gM]:n.ONE_MINUS_CONSTANT_ALPHA};function it(L,ce,oe,_e,ne,Y,ye,De,dt,rt){if(L===zi){x===!0&&(ue(n.BLEND),x=!1);return}if(x===!1&&(ie(n.BLEND),x=!0),L!==QS){if(L!==p||rt!==E){if((f!==kr||S!==kr)&&(n.blendEquation(n.FUNC_ADD),f=kr,S=kr),rt)switch(L){case Os:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xm:n.blendFunc(n.ONE,n.ONE);break;case ym:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sm:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",L);break}else switch(L){case Os:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case xm:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ym:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sm:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",L);break}g=null,v=null,A=null,T=null,b.set(0,0,0),y=0,p=L,E=rt}return}ne=ne||ce,Y=Y||oe,ye=ye||_e,(ce!==f||ne!==S)&&(n.blendEquationSeparate(kt[ce],kt[ne]),f=ce,S=ne),(oe!==g||_e!==v||Y!==A||ye!==T)&&(n.blendFuncSeparate(Ye[oe],Ye[_e],Ye[Y],Ye[ye]),g=oe,v=_e,A=Y,T=ye),(De.equals(b)===!1||dt!==y)&&(n.blendColor(De.r,De.g,De.b,dt),b.copy(De),y=dt),p=L,E=!1}function ct(L,ce){L.side===hi?ue(n.CULL_FACE):ie(n.CULL_FACE);let oe=L.side===xn;ce&&(oe=!oe),Be(oe),L.blending===Os&&L.transparent===!1?it(zi):it(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const _e=L.stencilWrite;c.setTest(_e),_e&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ct(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(L){I!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),I=L)}function Tt(L){L!==ZS?(ie(n.CULL_FACE),L!==C&&(L===vm?n.cullFace(n.BACK):L===JS?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ue(n.CULL_FACE),C=L}function P(L){L!==U&&(G&&n.lineWidth(L),U=L)}function Ct(L,ce,oe){L?(ie(n.POLYGON_OFFSET_FILL),(k!==ce||W!==oe)&&(k=ce,W=oe,o.getReversed()&&(ce=-ce),n.polygonOffset(ce,oe))):ue(n.POLYGON_OFFSET_FILL)}function tt(L){L?ie(n.SCISSOR_TEST):ue(n.SCISSOR_TEST)}function ft(L){L===void 0&&(L=n.TEXTURE0+B-1),q!==L&&(n.activeTexture(L),q=L)}function Ee(L,ce,oe){oe===void 0&&(q===null?oe=n.TEXTURE0+B-1:oe=q);let _e=J[oe];_e===void 0&&(_e={type:void 0,texture:void 0},J[oe]=_e),(_e.type!==L||_e.texture!==ce)&&(q!==oe&&(n.activeTexture(oe),q=oe),n.bindTexture(L,ce||K[L]),_e.type=L,_e.texture=ce)}function R(){const L=J[q];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function M(){try{n.compressedTexImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function D(){try{n.compressedTexImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function Z(){try{n.texSubImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function Q(){try{n.texSubImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function ve(){try{n.compressedTexSubImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function le(){try{n.texStorage2D(...arguments)}catch(L){et("WebGLState:",L)}}function be(){try{n.texStorage3D(...arguments)}catch(L){et("WebGLState:",L)}}function Ce(){try{n.texImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function te(){try{n.texImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function se(L){Pe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Pe.copy(L))}function xe(L){Je.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Je.copy(L))}function Se(L,ce){let oe=d.get(ce);oe===void 0&&(oe=new WeakMap,d.set(ce,oe));let _e=oe.get(L);_e===void 0&&(_e=n.getUniformBlockIndex(ce,L.name),oe.set(L,_e))}function pe(L,ce){const _e=d.get(ce).get(L);u.get(ce)!==_e&&(n.uniformBlockBinding(ce,_e,L.__bindingPointIndex),u.set(ce,_e))}function ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),_={},q=null,J={},a={},l=new WeakMap,h=[],m=null,x=!1,p=null,f=null,g=null,v=null,S=null,A=null,T=null,b=new je(0,0,0),y=0,E=!1,I=null,C=null,U=null,k=null,W=null,Pe.set(0,0,n.canvas.width,n.canvas.height),Je.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),c.reset()}return{buffers:{color:s,depth:o,stencil:c},enable:ie,disable:ue,bindFramebuffer:Fe,drawBuffers:Re,useProgram:Le,setBlending:it,setMaterial:ct,setFlipSided:Be,setCullFace:Tt,setLineWidth:P,setPolygonOffset:Ct,setScissorTest:tt,activeTexture:ft,bindTexture:Ee,unbindTexture:R,compressedTexImage2D:M,compressedTexImage3D:D,texImage2D:Ce,texImage3D:te,updateUBOMapping:Se,uniformBlockBinding:pe,texStorage2D:le,texStorage3D:be,texSubImage2D:Z,texSubImage3D:Q,compressedTexSubImage2D:$,compressedTexSubImage3D:ve,scissor:se,viewport:xe,reset:ze}}function nb(n,e,t,i,r,s,o){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new qe,_=new WeakMap;let a;const l=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,M){return h?new OffscreenCanvas(R,M):tc("canvas")}function x(R,M,D){let Z=1;const Q=Ee(R);if((Q.width>D||Q.height>D)&&(Z=D/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const $=Math.floor(Z*Q.width),ve=Math.floor(Z*Q.height);a===void 0&&(a=m($,ve));const le=M?m($,ve):a;return le.width=$,le.height=ve,le.getContext("2d").drawImage(R,0,0,$,ve),Ie("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+ve+")."),le}else return"data"in R&&Ie("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function p(R){return R.generateMipmaps}function f(R){n.generateMipmap(R)}function g(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(R,M,D,Z,Q=!1){if(R!==null){if(n[R]!==void 0)return n[R];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let $=M;if(M===n.RED&&(D===n.FLOAT&&($=n.R32F),D===n.HALF_FLOAT&&($=n.R16F),D===n.UNSIGNED_BYTE&&($=n.R8)),M===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&($=n.R8UI),D===n.UNSIGNED_SHORT&&($=n.R16UI),D===n.UNSIGNED_INT&&($=n.R32UI),D===n.BYTE&&($=n.R8I),D===n.SHORT&&($=n.R16I),D===n.INT&&($=n.R32I)),M===n.RG&&(D===n.FLOAT&&($=n.RG32F),D===n.HALF_FLOAT&&($=n.RG16F),D===n.UNSIGNED_BYTE&&($=n.RG8)),M===n.RG_INTEGER&&(D===n.UNSIGNED_BYTE&&($=n.RG8UI),D===n.UNSIGNED_SHORT&&($=n.RG16UI),D===n.UNSIGNED_INT&&($=n.RG32UI),D===n.BYTE&&($=n.RG8I),D===n.SHORT&&($=n.RG16I),D===n.INT&&($=n.RG32I)),M===n.RGB_INTEGER&&(D===n.UNSIGNED_BYTE&&($=n.RGB8UI),D===n.UNSIGNED_SHORT&&($=n.RGB16UI),D===n.UNSIGNED_INT&&($=n.RGB32UI),D===n.BYTE&&($=n.RGB8I),D===n.SHORT&&($=n.RGB16I),D===n.INT&&($=n.RGB32I)),M===n.RGBA_INTEGER&&(D===n.UNSIGNED_BYTE&&($=n.RGBA8UI),D===n.UNSIGNED_SHORT&&($=n.RGBA16UI),D===n.UNSIGNED_INT&&($=n.RGBA32UI),D===n.BYTE&&($=n.RGBA8I),D===n.SHORT&&($=n.RGBA16I),D===n.INT&&($=n.RGBA32I)),M===n.RGB&&(D===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),D===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),M===n.RGBA){const ve=Q?ec:Ke.getTransfer(Z);D===n.FLOAT&&($=n.RGBA32F),D===n.HALF_FLOAT&&($=n.RGBA16F),D===n.UNSIGNED_BYTE&&($=ve===st?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function S(R,M){let D;return R?M===null||M===Ei||M===oa?D=n.DEPTH24_STENCIL8:M===pi?D=n.DEPTH32F_STENCIL8:M===sa&&(D=n.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ei||M===oa?D=n.DEPTH_COMPONENT24:M===pi?D=n.DEPTH_COMPONENT32F:M===sa&&(D=n.DEPTH_COMPONENT16),D}function A(R,M){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==qt&&R.minFilter!==nn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function T(R){const M=R.target;M.removeEventListener("dispose",T),y(M),M.isVideoTexture&&_.delete(M)}function b(R){const M=R.target;M.removeEventListener("dispose",b),I(M)}function y(R){const M=i.get(R);if(M.__webglInit===void 0)return;const D=R.source,Z=l.get(D);if(Z){const Q=Z[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(R),Object.keys(Z).length===0&&l.delete(D)}i.remove(R)}function E(R){const M=i.get(R);n.deleteTexture(M.__webglTexture);const D=R.source,Z=l.get(D);delete Z[M.__cacheKey],o.memory.textures--}function I(R){const M=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let Q=0;Q<M.__webglFramebuffer[Z].length;Q++)n.deleteFramebuffer(M.__webglFramebuffer[Z][Q]);else n.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[Z]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const D=R.textures;for(let Z=0,Q=D.length;Z<Q;Z++){const $=i.get(D[Z]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(D[Z])}i.remove(R)}let C=0;function U(){C=0}function k(){const R=C;return R>=r.maxTextures&&Ie("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),C+=1,R}function W(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function B(R,M){const D=i.get(R);if(R.isVideoTexture&&tt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&D.__version!==R.version){const Z=R.image;if(Z===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{K(D,R,M);return}}else R.isExternalTexture&&(D.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+M)}function G(R,M){const D=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&D.__version!==R.version){K(D,R,M);return}else R.isExternalTexture&&(D.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+M)}function O(R,M){const D=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&D.__version!==R.version){K(D,R,M);return}t.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+M)}function V(R,M){const D=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&D.__version!==R.version){ie(D,R,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+M)}const q={[$f]:n.REPEAT,[ki]:n.CLAMP_TO_EDGE,[Kf]:n.MIRRORED_REPEAT},J={[qt]:n.NEAREST,[xM]:n.NEAREST_MIPMAP_NEAREST,[Ba]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[ou]:n.LINEAR_MIPMAP_NEAREST,[Gr]:n.LINEAR_MIPMAP_LINEAR},ae={[MM]:n.NEVER,[bM]:n.ALWAYS,[EM]:n.LESS,[Bh]:n.LEQUAL,[wM]:n.EQUAL,[zh]:n.GEQUAL,[TM]:n.GREATER,[AM]:n.NOTEQUAL};function re(R,M){if(M.type===pi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===nn||M.magFilter===ou||M.magFilter===Ba||M.magFilter===Gr||M.minFilter===nn||M.minFilter===ou||M.minFilter===Ba||M.minFilter===Gr)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,q[M.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,q[M.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,q[M.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,J[M.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,J[M.minFilter]),M.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ae[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===qt||M.minFilter!==Ba&&M.minFilter!==Gr||M.type===pi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");n.texParameterf(R,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Pe(R,M){let D=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",T));const Z=M.source;let Q=l.get(Z);Q===void 0&&(Q={},l.set(Z,Q));const $=W(M);if($!==R.__cacheKey){Q[$]===void 0&&(Q[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,D=!0),Q[$].usedTimes++;const ve=Q[R.__cacheKey];ve!==void 0&&(Q[R.__cacheKey].usedTimes--,ve.usedTimes===0&&E(M)),R.__cacheKey=$,R.__webglTexture=Q[$].texture}return D}function Je(R,M,D){return Math.floor(Math.floor(R/D)/M)}function nt(R,M,D,Z){const $=R.updateRanges;if($.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,D,Z,M.data);else{$.sort((te,se)=>te.start-se.start);let ve=0;for(let te=1;te<$.length;te++){const se=$[ve],xe=$[te],Se=se.start+se.count,pe=Je(xe.start,M.width,4),ze=Je(se.start,M.width,4);xe.start<=Se+1&&pe===ze&&Je(xe.start+xe.count-1,M.width,4)===pe?se.count=Math.max(se.count,xe.start+xe.count-se.start):(++ve,$[ve]=xe)}$.length=ve+1;const le=n.getParameter(n.UNPACK_ROW_LENGTH),be=n.getParameter(n.UNPACK_SKIP_PIXELS),Ce=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let te=0,se=$.length;te<se;te++){const xe=$[te],Se=Math.floor(xe.start/4),pe=Math.ceil(xe.count/4),ze=Se%M.width,L=Math.floor(Se/M.width),ce=pe,oe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,ze,L,ce,oe,D,Z,M.data)}R.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,le),n.pixelStorei(n.UNPACK_SKIP_PIXELS,be),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ce)}}function K(R,M,D){let Z=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=n.TEXTURE_3D);const Q=Pe(R,M),$=M.source;t.bindTexture(Z,R.__webglTexture,n.TEXTURE0+D);const ve=i.get($);if($.version!==ve.__version||Q===!0){t.activeTexture(n.TEXTURE0+D);const le=Ke.getPrimaries(Ke.workingColorSpace),be=M.colorSpace===lr?null:Ke.getPrimaries(M.colorSpace),Ce=M.colorSpace===lr||le===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let te=x(M.image,!1,r.maxTextureSize);te=ft(M,te);const se=s.convert(M.format,M.colorSpace),xe=s.convert(M.type);let Se=v(M.internalFormat,se,xe,M.colorSpace,M.isVideoTexture);re(Z,M);let pe;const ze=M.mipmaps,L=M.isVideoTexture!==!0,ce=ve.__version===void 0||Q===!0,oe=$.dataReady,_e=A(M,te);if(M.isDepthTexture)Se=S(M.format===Wr,M.type),ce&&(L?t.texStorage2D(n.TEXTURE_2D,1,Se,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,Se,te.width,te.height,0,se,xe,null));else if(M.isDataTexture)if(ze.length>0){L&&ce&&t.texStorage2D(n.TEXTURE_2D,_e,Se,ze[0].width,ze[0].height);for(let ne=0,Y=ze.length;ne<Y;ne++)pe=ze[ne],L?oe&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,se,xe,pe.data):t.texImage2D(n.TEXTURE_2D,ne,Se,pe.width,pe.height,0,se,xe,pe.data);M.generateMipmaps=!1}else L?(ce&&t.texStorage2D(n.TEXTURE_2D,_e,Se,te.width,te.height),oe&&nt(M,te,se,xe)):t.texImage2D(n.TEXTURE_2D,0,Se,te.width,te.height,0,se,xe,te.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){L&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,Se,ze[0].width,ze[0].height,te.depth);for(let ne=0,Y=ze.length;ne<Y;ne++)if(pe=ze[ne],M.format!==ei)if(se!==null)if(L){if(oe)if(M.layerUpdates.size>0){const ye=Xm(pe.width,pe.height,M.format,M.type);for(const De of M.layerUpdates){const dt=pe.data.subarray(De*ye/pe.data.BYTES_PER_ELEMENT,(De+1)*ye/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,De,pe.width,pe.height,1,se,dt)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,te.depth,se,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,Se,pe.width,pe.height,te.depth,0,pe.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?oe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,te.depth,se,xe,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,Se,pe.width,pe.height,te.depth,0,se,xe,pe.data)}else{L&&ce&&t.texStorage2D(n.TEXTURE_2D,_e,Se,ze[0].width,ze[0].height);for(let ne=0,Y=ze.length;ne<Y;ne++)pe=ze[ne],M.format!==ei?se!==null?L?oe&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,se,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,Se,pe.width,pe.height,0,pe.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?oe&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,se,xe,pe.data):t.texImage2D(n.TEXTURE_2D,ne,Se,pe.width,pe.height,0,se,xe,pe.data)}else if(M.isDataArrayTexture)if(L){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,_e,Se,te.width,te.height,te.depth),oe)if(M.layerUpdates.size>0){const ne=Xm(te.width,te.height,M.format,M.type);for(const Y of M.layerUpdates){const ye=te.data.subarray(Y*ne/te.data.BYTES_PER_ELEMENT,(Y+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Y,te.width,te.height,1,se,xe,ye)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,se,xe,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Se,te.width,te.height,te.depth,0,se,xe,te.data);else if(M.isData3DTexture)L?(ce&&t.texStorage3D(n.TEXTURE_3D,_e,Se,te.width,te.height,te.depth),oe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,se,xe,te.data)):t.texImage3D(n.TEXTURE_3D,0,Se,te.width,te.height,te.depth,0,se,xe,te.data);else if(M.isFramebufferTexture){if(ce)if(L)t.texStorage2D(n.TEXTURE_2D,_e,Se,te.width,te.height);else{let ne=te.width,Y=te.height;for(let ye=0;ye<_e;ye++)t.texImage2D(n.TEXTURE_2D,ye,Se,ne,Y,0,se,xe,null),ne>>=1,Y>>=1}}else if(ze.length>0){if(L&&ce){const ne=Ee(ze[0]);t.texStorage2D(n.TEXTURE_2D,_e,Se,ne.width,ne.height)}for(let ne=0,Y=ze.length;ne<Y;ne++)pe=ze[ne],L?oe&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,se,xe,pe):t.texImage2D(n.TEXTURE_2D,ne,Se,se,xe,pe);M.generateMipmaps=!1}else if(L){if(ce){const ne=Ee(te);t.texStorage2D(n.TEXTURE_2D,_e,Se,ne.width,ne.height)}oe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,se,xe,te)}else t.texImage2D(n.TEXTURE_2D,0,Se,se,xe,te);p(M)&&f(Z),ve.__version=$.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ie(R,M,D){if(M.image.length!==6)return;const Z=Pe(R,M),Q=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+D);const $=i.get(Q);if(Q.version!==$.__version||Z===!0){t.activeTexture(n.TEXTURE0+D);const ve=Ke.getPrimaries(Ke.workingColorSpace),le=M.colorSpace===lr?null:Ke.getPrimaries(M.colorSpace),be=M.colorSpace===lr||ve===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Ce=M.isCompressedTexture||M.image[0].isCompressedTexture,te=M.image[0]&&M.image[0].isDataTexture,se=[];for(let Y=0;Y<6;Y++)!Ce&&!te?se[Y]=x(M.image[Y],!0,r.maxCubemapSize):se[Y]=te?M.image[Y].image:M.image[Y],se[Y]=ft(M,se[Y]);const xe=se[0],Se=s.convert(M.format,M.colorSpace),pe=s.convert(M.type),ze=v(M.internalFormat,Se,pe,M.colorSpace),L=M.isVideoTexture!==!0,ce=$.__version===void 0||Z===!0,oe=Q.dataReady;let _e=A(M,xe);re(n.TEXTURE_CUBE_MAP,M);let ne;if(Ce){L&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,ze,xe.width,xe.height);for(let Y=0;Y<6;Y++){ne=se[Y].mipmaps;for(let ye=0;ye<ne.length;ye++){const De=ne[ye];M.format!==ei?Se!==null?L?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye,0,0,De.width,De.height,Se,De.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye,ze,De.width,De.height,0,De.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye,0,0,De.width,De.height,Se,pe,De.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye,ze,De.width,De.height,0,Se,pe,De.data)}}}else{if(ne=M.mipmaps,L&&ce){ne.length>0&&_e++;const Y=Ee(se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,ze,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(te){L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,se[Y].width,se[Y].height,Se,pe,se[Y].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ze,se[Y].width,se[Y].height,0,Se,pe,se[Y].data);for(let ye=0;ye<ne.length;ye++){const dt=ne[ye].image[Y].image;L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye+1,0,0,dt.width,dt.height,Se,pe,dt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye+1,ze,dt.width,dt.height,0,Se,pe,dt.data)}}else{L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Se,pe,se[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ze,Se,pe,se[Y]);for(let ye=0;ye<ne.length;ye++){const De=ne[ye];L?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye+1,0,0,Se,pe,De.image[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye+1,ze,Se,pe,De.image[Y])}}}p(M)&&f(n.TEXTURE_CUBE_MAP),$.__version=Q.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ue(R,M,D,Z,Q,$){const ve=s.convert(D.format,D.colorSpace),le=s.convert(D.type),be=v(D.internalFormat,ve,le,D.colorSpace),Ce=i.get(M),te=i.get(D);if(te.__renderTarget=M,!Ce.__hasExternalTextures){const se=Math.max(1,M.width>>$),xe=Math.max(1,M.height>>$);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,$,be,se,xe,M.depth,0,ve,le,null):t.texImage2D(Q,$,be,se,xe,0,ve,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ct(M)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Q,te.__webglTexture,0,P(M)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,Q,te.__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(R,M,D){if(n.bindRenderbuffer(n.RENDERBUFFER,R),M.depthBuffer){const Z=M.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,$=S(M.stencilBuffer,Q),ve=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ct(M)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(M),$,M.width,M.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(M),$,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,$,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,R)}else{const Z=M.textures;for(let Q=0;Q<Z.length;Q++){const $=Z[Q],ve=s.convert($.format,$.colorSpace),le=s.convert($.type),be=v($.internalFormat,ve,le,$.colorSpace);Ct(M)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(M),be,M.width,M.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(M),be,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,be,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Re(R,M,D){const Z=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(M.depthTexture);if(Q.__renderTarget=M,(!Q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Z){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,M.depthTexture.addEventListener("dispose",T)),Q.__webglTexture===void 0){Q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),re(n.TEXTURE_CUBE_MAP,M.depthTexture);const Ce=s.convert(M.depthTexture.format),te=s.convert(M.depthTexture.type);let se;M.depthTexture.format===qi?se=n.DEPTH_COMPONENT24:M.depthTexture.format===Wr&&(se=n.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,se,M.width,M.height,0,Ce,te,null)}}else B(M.depthTexture,0);const $=Q.__webglTexture,ve=P(M),le=Z?n.TEXTURE_CUBE_MAP_POSITIVE_X+D:n.TEXTURE_2D,be=M.depthTexture.format===Wr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(M.depthTexture.format===qi)Ct(M)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,be,le,$,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,be,le,$,0);else if(M.depthTexture.format===Wr)Ct(M)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,be,le,$,0,ve):n.framebufferTexture2D(n.FRAMEBUFFER,be,le,$,0);else throw new Error("Unknown depthTexture format")}function Le(R){const M=i.get(R),D=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const Z=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=Z}if(R.depthTexture&&!M.__autoAllocateDepthBuffer)if(D)for(let Z=0;Z<6;Z++)Re(M.__webglFramebuffer[Z],R,Z);else{const Z=R.texture.mipmaps;Z&&Z.length>0?Re(M.__webglFramebuffer[0],R,0):Re(M.__webglFramebuffer,R,0)}else if(D){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=n.createRenderbuffer(),Fe(M.__webglDepthbuffer[Z],R,!1);else{const Q=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,$)}}else{const Z=R.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),Fe(M.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,$)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function kt(R,M,D){const Z=i.get(R);M!==void 0&&ue(Z.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&Le(R)}function Ye(R){const M=R.texture,D=i.get(R),Z=i.get(M);R.addEventListener("dispose",b);const Q=R.textures,$=R.isWebGLCubeRenderTarget===!0,ve=Q.length>1;if(ve||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=M.version,o.memory.textures++),$){D.__webglFramebuffer=[];for(let le=0;le<6;le++)if(M.mipmaps&&M.mipmaps.length>0){D.__webglFramebuffer[le]=[];for(let be=0;be<M.mipmaps.length;be++)D.__webglFramebuffer[le][be]=n.createFramebuffer()}else D.__webglFramebuffer[le]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){D.__webglFramebuffer=[];for(let le=0;le<M.mipmaps.length;le++)D.__webglFramebuffer[le]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(ve)for(let le=0,be=Q.length;le<be;le++){const Ce=i.get(Q[le]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&Ct(R)===!1){D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let le=0;le<Q.length;le++){const be=Q[le];D.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[le]);const Ce=s.convert(be.format,be.colorSpace),te=s.convert(be.type),se=v(be.internalFormat,Ce,te,be.colorSpace,R.isXRRenderTarget===!0),xe=P(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,se,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,D.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),Fe(D.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),re(n.TEXTURE_CUBE_MAP,M);for(let le=0;le<6;le++)if(M.mipmaps&&M.mipmaps.length>0)for(let be=0;be<M.mipmaps.length;be++)ue(D.__webglFramebuffer[le][be],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,be);else ue(D.__webglFramebuffer[le],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);p(M)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let le=0,be=Q.length;le<be;le++){const Ce=Q[le],te=i.get(Ce);let se=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(se=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,te.__webglTexture),re(se,Ce),ue(D.__webglFramebuffer,R,Ce,n.COLOR_ATTACHMENT0+le,se,0),p(Ce)&&f(se)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(le=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,Z.__webglTexture),re(le,M),M.mipmaps&&M.mipmaps.length>0)for(let be=0;be<M.mipmaps.length;be++)ue(D.__webglFramebuffer[be],R,M,n.COLOR_ATTACHMENT0,le,be);else ue(D.__webglFramebuffer,R,M,n.COLOR_ATTACHMENT0,le,0);p(M)&&f(le),t.unbindTexture()}R.depthBuffer&&Le(R)}function it(R){const M=R.textures;for(let D=0,Z=M.length;D<Z;D++){const Q=M[D];if(p(Q)){const $=g(R),ve=i.get(Q).__webglTexture;t.bindTexture($,ve),f($),t.unbindTexture()}}}const ct=[],Be=[];function Tt(R){if(R.samples>0){if(Ct(R)===!1){const M=R.textures,D=R.width,Z=R.height;let Q=n.COLOR_BUFFER_BIT;const $=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=i.get(R),le=M.length>1;if(le)for(let Ce=0;Ce<M.length;Ce++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const be=R.texture.mipmaps;be&&be.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let Ce=0;Ce<M.length;Ce++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[Ce]);const te=i.get(M[Ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,te,0)}n.blitFramebuffer(0,0,D,Z,0,0,D,Z,Q,n.NEAREST),u===!0&&(ct.length=0,Be.length=0,ct.push(n.COLOR_ATTACHMENT0+Ce),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ct.push($),Be.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Be)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let Ce=0;Ce<M.length;Ce++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,ve.__webglColorRenderbuffer[Ce]);const te=i.get(M[Ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,te,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&u){const M=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function P(R){return Math.min(r.maxSamples,R.samples)}function Ct(R){const M=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function tt(R){const M=o.render.frame;_.get(R)!==M&&(_.set(R,M),R.update())}function ft(R,M){const D=R.colorSpace,Z=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||D!==$s&&D!==lr&&(Ke.getTransfer(D)===st?(Z!==ei||Q!==bn)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",D)),M}function Ee(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(d.width=R.naturalWidth||R.width,d.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(d.width=R.displayWidth,d.height=R.displayHeight):(d.width=R.width,d.height=R.height),d}this.allocateTextureUnit=k,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=G,this.setTexture3D=O,this.setTextureCube=V,this.rebindTextures=kt,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ib(n,e){function t(i,r=lr){let s;const o=Ke.getTransfer(r);if(i===bn)return n.UNSIGNED_BYTE;if(i===Nh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Uh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Q0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ev)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Z0)return n.BYTE;if(i===J0)return n.SHORT;if(i===sa)return n.UNSIGNED_SHORT;if(i===Dh)return n.INT;if(i===Ei)return n.UNSIGNED_INT;if(i===pi)return n.FLOAT;if(i===ji)return n.HALF_FLOAT;if(i===tv)return n.ALPHA;if(i===nv)return n.RGB;if(i===ei)return n.RGBA;if(i===qi)return n.DEPTH_COMPONENT;if(i===Wr)return n.DEPTH_STENCIL;if(i===iv)return n.RED;if(i===Fh)return n.RED_INTEGER;if(i===Ys)return n.RG;if(i===Oh)return n.RG_INTEGER;if(i===kh)return n.RGBA_INTEGER;if(i===Tl||i===Al||i===bl||i===Rl)if(o===st)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Tl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Tl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Al)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Rl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Zf||i===Jf||i===Qf||i===ed)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Zf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Jf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Qf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ed)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===td||i===nd||i===id||i===rd||i===sd||i===od||i===ad)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===td||i===nd)return o===st?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===id)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===rd)return s.COMPRESSED_R11_EAC;if(i===sd)return s.COMPRESSED_SIGNED_R11_EAC;if(i===od)return s.COMPRESSED_RG11_EAC;if(i===ad)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ld||i===cd||i===ud||i===fd||i===dd||i===hd||i===pd||i===md||i===gd||i===_d||i===vd||i===xd||i===yd||i===Sd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ld)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===cd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ud)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===fd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===dd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===hd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===md)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===gd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_d)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===yd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Sd)return o===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Md||i===Ed||i===wd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Md)return o===st?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ed)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Td||i===Ad||i===bd||i===Rd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Td)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ad)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===bd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===oa?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const rb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ob{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new dv(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new wi({vertexShader:rb,fragmentShader:sb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $e(new Ks(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ab extends no{constructor(e,t){super();const i=this;let r=null,s=1,o=null,c="local-floor",u=1,d=null,_=null,a=null,l=null,h=null,m=null;const x=typeof XRWebGLBinding<"u",p=new ob,f={},g=t.getContextAttributes();let v=null,S=null;const A=[],T=[],b=new qe;let y=null;const E=new pn;E.viewport=new Et;const I=new pn;I.viewport=new Et;const C=[E,I],U=new vE;let k=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ie=A[K];return ie===void 0&&(ie=new pu,A[K]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(K){let ie=A[K];return ie===void 0&&(ie=new pu,A[K]=ie),ie.getGripSpace()},this.getHand=function(K){let ie=A[K];return ie===void 0&&(ie=new pu,A[K]=ie),ie.getHandSpace()};function B(K){const ie=T.indexOf(K.inputSource);if(ie===-1)return;const ue=A[ie];ue!==void 0&&(ue.update(K.inputSource,K.frame,d||o),ue.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",O);for(let K=0;K<A.length;K++){const ie=T[K];ie!==null&&(T[K]=null,A[K].disconnect(ie))}k=null,W=null,p.reset();for(const K in f)delete f[K];e.setRenderTarget(v),h=null,l=null,a=null,r=null,S=null,nt.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){c=K,i.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||o},this.setReferenceSpace=function(K){d=K},this.getBaseLayer=function(){return l!==null?l:h},this.getBinding=function(){return a===null&&x&&(a=new XRWebGLBinding(r,t)),a},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",G),r.addEventListener("inputsourceschange",O),g.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(b),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,Fe=null,Re=null;g.depth&&(Re=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=g.stencil?Wr:qi,Fe=g.stencil?oa:Ei);const Le={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:s};a=this.getBinding(),l=a.createProjectionLayer(Le),r.updateRenderState({layers:[l]}),e.setPixelRatio(1),e.setSize(l.textureWidth,l.textureHeight,!1),S=new yi(l.textureWidth,l.textureHeight,{format:ei,type:bn,depthTexture:new la(l.textureWidth,l.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:l.ignoreDepthValues===!1,resolveStencilBuffer:l.ignoreDepthValues===!1})}else{const ue={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,ue),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new yi(h.framebufferWidth,h.framebufferHeight,{format:ei,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(u),d=null,o=await r.requestReferenceSpace(c),nt.setContext(r),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function O(K){for(let ie=0;ie<K.removed.length;ie++){const ue=K.removed[ie],Fe=T.indexOf(ue);Fe>=0&&(T[Fe]=null,A[Fe].disconnect(ue))}for(let ie=0;ie<K.added.length;ie++){const ue=K.added[ie];let Fe=T.indexOf(ue);if(Fe===-1){for(let Le=0;Le<A.length;Le++)if(Le>=T.length){T.push(ue),Fe=Le;break}else if(T[Le]===null){T[Le]=ue,Fe=Le;break}if(Fe===-1)break}const Re=A[Fe];Re&&Re.connect(ue)}}const V=new F,q=new F;function J(K,ie,ue){V.setFromMatrixPosition(ie.matrixWorld),q.setFromMatrixPosition(ue.matrixWorld);const Fe=V.distanceTo(q),Re=ie.projectionMatrix.elements,Le=ue.projectionMatrix.elements,kt=Re[14]/(Re[10]-1),Ye=Re[14]/(Re[10]+1),it=(Re[9]+1)/Re[5],ct=(Re[9]-1)/Re[5],Be=(Re[8]-1)/Re[0],Tt=(Le[8]+1)/Le[0],P=kt*Be,Ct=kt*Tt,tt=Fe/(-Be+Tt),ft=tt*-Be;if(ie.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ft),K.translateZ(tt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Re[10]===-1)K.projectionMatrix.copy(ie.projectionMatrix),K.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Ee=kt+tt,R=Ye+tt,M=P-ft,D=Ct+(Fe-ft),Z=it*Ye/R*Ee,Q=ct*Ye/R*Ee;K.projectionMatrix.makePerspective(M,D,Z,Q,Ee,R),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ae(K,ie){ie===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ie.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let ie=K.near,ue=K.far;p.texture!==null&&(p.depthNear>0&&(ie=p.depthNear),p.depthFar>0&&(ue=p.depthFar)),U.near=I.near=E.near=ie,U.far=I.far=E.far=ue,(k!==U.near||W!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),k=U.near,W=U.far),U.layers.mask=K.layers.mask|6,E.layers.mask=U.layers.mask&-5,I.layers.mask=U.layers.mask&-3;const Fe=K.parent,Re=U.cameras;ae(U,Fe);for(let Le=0;Le<Re.length;Le++)ae(Re[Le],Fe);Re.length===2?J(U,E,I):U.projectionMatrix.copy(E.projectionMatrix),re(K,U,Fe)};function re(K,ie,ue){ue===null?K.matrix.copy(ie.matrixWorld):(K.matrix.copy(ue.matrixWorld),K.matrix.invert(),K.matrix.multiply(ie.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ie.projectionMatrix),K.projectionMatrixInverse.copy(ie.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ic*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(l===null&&h===null))return u},this.setFoveation=function(K){u=K,l!==null&&(l.fixedFoveation=K),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=K)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(K){return f[K]};let Pe=null;function Je(K,ie){if(_=ie.getViewerPose(d||o),m=ie,_!==null){const ue=_.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let Fe=!1;ue.length!==U.cameras.length&&(U.cameras.length=0,Fe=!0);for(let Ye=0;Ye<ue.length;Ye++){const it=ue[Ye];let ct=null;if(h!==null)ct=h.getViewport(it);else{const Tt=a.getViewSubImage(l,it);ct=Tt.viewport,Ye===0&&(e.setRenderTargetTextures(S,Tt.colorTexture,Tt.depthStencilTexture),e.setRenderTarget(S))}let Be=C[Ye];Be===void 0&&(Be=new pn,Be.layers.enable(Ye),Be.viewport=new Et,C[Ye]=Be),Be.matrix.fromArray(it.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(it.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(ct.x,ct.y,ct.width,ct.height),Ye===0&&(U.matrix.copy(Be.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Fe===!0&&U.cameras.push(Be)}const Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){a=i.getBinding();const Ye=a.getDepthInformation(ue[0]);Ye&&Ye.isValid&&Ye.texture&&p.init(Ye,r.renderState)}if(Re&&Re.includes("camera-access")&&x){e.state.unbindTexture(),a=i.getBinding();for(let Ye=0;Ye<ue.length;Ye++){const it=ue[Ye].camera;if(it){let ct=f[it];ct||(ct=new dv,f[it]=ct);const Be=a.getCameraImage(it);ct.sourceTexture=Be}}}}for(let ue=0;ue<A.length;ue++){const Fe=T[ue],Re=A[ue];Fe!==null&&Re!==void 0&&Re.update(Fe,ie,d||o)}Pe&&Pe(K,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),m=null}const nt=new mv;nt.setAnimationLoop(Je),this.setAnimationLoop=function(K){Pe=K},this.dispose=function(){}}}const Nr=new ri,lb=new wt;function cb(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,hv(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,g,v,S){f.isMeshBasicMaterial?s(p,f):f.isMeshLambertMaterial?(s(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(p,f),a(p,f)):f.isMeshPhongMaterial?(s(p,f),_(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(p,f),l(p,f),f.isMeshPhysicalMaterial&&h(p,f,S)):f.isMeshMatcapMaterial?(s(p,f),m(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),x(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&c(p,f)):f.isPointsMaterial?u(p,f,g,v):f.isSpriteMaterial?d(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===xn&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===xn&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const g=e.get(f),v=g.envMap,S=g.envMapRotation;v&&(p.envMap.value=v,Nr.copy(S),Nr.x*=-1,Nr.y*=-1,Nr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Nr.y*=-1,Nr.z*=-1),p.envMapRotation.value.setFromMatrix4(lb.makeRotationFromEuler(Nr)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function c(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function u(p,f,g,v){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*g,p.scale.value=v*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function d(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function _(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function a(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function l(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function h(p,f,g){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===xn&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=g.texture,p.transmissionSamplerSize.value.set(g.width,g.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,f){f.matcap&&(p.matcap.value=f.matcap)}function x(p,f){const g=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(g.matrixWorld),p.nearDistance.value=g.shadow.camera.near,p.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ub(n,e,t,i){let r={},s={},o=[];const c=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function u(g,v){const S=v.program;i.uniformBlockBinding(g,S)}function d(g,v){let S=r[g.id];S===void 0&&(m(g),S=_(g),r[g.id]=S,g.addEventListener("dispose",p));const A=v.program;i.updateUBOMapping(g,A);const T=e.render.frame;s[g.id]!==T&&(l(g),s[g.id]=T)}function _(g){const v=a();g.__bindingPointIndex=v;const S=n.createBuffer(),A=g.__size,T=g.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,A,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,S),S}function a(){for(let g=0;g<c;g++)if(o.indexOf(g)===-1)return o.push(g),g;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function l(g){const v=r[g.id],S=g.uniforms,A=g.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let T=0,b=S.length;T<b;T++){const y=Array.isArray(S[T])?S[T]:[S[T]];for(let E=0,I=y.length;E<I;E++){const C=y[E];if(h(C,T,E,A)===!0){const U=C.__offset,k=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let B=0;B<k.length;B++){const G=k[B],O=x(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,U+W,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,W),W+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(g,v,S,A){const T=g.value,b=v+"_"+S;if(A[b]===void 0)return typeof T=="number"||typeof T=="boolean"?A[b]=T:A[b]=T.clone(),!0;{const y=A[b];if(typeof T=="number"||typeof T=="boolean"){if(y!==T)return A[b]=T,!0}else if(y.equals(T)===!1)return y.copy(T),!0}return!1}function m(g){const v=g.uniforms;let S=0;const A=16;for(let b=0,y=v.length;b<y;b++){const E=Array.isArray(v[b])?v[b]:[v[b]];for(let I=0,C=E.length;I<C;I++){const U=E[I],k=Array.isArray(U.value)?U.value:[U.value];for(let W=0,B=k.length;W<B;W++){const G=k[W],O=x(G),V=S%A,q=V%O.boundary,J=V+q;S+=q,J!==0&&A-J<O.storage&&(S+=A-J),U.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=S,S+=O.storage}}}const T=S%A;return T>0&&(S+=A-T),g.__size=S,g.__cache={},this}function x(g){const v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ie("WebGLRenderer: Unsupported uniform value type.",g),v}function p(g){const v=g.target;v.removeEventListener("dispose",p);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function f(){for(const g in r)n.deleteBuffer(r[g]);o=[],r={},s={}}return{bind:u,update:d,dispose:f}}const fb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let li=null;function db(){return li===null&&(li=new QM(fb,16,16,Ys,ji),li.name="DFG_LUT",li.minFilter=nn,li.magFilter=nn,li.wrapS=ki,li.wrapT=ki,li.generateMipmaps=!1,li.needsUpdate=!0),li}class hb{constructor(e={}){const{canvas:t=CM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:d=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:a=!1,reversedDepthBuffer:l=!1,outputBufferType:h=bn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const x=h,p=new Set([kh,Oh,Fh]),f=new Set([bn,Ei,sa,oa,Nh,Uh]),g=new Uint32Array(4),v=new Int32Array(4);let S=null,A=null;const T=[],b=[];let y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let I=!1;this._outputColorSpace=Nn;let C=0,U=0,k=null,W=-1,B=null;const G=new Et,O=new Et;let V=null;const q=new je(0);let J=0,ae=t.width,re=t.height,Pe=1,Je=null,nt=null;const K=new Et(0,0,ae,re),ie=new Et(0,0,ae,re);let ue=!1;const Fe=new Wh;let Re=!1,Le=!1;const kt=new wt,Ye=new F,it=new Et,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function Tt(){return k===null?Pe:1}let P=i;function Ct(w,N){return t.getContext(w,N)}try{const w={alpha:!0,depth:r,stencil:s,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:d,powerPreference:_,failIfMajorPerformanceCaveat:a};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ph}`),t.addEventListener("webglcontextlost",ye,!1),t.addEventListener("webglcontextrestored",De,!1),t.addEventListener("webglcontextcreationerror",dt,!1),P===null){const N="webgl2";if(P=Ct(N,w),P===null)throw Ct(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw et("WebGLRenderer: "+w.message),w}let tt,ft,Ee,R,M,D,Z,Q,$,ve,le,be,Ce,te,se,xe,Se,pe,ze,L,ce,oe,_e;function ne(){tt=new hT(P),tt.init(),ce=new ib(P,tt),ft=new sT(P,tt,e,ce),Ee=new tb(P,tt),ft.reversedDepthBuffer&&l&&Ee.buffers.depth.setReversed(!0),R=new gT(P),M=new VA,D=new nb(P,tt,Ee,M,ft,ce,R),Z=new dT(E),Q=new SE(P),oe=new iT(P,Q),$=new pT(P,Q,R,oe),ve=new vT(P,$,Q,oe,R),pe=new _T(P,ft,D),se=new oT(M),le=new zA(E,Z,tt,ft,oe,se),be=new cb(E,M),Ce=new GA,te=new $A(tt),Se=new nT(E,Z,Ee,ve,m,u),xe=new eb(E,ve,ft),_e=new ub(P,R,ft,Ee),ze=new rT(P,tt,R),L=new mT(P,tt,R),R.programs=le.programs,E.capabilities=ft,E.extensions=tt,E.properties=M,E.renderLists=Ce,E.shadowMap=xe,E.state=Ee,E.info=R}ne(),x!==bn&&(y=new yT(x,t.width,t.height,r,s));const Y=new ab(E,P);this.xr=Y,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const w=tt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=tt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Pe},this.setPixelRatio=function(w){w!==void 0&&(Pe=w,this.setSize(ae,re,!1))},this.getSize=function(w){return w.set(ae,re)},this.setSize=function(w,N,X=!0){if(Y.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=w,re=N,t.width=Math.floor(w*Pe),t.height=Math.floor(N*Pe),X===!0&&(t.style.width=w+"px",t.style.height=N+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(ae*Pe,re*Pe).floor()},this.setDrawingBufferSize=function(w,N,X){ae=w,re=N,Pe=X,t.width=Math.floor(w*X),t.height=Math.floor(N*X),this.setViewport(0,0,w,N)},this.setEffects=function(w){if(x===bn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let N=0;N<w.length;N++)if(w[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(G)},this.getViewport=function(w){return w.copy(K)},this.setViewport=function(w,N,X,H){w.isVector4?K.set(w.x,w.y,w.z,w.w):K.set(w,N,X,H),Ee.viewport(G.copy(K).multiplyScalar(Pe).round())},this.getScissor=function(w){return w.copy(ie)},this.setScissor=function(w,N,X,H){w.isVector4?ie.set(w.x,w.y,w.z,w.w):ie.set(w,N,X,H),Ee.scissor(O.copy(ie).multiplyScalar(Pe).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(w){Ee.setScissorTest(ue=w)},this.setOpaqueSort=function(w){Je=w},this.setTransparentSort=function(w){nt=w},this.getClearColor=function(w){return w.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor(...arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha(...arguments)},this.clear=function(w=!0,N=!0,X=!0){let H=0;if(w){let z=!1;if(k!==null){const de=k.texture.format;z=p.has(de)}if(z){const de=k.texture.type,me=f.has(de),he=Se.getClearColor(),Me=Se.getClearAlpha(),Te=he.r,Ue=he.g,Ve=he.b;me?(g[0]=Te,g[1]=Ue,g[2]=Ve,g[3]=Me,P.clearBufferuiv(P.COLOR,0,g)):(v[0]=Te,v[1]=Ue,v[2]=Ve,v[3]=Me,P.clearBufferiv(P.COLOR,0,v))}else H|=P.COLOR_BUFFER_BIT}N&&(H|=P.DEPTH_BUFFER_BIT),X&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ye,!1),t.removeEventListener("webglcontextrestored",De,!1),t.removeEventListener("webglcontextcreationerror",dt,!1),Se.dispose(),Ce.dispose(),te.dispose(),M.dispose(),Z.dispose(),ve.dispose(),oe.dispose(),_e.dispose(),le.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Kh),Y.removeEventListener("sessionend",Zh),br.stop()};function ye(w){w.preventDefault(),Am("WebGLRenderer: Context Lost."),I=!0}function De(){Am("WebGLRenderer: Context Restored."),I=!1;const w=R.autoReset,N=xe.enabled,X=xe.autoUpdate,H=xe.needsUpdate,z=xe.type;ne(),R.autoReset=w,xe.enabled=N,xe.autoUpdate=X,xe.needsUpdate=H,xe.type=z}function dt(w){et("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function rt(w){const N=w.target;N.removeEventListener("dispose",rt),Ti(N)}function Ti(w){Ai(w),M.remove(w)}function Ai(w){const N=M.get(w).programs;N!==void 0&&(N.forEach(function(X){le.releaseProgram(X)}),w.isShaderMaterial&&le.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,X,H,z,de){N===null&&(N=ct);const me=z.isMesh&&z.matrixWorld.determinant()<0,he=Mv(w,N,X,H,z);Ee.setMaterial(H,me);let Me=X.index,Te=1;if(H.wireframe===!0){if(Me=$.getWireframeAttribute(X),Me===void 0)return;Te=2}const Ue=X.drawRange,Ve=X.attributes.position;let Ae=Ue.start*Te,at=(Ue.start+Ue.count)*Te;de!==null&&(Ae=Math.max(Ae,de.start*Te),at=Math.min(at,(de.start+de.count)*Te)),Me!==null?(Ae=Math.max(Ae,0),at=Math.min(at,Me.count)):Ve!=null&&(Ae=Math.max(Ae,0),at=Math.min(at,Ve.count));const At=at-Ae;if(At<0||At===1/0)return;oe.setup(z,H,he,X,Me);let St,lt=ze;if(Me!==null&&(St=Q.get(Me),lt=L,lt.setIndex(St)),z.isMesh)H.wireframe===!0?(Ee.setLineWidth(H.wireframeLinewidth*Tt()),lt.setMode(P.LINES)):lt.setMode(P.TRIANGLES);else if(z.isLine){let Kt=H.linewidth;Kt===void 0&&(Kt=1),Ee.setLineWidth(Kt*Tt()),z.isLineSegments?lt.setMode(P.LINES):z.isLineLoop?lt.setMode(P.LINE_LOOP):lt.setMode(P.LINE_STRIP)}else z.isPoints?lt.setMode(P.POINTS):z.isSprite&&lt.setMode(P.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)nc("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))lt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Kt=z._multiDrawStarts,we=z._multiDrawCounts,yn=z._multiDrawCount,Qe=Me?Q.get(Me).bytesPerElement:1,Wn=M.get(H).currentProgram.getUniforms();for(let si=0;si<yn;si++)Wn.setValue(P,"_gl_DrawID",si),lt.render(Kt[si]/Qe,we[si])}else if(z.isInstancedMesh)lt.renderInstances(Ae,At,z.count);else if(X.isInstancedBufferGeometry){const Kt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,we=Math.min(X.instanceCount,Kt);lt.renderInstances(Ae,At,we)}else lt.render(Ae,At)};function $h(w,N,X){w.transparent===!0&&w.side===hi&&w.forceSinglePass===!1?(w.side=xn,w.needsUpdate=!0,va(w,N,X),w.side=Er,w.needsUpdate=!0,va(w,N,X),w.side=hi):va(w,N,X)}this.compile=function(w,N,X=null){X===null&&(X=w),A=te.get(X),A.init(N),b.push(A),X.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),w!==X&&w.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(A.pushLight(z),z.castShadow&&A.pushShadow(z))}),A.setupLights();const H=new Set;return w.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const de=z.material;if(de)if(Array.isArray(de))for(let me=0;me<de.length;me++){const he=de[me];$h(he,X,z),H.add(he)}else $h(de,X,z),H.add(de)}),A=b.pop(),H},this.compileAsync=function(w,N,X=null){const H=this.compile(w,N,X);return new Promise(z=>{function de(){if(H.forEach(function(me){M.get(me).currentProgram.isReady()&&H.delete(me)}),H.size===0){z(w);return}setTimeout(de,10)}tt.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let bc=null;function Sv(w){bc&&bc(w)}function Kh(){br.stop()}function Zh(){br.start()}const br=new mv;br.setAnimationLoop(Sv),typeof self<"u"&&br.setContext(self),this.setAnimationLoop=function(w){bc=w,Y.setAnimationLoop(w),w===null?br.stop():br.start()},Y.addEventListener("sessionstart",Kh),Y.addEventListener("sessionend",Zh),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;const X=Y.enabled===!0&&Y.isPresenting===!0,H=y!==null&&(k===null||X)&&y.begin(E,k);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(N),N=Y.getCamera()),w.isScene===!0&&w.onBeforeRender(E,w,N,k),A=te.get(w,b.length),A.init(N),b.push(A),kt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Fe.setFromProjectionMatrix(kt,mi,N.reversedDepth),Le=this.localClippingEnabled,Re=se.init(this.clippingPlanes,Le),S=Ce.get(w,T.length),S.init(),T.push(S),Y.enabled===!0&&Y.isPresenting===!0){const me=E.xr.getDepthSensingMesh();me!==null&&Rc(me,N,-1/0,E.sortObjects)}Rc(w,N,0,E.sortObjects),S.finish(),E.sortObjects===!0&&S.sort(Je,nt),Be=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Be&&Se.addToRenderList(S,w),this.info.render.frame++,Re===!0&&se.beginShadows();const z=A.state.shadowsArray;if(xe.render(z,w,N),Re===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&y.hasRenderPass())===!1){const me=S.opaque,he=S.transmissive;if(A.setupLights(),N.isArrayCamera){const Me=N.cameras;if(he.length>0)for(let Te=0,Ue=Me.length;Te<Ue;Te++){const Ve=Me[Te];Qh(me,he,w,Ve)}Be&&Se.render(w);for(let Te=0,Ue=Me.length;Te<Ue;Te++){const Ve=Me[Te];Jh(S,w,Ve,Ve.viewport)}}else he.length>0&&Qh(me,he,w,N),Be&&Se.render(w),Jh(S,w,N)}k!==null&&U===0&&(D.updateMultisampleRenderTarget(k),D.updateRenderTargetMipmap(k)),H&&y.end(E),w.isScene===!0&&w.onAfterRender(E,w,N),oe.resetDefaultState(),W=-1,B=null,b.pop(),b.length>0?(A=b[b.length-1],Re===!0&&se.setGlobalState(E.clippingPlanes,A.state.camera)):A=null,T.pop(),T.length>0?S=T[T.length-1]:S=null};function Rc(w,N,X,H){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)A.pushLight(w),w.castShadow&&A.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Fe.intersectsSprite(w)){H&&it.setFromMatrixPosition(w.matrixWorld).applyMatrix4(kt);const me=ve.update(w),he=w.material;he.visible&&S.push(w,me,he,X,it.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Fe.intersectsObject(w))){const me=ve.update(w),he=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),it.copy(w.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),it.copy(me.boundingSphere.center)),it.applyMatrix4(w.matrixWorld).applyMatrix4(kt)),Array.isArray(he)){const Me=me.groups;for(let Te=0,Ue=Me.length;Te<Ue;Te++){const Ve=Me[Te],Ae=he[Ve.materialIndex];Ae&&Ae.visible&&S.push(w,me,Ae,X,it.z,Ve)}}else he.visible&&S.push(w,me,he,X,it.z,null)}}const de=w.children;for(let me=0,he=de.length;me<he;me++)Rc(de[me],N,X,H)}function Jh(w,N,X,H){const{opaque:z,transmissive:de,transparent:me}=w;A.setupLightsView(X),Re===!0&&se.setGlobalState(E.clippingPlanes,X),H&&Ee.viewport(G.copy(H)),z.length>0&&_a(z,N,X),de.length>0&&_a(de,N,X),me.length>0&&_a(me,N,X),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Qh(w,N,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[H.id]===void 0){const Ae=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[H.id]=new yi(1,1,{generateMipmaps:!0,type:Ae?ji:bn,minFilter:Gr,samples:Math.max(4,ft.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const de=A.state.transmissionRenderTarget[H.id],me=H.viewport||G;de.setSize(me.z*E.transmissionResolutionScale,me.w*E.transmissionResolutionScale);const he=E.getRenderTarget(),Me=E.getActiveCubeFace(),Te=E.getActiveMipmapLevel();E.setRenderTarget(de),E.getClearColor(q),J=E.getClearAlpha(),J<1&&E.setClearColor(16777215,.5),E.clear(),Be&&Se.render(X);const Ue=E.toneMapping;E.toneMapping=xi;const Ve=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),A.setupLightsView(H),Re===!0&&se.setGlobalState(E.clippingPlanes,H),_a(w,X,H),D.updateMultisampleRenderTarget(de),D.updateRenderTargetMipmap(de),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let at=0,At=N.length;at<At;at++){const St=N[at],{object:lt,geometry:Kt,material:we,group:yn}=St;if(we.side===hi&&lt.layers.test(H.layers)){const Qe=we.side;we.side=xn,we.needsUpdate=!0,ep(lt,X,H,Kt,we,yn),we.side=Qe,we.needsUpdate=!0,Ae=!0}}Ae===!0&&(D.updateMultisampleRenderTarget(de),D.updateRenderTargetMipmap(de))}E.setRenderTarget(he,Me,Te),E.setClearColor(q,J),Ve!==void 0&&(H.viewport=Ve),E.toneMapping=Ue}function _a(w,N,X){const H=N.isScene===!0?N.overrideMaterial:null;for(let z=0,de=w.length;z<de;z++){const me=w[z],{object:he,geometry:Me,group:Te}=me;let Ue=me.material;Ue.allowOverride===!0&&H!==null&&(Ue=H),he.layers.test(X.layers)&&ep(he,N,X,Me,Ue,Te)}}function ep(w,N,X,H,z,de){w.onBeforeRender(E,N,X,H,z,de),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(E,N,X,H,w,de),z.transparent===!0&&z.side===hi&&z.forceSinglePass===!1?(z.side=xn,z.needsUpdate=!0,E.renderBufferDirect(X,N,H,z,w,de),z.side=Er,z.needsUpdate=!0,E.renderBufferDirect(X,N,H,z,w,de),z.side=hi):E.renderBufferDirect(X,N,H,z,w,de),w.onAfterRender(E,N,X,H,z,de)}function va(w,N,X){N.isScene!==!0&&(N=ct);const H=M.get(w),z=A.state.lights,de=A.state.shadowsArray,me=z.state.version,he=le.getParameters(w,z.state,de,N,X),Me=le.getProgramCacheKey(he);let Te=H.programs;H.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?N.environment:null,H.fog=N.fog;const Ue=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;H.envMap=Z.get(w.envMap||H.environment,Ue),H.envMapRotation=H.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,Te===void 0&&(w.addEventListener("dispose",rt),Te=new Map,H.programs=Te);let Ve=Te.get(Me);if(Ve!==void 0){if(H.currentProgram===Ve&&H.lightsStateVersion===me)return np(w,he),Ve}else he.uniforms=le.getUniforms(w),w.onBeforeCompile(he,E),Ve=le.acquireProgram(he,Me),Te.set(Me,Ve),H.uniforms=he.uniforms;const Ae=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ae.clippingPlanes=se.uniform),np(w,he),H.needsLights=wv(w),H.lightsStateVersion=me,H.needsLights&&(Ae.ambientLightColor.value=z.state.ambient,Ae.lightProbe.value=z.state.probe,Ae.directionalLights.value=z.state.directional,Ae.directionalLightShadows.value=z.state.directionalShadow,Ae.spotLights.value=z.state.spot,Ae.spotLightShadows.value=z.state.spotShadow,Ae.rectAreaLights.value=z.state.rectArea,Ae.ltc_1.value=z.state.rectAreaLTC1,Ae.ltc_2.value=z.state.rectAreaLTC2,Ae.pointLights.value=z.state.point,Ae.pointLightShadows.value=z.state.pointShadow,Ae.hemisphereLights.value=z.state.hemi,Ae.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ae.spotLightMatrix.value=z.state.spotLightMatrix,Ae.spotLightMap.value=z.state.spotLightMap,Ae.pointShadowMatrix.value=z.state.pointShadowMatrix),H.currentProgram=Ve,H.uniformsList=null,Ve}function tp(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=Cl.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function np(w,N){const X=M.get(w);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function Mv(w,N,X,H,z){N.isScene!==!0&&(N=ct),D.resetTextureUnits();const de=N.fog,me=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?N.environment:null,he=k===null?E.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:$s,Me=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Te=Z.get(H.envMap||me,Me),Ue=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ve=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ae=!!X.morphAttributes.position,at=!!X.morphAttributes.normal,At=!!X.morphAttributes.color;let St=xi;H.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(St=E.toneMapping);const lt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Kt=lt!==void 0?lt.length:0,we=M.get(H),yn=A.state.lights;if(Re===!0&&(Le===!0||w!==B)){const Bt=w===B&&H.id===W;se.setState(H,w,Bt)}let Qe=!1;H.version===we.__version?(we.needsLights&&we.lightsStateVersion!==yn.state.version||we.outputColorSpace!==he||z.isBatchedMesh&&we.batching===!1||!z.isBatchedMesh&&we.batching===!0||z.isBatchedMesh&&we.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&we.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&we.instancing===!1||!z.isInstancedMesh&&we.instancing===!0||z.isSkinnedMesh&&we.skinning===!1||!z.isSkinnedMesh&&we.skinning===!0||z.isInstancedMesh&&we.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&we.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&we.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&we.instancingMorph===!1&&z.morphTexture!==null||we.envMap!==Te||H.fog===!0&&we.fog!==de||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==se.numPlanes||we.numIntersection!==se.numIntersection)||we.vertexAlphas!==Ue||we.vertexTangents!==Ve||we.morphTargets!==Ae||we.morphNormals!==at||we.morphColors!==At||we.toneMapping!==St||we.morphTargetsCount!==Kt)&&(Qe=!0):(Qe=!0,we.__version=H.version);let Wn=we.currentProgram;Qe===!0&&(Wn=va(H,N,z));let si=!1,Rr=!1,ts=!1;const ut=Wn.getUniforms(),Xt=we.uniforms;if(Ee.useProgram(Wn.program)&&(si=!0,Rr=!0,ts=!0),H.id!==W&&(W=H.id,Rr=!0),si||B!==w){Ee.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ut.setValue(P,"projectionMatrix",w.projectionMatrix),ut.setValue(P,"viewMatrix",w.matrixWorldInverse);const Ki=ut.map.cameraPosition;Ki!==void 0&&Ki.setValue(P,Ye.setFromMatrixPosition(w.matrixWorld)),ft.logarithmicDepthBuffer&&ut.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ut.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),B!==w&&(B=w,Rr=!0,ts=!0)}if(we.needsLights&&(yn.state.directionalShadowMap.length>0&&ut.setValue(P,"directionalShadowMap",yn.state.directionalShadowMap,D),yn.state.spotShadowMap.length>0&&ut.setValue(P,"spotShadowMap",yn.state.spotShadowMap,D),yn.state.pointShadowMap.length>0&&ut.setValue(P,"pointShadowMap",yn.state.pointShadowMap,D)),z.isSkinnedMesh){ut.setOptional(P,z,"bindMatrix"),ut.setOptional(P,z,"bindMatrixInverse");const Bt=z.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),ut.setValue(P,"boneTexture",Bt.boneTexture,D))}z.isBatchedMesh&&(ut.setOptional(P,z,"batchingTexture"),ut.setValue(P,"batchingTexture",z._matricesTexture,D),ut.setOptional(P,z,"batchingIdTexture"),ut.setValue(P,"batchingIdTexture",z._indirectTexture,D),ut.setOptional(P,z,"batchingColorTexture"),z._colorsTexture!==null&&ut.setValue(P,"batchingColorTexture",z._colorsTexture,D));const $i=X.morphAttributes;if(($i.position!==void 0||$i.normal!==void 0||$i.color!==void 0)&&pe.update(z,X,Wn),(Rr||we.receiveShadow!==z.receiveShadow)&&(we.receiveShadow=z.receiveShadow,ut.setValue(P,"receiveShadow",z.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&N.environment!==null&&(Xt.envMapIntensity.value=N.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=db()),Rr&&(ut.setValue(P,"toneMappingExposure",E.toneMappingExposure),we.needsLights&&Ev(Xt,ts),de&&H.fog===!0&&be.refreshFogUniforms(Xt,de),be.refreshMaterialUniforms(Xt,H,Pe,re,A.state.transmissionRenderTarget[w.id]),Cl.upload(P,tp(we),Xt,D)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Cl.upload(P,tp(we),Xt,D),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ut.setValue(P,"center",z.center),ut.setValue(P,"modelViewMatrix",z.modelViewMatrix),ut.setValue(P,"normalMatrix",z.normalMatrix),ut.setValue(P,"modelMatrix",z.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Bt=H.uniformsGroups;for(let Ki=0,ns=Bt.length;Ki<ns;Ki++){const ip=Bt[Ki];_e.update(ip,Wn),_e.bind(ip,Wn)}}return Wn}function Ev(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function wv(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(w,N,X){const H=M.get(w);H.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),M.get(w.texture).__webglTexture=N,M.get(w.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,N){const X=M.get(w);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0};const Tv=P.createFramebuffer();this.setRenderTarget=function(w,N=0,X=0){k=w,C=N,U=X;let H=null,z=!1,de=!1;if(w){const he=M.get(w);if(he.__useDefaultFramebuffer!==void 0){Ee.bindFramebuffer(P.FRAMEBUFFER,he.__webglFramebuffer),G.copy(w.viewport),O.copy(w.scissor),V=w.scissorTest,Ee.viewport(G),Ee.scissor(O),Ee.setScissorTest(V),W=-1;return}else if(he.__webglFramebuffer===void 0)D.setupRenderTarget(w);else if(he.__hasExternalTextures)D.rebindTextures(w,M.get(w.texture).__webglTexture,M.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ue=w.depthTexture;if(he.__boundDepthTexture!==Ue){if(Ue!==null&&M.has(Ue)&&(w.width!==Ue.image.width||w.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(w)}}const Me=w.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(de=!0);const Te=M.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Te[N])?H=Te[N][X]:H=Te[N],z=!0):w.samples>0&&D.useMultisampledRTT(w)===!1?H=M.get(w).__webglMultisampledFramebuffer:Array.isArray(Te)?H=Te[X]:H=Te,G.copy(w.viewport),O.copy(w.scissor),V=w.scissorTest}else G.copy(K).multiplyScalar(Pe).floor(),O.copy(ie).multiplyScalar(Pe).floor(),V=ue;if(X!==0&&(H=Tv),Ee.bindFramebuffer(P.FRAMEBUFFER,H)&&Ee.drawBuffers(w,H),Ee.viewport(G),Ee.scissor(O),Ee.setScissorTest(V),z){const he=M.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,he.__webglTexture,X)}else if(de){const he=N;for(let Me=0;Me<w.textures.length;Me++){const Te=M.get(w.textures[Me]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Me,Te.__webglTexture,X,he)}}else if(w!==null&&X!==0){const he=M.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,he.__webglTexture,X)}W=-1},this.readRenderTargetPixels=function(w,N,X,H,z,de,me,he=0){if(!(w&&w.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=M.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me){Ee.bindFramebuffer(P.FRAMEBUFFER,Me);try{const Te=w.textures[he],Ue=Te.format,Ve=Te.type;if(w.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+he),!ft.textureFormatReadable(Ue)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Ve)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-H&&X>=0&&X<=w.height-z&&P.readPixels(N,X,H,z,ce.convert(Ue),ce.convert(Ve),de)}finally{const Te=k!==null?M.get(k).__webglFramebuffer:null;Ee.bindFramebuffer(P.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(w,N,X,H,z,de,me,he=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=M.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me)if(N>=0&&N<=w.width-H&&X>=0&&X<=w.height-z){Ee.bindFramebuffer(P.FRAMEBUFFER,Me);const Te=w.textures[he],Ue=Te.format,Ve=Te.type;if(w.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+he),!ft.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ae=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ae),P.bufferData(P.PIXEL_PACK_BUFFER,de.byteLength,P.STREAM_READ),P.readPixels(N,X,H,z,ce.convert(Ue),ce.convert(Ve),0);const at=k!==null?M.get(k).__webglFramebuffer:null;Ee.bindFramebuffer(P.FRAMEBUFFER,at);const At=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await PM(P,At,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ae),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,de),P.deleteBuffer(Ae),P.deleteSync(At),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,N=null,X=0){const H=Math.pow(2,-X),z=Math.floor(w.image.width*H),de=Math.floor(w.image.height*H),me=N!==null?N.x:0,he=N!==null?N.y:0;D.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,X,0,0,me,he,z,de),Ee.unbindTexture()};const Av=P.createFramebuffer(),bv=P.createFramebuffer();this.copyTextureToTexture=function(w,N,X=null,H=null,z=0,de=0){let me,he,Me,Te,Ue,Ve,Ae,at,At;const St=w.isCompressedTexture?w.mipmaps[de]:w.image;if(X!==null)me=X.max.x-X.min.x,he=X.max.y-X.min.y,Me=X.isBox3?X.max.z-X.min.z:1,Te=X.min.x,Ue=X.min.y,Ve=X.isBox3?X.min.z:0;else{const Xt=Math.pow(2,-z);me=Math.floor(St.width*Xt),he=Math.floor(St.height*Xt),w.isDataArrayTexture?Me=St.depth:w.isData3DTexture?Me=Math.floor(St.depth*Xt):Me=1,Te=0,Ue=0,Ve=0}H!==null?(Ae=H.x,at=H.y,At=H.z):(Ae=0,at=0,At=0);const lt=ce.convert(N.format),Kt=ce.convert(N.type);let we;N.isData3DTexture?(D.setTexture3D(N,0),we=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(D.setTexture2DArray(N,0),we=P.TEXTURE_2D_ARRAY):(D.setTexture2D(N,0),we=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const yn=P.getParameter(P.UNPACK_ROW_LENGTH),Qe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Wn=P.getParameter(P.UNPACK_SKIP_PIXELS),si=P.getParameter(P.UNPACK_SKIP_ROWS),Rr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,St.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,St.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Te),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ue),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ve);const ts=w.isDataArrayTexture||w.isData3DTexture,ut=N.isDataArrayTexture||N.isData3DTexture;if(w.isDepthTexture){const Xt=M.get(w),$i=M.get(N),Bt=M.get(Xt.__renderTarget),Ki=M.get($i.__renderTarget);Ee.bindFramebuffer(P.READ_FRAMEBUFFER,Bt.__webglFramebuffer),Ee.bindFramebuffer(P.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let ns=0;ns<Me;ns++)ts&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,M.get(w).__webglTexture,z,Ve+ns),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,M.get(N).__webglTexture,de,At+ns)),P.blitFramebuffer(Te,Ue,me,he,Ae,at,me,he,P.DEPTH_BUFFER_BIT,P.NEAREST);Ee.bindFramebuffer(P.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(z!==0||w.isRenderTargetTexture||M.has(w)){const Xt=M.get(w),$i=M.get(N);Ee.bindFramebuffer(P.READ_FRAMEBUFFER,Av),Ee.bindFramebuffer(P.DRAW_FRAMEBUFFER,bv);for(let Bt=0;Bt<Me;Bt++)ts?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Xt.__webglTexture,z,Ve+Bt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Xt.__webglTexture,z),ut?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,$i.__webglTexture,de,At+Bt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,$i.__webglTexture,de),z!==0?P.blitFramebuffer(Te,Ue,me,he,Ae,at,me,he,P.COLOR_BUFFER_BIT,P.NEAREST):ut?P.copyTexSubImage3D(we,de,Ae,at,At+Bt,Te,Ue,me,he):P.copyTexSubImage2D(we,de,Ae,at,Te,Ue,me,he);Ee.bindFramebuffer(P.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ut?w.isDataTexture||w.isData3DTexture?P.texSubImage3D(we,de,Ae,at,At,me,he,Me,lt,Kt,St.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(we,de,Ae,at,At,me,he,Me,lt,St.data):P.texSubImage3D(we,de,Ae,at,At,me,he,Me,lt,Kt,St):w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,de,Ae,at,me,he,lt,Kt,St.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,de,Ae,at,St.width,St.height,lt,St.data):P.texSubImage2D(P.TEXTURE_2D,de,Ae,at,me,he,lt,Kt,St);P.pixelStorei(P.UNPACK_ROW_LENGTH,yn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Qe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Wn),P.pixelStorei(P.UNPACK_SKIP_ROWS,si),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Rr),de===0&&N.generateMipmaps&&P.generateMipmap(we),Ee.unbindTexture()},this.initRenderTarget=function(w){M.get(w).__webglFramebuffer===void 0&&D.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?D.setTextureCube(w,0):w.isData3DTexture?D.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?D.setTexture2DArray(w,0):D.setTexture2D(w,0),Ee.unbindTexture()},this.resetState=function(){C=0,U=0,k=null,Ee.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}const ci=120,pb=200,mb=30;class gb{constructor(e){He(this,"scene");He(this,"camera");He(this,"renderer");He(this,"clock");He(this,"monsterMesh",null);He(this,"pageMeshes",new Map);He(this,"puzzleMeshes",new Map);He(this,"playerMeshes",new Map);He(this,"flashlight",null);He(this,"flashlightTarget",null);He(this,"moveState",{forward:!1,back:!1,left:!1,right:!1,sprint:!1});He(this,"mouseX",0);He(this,"mouseY",0);He(this,"yaw",0);He(this,"pitch",0);He(this,"isPointerLocked",!1);He(this,"playerHeight",1.7);He(this,"footstepTimer",0);He(this,"footstepInterval",.5);He(this,"onMove");He(this,"onCollectPage");He(this,"onPuzzleInteract");He(this,"onLookingAtMonster");He(this,"onFootstep");He(this,"flashlightOn",!1);this.scene=new jM,this.camera=new pn(75,e.clientWidth/e.clientHeight,.1,300),this.renderer=new hb({canvas:e,antialias:!0}),this.clock=new xE,this.setupRenderer(),this.setupLighting(),this.buildEnvironment(),this.setupMonster(),this.setupInputHandlers(e)}setupRenderer(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=G0,this.renderer.toneMapping=Ih,this.renderer.toneMappingExposure=.3,this.scene.fog=new Hh(657935,.04),this.scene.background=new je(657935)}setupLighting(){const e=new mE(1712960,.15);e.position.set(50,100,50),e.castShadow=!0,this.scene.add(e);const t=new gE(526352,.3);this.scene.add(t),this.flashlight=new dE(16774608,0,20,Math.PI/8,.3,1.5),this.flashlight.castShadow=!0,this.flashlight.shadow.mapSize.set(512,512),this.flashlightTarget=new Ut,this.scene.add(this.flashlightTarget),this.flashlight.target=this.flashlightTarget,this.camera.add(this.flashlight),this.flashlight.position.set(.15,-.1,-.3),this.scene.add(this.camera)}buildEnvironment(){const e=new Ks(ci*2,ci*2,50,50),t=new En({color:858634}),i=e.attributes.position.array;for(let s=0;s<i.length;s+=3)i[s+2]+=(Math.random()-.5)*.5;e.computeVertexNormals();const r=new $e(e,t);r.rotation.x=-Math.PI/2,r.receiveShadow=!0,this.scene.add(r);for(let s=0;s<pb;s++)this.addTree((Math.random()-.5)*ci*1.8,(Math.random()-.5)*ci*1.8);for(let s=0;s<mb;s++)this.addRock((Math.random()-.5)*ci,(Math.random()-.5)*ci);this.addCabin(-20,-20),this.addDebris()}addTree(e,t){const i=new Ui,r=4+Math.random()*6,s=new Ni(.15,.25,r,6),o=new En({color:1707784}),c=new $e(s,o);c.position.y=r/2,c.castShadow=!0,i.add(c);const u=new je(662024),d=new En({color:u});for(let _=0;_<3;_++){const a=1.5-_*.3,l=new rc(a+Math.random()*.5,2+Math.random(),6),h=new $e(l,d);h.position.y=r-_*1.2+1,h.rotation.y=Math.random()*Math.PI,h.castShadow=!0,i.add(h)}i.rotation.z=(Math.random()-.5)*.15,i.rotation.x=(Math.random()-.5)*.1,i.position.set(e,0,t),this.scene.add(i)}addRock(e,t){const i=new jh(.3+Math.random()*1.2,0),r=new En({color:1710618}),s=new $e(i,r);s.position.set(e,Math.random()*.3,t),s.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),s.castShadow=!0,s.receiveShadow=!0,this.scene.add(s)}addCabin(e,t){const i=new Ui,r=new En({color:1708040}),s=new An(8,4,8),o=new $e(s,r);o.position.y=2,o.castShadow=!0,o.receiveShadow=!0,i.add(o);const c=new rc(6,3,4),u=new En({color:854534}),d=new $e(c,u);d.position.y=5.5,d.rotation.y=Math.PI/4,d.castShadow=!0,i.add(d);const _=new An(1.2,2.2,.1),a=new En({color:0}),l=new $e(_,a);l.position.set(0,1.1,4.05),i.add(l),i.position.set(e,0,t),i.rotation.y=Math.random()*Math.PI,this.scene.add(i)}addDebris(){const e=[{x:5,z:10},{x:-15,z:5},{x:20,z:-8},{x:-5,z:-25},{x:30,z:15}],t=new En({color:985605});for(const{x:i,z:r}of e){const s=new An(.15,.08,1.2+Math.random()),o=new $e(s,t);o.position.set(i,.04,r),o.rotation.y=Math.random()*Math.PI,this.scene.add(o)}}setupMonster(){this.monsterMesh=new Ui;const e=new En({color:328965}),t=new zo({color:2228241,transparent:!0,opacity:.3}),i=new Ni(.2,.3,3,8),r=new $e(i,e);r.position.y=1.5,this.monsterMesh.add(r);const s=new Ni(.05,.08,2.5,6),o=new En({color:197379}),c=new $e(s,o);c.position.set(-1.2,1.8,0),c.rotation.z=Math.PI/4,this.monsterMesh.add(c);const u=new $e(s,o);u.position.set(1.2,1.8,0),u.rotation.z=-Math.PI/4,this.monsterMesh.add(u);const d=new Vo(.3,8,8);d.scale(.8,1.2,.8);const _=new $e(d,e);_.position.y=3.2,this.monsterMesh.add(_);const a=new Ni(.08,.12,1.5,6),l=new $e(a,e);l.position.set(-.2,.75,0),this.monsterMesh.add(l);const h=new $e(a,e);h.position.set(.2,.75,0),this.monsterMesh.add(h);const m=new Vo(1.5,8,8),x=new $e(m,t);x.position.y=1.5,this.monsterMesh.add(x);const p=new Iu(2228258,.5,8);p.position.y=2,this.monsterMesh.add(p),this.monsterMesh.position.set(-50,0,-50),this.monsterMesh.visible=!1,this.scene.add(this.monsterMesh)}setupPages(e){for(const t of this.pageMeshes.values())this.scene.remove(t);this.pageMeshes.clear();for(const t of e){if(t.collected)continue;const i=new Ks(.3,.4),r=new zo({color:16777215,side:hi}),s=new $e(i,r);s.position.set(t.position.x,1.2,t.position.z),s.rotation.y=Math.random()*Math.PI*2,s.rotation.x=(Math.random()-.5)*.3,s.userData.pageId=t.id;const o=new Iu(16777164,.4,3);o.position.copy(s.position),this.scene.add(o),s.userData.light=o,this.pageMeshes.set(t.id,s),this.scene.add(s)}}setupPuzzles(e){for(const t of e){const i=new Ui;let r=t.solved?17408:4456448;t.type==="switch"&&(r=t.solved?17408:3355392),t.type==="code"&&(r=t.solved?13056:3342387);const s=new En({color:r});if(t.type==="pressure_plate"){const d=new An(2,.1,2),_=new $e(d,s);_.position.y=.05,i.add(_)}else if(t.type==="lever"){const d=new An(.3,.5,.3),_=new $e(d,s);_.position.y=.25,i.add(_);const a=new Ni(.04,.04,.8,8),l=new En({color:8947848}),h=new $e(a,l);h.position.y=.9,h.rotation.z=t.solved?0:Math.PI/3,i.add(h)}else if(t.type==="code"){const d=new An(.5,.8,.3),_=new $e(d,s);_.position.y=1.2,i.add(_)}else{const d=new An(.3,.6,.3),_=new $e(d,s);_.position.y=.3,i.add(_)}const o=new zo({color:t.solved?65348:16724736,transparent:!0,opacity:.3}),c=new Vo(.5,8,8),u=new $e(c,o);u.position.y=.5,i.add(u),i.userData.glowMesh=u,i.userData.glowMat=o,i.userData.puzzleId=t.id,i.userData.requiresPlayers=t.requiresPlayers,i.userData.type=t.type,i.position.set(t.position.x,0,t.position.z),this.puzzleMeshes.set(t.id,i),this.scene.add(i)}}updateMonster(e){if(!this.monsterMesh)return;this.monsterMesh.position.set(e.position.x,0,e.position.z),this.monsterMesh.rotation.y=e.rotation;const t=this.camera.position.distanceTo(this.monsterMesh.position);this.monsterMesh.visible=t<80;const i=Date.now()/1e3;if(e.state==="hunting"||e.state==="attacking"){const r=this.monsterMesh.children[1],s=this.monsterMesh.children[2];r&&(r.rotation.x=Math.sin(i*3)*.3),s&&(s.rotation.x=Math.cos(i*3)*.3)}if(e.teleporting&&(this.monsterMesh.visible=Math.random()>.5),this.onLookingAtMonster){const r=new F().subVectors(this.monsterMesh.position,this.camera.position).normalize(),o=new F(0,0,-1).applyQuaternion(this.camera.quaternion).dot(r);this.onLookingAtMonster(o>.5&&t<50)}}updateOtherPlayers(e,t){for(const[i,r]of e){if(i===t)continue;let s=this.playerMeshes.get(i);s||(s=this.createPlayerMesh(r.color),this.playerMeshes.set(i,s),this.scene.add(s)),s.position.set(r.position.x,0,r.position.z),s.rotation.y=r.rotation,s.visible=r.isAlive}for(const[i,r]of this.playerMeshes)(!e.has(i)||i===t)&&(this.scene.remove(r),this.playerMeshes.delete(i))}createPlayerMesh(e){const t=new Ui,i=new En({color:e}),r=new $e(new Ni(.2,.25,1.2,8),i);r.position.y=.8,t.add(r);const s=new $e(new An(.35,.35,.35),i);s.position.y=1.6,t.add(s);const o=new Iu(new je(e),.3,5);return o.position.y=2,t.add(o),t}setFlashlight(e){this.flashlight&&(this.flashlight.intensity=e?3:0)}markPageCollected(e){const t=this.pageMeshes.get(e);t&&(t.userData.light&&this.scene.remove(t.userData.light),this.scene.remove(t),this.pageMeshes.delete(e))}updatePuzzle(e,t){const i=this.puzzleMeshes.get(e);if(!i)return;const r=i.userData.glowMat;r&&r.color.set(t?65348:16724736)}setupInputHandlers(e){window.addEventListener("keydown",t=>{switch(t.code){case"KeyW":case"ArrowUp":this.moveState.forward=!0;break;case"KeyS":case"ArrowDown":this.moveState.back=!0;break;case"KeyA":case"ArrowLeft":this.moveState.left=!0;break;case"KeyD":case"ArrowRight":this.moveState.right=!0;break;case"ShiftLeft":this.moveState.sprint=!0;break;case"KeyF":this.toggleFlashlight();break;case"KeyE":this.checkInteraction();break}}),window.addEventListener("keyup",t=>{switch(t.code){case"KeyW":case"ArrowUp":this.moveState.forward=!1;break;case"KeyS":case"ArrowDown":this.moveState.back=!1;break;case"KeyA":case"ArrowLeft":this.moveState.left=!1;break;case"KeyD":case"ArrowRight":this.moveState.right=!1;break;case"ShiftLeft":this.moveState.sprint=!1;break}}),e.addEventListener("click",()=>{e.requestPointerLock()}),document.addEventListener("pointerlockchange",()=>{this.isPointerLocked=document.pointerLockElement===e}),document.addEventListener("mousemove",t=>{if(!this.isPointerLocked)return;const i=.002;this.yaw-=t.movementX*i,this.pitch-=t.movementY*i,this.pitch=Math.max(-Math.PI/3,Math.min(Math.PI/3,this.pitch))})}toggleFlashlight(){this.flashlightOn=!this.flashlightOn,this.setFlashlight(this.flashlightOn)}checkInteraction(){var e,t;for(const[i,r]of this.pageMeshes)if(this.camera.position.distanceTo(r.position)<2.5){(e=this.onCollectPage)==null||e.call(this,i);return}for(const[i,r]of this.puzzleMeshes)if(this.camera.position.distanceTo(r.position)<4){(t=this.onPuzzleInteract)==null||t.call(this,i);return}}getInteractionPrompt(){for(const[,e]of this.pageMeshes)if(this.camera.position.distanceTo(e.position)<2.5)return"[E] Pick up page";for(const[e,t]of this.puzzleMeshes)if(this.camera.position.distanceTo(t.position)<4){const r=t.userData.type,s=t.userData.requiresPlayers>1?` (needs ${t.userData.requiresPlayers} players)`:"";return`[E] Interact with ${r}${s}`}return null}update(e){var r,s;const t=this.clock.getDelta();if(e!=null&&e.isAlive){const o=this.moveState.sprint&&e.stamina>0?7:4,c=new F;if(this.moveState.forward&&(c.z-=1),this.moveState.back&&(c.z+=1),this.moveState.left&&(c.x-=1),this.moveState.right&&(c.x+=1),c.normalize().multiplyScalar(o*t),c.applyEuler(new ri(0,this.yaw,0)),this.camera.position.add(c),this.camera.position.x=Math.max(-ci/2,Math.min(ci/2,this.camera.position.x)),this.camera.position.z=Math.max(-ci/2,Math.min(ci/2,this.camera.position.z)),this.camera.position.y=this.playerHeight,this.camera.rotation.order="YXZ",this.camera.rotation.y=this.yaw,this.camera.rotation.x=this.pitch,this.flashlightTarget){const d=new F(0,0,-5);d.applyQuaternion(this.camera.quaternion),this.flashlightTarget.position.copy(this.camera.position).add(d)}(this.moveState.forward||this.moveState.back||this.moveState.left||this.moveState.right)&&(this.footstepTimer-=t,this.footstepTimer<=0&&((r=this.onFootstep)==null||r.call(this),this.footstepTimer=this.moveState.sprint?.3:.5)),(s=this.onMove)==null||s.call(this,this.camera.position.clone(),this.yaw,this.pitch,this.moveState.sprint)}const i=Date.now()/1e3;for(const o of this.pageMeshes.values())o.rotation.y+=t*.5,o.position.y=1.2+Math.sin(i*1.5)*.1;for(const o of this.puzzleMeshes.values()){const c=o.userData.glowMesh;c&&(c.rotation.y+=t*.8,c.material.opacity=.2+Math.sin(i*2)*.1)}return this.renderer.render(this.scene,this.camera),this.getInteractionPrompt()}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}applyScreenShake(e){const t=()=>{const s=Math.random()-.5;this.camera.position.x+=s*e*.1,this.camera.position.y+=(Math.random()-.5)*e*.05};let i=0;const r=setInterval(()=>{t(),i++,i>15&&clearInterval(r)},16)}getPosition(){return this.camera.position.clone()}destroy(){this.renderer.dispose()}}var wn={};/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(n){(function(){var e=function(){this.init()};e.prototype={init:function(){var a=this||t;return a._counter=1e3,a._html5AudioPool=[],a.html5PoolSize=10,a._codecs={},a._howls=[],a._muted=!1,a._volume=1,a._canPlayEvent="canplaythrough",a._navigator=typeof window<"u"&&window.navigator?window.navigator:null,a.masterGain=null,a.noAudio=!1,a.usingWebAudio=!0,a.autoSuspend=!0,a.ctx=null,a.autoUnlock=!0,a._setup(),a},volume:function(a){var l=this||t;if(a=parseFloat(a),l.ctx||_(),typeof a<"u"&&a>=0&&a<=1){if(l._volume=a,l._muted)return l;l.usingWebAudio&&l.masterGain.gain.setValueAtTime(a,t.ctx.currentTime);for(var h=0;h<l._howls.length;h++)if(!l._howls[h]._webAudio)for(var m=l._howls[h]._getSoundIds(),x=0;x<m.length;x++){var p=l._howls[h]._soundById(m[x]);p&&p._node&&(p._node.volume=p._volume*a)}return l}return l._volume},mute:function(a){var l=this||t;l.ctx||_(),l._muted=a,l.usingWebAudio&&l.masterGain.gain.setValueAtTime(a?0:l._volume,t.ctx.currentTime);for(var h=0;h<l._howls.length;h++)if(!l._howls[h]._webAudio)for(var m=l._howls[h]._getSoundIds(),x=0;x<m.length;x++){var p=l._howls[h]._soundById(m[x]);p&&p._node&&(p._node.muted=a?!0:p._muted)}return l},stop:function(){for(var a=this||t,l=0;l<a._howls.length;l++)a._howls[l].stop();return a},unload:function(){for(var a=this||t,l=a._howls.length-1;l>=0;l--)a._howls[l].unload();return a.usingWebAudio&&a.ctx&&typeof a.ctx.close<"u"&&(a.ctx.close(),a.ctx=null,_()),a},codecs:function(a){return(this||t)._codecs[a.replace(/^x-/,"")]},_setup:function(){var a=this||t;if(a.state=a.ctx&&a.ctx.state||"suspended",a._autoSuspend(),!a.usingWebAudio)if(typeof Audio<"u")try{var l=new Audio;typeof l.oncanplaythrough>"u"&&(a._canPlayEvent="canplay")}catch{a.noAudio=!0}else a.noAudio=!0;try{var l=new Audio;l.muted&&(a.noAudio=!0)}catch{}return a.noAudio||a._setupCodecs(),a},_setupCodecs:function(){var a=this||t,l=null;try{l=typeof Audio<"u"?new Audio:null}catch{return a}if(!l||typeof l.canPlayType!="function")return a;var h=l.canPlayType("audio/mpeg;").replace(/^no$/,""),m=a._navigator?a._navigator.userAgent:"",x=m.match(/OPR\/(\d+)/g),p=x&&parseInt(x[0].split("/")[1],10)<33,f=m.indexOf("Safari")!==-1&&m.indexOf("Chrome")===-1,g=m.match(/Version\/(.*?) /),v=f&&g&&parseInt(g[1],10)<15;return a._codecs={mp3:!!(!p&&(h||l.canPlayType("audio/mp3;").replace(/^no$/,""))),mpeg:!!h,opus:!!l.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!l.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!l.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(l.canPlayType('audio/wav; codecs="1"')||l.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!l.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!l.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(l.canPlayType("audio/x-m4a;")||l.canPlayType("audio/m4a;")||l.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(l.canPlayType("audio/x-m4b;")||l.canPlayType("audio/m4b;")||l.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(l.canPlayType("audio/x-mp4;")||l.canPlayType("audio/mp4;")||l.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!(!v&&l.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!!(!v&&l.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!l.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(l.canPlayType("audio/x-flac;")||l.canPlayType("audio/flac;")).replace(/^no$/,"")},a},_unlockAudio:function(){var a=this||t;if(!(a._audioUnlocked||!a.ctx)){a._audioUnlocked=!1,a.autoUnlock=!1,!a._mobileUnloaded&&a.ctx.sampleRate!==44100&&(a._mobileUnloaded=!0,a.unload()),a._scratchBuffer=a.ctx.createBuffer(1,1,22050);var l=function(h){for(;a._html5AudioPool.length<a.html5PoolSize;)try{var m=new Audio;m._unlocked=!0,a._releaseHtml5Audio(m)}catch{a.noAudio=!0;break}for(var x=0;x<a._howls.length;x++)if(!a._howls[x]._webAudio)for(var p=a._howls[x]._getSoundIds(),f=0;f<p.length;f++){var g=a._howls[x]._soundById(p[f]);g&&g._node&&!g._node._unlocked&&(g._node._unlocked=!0,g._node.load())}a._autoResume();var v=a.ctx.createBufferSource();v.buffer=a._scratchBuffer,v.connect(a.ctx.destination),typeof v.start>"u"?v.noteOn(0):v.start(0),typeof a.ctx.resume=="function"&&a.ctx.resume(),v.onended=function(){v.disconnect(0),a._audioUnlocked=!0,document.removeEventListener("touchstart",l,!0),document.removeEventListener("touchend",l,!0),document.removeEventListener("click",l,!0),document.removeEventListener("keydown",l,!0);for(var S=0;S<a._howls.length;S++)a._howls[S]._emit("unlock")}};return document.addEventListener("touchstart",l,!0),document.addEventListener("touchend",l,!0),document.addEventListener("click",l,!0),document.addEventListener("keydown",l,!0),a}},_obtainHtml5Audio:function(){var a=this||t;if(a._html5AudioPool.length)return a._html5AudioPool.pop();var l=new Audio().play();return l&&typeof Promise<"u"&&(l instanceof Promise||typeof l.then=="function")&&l.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(a){var l=this||t;return a._unlocked&&l._html5AudioPool.push(a),l},_autoSuspend:function(){var a=this;if(!(!a.autoSuspend||!a.ctx||typeof a.ctx.suspend>"u"||!t.usingWebAudio)){for(var l=0;l<a._howls.length;l++)if(a._howls[l]._webAudio){for(var h=0;h<a._howls[l]._sounds.length;h++)if(!a._howls[l]._sounds[h]._paused)return a}return a._suspendTimer&&clearTimeout(a._suspendTimer),a._suspendTimer=setTimeout(function(){if(a.autoSuspend){a._suspendTimer=null,a.state="suspending";var m=function(){a.state="suspended",a._resumeAfterSuspend&&(delete a._resumeAfterSuspend,a._autoResume())};a.ctx.suspend().then(m,m)}},3e4),a}},_autoResume:function(){var a=this;if(!(!a.ctx||typeof a.ctx.resume>"u"||!t.usingWebAudio))return a.state==="running"&&a.ctx.state!=="interrupted"&&a._suspendTimer?(clearTimeout(a._suspendTimer),a._suspendTimer=null):a.state==="suspended"||a.state==="running"&&a.ctx.state==="interrupted"?(a.ctx.resume().then(function(){a.state="running";for(var l=0;l<a._howls.length;l++)a._howls[l]._emit("resume")}),a._suspendTimer&&(clearTimeout(a._suspendTimer),a._suspendTimer=null)):a.state==="suspending"&&(a._resumeAfterSuspend=!0),a}};var t=new e,i=function(a){var l=this;if(!a.src||a.src.length===0){console.error("An array of source files must be passed with any new Howl.");return}l.init(a)};i.prototype={init:function(a){var l=this;return t.ctx||_(),l._autoplay=a.autoplay||!1,l._format=typeof a.format!="string"?a.format:[a.format],l._html5=a.html5||!1,l._muted=a.mute||!1,l._loop=a.loop||!1,l._pool=a.pool||5,l._preload=typeof a.preload=="boolean"||a.preload==="metadata"?a.preload:!0,l._rate=a.rate||1,l._sprite=a.sprite||{},l._src=typeof a.src!="string"?a.src:[a.src],l._volume=a.volume!==void 0?a.volume:1,l._xhr={method:a.xhr&&a.xhr.method?a.xhr.method:"GET",headers:a.xhr&&a.xhr.headers?a.xhr.headers:null,withCredentials:a.xhr&&a.xhr.withCredentials?a.xhr.withCredentials:!1},l._duration=0,l._state="unloaded",l._sounds=[],l._endTimers={},l._queue=[],l._playLock=!1,l._onend=a.onend?[{fn:a.onend}]:[],l._onfade=a.onfade?[{fn:a.onfade}]:[],l._onload=a.onload?[{fn:a.onload}]:[],l._onloaderror=a.onloaderror?[{fn:a.onloaderror}]:[],l._onplayerror=a.onplayerror?[{fn:a.onplayerror}]:[],l._onpause=a.onpause?[{fn:a.onpause}]:[],l._onplay=a.onplay?[{fn:a.onplay}]:[],l._onstop=a.onstop?[{fn:a.onstop}]:[],l._onmute=a.onmute?[{fn:a.onmute}]:[],l._onvolume=a.onvolume?[{fn:a.onvolume}]:[],l._onrate=a.onrate?[{fn:a.onrate}]:[],l._onseek=a.onseek?[{fn:a.onseek}]:[],l._onunlock=a.onunlock?[{fn:a.onunlock}]:[],l._onresume=[],l._webAudio=t.usingWebAudio&&!l._html5,typeof t.ctx<"u"&&t.ctx&&t.autoUnlock&&t._unlockAudio(),t._howls.push(l),l._autoplay&&l._queue.push({event:"play",action:function(){l.play()}}),l._preload&&l._preload!=="none"&&l.load(),l},load:function(){var a=this,l=null;if(t.noAudio){a._emit("loaderror",null,"No audio support.");return}typeof a._src=="string"&&(a._src=[a._src]);for(var h=0;h<a._src.length;h++){var m,x;if(a._format&&a._format[h])m=a._format[h];else{if(x=a._src[h],typeof x!="string"){a._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}m=/^data:audio\/([^;,]+);/i.exec(x),m||(m=/\.([^.]+)$/.exec(x.split("?",1)[0])),m&&(m=m[1].toLowerCase())}if(m||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),m&&t.codecs(m)){l=a._src[h];break}}if(!l){a._emit("loaderror",null,"No codec support for selected audio sources.");return}return a._src=l,a._state="loading",window.location.protocol==="https:"&&l.slice(0,5)==="http:"&&(a._html5=!0,a._webAudio=!1),new r(a),a._webAudio&&o(a),a},play:function(a,l){var h=this,m=null;if(typeof a=="number")m=a,a=null;else{if(typeof a=="string"&&h._state==="loaded"&&!h._sprite[a])return null;if(typeof a>"u"&&(a="__default",!h._playLock)){for(var x=0,p=0;p<h._sounds.length;p++)h._sounds[p]._paused&&!h._sounds[p]._ended&&(x++,m=h._sounds[p]._id);x===1?a=null:m=null}}var f=m?h._soundById(m):h._inactiveSound();if(!f)return null;if(m&&!a&&(a=f._sprite||"__default"),h._state!=="loaded"){f._sprite=a,f._ended=!1;var g=f._id;return h._queue.push({event:"play",action:function(){h.play(g)}}),g}if(m&&!f._paused)return l||h._loadQueue("play"),f._id;h._webAudio&&t._autoResume();var v=Math.max(0,f._seek>0?f._seek:h._sprite[a][0]/1e3),S=Math.max(0,(h._sprite[a][0]+h._sprite[a][1])/1e3-v),A=S*1e3/Math.abs(f._rate),T=h._sprite[a][0]/1e3,b=(h._sprite[a][0]+h._sprite[a][1])/1e3;f._sprite=a,f._ended=!1;var y=function(){f._paused=!1,f._seek=v,f._start=T,f._stop=b,f._loop=!!(f._loop||h._sprite[a][2])};if(v>=b){h._ended(f);return}var E=f._node;if(h._webAudio){var I=function(){h._playLock=!1,y(),h._refreshBuffer(f);var W=f._muted||h._muted?0:f._volume;E.gain.setValueAtTime(W,t.ctx.currentTime),f._playStart=t.ctx.currentTime,typeof E.bufferSource.start>"u"?f._loop?E.bufferSource.noteGrainOn(0,v,86400):E.bufferSource.noteGrainOn(0,v,S):f._loop?E.bufferSource.start(0,v,86400):E.bufferSource.start(0,v,S),A!==1/0&&(h._endTimers[f._id]=setTimeout(h._ended.bind(h,f),A)),l||setTimeout(function(){h._emit("play",f._id),h._loadQueue()},0)};t.state==="running"&&t.ctx.state!=="interrupted"?I():(h._playLock=!0,h.once("resume",I),h._clearTimer(f._id))}else{var C=function(){E.currentTime=v,E.muted=f._muted||h._muted||t._muted||E.muted,E.volume=f._volume*t.volume(),E.playbackRate=f._rate;try{var W=E.play();if(W&&typeof Promise<"u"&&(W instanceof Promise||typeof W.then=="function")?(h._playLock=!0,y(),W.then(function(){h._playLock=!1,E._unlocked=!0,l?h._loadQueue():h._emit("play",f._id)}).catch(function(){h._playLock=!1,h._emit("playerror",f._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),f._ended=!0,f._paused=!0})):l||(h._playLock=!1,y(),h._emit("play",f._id)),E.playbackRate=f._rate,E.paused){h._emit("playerror",f._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");return}a!=="__default"||f._loop?h._endTimers[f._id]=setTimeout(h._ended.bind(h,f),A):(h._endTimers[f._id]=function(){h._ended(f),E.removeEventListener("ended",h._endTimers[f._id],!1)},E.addEventListener("ended",h._endTimers[f._id],!1))}catch(B){h._emit("playerror",f._id,B)}};E.src==="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"&&(E.src=h._src,E.load());var U=window&&window.ejecta||!E.readyState&&t._navigator.isCocoonJS;if(E.readyState>=3||U)C();else{h._playLock=!0,h._state="loading";var k=function(){h._state="loaded",C(),E.removeEventListener(t._canPlayEvent,k,!1)};E.addEventListener(t._canPlayEvent,k,!1),h._clearTimer(f._id)}}return f._id},pause:function(a){var l=this;if(l._state!=="loaded"||l._playLock)return l._queue.push({event:"pause",action:function(){l.pause(a)}}),l;for(var h=l._getSoundIds(a),m=0;m<h.length;m++){l._clearTimer(h[m]);var x=l._soundById(h[m]);if(x&&!x._paused&&(x._seek=l.seek(h[m]),x._rateSeek=0,x._paused=!0,l._stopFade(h[m]),x._node))if(l._webAudio){if(!x._node.bufferSource)continue;typeof x._node.bufferSource.stop>"u"?x._node.bufferSource.noteOff(0):x._node.bufferSource.stop(0),l._cleanBuffer(x._node)}else(!isNaN(x._node.duration)||x._node.duration===1/0)&&x._node.pause();arguments[1]||l._emit("pause",x?x._id:null)}return l},stop:function(a,l){var h=this;if(h._state!=="loaded"||h._playLock)return h._queue.push({event:"stop",action:function(){h.stop(a)}}),h;for(var m=h._getSoundIds(a),x=0;x<m.length;x++){h._clearTimer(m[x]);var p=h._soundById(m[x]);p&&(p._seek=p._start||0,p._rateSeek=0,p._paused=!0,p._ended=!0,h._stopFade(m[x]),p._node&&(h._webAudio?p._node.bufferSource&&(typeof p._node.bufferSource.stop>"u"?p._node.bufferSource.noteOff(0):p._node.bufferSource.stop(0),h._cleanBuffer(p._node)):(!isNaN(p._node.duration)||p._node.duration===1/0)&&(p._node.currentTime=p._start||0,p._node.pause(),p._node.duration===1/0&&h._clearSound(p._node))),l||h._emit("stop",p._id))}return h},mute:function(a,l){var h=this;if(h._state!=="loaded"||h._playLock)return h._queue.push({event:"mute",action:function(){h.mute(a,l)}}),h;if(typeof l>"u")if(typeof a=="boolean")h._muted=a;else return h._muted;for(var m=h._getSoundIds(l),x=0;x<m.length;x++){var p=h._soundById(m[x]);p&&(p._muted=a,p._interval&&h._stopFade(p._id),h._webAudio&&p._node?p._node.gain.setValueAtTime(a?0:p._volume,t.ctx.currentTime):p._node&&(p._node.muted=t._muted?!0:a),h._emit("mute",p._id))}return h},volume:function(){var a=this,l=arguments,h,m;if(l.length===0)return a._volume;if(l.length===1||l.length===2&&typeof l[1]>"u"){var x=a._getSoundIds(),p=x.indexOf(l[0]);p>=0?m=parseInt(l[0],10):h=parseFloat(l[0])}else l.length>=2&&(h=parseFloat(l[0]),m=parseInt(l[1],10));var f;if(typeof h<"u"&&h>=0&&h<=1){if(a._state!=="loaded"||a._playLock)return a._queue.push({event:"volume",action:function(){a.volume.apply(a,l)}}),a;typeof m>"u"&&(a._volume=h),m=a._getSoundIds(m);for(var g=0;g<m.length;g++)f=a._soundById(m[g]),f&&(f._volume=h,l[2]||a._stopFade(m[g]),a._webAudio&&f._node&&!f._muted?f._node.gain.setValueAtTime(h,t.ctx.currentTime):f._node&&!f._muted&&(f._node.volume=h*t.volume()),a._emit("volume",f._id))}else return f=m?a._soundById(m):a._sounds[0],f?f._volume:0;return a},fade:function(a,l,h,m){var x=this;if(x._state!=="loaded"||x._playLock)return x._queue.push({event:"fade",action:function(){x.fade(a,l,h,m)}}),x;a=Math.min(Math.max(0,parseFloat(a)),1),l=Math.min(Math.max(0,parseFloat(l)),1),h=parseFloat(h),x.volume(a,m);for(var p=x._getSoundIds(m),f=0;f<p.length;f++){var g=x._soundById(p[f]);if(g){if(m||x._stopFade(p[f]),x._webAudio&&!g._muted){var v=t.ctx.currentTime,S=v+h/1e3;g._volume=a,g._node.gain.setValueAtTime(a,v),g._node.gain.linearRampToValueAtTime(l,S)}x._startFadeInterval(g,a,l,h,p[f],typeof m>"u")}}return x},_startFadeInterval:function(a,l,h,m,x,p){var f=this,g=l,v=h-l,S=Math.abs(v/.01),A=Math.max(4,S>0?m/S:m),T=Date.now();a._fadeTo=h,a._interval=setInterval(function(){var b=(Date.now()-T)/m;T=Date.now(),g+=v*b,g=Math.round(g*100)/100,v<0?g=Math.max(h,g):g=Math.min(h,g),f._webAudio?a._volume=g:f.volume(g,a._id,!0),p&&(f._volume=g),(h<l&&g<=h||h>l&&g>=h)&&(clearInterval(a._interval),a._interval=null,a._fadeTo=null,f.volume(h,a._id),f._emit("fade",a._id))},A)},_stopFade:function(a){var l=this,h=l._soundById(a);return h&&h._interval&&(l._webAudio&&h._node.gain.cancelScheduledValues(t.ctx.currentTime),clearInterval(h._interval),h._interval=null,l.volume(h._fadeTo,a),h._fadeTo=null,l._emit("fade",a)),l},loop:function(){var a=this,l=arguments,h,m,x;if(l.length===0)return a._loop;if(l.length===1)if(typeof l[0]=="boolean")h=l[0],a._loop=h;else return x=a._soundById(parseInt(l[0],10)),x?x._loop:!1;else l.length===2&&(h=l[0],m=parseInt(l[1],10));for(var p=a._getSoundIds(m),f=0;f<p.length;f++)x=a._soundById(p[f]),x&&(x._loop=h,a._webAudio&&x._node&&x._node.bufferSource&&(x._node.bufferSource.loop=h,h&&(x._node.bufferSource.loopStart=x._start||0,x._node.bufferSource.loopEnd=x._stop,a.playing(p[f])&&(a.pause(p[f],!0),a.play(p[f],!0)))));return a},rate:function(){var a=this,l=arguments,h,m;if(l.length===0)m=a._sounds[0]._id;else if(l.length===1){var x=a._getSoundIds(),p=x.indexOf(l[0]);p>=0?m=parseInt(l[0],10):h=parseFloat(l[0])}else l.length===2&&(h=parseFloat(l[0]),m=parseInt(l[1],10));var f;if(typeof h=="number"){if(a._state!=="loaded"||a._playLock)return a._queue.push({event:"rate",action:function(){a.rate.apply(a,l)}}),a;typeof m>"u"&&(a._rate=h),m=a._getSoundIds(m);for(var g=0;g<m.length;g++)if(f=a._soundById(m[g]),f){a.playing(m[g])&&(f._rateSeek=a.seek(m[g]),f._playStart=a._webAudio?t.ctx.currentTime:f._playStart),f._rate=h,a._webAudio&&f._node&&f._node.bufferSource?f._node.bufferSource.playbackRate.setValueAtTime(h,t.ctx.currentTime):f._node&&(f._node.playbackRate=h);var v=a.seek(m[g]),S=(a._sprite[f._sprite][0]+a._sprite[f._sprite][1])/1e3-v,A=S*1e3/Math.abs(f._rate);(a._endTimers[m[g]]||!f._paused)&&(a._clearTimer(m[g]),a._endTimers[m[g]]=setTimeout(a._ended.bind(a,f),A)),a._emit("rate",f._id)}}else return f=a._soundById(m),f?f._rate:a._rate;return a},seek:function(){var a=this,l=arguments,h,m;if(l.length===0)a._sounds.length&&(m=a._sounds[0]._id);else if(l.length===1){var x=a._getSoundIds(),p=x.indexOf(l[0]);p>=0?m=parseInt(l[0],10):a._sounds.length&&(m=a._sounds[0]._id,h=parseFloat(l[0]))}else l.length===2&&(h=parseFloat(l[0]),m=parseInt(l[1],10));if(typeof m>"u")return 0;if(typeof h=="number"&&(a._state!=="loaded"||a._playLock))return a._queue.push({event:"seek",action:function(){a.seek.apply(a,l)}}),a;var f=a._soundById(m);if(f)if(typeof h=="number"&&h>=0){var g=a.playing(m);g&&a.pause(m,!0),f._seek=h,f._ended=!1,a._clearTimer(m),!a._webAudio&&f._node&&!isNaN(f._node.duration)&&(f._node.currentTime=h);var v=function(){g&&a.play(m,!0),a._emit("seek",m)};if(g&&!a._webAudio){var S=function(){a._playLock?setTimeout(S,0):v()};setTimeout(S,0)}else v()}else if(a._webAudio){var A=a.playing(m)?t.ctx.currentTime-f._playStart:0,T=f._rateSeek?f._rateSeek-f._seek:0;return f._seek+(T+A*Math.abs(f._rate))}else return f._node.currentTime;return a},playing:function(a){var l=this;if(typeof a=="number"){var h=l._soundById(a);return h?!h._paused:!1}for(var m=0;m<l._sounds.length;m++)if(!l._sounds[m]._paused)return!0;return!1},duration:function(a){var l=this,h=l._duration,m=l._soundById(a);return m&&(h=l._sprite[m._sprite][1]/1e3),h},state:function(){return this._state},unload:function(){for(var a=this,l=a._sounds,h=0;h<l.length;h++)l[h]._paused||a.stop(l[h]._id),a._webAudio||(a._clearSound(l[h]._node),l[h]._node.removeEventListener("error",l[h]._errorFn,!1),l[h]._node.removeEventListener(t._canPlayEvent,l[h]._loadFn,!1),l[h]._node.removeEventListener("ended",l[h]._endFn,!1),t._releaseHtml5Audio(l[h]._node)),delete l[h]._node,a._clearTimer(l[h]._id);var m=t._howls.indexOf(a);m>=0&&t._howls.splice(m,1);var x=!0;for(h=0;h<t._howls.length;h++)if(t._howls[h]._src===a._src||a._src.indexOf(t._howls[h]._src)>=0){x=!1;break}return s&&x&&delete s[a._src],t.noAudio=!1,a._state="unloaded",a._sounds=[],a=null,null},on:function(a,l,h,m){var x=this,p=x["_on"+a];return typeof l=="function"&&p.push(m?{id:h,fn:l,once:m}:{id:h,fn:l}),x},off:function(a,l,h){var m=this,x=m["_on"+a],p=0;if(typeof l=="number"&&(h=l,l=null),l||h)for(p=0;p<x.length;p++){var f=h===x[p].id;if(l===x[p].fn&&f||!l&&f){x.splice(p,1);break}}else if(a)m["_on"+a]=[];else{var g=Object.keys(m);for(p=0;p<g.length;p++)g[p].indexOf("_on")===0&&Array.isArray(m[g[p]])&&(m[g[p]]=[])}return m},once:function(a,l,h){var m=this;return m.on(a,l,h,1),m},_emit:function(a,l,h){for(var m=this,x=m["_on"+a],p=x.length-1;p>=0;p--)(!x[p].id||x[p].id===l||a==="load")&&(setTimeout((function(f){f.call(this,l,h)}).bind(m,x[p].fn),0),x[p].once&&m.off(a,x[p].fn,x[p].id));return m._loadQueue(a),m},_loadQueue:function(a){var l=this;if(l._queue.length>0){var h=l._queue[0];h.event===a&&(l._queue.shift(),l._loadQueue()),a||h.action()}return l},_ended:function(a){var l=this,h=a._sprite;if(!l._webAudio&&a._node&&!a._node.paused&&!a._node.ended&&a._node.currentTime<a._stop)return setTimeout(l._ended.bind(l,a),100),l;var m=!!(a._loop||l._sprite[h][2]);if(l._emit("end",a._id),!l._webAudio&&m&&l.stop(a._id,!0).play(a._id),l._webAudio&&m){l._emit("play",a._id),a._seek=a._start||0,a._rateSeek=0,a._playStart=t.ctx.currentTime;var x=(a._stop-a._start)*1e3/Math.abs(a._rate);l._endTimers[a._id]=setTimeout(l._ended.bind(l,a),x)}return l._webAudio&&!m&&(a._paused=!0,a._ended=!0,a._seek=a._start||0,a._rateSeek=0,l._clearTimer(a._id),l._cleanBuffer(a._node),t._autoSuspend()),!l._webAudio&&!m&&l.stop(a._id,!0),l},_clearTimer:function(a){var l=this;if(l._endTimers[a]){if(typeof l._endTimers[a]!="function")clearTimeout(l._endTimers[a]);else{var h=l._soundById(a);h&&h._node&&h._node.removeEventListener("ended",l._endTimers[a],!1)}delete l._endTimers[a]}return l},_soundById:function(a){for(var l=this,h=0;h<l._sounds.length;h++)if(a===l._sounds[h]._id)return l._sounds[h];return null},_inactiveSound:function(){var a=this;a._drain();for(var l=0;l<a._sounds.length;l++)if(a._sounds[l]._ended)return a._sounds[l].reset();return new r(a)},_drain:function(){var a=this,l=a._pool,h=0,m=0;if(!(a._sounds.length<l)){for(m=0;m<a._sounds.length;m++)a._sounds[m]._ended&&h++;for(m=a._sounds.length-1;m>=0;m--){if(h<=l)return;a._sounds[m]._ended&&(a._webAudio&&a._sounds[m]._node&&a._sounds[m]._node.disconnect(0),a._sounds.splice(m,1),h--)}}},_getSoundIds:function(a){var l=this;if(typeof a>"u"){for(var h=[],m=0;m<l._sounds.length;m++)h.push(l._sounds[m]._id);return h}else return[a]},_refreshBuffer:function(a){var l=this;return a._node.bufferSource=t.ctx.createBufferSource(),a._node.bufferSource.buffer=s[l._src],a._panner?a._node.bufferSource.connect(a._panner):a._node.bufferSource.connect(a._node),a._node.bufferSource.loop=a._loop,a._loop&&(a._node.bufferSource.loopStart=a._start||0,a._node.bufferSource.loopEnd=a._stop||0),a._node.bufferSource.playbackRate.setValueAtTime(a._rate,t.ctx.currentTime),l},_cleanBuffer:function(a){var l=this,h=t._navigator&&t._navigator.vendor.indexOf("Apple")>=0;if(!a.bufferSource)return l;if(t._scratchBuffer&&a.bufferSource&&(a.bufferSource.onended=null,a.bufferSource.disconnect(0),h))try{a.bufferSource.buffer=t._scratchBuffer}catch{}return a.bufferSource=null,l},_clearSound:function(a){var l=/MSIE |Trident\//.test(t._navigator&&t._navigator.userAgent);l||(a.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var r=function(a){this._parent=a,this.init()};r.prototype={init:function(){var a=this,l=a._parent;return a._muted=l._muted,a._loop=l._loop,a._volume=l._volume,a._rate=l._rate,a._seek=0,a._paused=!0,a._ended=!0,a._sprite="__default",a._id=++t._counter,l._sounds.push(a),a.create(),a},create:function(){var a=this,l=a._parent,h=t._muted||a._muted||a._parent._muted?0:a._volume;return l._webAudio?(a._node=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),a._node.gain.setValueAtTime(h,t.ctx.currentTime),a._node.paused=!0,a._node.connect(t.masterGain)):t.noAudio||(a._node=t._obtainHtml5Audio(),a._errorFn=a._errorListener.bind(a),a._node.addEventListener("error",a._errorFn,!1),a._loadFn=a._loadListener.bind(a),a._node.addEventListener(t._canPlayEvent,a._loadFn,!1),a._endFn=a._endListener.bind(a),a._node.addEventListener("ended",a._endFn,!1),a._node.src=l._src,a._node.preload=l._preload===!0?"auto":l._preload,a._node.volume=h*t.volume(),a._node.load()),a},reset:function(){var a=this,l=a._parent;return a._muted=l._muted,a._loop=l._loop,a._volume=l._volume,a._rate=l._rate,a._seek=0,a._rateSeek=0,a._paused=!0,a._ended=!0,a._sprite="__default",a._id=++t._counter,a},_errorListener:function(){var a=this;a._parent._emit("loaderror",a._id,a._node.error?a._node.error.code:0),a._node.removeEventListener("error",a._errorFn,!1)},_loadListener:function(){var a=this,l=a._parent;l._duration=Math.ceil(a._node.duration*10)/10,Object.keys(l._sprite).length===0&&(l._sprite={__default:[0,l._duration*1e3]}),l._state!=="loaded"&&(l._state="loaded",l._emit("load"),l._loadQueue()),a._node.removeEventListener(t._canPlayEvent,a._loadFn,!1)},_endListener:function(){var a=this,l=a._parent;l._duration===1/0&&(l._duration=Math.ceil(a._node.duration*10)/10,l._sprite.__default[1]===1/0&&(l._sprite.__default[1]=l._duration*1e3),l._ended(a)),a._node.removeEventListener("ended",a._endFn,!1)}};var s={},o=function(a){var l=a._src;if(s[l]){a._duration=s[l].duration,d(a);return}if(/^data:[^;]+;base64,/.test(l)){for(var h=atob(l.split(",")[1]),m=new Uint8Array(h.length),x=0;x<h.length;++x)m[x]=h.charCodeAt(x);u(m.buffer,a)}else{var p=new XMLHttpRequest;p.open(a._xhr.method,l,!0),p.withCredentials=a._xhr.withCredentials,p.responseType="arraybuffer",a._xhr.headers&&Object.keys(a._xhr.headers).forEach(function(f){p.setRequestHeader(f,a._xhr.headers[f])}),p.onload=function(){var f=(p.status+"")[0];if(f!=="0"&&f!=="2"&&f!=="3"){a._emit("loaderror",null,"Failed loading audio file with status: "+p.status+".");return}u(p.response,a)},p.onerror=function(){a._webAudio&&(a._html5=!0,a._webAudio=!1,a._sounds=[],delete s[l],a.load())},c(p)}},c=function(a){try{a.send()}catch{a.onerror()}},u=function(a,l){var h=function(){l._emit("loaderror",null,"Decoding audio data failed.")},m=function(x){x&&l._sounds.length>0?(s[l._src]=x,d(l,x)):h()};typeof Promise<"u"&&t.ctx.decodeAudioData.length===1?t.ctx.decodeAudioData(a).then(m).catch(h):t.ctx.decodeAudioData(a,m,h)},d=function(a,l){l&&!a._duration&&(a._duration=l.duration),Object.keys(a._sprite).length===0&&(a._sprite={__default:[0,a._duration*1e3]}),a._state!=="loaded"&&(a._state="loaded",a._emit("load"),a._loadQueue())},_=function(){if(t.usingWebAudio){try{typeof AudioContext<"u"?t.ctx=new AudioContext:typeof webkitAudioContext<"u"?t.ctx=new webkitAudioContext:t.usingWebAudio=!1}catch{t.usingWebAudio=!1}t.ctx||(t.usingWebAudio=!1);var a=/iP(hone|od|ad)/.test(t._navigator&&t._navigator.platform),l=t._navigator&&t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),h=l?parseInt(l[1],10):null;if(a&&h&&h<9){var m=/safari/.test(t._navigator&&t._navigator.userAgent.toLowerCase());t._navigator&&!m&&(t.usingWebAudio=!1)}t.usingWebAudio&&(t.masterGain=typeof t.ctx.createGain>"u"?t.ctx.createGainNode():t.ctx.createGain(),t.masterGain.gain.setValueAtTime(t._muted?0:t._volume,t.ctx.currentTime),t.masterGain.connect(t.ctx.destination)),t._setup()}};n.Howler=t,n.Howl=i,typeof so<"u"?(so.HowlerGlobal=e,so.Howler=t,so.Howl=i,so.Sound=r):typeof window<"u"&&(window.HowlerGlobal=e,window.Howler=t,window.Howl=i,window.Sound=r)})();/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */(function(){HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(t){var i=this;if(!i.ctx||!i.ctx.listener)return i;for(var r=i._howls.length-1;r>=0;r--)i._howls[r].stereo(t);return i},HowlerGlobal.prototype.pos=function(t,i,r){var s=this;if(!s.ctx||!s.ctx.listener)return s;if(i=typeof i!="number"?s._pos[1]:i,r=typeof r!="number"?s._pos[2]:r,typeof t=="number")s._pos=[t,i,r],typeof s.ctx.listener.positionX<"u"?(s.ctx.listener.positionX.setTargetAtTime(s._pos[0],Howler.ctx.currentTime,.1),s.ctx.listener.positionY.setTargetAtTime(s._pos[1],Howler.ctx.currentTime,.1),s.ctx.listener.positionZ.setTargetAtTime(s._pos[2],Howler.ctx.currentTime,.1)):s.ctx.listener.setPosition(s._pos[0],s._pos[1],s._pos[2]);else return s._pos;return s},HowlerGlobal.prototype.orientation=function(t,i,r,s,o,c){var u=this;if(!u.ctx||!u.ctx.listener)return u;var d=u._orientation;if(i=typeof i!="number"?d[1]:i,r=typeof r!="number"?d[2]:r,s=typeof s!="number"?d[3]:s,o=typeof o!="number"?d[4]:o,c=typeof c!="number"?d[5]:c,typeof t=="number")u._orientation=[t,i,r,s,o,c],typeof u.ctx.listener.forwardX<"u"?(u.ctx.listener.forwardX.setTargetAtTime(t,Howler.ctx.currentTime,.1),u.ctx.listener.forwardY.setTargetAtTime(i,Howler.ctx.currentTime,.1),u.ctx.listener.forwardZ.setTargetAtTime(r,Howler.ctx.currentTime,.1),u.ctx.listener.upX.setTargetAtTime(s,Howler.ctx.currentTime,.1),u.ctx.listener.upY.setTargetAtTime(o,Howler.ctx.currentTime,.1),u.ctx.listener.upZ.setTargetAtTime(c,Howler.ctx.currentTime,.1)):u.ctx.listener.setOrientation(t,i,r,s,o,c);else return d;return u},Howl.prototype.init=function(t){return function(i){var r=this;return r._orientation=i.orientation||[1,0,0],r._stereo=i.stereo||null,r._pos=i.pos||null,r._pannerAttr={coneInnerAngle:typeof i.coneInnerAngle<"u"?i.coneInnerAngle:360,coneOuterAngle:typeof i.coneOuterAngle<"u"?i.coneOuterAngle:360,coneOuterGain:typeof i.coneOuterGain<"u"?i.coneOuterGain:0,distanceModel:typeof i.distanceModel<"u"?i.distanceModel:"inverse",maxDistance:typeof i.maxDistance<"u"?i.maxDistance:1e4,panningModel:typeof i.panningModel<"u"?i.panningModel:"HRTF",refDistance:typeof i.refDistance<"u"?i.refDistance:1,rolloffFactor:typeof i.rolloffFactor<"u"?i.rolloffFactor:1},r._onstereo=i.onstereo?[{fn:i.onstereo}]:[],r._onpos=i.onpos?[{fn:i.onpos}]:[],r._onorientation=i.onorientation?[{fn:i.onorientation}]:[],t.call(this,i)}}(Howl.prototype.init),Howl.prototype.stereo=function(t,i){var r=this;if(!r._webAudio)return r;if(r._state!=="loaded")return r._queue.push({event:"stereo",action:function(){r.stereo(t,i)}}),r;var s=typeof Howler.ctx.createStereoPanner>"u"?"spatial":"stereo";if(typeof i>"u")if(typeof t=="number")r._stereo=t,r._pos=[t,0,0];else return r._stereo;for(var o=r._getSoundIds(i),c=0;c<o.length;c++){var u=r._soundById(o[c]);if(u)if(typeof t=="number")u._stereo=t,u._pos=[t,0,0],u._node&&(u._pannerAttr.panningModel="equalpower",(!u._panner||!u._panner.pan)&&e(u,s),s==="spatial"?typeof u._panner.positionX<"u"?(u._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):u._panner.setPosition(t,0,0):u._panner.pan.setValueAtTime(t,Howler.ctx.currentTime)),r._emit("stereo",u._id);else return u._stereo}return r},Howl.prototype.pos=function(t,i,r,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"pos",action:function(){o.pos(t,i,r,s)}}),o;if(i=typeof i!="number"?0:i,r=typeof r!="number"?-.5:r,typeof s>"u")if(typeof t=="number")o._pos=[t,i,r];else return o._pos;for(var c=o._getSoundIds(s),u=0;u<c.length;u++){var d=o._soundById(c[u]);if(d)if(typeof t=="number")d._pos=[t,i,r],d._node&&((!d._panner||d._panner.pan)&&e(d,"spatial"),typeof d._panner.positionX<"u"?(d._panner.positionX.setValueAtTime(t,Howler.ctx.currentTime),d._panner.positionY.setValueAtTime(i,Howler.ctx.currentTime),d._panner.positionZ.setValueAtTime(r,Howler.ctx.currentTime)):d._panner.setPosition(t,i,r)),o._emit("pos",d._id);else return d._pos}return o},Howl.prototype.orientation=function(t,i,r,s){var o=this;if(!o._webAudio)return o;if(o._state!=="loaded")return o._queue.push({event:"orientation",action:function(){o.orientation(t,i,r,s)}}),o;if(i=typeof i!="number"?o._orientation[1]:i,r=typeof r!="number"?o._orientation[2]:r,typeof s>"u")if(typeof t=="number")o._orientation=[t,i,r];else return o._orientation;for(var c=o._getSoundIds(s),u=0;u<c.length;u++){var d=o._soundById(c[u]);if(d)if(typeof t=="number")d._orientation=[t,i,r],d._node&&(d._panner||(d._pos||(d._pos=o._pos||[0,0,-.5]),e(d,"spatial")),typeof d._panner.orientationX<"u"?(d._panner.orientationX.setValueAtTime(t,Howler.ctx.currentTime),d._panner.orientationY.setValueAtTime(i,Howler.ctx.currentTime),d._panner.orientationZ.setValueAtTime(r,Howler.ctx.currentTime)):d._panner.setOrientation(t,i,r)),o._emit("orientation",d._id);else return d._orientation}return o},Howl.prototype.pannerAttr=function(){var t=this,i=arguments,r,s,o;if(!t._webAudio)return t;if(i.length===0)return t._pannerAttr;if(i.length===1)if(typeof i[0]=="object")r=i[0],typeof s>"u"&&(r.pannerAttr||(r.pannerAttr={coneInnerAngle:r.coneInnerAngle,coneOuterAngle:r.coneOuterAngle,coneOuterGain:r.coneOuterGain,distanceModel:r.distanceModel,maxDistance:r.maxDistance,refDistance:r.refDistance,rolloffFactor:r.rolloffFactor,panningModel:r.panningModel}),t._pannerAttr={coneInnerAngle:typeof r.pannerAttr.coneInnerAngle<"u"?r.pannerAttr.coneInnerAngle:t._coneInnerAngle,coneOuterAngle:typeof r.pannerAttr.coneOuterAngle<"u"?r.pannerAttr.coneOuterAngle:t._coneOuterAngle,coneOuterGain:typeof r.pannerAttr.coneOuterGain<"u"?r.pannerAttr.coneOuterGain:t._coneOuterGain,distanceModel:typeof r.pannerAttr.distanceModel<"u"?r.pannerAttr.distanceModel:t._distanceModel,maxDistance:typeof r.pannerAttr.maxDistance<"u"?r.pannerAttr.maxDistance:t._maxDistance,refDistance:typeof r.pannerAttr.refDistance<"u"?r.pannerAttr.refDistance:t._refDistance,rolloffFactor:typeof r.pannerAttr.rolloffFactor<"u"?r.pannerAttr.rolloffFactor:t._rolloffFactor,panningModel:typeof r.pannerAttr.panningModel<"u"?r.pannerAttr.panningModel:t._panningModel});else return o=t._soundById(parseInt(i[0],10)),o?o._pannerAttr:t._pannerAttr;else i.length===2&&(r=i[0],s=parseInt(i[1],10));for(var c=t._getSoundIds(s),u=0;u<c.length;u++)if(o=t._soundById(c[u]),o){var d=o._pannerAttr;d={coneInnerAngle:typeof r.coneInnerAngle<"u"?r.coneInnerAngle:d.coneInnerAngle,coneOuterAngle:typeof r.coneOuterAngle<"u"?r.coneOuterAngle:d.coneOuterAngle,coneOuterGain:typeof r.coneOuterGain<"u"?r.coneOuterGain:d.coneOuterGain,distanceModel:typeof r.distanceModel<"u"?r.distanceModel:d.distanceModel,maxDistance:typeof r.maxDistance<"u"?r.maxDistance:d.maxDistance,refDistance:typeof r.refDistance<"u"?r.refDistance:d.refDistance,rolloffFactor:typeof r.rolloffFactor<"u"?r.rolloffFactor:d.rolloffFactor,panningModel:typeof r.panningModel<"u"?r.panningModel:d.panningModel};var _=o._panner;_||(o._pos||(o._pos=t._pos||[0,0,-.5]),e(o,"spatial"),_=o._panner),_.coneInnerAngle=d.coneInnerAngle,_.coneOuterAngle=d.coneOuterAngle,_.coneOuterGain=d.coneOuterGain,_.distanceModel=d.distanceModel,_.maxDistance=d.maxDistance,_.refDistance=d.refDistance,_.rolloffFactor=d.rolloffFactor,_.panningModel=d.panningModel}return t},Sound.prototype.init=function(t){return function(){var i=this,r=i._parent;i._orientation=r._orientation,i._stereo=r._stereo,i._pos=r._pos,i._pannerAttr=r._pannerAttr,t.call(this),i._stereo?r.stereo(i._stereo):i._pos&&r.pos(i._pos[0],i._pos[1],i._pos[2],i._id)}}(Sound.prototype.init),Sound.prototype.reset=function(t){return function(){var i=this,r=i._parent;return i._orientation=r._orientation,i._stereo=r._stereo,i._pos=r._pos,i._pannerAttr=r._pannerAttr,i._stereo?r.stereo(i._stereo):i._pos?r.pos(i._pos[0],i._pos[1],i._pos[2],i._id):i._panner&&(i._panner.disconnect(0),i._panner=void 0,r._refreshBuffer(i)),t.call(this)}}(Sound.prototype.reset);var e=function(t,i){i=i||"spatial",i==="spatial"?(t._panner=Howler.ctx.createPanner(),t._panner.coneInnerAngle=t._pannerAttr.coneInnerAngle,t._panner.coneOuterAngle=t._pannerAttr.coneOuterAngle,t._panner.coneOuterGain=t._pannerAttr.coneOuterGain,t._panner.distanceModel=t._pannerAttr.distanceModel,t._panner.maxDistance=t._pannerAttr.maxDistance,t._panner.refDistance=t._pannerAttr.refDistance,t._panner.rolloffFactor=t._pannerAttr.rolloffFactor,t._panner.panningModel=t._pannerAttr.panningModel,typeof t._panner.positionX<"u"?(t._panner.positionX.setValueAtTime(t._pos[0],Howler.ctx.currentTime),t._panner.positionY.setValueAtTime(t._pos[1],Howler.ctx.currentTime),t._panner.positionZ.setValueAtTime(t._pos[2],Howler.ctx.currentTime)):t._panner.setPosition(t._pos[0],t._pos[1],t._pos[2]),typeof t._panner.orientationX<"u"?(t._panner.orientationX.setValueAtTime(t._orientation[0],Howler.ctx.currentTime),t._panner.orientationY.setValueAtTime(t._orientation[1],Howler.ctx.currentTime),t._panner.orientationZ.setValueAtTime(t._orientation[2],Howler.ctx.currentTime)):t._panner.setOrientation(t._orientation[0],t._orientation[1],t._orientation[2])):(t._panner=Howler.ctx.createStereoPanner(),t._panner.pan.setValueAtTime(t._stereo,Howler.ctx.currentTime)),t._panner.connect(t._node),t._paused||t._parent.pause(t._id,!0).play(t._id,!0)}})()})(wn);const an="/audio",Bu={grass:["sfx/footstep_grass_1.mp3","sfx/footstep_grass_2.mp3","sfx/footstep_grass_3.mp3"],gravel:["sfx/footstep_gravel_1.mp3","sfx/footstep_gravel_2.mp3"],wood:["sfx/footstep_wood_1.mp3","sfx/footstep_wood_2.mp3","sfx/footstep_wood_3.mp3"],concrete:["sfx/footstep_concrete_1.mp3","sfx/footstep_concrete_2.mp3"],dirt:["sfx/footstep_dirt_1.mp3","sfx/footstep_dirt_2.mp3"],metal:["sfx/footstep_metal_1.mp3","sfx/footstep_metal_2.mp3"],leaves:["sfx/footstep_leaves_1.mp3","sfx/footstep_leaves_2.mp3","sfx/footstep_leaves_3.mp3"]},al={wind:`${an}/ambient/wind_low.mp3`,crickets:`${an}/ambient/crickets_night.mp3`,forest:`${an}/ambient/forest_deep.mp3`,heartbeat_bg:`${an}/ambient/heartbeat_faint.mp3`},_b={page_collect:`${an}/sfx/page_reveal.mp3`,monster_breath:`${an}/sfx/monster_breathing.mp3`,monster_growl:`${an}/sfx/monster_growl.mp3`,monster_scream:`${an}/sfx/monster_scream.mp3`,monster_step:`${an}/sfx/monster_footstep.mp3`,random_scare:`${an}/sfx/random_scare.mp3`,sanity_drain:`${an}/sfx/sanity_drain.mp3`,door_creak:`${an}/sfx/door_creak.mp3`,static_burst:`${an}/sfx/static_burst.mp3`};class vb{constructor(){He(this,"listenerPosition",{x:0,y:0,z:0});He(this,"ambientLayers",new Map);He(this,"loadedSfx",new Map);He(this,"footstepHowls",new Map);He(this,"lastFootstepIndex",new Map);He(this,"masterVolume",1);He(this,"sfxVolume",1);He(this,"ambientVolume",1);He(this,"initialized",!1);He(this,"randomScareTimer",null)}async init(){this.initialized||(wn.Howler.usingWebAudio=!0,wn.Howler.pos(0,0,0),wn.Howler.orientation(0,0,-1,0,1,0),await Promise.all([this.preloadSfx(),this.preloadFootsteps()]),this.startAmbientLayers(),this.startRandomScareCycle(),this.initialized=!0,console.log("[SoundManager] Initialized — darkness has ears now."))}preloadSfx(){return new Promise(e=>{const t=Object.entries(_b);let i=0;for(const[r,s]of t){const o=new wn.Howl({src:[s],preload:!0,onload:()=>{++i>=t.length&&e()},onloaderror:()=>{++i>=t.length&&e()}});this.loadedSfx.set(r,o)}t.length===0&&e()})}preloadFootsteps(){return new Promise(e=>{let t=0,i=0;for(const r of Object.values(Bu))t+=r.length;for(const r of Object.keys(Bu)){const s=Bu[r],o=[];for(const c of s){const u=new wn.Howl({src:[`${an}/${c}`],preload:!0,volume:.7,onload:()=>{++i>=t&&e()},onloaderror:()=>{++i>=t&&e()}});o.push(u)}this.footstepHowls.set(r,o),this.lastFootstepIndex.set(r,0)}t===0&&e()})}startAmbientLayers(){const e=[{id:"wind",src:al.wind,volume:.35},{id:"crickets",src:al.crickets,volume:.2,delay:2e3},{id:"forest",src:al.forest,volume:.15,delay:1e3}];for(const t of e){const i=()=>{const r=new wn.Howl({src:[t.src],loop:!0,volume:0,autoplay:!0});r.on("play",()=>r.fade(0,t.volume*this.ambientVolume,3e3)),this.ambientLayers.set(t.id,{id:t.id,howl:r,baseVolume:t.volume,currentVolume:t.volume})};t.delay?setTimeout(i,t.delay):i()}}startRandomScareCycle(){const e=()=>{const t=45e3+Math.random()*135e3;this.randomScareTimer=setTimeout(async()=>{this.playRandomAmbientScare(),e()},t)};e()}playRandomAmbientScare(){const e=[()=>this.playSfxAt("monster_breath",{volume:.3,position:this.randomNearbyPosition()}),()=>new wn.Howl({src:[`${an}/ambient/distant_scream.mp3`],volume:.4,autoplay:!0}),()=>this.playSfxAt("random_scare",{volume:.25})];e[Math.floor(Math.random()*e.length)]()}randomNearbyPosition(){const e=Math.random()*Math.PI*2,t=3+Math.random()*5;return{x:this.listenerPosition.x+Math.cos(e)*t,y:this.listenerPosition.y,z:this.listenerPosition.z+Math.sin(e)*t}}setListenerPosition(e,t){this.listenerPosition=e,wn.Howler.pos(e.x,e.y,e.z),t&&wn.Howler.orientation(t.x,t.y,t.z,0,1,0)}playSfx(e,t={}){const i=this.loadedSfx.get(e);if(!i)return console.warn(`[SoundManager] SFX "${e}" not loaded`),null;i.volume((t.volume??1)*this.sfxVolume*this.masterVolume),t.rate&&i.rate(t.rate),t.loop!==void 0&&i.loop(t.loop);const r=i.play();return t.onEnd&&i.once("end",t.onEnd,r),r}playSfxAt(e,t={}){const i=this.loadedSfx.get(e);if(!i)return null;i.volume((t.volume??1)*this.sfxVolume*this.masterVolume);const r=i.play();if(t.position){const s=t.maxDistance??20;i.pannerAttr({refDistance:1,rolloffFactor:1,maxDistance:s},r),i.pos(t.position.x,t.position.y,t.position.z,r)}return r}stopSfx(e){var t;(t=this.loadedSfx.get(e))==null||t.stop()}playFootstep(e,t=.7){const i=this.footstepHowls.get(e);if(!(i!=null&&i.length))return;const s=((this.lastFootstepIndex.get(e)??0)+1)%i.length;this.lastFootstepIndex.set(e,s);const o=i[s];o.rate(.9+Math.random()*.2),o.volume(t*this.sfxVolume*this.masterVolume),o.play()}startMonsterBreathing(e){const t=this.loadedSfx.get("monster_breath");if(!t)return;t.loop(!0),t.volume(0);const i=t.play();t.pos(e.x,e.y,e.z,i),t.pannerAttr({refDistance:1,rolloffFactor:2,maxDistance:25},i),t.fade(0,.8*this.sfxVolume,1500,i)}stopMonsterBreathing(){const e=this.loadedSfx.get("monster_breath");e&&(e.fade(.8,0,1e3),setTimeout(()=>e.stop(),1100))}updateMonsterPosition(e){const t=this.loadedSfx.get("monster_breath");t&&t.pos(e.x,e.y,e.z)}playMonsterScream(e){this.playSfxAt("monster_scream",{volume:1,position:e,maxDistance:50})}playMonsterFootstep(e){this.playSfxAt("monster_step",{volume:.9,position:e,maxDistance:30})}setMonsterProximity(e){const t=this.ambientLayers.get("wind");if(t){const r=t.baseVolume*(1-e*.5);t.howl.fade(t.currentVolume,r,500),t.currentVolume=r}const i=this.ambientLayers.get("heartbeat");if(i){const r=Math.min(e*.6,.6);i.howl.fade(i.currentVolume,r,500),i.currentVolume=r}}startHeartbeatAmbient(){if(this.ambientLayers.has("heartbeat"))return;const e=new wn.Howl({src:[al.heartbeat_bg],loop:!0,volume:0,autoplay:!0});this.ambientLayers.set("heartbeat",{id:"heartbeat",howl:e,baseVolume:.5,currentVolume:0})}stopHeartbeatAmbient(){const e=this.ambientLayers.get("heartbeat");e&&(e.howl.fade(e.currentVolume,0,1e3),setTimeout(()=>{e.howl.stop(),this.ambientLayers.delete("heartbeat")},1100))}onPageCollected(){this.playSfx("page_collect",{volume:.9})}onMonsterSpotted(){this.playSfx("monster_growl",{volume:1}),this.startHeartbeatAmbient()}onPlayerDeath(){this.stopAllAmbient(),this.playSfx("monster_scream",{volume:1})}onPuzzleSolved(){this.playSfx("sanity_drain",{volume:.4,rate:.8}),this.stopHeartbeatAmbient()}onDoorCreak(){this.playSfx("door_creak",{volume:.85,rate:.8+Math.random()*.4})}setMasterVolume(e){this.masterVolume=Math.max(0,Math.min(1,e)),wn.Howler.volume(this.masterVolume)}setSfxVolume(e){this.sfxVolume=Math.max(0,Math.min(1,e))}setAmbientVolume(e){this.ambientVolume=Math.max(0,Math.min(1,e));for(const[,t]of this.ambientLayers)t.howl.volume(t.baseVolume*this.ambientVolume)}stopAllAmbient(){for(const[,e]of this.ambientLayers)e.howl.fade(e.currentVolume,0,800),setTimeout(()=>e.howl.stop(),900);this.ambientLayers.clear()}destroy(){this.randomScareTimer!==null&&clearTimeout(this.randomScareTimer),this.stopAllAmbient();for(const[,e]of this.loadedSfx)e.unload();wn.Howler.unload(),this.initialized=!1}}const xb=new vb,Vt=xb,yb=({event:n,onComplete:e})=>{const[t,i]=Ne.useState({active:!1,intensity:0,type:null,phase:null}),r=Ne.useRef(null);if(Ne.useEffect(()=>{if(!n)return;r.current&&clearTimeout(r.current);const{intensity:o,type:c}=n;return c==="monster_close"||c==="player_scream"?Vt.playSfx("monster_growl",{volume:o}):Vt.playSfx("sanity_drain",{volume:o*.6}),i({active:!0,intensity:o,type:c,phase:"flash"}),c==="monster_close"||c==="player_scream"?r.current=setTimeout(()=>{i(u=>({...u,phase:"image"})),r.current=setTimeout(()=>{i(u=>({...u,phase:"fading"})),r.current=setTimeout(()=>{i({active:!1,intensity:0,type:null,phase:null}),e()},500*o)},300*o)},50):r.current=setTimeout(()=>{i(u=>({...u,phase:"fading"})),r.current=setTimeout(()=>{i({active:!1,intensity:0,type:null,phase:null}),e()},300)},100+o*300),()=>{r.current&&clearTimeout(r.current)}},[n]),!t.active)return null;const s=t.phase==="fading"?0:t.phase==="image"?.7:t.intensity;return j.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,pointerEvents:"none",transition:t.phase==="fading"?"opacity 0.5s":"none",opacity:t.phase==="fading"?0:1},children:[j.jsx("div",{style:{position:"absolute",inset:0,background:t.type==="ambient"?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.95)",opacity:s}}),(t.phase==="image"||t.phase==="flash")&&(t.type==="monster_close"||t.type==="player_scream")&&j.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:t.phase==="image"?1:.5},children:j.jsx(Sb,{intensity:t.intensity})}),j.jsx("div",{style:{position:"absolute",inset:0,background:`radial-gradient(ellipse at center, transparent 30%, rgba(200,0,0,${t.intensity*.4}) 100%)`}}),t.intensity>.5&&j.jsx(Mb,{}),t.type==="ambient"&&j.jsx("div",{style:{position:"absolute",bottom:"40%",width:"100%",textAlign:"center",color:"rgba(255,50,50,0.6)",fontSize:"14px",letterSpacing:"4px",fontFamily:"Courier New"},children:Eb()})]})},Sb=({intensity:n})=>j.jsxs("div",{style:{position:"relative",width:`${300+n*400}px`,height:`${500+n*600}px`,display:"flex",flexDirection:"column",alignItems:"center",filter:`blur(${(1-n)*3}px)`},children:[j.jsx("div",{style:{width:"180px",height:"240px",borderRadius:"50% 50% 45% 45% / 60% 60% 40% 40%",boxShadow:`0 0 ${n*60}px rgba(100,0,0,0.8)`,background:"radial-gradient(ellipse at center, #110000 0%, #000000 70%)"}}),j.jsx("div",{style:{width:"100px",height:"300px",background:"#030303",marginTop:"-20px",clipPath:"polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",boxShadow:`0 0 ${n*40}px rgba(50,0,0,0.5)`}}),[-1,1].map(e=>j.jsx("div",{style:{position:"absolute",top:"100px",[e<0?"left":"right"]:"-150px",width:"200px",height:"12px",background:"#040404",transform:`rotate(${e*15}deg)`,transformOrigin:e<0?"right center":"left center",borderRadius:"6px"}},e))]}),Mb=()=>{const n=bg.useRef(null);return Ne.useEffect(()=>{const e=n.current;if(!e)return;const t=e.getContext("2d");if(!t)return;e.width=window.innerWidth,e.height=window.innerHeight;let i;const r=()=>{const s=t.createImageData(e.width,e.height),o=s.data;for(let c=0;c<o.length;c+=4){const u=Math.random()*50;o[c]=u,o[c+1]=0,o[c+2]=0,o[c+3]=Math.random()*100}t.putImageData(s,0,0),i=requestAnimationFrame(r)};return r(),()=>cancelAnimationFrame(i)},[]),j.jsx("canvas",{ref:n,style:{position:"absolute",inset:0,opacity:.3,mixBlendMode:"screen"}})},mg=["IT KNOWS WHERE YOU ARE","DO NOT LOOK BEHIND YOU","YOU CANNOT ESCAPE","IT IS WATCHING","RUN","NOWHERE TO HIDE"];function Eb(){return mg[Math.floor(Math.random()*mg.length)]}const wb=({puzzle:n,onClose:e})=>{const[t,i]=Ne.useState(""),[r,s]=Ne.useState(null),[o,c]=Ne.useState(!1);if(Ne.useEffect(()=>{n||(i(""),s(null))},[n]),!n)return null;const u=()=>{n.type==="code"?bt.sendPuzzleInteract(n.id,t):bt.sendPuzzleInteract(n.id);const a=bt.getSocket();a&&a.once("puzzle_result",l=>{s(l.message),l.success?setTimeout(()=>e(),1500):(c(!0),setTimeout(()=>c(!1),500))})},d=()=>{switch(n.type){case"switch":return"⚡";case"code":return"🔢";case"lever":return"🔧";case"pressure_plate":return"👥";default:return"❓"}},_=()=>{switch(n.type){case"switch":return"ELECTRICAL SWITCH";case"code":return"ACCESS TERMINAL";case"lever":return"MECHANISM";case"pressure_plate":return"PRESSURE PLATE";default:return"PUZZLE"}};return j.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,fontFamily:"Courier New, monospace"},onClick:a=>a.stopPropagation(),children:[j.jsxs("div",{style:{background:"rgba(10,10,15,0.95)",border:"1px solid rgba(255,50,50,0.3)",borderRadius:"4px",padding:"32px",maxWidth:"400px",width:"90%",boxShadow:"0 0 40px rgba(255,0,0,0.2)",animation:o?"shake 0.5s":"none"},children:[j.jsx("div",{style:{fontSize:"32px",textAlign:"center",marginBottom:"8px"},children:d()}),j.jsx("h2",{style:{color:"#cc2222",fontSize:"14px",letterSpacing:"4px",textAlign:"center",marginBottom:"4px",textShadow:"0 0 10px rgba(200,0,0,0.5)"},children:_()}),n.solved?j.jsx("div",{style:{textAlign:"center",color:"#44ff44",marginTop:"16px",letterSpacing:"2px"},children:"✓ SOLVED"}):j.jsxs(j.Fragment,{children:[j.jsx("p",{style:{color:"rgba(255,255,255,0.5)",fontSize:"11px",letterSpacing:"1px",textAlign:"center",margin:"16px 0"},children:n.rewardDescription}),n.requiresPlayers>1&&j.jsxs("div",{style:{background:"rgba(255,150,0,0.1)",border:"1px solid rgba(255,150,0,0.3)",borderRadius:"3px",padding:"8px 12px",marginBottom:"16px",fontSize:"11px",color:"rgba(255,150,0,0.8)",letterSpacing:"1px",textAlign:"center"},children:["⚠ REQUIRES ",n.requiresPlayers," PLAYERS",j.jsx("br",{}),j.jsxs("span",{style:{color:"rgba(255,255,255,0.4)"},children:[n.activatedBy.length,"/",n.requiresPlayers," present"]})]}),n.type==="code"&&j.jsx("div",{style:{marginBottom:"16px"},children:j.jsx("input",{type:"text",value:t,onChange:a=>i(a.target.value.slice(0,4)),placeholder:"_ _ _ _",maxLength:4,style:{width:"100%",background:"rgba(0,0,0,0.7)",border:"1px solid rgba(255,50,50,0.4)",color:"#ff4444",fontSize:"24px",padding:"12px",letterSpacing:"16px",textAlign:"center",fontFamily:"Courier New",borderRadius:"3px",outline:"none"},onKeyDown:a=>{a.key==="Enter"&&u(),a.key==="Escape"&&e()},autoFocus:!0})}),r&&j.jsx("div",{style:{padding:"8px",marginBottom:"12px",textAlign:"center",fontSize:"11px",letterSpacing:"1px",color:r.includes("REWARD")||r.includes("SUCCESS")?"#44ff44":"#ff4444",borderTop:"1px solid rgba(255,50,50,0.2)",paddingTop:"12px"},children:r}),j.jsxs("div",{style:{display:"flex",gap:"12px"},children:[j.jsx("button",{onClick:u,style:{flex:1,background:"rgba(150,0,0,0.3)",border:"1px solid rgba(255,50,50,0.5)",color:"#ff6666",padding:"12px",cursor:"pointer",fontSize:"11px",letterSpacing:"2px",fontFamily:"Courier New",borderRadius:"3px",transition:"all 0.2s"},onMouseEnter:a=>a.currentTarget.style.background="rgba(200,0,0,0.4)",onMouseLeave:a=>a.currentTarget.style.background="rgba(150,0,0,0.3)",children:"ACTIVATE"}),j.jsx("button",{onClick:e,style:{background:"rgba(30,30,40,0.8)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.4)",padding:"12px 20px",cursor:"pointer",fontSize:"11px",letterSpacing:"2px",fontFamily:"Courier New",borderRadius:"3px"},children:"[ESC]"})]})]})]}),j.jsx("style",{children:`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `})]})},Tb=({myPlayerId:n})=>{const[e,t]=Ne.useState(!1),[i,r]=Ne.useState(null),[s,o]=Ne.useState([]),c=Ne.useRef(null),u=Ne.useRef(null),d=Ne.useRef(null);Ne.useRef(new Map);const _=Ne.useRef(!1);Ne.useEffect(()=>(a(),()=>x()),[]),Ne.useEffect(()=>{const f=bt.getSocket();if(f)return f.on(ht.VOICE_RECEIVE,g=>{m(g.senderId,g.audioData,g.volume)}),()=>{f.off(ht.VOICE_RECEIVE)}},[]);const a=async()=>{try{d.current=new AudioContext}catch{r("Web Audio not supported")}},l=async()=>{try{const f=await navigator.mediaDevices.getUserMedia({audio:!0,video:!1});u.current=f;const g=new MediaRecorder(f,{mimeType:"audio/webm;codecs=opus",audioBitsPerSecond:16e3});c.current=g,_.current=!0,g.ondataavailable=async v=>{if(v.data.size>0&&_.current){const S=await v.data.arrayBuffer();bt.sendVoiceData(S)}},g.start(100),t(!0)}catch(f){r("Microphone access denied"),console.error("Voice chat error:",f)}},h=()=>{var f,g,v;_.current=!1,((f=c.current)==null?void 0:f.state)!=="inactive"&&((g=c.current)==null||g.stop()),(v=u.current)==null||v.getTracks().forEach(S=>S.stop()),t(!1)},m=async(f,g,v)=>{if(d.current)try{const S=await d.current.decodeAudioData(g.slice(0)),A=d.current.createBufferSource(),T=d.current.createGain();T.gain.value=Math.min(1,v*1.5),A.buffer=S,A.connect(T),T.connect(d.current.destination),A.start(),o(b=>b.includes(f)?b:[...b,f]),A.onended=()=>{o(b=>b.filter(y=>y!==f))}}catch{}},x=()=>{var f;h(),(f=d.current)==null||f.close()},p=f=>{f&&!e?l():!f&&e&&h()};return j.jsxs("div",{className:"voice-chat-ui",style:{position:"fixed",bottom:"80px",left:"20px",zIndex:200,pointerEvents:"auto"},children:[i&&j.jsxs("div",{style:{color:"#ff4444",fontSize:"11px",marginBottom:"8px"},children:["⚠ ",i]}),j.jsx("button",{onMouseDown:()=>p(!0),onMouseUp:()=>p(!1),onTouchStart:()=>p(!0),onTouchEnd:()=>p(!1),style:{background:e?"rgba(255,50,50,0.3)":"rgba(0,0,0,0.5)",border:`1px solid ${e?"rgba(255,50,50,0.8)":"rgba(255,255,255,0.2)"}`,color:e?"#ff4444":"rgba(255,255,255,0.5)",padding:"8px 16px",fontSize:"10px",letterSpacing:"2px",cursor:"pointer",fontFamily:"Courier New",textTransform:"uppercase",borderRadius:"3px",transition:"all 0.1s",boxShadow:e?"0 0 10px rgba(255,50,50,0.5)":"none"},children:e?"🎙 TRANSMITTING":"[V] PUSH TO TALK"}),s.length>0&&j.jsx("div",{style:{marginTop:"6px",fontSize:"10px",color:"rgba(255,255,255,0.4)",letterSpacing:"1px"},children:s.map(f=>j.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[j.jsx("span",{style:{color:"#44ff88",animation:"pulse 0.5s infinite"},children:"▶"}),j.jsxs("span",{children:[f.slice(0,6),"..."]})]},f))}),j.jsx("div",{style:{marginTop:"4px",fontSize:"9px",color:"rgba(255,255,255,0.2)",letterSpacing:"1px"},children:"PROXIMITY CHAT — 25M RANGE"})]})},Ab=()=>{const n=Ne.useRef(null),e=Ne.useRef(null),t=Ne.useRef(0),[i,r]=Ne.useState(bt.getState()),[s,o]=Ne.useState(null),[c,u]=Ne.useState(null),[d,_]=Ne.useState(null),[a,l]=Ne.useState(!1),h=Ne.useRef(null);Ne.useEffect(()=>bt.subscribe(f=>{r(f)}),[]),Ne.useEffect(()=>{const p=bt.getSocket();if(p)return p.on(ht.JUMPSCARE,f=>{var g;o(f),l(!0),(g=e.current)==null||g.applyScreenShake(f.intensity),f.type==="monster_close"?Vt.onMonsterSpotted():f.type==="puzzle_fail"?Vt.playSfx("sanity_drain",{volume:.7}):Vt.playSfx("sanity_drain",{volume:f.intensity*.5})}),p.on(ht.AMBIENT_EVENT,f=>{f.type==="whisper"&&Vt.playSfx("sanity_drain",{volume:.3})}),p.on(ht.PLAYER_SCREAMED,f=>{const g=Math.max(.1,1-f.distance/20);Vt.playSfx("monster_scream",{volume:g*.6})}),p.on(ht.GAME_OVER,()=>{Vt.onPlayerDeath()}),()=>{p.off(ht.JUMPSCARE),p.off(ht.AMBIENT_EVENT),p.off(ht.PLAYER_SCREAMED),p.off(ht.GAME_OVER)}},[i.isConnected]),Ne.useEffect(()=>{if(i.phase!==Bn.PLAYING||!n.current||e.current)return;Vt.init();const p=new gb(n.current);e.current=p,p.setupPages(i.pages),p.setupPuzzles(i.puzzles),p.onMove=(v,S,A,T)=>{bt.sendPlayerMove({x:v.x,y:v.y,z:v.z},S,A,T),Vt.setListenerPosition({x:v.x,y:v.y,z:v.z},{x:Math.sin(S),y:0,z:Math.cos(S)})},p.onCollectPage=v=>{bt.sendCollectPage(v),p.markPageCollected(v),Vt.onPageCollected()},p.onPuzzleInteract=v=>{const S=i.puzzles.find(A=>A.id===v);S&&!S.solved&&u(S)},p.onLookingAtMonster=v=>{bt.sendLookingAtMonster(v)},p.onFootstep=()=>{Vt.playFootstep("grass")};const f=()=>{t.current=requestAnimationFrame(f);const v=bt.getState();if(v.monster){p.updateMonster(v.monster);const T=v.monsterDistance;if(T<30){const b=1-T/30;Vt.setMonsterProximity(b),Vt.updateMonsterPosition({x:v.monster.position.x,y:0,z:v.monster.position.z}),T<15&&h.current===null&&(Vt.startHeartbeatAmbient(),h.current=setInterval(()=>{bt.getState().monsterDistance>20&&(Vt.stopHeartbeatAmbient(),h.current&&(clearInterval(h.current),h.current=null))},2e3))}else h.current&&(clearInterval(h.current),h.current=null,Vt.stopHeartbeatAmbient()),Vt.setMonsterProximity(0)}const S=v.myPlayer,A=p.update(S);_(A),v.players&&v.playerId&&p.updateOtherPlayers(v.players,v.playerId)};f();const g=()=>p.onResize();return window.addEventListener("resize",g),()=>{cancelAnimationFrame(t.current),window.removeEventListener("resize",g),p.destroy(),e.current=null,h.current&&clearInterval(h.current)}},[i.phase]),Ne.useEffect(()=>{!e.current||i.phase!==Bn.PLAYING||(i.pages.forEach(p=>{var f;p.collected&&((f=e.current)==null||f.markPageCollected(p.id))}),i.puzzles.forEach(p=>{var f;(f=e.current)==null||f.updatePuzzle(p.id,p.solved),(c==null?void 0:c.id)===p.id&&u(p)}))},[i.pages,i.puzzles]);const m=Ne.useCallback(()=>{o(null),l(!1)},[]),x=()=>{const p=i.monsterDistance;return p<10?"#ff0000":p<20?"#ff6600":p<35?"#ffaa00":"transparent"};return i.phase!==Bn.PLAYING?null:j.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh"},children:[j.jsx("canvas",{ref:n,style:{position:"absolute",inset:0,width:"100%",height:"100%",filter:a?"contrast(1.2) saturate(0.8)":"none"}}),j.jsx("div",{style:{position:"fixed",inset:0,background:"radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",pointerEvents:"none",zIndex:50}}),j.jsx("div",{style:{position:"fixed",inset:0,border:`3px solid ${x()}`,pointerEvents:"none",zIndex:51,opacity:i.monsterDistance<35?.5:0,transition:"opacity 0.3s"}}),j.jsx("div",{className:"crosshair"}),j.jsx("div",{className:"hud hud-top",children:j.jsxs("div",{children:[j.jsxs("div",{style:{color:"rgba(255,255,255,0.7)",fontSize:"16px",letterSpacing:"2px"},children:["PAGES: ",i.pagesCollected," / ",i.totalPages]}),j.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"6px"},children:Array.from({length:i.totalPages},(p,f)=>j.jsx("div",{style:{width:"10px",height:"10px",border:"1px solid rgba(255,255,255,0.4)",borderRadius:"50%",background:f<i.pagesCollected?"white":"transparent",boxShadow:f<i.pagesCollected?"0 0 5px white":"none"}},f))})]})}),j.jsx("div",{className:"player-list",children:Array.from(i.players.values()).map(p=>j.jsxs("div",{className:`player-item ${p.isAlive?"":"player-dead"}`,children:[j.jsx("div",{className:"player-color-dot",style:{background:p.color}}),j.jsxs("span",{style:{fontSize:"11px",letterSpacing:"1px"},children:[p.name.slice(0,10)," (",p.pagesCollected,")"]}),!p.isAlive&&j.jsx("span",{style:{color:"#ff4444",fontSize:"10px"},children:"✗"})]},p.id))}),i.myPlayer&&j.jsxs("div",{className:"stamina-bar-container",children:[j.jsx("div",{className:"stamina-label",children:"STAMINA"}),j.jsx("div",{className:"stamina-bar",children:j.jsx("div",{className:"stamina-fill",style:{width:`${i.myPlayer.stamina}%`}})})]}),j.jsxs("div",{style:{position:"fixed",bottom:"60px",right:"20px",fontSize:"9px",color:"rgba(255,255,255,0.2)",letterSpacing:"1px",textAlign:"right",lineHeight:"1.6",pointerEvents:"none",zIndex:100},children:["WASD — MOVE | SHIFT — SPRINT",j.jsx("br",{}),"F — FLASHLIGHT | E — INTERACT",j.jsx("br",{}),"CLICK — CAPTURE MOUSE"]}),d&&j.jsx("div",{className:"interaction-prompt",children:d}),j.jsx(yb,{event:s,onComplete:m}),j.jsx(wb,{puzzle:c,onClose:()=>u(null)}),j.jsx(Tb,{myPlayerId:i.playerId})]})},bb=()=>{const[n,e]=Ne.useState(bt.getState()),[t,i]=Ne.useState("title"),[r,s]=Ne.useState(""),[o,c]=Ne.useState(""),[u,d]=Ne.useState(!1);Ne.useEffect(()=>(bt.connect(),bt.subscribe(p=>{e(p),p.phase===Bn.PLAYING?i("game"):p.phase===Bn.GAME_OVER?i("gameover"):p.phase===Bn.WIN?i("win"):p.roomId&&p.phase===Bn.LOBBY&&i("room")})),[]);const _=async()=>{if(!r.trim())return;d(!0);const x=await bt.createRoom(o||`Room_${Math.random().toString(36).slice(2,6)}`);x&&bt.joinRoom(x,r),d(!1)},a=x=>{r.trim()&&bt.joinRoom(x,r)},l=()=>{n.roomId&&bt.startGame(n.roomId)},h=()=>{bt.fetchRooms()},m=()=>{i("title")};if(t==="game")return j.jsx(Ab,{});if(t==="gameover")return j.jsx(Eo,{children:j.jsxs("div",{style:{textAlign:"center"},children:[j.jsx("div",{style:{fontSize:"80px",marginBottom:"20px"},children:"💀"}),j.jsx("h1",{style:{color:"#cc0000",fontSize:"48px",letterSpacing:"8px",textShadow:"0 0 20px rgba(200,0,0,0.8)",marginBottom:"16px"},children:"IT FOUND YOU"}),j.jsxs("p",{style:{color:"rgba(255,255,255,0.4)",letterSpacing:"3px",fontSize:"14px"},children:[n.pagesCollected," of ",n.totalPages," pages collected"]}),j.jsx("button",{onClick:m,style:vs,children:"TRY AGAIN"})]})});if(t==="win")return j.jsx(Eo,{children:j.jsxs("div",{style:{textAlign:"center"},children:[j.jsx("div",{style:{fontSize:"80px",marginBottom:"20px"},children:"📄"}),j.jsx("h1",{style:{color:"#44ff44",fontSize:"36px",letterSpacing:"6px",textShadow:"0 0 20px rgba(0,255,0,0.5)",marginBottom:"16px"},children:"YOU ESCAPED"}),j.jsxs("p",{style:{color:"rgba(255,255,255,0.4)",letterSpacing:"3px",fontSize:"12px",marginBottom:"8px"},children:["All ",n.totalPages," pages collected"]}),j.jsx("p",{style:{color:"rgba(255,255,255,0.2)",letterSpacing:"2px",fontSize:"11px"},children:"But it will be waiting next time..."}),j.jsx("button",{onClick:m,style:vs,children:"PLAY AGAIN"})]})});if(t==="room"&&n.roomId){const x=n.playerId,p=n.players.size>0&&Array.from(n.players.keys())[0]===x;return j.jsx(Eo,{children:j.jsxs("div",{style:{width:"500px"},children:[j.jsxs("h2",{style:{color:"#cc2222",fontSize:"14px",letterSpacing:"4px",marginBottom:"4px"},children:["ROOM: ",n.roomName]}),j.jsxs("div",{style:{color:"rgba(255,255,255,0.3)",fontSize:"10px",letterSpacing:"2px",marginBottom:"24px"},children:[n.players.size,"/4 PLAYERS — WAITING..."]}),j.jsxs("div",{style:{background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,50,50,0.2)",borderRadius:"4px",padding:"16px",marginBottom:"24px"},children:[Array.from(n.players.values()).map((f,g)=>j.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:g<n.players.size-1?"1px solid rgba(255,255,255,0.05)":"none"},children:[j.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:f.color,boxShadow:`0 0 6px ${f.color}`}}),j.jsx("span",{style:{color:"rgba(255,255,255,0.7)",letterSpacing:"1px",fontSize:"13px"},children:f.name}),g===0&&j.jsx("span",{style:{color:"#ffaa00",fontSize:"10px",marginLeft:"auto"},children:"HOST"})]},f.id)),n.players.size<4&&j.jsx("div",{style:{padding:"8px 0",color:"rgba(255,255,255,0.15)",fontSize:"11px",letterSpacing:"2px"},children:Array.from({length:4-n.players.size},(f,g)=>j.jsx("div",{children:"— EMPTY SLOT —"},g))})]}),j.jsxs("div",{style:{background:"rgba(100,0,0,0.1)",border:"1px solid rgba(255,50,50,0.1)",borderRadius:"3px",padding:"12px 16px",marginBottom:"24px",fontSize:"11px",color:"rgba(255,255,255,0.4)",letterSpacing:"1px",lineHeight:"1.8"},children:["⚠ Collect all 8 pages to escape",j.jsx("br",{}),"⚠ Cooperative puzzles require multiple players",j.jsx("br",{}),"⚠ Do not let it find you alone",j.jsx("br",{}),"⚠ Proximity voice chat enabled"]}),j.jsx("div",{style:{display:"flex",gap:"12px"},children:p?j.jsx("button",{onClick:l,disabled:n.players.size<1,style:{...vs,flex:1,opacity:n.players.size<1?.4:1},children:"BEGIN THE HUNT"}):j.jsx("div",{style:{flex:1,textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:"12px",letterSpacing:"2px",padding:"12px"},children:"WAITING FOR HOST..."})})]})})}return t==="lobby"?j.jsx(Eo,{children:j.jsxs("div",{style:{width:"500px"},children:[j.jsx("button",{onClick:m,style:{background:"none",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:"11px",letterSpacing:"2px",marginBottom:"24px",fontFamily:"Courier New"},children:"← BACK"}),j.jsxs("div",{style:{marginBottom:"24px"},children:[j.jsx("label",{style:Pb,children:"YOUR NAME"}),j.jsx("input",{value:r,onChange:x=>s(x.target.value),placeholder:"Enter name...",style:gg,maxLength:16})]}),j.jsxs("div",{style:{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,50,50,0.2)",borderRadius:"4px",padding:"16px",marginBottom:"20px"},children:[j.jsx("h3",{style:{color:"#cc2222",fontSize:"11px",letterSpacing:"3px",marginBottom:"12px"},children:"CREATE ROOM"}),j.jsx("input",{value:o,onChange:x=>c(x.target.value),placeholder:"Room name (optional)",style:{...gg,marginBottom:"12px"},maxLength:20}),j.jsx("button",{onClick:_,disabled:!r.trim()||u,style:{...vs,width:"100%",opacity:r.trim()?1:.4},children:u?"CREATING...":"CREATE NEW ROOM"})]}),j.jsxs("div",{children:[j.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"},children:[j.jsx("h3",{style:{color:"#cc2222",fontSize:"11px",letterSpacing:"3px"},children:"JOIN ROOM"}),j.jsx("button",{onClick:h,style:{background:"none",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.3)",cursor:"pointer",padding:"4px 10px",fontSize:"9px",letterSpacing:"1px",fontFamily:"Courier New"},children:"↻ REFRESH"})]}),n.availableRooms.length===0?j.jsxs("div",{style:{padding:"20px",textAlign:"center",color:"rgba(255,255,255,0.2)",fontSize:"11px",letterSpacing:"2px",border:"1px solid rgba(255,255,255,0.05)",borderRadius:"4px"},children:["NO ROOMS AVAILABLE",j.jsx("br",{}),j.jsx("span",{style:{fontSize:"9px"},children:"Create a room to begin"})]}):j.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:n.availableRooms.map(x=>j.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,50,50,0.15)",borderRadius:"3px"},children:[j.jsxs("div",{children:[j.jsx("div",{style:{color:"rgba(255,255,255,0.7)",fontSize:"13px",letterSpacing:"1px"},children:x.name}),j.jsxs("div",{style:{color:"rgba(255,255,255,0.3)",fontSize:"10px",marginTop:"2px"},children:[x.players,"/",x.maxPlayers," players"]})]}),j.jsx("button",{onClick:()=>a(x.id),disabled:!r.trim(),style:{...vs,padding:"8px 16px",fontSize:"10px",opacity:r.trim()?1:.4},children:"JOIN"})]},x.id))})]})]})}):j.jsx(Eo,{children:j.jsx(Rb,{onPlay:()=>i("lobby")})})},Rb=({onPlay:n})=>{const[e,t]=Ne.useState(!1);return Ne.useEffect(()=>{const i=setInterval(()=>{t(!0),setTimeout(()=>t(!1),150)},4e3+Math.random()*3e3);return()=>clearInterval(i)},[]),j.jsxs("div",{style:{textAlign:"center"},children:[j.jsx("div",{style:{position:"fixed",inset:0,background:"radial-gradient(ellipse at center bottom, rgba(10,20,5,0.8) 0%, rgba(0,0,0,1) 70%)",pointerEvents:"none"}}),j.jsxs("div",{style:{position:"relative",zIndex:1},children:[j.jsx("div",{style:{fontSize:"60px",marginBottom:"16px",opacity:.7},children:"🌲"}),j.jsx("h1",{style:{fontSize:"72px",fontWeight:"bold",letterSpacing:"8px",color:e?"#ff0000":"#ffffff",textShadow:e?"3px 0 #ff0000, -3px 0 #0000ff, 0 0 20px rgba(255,0,0,0.8)":"0 0 30px rgba(255,255,255,0.2)",marginBottom:"8px",fontFamily:"Courier New, monospace",transform:e?`translateX(${Math.random()*6-3}px)`:"none",transition:e?"none":"color 0.3s"},children:"THE HOLLOW MAN"}),j.jsx("div",{style:{color:"rgba(255,50,50,0.6)",fontSize:"12px",letterSpacing:"6px",marginBottom:"48px",textShadow:"0 0 10px rgba(255,0,0,0.3)"},children:"A MULTIPLAYER HORROR EXPERIENCE"}),j.jsxs("div",{style:{color:"rgba(255,255,255,0.15)",fontSize:"11px",letterSpacing:"3px",lineHeight:"2",marginBottom:"48px",maxWidth:"400px",margin:"0 auto 48px"},children:["Eight pages. One night.",j.jsx("br",{}),"It has no face. It has no mercy.",j.jsx("br",{}),"No one who enters the forest alone returns."]}),j.jsx("button",{onClick:n,style:{...vs,fontSize:"16px",padding:"16px 48px"},children:"ENTER THE FOREST"}),j.jsx("div",{style:{marginTop:"24px",color:"rgba(255,255,255,0.1)",fontSize:"9px",letterSpacing:"2px"},children:"HEADPHONES RECOMMENDED — FOR MAXIMUM TERROR"})]})]})},Eo=({children:n})=>j.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",position:"relative"},children:[j.jsx("div",{style:{position:"fixed",inset:0,background:"radial-gradient(ellipse at 20% 50%, rgba(40,0,0,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,0,20,0.4) 0%, transparent 60%)",pointerEvents:"none"}}),j.jsx(Cb,{}),j.jsx("div",{style:{position:"relative",zIndex:10},children:n})]}),Cb=()=>j.jsx("div",{style:{position:"fixed",bottom:0,left:0,right:0,height:"40vh",pointerEvents:"none"},children:[...Array(20)].map((n,e)=>j.jsx("div",{style:{position:"absolute",bottom:0,left:`${e*5.5+Math.random()*3}%`,width:`${8+Math.random()*15}px`,height:`${100+Math.random()*200}px`,background:`rgba(0,0,0,${.8+Math.random()*.2})`,clipPath:"polygon(50% 0%, 0% 100%, 100% 100%)"}},e))}),vs={background:"rgba(80,0,0,0.4)",border:"1px solid rgba(200,0,0,0.5)",color:"#cc2222",padding:"12px 32px",fontSize:"13px",letterSpacing:"3px",fontFamily:"Courier New, monospace",cursor:"pointer",textTransform:"uppercase",borderRadius:"3px",transition:"all 0.2s",boxShadow:"0 0 15px rgba(150,0,0,0.2)",marginTop:"16px"},Pb={display:"block",color:"rgba(255,255,255,0.3)",fontSize:"10px",letterSpacing:"3px",marginBottom:"8px",textTransform:"uppercase"},gg={width:"100%",background:"rgba(0,0,0,0.6)",border:"1px solid rgba(255,50,50,0.3)",color:"rgba(255,255,255,0.8)",padding:"10px 14px",fontSize:"13px",fontFamily:"Courier New, monospace",letterSpacing:"1px",borderRadius:"3px",outline:"none"};zu.createRoot(document.getElementById("root")).render(j.jsx(bg.StrictMode,{children:j.jsx(bb,{})}));
