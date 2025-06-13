const bkgs = [
    '1.gif', 
    '0a6aa42bc8be1f5cfee03a214c456bb4.gif', 
    '50f6cd0033f5ef01129c7e5aad8a9f61.gif',
    '65f0d6c9747138560ae2c80571c8252f.gif',
    '0827ef0a5945e61704a784b3de52c0ba.gif',
    '62332d52843de1fb48d463735a91ffda.gif',
    'bebbf1899f01298a0e74e824ed82ab29.gif',
    'bkg (3).webp',
    'bkg (6).webp',
    'bkg (7).webp',
    'bkg (8).webp',
    'bkg (13).webp',
    'bkg (14).webp',
    'bkg (15).webp',
    'd3f7e3c37d8fb937ad1762578048c2d2.gif',
    'd7559f70c7c33c5b0cb26b8b8a2fc63d.gif',
]

const getRandomBkg = () => {
    const randId = Math.floor(Math.random() * bkgs.length);
    return bkgs[randId];
}

const getNextBkg = ({currentImage}) => {
    const currentId = bkgs.findIndex(img => img === currentImage);
    const nextId = (currentId + 1) % bkgs.length; 
    return bkgs[nextId];
}

const getPreviousBkg = ({currentImage}) => {
    const currentId = bkgs.findIndex(img => img === currentImage);
    const prevId = (currentId - 1) % bkgs.length; 
    return bkgs[prevId];
}

export {getNextBkg, getRandomBkg, getPreviousBkg}