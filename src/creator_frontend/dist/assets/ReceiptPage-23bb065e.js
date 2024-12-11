import{b as A,r as i,j as t,R as _,C as l,B as C}from"./index-43d0fa9b.js";import{c}from"./index-d5840571.js";import{R as P,C as $}from"./Row-fefb1cc1.js";import{T as x}from"./Table-ed804b5b.js";const F=()=>{const{tx_ref:m}=A(),[e,u]=i.useState(null),[n,f]=i.useState(null),[r,y]=i.useState(null),[d,p]=i.useState("");i.useEffect(()=>{(async()=>{try{const j=await c.getAllPayments(),w=await c.getArtworks(),k=await c.getClients(),a=j.find(o=>o.tx_ref===m);if(a){u(a);const o=w.find(h=>h.artwork_id===a.artwork_id);f(o);const g=k.find(h=>h.id===a.client_id);y(g)}else p("Payment not found.")}catch{p("Failed to retrieve payment details.")}})()},[m]);const b=()=>{const s=window.open("","_blank");s.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h3, h5 { text-align: center; }
            .receipt { width: 80%; margin: auto; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
              .receipt { width: 100%; }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <h3>Artwork Receipt</h3>
            ${d?`<p class="text-danger">${d}</p>`:""}
            ${e?`
              <table>
                <tr>
                  <th>Transaction Reference</th>
                  <td>${e.tx_ref}</td>
                </tr>
                <tr>
                  <th>Amount</th>
                  <td>${parseFloat(e.amount).toFixed(2)} Frw</td>
                </tr>
                <tr>
                  <th>Client Phone Number</th>
                  <td>${r?r.phone_number:"N/A"}</td>
                </tr>
                <tr>
                  <th>Payment Status</th>
                  <td>${e.payment_status}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>${new Date(e.date).toLocaleString()}</td>
                </tr>
              </table>
              ${n?`
                <h5>Artwork Details</h5>
                <table>
                  <tr>
                    <th>Artwork Title</th>
                    <td>${n.title}</td>
                  </tr>
                  <tr>
                    <th>Artwork Description</th>
                    <td>${n.description}</td>
                  </tr>
                  <tr>
                    <th>Artist Name</th>
                    <td>${n.artist_name}</td>
                  </tr>
                </table>
              `:""}
              ${r?`
                <h5>Client Details</h5>
                <table>
                  <tr>
                    <th>Client Name</th>
                    <td>${r.name}</td>
                  </tr>
                  <tr>
                    <th>Client Phone Number</th>
                    <td>${r.phone_number}</td>
                  </tr>
                </table>
              `:""}
              <h5>Thank you for your purchase!</h5>
            `:""}
          </div>
        </body>
      </html>
    `),s.document.close(),s.print(),s.close()};return t.jsx(_.Fragment,{children:t.jsx(P,{children:t.jsx($,{children:t.jsxs(l,{children:[t.jsxs(l.Header,{children:[t.jsx(l.Title,{as:"h5",children:"Receipt"}),t.jsx("span",{className:"d-block m-t-5",children:"Details of your payment for artwork."})]}),t.jsxs(l.Body,{children:[d&&t.jsx("p",{className:"text-danger",children:d}),e&&t.jsxs("div",{children:[t.jsx(x,{responsive:!0,hover:!0,striped:!0,children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("th",{children:"Transaction Reference"}),t.jsx("td",{children:e.tx_ref})]}),t.jsxs("tr",{children:[t.jsx("th",{children:"Amount"}),t.jsxs("td",{children:[parseFloat(e.amount).toFixed(2)," Frw"]})]}),t.jsxs("tr",{children:[t.jsx("th",{children:"Client Phone Number"}),t.jsx("td",{children:r?r.phone_number:"N/A"})]}),t.jsxs("tr",{children:[t.jsx("th",{children:"Payment Status"}),t.jsx("td",{children:e.payment_status})]}),t.jsxs("tr",{children:[t.jsx("th",{children:"Date"}),t.jsx("td",{children:new Date(e.date).toLocaleString()})]})]})}),n&&t.jsxs("div",{children:[t.jsx("h5",{children:"Artwork Details"}),t.jsx(x,{responsive:!0,hover:!0,striped:!0,children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("th",{children:"Artwork Title"}),t.jsx("td",{children:n.title})]}),t.jsxs("tr",{children:[t.jsx("th",{children:"Artwork Description"}),t.jsx("td",{children:n.description})]}),t.jsxs("tr",{children:[t.jsx("th",{children:"Artist Name"}),t.jsx("td",{children:n.artist_name})]})]})})]}),r&&t.jsxs("div",{children:[t.jsx("h5",{children:"Client Details"}),t.jsx(x,{responsive:!0,hover:!0,striped:!0,children:t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("th",{children:"Client Name"}),t.jsx("td",{children:r.name})]}),t.jsxs("tr",{children:[t.jsx("th",{children:"Client Phone Number"}),t.jsx("td",{children:r.phone_number})]})]})})]})]}),t.jsx(C,{variant:"primary",onClick:b,children:"Print Receipt"})]})]})})})})};export{F as default};
