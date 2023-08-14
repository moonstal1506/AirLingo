import { useEffect } from "react";

// ----------------------------------------------------------------------------------------------------

function useKeyBoardEvents(undoManager) {
    useEffect(() => {
        function handleKeyDown(event) {
            switch (event.key) {
                case "z": {
                    if (event.ctrlKey || event.metaKey) {
                        if (event.shiftKey) {
                            undoManager.redo();
                        } else {
                            undoManager.undo();
                        }
                    }
                    break;
                }
                default:
            }
        }

        document.body.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, [undoManager]);
}

// ----------------------------------------------------------------------------------------------------

export default useKeyBoardEvents;
