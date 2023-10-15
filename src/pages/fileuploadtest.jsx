import React, { useState, useEffect } from "react";
import axios from "axios";

const fileuploadtest = () => {
  const [text, setText] = useState("");

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
          );
        },
      };

      const response = await axios.post(
        "/api/getTextFromPdfv3",
        formData,
        config
      );

      console.log("response", response.data);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} name="theFiles" />
      <div>{text}</div>
    </div>
  );
};

export default fileuploadtest;
