document.getElementById('lookupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const ID = document.getElementById('ID').value;

  fetch(`https://nextjs-berenzino-n57dj34t8-pauls-projects-9cf86d6d.vercel.app/api/airtable-proxy.js?ID=${ID}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').innerHTML = JSON.stringify(data);
    })
    .catch(error => console.error('Error fetching data:', error));
});