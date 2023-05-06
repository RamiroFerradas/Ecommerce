import React, { useState } from "react";

export default function ToggleUrlSystemImage({
  setData,
  data,
  handleInputChange,
  error,
  setLoadingFile,
}) {
  const [fileUrlSistem, setFileUrlSistem] = useState(true);

  const valueName = Object.prototype.hasOwnProperty.call(data, "image_url")
    ? `image_url`
    : `logo_url`;

  const uploadImage = async (e) => {
    try {
      setLoadingFile(true);
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "imagenes");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dog9dgtxb/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setData((prevData) => ({
        ...prevData,
        [valueName]: file.secure_url,
      }));
      console.log(file.secure_url);
    } catch (error) {
      console.error(`Error subir imagen ==> ${error}`);
    } finally {
      setLoadingFile(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center gap-6">
        <div className="flex items-center ">
          <input
            id=""
            type="radio"
            value={data[valueName]}
            checked={fileUrlSistem}
            name={valueName}
            onClick={() => setFileUrlSistem(true)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor=""
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Sistema
          </label>
        </div>

        <div className="flex items-center ">
          <input
            id="default-radio-2"
            type="radio"
            checked={!fileUrlSistem}
            value=""
            onClick={() => setFileUrlSistem(false)}
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-radio-2"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Url
          </label>
        </div>
      </div>
      {!fileUrlSistem ? (
        <input
          type="text"
          name={valueName}
          id={valueName}
          placeholder="Ingresa la URL del logo de la marca"
          className="w-full border border-gray-400 p-2 rounded"
          defaultValue={data[valueName]}
          onChange={handleInputChange}
        />
      ) : (
        <div className="">
          <input
            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="default_size"
            type="file"
            onChange={uploadImage}
          />
        </div>
      )}
    </>
  );
}
