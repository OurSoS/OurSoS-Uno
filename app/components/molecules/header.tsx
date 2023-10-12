import IconTextBlock from "./iconTextBlock"
import TextStyles from "../atoms/text"


type HeaderProps = {
    title: string,
    hasBackButton: boolean,
    hasToggleSwitch: boolean,
    hasLocation: boolean,
    hasSearchbar: boolean,
    hasLogo: boolean,
}
export default function Header({ title, hasBackButton, hasToggleSwitch, hasLocation, hasSearchbar, hasLogo}: HeaderProps) {
return (<>
<h2>{title}</h2>
{hasBackButton && <IconTextBlock icon="arrow-left" text="back" iconLocation="left"/>}
</>)
}