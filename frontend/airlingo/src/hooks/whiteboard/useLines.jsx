import { useCallback, useEffect, useRef, useState } from "react";
import * as Y from "yjs";

// ----------------------------------------------------------------------------------------------------

function useLines(yLines, provider, undoManager, doc, awareness) {
    const [isSynced, setIsSynced] = useState(false);
    const [lines, setLines] = useState([]);
    const rCurrentLine = useRef();

    useEffect(() => {
        function handleChange() {
            const currentLines = yLines.toArray();
            setLines(currentLines);
        }

        yLines.observe(handleChange);

        return () => yLines.unobserve(handleChange);
    }, [yLines]);

    const startLine = useCallback(
        (point) => {
            const id = Date.now().toString();
            const yPoints = new Y.Array();
            yPoints.push([...point]);

            const yLine = new Y.Map();

            undoManager.stopCapturing();

            const user = awareness.getLocalState();

            doc.transact(() => {
                yLine.set("id", id);
                yLine.set("points", yPoints);
                yLine.set("userColor", user.color);
                yLine.set("isComplete", false);
            });

            rCurrentLine.current = yLine;

            yLines.push([yLine]);
        },
        [awareness, doc, undoManager, yLines],
    );

    const addPointToLine = useCallback((point) => {
        const currentLine = rCurrentLine.current;

        if (!currentLine) return;

        const points = currentLine.get("points");

        if (!points) return;

        points.push([...point]);
    }, []);

    const completeLine = useCallback(() => {
        const currentLine = rCurrentLine.current;

        if (!currentLine) return;

        currentLine.set("isComplete", true);

        rCurrentLine.current = undefined;
    }, []);

    const clearAllLines = useCallback(() => {
        yLines.delete(0, yLines.length);
    }, [yLines]);

    const undoLine = useCallback(() => {
        undoManager.undo();
    }, [undoManager]);

    const redoLine = useCallback(() => {
        undoManager.redo();
    }, [undoManager]);

    useEffect(() => {
        function handleConnect() {
            setIsSynced(true);
            setLines(yLines.toArray());
        }

        function handleDisconnect() {
            provider.off("sync", handleConnect);
            provider.disconnect();
        }

        window.addEventListener("beforeunload", handleDisconnect);

        provider.on("sync", handleConnect);

        provider.connect();

        return () => {
            handleDisconnect();
            window.removeEventListener("beforeunload", handleDisconnect);
        };
    }, [yLines, provider]);

    return {
        isSynced,
        lines,
        startLine,
        addPointToLine,
        completeLine,
        clearAllLines,
        undoLine,
        redoLine,
    };
}

// ----------------------------------------------------------------------------------------------------

export default useLines;
