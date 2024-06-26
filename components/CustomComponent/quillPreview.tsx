"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface QuillPreviewProps {
    value: string;
};

export const QuillPreview = ({
    value,
}: QuillPreviewProps) => {
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
