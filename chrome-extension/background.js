let blockedSites = [];

// Fetch blocked sites from your server
function updateBlockedSites(userId) {
  console.log("Fetching blocked sites for user:", userId);
  fetch(`http://localhost:8080/get_blocked_sites?user_id=${encodeURIComponent(userId)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
  .then(data => {
    console.log("Blocked sites fetched:", data.blocked_sites);
    
    // Parse the JSON string and filter out empty or invalid entries
    if (data.blocked_sites) {
      const siteHostnames = JSON.parse(data.blocked_sites);
      blockedSites = siteHostnames.filter(site => site && site.trim() !== '');
    } else {
      blockedSites = [];
    }
  })
  .catch(error => {
    console.error('Error fetching blocked sites:', error);
    blockedSites = []; // Reset to empty if there's an error
  });
}


const defaultUserId = 'auth0|65722cb4fdd17829236f400b'; 
updateBlockedSites(defaultUserId);

chrome.webNavigation.onCompleted.addListener(function(details) {
  const url = new URL(details.url);
  console.log("Navigated to:", url.hostname);
  console.log(blockedSites)
  // Check if the navigated URL is in the blockedSites list
  if (blockedSites.includes(url.hostname)) {
    console.log("Navigated to blocked site:", url.hostname);
    fetch('http://localhost:8080/subtract_points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: defaultUserId, url: url.hostname })
    }).catch(error => {
      console.error('Error posting to subtract points:', error);
    });
  }
  else{
    console.log("Not a blocked site")
  }
  
}, {url: [{urlMatches: 'http://*/*'}, {urlMatches: 'https://*/*'}]});