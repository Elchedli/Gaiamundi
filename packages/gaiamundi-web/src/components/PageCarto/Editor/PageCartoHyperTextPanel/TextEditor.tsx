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

const TextEditor: React.FC = () => {
  return (
    <EditorComposer>
      <Editor
        hashtagsEnabled={true}
        locale="fr"
        placeholder="Commencez à écrire du texte ici!"
        actionsEnabled={false}
        emojisEnabled={true}
      >
        <ToolbarPlugin defaultFontSize="15px">
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <InsertLinkButton />
          <InsertDropdown enablePoll={true} />
          <Divider />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
};

export default TextEditor;
