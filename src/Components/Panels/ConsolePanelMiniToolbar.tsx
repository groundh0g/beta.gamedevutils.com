import './ConsolePanelMiniToolbar.css';
import NavBarButton from "../NavBarButton.tsx";
import Console from "../../utils/Console.ts";
import {useDispatch} from "react-redux";

export default function ConsolePanelMiniToolbar() {
    const dispatch = useDispatch();

    return (
        <div className="panel-console-mini-toolbar">
            <span>&nbsp;</span>
            <span>Console</span>
            <span>
                <NavBarButton title="Clear Log" icon="backspace" onClick={() => {
                    Console.Clear(dispatch);
                }} />
            </span>
        </div>
    );
}
