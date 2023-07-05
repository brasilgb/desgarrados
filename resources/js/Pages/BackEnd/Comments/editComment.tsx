import React, { useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ASelect, ATextarea } from "@/Components/BackEnd/Form";
import { useForm, usePage } from '@inertiajs/react';
import { Success } from "@/Components/BackEnd/FlashMessage";

interface CommentProps {
  comment: any;
}

const addComment = ({ comment }: CommentProps) => {
  const [loading, setLoading] = useState(false);

  const { messages, errors } = usePage().props as any;

  const { data, put, setData, processing } = useForm({
    author: comment.author,
    email: comment.email,
    content: comment.content,
    situation: comment.situation
  });

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    put(route('comments.update', comment.id));
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
          {messages.success && (
            <Success message={messages.success} />
          )}
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