import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Table, Spinner, Alert } from 'react-bootstrap';
import { creator_backend } from 'declarations/creator_backend';

const ArtworkPayments = () => {
  const { artwork_id } = useParams();
  const [payments, setPayments] = useState([]);
  const [artwork, setArtwork] = useState(null);
  const [payersMap, setPayersMap] = useState({});
  const [totalRaised, setTotalRaised] = useState(0);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const artworkID = BigInt(artwork_id);

        // Fetch payments
        const paymentsList = await creator_backend.getPaymentsByArtwork(artworkID);
        setPayments(paymentsList);

        const total = paymentsList
          .filter(payment => payment.payment_status === 'success')
          .reduce((acc, payment) => acc + Number(payment.amount), 0);
        setTotalRaised(total);

        // Fetch artwork details
        const artworkDetails = await creator_backend.getArtworkDetails(artworkID);
        if (artworkDetails.length) {
          setArtwork(artworkDetails[0]);

          // Fetch artist details
          const artistDetails = await creator_backend.getArtistById(artworkDetails[0].artist_id);
          if (artistDetails.length) setArtist(artistDetails[0]);
        }

        // Fetch payers and create a mapping
        const allPayers = await creator_backend.getClients();
        const payers = {};
        allPayers.forEach(payer => {
          payers[payer.id] = payer.name;
        });
        setPayersMap(payers);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Unable to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
                    <th>Transaction ID</th>
                    <th>Transaction Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment, index) => (
                      <tr key={payment.payment_id}>
                        <th scope="row">{index + 1}</th>
                        <td>{payersMap[payment.client_id] || 'Unknown'}</td>
                        <td>{Number(payment.client_id).toLocaleString()}</td>
                        <td>{Number(payment.amount).toLocaleString()}</td>
                        <td>{payment.date}</td>
                        <td>{payment.payment_status}</td>
                        <td>{payment.phone_number}</td>
                        <td>{payment.tx_id}</td>
                        <td>{payment.tx_ref}</td>
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
