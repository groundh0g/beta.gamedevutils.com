import './NavBarSpacer.css';

export type NavBarSpacerProps = {
    isDotted?: boolean,
};

export default function NavBarSpacer(props: NavBarSpacerProps) {
    const classSuffix = props.isDotted ? "-dotted" : "";
    return (
        <div className='navbar-button-spacer'><span className={`navbar-button-spacer-line${classSuffix}`}> </span></div>
    );
}