import React, { useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoAlbumsOutline, IoArrowBack } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ATextarea } from "@/Components/BackEnd/Form";
import { router, useForm, usePage } from '@inertiajs/react';
import { Success } from "@/Components/BackEnd/FlashMessage";

interface GalleryProps {
  playlist: any
}
const editPlaylist = ({ playlist }: GalleryProps) => {
  const [loading, setLoading] = useState(false);
  const { messages, errors } = usePage().props as any;
  const { data, setData, post, processing } = useForm({
    title: playlist.title,
    style: playlist.style,
    description: playlist.description,
    active: playlist.active,
    cover: null
  });

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    router.post(route('playlists.update', playlist.id), {
      _method: 'put',
      title: data.title,
      description: data.description,
      active: data.active,
      cover: data.cover
    });
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
                label="Estilo"
                inputid="style"
                type="text"
                value={data.style}
                onchange={(e: any) => setData('style', e.target.value)}
                classname="mt-6"
                error={errors.style}
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
              <div className="w-48 mt-6 p-2 bg-gray-100 border border-gray-200 shadow-md rounded-md">
                <img src={`/storage/playlists/${playlist.cover}`} alt="" />
              </div>
              <AInput
                label="Imagem de capa"
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

export default editPlaylist;