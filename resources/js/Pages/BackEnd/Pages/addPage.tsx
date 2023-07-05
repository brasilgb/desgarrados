import React, { useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ATextarea } from "@/Components/BackEnd/Form";
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from '@inertiajs/react';

const addPage = () => {
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
 
  const { data, setData, post, processing, errors } = useForm({
    title: null,
    summary: null,
    featured: null,
    social: null,
    active: null
  });

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    post(route('pages.store', {
      title: data.title,
      summary: data.summary,
      content: editorRef.current.getContent(),
      featured: data.featured,
      social: data.social,
      active: data.active,
      type: 0
    }));
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
            title: "Páginas"
          }}
          breadcumb={[
            { title: "Páginas", url: "/admin/pages", divider: true },
            { title: "Adicionar página", url: "", divider: false }
          ]}
        />
        <ABoxAll>

          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'pages.index'} value={''} icon={<IoArrowBack />} />
              </div>
              <div className="px-4">
              </div>
            </ABoxHeader>
            <ABoxBody className="p-2 md:p-8 bg-gray-50">
              <AInput
                label="Título"
                inputid="title"
                type="text"
                value={data.title}
                onchange={(e: any) => setData('title', e.target.value)}
                classname=""
                error={errors.title}
              />

              <ATextarea
                label="Resumo"
                inputid="summary"
                type="text"
                value={data.summary}
                onchange={(e: any) => setData('summary', e.target.value)}
                classname="mt-6"
                columns={0}
              />

              <div className="mt-6">
                <label className="text-gray-700" htmlFor="content">Conteúdo</label>
                <Editor
                  apiKey="3v1hskg4ud3hwf1bi5to0pt3xp6zjyksrvujfngcpzzaw2l3"
                  onInit={(evt, editor: any) => editorRef.current = editor}
                  id="content"
                  init={{
                    language: 'pt_BR',
                    height: 300,
                    menubar: false,
                    plugins: 'autolink lists link charmap print preview anchor table image',
                    toolbar: 'undo redo styles link bold italic image table lineheight alignleft aligncenter alignright alignjustify  bullist numlist outdent indent',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                {errors.content && <div className="text-red-500">{errors.content}</div>}
              </div>

              <AInput
                label="Imagem destacada"
                type="file"
                inputid="featured"
                onchange={(e: any) => setData('featured', e.target.files[0])}
                classname="pt-6"
                error={errors.featured}
              />

              <ACheckBox
                label="Ativar página"
                inputid="summary"
                checked={data.active}
                onchange={(e: any) => setData('active', e.target.checked)}
                classname="mt-6"
                error={errors.active}
              />

              <ACheckBox
                label="Botões redes sociais"
                inputid="social"
                checked={data.social}
                onchange={(e: any) => setData('social', e.target.checked)}
                classname="mt-6"
                error={errors.social}
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

export default addPage;