import {SortByTypes} from "./Types";
import Project from "../objs/Project";

export type SortByCallbacks = { [key: string]: (project: Project) => string[] };

export default class SortHelper {

    public static SortByMethods: SortByCallbacks = {} as SortByCallbacks;
    public static RegisterSortByMethod(sortBy: SortByTypes, method: (project: Project) => string[]): void {
        if (sortBy) {
            if (!SortHelper.SortByMethods[sortBy]) {
                SortHelper.SortByMethods[sortBy] = method;
            }
        }
    }

    private static _initializeSortByMethods = (() => {

        SortHelper.RegisterSortByMethod("NAME", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doKeepExtension = project.options.nameInSheet === "Keep Extension";
                const name_a = (project.images[a].filename + (doKeepExtension ? "." + project.images[a].filetype : "")).toUpperCase();
                const name_b = (project.images[b].filename + (doKeepExtension ? "." + project.images[b].filetype : "")).toUpperCase();
                return name_a < name_b ? -1 : (name_a > name_b ? 1 : 0);
            });
        });

        SortHelper.RegisterSortByMethod("NAME_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doKeepExtension = project.options.nameInSheet === "Keep Extension";
                const name_a = (project.images[a].filename + (doKeepExtension ? "." + project.images[a].filetype : "")).toUpperCase();
                const name_b = (project.images[b].filename + (doKeepExtension ? "." + project.images[b].filetype : "")).toUpperCase();
                return name_a < name_b ? 1 : (name_a > name_b ? -1 : 0);
            });
        });

        SortHelper.RegisterSortByMethod("PATH", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const path_a = (project.images[a].fullpath ?? '').toUpperCase();
                const path_b = (project.images[b].fullpath ?? '').toUpperCase();
                return path_a < path_b ? -1 : (path_a > path_b ? 1 : 0);
            });
        });

        SortHelper.RegisterSortByMethod("PATH_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const path_a = (project.images[a].fullpath ?? '').toUpperCase();
                const path_b = (project.images[b].fullpath ?? '').toUpperCase();
                return path_a < path_b ? 1 : (path_a > path_b ? -1 : 0);
            });
        });

        SortHelper.RegisterSortByMethod("SHORTER_SIDE", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a = 0, side_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        side_a = (aFrames[0].spriteRect.width) < (aFrames[0].spriteRect.height) ? (aFrames[0].spriteRect.width) : (aFrames[0].spriteRect.height);
                        side_b = (bFrames[0].spriteRect.width) < (bFrames[0].spriteRect.height) ? (bFrames[0].spriteRect.width) : (bFrames[0].spriteRect.height);
                    }
                } else {
                    side_a = (project.images[a].width ?? 0) < (project.images[a].height ?? 0) ? (project.images[a].width ?? 0) : (project.images[a].height ?? 0);
                    side_b = (project.images[b].width ?? 0) < (project.images[b].height ?? 0) ? (project.images[b].width ?? 0) : (project.images[b].height ?? 0);
                }
                return (side_a < side_b) ? -1 : (side_a > side_b) ? 1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("SHORTER_SIDE_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a = 0, side_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        side_a = (aFrames[0].spriteRect.width) < (aFrames[0].spriteRect.height) ? (aFrames[0].spriteRect.width) : (aFrames[0].spriteRect.height);
                        side_b = (bFrames[0].spriteRect.width) < (bFrames[0].spriteRect.height) ? (bFrames[0].spriteRect.width) : (bFrames[0].spriteRect.height);
                    }
                } else {
                    side_a = (project.images[a].width ?? 0) < (project.images[a].height ?? 0) ? (project.images[a].width ?? 0) : (project.images[a].height ?? 0);
                    side_b = (project.images[b].width ?? 0) < (project.images[b].height ?? 0) ? (project.images[b].width ?? 0) : (project.images[b].height ?? 0);
                }
                return (side_a < side_b) ? 1 : (side_a > side_b) ? -1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("LONGER_SIDE", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a = 0, side_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        side_a = (aFrames[0].spriteRect.width) > (aFrames[0].spriteRect.height) ? (aFrames[0].spriteRect.width) : (aFrames[0].spriteRect.height);
                        side_b = (bFrames[0].spriteRect.width) > (bFrames[0].spriteRect.height) ? (bFrames[0].spriteRect.width) : (bFrames[0].spriteRect.height);
                    }
                } else {
                    side_a = (project.images[a].width ?? 0) > (project.images[a].height ?? 0) ? (project.images[a].width ?? 0) : (project.images[a].height ?? 0);
                    side_b = (project.images[b].width ?? 0) > (project.images[b].height ?? 0) ? (project.images[b].width ?? 0) : (project.images[b].height ?? 0);
                }
                return (side_a < side_b) ? -1 : (side_a > side_b) ? 1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("LONGER_SIDE_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a = 0, side_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        side_a = (aFrames[0].spriteRect.width) > (aFrames[0].spriteRect.height) ? (aFrames[0].spriteRect.width) : (aFrames[0].spriteRect.height);
                        side_b = (bFrames[0].spriteRect.width) > (bFrames[0].spriteRect.height) ? (bFrames[0].spriteRect.width) : (bFrames[0].spriteRect.height);
                    }
                } else {
                    side_a = (project.images[a].width ?? 0) > (project.images[a].height ?? 0) ? (project.images[a].width ?? 0) : (project.images[a].height ?? 0);
                    side_b = (project.images[b].width ?? 0) > (project.images[b].height ?? 0) ? (project.images[b].width ?? 0) : (project.images[b].height ?? 0);
                }
                return (side_a < side_b) ? 1 : (side_a > side_b) ? -1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("PERIMETER", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let sides_a = 0, sides_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        sides_a = (aFrames[0].spriteRect.width) * 2 + (aFrames[0].spriteRect.height) * 2;
                        sides_b = (bFrames[0].spriteRect.width) * 2 + (bFrames[0].spriteRect.height) * 2;
                    }
                } else {
                    sides_a = (project.images[a].width ?? 0) * 2 + (project.images[a].height ?? 0) * 2;
                    sides_b = (project.images[b].width ?? 0) * 2 + (project.images[b].height ?? 0) * 2;
                }
                return (sides_a < sides_b) ? -1 : (sides_a > sides_b) ? 1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("PERIMETER_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let sides_a = 0, sides_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        sides_a = (aFrames[0].spriteRect.width) * 2 + (aFrames[0].spriteRect.height) * 2;
                        sides_b = (bFrames[0].spriteRect.width) * 2 + (bFrames[0].spriteRect.height) * 2;
                    }
                } else {
                    sides_a = (project.images[a].width ?? 0) * 2 + (project.images[a].height ?? 0) * 2;
                    sides_b = (project.images[b].width ?? 0) * 2 + (project.images[b].height ?? 0) * 2;
                }
                return (sides_a < sides_b) ? 1 : (sides_a > sides_b) ? -1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("SIDE_DIFF", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a = 0, side_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        const aFrame = aFrames[0];
                        const bFrame = bFrames[0];
                        if (aFrame && bFrame) {
                            side_a = Math.abs((aFrame.spriteRect.width) - (aFrame.spriteRect.height));
                            side_b = Math.abs((bFrame.spriteRect.width) - (bFrame.spriteRect.height));
                        }
                    }
                } else {
                    side_a = Math.abs((project.images[a].width ?? 0) - (project.images[a].height ?? 0));
                    side_b = Math.abs((project.images[b].width ?? 0) - (project.images[b].height ?? 0));
                }
                return (side_a < side_b) ? -1 : (side_a > side_b) ? 1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("SIDE_DIFF_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a = 0, side_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        const aFrame = aFrames[0];
                        const bFrame = bFrames[0];
                        if (aFrame && bFrame) {
                            side_a = Math.abs((aFrame.spriteRect.width) - (aFrame.spriteRect.height));
                            side_b = Math.abs((bFrame.spriteRect.width) - (bFrame.spriteRect.height));
                        }
                    }
                } else {
                    side_a = Math.abs((project.images[a].width ?? 0) - (project.images[a].height ?? 0));
                    side_b = Math.abs((project.images[b].width ?? 0) - (project.images[b].height ?? 0));
                }
                return (side_a < side_b) ? 1 : (side_a > side_b) ? -1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("SIDE_RATIO", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let ratio_a = 0, ratio_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        ratio_a = Math.abs((aFrames[0].spriteRect.width) / (aFrames[0].spriteRect.height));
                        ratio_b = Math.abs((bFrames[0].spriteRect.width) / (bFrames[0].spriteRect.height));
                    }
                } else {
                    ratio_a = Math.abs((project.images[a].width ?? 0) / (project.images[a].height ?? 0));
                    ratio_b = Math.abs((project.images[b].width ?? 0) / (project.images[b].height ?? 0));
                }
                return (ratio_a < ratio_b) ? -1 : (ratio_a > ratio_b) ? 1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("SIDE_RATIO_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let ratio_a = 0, ratio_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        ratio_a = Math.abs((aFrames[0].spriteRect.width) / (aFrames[0].spriteRect.height));
                        ratio_b = Math.abs((bFrames[0].spriteRect.width) / (bFrames[0].spriteRect.height));
                    }
                } else {
                    ratio_a = Math.abs((project.images[a].width ?? 0) / (project.images[a].height ?? 0));
                    ratio_b = Math.abs((project.images[b].width ?? 0) / (project.images[b].height ?? 0));
                }
                return (ratio_a < ratio_b) ? 1 : (ratio_a > ratio_b) ? -1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("WIDTH", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let width_a = 0, width_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        width_a = aFrames[0].spriteRect.width;
                        width_b = bFrames[0].spriteRect.width;
                    }
                } else {
                    width_a = project.images[a].width ?? 0;
                    width_b = project.images[b].width ?? 0;
                }
                return (width_a < width_b) ? -1 : (width_a > width_b) ? 1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("WIDTH_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let width_a = 0, width_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        width_a = aFrames[0].spriteRect.width;
                        width_b = bFrames[0].spriteRect.width;
                    }
                } else {
                    width_a = project.images[a].width ?? 0;
                    width_b = project.images[b].width ?? 0;
                }
                return (width_a < width_b) ? 1 : (width_a > width_b) ? -1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("HEIGHT", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let height_a = 0, height_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        height_a = aFrames[0].spriteRect.height;
                        height_b = bFrames[0].spriteRect.height;
                    }
                } else {
                    height_a = project.images[a].height ?? 0;
                    height_b = project.images[b].height ?? 0;
                }
                return (height_a < height_b) ? -1 : (height_a > height_b) ? 1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("HEIGHT_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let height_a = 0, height_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        height_a = aFrames[0].spriteRect.height;
                        height_b = bFrames[0].spriteRect.height;
                    }
                } else {
                    height_a = project.images[a].height ?? 0;
                    height_b = project.images[b].height ?? 0;
                }
                return (height_a < height_b) ? 1 : (height_a > height_b) ? -1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("AREA", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let width_a = 0, width_b = 0;
                let height_a = 0, height_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        width_a = aFrames[0].spriteRect.width;
                        width_b = bFrames[0].spriteRect.width;
                        height_a = aFrames[0].spriteRect.height;
                        height_b = bFrames[0].spriteRect.height;
                    }
                } else {
                    width_a = project.images[a].width ?? 0;
                    width_b = project.images[b].width ?? 0;
                    height_a = project.images[a].height ?? 0;
                    height_b = project.images[b].height ?? 0;
                }
                const area_a = width_a * height_a;
                const area_b = width_b * height_b;
                return (area_a < area_b) ? -1 : (area_a > area_b) ? 1 : 0;
            });
        });

        SortHelper.RegisterSortByMethod("AREA_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let width_a = 0, width_b = 0;
                let height_a = 0, height_b = 0;
                if (project.options.trimMode === "Trim") {
                    const aFrames = project.images[a].frames;
                    const bFrames = project.images[b].frames;
                    if (aFrames && bFrames) {
                        width_a = aFrames[0]?.spriteRect?.width ?? 0;
                        width_b = bFrames[0]?.spriteRect?.width ?? 0;
                        height_a = aFrames[0]?.spriteRect?.height ?? 0;
                        height_b = bFrames[0]?.spriteRect?.height ?? 0;
                    }
                } else {
                    width_a = project.images[a].width ?? 0;
                    width_b = project.images[b].width ?? 0;
                    height_a = project.images[a].height ?? 0;
                    height_b = project.images[b].height ?? 0;
                }
                const area_a = width_a * height_a;
                const area_b = width_b * height_b;
                return (area_a < area_b) ? 1 : (area_a > area_b) ? -1 : 0;
            });
        });

        return true;
    })();

}