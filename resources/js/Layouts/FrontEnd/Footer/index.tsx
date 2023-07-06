import moment from 'moment';
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="border-t border-gray-100">
        <p className="text-base py-2 text-secundary-dark text-center drop-shadow-md">
            &copy;{moment().format("YYYY")} <span className="text-secundary-red">Desgarrados</span>. Todos os direitos reservados
        </p>
    </div>
  )
}

export default Footer;