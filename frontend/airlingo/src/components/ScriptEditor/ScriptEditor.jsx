/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { QuillBinding } from "y-quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import styled from "@emotion/styled";

function ScriptEditor({ quillRef, defaultEl, id }) {
    const reactQuillRef = useRef(null);

    useEffect(() => {
        if (typeof reactQuillRef.current.getEditor !== "function") return;
        quillRef.current = reactQuillRef.current.getEditor();

        const ydoc = new Y.Doc();
        const provider = new WebrtcProvider(`${id}`, ydoc, {
            signaling: ["wss://i9a308.p.ssafy.io/ywebrtc"],
        });
        const ytext = ydoc.getText("quill");
        const binding = new QuillBinding(ytext, quillRef.current, provider.awareness);

        setTimeout(() => {
            if (quillRef && quillRef.current && quillRef.current.getText() === "\n") {
                quillRef.current.setText("");
                quillRef.current.clipboard.dangerouslyPasteHTML(defaultEl);
            }
        }, 200);
    }, [quillRef]);

    return (
        <Container>
            <ReactQuill ref={reactQuillRef} theme="bubble" />
        </Container>
    );
}

const Container = styled.div`
    border-radius: 20px;
    border: 1px solid #000;
    width: 1150px;
    height: 320px;
    overflow-y: auto;
`;

export default ScriptEditor;
