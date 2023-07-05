import React from 'react'
import { LayoutBack } from "@/Layouts";
import Auxbar from "@/Layouts/BackEnd/Auxbar";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader } from "@/Components/BackEnd/Boxes";

type Props = {}

const Home = (props: Props) => {
  return (
    <LayoutBack>
      <div className="">
        <Auxbar
          header={{
            icon: <IoHomeOutline />,
            title: "Home"
          }}
          breadcumb={[
            // { title: "Home", url: "/", divider: true }
          ]}
        />
        <ABoxAll>
          <ABoxHeader>
            ggnfngnfgnfgngf
          </ABoxHeader>

          <ABoxBody>
            sscsscscs
          </ABoxBody>

          <ABoxFooter>
            sfsf
          </ABoxFooter>
        </ABoxAll>
      </div>

    </LayoutBack>
  )
}

export default Home;