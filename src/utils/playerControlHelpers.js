const stations = [
  "iaD7Nw8k",
  "6Jsnem7i848",
  "Dx5qFachd3A",
  "UedTcufyrHc",
  "4xDzrJKXOOY",
  "y6TZHLAzg5o",
  "et5HueFNjkI",
  "2gO1v2GPMFk",
  "tYR6tvtb0",
  "DSGyEsJ17cI",
  "fEvM-OUbaKs",
  "5yx6BWlEVcY",
  "rPjez8z61rI",
  "SfYqbEY-CS0",
];

const getNextStationId = (id) => {
  const currentStationIndex = stations.findIndex(
    (stationId) => stationId === id
  );
  const nextStationIndex = (currentStationIndex + 1) % stations.length;
  return stations[nextStationIndex];
};

const getPreviousStationId = (id) => {
  const currentStationIndex = stations.findIndex(
    (stationId) => stationId === id
  );
  const previousStationIndex =
    (currentStationIndex - 1 + stations.length) % stations.length;
  return stations[previousStationIndex];
};

const getRandomStationId = (id) => {
  const randomNum = Math.floor(Math.random() * stations.length);
  if (id !== undefined && stations[randomNum] === id) {
    return stations[(randomNum + 1) % stations.length];
  }
  return stations[randomNum];
};

export { getNextStationId, getPreviousStationId, getRandomStationId };
