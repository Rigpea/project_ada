// popup.js
// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const blockedSitesList = document.getElementById('blockedSitesList');
  const defaultUserId = 'auth0|65722cb4fdd17829236f400b'; // Set the default user ID

  function refreshBlockedSites(userId) {
    fetch(`http://localhost:8080/get_blocked_sites?user_id=${encodeURIComponent(userId)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    .then(data => {
      const sites = Array.isArray(data.blocked_sites) ? data.blocked_sites : JSON.parse(data.blocked_sites);
      blockedSitesList.innerHTML = sites.map(site => `<li>${site}</li>`).join('');
    })

      .catch(error => {
        console.error('Error fetching blocked sites:', error);
        blockedSitesList.innerHTML = '<li>Error fetching list. Please try again later.</li>';
      });
  }
  

  // Call refreshBlockedSites with the default user ID
  refreshBlockedSites(defaultUserId);
});
