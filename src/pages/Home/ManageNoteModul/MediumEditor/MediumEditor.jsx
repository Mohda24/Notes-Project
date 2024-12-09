import React, { useEffect, useRef } from 'react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/themes/default.css';
import 'medium-editor/dist/css/medium-editor.css';

function MediumNoteEditor({ content, onChange }) {
    const editorContainerRef = useRef(null); // Ref for the div
    const editorInstanceRef = useRef(null); // Ref for the MediumEditor instance

    useEffect(() => {
        // Initialize MediumEditor on the DOM element
        if (editorContainerRef.current) {
            editorInstanceRef.current = new MediumEditor(editorContainerRef.current, {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'quote'],
                },
                placeholder: {
                    text: '',
                    hideOnClick: true,
                },
            });

            // Set initial content if empty
            if (editorContainerRef.current.innerHTML.trim() === '') {
                editorContainerRef.current.innerHTML = content;
            }

            // Handle content changes
            editorInstanceRef.current.subscribe('editableInput', () => {
                const updatedContent = editorContainerRef.current.innerHTML;
                if (onChange) {
                    onChange(updatedContent);
                }
            });
        }

        return () => {
            // Cleanup editor on unmount
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        // Update editor content only when the prop changes and differs from the current content
        if (
            editorContainerRef.current &&
            editorContainerRef.current.innerHTML !== content
        ) {
            editorContainerRef.current.innerHTML = content;
        }
    }, [content]);

    return (
        <div
            ref={editorContainerRef}
            spellCheck={false}
            className="medium-editor-container outline-none"
        ></div>
    );
}

export default MediumNoteEditor;
