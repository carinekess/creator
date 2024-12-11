import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { creator_backend } from 'declarations/creator_backend';
import { useNavigate } from 'react-router-dom';

const ViewArtists = () => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate(); // To handle navigation to "Add Artist" page

  // Fetch artists from the backend when the component loads
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistList = await creator_backend.getArtists(); // Assuming you have a getArtists function in the backend
        setArtists(artistList);
      } catch (error) {
        console.error('Failed to fetch artists:', error);
      }
    };

    fetchArtists();
  }, []);

  // Navigate to the Add Artist page
  const handleAddArtist = () => {
    navigate('/admin/AddArtist');
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          {/* Add Artist Button */}
          <Button variant="primary" onClick={handleAddArtist} className="mb-3">
            Add Artist
          </Button>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Artists Table</Card.Title>
              <span className="d-block m-t-5">
                List of all artists available in the system.
              </span>
            </Card.Header>
            <Card.Body>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Bio</th> {/* Added Bio column */}
                  </tr>
                </thead>
                <tbody>
                  {artists.length > 0 ? (
                    artists.map((artist, index) => (
                      <tr key={artist.artist_id}> {/* Assuming artist_id is the unique identifier */}
                        <th scope="row">{index + 1}</th>
                        <td>{artist.name}</td>
                        <td>{artist.bio}</td> {/* Displaying artist's bio */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No artists found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ViewArtists;
