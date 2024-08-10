import {Rectangle} from "./_Types.ts";

export const calcTrimRectangle = (data: Uint8ClampedArray, imageRect: Rectangle, threshold: number) : Rectangle => {
    // scan from top
    let top = -1;
    for(let y = 0; y < imageRect.height; y++) {
        for(let x = 0; x < imageRect.width; x++) {
            const index = y * imageRect.width * 4 + x * 4;
            if(data[index + 3] <= threshold) {
                top = y;
                break;
            }
        }
        if(top >= 0) {
            break;
        }
    }
    top = Math.max(top, 0);

    // scan from bottom
    let bottom = -1;
    for(let y = imageRect.y + imageRect.height - 1; y > top; y--) {
        for(let x = 0; x < imageRect.width; x++) {
            const index = y * imageRect.width * 4 + x * 4;
            if(data[index + 3] <= threshold) {
                bottom = y;
                break;
            }
        }
        if(bottom >= 0) {
            break;
        }
    }
    bottom = bottom <= 0 ? imageRect.height : bottom;

    // scan from left
    let left = -1;
    for(let x = 0; x < imageRect.width; x++) {
        for(let y = top; y < bottom; y++) {
            const index = y * imageRect.width * 4 + x * 4;
            if(data[index + 3] <= threshold) {
                left = x;
                break;
            }
        }
        if(left >= 0) {
            break;
        }
    }
    left = Math.max(left, 0);

    // scan from right
    let right = -1;
    for(let x = imageRect.x + imageRect.width - 1; x > left; x--) {
        for(let y = top; y < bottom; y++) {
            const index = y * imageRect.width * 4 + x * 4;
            if(data[index + 3] <= threshold) {
                right = x;
                break;
            }
        }
        if(right >= 0) {
            break;
        }
    }
    right = right < 0 ? imageRect.width : right;

    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    } as Rectangle;
};

export const doCleanAlpha = (data: Uint8ClampedArray, imageRect: Rectangle) : void => {
    for(let y = 0; y < imageRect.height; y++) {
        for(let x = 0; x < imageRect.width; x++) {
            const index = y * imageRect.width * 4 + x * 4;
            if(data[index + 3] === 0) {
                data[index] = 0;
                data[index + 1] = 0;
                data[index + 2] = 0;
            }
        }
    }
};

export const doColorMask = (data: Uint8ClampedArray, imageRect: Rectangle) : void => {
    const r = data[0];
    const g = data[1];
    const b = data[3];
    for(let y = 0; y < imageRect.height; y++) {
        for(let x = 0; x < imageRect.width; x++) {
            const index = y * imageRect.width * 4 + x * 4;
            if(data[index] === r && data[index + 1] === g && data[index + 2] === b) {
                data[index] = data[index + 1] = data[index + 2] = data[index + 3] = 0;
            }
        }
    }
};
