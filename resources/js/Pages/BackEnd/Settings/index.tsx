import React, { useState } from "react";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";
import { AForm, AInput, ATextarea } from "@/Components/BackEnd/Form";
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { useForm, router, usePage } from "@inertiajs/react";
import { GoSettings } from "react-icons/go";
import { Success } from "@/Components/BackEnd/FlashMessage";
import { ButtonSave } from "@/Components/BackEnd/Buttons";

interface SettingsProps {
    setting: any;
}

const Settings = ({ setting }: SettingsProps) => {
    const { messages, errors } = usePage().props as any;

    const [loading, setLoading] = useState(false);
    const { data, setData, post, progress, processing } = useForm({
        logo: null,
        title: setting?.title ? setting?.title : '',
        description: setting?.description ? setting?.description : '',
        metadescription: setting?.metadescription ? setting?.metadescription : '',
        address: setting?.address ? setting?.address : '',
        maps: setting?.maps ? setting?.maps : '',
        contacts: setting?.contacts ? setting?.contacts : ''
    });

    const submit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        router.post(route('settings.update', setting.id), {
            _method: 'put',
            logo: data.logo,
            title: data.title,
            description: data.description,
            metadescription: data.metadescription,
            address: data.address,
            maps: data.maps,
            contacts: data.contacts
        });
        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }

    return (
        <LayoutBack>
            <div className="">
                <Auxbar
                    header={{
                        icon: <GoSettings />,
                        title: "Configurações"
                    }}
                    breadcumb={[
                        { title: "Configurações", url: "", divider: false }
                    ]}
                />
                <ABoxAll>
                    {messages.success && (
                        <Success message={messages.success} />
                    )}
                    <ABoxHeader>
                        <span className="py-4"></span>
                    </ABoxHeader>
                    <AForm onsubmit={submit}>

                        <ABoxBody className="p-2 md:p-8 bg-gray-50">

                            <div className="grid grid-cols-1 gap-6 mt-4">

                                <div className="">
                                    <img className='w-24 h-24 mx-2 p-1 rounded-full bg-gray-300' src={`/storage/logo/${setting?.logo ? setting?.logo : 'default.png'}`} alt="" />
                                </div>

                                <AInput
                                    label="Logotipo"
                                    type="file"
                                    inputid="logo"
                                    onchange={(e: any) => setData('logo', e.target.files[0])}
                                    classname="mt-6"
                                    error={errors.logo}
                                />

                                <AInput
                                    label="Título"
                                    inputid="title"
                                    type="text"
                                    value={data.title}
                                    onchange={(e: any) => setData('title', e.target.value)}
                                    classname="mt-6"
                                    error={errors.title}
                                />

                                <ATextarea
                                    label="Descrição"
                                    inputid="description"
                                    type="text"
                                    value={data.description}
                                    onchange={(e: any) => setData('description', e.target.value)}
                                    classname="mt-6"
                                    columns={0}
                                />

                                <ATextarea
                                    label="Endereços"
                                    inputid="address"
                                    type="text"
                                    value={data.address}
                                    onchange={(e: any) => setData('address', e.target.value)}
                                    classname="mt-6"
                                    columns={0}
                                />

                                <ATextarea
                                    label="Contatos"
                                    inputid="contacts"
                                    type="text"
                                    value={data.contacts}
                                    onchange={(e: any) => setData('contacts', e.target.value)}
                                    classname="mt-6"
                                    columns={0}
                                />

                                <ATextarea
                                    label="Meta Description (SEO)"
                                    inputid="metadescription"
                                    type="text"
                                    value={data.metadescription}
                                    onchange={(e: any) => setData('metadescription', e.target.value)}
                                    classname="mt-6"
                                    columns={0}
                                />

                                <ATextarea
                                    label="Mapas"
                                    inputid="maps"
                                    type="text"
                                    value={data.maps}
                                    onchange={(e: any) => setData('maps', e.target.value)}
                                    classname="mt-6"
                                    columns={0}
                                />
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

export default Settings;