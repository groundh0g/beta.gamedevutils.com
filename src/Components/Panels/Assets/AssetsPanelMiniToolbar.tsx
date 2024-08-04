import './AssetsPanelMiniToolbar.css';
import NavBarButton from "../../NavBarButton.tsx";

export default function AssetsPanelMiniToolbar() {

    return (
        <div className="panel-assets-mini-toolbar">
            <span>
                <NavBarButton title="Move Image(s) Up" icon="chevron-up" onClick={() => {}} />
                <NavBarButton title="Move Image(s) Down" icon="chevron-down" onClick={() => {}} />
                <NavBarButton title="Group Images" icon="object-group" onClick={() => {}} />
            </span>
            <span>Assets</span>
            <span>
                <NavBarButton title="Add Image(s)" icon="plus" onClick={() => {}} />
                <NavBarButton title="Select/Deselect All Image(s)" icon="check-double" onClick={() => {}} />
                <NavBarButton title="Delete Image(s)" icon="trash-alt" onClick={() => {}} />
            </span>
        </div>
    );
}
