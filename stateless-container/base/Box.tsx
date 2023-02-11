import Box, {BoxProps as MuiBoxProps} from "@mui/material/Box"
import styled from "@emotion/styled"

export interface BoxProps extends MuiBoxProps {

}

const DefaultBox = styled(Box)`
  display: flex;
`

export default DefaultBox;

export const CBox = styled(DefaultBox)`
  flex-direction: column;
`