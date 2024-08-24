const commonSVGPath = (width, height) => `
<svg width='${width}px' height='${height}px' viewBox='0 0 24 24' fill='%2387919A' xmlns='http://www.w3.org/2000/svg'>
  <path d='M18.46,14.5a1,1,0,0,0-1.66-.19,9,9,0,0,1-10.2,0,1,1,0,0,0-1.34.19A7,7,0,0,0,4,18.9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1A7,7,0,0,0,18.44,14.5Z'></path>
  <circle cx='12' cy='10' r='3'></circle>
</svg>`;

const createRectWithIcon = (
  xRect,
  yRect,
  widthRect,
  heightRect,
  rxRect,
  xIcon,
  yIcon,
  iconWidth,
  iconHeight
) => `
  <rect x='${xRect}' y='${yRect}' width='${widthRect}' height='${heightRect}' rx='${rxRect}' fill='%23BBBFC3'></rect>
  <svg x='${xIcon}' y='${yIcon}'>${commonSVGPath(iconWidth, iconHeight)}</svg>
`;

const generateSVG = (backgroundColor, strokeColor, rects) => `
  data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='${backgroundColor}' stroke='${strokeColor}'></rect>
    ${rects.join('')}
  </svg>
`;

// SVG definitions using optimized functions

const es1Rects = [
  createRectWithIcon(8.0, 27.0, 59.5, 34.0, 2, 20, 30, 30, 30),
  createRectWithIcon(72.5, 27.0, 59.5, 34.0, 2, 85, 30, 30, 30),
];

export const es1 = generateSVG("%2387919a", "%23BBBFC3", es1Rects);
export const es1_selected = generateSVG("%23ffffff", "Aqua", es1Rects);

const es2Rects = [
  createRectWithIcon(8.0, 8.0, 59.5, 34.0, 2, 15, 5, 48, 34),
  createRectWithIcon(72.5, 8.0, 59.5, 34.0, 2, 80, 5, 48, 34),
  createRectWithIcon(40.25, 46.0, 59.5, 34.0, 2, 47, 43, 48, 34),
];

export const es2 = generateSVG("%2387919a", "%23BBBFC3", es2Rects);
export const es2_selected = generateSVG("%23ffffff", "Aqua", es2Rects);

const es3Rects = [
  createRectWithIcon(8, 12, 58, 29, 2, 25, 12, 30, 30),
  createRectWithIcon(8, 49, 58, 29, 2, 25, 47, 30, 30),
  createRectWithIcon(74, 12, 58, 29, 2, 90, 12, 30, 30),
  createRectWithIcon(74, 49, 58, 29, 2, 90, 47, 30, 30),
];

export const es3 = generateSVG("%2387919a", "%23BBBFC3", es3Rects);
export const es3_selected = generateSVG("%23ffffff", "Aqua", es3Rects);

const es4Rects = [
  createRectWithIcon(8, 9.82, 38.62, 19.96, 2.03, 17, 7, 20, 20),
  createRectWithIcon(8, 33.39, 38.62, 19.96, 2.03, 17, 32, 20, 20),
  createRectWithIcon(8, 56.96, 38.62, 19.96, 2.03, 17, 57, 20, 20),
  createRectWithIcon(50.69, 9.82, 38.62, 19.96, 2.03, 60, 7, 20, 20),
  createRectWithIcon(50.69, 33.39, 38.62, 19.96, 2.03, 60, 32, 20, 20),
  createRectWithIcon(50.69, 56.96, 38.62, 19.96, 2.03, 60, 57, 20, 20),
  createRectWithIcon(92.36, 9.82, 39.64, 19.96, 2.03, 101, 7, 20, 20),
  createRectWithIcon(92.36, 33.39, 39.64, 19.96, 2.03, 101, 32, 20, 20),
  createRectWithIcon(92.36, 56.96, 39.64, 19.96, 2.03, 101, 57, 20, 20),
];

export const es4 = generateSVG("%2387919a", "%23BBBFC3", es4Rects);
export const es4_selected = generateSVG("%23ffffff", "Aqua", es4Rects);

const es5Rects = [
  createRectWithIcon(41.1, 63.82, 27.27, 14.35, 1.44, 49, 63, 12, 12),
  createRectWithIcon(71.2, 29.27, 27.99, 14.35, 1.44, 79, 29, 12, 12),
  createRectWithIcon(11, 29.27, 27.27, 14.35, 1.44, 19, 29, 12, 12),
  createRectWithIcon(11, 12, 27.27, 14.35, 1.44, 19, 12, 12, 12),
  createRectWithIcon(11, 46.55, 27.27, 14.35, 1.44, 19, 46, 12, 12),
  createRectWithIcon(11, 63.82, 27.27, 14.35, 1.44, 19, 63, 12, 12),
  createRectWithIcon(41.1, 29.27, 27.27, 14.35, 1.44, 49, 29, 12, 12),
  createRectWithIcon(41.1, 12, 27.27, 14.35, 1.44, 49, 12, 12, 12),
  createRectWithIcon(41.1, 46.55, 27.27, 14.35, 1.44, 49, 46, 12, 12),
  createRectWithIcon(71.2, 12, 27.99, 14.35, 1.44, 79, 12, 12, 12),
  createRectWithIcon(102.01, 29.27, 27.99, 14.35, 1.44, 110, 29, 12, 12),
  createRectWithIcon(102.01, 12, 27.99, 14.35, 1.44, 110, 12, 12, 12),
  createRectWithIcon(102.01, 46.55, 27.99, 14.35, 1.44, 110, 46, 12, 12),
  createRectWithIcon(102.01, 63.82, 27.99, 14.35, 1.44, 110, 63, 12, 12),
  createRectWithIcon(71.2, 46.55, 27.99, 14.35, 1.44, 79, 46, 12, 12),
  createRectWithIcon(71.2, 63.82, 27.99, 14.35, 1.44, 79, 63, 12, 12),
];

export const es5 = generateSVG("%2387919a", "%23BBBFC3", es5Rects);
export const es5_selected = generateSVG("%23ffffff", "Aqua", es5Rects);

const es6Rects = [
  createRectWithIcon(57.17, 42.71, 24.26, 14, 1.24, 63, 44, 12, 12),
  createRectWithIcon(5, 42.71, 23.64, 14, 1.24, 11, 44, 12, 12),
  createRectWithIcon(5, 25.73, 23.64, 14, 1.24, 11, 27, 12, 12),
  createRectWithIcon(5, 8, 23.64, 14, 1.24, 11, 10, 12, 12),
  createRectWithIcon(5, 59.68, 23.64, 14, 1.24, 11, 61, 12, 12),
  createRectWithIcon(31.09, 42.71, 23.64, 14, 1.24, 37, 44, 12, 12),
  createRectWithIcon(31.09, 25.73, 23.64, 14, 1.24, 37, 27, 12, 12),
  createRectWithIcon(31.09, 8, 23.64, 14, 1.24, 37, 10, 12, 12),
  createRectWithIcon(31.09, 59.68, 23.64, 14, 1.24, 37, 61, 12, 12),
  createRectWithIcon(57.17, 25.73, 24.26, 14, 1.24, 63, 27, 12, 12),
  createRectWithIcon(57.17, 8, 24.26, 14, 1.24, 63, 10, 12, 12),
  createRectWithIcon(83.88, 42.71, 24.26, 14, 1.24, 90, 44, 12, 12),
  createRectWithIcon(110.74, 42.71, 24.26, 14, 1.24, 117, 44, 12, 12),
  createRectWithIcon(83.88, 25.73, 24.26, 14, 1.24, 90, 27, 12, 12),
  createRectWithIcon(83.88, 8, 24.26, 14, 1.24, 90, 10, 12, 12),
  createRectWithIcon(110.74, 25.73, 24.26, 14, 1.24, 117, 27, 12, 12),
  createRectWithIcon(110.74, 8, 24.26, 14, 1.24, 117, 10, 12, 12),
  createRectWithIcon(83.88, 59.68, 24.26, 14, 1.24, 90, 61, 12, 12),
  createRectWithIcon(110.74, 59.68, 24.26, 14, 1.24, 117, 61, 12, 12),
  createRectWithIcon(57.17, 59.68, 24.26, 14, 1.24, 63, 61, 12, 12),
];

export const es6 = generateSVG("%2387919a", "%23BBBFC3", es6Rects);
export const es6_selected = generateSVG("%23ffffff", "Aqua", es6Rects);