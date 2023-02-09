import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles'

const Text = styled(Typography)``
export default Text

export const TextButton = styled(Text)`
  //font-size: 14px;
  //font-weight: 400;
  //margin-left: 8px;
  color: ${props => props.theme.fontColor.primary.summary};

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.fontColor.primary.main};
  }
`