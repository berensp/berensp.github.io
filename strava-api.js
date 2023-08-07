class StravaApiV3 {
  constructor({
    clientId,
    clientSecret,
    accessToken,
  }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = accessToken;
  }

  getActivities({ per_page }) {
    const url = `https://api.strava.com/v3/activities?per_page=${per_page}`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    return fetch(url, { headers })
      .then((response) => response.json())
      .then((data) => data.activities);
  }
}
