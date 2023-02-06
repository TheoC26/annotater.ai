import React, { useRef } from "react";

const FileInputButton = ({onChange}) => {
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const onChangeHandler = (event) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    fileInputRef.current?.click();
    onChange(formData);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <label
        className="bg-grey cursor-pointer font-bold p-3 px-4 w-auto rounded-2xl text-base sm:text-xl text-gray-700"
        htmlFor="pdf-upload"
      >
        Upload PDF
      </label>
      <input
        className="hidden"
        multiple={false}
        ref={fileInputRef}
        onChange={onChangeHandler}
        type="file"
        accept=".pdf"
        id="pdf-upload"
      />
    </form>
  );
};

export default FileInputButton;
