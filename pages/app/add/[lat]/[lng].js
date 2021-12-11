import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Widget } from "@uploadcare/react-widget";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const Add = () => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { lat, lng } = router.query;
  const handleEditorChange = ({ html, text }) => {
    setValue(text);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data["lat"] = parseFloat(lat);
    data["lng"] = parseFloat(lng);
    data["image"] = image;
    data["description"] = value;
    console.log(data);
    const res = await fetch("/api/data", {
      method: "post",
      body: JSON.stringify(data),
    });
    console.log(res);
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="text"
        placeholder="Name"
        {...register("name", {})}
      />
      <input
        className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="text"
        placeholder="Place"
        {...register("place", {})}
      />
      <Widget
        publicKey="624de14caf2cf3c7f75c"
        onChange={(info) => setImage(info.cdnUrl)}
        id="file"
        previewStep="true"
      />
      <input
        className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="url"
        placeholder="Youtube Url"
        {...register("youtube", {})}
      />
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />

      <input
        className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/3"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default Add;
