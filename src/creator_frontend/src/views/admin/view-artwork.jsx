import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { creator_backend } from 'declarations/creator_backend'; // Adjust the import if needed
import { useNavigate } from 'react-router-dom';

const ViewArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const navigate = useNavigate(); // To handle navigation to "Add Artwork" page

    // Fetch artworks from the backend when the component loads
    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const artworkList = await creator_backend.getArtworks(); // Fetch artworks from the backend
                console.log('Artwork List:', artworkList); // Log fetched data for debugging

                // Process and set the artworks state
                setArtworks(artworkList);
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
            }
        };

        fetchArtworks();
    }, []);

    // Navigate to the Add Artwork page
    const handleAddArtwork = () => {
        navigate('/admin/AddArtwork');
    };

    // Navigate to the artwork details page
    const handleViewArtworkDetails = (artwork_id) => {
        navigate(`/admin/artwork-payments/${artwork_id}`);
    };

    // Function to handle artwork deletion
    const handleDeleteArtwork = async (artwork_id) => {
        const confirmation = window.confirm("Are you sure you want to delete this artwork?");
        if (confirmation) {
            // Call the delete artwork function from the backend
            const deleted = await creator_backend.deleteArtwork(artwork_id);
            if (deleted) {
                alert("Artwork deleted successfully!");
                // Refresh the artworks list after deletion
                await fetchArtworks(); // Re-fetch the artworks
            } else {
                alert("Failed to delete the artwork. It may not exist.");
            }
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    {/* Add Artwork Button */}
                    <Button variant="primary" onClick={handleAddArtwork} className="mb-3">
                        Add Artwork
                    </Button>

                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Artworks</Card.Title>
                            <span className="d-block m-t-5">
                                List of all artworks and their details.
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Artwork ID</th>
                                        <th>Image</th> {/* New Image Column */}
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Artist ID</th>
                                        <th>Date Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artworks.length > 0 ? (
                                        artworks.map((artwork, index) => (
                                            <tr key={artwork.artwork_id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{artwork.artwork_id}</td>
                                                <td>
                                                    <img 
                                                        src={artwork.image_url} 
                                                        alt={artwork.title} 
                                                        style={{ width: '100px', height: 'auto' }} // Adjust image size as needed
                                                    />
                                                </td>
                                                <td>{artwork.title}</td>
                                                <td>{artwork.description}</td>
                                                <td>{artwork.price}</td>
                                                <td>{artwork.artist_id}</td>
                                                <td>{artwork.date_created}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        onClick={() => handleViewArtworkDetails(artwork.artwork_id)}
                                                    >
                                                        View Payment Details
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDeleteArtwork(artwork.artwork_id)}
                                                        className="ml-2"
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">
                                                No artworks found
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

export default ViewArtworks;
