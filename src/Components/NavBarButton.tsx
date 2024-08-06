import './NavBarButton.css';

export type NavBarButtonProps = {
    title: string,
    icon: string,
    href?: string,
    target?: string,
    isActive?: boolean,
    onClick?: () => void,
    isDisabled?: boolean,
};

export default function NavBarButton(props: NavBarButtonProps) {
    const classActive = props.isActive ? "active" : "";
    const classDisabled = props.isDisabled ? "disabled" : "";
    return (
        <a href={props.href ? props.href : "#null"}
           target={props.target ? props.target : undefined}
           onClick={() => {
               if (props.onClick && !props.isDisabled) {
                   props.onClick();
               }
           }}
           title={props.title}><div className={`navbar-button ${classActive} ${classDisabled}`}><i className={"fa fa-" + props.icon}></i></div></a>
    );
}