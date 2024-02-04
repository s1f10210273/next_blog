// @ts-nocheck
"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { useRef, useEffect } from 'react';
import { Toaster,toast } from 'react-hot-toast';

const baseUrl = "http://localhost:3000/api/blog/"

const editBlog = async (title: String | undefined, description: String| undefined, id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, id }),
  });
  return res.json();
}

const getBlogById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  console.log(data);
  return data.posts;
}

const deleteBlog = async ( id: number) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

const page = ({params}: { params: { id: number }}) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("編集中です");//ローディング
    await editBlog(titleRef.current?.value, descriptionRef.current?.value, params.id)
    toast.success("編集に成功しました");//ローディング

    router.push("/");
  };

  const handleDelete = async (e: React.FormEvent) => {
    toast.success("削除中です");
    await deleteBlog(params.id);
  };

  useEffect(() => {
    getBlogById(params.id).then((data) => {
      if (titleRef.current && descriptionRef.current) {
        titleRef.current.value = data.title;
        descriptionRef.current.value = data.description;
      }
    }).catch(err => {
      console.log(err);
      toast.error("エラーが発生しました");
    });
  }, [params.id]);

  return (
    <>
    <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
          <form onSubmit={handleSubmit}>
            <input
              ref = {titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref = {descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              更新
            </button>
            <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;