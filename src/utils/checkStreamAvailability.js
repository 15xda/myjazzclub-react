export default async function checkVideoAvailability(videoId) {
  const url = `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
