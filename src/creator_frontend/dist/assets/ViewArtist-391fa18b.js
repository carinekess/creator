import{r as a,u as l,j as s,R as o,B as h,C as e}from"./index-43d0fa9b.js";import{c as x}from"./index-d5840571.js";import{R as j,C as m}from"./Row-fefb1cc1.js";import{T as p}from"./Table-ed804b5b.js";const v=()=>{const[i,c]=a.useState([]),n=l();a.useEffect(()=>{(async()=>{try{const t=await x.getArtists();c(t)}catch(t){console.error("Failed to fetch artists:",t)}})()},[]);const d=()=>{n("/admin/AddArtist")};return s.jsx(o.Fragment,{children:s.jsx(j,{children:s.jsxs(m,{children:[s.jsx(h,{variant:"primary",onClick:d,className:"mb-3",children:"Add Artist"}),s.jsxs(e,{children:[s.jsxs(e.Header,{children:[s.jsx(e.Title,{as:"h5",children:"Artists Table"}),s.jsx("span",{className:"d-block m-t-5",children:"List of all artists available in the system."})]}),s.jsx(e.Body,{children:s.jsxs(p,{responsive:!0,hover:!0,striped:!0,children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"#"}),s.jsx("th",{children:"Name"}),s.jsx("th",{children:"Bio"})," "]})}),s.jsx("tbody",{children:i.length>0?i.map((r,t)=>s.jsxs("tr",{children:[" ",s.jsx("th",{scope:"row",children:t+1}),s.jsx("td",{children:r.name}),s.jsx("td",{children:r.bio})," "]},r.artist_id)):s.jsx("tr",{children:s.jsx("td",{colSpan:"3",className:"text-center",children:"No artists found"})})})]})})]})]})})})};export{v as default};