import { AnimatedProp, PathDef } from "@shopify/react-native-skia";

export const calculateFramePath = (
    width: number,
    height: number,
    offX: number,
    offY: number,
  ): AnimatedProp<PathDef> => {
    const firstPercent = 0.3;
    const secondPercent = 0.7;

    const frameWidthNum = width;
    const frameHeightNum = height;

    const upperTopCurveCoord = `${(offY - 10).toString()}`;
    const lowerTopCurveCoord = `${(offY + 10).toString()}`;
    const upperBottomCurveCoord = `${(offY + height - 10).toString()}`;
    const lowerBottomCurveCoord = `${(offY + height + 10).toString()}`;

    const cornerCurve = 0.175;
    const smallCurve = 0.0625;
    const mediumCurve = 0.15;
    const middleCurve = 0.1;

    const outerRightCurveCoord = `${(width + offX + 10).toString()}`;
    const innerRightCurveCoord = `${(width + offX - 10).toString()}`;
    const outerLeftCurveCoord = `${(offX + 10).toString()}`;
    const innerLeftCurveCoord = `${(offX - 10).toString()}`;

    const cornerLengthVertical = frameHeightNum * cornerCurve;

    // Width-based segments
    const corner = frameWidthNum * cornerCurve;
    const small = frameWidthNum * smallCurve;
    const medium = frameWidthNum * mediumCurve;
    const middle = frameWidthNum * middleCurve;

    // Percent multipliers
    const corner1 = corner * firstPercent;
    const corner2 = corner * secondPercent;

    const small1 = small * firstPercent;
    const small2 = small * secondPercent;

    const medium1 = medium * firstPercent;
    const medium2 = medium * secondPercent;

    const middle1 = middle * firstPercent;
    const middle2 = middle * secondPercent;

    return `
   M ${offX} ${offY}
    C ${corner1} ${upperTopCurveCoord}, ${(
      frameWidthNum *
      cornerCurve *
      secondPercent
    ).toString()} ${upperTopCurveCoord}, ${corner.toString()} ${offY}
    C ${(corner + small2).toString()} ${lowerTopCurveCoord}, ${(
      corner + small1
    ).toString()} ${lowerTopCurveCoord}, ${(corner + small).toString()} ${offY} 
    C ${(corner + small + medium1).toString()} ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium2
    ).toString()} ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium
    ).toString()}  ${offY}
    C ${(
      corner +
      small +
      medium +
      small1
    ).toString()}  ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small2
    ).toString()}  ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small
    ).toString()}  ${offY} 
    C ${(
      corner +
      small +
      medium +
      small +
      middle1
    ).toString()} ${upperTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle2
    ).toString()} ${upperTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle
    ).toString()}  ${offY}
    C ${(
      corner +
      small +
      medium +
      small +
      middle +
      small1
    ).toString()} ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle +
      small2
    ).toString()} ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle +
      small
    ).toString()} ${offY}
    C ${(
      corner +
      small +
      medium +
      small +
      middle +
      small +
      medium1
    ).toString()}  ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle +
      small +
      medium2
    ).toString()}  ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle +
      small +
      medium
    ).toString()}  ${offY}
    C ${(
      corner +
      small +
      medium +
      small +
      middle +
      small +
      medium +
      small1
    ).toString()}  ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle +
      small +
      medium +
      small2
    ).toString()}  ${lowerTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle +
      small +
      medium +
      small
    ).toString()}  ${offY}
    C ${(
      corner +
      small +
      medium +
      small +
      middle +
      small +
      medium +
      small +
      corner1
    ).toString()} ${upperTopCurveCoord}, ${(
      corner +
      small +
      medium +
      small +
      middle +
      small +
      medium +
      small +
      corner2
    ).toString()} ${upperTopCurveCoord}, ${(width + offX).toString()} ${offY}
    
  
    C ${outerRightCurveCoord} ${(
      offY +
      cornerLengthVertical * firstPercent
    ).toString()}, ${outerRightCurveCoord} ${(
      offY +
      cornerLengthVertical * secondPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY + cornerLengthVertical
    ).toString()}
    C ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve * secondPercent
    ).toString()}, ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve * firstPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve
    ).toString()}
    C ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve * firstPercent
    ).toString()}, ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve * secondPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve
    ).toString()}
    C ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve * firstPercent
    ).toString()},  ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve * secondPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve
    ).toString()}
    C ${outerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve * firstPercent
    ).toString()}, ${outerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve * secondPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve
    ).toString()}
    C ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve * firstPercent
    ).toString()}, ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve * secondPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve
    ).toString()}
    C ${innerRightCurveCoord}  ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve * firstPercent
    ).toString()}, ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve * secondPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve
    ).toString()}
     C ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve * firstPercent
    ).toString()}, ${innerRightCurveCoord} ${(
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve * secondPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY +
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
      offY +
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
      offY +
      cornerLengthVertical +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * middleCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * mediumCurve +
      frameHeightNum * smallCurve +
      frameHeightNum * cornerCurve * secondPercent
    ).toString()}, ${(width + offX).toString()} ${(
      offY +
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
      offX +
      width -
      width * cornerCurve * firstPercent
    ).toString()} ${lowerBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve * secondPercent
    ).toString()} ${lowerBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve
    ).toString()} ${(offY + height).toString()}
    C ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve * firstPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve * secondPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve
    ).toString()} ${(offY + height).toString()}
    C ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve * firstPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve * secondPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve
    ).toString()} ${(offY + height).toString()}
    C ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve * firstPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve * secondPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve
    ).toString()} ${(offY + height).toString()}
    C ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve * firstPercent
    ).toString()} ${lowerBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve * secondPercent
    ).toString()} ${lowerBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve
    ).toString()} ${(offY + height).toString()}
    C ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve * firstPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve * secondPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve
    ).toString()} ${(offY + height).toString()}
    C ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve * firstPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve * secondPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve
    ).toString()} ${(offY + height).toString()}
    C ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve * firstPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve * secondPercent
    ).toString()} ${upperBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve
    ).toString()} ${(offY + height).toString()}
    C ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * cornerCurve * firstPercent
    ).toString()} ${lowerBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * cornerCurve * secondPercent
    ).toString()} ${lowerBottomCurveCoord}, ${(
      offX +
      width -
      width * cornerCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * middleCurve -
      width * smallCurve -
      width * mediumCurve -
      width * smallCurve -
      width * cornerCurve
    ).toString()} ${(offY + height).toString()}
  
  
    C ${innerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve * firstPercent
    ).toString()},  ${innerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve * secondPercent
    ).toString()}, ${offX} ${(offY + height - height * cornerCurve).toString()}
    C ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve * firstPercent
    ).toString()},  ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve * secondPercent
    ).toString()}, ${offX} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve
    ).toString()}
    C ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve * firstPercent
    ).toString()},  ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve * secondPercent
    ).toString()}, ${offX} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve
    ).toString()}
    C ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve * firstPercent
    ).toString()},  ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve * secondPercent
    ).toString()}, ${offX} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve
    ).toString()}
    C ${innerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve * firstPercent
    ).toString()},  ${innerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve * secondPercent
    ).toString()}, ${offX} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve
    ).toString()}
    C ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve * firstPercent
    ).toString()},  ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve * secondPercent
    ).toString()}, ${offX} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve
    ).toString()}
    C ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve * firstPercent
    ).toString()},  ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve * secondPercent
    ).toString()}, ${offX} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve
    ).toString()}
    C ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve * firstPercent
    ).toString()},  ${outerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve * secondPercent
    ).toString()}, ${offX} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve
    ).toString()}
    C ${innerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * cornerCurve * firstPercent
    ).toString()},  ${innerLeftCurveCoord} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * cornerCurve * secondPercent
    ).toString()}, ${offX} ${(
      offY +
      height -
      height * cornerCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * middleCurve -
      height * smallCurve -
      height * mediumCurve -
      height * smallCurve -
      height * cornerCurve
    ).toString()}
    
    Z`;
  };