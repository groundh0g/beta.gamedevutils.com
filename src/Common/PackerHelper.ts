// import Project from "../objs/Project";
// import {CallbackStatusTypes} from "./Types";
// import BasePacker from "./spritePackers/BasePacker";
// import Rectangle from "../objs/Rectangle";
//
// export type Packers = { [key: string]: BasePacker };
//
// export default class PackerHelper {
//
//     public static RegisteredPackers: Packers = {} as Packers;
//     public static RegisterPacker(packer: BasePacker) : boolean {
//         const key = packer.GetPackerType();
//         if(key) {
//             if (!PackerHelper.RegisteredPackers[key]) {
//                 PackerHelper.RegisteredPackers[key] = packer;
//                 return true;
//             }
//         }
//         return false;
//     }
//
//     public static PaddedCanvas(project: Project, width?: number, height?: number) {
//         const padding = Math.max(project.options.borderPadding ?? 2, project.options.shapePadding ?? 2);
//         width = width ?? 32;
//         height = height ?? 32;
//
//         return Rectangle.Inflate(Rectangle.Create(0, 0, width, height, false), -padding);
//     }
//
//     // public static PaddedSprite(project: Project, x?: number, y?: number, width?: number, height?: number) {
//     //     const padding = 2 * (project.options.shapePadding ?? 2);
//     //     width = width ?? 32;
//     //     height = height ?? 32;
//     //
//     //     return Rectangle.Create(x ?? 0, y ?? 0, width + padding, height + padding, false);
//     // }
//
//     public static PaddedSprite(project: Project, rect?: Rectangle) {
//         const padding = 2 * (project.options.shapePadding ?? 2);
//         rect = rect ?? Rectangle.Create(0, 0, 32, 32);
//         rect.width = rect.width + padding;
//         rect.height = rect.height + padding;
//         return Rectangle.Create(rect?.x ?? 0, rect?.y ?? 0, (rect?.width ?? 0) + padding, (rect?.height ?? 0) + padding);
//     }
// }
