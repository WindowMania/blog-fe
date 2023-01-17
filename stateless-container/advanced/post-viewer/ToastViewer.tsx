import '@toast-ui/editor/dist/toastui-editor.css';
import {Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

export interface Props {
    content: string;
}

const TuiEditor = ({content = ''}: Props) => {
    return (
        <div style={{width: '100%', height: '100%', marginTop: '10px'}}>
            {content && (
                <Viewer initialValue={content || ''}/>
            )}
        </div>
    );
};

export default TuiEditor;