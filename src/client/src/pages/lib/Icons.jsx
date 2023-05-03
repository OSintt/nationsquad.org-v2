import { DefaultTooltip } from "../defaultTooltip"
export const Icons = ({icon, title, placement}) => (
    <DefaultTooltip placement={placement} title={title}>
    <span>
        {icon}
    </span>
    </DefaultTooltip>
)
