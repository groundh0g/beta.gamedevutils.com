import {Action, ImageAsset, State} from "./_Types.ts";
import {Draft} from "@reduxjs/toolkit";

export const AddImage = (state: Draft<State>, action: Action) => {
    const parts = action.payload.split("|") as string[];
    state.assets[parts[0]] = {
        ordinal: Object.keys(state.assets).length,
        gameUrl: undefined,
        origUrl: parts[1],
    } as ImageAsset;
};

export const RemoveImages = (state: Draft<State>, action: Action) => {
    const parts = action.payload.split("|");
    const assets = state.assets;
    for(const part of parts) {
        const deletedOrdinal = assets[part].ordinal;
        delete assets[part];
        // close the gaps in asset ordinals
        const keys = Object.keys(assets);
        for(const key of keys) {
            const asset = assets[key];
            if(asset.ordinal > deletedOrdinal) {
                asset.ordinal = asset.ordinal - 1;
            }
        }
    }
};

export const SwapImages = (state: Draft<State>, action: Action) => {
    const assets = state.assets as any;
    const parts = (action.payload as string).split("|");
    if(parts.length > 1) {
        const srcAssetsItem = assets[parts[0]];
        const dstAssetsItem = assets[parts[1]];
        const srcOrdinal = srcAssetsItem.ordinal;

        srcAssetsItem.ordinal = dstAssetsItem.ordinal;
        dstAssetsItem.ordinal = srcOrdinal;

        assets[parts[0]] = srcAssetsItem;
        assets[parts[1]] = dstAssetsItem;
    }
};
