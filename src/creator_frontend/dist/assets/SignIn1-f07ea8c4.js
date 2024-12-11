import{r as v,u as M,j as a,B as j,R as J,a as W,C as D,N as E}from"./index-43d0fa9b.js";import{F as K,c as V,a as k}from"./index.esm-4e84dfba.js";import{c as w}from"./index-d5840571.js";import{A as H}from"./index-3d4166f6.js";import{A as P}from"./Alert-294d6ed2.js";import{R as A,C as T}from"./Row-fefb1cc1.js";import"./CloseButton-102e4345.js";var O={},X=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,r=[],n=0;n<t.rangeCount;n++)r.push(t.getRangeAt(n));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||r.forEach(function(o){t.addRange(o)}),e&&e.focus()}},Y=X,I={"text/plain":"Text","text/html":"Url",default:"Text"},G="Copy to clipboard: #{key}, Enter";function Q(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function Z(t,e){var r,n,o,s,c,i,f=!1;e||(e={}),r=e.debug||!1;try{o=Y(),s=document.createRange(),c=document.getSelection(),i=document.createElement("span"),i.textContent=t,i.ariaHidden="true",i.style.all="unset",i.style.position="fixed",i.style.top=0,i.style.clip="rect(0, 0, 0, 0)",i.style.whiteSpace="pre",i.style.webkitUserSelect="text",i.style.MozUserSelect="text",i.style.msUserSelect="text",i.style.userSelect="text",i.addEventListener("copy",function(d){if(d.stopPropagation(),e.format)if(d.preventDefault(),typeof d.clipboardData>"u"){r&&console.warn("unable to use e.clipboardData"),r&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var l=I[e.format]||I.default;window.clipboardData.setData(l,t)}else d.clipboardData.clearData(),d.clipboardData.setData(e.format,t);e.onCopy&&(d.preventDefault(),e.onCopy(d.clipboardData))}),document.body.appendChild(i),s.selectNodeContents(i),c.addRange(s);var g=document.execCommand("copy");if(!g)throw new Error("copy command was unsuccessful");f=!0}catch(d){r&&console.error("unable to copy using execCommand: ",d),r&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),f=!0}catch(l){r&&console.error("unable to copy using clipboardData: ",l),r&&console.error("falling back to prompt"),n=Q("message"in e?e.message:G),window.prompt(n,t)}}finally{c&&(typeof c.removeRange=="function"?c.removeRange(s):c.removeAllRanges()),i&&document.body.removeChild(i),o()}return f}var ee=Z;function S(t){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(t)}Object.defineProperty(O,"__esModule",{value:!0});O.CopyToClipboard=void 0;var x=z(v),te=z(ee),re=["text","onCopy","options","children"];function z(t){return t&&t.__esModule?t:{default:t}}function U(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),r.push.apply(r,n)}return r}function L(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?U(Object(r),!0).forEach(function(n){R(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function ne(t,e){if(t==null)return{};var r=ae(t,e),n,o;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(o=0;o<s.length;o++)n=s[o],!(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}function ae(t,e){if(t==null)return{};var r={},n=Object.keys(t),o,s;for(s=0;s<n.length;s++)o=n[s],!(e.indexOf(o)>=0)&&(r[o]=t[o]);return r}function oe(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function B(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function ie(t,e,r){return e&&B(t.prototype,e),r&&B(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function se(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&N(t,e)}function N(t,e){return N=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},N(t,e)}function le(t){var e=ue();return function(){var n=C(t),o;if(e){var s=C(this).constructor;o=Reflect.construct(n,arguments,s)}else o=n.apply(this,arguments);return ce(this,o)}}function ce(t,e){if(e&&(S(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return q(t)}function q(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ue(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},C(t)}function R(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var F=function(t){se(r,t);var e=le(r);function r(){var n;oe(this,r);for(var o=arguments.length,s=new Array(o),c=0;c<o;c++)s[c]=arguments[c];return n=e.call.apply(e,[this].concat(s)),R(q(n),"onClick",function(i){var f=n.props,g=f.text,d=f.onCopy,l=f.children,y=f.options,u=x.default.Children.only(l),p=(0,te.default)(g,y);d&&d(g,p),u&&u.props&&typeof u.props.onClick=="function"&&u.props.onClick(i)}),n}return ie(r,[{key:"render",value:function(){var o=this.props;o.text,o.onCopy,o.options;var s=o.children,c=ne(o,re),i=x.default.Children.only(s);return x.default.cloneElement(i,L(L({},c),{},{onClick:this.onClick}))}}]),r}(x.default.PureComponent);O.CopyToClipboard=F;R(F,"defaultProps",{onCopy:void 0,options:void 0});var de=O,_=de.CopyToClipboard;_.CopyToClipboard=_;var $=_;const fe=()=>{M();const[t,e]=v.useState(""),[r,n]=v.useState(!0),[o,s]=v.useState(!1),[c,i]=v.useState(null),f=async()=>{try{(await w.getAdmins()).length===0&&(await w.addAdmin(2580,"admin","admin","admin123"),console.log("Default admin added: Username: admin, Password: admin123"))}catch(l){console.error("Error initializing default admin:",l),e("An error occurred while initializing the system. Please try again later.")}finally{n(!1)}};v.useEffect(()=>{f(),H.create().then(l=>{i(l)})},[]);const g=async(l,{setSubmitting:y})=>{e(""),s(!0);try{const{username:u,password:p}=l,m=await w.adminLogin(u,p),h=await w.clientLogin(u,p);if(m&&m.length>0){const b={id:parseInt(m[0].id),role:"admin"};localStorage.setItem("user",JSON.stringify(b)),window.location.href=`${window.location.origin}/admin/dashboard`}else if(h&&h.length>0){const b={id:h[0].id.toString(),role:"client"};localStorage.setItem("user",JSON.stringify(b)),window.location.href=`${window.location.origin}/client/dashboard`}else e("Invalid credentials. Please try again.")}catch(u){console.error("Login error:",u),e("An error occurred during login. Please try again later.")}finally{y(!1),s(!1)}},d=async()=>{if(!c)return;const l=void 0;await new Promise(m=>{c.login({identityProvider:l,onSuccess:()=>m(void 0)})});const u=c.getIdentity().getPrincipal();console.log(u.toString());const p=await w.getClientByPrincipal(u);if(console.log(p),p){const m={id:p[0].id.toString(),role:"client"};localStorage.setItem("user",JSON.stringify(m)),window.location.href=`${window.location.origin}/client/dashboard`}else e("You are not a registered client.")};return a.jsx(K,{initialValues:{username:"",password:"",submit:null},validationSchema:V().shape({username:k().required("Username is required"),password:k().required("Password is required")}),onSubmit:g,children:({errors:l,handleBlur:y,handleChange:u,handleSubmit:p,isSubmitting:m,touched:h,values:b})=>a.jsxs("form",{noValidate:!0,onSubmit:p,children:[t&&a.jsx(P,{variant:"danger",children:t}),r?a.jsx(P,{variant:"info",children:"Checking system initialization..."}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"form-group mb-3",children:[a.jsx("input",{className:"form-control",name:"username",onBlur:y,onChange:u,type:"text",value:b.username,placeholder:"Enter Username"}),h.username&&l.username&&a.jsx("small",{className:"text-danger form-text",children:l.username})]}),a.jsxs("div",{className:"form-group mb-4",children:[a.jsx("input",{className:"form-control",name:"password",onBlur:y,onChange:u,type:"password",value:b.password,placeholder:"Enter Password"}),h.password&&l.password&&a.jsx("small",{className:"text-danger form-text",children:l.password})]}),a.jsx(A,{children:a.jsx(T,{children:a.jsx(j,{className:"btn-block mb-4",variant:"primary",disabled:m||o,type:"submit",children:m||o?"Logging in...":"Sign In"})})}),a.jsx(A,{children:a.jsx(T,{children:a.jsx(j,{className:"btn-block mb-4",variant:"secondary",onClick:d,disabled:o,children:o?"Logging in...":"Sign in with Internet Identity"})})})]})]})})},we=()=>a.jsxs(J.Fragment,{children:[a.jsx(W,{}),a.jsx("div",{className:"auth-wrapper",children:a.jsxs("div",{className:"auth-content",children:[a.jsxs("div",{className:"auth-bg",children:[a.jsx("span",{className:"r"}),a.jsx("span",{className:"r s"}),a.jsx("span",{className:"r s"}),a.jsx("span",{className:"r"})]}),a.jsx(D,{className:"borderless text-center",children:a.jsxs(D.Body,{children:[a.jsxs("div",{className:"mb-4",children:[a.jsx("h3",{children:"creator"}),a.jsx("i",{className:"feather icon-unlock auth-icon"})]}),a.jsx(fe,{}),a.jsxs("p",{className:"mb-2 text-muted",children:["Forgot password?"," ",a.jsx(E,{to:"#",className:"f-w-400",children:"Reset"})]}),a.jsxs("p",{className:"mb-0 text-muted",children:["Don’t have an account?"," ",a.jsx(E,{to:"/auth/signup",className:"f-w-400",children:"Signup"})]}),a.jsxs(P,{variant:"primary",className:"text-start mt-3",children:["User:",a.jsx($.CopyToClipboard,{text:"admin",children:a.jsxs(j,{variant:"outline-primary",className:"badge mx-2 mb-2",size:"sm",children:[a.jsx("i",{className:"fa fa-user"})," admin"]})}),a.jsx("br",{}),"Password:",a.jsx($.CopyToClipboard,{text:"admin123",children:a.jsxs(j,{variant:"outline-primary",className:"badge mx-2",size:"sm",children:[a.jsx("i",{className:"fa fa-lock"})," admin123"]})})]})]})})]})})]});export{we as default};