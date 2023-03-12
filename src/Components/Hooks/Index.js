import React, { useRef, useEffect } from "react";

const useContentEditable = ({ value, onChange }) => {
    const ref = useRef();

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        function handleInput() {
            const html = element.innerHTML;
            onChange(html);
        }

        function handlePaste(e) {
            e.preventDefault();
            const text = e.clipboardData.getData("text/plain");
            const html = escape(text);
            document.execCommand("insertHTML", false, html);
        }

        element.addEventListener("input", handleInput);
        element.addEventListener("paste", handlePaste);

        return () => {
            element.removeEventListener("input", handleInput);
            element.removeEventListener("paste", handlePaste);
        };
    }, [onChange]);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        element.innerHTML = value;
    }, [value]);

    return ref;
};

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (match) => {
        switch (match) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "'":
                return "&#39;";
            default:
                return match;
        }
    });
}

export default useContentEditable;
