'use client';

import {useEffect, useRef} from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

interface MonacoEditorProps {
  code: string;
  language: string;
}

const MonacoEditor = ({code, language}: MonacoEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
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

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
        editorInstanceRef.current = null;
      }
      monaco.editor.getModels().forEach(model => model.dispose());
    };
  }, [code, language]);

  return <div ref={editorRef} style={{height: '300px', width: '100%'}} />;
};

export default MonacoEditor;
