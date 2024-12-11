import{b as _,r as s,j as t,C as a}from"./index-43d0fa9b.js";import{c as d}from"./index-d5840571.js";import{S as L}from"./Spinner-c61f8477.js";import{A as T}from"./Alert-294d6ed2.js";import{T as D}from"./Table-ed804b5b.js";import"./CloseButton-102e4345.js";const I=()=>{const{artwork_id:o}=_(),[l,p]=s.useState([]),[n,y]=s.useState(null),[f,g]=s.useState({}),[w,P]=s.useState(0),[h,b]=s.useState(null),[k,x]=s.useState(!0),[j,m]=s.useState(null);return s.useEffect(()=>{(async()=>{x(!0),m(null);try{const i=await d.getPaymentsByArtwork(Number(o));p(i);const A=i.filter(r=>r.payment_status==="success").reduce((r,N)=>r+Number(N.amount),0);P(A);const c=await d.getArtworkDetails(Number(o));if(y(c[0]),c[0]){const r=await d.getArtistById(c[0].artist_id);b(r[0])}const S=await d.getPayers(),u={};S.forEach(r=>{u[r.id]=r.name}),g(u)}catch(i){console.error("Failed to fetch payments or artwork details:",i),m("Failed to load data. Please try again later.")}finally{x(!1)}})()},[o]),t.jsx("div",{children:k?t.jsx(L,{animation:"border",variant:"primary"}):j?t.jsx(T,{variant:"danger",children:j}):t.jsxs(t.Fragment,{children:[n?t.jsxs(a,{className:"mb-4",children:[t.jsxs(a.Header,{children:[t.jsx(a.Title,{as:"h5",children:n.title}),t.jsx("span",{className:"d-block m-t-5",children:n.description})]}),t.jsxs(a.Body,{children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Price:"})," ",Number(n.price).toLocaleString()]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Date Created:"})," ",n.date_created]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Artist:"})," ",h?h.name:"Loading artist..."]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Total Raised Amount:"})," ",w.toLocaleString()]})]})]}):t.jsx("p",{children:"Loading artwork details..."}),t.jsxs(a,{children:[t.jsx(a.Header,{children:t.jsxs(a.Title,{as:"h5",children:["Payments for ",n?n.title:"..."]})}),t.jsx(a.Body,{children:t.jsxs(D,{responsive:!0,hover:!0,striped:!0,children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"#"}),t.jsx("th",{children:"Payer Name"}),t.jsx("th",{children:"Payer ID"}),t.jsx("th",{children:"Amount"}),t.jsx("th",{children:"Date"}),t.jsx("th",{children:"Payment Status"}),t.jsx("th",{children:"Phone Number"}),t.jsx("th",{children:"Transaction ID"})," ",t.jsx("th",{children:"Transaction Reference"})," "]})}),t.jsx("tbody",{children:l.length>0?l.map((e,i)=>t.jsxs("tr",{children:[t.jsx("th",{scope:"row",children:i+1}),t.jsx("td",{children:f[e.client_id]||"Unknown"})," ",t.jsx("td",{children:Number(e.client_id).toLocaleString()}),t.jsx("td",{children:Number(e.amount).toLocaleString()}),t.jsx("td",{children:e.date}),t.jsx("td",{children:e.payment_status}),t.jsx("td",{children:e.phone_number}),t.jsx("td",{children:e.tx_id})," ",t.jsx("td",{children:e.tx_ref})," "]},e.payment_id)):t.jsx("tr",{children:t.jsx("td",{colSpan:"9",className:"text-center",children:"No payments found for this artwork."})})})]})})]})]})})};export{I as default};
