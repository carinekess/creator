import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

actor {

  // Stable variables for persistence
  stable var admins : [Admin] = [];
  stable var clients : [Client] = [];
  stable var artists : [Artist] = [];
  stable var artworks : [Artwork] = [];
  stable var payments : [Payment] = [];

  // Define the data structures
  public type Admin = {
    admin_id: Nat;
    name: Text;
    username: Text;
    password: Text;
  };

  public type Client = {
    id: Nat;
    name: Text;
    username: Text;
    password: Text;
    phone_number: Text;
    principal: ?Principal; // Make principal optional
  };

  public type Artist = {
    artist_id: Nat;
    name: Text;
    bio: Text;
  };

  public type Artwork = {
    artwork_id: Nat;
    title: Text;
    description: Text;
    price: Nat;
    artist_id: Nat;
    date_created: Text;
    image_url: Text; // Added field for artwork image URL
  };

  public type Payment = {
    payment_id: Nat;
    client_id: Nat;
    artwork_id: Nat;
    amount: Nat;
    date: Text;
    phone_number: Text; // Include the phone number of the client
    tx_id: Text;
    tx_ref: Text;
    payment_status: Text;
  };

  // ---------------------- Admin Functions ----------------------

  public func addAdmin(admin_id: Nat, name: Text, username: Text, password: Text) : async () {
    let newAdmin : Admin = {
      admin_id;
      name;
      username;
      password;
    };
    admins := Array.append(admins, [newAdmin]);
  };

  public query func adminLogin(username: Text, password: Text) : async ?Admin {
    return Array.find<Admin>(admins, func(admin) {
      admin.username == username and admin.password == password
    });
  };

  public query func getAdmins() : async [Admin] {
    return admins;
  };

  public query func getAdminById(admin_id: Nat) : async ?Admin {
    return Array.find<Admin>(admins, func(a) {
      a.admin_id == admin_id
    });
  };

  // ---------------------- Client Functions ----------------------

  public func addClient(id: Nat, name: Text, username: Text, password: Text, phone_number: Text) : async () {
    let newClient : Client = {
      id;
      name;
      username;
      password;
      phone_number;
      principal = null;
    };
    clients := Array.append(clients, [newClient]);
  };

  // add client with principal
  public func addClientWithPrincipal(id: Nat, name: Text, username: Text, password: Text, phone_number: Text, principal: Principal) : async () {
    let newClient : Client = {
      id;
      name;
      username;
      password;
      phone_number;
      principal = ?principal;
    };
    clients := Array.append(clients, [newClient]);
  };

  public query func clientLogin(username: Text, password: Text) : async ?Client {
    return Array.find<Client>(clients, func(client) {
      client.username == username and client.password == password
    });
  };

  public query func getClientByPrincipal(principal: Principal) : async ?Client {
    return Array.find<Client>(clients, func(c) {
      c.principal == ?principal
    });
  };

  public query func getClientById(client_id: Nat) : async ?Client {
    return Array.find<Client>(clients, func(c) {
      c.id == client_id
    });
  };

  public query func getClients() : async [Client] {
    return clients;
  };


  public func setClientPrincipal(client_id: Nat, principal: Principal) : async Bool {
    let updatedClients = Array.filter<Client>(clients, func(c) {
      c.id == client_id
    });

    if (Array.size(updatedClients) == 0) {
      return false;
    };

    let updatedClient = updatedClients[0];
    let newClient = {
      id = updatedClient.id;
      name = updatedClient.name;
      username = updatedClient.username;
      password = updatedClient.password;
      phone_number = updatedClient.phone_number;
      principal = ?principal;
    };

    clients := Array.filter<Client>(clients, func(c) {
      c.id != client_id
    });

    clients := Array.append(clients, [newClient]);
    return true;
  };

  // ---------------------- Artist Functions ----------------------

  public func addArtist(artist_id: Nat, name: Text, bio: Text) : async () {
    let newArtist : Artist = {
      artist_id;
      name;
      bio;
    };
    artists := Array.append(artists, [newArtist]);
  };

  public query func getArtists() : async [Artist] {
    return artists;
  };

  public query func getArtistById(artist_id: Nat) : async ?Artist {
    return Array.find<Artist>(artists, func(a) {
      a.artist_id == artist_id
    });
  };

  // ---------------------- Artwork CRUD ----------------------

  public func addArtwork(artwork_id: Nat, title: Text, description: Text, price: Nat, artist_id: Nat, date_created: Text, image_url: Text) : async () {
    if (Array.size(Array.filter<Artist>(artists, func(a) {
      a.artist_id == artist_id
    })) == 0) {
      return;
    };

    let newArtwork : Artwork = {
      artwork_id;
      title;
      description;
      price;
      artist_id;
      date_created;
      image_url; // Include the image URL
    };
    artworks := Array.append(artworks, [newArtwork]);
  };

  public query func getArtworks() : async [Artwork] {
    return artworks;
  };

  public query func getArtworkDetails(artwork_id: Nat) : async ?Artwork {
    return Array.find<Artwork>(artworks, func(a) {
      a.artwork_id == artwork_id
    });
  };

  public func updateArtwork(artwork_id: Nat, title: Text, description: Text, price: Nat, date_created: Text, image_url: Text) : async Bool {
    let updatedArtworks = Array.filter<Artwork>(artworks, func(a) {
      a.artwork_id == artwork_id
    });

    if (Array.size(updatedArtworks) == 0) {
      return false;
    };

    let updatedArtwork = updatedArtworks[0];
    let newArtwork = {
      artwork_id = updatedArtwork.artwork_id;
      title;
      description;
      price;
      artist_id = updatedArtwork.artist_id;
      date_created;
      image_url; // Update the image URL
    };

    artworks := Array.filter<Artwork>(artworks, func(a) {
      a.artwork_id != artwork_id
    });

    artworks := Array.append(artworks, [newArtwork]);
    return true;
  };

  public func deleteArtwork(artwork_id: Nat) : async Bool {
    let updatedArtworks = Array.filter<Artwork>(artworks, func(a) {
      a.artwork_id == artwork_id
    });

    if (Array.size(updatedArtworks) == 0) {
      return false;
    };

    artworks := Array.filter<Artwork>(artworks, func(a) {
      a.artwork_id != artwork_id
    });

    return true;
  };

  public query func getArtworksByArtist(artist_id: Nat) : async [Artwork] {
    return Array.filter<Artwork>(artworks, func(a) {
      a.artist_id == artist_id
    });
  };

  // ---------------------- Payment Functions ----------------------

  public func addPayment(payment_id: Nat, client_id: Nat, artwork_id: Nat, amount: Nat, date: Text, phone_number: Text, tx_id: Text, tx_ref: Text, payment_status: Text) : async () {
    let newPayment : Payment = {
      payment_id;
      client_id;
      artwork_id;
      amount;
      date;
      phone_number;
      tx_id;
      tx_ref;
      payment_status;
    };
    payments := Array.append(payments, [newPayment]);
  };

  public query func getPaymentsByArtwork(artwork_id: Nat) : async [Payment] {
    return Array.filter<Payment>(payments, func(p) {
      p.artwork_id == artwork_id
    });
  };

  public query func getPaymentsByClient(client_id: Nat) : async [Payment] {
    return Array.filter<Payment>(payments, func(p) {
      p.client_id == client_id
    });
  };

  public query func getAllPayments() : async [Payment] {
    return payments;
  };
  // get payment with its client 

  public func updatePaymentStatus(newtx_ref: Text, newtx_id: Text, new_status: Text) : async Bool {
    let updatedPayments = Array.filter<Payment>(payments, func(p) {
      p.tx_ref == newtx_ref
    });

    if (Array.size(updatedPayments) == 0) {
      return false;
    };

    let updatedPayment = updatedPayments[0];
    let newPayment = {
      payment_id = updatedPayment.payment_id;
      client_id = updatedPayment.client_id;
      artwork_id = updatedPayment.artwork_id;
      amount = updatedPayment.amount;
      date = updatedPayment.date;
      phone_number = updatedPayment.phone_number;
      tx_id = newtx_id; // Update transaction ID
      tx_ref = newtx_ref; // Keep the existing transaction reference
      payment_status = new_status; // Update payment status
    };

    payments := Array.filter<Payment>(payments, func(p) {
      p.tx_ref != newtx_ref
    });

    payments := Array.append(payments, [newPayment]);
    return true;
  };

  // ---------------------- Data Reset Function ----------------------

  public func resetData() : async () {
    admins := [];
    clients := [];
    artists := [];
    artworks := [];
    payments := [];
  };
};
