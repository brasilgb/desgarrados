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

interface Props {
  galleries: any;
}

const Galleries = ({ galleries }: Props) => {

  const { messages } = usePage().props as any;
  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoBrowsersOutline />,
            title: "Galerias"
          }}
          breadcumb={[
            { title: "Galerias", url: "", divider: false }
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
                  <InputSearch placeholder="Buscar galeria" url="galleries.index" />
                </div>
              </IconContext.Provider>
            </div>
            <div className="px-4">
              <ButtonNew url={'galleries.create'} value={'Novo galeria'} icon={<IoAdd />} />
            </div>

          </ABoxHeader>

          <ABoxBody>
            <ATable>
              <ATr header={true}>
                <ATh>#ID</ATh>
                <ATh>Título</ATh>
                <ATh>Slug</ATh>
                <ATh>Imagens</ATh>
                <ATh classname="w-[50px]">Ativa</ATh>
                <ATh classname="w-[210px]">{ }</ATh>
              </ATr>

              {galleries.data.map((gallery: any, index: any) => (
                <Fragment key={index}>
                  <ATr header={false}>
                    <ATd>{gallery.id}</ATd>
                    <ATd>{gallery.title}</ATd>
                    <ATd>{gallery.slug}</ATd>
                    <ATd>{gallery.images.length}</ATd>
                    <ATd>
                      <IconContext.Provider value={{ className: `text-2xl ${gallery.active ? 'text-green-600' : 'text-red-500'}` }}>
                        {gallery.active
                          ? <IoChevronDownCircleSharp />
                          : <IoCloseCircleSharp />
                        }
                      </IconContext.Provider>
                    </ATd>
                    <ATd>
                      <div className="flex items-center justify-end">
                        <div className="mr-1">
                          <ButtonEdit url={route('galleries.edit', gallery.id)} />
                        </div>
                        <div className="ml-1">
                          <ButtonDelete url="galleries.destroy" param={gallery.id} tipo="esta galeria" />
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
              <APagination data={galleries} />
            </ABoxFooter>
          }

        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default Galleries;