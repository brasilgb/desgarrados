import React, { useRef, useState } from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoArrowBack, IoBrowsersOutline, IoPeopleOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { ButtonNew, ButtonSave } from "@/Components/BackEnd/Buttons";
import { ACheckBox, AForm, AInput, ASelect, ATextarea } from "@/Components/BackEnd/Form";
import { useForm, usePage } from '@inertiajs/react';

const addUser = () => {
  const [loading, setLoading] = useState(false);

  const { flash } = usePage().props;

  const { data, setData, post, errors, processing } = useForm({
    name: '',
    username: '',
    email: '',
    avatar: '',
    password: '',
    password_confirmation: '',
    active: '',
    role: ''
  });

  const submit = (e: any) => {

    e.preventDefault();
    setLoading(true);
    post(route('users.store'));
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }
  const getRules = [
    {id: 0, name: 'Administrador'},
    {id: 1, name: 'Usuário'}
  ];
  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoPeopleOutline />,
            title: "Usuários"
          }}
          breadcumb={[
            { title: "Usuários", url: "/admin/users", divider: true },
            { title: "Adicionar usuário", url: "", divider: false }
          ]}
        />
        <ABoxAll>

          <AForm onsubmit={submit}>
            <ABoxHeader>
              <div className="px-4">
                <ButtonNew url={'users.index'} value={''} icon={<IoArrowBack />} />
              </div>
              <div className="px-4">
              </div>
            </ABoxHeader>
            <ABoxBody className="p-2 md:p-8 bg-gray-50">

            <AInput
                label="Avatar"
                type="file"
                inputid="avatar"
                onchange={(e: any) => setData('avatar', e.target.files[0])}
                classname="mt-6"
                error={errors.avatar}
              />

              <AInput
                label="Nome do usuário"
                inputid="name"
                type="text"
                value={data.name}
                onchange={(e: any) => setData('name', e.target.value)}
                classname="mt-6"
                error={errors.name}
              />

              <AInput
                label="Username"
                inputid="username"
                type="text"
                value={data.username}
                onchange={(e: any) => setData('username', e.target.value)}
                classname="mt-6"
                error={errors.username}
              />

              <AInput
                label="E-mail"
                inputid="email"
                type="text"
                value={data.email}
                onchange={(e: any) => setData('email', e.target.value)}
                classname="mt-6"
                error={errors.email}
              />

              <AInput
                label="Senha"
                inputid="password"
                type="password"
                value={data.password}
                onchange={(e: any) => setData('password', e.target.value)}
                classname="mt-6"
                error={errors.password}
              />

              <AInput
                label="Repita a senha"
                inputid="password_confirmation"
                type="password_confirmation"
                value={data.password_confirmation}
                onchange={(e: any) => setData('password_confirmation', e.target.value)}
                classname="mt-6"
                error={errors.password_confirmation}
              />

              <ASelect
                label="Funcão"
                inputid="role"
                value={data.role}
                data={getRules}
                onchange={(e: any) => setData('role', e.target.value)}
                classname="mt-6"
                error={errors.role}
              />

              <ACheckBox
                label="Ativar usuário"
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

    </LayoutBack >
  )
}

export default addUser;