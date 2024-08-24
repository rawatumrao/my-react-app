function createCommonSvgRectangles(rectData) {
    return rectData.map(({ x, y, width, height, fill }) => `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${fill}"></rect>
    `).join('');
  }
  
  function createCommonSvgIcons(iconParams) {
    return iconParams.map(({ x, y, width, height, circleRadius }) => `
      <svg x='${x}' y='${y}' width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='#87919A' xmlns='http://www.w3.org/2000/svg'>
        <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='#87919A'/>
        <circle cx='12' cy='10' r='${circleRadius}' fill='#87919A'/>
      </svg>
    `).join('');
  }
  
  function generateLgSvg(fillColor, strokeColor) {
    const rectData = [
      { x: 5, y: 5, width: 63, height: 39, fill: '#BBBFC3' }, // Left large rectangle
      { x: 72, y: 5, width: 63, height: 39, fill: '#BBBFC3' }, // Right large rectangle
      { x: 5, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 1
      { x: 5, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 2
      { x: 27, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 3
      { x: 27, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 4
      { x: 49, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 5
      { x: 49, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 6
      { x: 71, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 7
      { x: 71, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 8
      { x: 93, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 9
      { x: 93, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 10
      { x: 115, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 11
      { x: 115, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 12
      { x: 5, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 13
      { x: 27, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 14
      { x: 49, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 15
      { x: 71, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 16
      { x: 93, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 17
      { x: 115, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }  // Small rect 18
    ];
  
    const iconParams = [
      { x: 2, y: 2, width: 70, height: 45, circleRadius: 4 }, // Icon for left large rectangle
      { x: 70, y: 2, width: 70, height: 45, circleRadius: 4 }, // Icon for right large rectangle
      { x: 8, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 1
      { x: 8, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 2
      { x: 30, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 3
      { x: 30, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 4
      { x: 52, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 5
      { x: 52, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 6
      { x: 74, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 7
      { x: 74, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 8
      { x: 96, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 9
      { x: 96, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 10
      { x: 118, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 11
      { x: 118, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 12
      { x: 8, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 13
      { x: 30, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 14
      { x: 52, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 15
      { x: 74, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 16
      { x: 96, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 17
      { x: 118, y: 70, width: 15, height: 15, circleRadius: 3 }  // Icon for small rect 18
    ];
  
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${fillColor}" stroke="${strokeColor}"></rect>
        ${createCommonSvgRectangles(rectData)}
        ${createCommonSvgIcons(iconParams)}
      </svg>
    `;
  }
  
  export const lg1 = `data:image/svg+xml;utf8,${encodeURIComponent(generateLgSvg('#87919a', '#BBBFC3'))}`;
  export const lg1_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateLgSvg('#ffffff', 'Aqua'))}`;
  


  function createCommonSvgRectanglesLg2(rectData) {
    return rectData.map(({ x, y, width, height, fill }) => `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${fill}"></rect>
    `).join('');
  }
  
  function createCommonSvgIconsLg2(iconParams) {
    return iconParams.map(({ x, y, width, height, circleRadius }) => `
      <svg x='${x}' y='${y}' width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='#87919A' xmlns='http://www.w3.org/2000/svg'>
        <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='#87919A'/>
        <circle cx='12' cy='10' r='${circleRadius}' fill='#87919A'/>
      </svg>
    `).join('');
  }
  
  function generateLg2Svg(fillColor, strokeColor) {
    const rectData = [
      { x: 8.0, y: 27.0, width: 59.5, height: 34.0, fill: '#BBBFC3' }, // Left large rectangle
      { x: 72.5, y: 27.0, width: 59.5, height: 34.0, fill: '#BBBFC3' }, // Right large rectangle
      { x: 8.0, y: 8.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 1
      { x: 40.25, y: 8.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 2
      { x: 72.5, y: 8.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 3
      { x: 104.75, y: 8.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 4
      { x: 8.0, y: 65.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 5
      { x: 40.25, y: 65.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 6
      { x: 72.5, y: 65.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 7
      { x: 104.75, y: 65.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }  // Small rect 8
    ];
  
    const iconParams = [
      { x: 18, y: 25, width: 40, height: 40, circleRadius: 3 }, // Icon for left large rectangle
      { x: 82, y: 25, width: 40, height: 40, circleRadius: 3 }, // Icon for right large rectangle
      { x: 14, y: 8, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 1
      { x: 46, y: 8, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 2
      { x: 78, y: 8, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 3
      { x: 110, y: 8, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 4
      { x: 14, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 5
      { x: 46, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 6
      { x: 78, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 7
      { x: 110, y: 65, width: 15, height: 15, circleRadius: 3 }  // Icon for small rect 8
    ];
  
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${fillColor}" stroke="${strokeColor}"></rect>
        ${createCommonSvgRectanglesLg2(rectData)}
        ${createCommonSvgIconsLg2(iconParams)}
      </svg>
    `;
  }
  
  export const lg2 = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg2Svg('#87919a', '#BBBFC3'))}`;
  export const lg2_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg2Svg('#ffffff', 'Aqua'))}`;

  
  function createCommonSvgRectanglesLg3(rectData) {
    return rectData.map(({ x, y, width, height, fill }) => `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${fill}"></rect>
    `).join('');
  }
  
  function createCommonSvgIconsLg3(iconParams) {
    return iconParams.map(({ x, y, width, height, circleRadius }) => `
      <svg x='${x}' y='${y}' width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='#87919A' xmlns='http://www.w3.org/2000/svg'>
        <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='#87919A'/>
        <circle cx='12' cy='10' r='${circleRadius}' fill='#87919A'/>
      </svg>
    `).join('');
  }
  
  function generateLg3Svg(fillColor, strokeColor) {
    const rectData = [
      { x: 33.8, y: 8.0, width: 98.2, height: 56.8, fill: '#BBBFC3' }, // Large rectangle
      { x: 8.0, y: 8.0, width: 20.8, height: 11.2, fill: '#BBBFC3' }, // Small rect 1
      { x: 8.0, y: 23.2, width: 20.8, height: 11.2, fill: '#BBBFC3' }, // Small rect 2
      { x: 8.0, y: 38.4, width: 20.8, height: 11.2, fill: '#BBBFC3' }, // Small rect 3
      { x: 8.0, y: 53.6, width: 20.8, height: 11.2, fill: '#BBBFC3' }, // Small rect 4
      { x: 8.0, y: 68.8, width: 20.8, height: 11.2, fill: '#BBBFC3' }, // Small rect 5
      { x: 33.8, y: 68.8, width: 20.8, height: 11.2, fill: '#BBBFC3' }, // Small rect 6
      { x: 59.6, y: 68.8, width: 20.8, height: 11.2, fill: '#BBBFC3' }, // Small rect 7
      { x: 85.4, y: 68.8, width: 20.8, height: 11.2, fill: '#BBBFC3' }, // Small rect 8
      { x: 111.2, y: 68.8, width: 20.8, height: 11.2, fill: '#BBBFC3' }  // Small rect 9
    ];
  
    const iconParams = [
      { x: 45, y: 0, width: 75, height: 75, circleRadius: 3 }, // Icon for large rectangle
      { x: 11, y: 5, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 1
      { x: 11, y: 20, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 2
      { x: 11, y: 35, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 3
      { x: 11, y: 50, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 4
      { x: 11, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 5
      { x: 36, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 6
      { x: 62, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 7
      { x: 88, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 8
      { x: 113, y: 65, width: 15, height: 15, circleRadius: 3 }  // Icon for small rect 9
    ];
  
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${fillColor}" stroke="${strokeColor}"></rect>
        ${createCommonSvgRectanglesLg3(rectData)}
        ${createCommonSvgIconsLg3(iconParams)}
      </svg>
    `;
  }
  
  export const lg3 = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg3Svg('#87919a', '#BBBFC3'))}`;
  export const lg3_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg3Svg('#ffffff', 'Aqua'))}`;

  
  function createCommonSvgRectanglesLg4(rectData) {
    return rectData.map(({ x, y, width, height, fill }) => `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${fill}"></rect>
    `).join('');
  }
  
  function createCommonSvgIconsLg4(iconParams) {
    return iconParams.map(({ x, y, width, height, circleRadius }) => `
      <svg x='${x}' y='${y}' width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='#87919A' xmlns='http://www.w3.org/2000/svg'>
        <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='#87919A'/>
        <circle cx='12' cy='10' r='${circleRadius}' fill='#87919A'/>
      </svg>
    `).join('');
  }
  
  function generateLg4Svg(fillColor, strokeColor) {
    const rectData = [
      { x: 5, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 1
      { x: 5, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 2
      { x: 27, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 3
      { x: 27, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 4
      { x: 49, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 5
      { x: 49, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 6
      { x: 72, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 7
      { x: 72, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 8
      { x: 94, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 9
      { x: 94, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 10
      { x: 116, y: 59.9163, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 11
      { x: 116, y: 47, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 12
      { x: 5, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 13
      { x: 27, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 14
      { x: 49, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 15
      { x: 72, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 16
      { x: 94, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 17
      { x: 116, y: 73.4229, width: 20, height: 11.5771, fill: '#BBBFC3' }, // Small rect 18
      { x: 37, y: 5, width: 66, height: 38, fill: '#BBBFC3' }  // Large rectangle
    ];
  
    const iconParams = [
      { x: 8, y: 57, width: 15, height: 18, circleRadius: 3 }, // Icon for small rect 1
      { x: 8, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 2
      { x: 29, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 3
      { x: 29, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 4
      { x: 51, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 5
      { x: 51, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 6
      { x: 74, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 7
      { x: 74, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 8
      { x: 96, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 9
      { x: 96, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 10
      { x: 118, y: 57, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 11
      { x: 118, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 12
      { x: 8, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 13
      { x: 29, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 14
      { x: 51, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 15
      { x: 74, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 16
      { x: 96, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 17
      { x: 118, y: 70, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 18
      { x: 35, y: 2, width: 70, height: 45, circleRadius: 3 }  // Icon for large rectangle
    ];
  
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${fillColor}" stroke="${strokeColor}"></rect>
        ${createCommonSvgRectanglesLg4(rectData)}
        ${createCommonSvgIconsLg4(iconParams)}
      </svg>
    `;
  }
  
  export const lg4 = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg4Svg('#87919a', '#BBBFC3'))}`;
  export const lg4_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg4Svg('#ffffff', 'Aqua'))}`;

  function createCommonSvgRectanglesLg5(rectData) {
    return rectData.map(({ x, y, width, height, fill }) => `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" fill="${fill}"></rect>
    `).join('');
  }
  
  function createCommonSvgIconsLg5(iconParams) {
    return iconParams.map(({ x, y, width, height, circleRadius }) => `
      <svg x='${x}' y='${y}' width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='#87919A' xmlns='http://www.w3.org/2000/svg'>
        <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='#87919A'/>
        <circle cx='12' cy='10' r='${circleRadius}' fill='#87919A'/>
      </svg>
    `).join('');
  }
  
  function generateLg5Svg(fillColor, strokeColor) {
    const rectData = [
      { x: 40.25, y: 27.0, width: 59.5, height: 34.0, fill: '#BBBFC3' }, // Large center rectangle
      { x: 8.0, y: 8.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 1
      { x: 40.25, y: 8.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 2
      { x: 72.5, y: 8.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 3
      { x: 104.75, y: 8.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 4
      { x: 8.0, y: 27.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 5
      { x: 104.75, y: 27.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 6
      { x: 8.0, y: 46.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 7
      { x: 104.75, y: 46.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 8
      { x: 8.0, y: 65.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 9
      { x: 40.25, y: 65.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 10
      { x: 72.5, y: 65.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 11
      { x: 104.75, y: 65.0, width: 27.25, height: 15.0, fill: '#BBBFC3' }, // Small rect 12
    ];
  
    const iconParams = [
      { x: 50, y: 25, width: 40, height: 40, circleRadius: 3 }, // Icon for large center rect
      { x: 13, y: 8, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 1
      { x: 45, y: 8, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 2
      { x: 77, y: 8, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 3
      { x: 109, y: 8, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 4
      { x: 13, y: 28, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 5
      { x: 109, y: 28, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 6
      { x: 13, y: 46, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 7
      { x: 109, y: 46, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 8
      { x: 13, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 9
      { x: 45, y: 65, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 10
      { x: 77, y: 65, width: 12, height: 12, circleRadius: 3 }, // Icon for small rect 11
      { x: 109, y: 65, width: 15, height: 15, circleRadius: 3 }  // Icon for small rect 12
    ];
  
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${fillColor}" stroke="${strokeColor}"></rect>
        ${createCommonSvgRectanglesLg5(rectData)}
        ${createCommonSvgIconsLg5(iconParams)}
      </svg>
    `;
  }
  
  export const lg5 = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg5Svg('#87919a', '#BBBFC3'))}`;
  export const lg5_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg5Svg('#ffffff', 'Aqua'))}`;

  
  function createCommonSvgRectanglesLg6(rectData) {
    return rectData.map(({ x, y, width, height, rx, fill }) => `
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="${fill}"></rect>
    `).join('');
  }
  
  function createCommonSvgIconsLg6(iconParams) {
    return iconParams.map(({ x, y, width, height, circleRadius }) => `
      <svg x='${x}' y='${y}' width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='#87919A' xmlns='http://www.w3.org/2000/svg'>
        <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z' fill='#87919A'/>
        <circle cx='12' cy='10' r='${circleRadius}' fill='#87919A'/>
      </svg>
    `).join('');
  }
  
  function generateLg6Svg(fillColor, strokeColor) {
    const rectData = [
      { x: 43, y: 4, width: 55, height: 39, rx: 2.51724, fill: '#BBBFC3' }, // Large center rectangle
      { x: 119, y: 45, width: 17, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 1
      { x: 99, y: 45, width: 18, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 2
      { x: 80, y: 45, width: 18, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 3
      { x: 62, y: 45, width: 17, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 4
      { x: 43, y: 45, width: 18, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 5
      { x: 24, y: 45, width: 18, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 6
      { x: 5, y: 45, width: 17, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 7
      { x: 119, y: 18, width: 17, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 8
      { x: 99, y: 18, width: 18, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 9
      { x: 24, y: 18, width: 18, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 10
      { x: 5, y: 18, width: 17, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 11
      { x: 119, y: 4, width: 17, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 12
      { x: 99, y: 4, width: 18, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 13
      { x: 24, y: 4, width: 18, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 14
      { x: 5, y: 4, width: 17, height: 12, rx: 2, fill: '#BBBFC3' }, // Small rect 15
      { x: 119, y: 32, width: 17, height: 11, rx: 2, fill: '#BBBFC3' }, // Small rect 16
      { x: 99, y: 32, width: 18, height: 11, rx: 2, fill: '#BBBFC3' }, // Small rect 17
      { x: 24, y: 32, width: 18, height: 11, rx: 2, fill: '#BBBFC3' }, // Small rect 18
      { x: 5, y: 32, width: 17, height: 11, rx: 2, fill: '#BBBFC3' }, // Small rect 19
    ];
  
    const iconParams = [
      { x: 50, y: 5, width: 40, height: 40, circleRadius: 3 }, // Icon for large center rect
      { x: 120, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 1
      { x: 100, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 2
      { x: 81, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 3
      { x: 63, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 4
      { x: 44, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 5
      { x: 25, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 6
      { x: 6, y: 44, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 7
      { x: 120, y: 17, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 8
      { x: 100, y: 17, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 9
      { x: 25, y: 17, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 10
      { x: 6, y: 17, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 11
      { x: 120, y: 3, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 12
      { x: 100, y: 3, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 13
      { x: 25, y: 3, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 14
      { x: 6, y: 3, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 15
      { x: 120, y: 31, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 16
      { x: 100, y: 31, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 17
      { x: 25, y: 31, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 18
      { x: 6, y: 31, width: 15, height: 15, circleRadius: 3 }, // Icon for small rect 19
    ];
  
    return `
      <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="139" height="87" rx="3.5" fill="${fillColor}" stroke="${strokeColor}"></rect>
        ${createCommonSvgRectanglesLg6(rectData)}
        ${createCommonSvgIconsLg6(iconParams)}
      </svg>
    `;
  }
  
  export const lg6 = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg6Svg('#87919a', '#BBBFC3'))}`;
  export const lg6_selected = `data:image/svg+xml;utf8,${encodeURIComponent(generateLg6Svg('#ffffff', 'Aqua'))}`;
  