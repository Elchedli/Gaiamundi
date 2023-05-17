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
import TagsPageCarto from './TagsPageCarto';
const TextEditor: FC = () => {
  return (
    <>
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
      <TagsPageCarto tags={[]}></TagsPageCarto>
    </>
  );
};

export default TextEditor;
