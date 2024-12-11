import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Table, Spinner, Alert } from 'react-bootstrap';
import { creator_backend } from 'declarations/creator_backend';

const ArtworkPayments = () => {
  const { artwork_id } = useParams(); // Get artwork_id from URL parameters
  const [payments, setPayments] = useState([]);
  const [artwork, setArtwork] = useState(null);
  const [payersMap, setPayersMap] = useState({});
  const [totalRaised, setTotalRaised] = useState(0);
  const [artist, setArtist] = useState(null); // State for artist details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPaymentsAndArtwork = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const paymentsList = await creator_backend.getPaymentsByArtwork(Number(artwork_id));
        setPayments(paymentsList);

        const total = paymentsList
          .filter(payment => payment.payment_status === 'success')
          .reduce((acc, payment) => acc + Number(payment.amount), 0);
        setTotalRaised(total);

        const artworkDetails = await creator_backend.getArtworkDetails(Number(artwork_id));
        setArtwork(artworkDetails[0]);

        // Fetch artist info if artwork details are available
        if (artworkDetails[0]) {
          const artistDetails = await creator_backend.getArtistById(artworkDetails[0].artist_id);
          setArtist(artistDetails[0]);
        }

        const allPayers = await creator_backend.getPayers();
        const payers = {};
        allPayers.forEach(payer => {
          payers[payer.id] = payer.name;
        });
        setPayersMap(payers);
      } catch (error) {
        console.error('Failed to fetch payments or artwork details:', error);
        setError('Failed to load data. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchPaymentsAndArtwork();
  }, [artwork_id]);

  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          {artwork ? (
            <Card className="mb-4">
              <Card.Header>
                <Card.Title as="h5">{artwork.title}</Card.Title>
                <span className="d-block m-t-5">{artwork.description}</span>
              </Card.Header>
              <Card.Body>
                <p><strong>Price:</strong> {Number(artwork.price).toLocaleString()}</p>
                <p><strong>Date Created:</strong> {artwork.date_created}</p>
                <p><strong>Artist:</strong> {artist ? artist.name : 'Loading artist...'}</p>
                <p><strong>Total Raised Amount:</strong> {totalRaised.toLocaleString()}</p>
              </Card.Body>
            </Card>
          ) : (
            <p>Loading artwork details...</p>
          )}

          <Card>
            <Card.Header>
              <Card.Title as="h5">Payments for {artwork ? artwork.title : '...'}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Payer Name</th>
                    <th>Payer ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Payment Status</th>
                    <th>Phone Number</th>
                    <th>Transaction ID</th> {/* New column for Transaction ID */}
                    <th>Transaction Reference</th> {/* New column for Transaction Reference */}
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment, index) => (
                      <tr key={payment.payment_id}>
                        <th scope="row">{index + 1}</th>
                        <td>{payersMap[payment.client_id] || 'Unknown'}</td> {/* Assuming client_id maps to payers */}
                        <td>{Number(payment.client_id).toLocaleString()}</td>
                        <td>{Number(payment.amount).toLocaleString()}</td>
                        <td>{payment.date}</td>
                        <td>{payment.payment_status}</td>
                        <td>{payment.phone_number}</td>
                        <td>{payment.tx_id}</td> {/* Display transaction ID */}
                        <td>{payment.tx_ref}</td> {/* Display transaction reference */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No payments found for this artwork.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default ArtworkPayments;
