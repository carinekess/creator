import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { creator_backend } from 'declarations/creator_backend';
import { useNavigate } from 'react-router-dom';

const ViewArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch artworks and artists from the backend when the component loads
  useEffect(() => {
    const fetchArtworksAndArtists = async () => {
      try {
        const artworkList = await creator_backend.getArtworks(); // Fetch artworks
        const artistList = await creator_backend.getArtists(); // Fetch artists

        // Map artworks to include artist names
        const artworksWithArtists = artworkList.map(artwork => {
          const artist = artistList.find(a => a.artist_id === artwork.artist_id);
          return {
            ...artwork,
            artist_name: artist ? artist.name : 'Unknown',
          };
        });

        setArtworks(artworksWithArtists);
        setArtists(artistList); // Store artists if needed elsewhere
      } catch (error) {
        console.error('Failed to fetch artworks or artists:', error);
      }
    };

    fetchArtworksAndArtists();
  }, []);

  // Handle artwork selection
  const handleViewArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setShowModal(true);
  };

  // Handle buy now button click
  const handleBuyNow = (artworkId) => {
    navigate(`/pay/${artworkId}`); // Redirect to the purchase page (assuming a route exists)
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArtwork(null);
  };

  return (
    <React.Fragment>
      <Row>
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <Col key={artwork.artwork_id} xl={4} lg={6} md={6} sm={12}>
              <Card>
                <Card.Img variant="top" src={artwork.image_url} alt={artwork.title} style={{ height: '300px', objectFit: 'cover' }} />
                <Card.Body>
                  <h6 className="mb-4">{artwork.title}</h6>
                  <p>{artwork.description}</p>
                  <p><strong>Artist:</strong> {artwork.artist_name}</p>
                  <h5 className="f-w-300 m-b-0">{parseFloat(artwork.price).toFixed(2)} RWF</h5>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary" onClick={() => handleViewArtwork(artwork)}>
                    View Artwork
                  </Button>
                  <Button variant="success" className="ml-2" onClick={() => handleBuyNow(artwork.artwork_id)}>
                    Buy Now
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No artworks found</p>
          </Col>
        )}
      </Row>

      {/* Modal to view selected artwork */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedArtwork?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArtwork && (
            <>
              <img src={selectedArtwork.image_url} alt={selectedArtwork.title} className="img-fluid mb-3" />
              <p>{selectedArtwork.description}</p>
              <p><strong>Artist:</strong> {selectedArtwork.artist_name}</p>
              <h5>{parseFloat(selectedArtwork.price).toFixed(2)} RWF</h5>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleBuyNow(selectedArtwork.artwork_id)}>
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ViewArtworks;
