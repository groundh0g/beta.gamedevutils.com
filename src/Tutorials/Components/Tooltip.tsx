import "./Tooltip.css";

export type TutorialTooltipProps = {
    // title: string,
    // text: string,
    // avatar: string,
    className?: string;
    isShown?: boolean,
    children?: React.ReactNode,
};

export default function Tooltip(props: TutorialTooltipProps) {
    const isShown = props.isShown || props.isShown === undefined;

    return (
        <>
            <div className={`tooltip ${isShown ? "" : "hidden"} ${props.className}`}>
                {props.children}
            </div>
        </>
    );
}