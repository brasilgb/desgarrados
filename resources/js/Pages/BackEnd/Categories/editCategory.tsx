import React, { useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ASelect, ATextarea } from "@/Components/BackEnd/Form";
import { useForm, router, usePage } from '@inertiajs/react';
import addCategory from "./addCategory";
import { Success } from "@/Components/BackEnd/FlashMessage";

interface CategoryProps {
  categories: any;
  category: any;
}
const editCategory = ({ category, categories }: CategoryProps) => {
  const [loading, setLoading] = useState(false);

  const { messages, errors } = usePage().props as any;

  const { data, put, setData, processing } = useForm({
    name: category.name,
    description: category.description,
    active: category.active,
    category_id: category.category_id
  });

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    put(route('categories.update', category.id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoBrowsersOutline />,
            title: "Categorias"
          }}
          breadcumb={[
            { title: "Categorias", url: "/admin/categories", divider: true },
            { title: "Adicionar categoria", url: "", divider: false }
          ]}
        />
        <ABoxAll>
          {messages.success && (
            <Success message={messages.success} />
          )}
          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'categories.index'} value={''} icon={<IoArrowBack />} />
              </div>
              <div className="px-4">
              </div>
            </ABoxHeader>
            <ABoxBody className="p-2 md:p-8 bg-gray-50">

              <AInput
                label="Nome da categoria"
                inputid="name"
                type="text"
                value={data.name}
                onchange={(e: any) => setData('name', e.target.value)}
                classname=""
                error={errors.name}
              />

              <ASelect
                label="Categoria Pai"
                inputid="category_id"
                value={data.category_id}
                data={categories}
                onchange={(e: any) => setData('category_id', e.target.value)}
                classname="mt-6"
                error={errors.category_id}
              />

              <ATextarea
                label="Descrição"
                inputid="description"
                type="text"
                value={data.description}
                onchange={(e: any) => setData('description', e.target.value)}
                classname="mt-6"
                columns={0}
              />

              <ACheckBox
                label="Ativar categoria"
                inputid="active"
                checked={data.active}
                onchange={(e: any) => setData('active', e.target.checked)}
                classname="mt-6"
                error={errors.active}
              />

            </ABoxBody>
            <ABoxFooter>
              <ButtonSave processing={processing} loading={loading} />
            </ABoxFooter>
          </AForm>
        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default editCategory;