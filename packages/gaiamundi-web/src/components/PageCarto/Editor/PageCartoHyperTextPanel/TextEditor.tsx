import { FC } from 'react';
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
import AutoSavePlugin from './AutoSavePlugin';
import SnapshotButton from './SnapshotButton';

const TextEditor: FC = () => {
  return (
    <EditorComposer>
      <Editor
        hashtagsEnabled={true}
        locale="fr"
        placeholder="Commencez à écrire du texte ici!"
        actionsEnabled={false}
        emojisEnabled={true}
      >
        <AutoSavePlugin></AutoSavePlugin>
        <ToolbarPlugin defaultFontSize="15px">
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <InsertLinkButton />
          <InsertDropdown enablePoll={true} />
          <Divider />
          <SnapshotButton />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
};

export default TextEditor;
