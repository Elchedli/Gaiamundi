import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { usePageCarto } from 'hooks/usePageCarto';
import { $getRoot, $insertNodes } from 'lexical';
import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import { updatePageCarto } from 'services/page-carto';
import { debounce } from 'utils/debounce';

const AutoSavePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { data } = usePageCarto();
  const isInitialized = useRef(false);

  const updateHtmlPageCarto = useMutation({
    mutationFn: async (html: string) => {
      await updatePageCarto(data?.data.id || 0, { html: html });
    },
  });

  const debounceUpdate = useCallback(debounce(updateHtmlPageCarto.mutate), [
    updateHtmlPageCarto,
  ]);

  useEffect(() => {
    if (!isInitialized.current) {
      editor.update(() => {
        // In the browser you can use the native DOMParser API to parse the HTML string.
        const parser = new DOMParser();
        const dom = parser.parseFromString(data?.data.html || '', 'text/html');

        // Once you have the DOM instance it's easy to generate LexicalNodes.
        const nodes = $generateNodesFromDOM(editor, dom);

        // Select the root
        $getRoot().select();

        // Insert them at a selection.
        $insertNodes(nodes);
        isInitialized.current = true;
      });
      editor.registerUpdateListener(({ editorState }) => {
        // The latest EditorState can be found as `editorState`.
        // To read the contents of the EditorState, use the following API:

        editorState.read(() => {
          const html = $generateHtmlFromNodes(editor, null);
          debounceUpdate(html);
          // Just like editor.update(), .read() expects a closure where you can use
          // the $ prefixed helper functions.
        });
      });
      isInitialized.current = true;
    }
  }, []);
  return null;
};

export default AutoSavePlugin;
