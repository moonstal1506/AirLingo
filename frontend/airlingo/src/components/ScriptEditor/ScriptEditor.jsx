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

function ScriptEditor({ text, onChange }) {
    const reactQuillRef = useRef(null);
    const quillRef = useRef(null);

    const attachQuillRefs = () => {
        if (typeof reactQuillRef.current.getEditor !== "function") return;
        quillRef.current = reactQuillRef.current.getEditor();
    };
    useEffect(() => {
        attachQuillRefs();

        const ydoc = new Y.Doc();
        const provider = new WebrtcProvider("collab-demo-room", ydoc);
        const ytext = ydoc.getText("quill");

        const binding = new QuillBinding(ytext, quillRef.current, provider.awareness);
        console.log(binding);
    }, []);

    const modulesRef = {
        toolbar: [],
    };

    return (
        <Container>
            <ReactQuill
                ref={reactQuillRef}
                modules={modulesRef}
                theme="bubble"
                onChange={onChange}
                value={text}
            />
        </Container>
    );
}

const Container = styled.div`
    border-radius: 20px;
    border: 1px solid #000;
    width: 1150px;
    height: 320px;
`;

export default ScriptEditor;
