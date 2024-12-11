import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { creator_backend } from 'declarations/creator_backend';
import { useNavigate } from 'react-router-dom';

const AddArtwork = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [artists, setArtists] = useState([]); // Store artists fetched from backend
  const navigate = useNavigate();

  // Fetch artists from the backend when the component mounts
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const fetchedArtists = await creator_backend.getArtists(); // Assuming there's a function to get all artists
        setArtists(fetchedArtists);
      } catch (error) {
        setErrorMessage('Failed to load artists.');
      }
    };

    fetchArtists();
  }, []);

  // Function to handle adding an artwork
  const handleAddArtwork = async (values, { setSubmitting }) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { title, description, price, artist_id, image } = values;
      const artwork_id = Date.now(); // Generate an ID (or use a custom method if needed)

      // Call the backend function to add artwork
      await creator_backend.addArtwork(
        Number(artwork_id),
        title,
        description,
        Number(price), // Ensure price is a number
        parseInt(artist_id), // Ensure artist_id is a number
        new Date().toISOString(), // Add a timestamp for the artwork
        image // Directly use the image URL
      );
      setSuccessMessage('Artwork successfully added!');
    } catch (error) {
      setErrorMessage('Failed to add artwork. Please try again. ' + error);
    } finally {
      setSubmitting(false);
    }
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    artist_id: Yup.number().required('Artist is required'), // Validate artist selection
    image: Yup.string().url('Image must be a valid URL').required('Image URL is required'), // Change validation for URL
  });

  // Function to navigate to the View Artworks page
  const handleViewArtworks = () => {
    navigate('/admin/view-artworks');
  };

  return (
    <Row>
      <Col sm={12}>
        <Button variant="primary" onClick={handleViewArtworks} className="mb-3">
          View Artworks
        </Button>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Add Artwork</Card.Title>
          </Card.Header>
          <Card.Body>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Formik
              initialValues={{ title: '', description: '', price: '', artist_id: '', image: '' }} // Updated initial values
              validationSchema={validationSchema}
              onSubmit={handleAddArtwork}
            >
              {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Enter artwork title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!touched.title && !!errors.title}
                    />
                    {touched.title && errors.title && (
                      <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      placeholder="Enter artwork description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!touched.description && !!errors.description}
                    />
                    {touched.description && errors.description && (
                      <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Price (Amount)</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="Enter artwork price"
                      value={values.price}
                      onChange={handleChange}
                      isInvalid={!!touched.price && !!errors.price}
                    />
                    {touched.price && errors.price && (
                      <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Artist</Form.Label>
                    <Form.Select
                      name="artist_id"
                      value={values.artist_id}
                      onChange={handleChange}
                      isInvalid={!!touched.artist_id && !!errors.artist_id}
                    >
                      <option value="">Select Artist</option>
                      {artists.map((artist) => (
                        <option key={artist.artist_id} value={''+artist.artist_id+''}>
                          {artist.artist_id + ' - ' + artist.name}
                        </option>
                      ))}
                    </Form.Select>
                    {touched.artist_id && errors.artist_id && (
                      <Form.Control.Feedback type="invalid">{errors.artist_id}</Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Artwork Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      placeholder="Enter image URL"
                      value={values.image}
                      onChange={handleChange}
                      isInvalid={!!touched.image && !!errors.image}
                    />
                    {touched.image && errors.image && (
                      <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Artwork'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddArtwork;