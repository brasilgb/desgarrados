import React, { useRef, useState } from 'react';
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { AForm, AInput, ATextarea } from "@/Components/BackEnd/Form";
import { useForm } from '@inertiajs/react';
import Select from 'react-select';
import { Success } from '@/Components/BackEnd/FlashMessage';
import { usePage } from "@inertiajs/react";

const addAudio = ({ playlists }) => {
  const { messages } = usePage().props as any;
  const [loading, setLoading] = useState(false);
  const options = playlists.map((play: any) => ({ value: play.id, label: play.title }));
  const { data, setData, post, processing, errors } = useForm({
    audio: '',
    playlist_id: [],
  });

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    post(route('audios.store'));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleChange = (selected: any) => {
    setData('playlist_id', selected.map((v: any) => (v.value)));
  };

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoBrowsersOutline />,
            title: "Audios"
          }}
          breadcumb={[
            { title: "Audios", url: "/admin/audios", divider: true },
            { title: "Adicionar audio", url: "", divider: false }
          ]}
        />
        <ABoxAll>
        {messages.success && (
            <Success message={messages.success} />
          )}
          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'audios.index'} value={''} icon={<IoArrowBack />} />
              </div>
              <div className="px-4">
              </div>
            </ABoxHeader>
            <ABoxBody className="p-2 md:p-8 bg-gray-50">
              {/* <AInput
                label="Título"
                inputid="title"
                type="text"
                value={data.title}
                onchange={(e: any) => setData('title', e.target.value)}
                classname=""
                error={errors.title}
              /> */}

              <AInput
                label="Áudio mp3"
                type="file"
                inputid="audio"
                onchange={(e: any) => setData('audio', e.target.files)}
                classname="pt-6"
                error={errors.audio}
              />

              <div className="pt-6">
                <label className="text-gray-700" htmlFor="playlist_id" >Playlists</label>
                <Select
                  options={options}
                  isMulti
                  onChange={handleChange}
                  placeholder="Selecione a(s) playlist(s)"
                  styles={{
                    multiValueLabel: (base) => ({
                      ...base,
                      backgroundColor: '#00AEEF',
                      color: 'white'
                    }),
                  }}
                />
                {errors.playlist_id && <div className="text-red-500">{errors.playlist_id}</div>}
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

export default addAudio;