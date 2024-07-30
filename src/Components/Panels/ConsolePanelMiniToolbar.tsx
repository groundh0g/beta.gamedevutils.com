import './ConsolePanelMiniToolbar.css';
import NavBarButton from "../NavBarButton.tsx";

export default function ConsolePanelMiniToolbar() {

    return (
        <div className="panel-console-mini-toolbar">
            <span>&nbsp;</span>
            <span>Console</span>
            <span>
                <NavBarButton title="Clear Log" icon="backspace" onClick={() => {}} />
            </span>
        </div>
    );
}
