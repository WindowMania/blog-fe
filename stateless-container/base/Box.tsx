import Box from "@mui/material/Box"
import styled from "@emotion/styled"

const DefaultBox = styled(Box)`
  display: flex;
`

export default DefaultBox;

export const CBox = styled(DefaultBox)`
    flex-direction: column;
`