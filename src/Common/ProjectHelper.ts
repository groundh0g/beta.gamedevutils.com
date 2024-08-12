import Project, {ImageItems} from "../objs/Project";
import ProjectOptions from "../objs/ProjectOptions";
import ImageItem from "../objs/ImageItem";
import ImageFrame from "../objs/ImageFrame";
import Rectangle from "../objs/Rectangle";

export default class ProjectHelper {

    private static DEFAULT_EXCLUDE = ['data', 'dataSrc'];

    public static Serialize(project : Project) : string {
        // save the frames with the project, but not their raw data
        const replacer = (key: string, value: any) => ProjectHelper.DEFAULT_EXCLUDE.indexOf(key) >= 0 ? undefined : value;
        return JSON.stringify(project, replacer, 3);
    }

    public static Deserialize(data: string, buildImageFrames: boolean) : Project {
        const result = Object.assign(new Project(), JSON.parse(data)) as Project;
        result.options = Object.assign(new ProjectOptions(), result.options) as ProjectOptions;
        for(let key of Object.getOwnPropertyNames(result.images)) {
            result.images[key] = Object.assign(new ImageItem(), result.images[key]) as ImageItem;
            const frames = result.images[key].frames;
            const newFrames = [] as ImageFrame[];
            if(frames) for(let i = 0; i < frames.length; i++) {
                const frame = Object.assign(new ImageFrame(), frames[i]) as ImageFrame;
                frame.spriteRect = Object.assign(new Rectangle(), frame.spriteRect);
                newFrames.push(frame);
            }
            result.images[key].frames = newFrames;
        }
        return result;
    }

}
