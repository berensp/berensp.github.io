document.getElementById('lookupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const ID = document.getElementById('ID').value;

  fetch(`https://supadupa-616uri0yp-pauls-projects-9cf86d6d.vercel.app/api/proxy.js?ID=${ID}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').innerHTML = JSON.stringify(data);
    })
    .catch(error => console.error('Error fetching data:', error));
});