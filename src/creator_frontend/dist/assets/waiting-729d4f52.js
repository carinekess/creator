import{b as S,r as c,u as R,j as e,R as b,a as D,C as g,B as T}from"./index-43d0fa9b.js";import{c as j}from"./index-d5840571.js";import{g as E,a as k}from"./hdev_payment-357b68b9.js";import{R as A,C}from"./Row-fefb1cc1.js";import{S as _}from"./Spinner-c61f8477.js";import{A as p}from"./Alert-294d6ed2.js";import"./CloseButton-102e4345.js";const W=()=>{const{tx_ref:t}=S(),[d,h]=c.useState("pending"),[x,m]=c.useState(""),[y,v]=c.useState(!0),[i,w]=c.useState(null),u=R();c.useEffect(()=>{const o=async()=>{try{const s=await E(t);if(s){w(s);const l=s.status,n=s.tx_id,f=s.tx_ref,a=s.amount,r="Artwork Purchaser",P=s.tel;l==="success"?await j.updatePaymentStatus(t,n,"success")?(h("success"),await N(r,P,n,a,t),setTimeout(()=>u(`/receipt/${t}/view`),2e3)):m("Failed to update payment status."):l==="failed"?(await j.updatePaymentStatus(t,n,"failed"),h("failed")):setTimeout(o,5e3)}else m("Payment response not found.")}catch{m("Failed to retrieve payment status.")}finally{v(!1)}};o()},[t,u]);const N=async(o,s,l,n,f)=>{const a=new FormData;a.append("sender_id","L7-IT"),a.append("ref","sms"),a.append("message",`Dear ${o}, your payment for the artwork has been received. Transaction ID: ${l}, Transaction reference: ${f}, Amount: ${n} Rwf. Thank you!`),a.append("tel",s);try{const r=await k.post("https://sms-api.hdev.rw/v1/api/HDEV-36691687-9144-4e4c-b769-62443d655e15-ID/HDEV-2a1749da-be37-4421-b982-81f10cc53301-KEY",a,{headers:{"Content-Type":"multipart/form-data"}});console.log("Message sent successfully:",r.data)}catch(r){console.error("Error sending message:",r)}};return e.jsxs(b.Fragment,{children:[e.jsx(D,{}),e.jsx("div",{className:"auth-wrapper",children:e.jsxs("div",{className:"auth-content",children:[e.jsxs("div",{className:"auth-bg",children:[e.jsx("span",{className:"r"}),e.jsx("span",{className:"r s"}),e.jsx("span",{className:"r s"}),e.jsx("span",{className:"r"})]}),e.jsx(g,{className:"borderless",children:e.jsx(A,{className:"align-items-center",children:e.jsx(C,{children:e.jsxs(g.Body,{className:"text-center",children:[y&&e.jsx(_,{animation:"border",variant:"primary"}),x&&e.jsx(p,{variant:"danger",children:x}),d==="pending"&&e.jsxs(e.Fragment,{children:[e.jsx("h4",{children:"Waiting for payment confirmation..."}),i&&e.jsxs("div",{className:"payment-details",children:[e.jsx("h5",{children:"Payment Details:"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Transaction Reference:"})," ",i.tx_ref]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Amount:"})," ",i.amount]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone Number:"})," ",i.tel]})]})]}),d==="success"&&e.jsx(p,{variant:"success",children:"Payment successful! Redirecting..."}),d==="failed"&&e.jsxs(p,{variant:"danger",children:["Payment failed.",e.jsx(T,{onClick:()=>u("/client/view-artworks"),className:"ml-2",children:"Try Again"})]})]})})})})]})})]})};export{W as default};