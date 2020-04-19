const dimensions = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

let breakpoints = {};

Object.keys(dimensions).forEach(device => breakpoints[device] = `(max-width: ${dimensions[device]})`)
breakpoints = {
    ...breakpoints,
    iPadPro: `only screen 
    and (min-device-width: 1024px) 
    and (max-device-width: 1366px) 
    and (-webkit-min-device-pixel-ratio: 2)`
}

export default breakpoints;