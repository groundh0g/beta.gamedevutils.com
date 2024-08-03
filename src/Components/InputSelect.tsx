import './InputSelect.css';
import { useSelector, useDispatch } from 'react-redux'
import { setEnum } from '../features/projectSlice'
import { Project } from "../objects/Project.ts";

export type InputSelectProps = {
    title: string,
    label: string,
    field: string,
    isActive?: boolean,
    isTextRight?: boolean,
    onSelect?: (value: string) => void,
};

export default function InputSelect(props: InputSelectProps) {
    const id = `SelectInput-${props.field}`;

    // @ts-ignore
    const project = useSelector(state => (state as any).project.project as Project);
    const lookups = useSelector(state => (state as any).project.lookups[props.field] as string[]);
    const storeValue = `${(project as any)[props.field]}`;

    const dispatch = useDispatch();

    // const onClickTextInput = (event: any) => {
    //     if(props.isActive) {
    //         (event.target as HTMLSelectElement).focus();
    //     }
    // };

    const onClickLinkText = () => {
        (document.querySelector(`#${id}`) as HTMLSelectElement).focus();
    };

    // const classActive = props.isActive || props.isActive === undefined ? "active" : "";

    const classShowLabelLeft = !props.isTextRight ? "input-select-label" : "hidden";
    const classShowLabelRight = props.isTextRight ? "input-select-label" : "hidden";

    return (
        <div className="input-select">
            <a href="#null" onClick={onClickLinkText} title={props.title}>
                <span className={`${classShowLabelLeft}`}>{props.label}</span>
                <select
                    id={id}
                    name={props.field}
                    title={props.title}
                    defaultValue={storeValue}
                    onSelect={(event: any) => {
                        dispatch(setEnum(`${props.field}:${event.target.value}`));
                    }} >
                    {lookups.map((item) => (<option value={item} key={item}>{item}</option>))}
                </select>
                <span className={`${classShowLabelRight}`}>{props.label}</span>
            </a>
        </div>
    );
}