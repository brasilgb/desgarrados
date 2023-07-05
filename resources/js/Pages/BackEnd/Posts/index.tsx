import React, { Fragment } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoAdd, IoBrowsersOutline, IoChevronDownCircleSharp, IoCloseCircleSharp, IoSearch } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonDelete, ButtonEdit, ButtonNew } from "@/Components/BackEnd/Buttons";
import { IconContext } from "react-icons";
import { InputSearch } from "@/Components/BackEnd/Form";
import { ATable, ATd, ATh, ATr } from "@/Components/BackEnd/Table";
import APagination from "@/Components/BackEnd/Pagination";
import { Success } from '@/Components/BackEnd/FlashMessage';
import { usePage } from "@inertiajs/react";

type Props = {
  posts: any;
}

const Posts = ({ posts }: Props) => {

  const { messages } = usePage().props as any;
  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoBrowsersOutline />,
            title: "Postagens"
          }}
          breadcumb={[
            { title: "Postagens", url: "", divider: false }
          ]}
        />
        <ABoxAll>
          {messages.success && (
            <Success message={messages.success} />
          )}
          <ABoxHeader>
            <div className="px-4">
              <InputSearch placeholder="Buscar postagem" url="posts.index" />
            </div>
            <div className="px-4">
              <ButtonNew url={'posts.create'} value={'Nova postagem'} icon={<IoAdd />} />
            </div>
          </ABoxHeader>

          <ABoxBody>
            <ATable>
              <ATr header={true}>
                <ATh>#ID</ATh>
                <ATh>Title</ATh>
                <ATh>Resumo</ATh>
                <ATh>Slug</ATh>
                <ATh>Categorias</ATh>
                <ATh classname="w-[50px]">Ativa</ATh>
                <ATh classname="w-[210px]">{ }</ATh>
              </ATr>

              {posts.data.map((post: any, index: any) => (
                <Fragment key={index}>
                  <ATr header={false}>
                    <ATd>{post.id}</ATd>
                    <ATd>{post.title}</ATd>
                    <ATd>{post.summary}</ATd>
                    <ATd>{post.slug}</ATd>
                    <ATd>
                      <div className="grid grid-cols-2 gap-1">
                        {post.categories.map((c: any, i: any) => (
                          <span key={i} className="px-2 py-1 bg-yellow-100 rounded-md border ">{c.name}</span>
                        ))}
                      </div>
                    </ATd>
                    <ATd>
                      <IconContext.Provider value={{ className: `text-2xl ${post.active ? 'text-green-600' : 'text-red-500'}` }}>
                        {post.active
                          ? <IoChevronDownCircleSharp />
                          : <IoCloseCircleSharp />
                        }
                      </IconContext.Provider>
                    </ATd>
                    <ATd>
                      <div className="flex items-center justify-end">
                        <div className="mr-1">
                          <ButtonEdit url={route('posts.edit', post.id)} />
                        </div>
                        <div className="ml-1">
                          <ButtonDelete url="posts.destroy" param={post.id} tipo="esta postagem" />
                        </div>
                      </div>
                    </ATd>
                  </ATr>
                </Fragment>
              ))}

            </ATable>
          </ABoxBody>

          {APagination &&
            <ABoxFooter>
              <APagination data={posts} />
            </ABoxFooter>
          }

        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default Posts;