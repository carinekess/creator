import React, { useState, useEffect } from 'react';
import { Card, Table, Alert, Spinner, Button } from 'react-bootstrap';
import { creator_backend } from 'declarations/creator_backend';
import { Link } from 'react-router-dom'; // Import Link for navigation

const MyPayments = () => {
  const [payments, setPayments] = useState([]); // Changed to payments
  const [clientInfo, setClientInfo] = useState(null); // Changed to client info
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPaymentsWithArtworks = async () => {
      setLoading(true); // Start loading
      setErrorMessage(''); // Reset error message
      try {
        const storedUser = localStorage.getItem('user');
        const my_user = JSON.parse(storedUser);

        if (!my_user) {
          setErrorMessage('No logged-in user found. Please log in.');
          setLoading(false);
          return;
        }

        // Fetch client info for the logged-in user
        const clientData = await creator_backend.getClientById(Number(my_user.id));
        if (clientData) {
          setClientInfo(clientData[0]); // Set the client information
        }

        // Fetch payments for the logged-in client
        const paymentsList = await creator_backend.getPaymentsByClient(Number(my_user.id));

        // Fetch the artwork details for each payment
        const paymentsWithArtworks = await Promise.all(
          paymentsList.map(async (payment) => {
            const artworkDetails = await creator_backend.getArtworkDetails(Number(payment.artwork_id));
            return {
              ...payment,
              artwork_name: artworkDetails ? `${artworkDetails[0].artwork_id} - ${artworkDetails[0].title}` : 'Unknown Artwork', // Fallback in case artwork is not found
            };
          })
        );

        setPayments(paymentsWithArtworks);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
        setErrorMessage('Could not fetch payments. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchPaymentsWithArtworks();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : errorMessage ? (
        <Alert variant="danger" className="text-center">{errorMessage}</Alert>
      ) : (
        <div>
          {clientInfo && (
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">Logged in Client Info</Card.Title>
              </Card.Header>
              <Card.Body>
                <p><strong>Name:</strong> {clientInfo.name}</p>
                <p><strong>Username:</strong> {clientInfo.username}</p>
                <p><strong>Phone Number:</strong> {clientInfo.phone_number}</p>
              </Card.Body>
            </Card>
          )}

          <Card>
            <Card.Header>
              <Card.Title as="h5">Recent Payments</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Artwork Name</th>
                    <th>Amount (Frw)</th>
                    <th>Date</th>
                    <th>Payment Status</th>
                    <th>Transaction ID</th> {/* New column for Transaction ID */}
                    <th>Transaction Reference</th> {/* New column for Transaction Reference */}
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments
                      .slice(-3) // Get the last 3 payments
                      .map((payment, index) => (
                        <tr key={payment.payment_id}>
                          <th scope="row">{index + 1}</th>
                          <td>{payment.artwork_name}</td> {/* Displaying artwork name */}
                          <td>{Number(payment.amount).toLocaleString()} Frw</td>
                          <td>{new Date(payment.date).toLocaleDateString()}</td>
                          <td>{payment.payment_status}</td>
                          <td>{payment.tx_id}</td> {/* Display Transaction ID */}
                          <td>{payment.tx_ref}</td> {/* Display Transaction Reference */}
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No payments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* "View More" Button */}
              <div className="text-center">
                <Link to="/client/mypayments">
                  <Button variant="primary">View More</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyPayments;
