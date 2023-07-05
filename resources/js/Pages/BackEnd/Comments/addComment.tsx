import React, { useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ASelect, ATextarea } from "@/Components/BackEnd/Form";
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from '@inertiajs/react';

const addComment = () => {
  const [loading, setLoading] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    author: '',
    email: '',
    content: '',
    situation: ''
  });

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    post(route('comments.store'));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoChatboxEllipsesOutline />,
            title: "Comentários"
          }}
          breadcumb={[
            { title: "Comentários", url: "/admin/comments", divider: true },
            { title: "Adicionar comentário", url: "", divider: false }
          ]}
        />
        <ABoxAll>

          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'comments.index'} value={''} icon={<IoArrowBack />} />
              </div>
              <div className="px-4">
              </div>
            </ABoxHeader>
            <ABoxBody className="p-2 md:p-8 bg-gray-50">

              <AInput
                label="Autor"
                inputid="author"
                type="text"
                value={data.author}
                onchange={(e: any) => setData('author', e.target.value)}
                classname=""
                error={errors.author}
              />

              <AInput
                label="E-mail"
                inputid="email"
                type="text"
                value={data.email}
                onchange={(e: any) => setData('email', e.target.value)}
                classname=""
                error={errors.email}
              />

              <ATextarea
                label="Conteúdo"
                inputid="content"
                type="text"
                value={data.content}
                onchange={(e: any) => setData('content', e.target.value)}
                classname="mt-6"
                error={errors.content}
                columns={0}
              />

              <ACheckBox
                label="Situação"
                inputid="situation"
                checked={data.situation}
                onchange={(e: any) => setData('situation', e.target.checked)}
                classname="mt-6"
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

export default addComment;