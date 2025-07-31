import {
  Canvas,
  Group,
  Image,
  useImage,
  ColorMatrix,
  Paint,
  Path,
  LinearGradient,
  vec,
  Shadow,
  useSVG,
  Skia,
  rect,
} from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { PhotoFilterProps } from '../../types/PhotoFilter';
import { photoFilterStyles } from './PhotoFilter.styles';
import { SVG_PATHS } from '../../assets/SVG_PATHS';
// import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
// import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// import { BaroqueVignetteOverlay } from './Filters/BaroqueVignetteOverlay';
// import { BaroqueBrushStrokes } from './Filters/BaroqueBrushStrokes';

// function FilteredPhoto({ uri, width, height }) {
export const PhotoFilter: React.FC<PhotoFilterProps> = ({ photo }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const temp = photo;
  console.log('temp', temp);

  const image1 = useImage(require('../../assets/PhotoBooth.png'));
  // Loads an image from the network
  // const image2 = useImage("https://picsum.photos/200/300");

  // const texture = useImage(require('../../assets/baroque.png')); // texture overlay
  const texture = useImage(require('../../assets/bar2.jpg')); // texture overlay
  const frame = useSVG(require('../../assets/corner.svg')); // texture overlay

  const brushStrokes = useImage(require('../../assets/bar3.jpg'));

  if (!image1 || !texture || !brushStrokes || !frame) return null;

  const calculatedWidth = image1.width();
  const calculatedHeight = image1.height();

  // Calculate scale to fit screen
  const scaleX = (screenWidth * 0.95) / calculatedWidth;
  const scaleY = (screenHeight * 0.8) / calculatedHeight;
  const scale = Math.min(scaleX, scaleY); // To maintain aspect ratio

  const imageWidth = calculatedWidth * scale;
  const imageHeight = calculatedHeight * scale;

  // Optional: center the image
  const offsetX = (screenWidth - imageWidth) / 2;
  const offsetY = (screenHeight * 0.8 - imageHeight) / 2;

  // Size and position of overlay image (e.g., centered, smaller)
  const textureScale = 0.3; // 30% of screen width
  const textureWidth = screenWidth * textureScale;
  const textureHeight = (texture.height() / texture.width()) * textureWidth;
  console.log('textureH', textureHeight);

  const combinedBR = Skia.Path.Make();

  SVG_PATHS.forEach(d => {
    const p = Skia.Path.MakeFromSVGString(d);
    if (p) {
      console.log('d - yes', d);
      const matrix = Skia.Matrix();

      // Apply transformations
      // matrix.postScale(0.015, 0.015);
      // matrix.postRotate(240); // rotates around origin
      // matrix.postTranslate(0, 0);

      combinedBR.addPath(p, matrix);
    } else {
      console.warn('Failed to create path from:', d);
    }
  });

  const wavyRectangle = `
       M 10 50
      C 20 20, 30 80, 40 50
      C 50 20, 60 80, 70 50
      C 80 20, 90 80, 100 50
      C 110 20, 120 80, 110 50
      V 220
      H 10
      Z
    `;

  // const framePath = `M0 ${
  //   (screenHeight * 0.8 - imageHeight) / 2
  // } H${screenWidth} V${
  //   screenHeight * 0.8 - (screenHeight * 0.8 - imageHeight) / 2
  // } H0 Z`;

  const firstPercent = 0.3;
  const secondPercent = 0.7;

  const frameWidthNum = imageWidth;
  const frameHeightNum = imageHeight;

  const upperTopCurveCoord = `${(offsetY - 10).toString()}`;
  const lowerTopCurveCoord = `${(offsetY + 10).toString()}`;
  const upperBottomCurveCoord = `${(offsetY + imageHeight - 10).toString()}`;
  const lowerBottomCurveCoord = `${(offsetY + imageHeight + 10).toString()}`;

  const cornerCurve = 0.175;
  const smallCurve = 0.0625;
  const mediumCurve = 0.15;
  const middleCurve = 0.1;

  const outerRightCurveCoord = `${(imageWidth + offsetX + 10).toString()}`;
  const innerRightCurveCoord = `${(imageWidth + offsetX - 10).toString()}`;
  const outerLeftCurveCoord = `${(offsetX + 10).toString()}`;
  const innerLeftCurveCoord = `${(offsetX - 10).toString()}`;

  const cornerLengthVertical = frameHeightNum * cornerCurve;

  const framePath = `
 M ${offsetX} ${offsetY}
  C ${frameWidthNum * cornerCurve * firstPercent} ${upperTopCurveCoord}, ${(
    frameWidthNum *
    cornerCurve *
    secondPercent
  ).toString()} ${upperTopCurveCoord}, ${(
    frameWidthNum * cornerCurve
  ).toString()} ${offsetY}
  C ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve * secondPercent
  ).toString()} ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve * firstPercent
  ).toString()} ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve
  ).toString()} ${offsetY} 
  C ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve * firstPercent
  ).toString()} ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve * secondPercent
  ).toString()} ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve
  ).toString()}  ${offsetY}
  C ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve * firstPercent
  ).toString()}  ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve * secondPercent
  ).toString()}  ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve
  ).toString()}  ${offsetY} 
  C ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve * firstPercent
  ).toString()} ${upperTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve * secondPercent
  ).toString()} ${upperTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve
  ).toString()}  ${offsetY}
  C ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve * firstPercent
  ).toString()} ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve * secondPercent
  ).toString()} ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve
  ).toString()} ${offsetY}
  C ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve * firstPercent
  ).toString()}  ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve * secondPercent
  ).toString()}  ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve
  ).toString()}  ${offsetY}
  C ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve * firstPercent
  ).toString()}  ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve * secondPercent
  ).toString()}  ${lowerTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve
  ).toString()}  ${offsetY}
  C ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * cornerCurve * firstPercent
  ).toString()} ${upperTopCurveCoord}, ${(
    frameWidthNum * cornerCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * middleCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * mediumCurve +
    frameWidthNum * smallCurve +
    frameWidthNum * cornerCurve * secondPercent
  ).toString()} ${upperTopCurveCoord}, ${(
    imageWidth + offsetX
  ).toString()} ${offsetY}
  

  C ${outerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical * firstPercent
  ).toString()}, ${outerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical * secondPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY + cornerLengthVertical
  ).toString()}
  C ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve * secondPercent
  ).toString()}, ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve * firstPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve
  ).toString()}
  C ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve * firstPercent
  ).toString()}, ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve * secondPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve
  ).toString()}
  C ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve * firstPercent
  ).toString()},  ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve * secondPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve
  ).toString()}
  C ${outerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve * firstPercent
  ).toString()}, ${outerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve * secondPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve
  ).toString()}
  C ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve * firstPercent
  ).toString()}, ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve * secondPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve
  ).toString()}
  C ${innerRightCurveCoord}  ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve * firstPercent
  ).toString()}, ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve * secondPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve
  ).toString()}
   C ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve * firstPercent
  ).toString()}, ${innerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve * secondPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve
  ).toString()}
  C ${outerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * cornerCurve * firstPercent
  ).toString()}, ${outerRightCurveCoord} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * cornerCurve * secondPercent
  ).toString()}, ${(imageWidth + offsetX).toString()} ${(
    offsetY +
    cornerLengthVertical +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * middleCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * mediumCurve +
    frameHeightNum * smallCurve +
    frameHeightNum * cornerCurve
  ).toString()}


  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve * firstPercent
  ).toString()} ${lowerBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve * secondPercent
  ).toString()} ${lowerBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve
  ).toString()} ${(offsetY + imageHeight).toString()}
  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve * firstPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve * secondPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve
  ).toString()} ${(offsetY + imageHeight).toString()}
  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve * firstPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve * secondPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve
  ).toString()} ${(offsetY + imageHeight).toString()}
  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve * firstPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve * secondPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve
  ).toString()} ${(offsetY + imageHeight).toString()}
  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve * firstPercent
  ).toString()} ${lowerBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve * secondPercent
  ).toString()} ${lowerBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve
  ).toString()} ${(offsetY + imageHeight).toString()}
  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve * firstPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve * secondPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve
  ).toString()} ${(offsetY + imageHeight).toString()}
  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve * firstPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve * secondPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve
  ).toString()} ${(offsetY + imageHeight).toString()}
  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve * firstPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve * secondPercent
  ).toString()} ${upperBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve
  ).toString()} ${(offsetY + imageHeight).toString()}
  C ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * cornerCurve * firstPercent
  ).toString()} ${lowerBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * cornerCurve * secondPercent
  ).toString()} ${lowerBottomCurveCoord}, ${(
    offsetX +
    imageWidth -
    imageWidth * cornerCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * middleCurve -
    imageWidth * smallCurve -
    imageWidth * mediumCurve -
    imageWidth * smallCurve -
    imageWidth * cornerCurve
  ).toString()} ${(offsetY + imageHeight).toString()}


  C ${innerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve * firstPercent
  ).toString()},  ${innerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve
  ).toString()}
  C ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve * firstPercent
  ).toString()},  ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve
  ).toString()}
  C ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve * firstPercent
  ).toString()},  ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve
  ).toString()}
  C ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve * firstPercent
  ).toString()},  ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve
  ).toString()}
  C ${innerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve * firstPercent
  ).toString()},  ${innerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve
  ).toString()}
  C ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve * firstPercent
  ).toString()},  ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve
  ).toString()}
  C ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve * firstPercent
  ).toString()},  ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve
  ).toString()}
  C ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve * firstPercent
  ).toString()},  ${outerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve
  ).toString()}
  C ${innerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * cornerCurve * firstPercent
  ).toString()},  ${innerLeftCurveCoord} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * cornerCurve * secondPercent
  ).toString()}, ${offsetX} ${(
    offsetY +
    imageHeight -
    imageHeight * cornerCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * middleCurve -
    imageHeight * smallCurve -
    imageHeight * mediumCurve -
    imageHeight * smallCurve -
    imageHeight * cornerCurve
  ).toString()}
  
  Z`;

  const cornerWidth = 256;
  const cornerHeight = 256;
  const cornerSrc = rect(0, 0, frame.width(), frame.height());
  const cornerDst = rect(0, 0, cornerWidth, cornerHeight);

  return (
    <>
      <Canvas style={photoFilterStyles.imageContainer}>
        {/* Baroque-style color graded and sharpened base image */}
        {image1 && (
          <Group>
            <Image
              image={image1}
              // fit="contain"
              x={offsetX}
              y={offsetY}
              width={imageWidth}
              height={imageHeight}
            >
              <ColorMatrix
                matrix={[
                  // R, G, B, A matrix to warm highlights and cool shadows
                  1.1,
                  0.1,
                  0.0,
                  0,
                  0, // Red channel
                  0.05,
                  1.05,
                  0.0,
                  0,
                  0, // Green channel
                  0.0,
                  0.0,
                  0.95,
                  0,
                  0, // Blue channel
                  0,
                  0,
                  0,
                  1,
                  0,
                ]}
              />
            </Image>
            <Image
              image={texture}
              x={offsetX}
              y={offsetY}
              width={imageWidth}
              height={imageHeight}
              opacity={0.25}
              blendMode="overlay"
              fit="cover"
            />
            {/* Dark base shadow */}
            <Paint color="#000000" style="fill" />
            {/* Light gradient following the curved shape */}
            <Paint blendMode="multiply">
              {/* Chiaroscuro gradient #1 (left to right) */}
              <LinearGradient
                start={vec(0, 0)}
                end={vec(imageWidth, 0)}
                colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.0)']}
              />

              {/* Chiaroscuro gradient #2 (top to bottom) */}
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, imageHeight)}
                colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)']}
              />
            </Paint>
            {/* <Shadow dx={15} dy={15} blur={20} color="#3a2a1a" /> */}
            {/* Main frame rectangle */}
            <Path path={framePath} strokeWidth={16} style="stroke">
              <LinearGradient
                start={vec(20, 20)}
                end={vec(320, 440)}
                colors={['#d4af37', '#b8860b', '#8b7500', '#d4af37']}
                positions={[0, 0.4, 0.8, 1]}
              />
              <Shadow dx={2} dy={2} blur={6} color="#7a5e00" />
            </Path>
            {/* {frame && (
              <Path path={wavyRectangle} strokeWidth={20} style="stroke">
                <LinearGradient
                  start={vec(20, 20)}
                  end={vec(320, 440)}
                  colors={['#d4af37', '#b8860b', '#8b7500', '#d4af37']}
                  positions={[0, 0.4, 0.8, 1]}
                />
                <Shadow dx={2} dy={2} blur={6} color="#7a5e00" />
              </Path>
            )} */}
          </Group>
        )}
        {/* <BaroqueVignetteOverlay />
            <BaroqueBrushStrokes /> */}
        {/* Probably in the Group? */}
        {/* Texture overlay for oil painting effect */}
        {/* {texture && (
          <Image
            image={texture}
            fit="cover"
            x={0}
            y={0}
            width={screenWidth}
            height={256}
            opacity={0.25}
            blendMode="overlay"
          />
        )} */}
      </Canvas>
    </>
  );
};

// C 377 640, 353 640, ${(
//   frameWidthNum *
//   ((100 - cornerCurve * 100) / 100)
// ).toString()} ${bottomFrameCoord}
