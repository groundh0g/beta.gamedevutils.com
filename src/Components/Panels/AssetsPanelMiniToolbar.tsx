import './AssetsPanelMiniToolbar.css';
import NavBarButton from "../NavBarButton.tsx";

export default function AssetsPanelMiniToolbar() {

    return (
        <div className="panel-assets-mini-toolbar">
            <span>
                <NavBarButton title="Move Image Up" icon="chevron-up" onClick={() => {}} />
                <NavBarButton title="Move Image Down" icon="chevron-down" onClick={() => {}} />
            </span>
            <span>Assets</span>
            <span>
                <NavBarButton title="Add Image(s)" icon="plus" onClick={() => {}} />
                <NavBarButton title="Delete Image(s)" icon="trash-alt" onClick={() => {}} />
            </span>
        </div>
    );
}
