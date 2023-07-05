import React, { useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoAlbumsOutline, IoArrowBack } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ASelect, ATextarea } from "@/Components/BackEnd/Form";
import { useForm, usePage } from '@inertiajs/react';
import { Success } from "@/Components/BackEnd/FlashMessage";

interface CategoryProps {

}
const addPlaylist = () => {
  const [loading, setLoading] = useState(false);
  const { messages } = usePage().props as any;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    gender: '',
    description: '',
    active: '',
    cover: ''
  });

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    post(route('playlists.store'));
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoAlbumsOutline />,
            title: "Playlists"
          }}
          breadcumb={[
            { title: "Playlists", url: "/admin/playlists", divider: true },
            { title: "Adicionar playlist", url: "", divider: false }
          ]}
        />
        <ABoxAll>
          {messages.success && (
            <Success message={messages.success} />
          )}
          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'playlists.index'} value={''} icon={<IoArrowBack />} />
              </div>
              <div className="px-4">
              </div>
            </ABoxHeader>
            <ABoxBody className="p-2 md:p-8 bg-gray-50">

              <AInput
                label="Título playlist"
                inputid="title"
                type="text"
                value={data.title}
                onchange={(e: any) => setData('title', e.target.value)}
                error={errors.title}
              />

              <AInput
                label="Gênero musical"
                inputid="gender"
                type="text"
                value={data.gender}
                onchange={(e: any) => setData('gender', e.target.value)}
                classname="pt-6"
                error={errors.gender}
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

              <AInput
                label="Imagem da capa"
                type="file"
                inputid="cover"
                onchange={(e: any) => setData('cover', e.target.files[0])}
                classname="pt-6"
                error={errors.cover}
              />

              <ACheckBox
                label="Ativar playlist"
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

export default addPlaylist;