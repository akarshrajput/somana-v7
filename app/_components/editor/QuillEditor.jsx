"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuillEditor = ({ value, onChange }) => {
  return (
    <div className="border border-stone-400 rounded-lg overflow-hidden">
      <ReactQuill
        className="text-stone-800"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default QuillEditor;
