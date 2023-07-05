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
  pages: any;
}

const Pages = ({ pages }: Props) => {

  const { messages } = usePage().props as any;
  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoBrowsersOutline />,
            title: "Páginas"
          }}
          breadcumb={[
            { title: "Páginas", url: "", divider: false }
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
                  <InputSearch placeholder="Buscar página" url="pages.index" />
                </div>
              </IconContext.Provider>
            </div>
            <div className="px-4">
              <ButtonNew url={'pages.create'} value={'Nova página'} icon={<IoAdd />} />
            </div>

          </ABoxHeader>

          <ABoxBody>
            <ATable>
              <ATr header={true}>
                <ATh>#ID</ATh>
                <ATh>Title</ATh>
                <ATh>Resumo</ATh>
                <ATh>Slug</ATh>
                <ATh classname="w-[50px]">Ativa</ATh>
                <ATh classname="w-[210px]">{ }</ATh>
              </ATr>

              {pages.data.map((page: any, index: any) => (
                <Fragment key={index}>
                  <ATr header={false}>
                    <ATd>{page.id}</ATd>
                    <ATd>{page.title}</ATd>
                    <ATd>{page.summary}</ATd>
                    <ATd>{page.slug}</ATd>
                    <ATd>
                      <IconContext.Provider value={{ className: `text-2xl ${page.active ? 'text-green-600' : 'text-red-500'}` }}>
                        {page.active
                          ? <IoChevronDownCircleSharp />
                          : <IoCloseCircleSharp />
                        }
                      </IconContext.Provider>
                    </ATd>
                    <ATd>
                      <div className="flex items-center justify-end">
                        <div className="mr-1">
                          <ButtonEdit url={route('pages.edit', page.id)} />
                        </div>
                        <div className="ml-1">
                          <ButtonDelete url="pages.destroy" param={page.id} tipo="esta página" />
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
              <APagination data={pages} />
            </ABoxFooter>
          }

        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default Pages;