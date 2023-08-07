import StravaApiV3 from "./strava-api";

const stravaClient = new StravaApiV3({
  clientId: "111503",
  clientSecret: "9abdda73b9cf15100b12faefcae56d4c8343a378",
  accessToken: "0bd0d49161189cc7bf570a01eeb1833a8f6df06d",
});

const getMostRecentActivity = async () => {
  const activities = await stravaClient.getActivities({
    per_page: 1,
  });

  return activities[0];
};

const renderActivity = (activity) => {
  const html = `
    <h1>My Most Recent Strava Activity</h1>
    <p>
      <strong>Name:</strong> ${activity.name}
    </p>
    <p>
      <strong>Distance:</strong> ${activity.distance} meters
    </p>
    <p>
      <strong>Time:</strong> ${activity.elapsed_time} seconds
    </p>
  `;

  return html;
};

const main = async () => {
  const activity = await getMostRecentActivity();
  const html = renderActivity(activity);

  document.querySelector("#activity").innerHTML = html;
};

main();
