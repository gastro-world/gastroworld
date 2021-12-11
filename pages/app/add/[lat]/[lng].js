import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Widget } from "@uploadcare/react-widget";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import confetti from "canvas-confetti";

const mdParser = new MarkdownIt();

const Add = () => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState({});
  const router = useRouter();
  const { lat, lng } = router.query;
  const handleEditorChange = ({ html, text }) => {
    setValue(html);
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data["lat"] = parseFloat(lat);
    data["lng"] = parseFloat(lng);
    data["image"] = image;
    data["description"] = value;
    console.log(data);
    toast.promise(
      fetch("/api/data", { method: "post", body: JSON.stringify(data) }),
      {
        loading: "Saving...",
        success: <b>Yor food was saved!</b>,
        error: <b>Could not save. :(</b>,
      }
    );
    confetti({
      particleCount: 500,
      spread: 150,
      origin: { y: 0 },
    });
  };
  const handleChange = () => {
    let data = getValues();
    data["lat"] = parseFloat(lat);
    data["lng"] = parseFloat(lng);
    data["image"] = image;
    data["description"] = value;
    console.log(data);
    setPreview(data);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-row flex-wrap justify-between">
        <div className="w-3/6">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => handleChange()}
          >
            <input
              className="appearance-none block w-4/5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Name"
              {...register("name", {})}
            />
            <input
              className="appearance-none block w-4/5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              className="appearance-none block w-4/5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="url"
              placeholder="Youtube Url"
              {...register("youtube", {})}
            />
            <MdEditor
              className="w-5/6 h-96"
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              preview="edit"
            />

            <input
              className="m-4 bg-blue-500 w-4/5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        <div className="w-3/6 flex items-center flex-col ">
          {preview.image && (
            <img
              src={preview.image}
              alt={"example"}
              className="w-3/5"
            />
          )}{" "}
          <h1 className="text-center text-4xl font-bold">{preview.name}</h1>
          <h2 className="text-center text-2xl font-semibold">
            {preview.place}
          </h2>
          {preview.youtube && (
            <a
              href={preview.youtube}
              className="text-base text-blue-400 underline"
            >
              View youtube video
            </a>
          )}
          <div className="block">
            <div
              className="container-2"
              dangerouslySetInnerHTML={{ __html: preview.description }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
