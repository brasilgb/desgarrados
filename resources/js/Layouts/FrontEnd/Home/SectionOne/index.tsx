import React from 'react'

type Props = {}

const SectionOne = (props: Props) => {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto">
        {/* <div className="flex items-center justify-start">
          <h1 className="text-xl font-bold text-secundary-dark flex-none mr-2">Adicionados recentemente</h1>
          <div className="h-2 w-full border-y border-t-primary-red border-b-primary-green" />
        </div> */}

        <div className="md:grid md:grid-cols-5 gap-8 mt-4">

          <div className="bg-white border rounded-xl border-gray-50">
            <div className="overflow-hidden rounded-t-xl h-48">
              <img src="/photos/foto12.jpg" alt="" className="hover:scale-110 transition duration-500 cursor-pointer object-cover" />
            </div>
            <div className="flex flex-col items-start justify-start p-4">
              <a href="#" className="text-xs uppercase font-semibold text-secundary-dark hover:text-secundary-red transition duration-500">category</a>
              <a href="#" className="text-lg font-semibold text-primary-dark hover:text-secundary-dark transition duration-500 py-2">Link das sections</a>
            </div>
          </div>
          <div className="bg-white border rounded-xl border-gray-50">
            <div className="overflow-hidden rounded-t-xl h-48">
              <img src="/photos/foto1.jpg" alt="" className="hover:scale-110 transition duration-500 cursor-pointer object-cover" />
            </div>
            <div className="flex flex-col items-start justify-start p-4">
              <a href="#" className="text-xs uppercase font-semibold text-secundary-dark hover:text-secundary-red transition duration-500">category</a>
              <a href="#" className="text-lg font-semibold text-primary-dark hover:text-secundary-dark transition duration-500 py-2">Link das sections</a>
            </div>
          </div>
          <div className="bg-white border rounded-xl border-gray-50">
            <div className="overflow-hidden rounded-t-xl h-48">
              <img src="/photos/foto8.jpg" alt="" className="hover:scale-110 transition duration-500 cursor-pointer object-cover" />
            </div>
            <div className="flex flex-col items-start justify-start p-4">
              <a href="#" className="text-xs uppercase font-semibold text-secundary-dark hover:text-secundary-red transition duration-500">category</a>
              <a href="#" className="text-lg font-semibold text-primary-dark hover:text-secundary-dark transition duration-500 py-2">Link das sections</a>
            </div>
          </div>
          <div className="bg-white border rounded-xl border-gray-50">
            <div className="overflow-hidden rounded-t-xl h-48">
              <img src="/photos/foto2.jpg" alt="" className="hover:scale-110 transition duration-500 cursor-pointer object-cover" />
            </div>
            <div className="flex flex-col items-start justify-start p-4">
              <a href="#" className="text-xs uppercase font-semibold text-secundary-dark hover:text-secundary-red transition duration-500">category</a>
              <a href="#" className="text-lg font-semibold text-primary-dark hover:text-secundary-dark transition duration-500 py-2">Link das sections</a>
            </div>
          </div>
          <div className="bg-white border rounded-xl border-gray-50">
            <div className="overflow-hidden rounded-t-xl h-48">
              <img src="/images/desgarrados2.jpg" alt="" className="hover:scale-110 transition duration-500 cursor-pointer object-cover" />
            </div>
            <div className="flex flex-col items-start justify-start p-4">
              <a href="#" className="text-xs uppercase font-semibold text-secundary-dark hover:text-secundary-red transition duration-500">category</a>
              <a href="#" className="text-lg font-semibold text-primary-dark hover:text-secundary-dark transition duration-500 py-2">Link das sections</a>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default SectionOne;