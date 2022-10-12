import React from "react";
import { Post } from "../typing";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  _id?: string;
  name?: string;
  email?: string;
  comment?: string;
}

interface Props {
  post: Post;
}

function FormHandler({ post }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
        <input {...register("_id")} type="hidden" name="_id" value={post._id} />
        <div className="overflow-hidden shadow-xl sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="mt-1 py-2 bg-amber-800 text-white px-3 outline-none border-none block w-full rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="family-name"
                  className="mt-1 py-2 bg-amber-800 text-white px-3 outline-none border-none block w-full rounded-md"
                />
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comment
                </label>
                <textarea
                  {...register("comment", { required: true })}
                  rows={6}
                  name="comment"
                  id="comment"
                  autoComplete="email"
                  className="mt-1 py-2 bg-amber-800 text-white px-3 outline-none border-none block w-full rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-amber-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>

        <div className="p-5">
          {errors.name && (
            <span className="text-red-500 block">
              The Name Field is required
            </span>
          )}
          {errors.comment && (
            <span className="text-red-500 block">
              The Comment Field is required
            </span>
          )}
          {errors.email && (
            <span className="text-red-500 block">
              The Email Field is required
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormHandler;
