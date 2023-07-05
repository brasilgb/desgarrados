import React, { useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ATextarea } from "@/Components/BackEnd/Form";
import { Editor } from '@tinymce/tinymce-react';
import { useForm, router, usePage } from '@inertiajs/react';
import Select from 'react-select';
import { Success } from "@/Components/BackEnd/FlashMessage";

interface PostProps {
  categories: any;
  postage: any;
  postCategory: any;
}

const editPost = ({ postage, categories, postCategory }: PostProps) => {
  const { messages, errors } = usePage().props as any;
  const categoryDefault = postCategory.map((cat: any) => ({ value: cat.id, label: cat.name }));
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const options = categories.map((cat: any) => ({ value: cat.id, label: cat.name }))

  const { data, setData, progress, processing } = useForm({
    title: postage.title,
    summary: postage.summary,
    content: postage.content,
    category_id: [],
    featured: null,
    social: postage.social,
    linked: postage.linked,
    active: postage.active
  });

  const submit = (e: any) => {
    console.log(data);
    e.preventDefault();
    setLoading(true);
    router.post(route('posts.update', postage.id), {
      _method: 'put',
      title: data.title,
      summary: data.summary,
      content: editorRef.current.getContent(),
      featured: data.featured,
      social: data.social,
      linked: data.linked,
      active: data.active,
      category_id: data.category_id
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleChange = (selected: any) => {
    setData('category_id', selected.map((v: any) => (v.value)));
  };

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoBrowsersOutline />,
            title: "Postagens"
          }}
          breadcumb={[
            { title: "Postagens", url: "/admin/posts", divider: true },
            { title: "Adicionar postagem", url: "", divider: false }
          ]}
        />
        <ABoxAll>
          {messages.success && (
            <Success message={messages.success} />
          )}
          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'posts.index'} value={''} icon={<IoArrowBack />} />
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
                  initialValue={postage.content}
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
              <div className="w-48 mt-6 p-2 bg-gray-100 border border-gray-200 shadow-md rounded-md">
                <img src={`/storage/uploads/${postage.featured}`} alt="" />
              </div>
              <AInput
                label="Imagem destacada"
                type="file"
                inputid="featured"
                onchange={(e: any) => setData('featured', e.target.files[0])}
                classname="pt-6"
                error={errors.featured}
              />

              <div className="mt-6">
                <label className="text-gray-700" htmlFor="category_id" >Categorias</label>
                <Select
                  options={options}
                  isMulti
                  defaultValue={categoryDefault}
                  onChange={handleChange}
                  placeholder="Selecione a(s) categoria(s)"
                  styles={{
                    multiValueLabel: (base) => ({
                      ...base,
                      backgroundColor: '#00AEEF',
                      color: 'white'
                    }),
                  }}
                />
                {errors.category_id && <div className="text-red-500">{errors.category_id}</div>}
              </div>

              <ACheckBox
                label="Ativar postagem"
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

              <ACheckBox
                label="Abrir postagem"
                inputid="linked"
                checked={data.linked}
                onchange={(e: any) => setData('linked', e.target.checked)}
                classname="mt-6"
                error={errors.linked}
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

export default editPost;