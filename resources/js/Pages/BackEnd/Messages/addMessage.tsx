import React, { useEffect, useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline, IoChatboxEllipsesOutline, IoChatbubblesOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ASelect, ATextarea } from "@/Components/BackEnd/Form";
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import axios from "axios";

interface IBGEUFProps {
  id: number;
  nome: string;
}

const addMessage = () => {

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    state: '',
    city: '',
    message: '',
    situation: ''
  });
  const [loading, setLoading] = useState(false);
  const [ufs, setUfs] = useState<IBGEUFProps[]>([]);
  const [cities, setCities] = useState<IBGEUFProps[]>([]);

  useEffect(() => {
    const getStates = (() => {
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then((response) => {
          setUfs(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    });
    getStates();
  }, [])

  useEffect(() => {
    const getStates = (() => {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${data.state}/municipios`)
        .then((response) => {
          setCities(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
    });
    getStates();
  }, [data])

  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    post(route('messages.store'));
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }
  const ufsopt = ufs.map((uf: any) => ({ value: uf.sigla, label: uf.nome }));
  const citiesopt = cities.map((city: any) => ({ value: city.nome, label: city.nome }));

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoChatbubblesOutline />,
            title: "Comentários"
          }}
          breadcumb={[
            { title: "Comentários", url: "/admin/messages", divider: true },
            { title: "Adicionar mensagem", url: "", divider: false }
          ]}
        />
        <ABoxAll>

          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'messages.index'} value={''} icon={<IoArrowBack />} />
              </div>
              <div className="px-4">
              </div>
            </ABoxHeader>
            <ABoxBody className="p-2 md:p-8 bg-gray-50">

              <AInput
                label="Nome"
                inputid="name"
                type="text"
                value={data.name}
                onchange={(e: any) => setData('name', e.target.value)}
                classname=""
                error={errors.name}
              />

              <div className="mt-6">
                <label className="text-gray-700 text-base" htmlFor="state">Estado</label>
                <Select
                  id="state"
                  name="state"
                  options={ufsopt}
                  onChange={(e: any) => setData('state', e.value)}
                  placeholder="Selecione o estado"
                />
                {errors.state && <div className="text-red-500">{errors.state}</div>}
              </div>

              <div className="mt-6">
                <label className="text-gray-700 text-base" htmlFor="city">Cidade</label>
                <Select
                  id="city"
                  name="city"
                  options={citiesopt}
                  onChange={(e: any) => setData('city', e.value)}
                  placeholder={data.state ? 'selecione a cidade' : 'Selecione o estado'}
                />
                {errors.state && <div className="text-red-500">{errors.state}</div>}
              </div>

              <ATextarea
                label="Mensagem"
                inputid="message"
                type="text"
                value={data.message}
                onchange={(e: any) => setData('message', e.target.value)}
                classname="mt-6"
                error={errors.message}
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

export default addMessage;