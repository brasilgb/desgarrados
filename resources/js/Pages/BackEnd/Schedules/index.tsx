import React, { Fragment, useEffect, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoAdd, IoBrowsersOutline, IoCalendarOutline, IoChevronDownCircleSharp, IoCloseCircleSharp, IoSearch } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonDelete, ButtonEdit, ButtonNew } from "@/Components/BackEnd/Buttons";
import { IconContext } from "react-icons";
import { InputSearch } from "@/Components/BackEnd/Form";
import { ATable, ATd, ATh, ATr } from "@/Components/BackEnd/Table";
import APagination from "@/Components/BackEnd/Pagination";
import { Success } from '@/Components/BackEnd/FlashMessage';
import { useForm, usePage } from "@inertiajs/react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  schedules: any;
}

const Schedules = ({ schedules }: Props) => {

  const { messages } = usePage().props as any;
  const [searchDate, setSearchDate] = useState<any>(new Date());
  const { data, setData, post, get, processing, errors } = useForm();
  useEffect(() => {
    moment(searchDate).format("YYYY-MM-DD");
  }, []);

  const handleSearchDate = ((e: any) => {
    e.preventDefault();
    get(route('schedules.index', { q:moment(searchDate).format("YYYY-MM-DD")} ));
  });

  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoCalendarOutline />,
            title: "Agendas"
          }}
          breadcumb={[
            { title: "Agendas", url: "", divider: false }
          ]}
        />
        <ABoxAll>
          {messages.success && (
            <Success message={messages.success} />
          )}
          <ABoxHeader>
            <div className="px-4">
              <form onSubmit={handleSearchDate} className="my-2 w-full flex">
                <DatePicker
                  className="m-0 -mr-px w-full min-w-0 rounded-l border border-solid border-gray-200 bg-gray-50 bg-clip-padding px-3 text-sm font-normal text-gray-500 outline-none transition duration-300 ease-in-out focus:bg-white focus:border-gray-300 focus:text-gray-600 focus:outline-none focus:ring-0"
                  id="search"
                  name="search"
                  selected={searchDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setSearchDate(date)}
                  wrapperClassName="w-full"
                />
                <button
                  className="z-[2] flex items-center rounded-r border border-solid border-gray-200 bg-gray-50 px-6 py-2 text-xs font-medium uppercase leading-tight transition duration-500 ease-in-out hover:bg-gray-100  focus:ring-0"
                  type="submit"
                  disabled={processing}
                >
                  <IconContext.Provider value={{ className: "h-5 w-5 text-gray-400" }}>
                    <div>
                      <IoSearch />
                    </div>
                  </IconContext.Provider>
                </button>
              </form>
            </div>
            <div className="px-4">
              <ButtonNew url={'schedules.create'} value={'Novo agenda'} icon={<IoAdd />} />
            </div>
          </ABoxHeader>

          <ABoxBody>
            <ATable>
              <ATr header={true}>
                <ATh>#ID</ATh>
                <ATh>Título</ATh>
                <ATh>Inicio</ATh>
                <ATh>Término</ATh>
                <ATh>Local</ATh>
                <ATh>Estado</ATh>
                <ATh>Cidade</ATh>
                <ATh classname="w-[50px]">Ativa</ATh>
                <ATh classname="w-[210px]">{ }</ATh>
              </ATr>

              {schedules.data.map((schedule: any, index: any) => (
                <Fragment key={index}>
                  <ATr header={false}>
                    <ATd>{schedule.id}</ATd>
                    <ATd>{schedule.title}</ATd>
                    <ATd>{moment(schedule.start).format('DD/MM/YYYY HH:mm:ss')}</ATd>
                    <ATd>{moment(schedule.end).format('DD/MM/YYYY HH:mm:ss')}</ATd>
                    <ATd>{schedule.locale}</ATd>
                    <ATd>{schedule.state}</ATd>
                    <ATd>{schedule.city}</ATd>
                    <ATd>
                      <IconContext.Provider value={{ className: `text-2xl ${schedule.active ? 'text-green-600' : 'text-red-500'}` }}>
                        {schedule.active
                          ? <IoChevronDownCircleSharp />
                          : <IoCloseCircleSharp />
                        }
                      </IconContext.Provider>
                    </ATd>
                    <ATd>
                      <div className="flex items-center justify-end">
                        <div className="mr-1">
                          <ButtonEdit url={route('schedules.edit', schedule.id)} />
                        </div>
                        <div className="ml-1">
                          <ButtonDelete url="schedules.destroy" param={schedule.id} tipo="esta agenda" />
                        </div>
                      </div>
                    </ATd>
                  </ATr>
                </Fragment>
              ))}

            </ATable>
          </ABoxBody>

          {APagination &&
            <ABoxFooter>
              <APagination data={schedules} />
            </ABoxFooter>
          }

        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default Schedules;