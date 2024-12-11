import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { creator_backend } from 'declarations/creator_backend';
import { setPaymentCredentials, initiatePayment } from '../../payment/hdev_payment'; // Import payment functions

const Payment = () => {
  const { artwork_id } = useParams(); // Changed goal_id to artwork_id
  const [artwork, setArtwork] = useState(null);
  const [client, setClient] = useState(null); // Changed contributor to client
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        const artworkDetails = await creator_backend.getArtworkDetails(Number(artwork_id)); // Changed getGoalDetails to getArtworkDetails
        if (artworkDetails) {
          setArtwork(artworkDetails[0]);

          const clientDetails = await creator_backend.getClients(); // Changed getContributors to getClients
          const matchedClient = clientDetails.find(
            (client) => client.id === artworkDetails[0].client_id // Changed contributor_id to client_id
          );
          setClient(matchedClient);
        }
      } catch (error) {
        setErrorMessage('Could not fetch artwork details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchLoggedInUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser));
      } else {
        setErrorMessage('No logged-in user found. Please log in.');
      }
    };

    fetchArtworkDetails();
    fetchLoggedInUser();
  }, [artwork_id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!loggedInUser) {
      setErrorMessage('You must be logged in to make a payment.');
      setSubmitting(false);
      return;
    }

    const date = new Date().toISOString();
    const tx_ref = Math.random().toString(36).substring(2, 14);
    const link = `${window.location.origin}/receipt/${tx_ref}/view`;

    try {
      const set_it = await setPaymentCredentials('HDEV-90621992-dc1c-4aa0-b5ff-5c393649ecf5-ID', 'HDEV-6a11e9c7-009b-45d7-87d6-3c5507c3fbc2-KEY');
      
      // Initiate the payment process using the artwork price
      const paymentResponse = await initiatePayment(values.phone_number, artwork.price, tx_ref, link); // Changed values.amount to artwork.price
      console.log(paymentResponse);
      if (paymentResponse.status === 'success') {
        // Save payment in the backend
        await creator_backend.addPayment(
          // Number(Date.now()),
          // random int id 
          Math.floor(Math.random() * 1000000),
          Number(loggedInUser.id),
          Number(artwork.artwork_id), // Changed goal_id to artwork_id
          Number(artwork.price), // Changed values.amount to artwork.price
          date,
          values.phone_number,
          'none',
          tx_ref,
          'pending'
        );
        setSuccessMessage('Payment initiated, waiting for confirmation...');
        setTimeout(() => navigate(`/waiting/${tx_ref}`), 1000); // Redirect to waiting page
      } else {
        setErrorMessage(paymentResponse.message || 'Payment failed.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('Payment failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    phone_number: Yup.string().required('Phone number is required'),
  });

  return (
    <React.Fragment>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : errorMessage ? (
        <Alert variant="danger" className="text-center">{errorMessage}</Alert>
      ) : (
        <>
          <Row>
            <Col>
              <Card className="mb-4">
                <Card.Body>
                  <h5 className="mb-3">{artwork.title}</h5> {/* Changed goal_name to artwork title */}
                  <p>{artwork.description}</p> {/* Changed goal_desc to artwork description */}
                  <h4 className="f-w-300 m-b-0">{parseFloat(artwork.price).toFixed(2)} Frw</h4> {/* Changed goal_target to artwork price */}
                </Card.Body>
                <Card.Footer>
                  <small>Client: {client ? client.name : 'Unknown'}</small> {/* Show client name */}
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Make Payment for {artwork.title}</Card.Title> {/* Changed to reflect payment */}
                </Card.Header>
                <Card.Body>
                  {successMessage && <Alert variant="success">{successMessage}</Alert>}
                  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                  <Formik
                    initialValues={{ phone_number: '' }} // Removed amount field
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="phone_number"
                            placeholder="Enter your phone number"
                            value={values.phone_number}
                            onChange={handleChange}
                            isInvalid={!!touched.phone_number && !!errors.phone_number}
                          />
                          {touched.phone_number && errors.phone_number && (
                            <Form.Control.Feedback type="invalid">{errors.phone_number}</Form.Control.Feedback>
                          )}
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Processing...' : 'Pay Now'}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </React.Fragment>
  );
};

export default Payment;
