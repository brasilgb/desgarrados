import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  
  const dateNew = new Date();
  const month = dateNew.getFullYear();

  return (
    <footer className="bg-gray-50 shadow-[0px_0px_3px_rgba(0,0,0,0.2)] flex items-center justify-center">
      <div className="py-2 text-sm text-gray-600">&copy; Site 2022 - {month}. Todos os direitos reservados.</div>
    </footer>
  )
}

export default Footer;