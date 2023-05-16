import {
  BoldButton,
  Divider,
  Editor,
  EditorComposer,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  ToolbarPlugin,
  UnderlineButton,
} from 'verbum';

interface TextEditorProps {
  canEdit: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ canEdit }) => {
  return (
    <EditorComposer>
      <Editor
        hashtagsEnabled={true}
        locale="fr"
        placeholder={canEdit === true ? 'Commencez à écrire du texte ici!' : ''}
        actionsEnabled={false}
        emojisEnabled={true}
        isEditable={canEdit}
      >
        {canEdit === true ? (
          <ToolbarPlugin defaultFontSize="15px">
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <InsertLinkButton />
            <InsertDropdown enablePoll={true} />
            <Divider />
          </ToolbarPlugin>
        ) : (
          ''
        )}
      </Editor>
    </EditorComposer>
  );
};

export default TextEditor;
