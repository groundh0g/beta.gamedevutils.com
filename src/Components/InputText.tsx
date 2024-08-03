import './InputText.css';
import { useSelector, useDispatch } from 'react-redux'
import { setValue } from '../features/projectSlice'
import {Project} from "../objects/Project.ts";

export type InputTextProps = {
    title: string,
    label: string,
    field: string,
    isActive?: boolean,
    isTextRight?: boolean,
    onBlur?: (value: string) => void,
};

export default function InputText(props: InputTextProps) {
    const id = `TextInput-${props.field}`;

    const project = useSelector(state => (state as any).project.project as Project);
    const storeValue = `${(project as any)[props.field]}`;

    const dispatch = useDispatch();

    const onKeyUp = (event: any) => {
        if(event.code === "Enter") { (event.target as HTMLInputElement).blur(); }
    };

    const onBlur = (event: any) => {
        if(props.isActive) {
            let value = storeValue;
            try {
                value = (event.target as HTMLInputElement).value;
            } catch(e) { }
            dispatch(setValue(`${props.field}:${value+1}`));
            if(props.onBlur) { props.onBlur(value); }
        }
    };

    const onClickTextInput = (event: any) => {
        if(props.isActive) {
            (event.target as HTMLInputElement).select();
        }
    };

    const onClickLinkText = () => {
        (document.querySelector(`#${id}`) as HTMLInputElement).select();
    };

    // const classActive = props.isActive || props.isActive === undefined ? "active" : "";

    const classShowLabelLeft = !props.isTextRight ? "input-text-label" : "hidden";
    const classShowLabelRight = props.isTextRight ? "input-text-label" : "hidden";

    return (
        <div className="input-text">
            <a href="#null" onClick={onClickLinkText} title={props.title}>
                <span className={`${classShowLabelLeft}`}>{props.label}</span>
                <input
                    type="text"
                    id={id}
                    placeholder={props.label}
                    defaultValue={storeValue}
                    onBlur={onBlur}
                    onClick={onClickTextInput}
                    onKeyUp={onKeyUp}
                />
                <span className={`${classShowLabelRight}`}>{props.label}</span>
            </a>
        </div>
    );
}