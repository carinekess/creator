import{r as o,p as c,j as n,s as d,t as w,A as L,D as E,f as R}from"./index-43d0fa9b.js";import{C as b,F as N}from"./CloseButton-102e4345.js";const x=w("h4");x.displayName="DivStyledAsH4";const C=o.forwardRef(({className:a,bsPrefix:e,as:r=x,...s},t)=>(e=c(e,"alert-heading"),n.jsx(r,{ref:t,className:d(a,e),...s})));C.displayName="AlertHeading";const D=C,j=o.forwardRef(({className:a,bsPrefix:e,as:r=L,...s},t)=>(e=c(e,"alert-link"),n.jsx(r,{ref:t,className:d(a,e),...s})));j.displayName="AlertLink";const B=j,k=o.forwardRef((a,e)=>{const{bsPrefix:r,show:s=!0,closeLabel:t="Close alert",closeVariant:v,className:y,children:g,variant:m="primary",onClose:f,dismissible:u,transition:p=N,...A}=E(a,{show:"onClose"}),l=c(r,"alert"),H=R($=>{f&&f(!1,$)}),i=p===!0?N:p,h=n.jsxs("div",{role:"alert",...i?void 0:A,ref:e,className:d(y,l,m&&`${l}-${m}`,u&&`${l}-dismissible`),children:[u&&n.jsx(b,{onClick:H,"aria-label":t,variant:v}),g]});return i?n.jsx(i,{unmountOnExit:!0,...A,ref:void 0,in:s,children:h}):s?h:null});k.displayName="Alert";const S=Object.assign(k,{Link:B,Heading:D});export{S as A};