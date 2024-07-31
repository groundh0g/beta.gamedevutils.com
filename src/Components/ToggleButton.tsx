import './ToggleButton.css';
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../features/projectSlice'

export type ToggleButtonProps = {
    title: string,
    label: string,
    field: string,
    isActive?: boolean,
    onClick?: () => void,
};

export default function ToggleButton(props: ToggleButtonProps) {
    // @ts-ignore
    const isToggledOn = useSelector(state => !state.project[props.field]);
    const dispatch = useDispatch();

    const defaultOnClick = () => dispatch(toggle(props.field));
    const onClick = props.onClick || defaultOnClick;

    const classToggled = isToggledOn ? "toggled" : "";
    const classActive = props.isActive ? "active" : "";

    return (
        <div className="toggle-button">
            <a href="#null" onClick={onClick} title={props.title}>
                <div className="navbar-button">
                    <div className={`toggle-button-wrapper ${classToggled} ${classActive}`}>
                        {/*<div className="toggle-button-slider"></div>*/}
                        <div className="toggle-button-dot"></div>
                    </div>
                </div>
                {props.label}
            </a>
        </div>
    );
}