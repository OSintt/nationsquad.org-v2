import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DefaultTooltip } from '../defaultTooltip';

const ColorButton = styled(IconButton)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: '14px',
    '&:hover': {
        backgroundColor: "#222",
    },
}));

export const DoxAction = ({text, icon, funct, cl}) => (
    <DefaultTooltip title={text}>
        <div className={"single-dox-action"} onClick={funct}>
            <ColorButton aria-label={text}>
                {icon}
            </ColorButton>
        </div>
    </DefaultTooltip>

)