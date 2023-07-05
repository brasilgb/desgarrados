import React, { useRef, useState } from 'react';
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { AForm, AInput, ATextarea } from "@/Components/BackEnd/Form";
import { useForm } from '@inertiajs/react';
import Select from 'react-select';

const addImage = ({ galleries }) => {
  const [loading, setLoading] = useState(false);
  const options = galleries.map((gal: any) => ({ value: gal.id, label: gal.title }));
  const { data, setData, post, processing, errors } = useForm({
    image: '',
    gallery_id: [],
  });

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    post(route('images.store'));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleChange = (selected: any) => {
    setData('gallery_id', selected.map((v: any) => (v.value)));
  };

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoBrowsersOutline />,
            title: "Imagens"
          }}
          breadcumb={[
            { title: "Imagens", url: "/admin/images", divider: true },
            { title: "Adicionar imagem", url: "", divider: false }
          ]}
        />
        <ABoxAll>

          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'images.index'} value={''} icon={<IoArrowBack />} />
              </div>
              <div className="px-4">
              </div>
            </ABoxHeader>
            <ABoxBody className="p-2 md:p-8 bg-gray-50">
              <AInput
                label="Imagem"
                type="file"
                inputid="image"
                onchange={(e: any) => setData('image', e.target.files)}
                classname="pt-6"
                error={errors.image}
              />

              <div className="pt-6">
                <label className="text-gray-700" htmlFor="category_id" >Categorias</label>
                <Select
                  options={options}
                  isMulti
                  onChange={handleChange}
                  placeholder="Selecione a(s) galeria(s)"
                  styles={{
                    multiValueLabel: (base) => ({
                      ...base,
                      backgroundColor: '#00AEEF',
                      color: 'white'
                    }),
                  }}
                />
                {errors.gallery_id && <div className="text-red-500">{errors.gallery_id}</div>}
              </div>

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

export default addImage;