import './PanelHeader.css';
import NavBarButton from "./NavBarButton.tsx";

export type PanelHeaderProps = {
    title: string,
    label: string,
    groupName: string,
    showHideContent: (contentId: string) => void,
    isShown?: boolean,
    children?: React.ReactNode,
};

export default function PanelHeader(props: PanelHeaderProps) {
    const headerId = `PanelHeader-${props.groupName}`;
    const contentId = `${headerId}-content`;
    const isShown = props.isShown || props.isShown === undefined;

    return (
        <>
            <div id={headerId} className="panel-header panel-header-control">
                <a href="#null" title={props.title} onClick={() => props.showHideContent(contentId)}>{props.label}</a>
                <NavBarButton icon={isShown ? "eye-slash" : "eye"} onClick={() => props.showHideContent(contentId)} title={props.title} />
            </div>
            <div id={contentId} className="shown panel-header-content">
                {props.children}
            </div>
        </>
    );
}