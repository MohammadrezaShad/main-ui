'use client';

import {useEffect, useRef} from 'react';

interface MonacoEditorProps {
  code: string;
  language: string;
}

const MonacoEditor = ({code, language}: MonacoEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);

  useEffect(() => {
    const loadMonaco = async () => {
      const monaco = await import('monaco-editor/esm/vs/editor/editor.api');
      await import('monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution');

      if (editorRef.current && !editorInstanceRef.current) {
        editorInstanceRef.current = monaco.editor.create(editorRef.current, {
          value: code,
          language,
          theme: 'vs-dark',
          readOnly: true,
          minimap: {
            enabled: false,
          },
        });
      }
    };

    loadMonaco();

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
        editorInstanceRef.current = null;
      }
    };
  }, [code, language]);

  return <div ref={editorRef} style={{height: '300px', width: '100%'}} />;
};

export default MonacoEditor;
