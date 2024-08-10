// Manage Asset Frames
import {Draft} from "@reduxjs/toolkit";
import {Action, FrameMap, ImageMeta, Rectangle, State} from "./_Types.ts";
import {calcTrimRectangle, doCleanAlpha, doColorMask} from "./reducerFilters_Helpers.ts";

export const clearFrames = (state: Draft<State>, _action: Action) => {
    state.frames = {} as FrameMap;
};

export const populateFrames = (state: Draft<State>, _action: Action) => {
    // TODO: this is where filters and trim are applied, if configured
    const files = Object.keys(state.assets);
    for(const file of files) {
        (state.frames as any)[file] = {
            // TODO: get the width/height from the image data
            rect: { x:0, y:0, width: 0, height: 0},
            frameUrls: [] as string[],
        } as ImageMeta;
        // TODO: store GIF frames here, if configured
        state.frames[file].frameUrls.push(state.assets[file].origUrl);
    }
}

export const populateFrame = (state: Draft<State>, action: Action) => {
    const file = action.payload as string;

    // const origData = Buffer.from(state.assets[file].origUrl, 'base64');
    // const png = PNG.sync.readAsDataURL(origData);

    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        if(ctx) {
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data; // Array containing RGBA values for each pixel

            const imageRect = {
                x: 0,
                y: 0,
                width: img.width,
                height: img.height,
            } as Rectangle;

            if(state.settings.colorMask) {
                doColorMask(data, imageRect);
            }
            if(state.settings.cleanAlpha) {
                doCleanAlpha(data, imageRect);
            }
            let rectTrimmed = Object.assign({}, imageRect) as Rectangle;
            if(state.settings.trimSprites) {
                rectTrimmed = calcTrimRectangle(data, imageRect, state.settings.trimThreshold);
            }

            const canvas2 = document.createElement('canvas');
            const ctx2 = canvas.getContext('2d');

            canvas2.width = rectTrimmed.width - rectTrimmed.x;
            canvas2.height = rectTrimmed.height - rectTrimmed.y;
            if(ctx2) {
                ctx2.putImageData(imageData, -rectTrimmed.x, -rectTrimmed.y);
                //ctx2.drawImage(img, 0, 0);
                const newUrl = canvas2.toDataURL("image/png");

                const frames = state.frames as FrameMap;
                if(!frames[file]) {
                    frames[file] = {
                        // TODO: get the width/height from the image data
                        rect: Object.assign({}, rectTrimmed),
                        frameUrls: [] as string[],
                    } as ImageMeta;
                }
                frames[file].frameUrls.push(newUrl);
            }
        }
    };

    // trigger the image parsing to fire the code above
    img.src = state.assets[file].origUrl;
};
