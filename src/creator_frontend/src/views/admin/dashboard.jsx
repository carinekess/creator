import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { creator_backend } from 'declarations/creator_backend'; // Backend import

const DashDefault = () => {
  const [dashboardData, setDashboardData] = useState({
    clientsCount: 0,
    artistsCount: 0,
    artworksCount: 0,
    totalPayments: 0,
    recentClients: [],
    recentArtists: [],
    recentPayments: [],
    adminInfo: null, // To store admin name and username
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedAdmin = localStorage.getItem('user');
        const admin = JSON.parse(storedAdmin);

        if (!admin) {
          setErrorMessage('No logged-in admin found. Please log in.');
          setLoading(false);
          return;
        }

        // Fetch admin info from backend
        const adm = await creator_backend.getAdminById(Number(admin.id));
        const adminInfo = adm[0];

        // Fetch clients, artists, artworks, and payments
        const clients = await creator_backend.getClients();
        const artists = await creator_backend.getArtists();
        const artworks = await creator_backend.getArtworks();
        const payments = await creator_backend.getAllPayments();

        // Filter data for recent entries (last 3 for each category)
        const recentClients = clients.slice(-3);
        const recentArtists = artists.slice(-3);
        const recentPayments = payments.slice(-3);

        // Count entities
        const clientsCount = clients.length;
        const artistsCount = artists.length;
        const artworksCount = artworks.length;

        // Calculate total payments
        const totalPayments = payments.reduce(
          (sum, payment) => sum + BigInt(payment.amount),
          BigInt(0)
        );

        // Update state with fetched data
        setDashboardData({
          clientsCount,
          artistsCount,
          artworksCount,
          totalPayments: totalPayments.toString(), // Convert to string for display
          recentClients,
          recentArtists,
          recentPayments,
          adminInfo: adminInfo || null,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setErrorMessage('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCardClick = (link) => {
    navigate(link);
  };

  const dashSalesData = [
    { title: 'Clients', linkClick: '/admin/view-clients', amount: dashboardData.clientsCount, icon: 'icon-arrow-up text-c-green' },
    { title: 'Artists', linkClick: '/admin/view-artists', amount: dashboardData.artistsCount, icon: 'icon-arrow-up text-c-green' },
    { title: 'Total Payments', linkClick: '/admin/view-payments', amount: `${dashboardData.totalPayments} Frw`, icon: 'icon-arrow-up text-c-green' }
  ];

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (errorMessage) {
    return <Alert variant="danger">{errorMessage}</Alert>;
  }

  return (
    <React.Fragment>
      {/* Admin Info Card */}
      {dashboardData.adminInfo && (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <h5>Admin Info</h5>
                <p><strong>Name:</strong> {dashboardData.adminInfo.name}</p>
                <p><strong>Username:</strong> {dashboardData.adminInfo.username}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Dashboard Overview Cards */}
      <Row>
        {dashSalesData.map((data, index) => (
          <Col key={index} xl={6} xxl={4}>
            <Card onClick={() => handleCardClick(data.linkClick)}>
              <Card.Body>
                <h6 className="mb-4">{data.title}</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className={`feather ${data.icon} f-30 m-r-5`} /> {data.amount}
                    </h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Clients */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Recent Clients</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentClients.length > 0 ? (
                    dashboardData.recentClients.map((client, index) => (
                      <tr key={client.id}>
                        <td>{index + 1}</td>
                        <td>{client.name}</td>
                        <td>{client.username}</td>
                        <td>{client.phone_number}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No recent clients found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Artists */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Recent Artists</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Bio</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentArtists.length > 0 ? (
                    dashboardData.recentArtists.map((artist, index) => (
                      <tr key={artist.artist_id}>
                        <td>{index + 1}</td>
                        <td>{artist.name}</td>
                        <td>{artist.bio}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">No recent artists found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Payments */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Recent Payments</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Artwork ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentPayments.length > 0 ? (
                    dashboardData.recentPayments.map((payment, index) => (
                      <tr key={payment.payment_id}>
                        <td>{index + 1}</td>
                        <td>{Number(payment.artwork_id)}</td>
                        <td>{parseFloat(payment.amount)} Frw</td>
                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                        <td>{payment.payment_status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No recent payments found.</td>
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

export default DashDefault;
