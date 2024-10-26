import { Disclosure } from '@headlessui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const BookList = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);


    const getBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/book/getBooks');
            if (response.status === 200) {
                setBooks(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                    </div>
                </div>
            </Disclosure>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Book Store</h1>
                    <button className='btn' onClick={() => navigate('/book-form')}>Add Book</button>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-around">
                    {books.map((el, index) => (
                        <div className="card bg-base-100 w-96 shadow-xl" key={el._id}>
                            <figure>
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Not Found" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">Book Title: {el.title}</h2>
                                <p><strong>Author</strong>: {el.author}</p>
                                <p>{el.description}</p>
                                <h3 className='card-title m-auto'>Price: &#8377; {el.price}</h3>
                                <div className="card-actions justify-center">
                                    <button className="btn btn-primary">Edit</button>
                                    <DeleteBook id={el._id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}


const DeleteBook = ({ id }) => {

    const deleteBookWithId = async () => {
        console.log(id);
        try {
            const deleteBookWithId = await axios.delete(`http://localhost:8080/book/deleteBook/${id}`)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <button className="btn btn-error text-white" onClick={() => { document.getElementById('my_modal_1').showModal(); }}>Delete</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Do You Want Delete This Book ?</p>
                    <div className="modal-action">
                            <button className="btn btn-error text-white" onClick={deleteBookWithId}>Yes</button>
                        <form method="dialog" className='w-[30%] flex justify-around item-center'>
                            <button className="btn bg-black text-white">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
export default BookList