import React, { Fragment } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoAdd, IoBrowsersOutline, IoChatboxEllipsesOutline, IoChatbubblesOutline, IoChevronDownCircleSharp, IoCloseCircleSharp, IoSearch } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonDelete, ButtonEdit, ButtonNew } from "@/Components/BackEnd/Buttons";
import { IconContext } from "react-icons";
import { InputSearch } from "@/Components/BackEnd/Form";
import { ATable, ATd, ATh, ATr } from "@/Components/BackEnd/Table";
import APagination from "@/Components/BackEnd/Pagination";
import { Success } from '@/Components/BackEnd/FlashMessage';
import { usePage } from "@inertiajs/react";

type Props = {
  messageuser: any;
}

const Messages = ({ messageuser }: Props) => {

  const { messages } = usePage().props as any;
  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoChatbubblesOutline />,
            title: "Mensagens"
          }}
          breadcumb={[
            { title: "Mensagens", url: "", divider: false }
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
                  <InputSearch placeholder="Buscar mensagem" url="messages.index" />
                </div>
              </IconContext.Provider>
            </div>
            <div className="px-4">
              <ButtonNew url={'messages.create'} value={'Novo mensagem'} icon={<IoAdd />} />
            </div>

          </ABoxHeader>

          <ABoxBody>
            <ATable>
              <ATr header={true}>
                <ATh>#ID</ATh>
                <ATh>Nome</ATh>
                <ATh>Estado</ATh>
                <ATh>Cidade</ATh>
                <ATh>Mensagem</ATh>
                <ATh classname="w-[50px]">Situação</ATh>
                <ATh classname="w-[210px]">{ }</ATh>
              </ATr>

              {messageuser.data.map((msg: any, index: any) => (
                <Fragment key={index}>
                  <ATr header={false}>
                    <ATd>{msg.id}</ATd>
                    <ATd>{msg.name}</ATd>
                    <ATd>{msg.state}</ATd>
                    <ATd>{msg.city}</ATd>
                    <ATd>{(msg.message).substring(0, 50)}...</ATd>
                    <ATd>
                      <IconContext.Provider value={{ className: `text-2xl ${msg.situation === 1 ? 'text-green-600' : 'text-red-500'}` }}>
                        {msg.situation === 1
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
                          <ButtonEdit url={route('messages.edit', msg.id)} />
                        </div>
                        <div className="ml-1">
                          <ButtonDelete url="messages.destroy" param={msg.id} tipo="esta mensagem" />
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
              <APagination data={messageuser} />
            </ABoxFooter>
          }

        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default Messages;