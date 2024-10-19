import { Disclosure } from '@headlessui/react';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
const initialState = {
  id: Math.floor(Math.random() * 1000),
  title: "",
  price: "",
  description: "",
  image: "",
  category: ""
}

function App() {

  const [formData, setFormData] = useState(initialState);
  const [data, setData] = useState([]);
  const [id, setId] = useState();

  const getDataFromServer = async () => {
    const data = await axios.get("http://localhost:5050/getdata");
    setData(data.data.product);
  }
  useEffect(() => {
    getDataFromServer();
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // get data from server using id for update api
  const getDataWithId = async (id) => {
    const getWithIdFilter = data.find(el => el.id === id);
    setFormData(getWithIdFilter);
  }

  // update functionality
  const UpdateDataFunc = async (e) => {
    e.preventDefault();
    try {
      const getupdateData = await axios.put(`http://localhost:5050/update/${id}`, formData);
      toast.success(getupdateData.data);
      getDataFromServer();
    } catch (error) {
      console.log(error);
    } finally {
      setFormData(initialState);
    }
  }

  // add data functionality
  const addData = async (e) => {
    e.preventDefault();
    try {
      document.getElementById('my_modal_3').showModal();
      const addDataInJson = await axios.post("http://localhost:5050/adddata", formData);
      toast.success(addDataInJson.data);
      getDataFromServer();
    } catch (error) {
      toast.error("Failed to add data");
    } finally {
      setFormData(initialState);
    }

  }

  // delete data functionality
  const deleteProduct = async () => {
    try {
      const deleteProductWithId = await axios.delete(`http://localhost:5050/delete/${id}`);
      toast.success(deleteProductWithId.data);
      getDataFromServer();
    } catch (error) {
      toast.success("Sorry something went wrong");
    } finally {
      setFormData(initialState);
    }
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
            </div>
          </div>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Let's Crud</h1>
            <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>
              Add Data
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-around">
            {data.map((el, index) => (
              <div className="card bg-base-100 w-96 shadow-xl" key={index}>
                <figure className='h-[300px] w-[300px]'>
                  <img
                    src={el.image}
                    alt="Product"
                    className='w-full h-full object-fit object-center' />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{el.title}</h2>
                  <p>{el.description.substring(0, 100)}</p>
                  <h3 className='card-title text-center m-auto'>{el.price}</h3>
                  <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={() => {
                      document.getElementById("my_modal_1").showModal();
                      getDataWithId(el.id);
                      setId(el.id)
                    }}>
                      Edit
                    </button>
                    <button className="btn btn-error text-white" onClick={() => {
                      document.getElementById('my_modal_2').showModal();
                      setId(el.id);
                    }}>
                      Delete
                    </button>
                    <dialog className="modal" role="dialog" id="my_modal_2">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold">Hello!</h3>
                        <p className="py-5">Do You Want To Delete This Product ?</p>
                        <div className="modal-action">
                          <form method="dialog" className='w-[50%] m-aut flex justify-around items-center'>
                            <button className="btn btn-error w-[30%] text-white" onClick={() => deleteProduct(id)}>Yes</button>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn w-[30%]">No</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </main>
      </div>
      {/* for update data */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Your Data!</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <form onSubmit={UpdateDataFunc}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Image
                </label>
                <div className="mt-2">
                  <input
                    id="image"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Category
                </label>
                <div className="mt-2">
                  <input
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id='description'
                    name='description'
                    required
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered textarea-md w-full max-w-xs"></textarea>
                </div>
              </div>
            </div>
            <button className="btn btn-primary text-white block mt-5 m-auto">Update Data</button>
          </form>
        </div >
      </dialog >

      {/* for adding data */}
      < dialog id="my_modal_3" className="modal" >
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <form action="" onSubmit={addData}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Image
                </label>
                <div className="mt-2">
                  <input
                    id="image"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Category
                </label>
                <div className="mt-2">
                  <input
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id='description'
                    name='description'
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered textarea-md w-full max-w-xs"></textarea>
                </div>
              </div>
            </div>
            <button className="btn btn-primary text-white block m-auto mt-5">Add Data</button>
          </form>
        </div>
      </dialog >
      <Toaster position="top-center" />
    </>
  )
}


export default App;