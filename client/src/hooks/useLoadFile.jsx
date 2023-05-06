import React, { useState } from "react";

export default function useLoadFile({ setBrandData }) {
  const [loading, setLoading] = useState(true);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "imagenes");
    setLoading(true);
    const res = (
      await fetch("https://api.cloudinary.com/v1_1/dog9dgtxb/image/upload", {
        method: "POST",
        body: data,
      })
    ).json();
    console.log(res);
  };
  return <div>useLoadFile</div>;
}
