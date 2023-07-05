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
  categories: any;
}

const Categories = ({ categories }: Props) => {

  const { messages } = usePage().props as any;
  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoBrowsersOutline />,
            title: "Categorias"
          }}
          breadcumb={[
            { title: "Categorias", url: "", divider: false }
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
                  <InputSearch placeholder="Buscar categoria" url="categories.index" />
                </div>
              </IconContext.Provider>
            </div>
            <div className="px-4">
              <ButtonNew url={'categories.create'} value={'Nova categoria'} icon={<IoAdd />} />
            </div>

          </ABoxHeader>

          <ABoxBody>
            <ATable>
              <ATr header={true}>
                <ATh>#ID</ATh>
                <ATh>Categoria</ATh>
                <ATh>Slug</ATh>
                <ATh>Sub-categorias</ATh>
                <ATh>Postagens</ATh>
                <ATh classname="w-[50px]">Ativa</ATh>
                <ATh classname="w-[210px]">{ }</ATh>
              </ATr>

              {categories.data.map((category: any, index: any) => (
                <Fragment key={index}>
                  <ATr header={false}>
                    <ATd>{category.id}</ATd>
                    <ATd>{category.name}</ATd>
                    <ATd>{category.slug}</ATd>
                    <ATd>{category.sub_categories.length}</ATd>
                    <ATd>{category.posts.length}</ATd>
                    <ATd>
                      <IconContext.Provider value={{ className: `text-2xl ${category.active ? 'text-green-600' : 'text-red-500'}` }}>
                        {category.active
                          ? <IoChevronDownCircleSharp />
                          : <IoCloseCircleSharp />
                        }
                      </IconContext.Provider>
                    </ATd>
                    <ATd>
                      <div className="flex items-center justify-end">
                        <div className="mr-1">
                          <ButtonEdit url={route('categories.edit', category.id)} />
                        </div>
                        <div className="ml-1">
                          <ButtonDelete url="categories.destroy" param={category.id} tipo="esta categoria" />
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
              <APagination data={categories} />
            </ABoxFooter>
          }

        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default Categories;