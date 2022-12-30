import Divider, {DividerProps} from '@mui/material/Divider';
import styled from '@emotion/styled'

const DefaultDivider = styled(Divider)`
  width: 100%;
`
export default DefaultDivider

export interface DividerTextProps extends DividerProps {
    text: string
    color?: string
    font_size?: string
}


const DividerTextRoot = styled('div')(({theme}) => ({
    width: '100%',
    '& > :not(style) + :not(style)': {
        marginTop: "16px",
    },
}));

export function DividerText(props: DividerTextProps) {
    const style = {
        fontSize: props.font_size ?? "11px",
        color: props.color ?? "rgba(0,0,0,0.7)"
    }
    return (
        <DividerTextRoot>
            <Divider {...props} style={style}>{props.text}</Divider>
        </DividerTextRoot>
    );
}


