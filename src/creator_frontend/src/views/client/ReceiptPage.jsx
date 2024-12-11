import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { creator_backend } from 'declarations/creator_backend'; // Import the backend
import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb'; // Import Breadcrumb

const ReceiptPage = () => {
  const { tx_ref } = useParams(); // Get transaction reference from the URL
  const [payment, setPayment] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [client, setClient] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        // Fetch all payments, artworks, and clients
        const payments = await creator_backend.getAllPayments();
        const artworks = await creator_backend.getArtworks();
        const clients = await creator_backend.getClients();

        // Find the payment by tx_ref
        const foundPayment = payments.find(p => p.tx_ref === tx_ref);

        if (foundPayment) {
          setPayment(foundPayment);

          // Find the associated artwork
          const foundArtwork = artworks.find(a => a.artwork_id === foundPayment.artwork_id);
          setArtwork(foundArtwork);

          // Find the associated client
          const foundClient = clients.find(c => c.id === foundPayment.client_id);
          setClient(foundClient);
        } else {
          setErrorMessage('Payment not found.');
        }
      } catch (error) {
        setErrorMessage('Failed to retrieve payment details.');
      }
    };

    fetchPaymentDetails();
  }, [tx_ref]);

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
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
            ${errorMessage ? `<p class="text-danger">${errorMessage}</p>` : ''}
            ${payment ? `
              <table>
                <tr>
                  <th>Transaction Reference</th>
                  <td>${payment.tx_ref}</td>
                </tr>
                <tr>
                  <th>Amount</th>
                  <td>${parseFloat(payment.amount).toFixed(2)} Frw</td>
                </tr>
                <tr>
                  <th>Client Phone Number</th>
                  <td>${client ? client.phone_number : 'N/A'}</td>
                </tr>
                <tr>
                  <th>Payment Status</th>
                  <td>${payment.payment_status}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>${new Date(payment.date).toLocaleString()}</td>
                </tr>
              </table>
              ${artwork ? `
                <h5>Artwork Details</h5>
                <table>
                  <tr>
                    <th>Artwork Title</th>
                    <td>${artwork.title}</td>
                  </tr>
                  <tr>
                    <th>Artwork Description</th>
                    <td>${artwork.description}</td>
                  </tr>
                  <tr>
                    <th>Artist Name</th>
                    <td>${artwork.artist_name}</td>
                  </tr>
                </table>
              ` : ''}
              ${client ? `
                <h5>Client Details</h5>
                <table>
                  <tr>
                    <th>Client Name</th>
                    <td>${client.name}</td>
                  </tr>
                  <tr>
                    <th>Client Phone Number</th>
                    <td>${client.phone_number}</td>
                  </tr>
                </table>
              ` : ''}
              <h5>Thank you for your purchase!</h5>
            ` : ''}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Receipt</Card.Title>
              <span className="d-block m-t-5">Details of your payment for artwork.</span>
            </Card.Header>
            <Card.Body>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              {payment && (
                <div>
                  <Table responsive hover striped>
                    <tbody>
                      <tr>
                        <th>Transaction Reference</th>
                        <td>{payment.tx_ref}</td>
                      </tr>
                      <tr>
                        <th>Amount</th>
                        <td>{parseFloat(payment.amount).toFixed(2)} Frw</td>
                      </tr>
                      <tr>
                        <th>Client Phone Number</th>
                        <td>{client ? client.phone_number : 'N/A'}</td>
                      </tr>
                      <tr>
                        <th>Payment Status</th>
                        <td>{payment.payment_status}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{new Date(payment.date).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </Table>

                  {artwork && (
                    <div>
                      <h5>Artwork Details</h5>
                      <Table responsive hover striped>
                        <tbody>
                          <tr>
                            <th>Artwork Title</th>
                            <td>{artwork.title}</td>
                          </tr>
                          <tr>
                            <th>Artwork Description</th>
                            <td>{artwork.description}</td>
                          </tr>
                          <tr>
                            <th>Artist Name</th>
                            <td>{artwork.artist_name}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}

                  {client && (
                    <div>
                      <h5>Client Details</h5>
                      <Table responsive hover striped>
                        <tbody>
                          <tr>
                            <th>Client Name</th>
                            <td>{client.name}</td>
                          </tr>
                          <tr>
                            <th>Client Phone Number</th>
                            <td>{client.phone_number}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              )}
              <Button variant="primary" onClick={handlePrint}>Print Receipt</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ReceiptPage;
