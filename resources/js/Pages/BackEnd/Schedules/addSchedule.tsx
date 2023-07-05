import React, { useEffect, useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoAlbumsOutline, IoArrowBack } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ATextarea } from "@/Components/BackEnd/Form";
import { useForm, usePage } from '@inertiajs/react';
import { Success } from "@/Components/BackEnd/FlashMessage";
import Select from 'react-select';
import axios from 'axios';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IBGEUFProps {
  id: number;
  nome: string;
}

const addSchedule = () => {
  const { messages } = usePage().props as any;
  const [loading, setLoading] = useState(false);
  const [ufs, setUfs] = useState<IBGEUFProps[]>([]);
  const [cities, setCities] = useState<IBGEUFProps[]>([]);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    locale: '',
    start: '',
    end: '',
    state: '',
    city: '',
    description: '',
    cover: '',
    active: '',
  });


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
    post(route('schedules.store'));
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }

  console.log(moment(startDate).format('YYYY-MM-DD HH:mm:ss'));
  console.log(moment(endDate).format('YYYY-MM-DD HH:mm:ss'));

  const handleChangeStart = ((date: any) => {
    setStartDate(date);
    setData('start', moment(date).format('YYYY-MM-DD HH:mm:ss'));
  });

  const handleChangeEnd = ((date: any) => {
    setEndDate(date);
    setData('end', moment(date).format('YYYY-MM-DD HH:mm:ss'));
  });

  const ufsopt = ufs.map((uf: any) => ({ value: uf.sigla, label: uf.nome }));
  const citiesopt = cities.map((city: any) => ({ value: city.nome, label: city.nome }));

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoAlbumsOutline />,
            title: "Agendas"
          }}
          breadcumb={[
            { title: "Agendas", url: "/admin/schedules", divider: true },
            { title: "Adicionar agenda", url: "", divider: false }
          ]}
        />
        <ABoxAll>
          {messages.success && (
            <Success message={messages.success} />
          )}
          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'schedules.index'} value={''} icon={<IoArrowBack />} />
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
                error={errors.title}
              />

              <div className="mt-6">
                <label className="text-gray-700 text-base" htmlFor="state">Estado</label>
                <Select
                  id="state"
                  name="state"
                  options={ufsopt}
                  onChange={(e: any) => setData('state', e.value)}
                  placeholder="Selecione o estado"
                  className="z-[120]"
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
                  className="z-[120]"
                />
                {errors.state && <div className="text-red-500">{errors.state}</div>}
              </div>

              <ATextarea
                label="Local do evento"
                inputid="locale"
                type="text"
                value={data.locale}
                onchange={(e: any) => setData('locale', e.target.value)}
                classname="mt-6"
                columns={0}
                error={errors.locale}
              />

              <div className="flex-col items-center justify-between mt-6">
                <label className="text-gray-700 text-base" htmlFor="start">Data e hora do início</label>
                <DatePicker
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 w-full"
                  id="start"
                  name="start"
                  selected={startDate}
                  dateFormat="dd/MM/yyyy HH:mm:ss"
                  onChange={(date) => handleChangeStart(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="Hora"
                  wrapperClassName="w-full"
                />
                {errors.start && <div className="text-red-500">{errors.start}</div>}
              </div>

              <div className="flex-col items-center justify-between mt-6">
                <label className="text-gray-700 text-base" htmlFor="end">Data e hora do término</label>
                <DatePicker
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 w-full"
                  id="end"
                  name="end"
                  selected={endDate}
                  dateFormat="dd/MM/yyyy HH:mm:ss"
                  onChange={(date) => handleChangeEnd(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  timeCaption="Hora"
                  wrapperClassName="w-full"
                />
                {errors.end && <div className="text-red-500">{errors.end}</div>}
              </div>

              <ATextarea
                label="Descrição"
                inputid="description"
                type="text"
                value={data.description}
                onchange={(e: any) => setData('description', e.target.value)}
                classname="mt-6"
                columns={0}
                error={errors.description}
              />

              <AInput
                label="Banner do evento"
                type="file"
                inputid="cover"
                onchange={(e: any) => setData('cover', e.target.files[0])}
                classname="pt-6"
                error={errors.cover}
              />

              <ACheckBox
                label="Ativar agendamento"
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

export default addSchedule;