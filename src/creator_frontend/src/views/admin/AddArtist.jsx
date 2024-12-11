import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { creator_backend } from 'declarations/creator_backend';
import { useNavigate } from 'react-router-dom';

const AddArtist = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  // Function to handle artist addition
  const handleAddArtist = async (values, { setSubmitting }) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { name, bio } = values; // Assuming you want to add a bio for the artist
      const id = Date.now(); // Generate an ID (or use another method if needed)
      await creator_backend.addArtist(id, name, bio); // Call the backend method to add the artist
      setSuccessMessage('Artist successfully added!');
    } catch (error) {
      setErrorMessage('Failed to add artist. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    bio: Yup.string().required('Bio is required'), // Validation for bio
  });

  // Function to navigate to the View Artists page
  const handleViewArtists = () => {
    navigate('/admin/ViewArtists'); // Adjust the route as needed
  };

  return (
    <Row>
      <Col sm={12}>
        <Button variant="primary" onClick={handleViewArtists} className="mb-3">
          View Artists
        </Button>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Add Artist</Card.Title>
          </Card.Header>
          <Card.Body>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Formik
              initialValues={{ name: '', bio: '' }} // Initial values for the artist form
              validationSchema={validationSchema}
              onSubmit={handleAddArtist}
            >
              {({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!touched.name && !!errors.name}
                    />
                    {touched.name && errors.name && (
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="bio"
                      placeholder="Enter bio"
                      value={values.bio}
                      onChange={handleChange}
                      isInvalid={!!touched.bio && !!errors.bio}
                    />
                    {touched.bio && errors.bio && (
                      <Form.Control.Feedback type="invalid">{errors.bio}</Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Artist'}
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

export default AddArtist;
