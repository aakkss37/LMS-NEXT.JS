"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface QuillEditorProps {
    onChange: (value: string) => void;
    value: string;
};

export const QuillEditor = ({
    onChange,
    value,
}: QuillEditorProps) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

    return (
        <div className="bg-white">
            <ReactQuill
                theme="bubble"
                value={value}
                readOnly
            />
        </div>
    );
};
