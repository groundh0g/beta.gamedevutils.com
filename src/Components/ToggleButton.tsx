import './ToggleButton.css';
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../features/projectSlice'
import {Project} from "../objects/Project.ts";

export type ToggleButtonProps = {
    title: string,
    label: string,
    field: string,
    isActive?: boolean,
    isTextRight?: boolean,
    onClick?: () => void,
};

export default function ToggleButton(props: ToggleButtonProps) {

    const project = useSelector(state => (state as any).project.settings as Project);
    const isToggledOn = `${(project as any)[props.field]}` === "true";

    const dispatch = useDispatch();

    // const emptyOnClick = () => { }
    const defaultOnClick = () => dispatch(toggle(props.field));
    const onClick = props.isActive && props.onClick ? props.onClick : defaultOnClick;

    const classToggled = isToggledOn ? "toggled" : "";
    const classActive = props.isActive || props.isActive === undefined ? "active" : "";

    const classShowTextLeft = !props.isTextRight ? "toggle-button-text" : "hidden";
    const classShowTextRight = props.isTextRight ? "toggle-button-text" : "hidden";

    return (
        <div className="toggle-button">
            <a href="#null" onClick={onClick} title={props.title}>
                <span className={`${classShowTextLeft}`}>{props.label}</span>
                <div className="navbar-button">
                    <div className={`toggle-button-wrapper ${classToggled} ${classActive}`}>
                        <div className="toggle-button-dot"></div>
                    </div>
                </div>
                <span className={`${classShowTextRight}`}>{props.label}</span>
            </a>
        </div>
    );
}