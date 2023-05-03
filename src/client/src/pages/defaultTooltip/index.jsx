import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const DefaultTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} placement={props.placement} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#181818',
      color: '#fff',
      fontFamily: "Helvetica"
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#181818',
      }
  }));