import React, { useState, useEffect } from 'react';
import { Card, Table, Alert, Spinner } from 'react-bootstrap';
import { creator_backend } from 'declarations/creator_backend';

const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const my_user = JSON.parse(storedUser);

        if (!my_user) {
          setErrorMessage('No logged-in user found. Please log in.');
          setLoading(false);
          return;
        }

        // Fetch payments for the logged-in client
        const paymentsList = await creator_backend.getPaymentsByClient(Number(my_user.id));

        // Map payments to include artwork details
        const paymentsWithArtworkDetails = await Promise.all(
          paymentsList.map(async (payment) => {
            const artworkDetails = await creator_backend.getArtworkDetails(Number(payment.artwork_id));
            return {
              ...payment,
              artwork_title: artworkDetails ? artworkDetails.title : 'Unknown Artwork', // Fallback in case artwork is not found
              artist_name: artworkDetails ? artworkDetails.artist_name : 'Unknown Artist',
            };
          })
        );

        setPayments(paymentsWithArtworkDetails);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
        setErrorMessage('Could not fetch payments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
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
        <Card>
          <Card.Header>
            <Card.Title as="h5">My Payments</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Artwork Title</th>
                  <th>Artist Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={payment.payment_id}>
                      <th scope="row">{index + 1}</th>
                      <td>{payment.artwork_title}</td> {/* Displaying artwork title */}
                      <td>{payment.artist_name}</td> {/* Displaying artist name */}
                      <td>{Number(payment.amount).toLocaleString()} Frw</td>
                      <td>{new Date(payment.date).toLocaleDateString()}</td>
                      <td>{payment.payment_status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default MyPayments;
