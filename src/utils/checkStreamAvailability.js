export default async function checkVideoAvailability(videoId) {
    const url = `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`;

    try {
        const response = await fetch(url);

        if (response.ok) {
            console.log(true);
            return true;
        }
        else {
            console.log(false);
            return false;
        }

    } catch (error) {
        return false;
    }
}