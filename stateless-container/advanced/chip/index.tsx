import {styled} from "@mui/material";
import Chip from "@/stateless-container/base/Chip";


export const ChipStyled = styled(Chip)`
  color: ${
          props => props.selected === true ?
                  props.theme.fontColor.primary.main :
                  props.theme.fontColor.secondary.main
  };

  background-color: ${
          props => props.selected === true ?
                  props.theme.chip.secondary.main :
                  props.theme.chip.primary.main
  };

`


export const ChipListStyled = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
  margin: 0px;
`

export const ChipListItemStyled = styled('li')`
  margin: ${props => props.theme.spacing(0.5)};
`