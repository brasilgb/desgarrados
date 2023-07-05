import React, { Fragment } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoAdd, IoBrowsersOutline, IoChatboxEllipsesOutline, IoChevronDownCircleSharp, IoCloseCircleSharp, IoSearch } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonDelete, ButtonEdit, ButtonNew } from "@/Components/BackEnd/Buttons";
import { IconContext } from "react-icons";
import { InputSearch } from "@/Components/BackEnd/Form";
import { ATable, ATd, ATh, ATr } from "@/Components/BackEnd/Table";
import APagination from "@/Components/BackEnd/Pagination";
import { Success } from '@/Components/BackEnd/FlashMessage';
import { usePage } from "@inertiajs/react";

type Props = {
  comments: any;
}

const Comments = ({ comments }: Props) => {

  const { messages } = usePage().props as any;
  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoChatboxEllipsesOutline />,
            title: "Comentarios"
          }}
          breadcumb={[
            { title: "Comentarios", url: "", divider: false }
          ]}
        />
        <ABoxAll>
          {messages.success && (
            <Success message={messages.success} />
          )}
          <ABoxHeader>
            <div className="px-4">
              <IconContext.Provider value={{ className: "text-xl text-gray-700" }}>
                <div>
                  <InputSearch placeholder="Buscar comentario" url="comments.index" />
                </div>
              </IconContext.Provider>
            </div>
            <div className="px-4">
              <ButtonNew url={'comments.create'} value={'Novo comentario'} icon={<IoAdd />} />
            </div>

          </ABoxHeader>

          <ABoxBody>
            <ATable>
              <ATr header={true}>
                <ATh>#ID</ATh>
                <ATh>Autor</ATh>
                <ATh>E-mail</ATh>
                <ATh>Comentário</ATh>
                <ATh classname="w-[50px]">Situação</ATh>
                <ATh classname="w-[210px]">{ }</ATh>
              </ATr>

              {comments.data.map((commentary: any, index: any) => (
                <Fragment key={index}>
                  <ATr header={false}>
                    <ATd>{commentary.id}</ATd>
                    <ATd>{commentary.author}</ATd>
                    <ATd>{commentary.email}</ATd>
                    <ATd>{(commentary.content).substring(0, 50)}</ATd>
                    <ATd>
                      <IconContext.Provider value={{ className: `text-2xl ${commentary.situation === 1 ? 'text-green-600' : 'text-red-500'}` }}>
                        {commentary.situation === 1
                          ? <span className="text-sm text-gray-50 bg-green-600 border border-green-600 shadow py-1.5 px-4 rounded">
                            Aprovado
                          </span>
                          : <span className="text-sm text-gray-50 bg-yellow-500 border border-yellow-500 shadow py-1.5 px-4 rounded">
                            Pendente
                          </span>
                        }
                      </IconContext.Provider>
                    </ATd>
                    <ATd>
                      <div className="flex items-center justify-end">
                        <div className="mr-1">
                          <ButtonEdit url={route('comments.edit', commentary.id)} />
                        </div>
                        <div className="ml-1">
                          <ButtonDelete url="comments.destroy" param={commentary.id} tipo="esta comentario" />
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
              <APagination data={comments} />
            </ABoxFooter>
          }

        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default Comments;