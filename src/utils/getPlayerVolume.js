function getPlayerVolumeFromLS() {
    const storedVolume = localStorage.getItem('playerVolume');

    return storedVolume !== null ? storedVolume : 50;
}

function savePlayerVolumeToLS(volume) {
    localStorage.setItem('playerVolume', parseInt(volume));
}

export {  getPlayerVolumeFromLS, savePlayerVolumeToLS  }