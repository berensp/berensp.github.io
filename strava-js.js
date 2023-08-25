
const auth_link = "https://www.strava.com/oauth/token"

function getActivites(res){

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then(response => response.json())
        .then(data => {

        // Get the first/latest activity
        const activity = data[0];

        // Display activity data    
        document.getElementById('activity').innerHTML = `
          <h2>${activity.name}</h2>
          <p><strong>Distance:</strong> ${activity.distance} m</p>
          <p><strong>Moving Time:</strong> ${activity.moving_time} s</p>
    `;

  })
  .catch(error => console.error(error));
}

function reAuthorize(){
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            client_id: '111503',
            client_secret: '9abdda73b9cf15100b12faefcae56d4c8343a378',
            refresh_token: '5d7d5c4edf9d990542ad399d1c9a61d409611923',
            grant_type: 'refresh_token'

        })
    }).then(res => res.json())
        .then(res => getActivites(res))  
}

reAuthorize()