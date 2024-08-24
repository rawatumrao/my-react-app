function createCommonSvgIcon(x = 0, y = 0, width = 24, height = 24, fill = '#87919A') {
    return `
      <svg x="${x}" y="${y}" width="${width}px" height="${height}px" viewBox="0 0 24 24" fill="${fill}" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `;
  }
  
  function generateSvg(rectFill, rectStroke) {
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${rectFill}" stroke="${rectStroke}"></rect>
        <rect x="3" y="3" width="65" height="36" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(15, 2, 40, 40)}
        <rect x="118.5" y="70" width="17" height="16" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(122, 72, 12, 12)}
        <rect x="3" y="41" width="43" height="27" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(12, 45, 25, 25)}
        <rect x="4.5" y="70" width="17" height="16" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(7, 72, 12, 12)}
        <rect x="42.5" y="70" width="17" height="16" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(45, 72, 12, 12)}
        <rect x="80.5" y="70" width="17" height="16" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(83, 72, 12, 12)}
        <rect x="23.5" y="70" width="17" height="16" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(26, 72, 12, 12)}
        <rect x="61.5" y="70" width="17" height="16" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(64, 72, 12, 12)}
        <rect x="99.5" y="70" width="17" height="16" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(102, 72, 12, 12)}
        <rect x="48" y="41" width="44" height="27" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(59, 45, 25, 25)}
        <rect x="94" y="41" width="43" height="27" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(105, 45, 25, 25)}
        <rect x="70" y="3" width="67" height="36" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(85, 2, 40, 40)}
      </svg>
    `;
  }
  
  export const  adaptive = `data:image/svg+xml;utf8,${encodeURIComponent(generateSvg('#87919a', '#BBBFC3'))}`;
  export const adaptive_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateSvg('#ffffff', 'Aqua'))}`;
  


  function generateSf1Svg(rectFill, rectStroke) {
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${rectFill}" stroke="${rectStroke}"></rect>
        <rect x="9" y="12" width="124" height="65" rx="2" fill="#BBBFC3"></rect>
        ${createCommonSvgIcon(30, 5, 80, 80)}
      </svg>
    `;
  }

  
  export const sf1 = `data:image/svg+xml;utf8,${encodeURIComponent(generateSf1Svg('#87919a', '#BBBFC3'))}`;
export const sf1_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateSf1Svg('#ffffff', 'Aqua'))}`;



  

// function createCommonSvgIcon(x, y, width, height) {
//     return `
//       <svg x='${x}' y='${y}' width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='#87919A' xmlns='http://www.w3.org/2000/svg'>
//         <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='#87919A'/>
//         <circle cx='12' cy='10' r='3' fill='#87919A'/>
//       </svg>`;
//   }
  
  function generateSfSvg(rectFill, rectStroke, rectData = [], iconParams = []) {
    const rectangles = rectData.map(({ x, y, width, height, fill }) => `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${fill}"></rect>
    `).join('');
  
    const icons = iconParams.map(({ x, y, width, height }) => createCommonSvgIcon(x, y, width, height)).join('');
  
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${rectFill}" stroke="${rectStroke}"></rect>
        ${rectangles}
        ${icons}
      </svg>
    `;
  }
  
  export const sf2 = `data:image/svg+xml;utf8,${encodeURIComponent(generateSfSvg(
    '#87919a', 
    '#BBBFC3', 
    [
      { x: 8, y: 8, width: 124, height: 71, fill: '#BBBFC3' }, // Main large rectangle
      { x: 12, y: 51, width: 41, height: 24, fill: '#87919a' }, // Smaller rectangle
    ],
    [
      { x: 20, y: 50, width: 25, height: 25 }, // Icon within smaller rectangle
      { x: 30, y: 5, width: 70, height: 70 }   // Larger icon in main rectangle
    ]
  ))}`;
  
  export const sf2_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateSfSvg(
    '#ffffff', 
    'Aqua', 
    [
      { x: 8, y: 8, width: 124, height: 71, fill: '#BBBFC3' }, // Main large rectangle
      { x: 12, y: 51, width: 41, height: 24, fill: '#87919a' }, // Smaller rectangle
    ],
    [
      { x: 20, y: 50, width: 25, height: 25 }, // Icon within smaller rectangle
      { x: 30, y: 5, width: 70, height: 70 }   // Larger icon in main rectangle
    ]
  ))}`;
  

//   function createCommonSvgIcon(x, y, width, height) {
//     return `
//       <svg x='${x}' y='${y}' width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='#87919A' xmlns='http://www.w3.org/2000/svg'>
//         <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='#87919A'/>
//         <circle cx='12' cy='10' r='3' fill='#87919A'/>
//       </svg>`;
//   }
  
  function generateSf3Svg(rectFill, rectStroke, rectData = [], iconParams = []) {
    const rectangles = rectData.map(({ x, y, width, height, fill }) => `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${fill}"></rect>
    `).join('');
  
    const icons = iconParams.map(({ x, y, width, height }) => createCommonSvgIcon(x, y, width, height)).join('');
  
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${rectFill}" stroke="${rectStroke}"></rect>
        ${rectangles}
        ${icons}
      </svg>
    `;
  }
  
  export const sf3 = `data:image/svg+xml;utf8,${encodeURIComponent(generateSf3Svg(
    '#87919a', 
    '#BBBFC3', 
    [
      { x: 33, y: 12.1044, width: 74, height: 45.3913, fill: '#BBBFC3' }, // Main large rectangle
      { x: 4, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 1
      { x: 23, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 2
      { x: 42, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 3
      { x: 61, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 4
      { x: 80, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 5
      { x: 99, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 6
      { x: 118, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 7
    ],
    [
      { x: 45, y: 10, width: 50, height: 50 }, // Icon within large rectangle
      { x: 8, y: 68, width: 12, height: 12 }, // Icon for small rectangle 1
      { x: 27, y: 68, width: 12, height: 12 }, // Icon for small rectangle 2
      { x: 46, y: 68, width: 12, height: 12 }, // Icon for small rectangle 3
      { x: 65, y: 68, width: 12, height: 12 }, // Icon for small rectangle 4
      { x: 84, y: 68, width: 12, height: 12 }, // Icon for small rectangle 5
      { x: 103, y: 68, width: 12, height: 12 }, // Icon for small rectangle 6
      { x: 122, y: 68, width: 12, height: 12 }  // Icon for small rectangle 7
    ]
  ))}`;
  
  export const sf3_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateSf3Svg(
    '#ffffff', 
    'Aqua', 
    [
      { x: 33, y: 12.1044, width: 74, height: 45.3913, fill: '#BBBFC3' }, // Main large rectangle
      { x: 4, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 1
      { x: 23, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 2
      { x: 42, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 3
      { x: 61, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 4
      { x: 80, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 5
      { x: 99, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 6
      { x: 118, y: 66, width: 18, height: 14, fill: '#BBBFC3' }, // Small rectangle 7
    ],
    [
      { x: 45, y: 10, width: 50, height: 50 }, // Icon within large rectangle
      { x: 8, y: 68, width: 12, height: 12 }, // Icon for small rectangle 1
      { x: 27, y: 68, width: 12, height: 12 }, // Icon for small rectangle 2
      { x: 46, y: 68, width: 12, height: 12 }, // Icon for small rectangle 3
      { x: 65, y: 68, width: 12, height: 12 }, // Icon for small rectangle 4
      { x: 84, y: 68, width: 12, height: 12 }, // Icon for small rectangle 5
      { x: 103, y: 68, width: 12, height: 12 }, // Icon for small rectangle 6
      { x: 122, y: 68, width: 12, height: 12 }  // Icon for small rectangle 7
    ]
  ))}`;
  