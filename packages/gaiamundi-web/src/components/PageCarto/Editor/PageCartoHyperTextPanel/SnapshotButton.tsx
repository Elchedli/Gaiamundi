import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { usePageCarto } from 'hooks/usePageCarto';
import { useSnapshot } from 'hooks/useSnapshot';

const SnapshotButton = () => {
  const { pageCartoId } = usePageCarto();
  const { addSnapshot } = useSnapshot();
  const [editor] = useLexicalComposerContext();

  const handleClick = async () => {
    try {
      const snapshot = await addSnapshot();
      let link = `/page-carto/${pageCartoId}#${snapshot.data.id}`;
      if (snapshot.data.geoCode) {
        link += `,${snapshot.data.geoCode}`;
      }
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, link);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Unable to create snapshot');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={'toolbar-item spaced '}
      title={`Snapshot`}
      type="button"
    >
      <i className="icon plus" /> <span className="text">Snapshot</span>
    </button>
  );
};

export default SnapshotButton;
