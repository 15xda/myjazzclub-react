export default async function checkVideoAvailability(videoId) {
  const url = `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
