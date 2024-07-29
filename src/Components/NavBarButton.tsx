import './NavBarButton.css';

export type NavBarButtonProps = {
    title: string,
    icon: string,
    href?: string,
    target?: string,
    isActive?: boolean,
    onClick?: () => void,
};

export default function NavBarButton(props: NavBarButtonProps) {
    return (
        <a href={props.href ? props.href : "#null"}
           target={props.target ? props.target : undefined}
           onClick={props.onClick}
           title={props.title}><div className={`navbar-button ${props.isActive ? "active" : ""}`}><i className={"fa fa-" + props.icon}></i></div></a>
    );
}