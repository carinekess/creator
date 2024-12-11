// menuItems.js

const originalMenuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/admin/dashboard',
          roles: ['admin'] // admin can access
        },
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/client/dashboard',
          roles: ['client'] //contributor can access
        }
      ]
    },
    {
      id: 'activities',
      title: 'Activities',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'add-contributor-by-admin',
          title: 'Add Artist',
          type: 'item',
          icon: 'feather icon-home',
          url: '/admin/AddArtist',
          roles: ['admin'], // Only admin can access
        },
        {
          id: 'view-artists-by-admin',
          title: 'View Artists',
          type: 'item',
          icon: 'feather icon-home',
          url: '/admin/ViewArtist',
          roles: ['admin'], // Only admin can access
        },
        {
          id: 'add-artwork',
          title: 'Add Artwork',
          type: 'item',
          icon: 'feather icon-home',
          url: '/admin/add-artwork',
          roles: ['admin'], // Only admin can access
        },
        {
          id: 'view-artwork',
          title: 'View Artwork',
          type: 'item',
          icon: 'feather icon-home',
          url: '/admin/view-artwork',
          roles: ['admin'], // Only admin can access
        },

        //contributor activities
        
        {
          id: 'view-artworks',
          title: 'View Artworks',
          type: 'item',
          icon: 'feather icon-home',
          url: '/client/view-artwork',
          roles: ['client'], // Only admin can access
        },
        {
          id: 'view-artworkss',
          title: 'My Payments',
          type: 'item',
          icon: 'feather icon-home',
          url: '/client/mypayments',
          roles: ['client'], // Only admin can access
        },
      ]
    },
  ]
};

// Function to filter menu items based on user role
const filterMenuItemsByRole = (userRole) => {
  return {
    ...originalMenuItems,
    items: originalMenuItems.items.map(group => ({
      ...group,
      children: group.children.filter(item => !item.roles || item.roles.includes(userRole))
    })).filter(group => group.children.length > 0) // Remove empty groups
  };
};

// Get user role from local storage
const user = JSON.parse(localStorage.getItem('user'));
const userRole = user ? user.role : null;

// Overwrite menuItems with the filtered result
const menuItems = filterMenuItemsByRole(userRole);

// Exporting as menuItems
export default menuItems;
