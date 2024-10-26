import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';

const App = () => {


  return (
    <div>

      <Routes>
        <Route path='/' element={<BookList />} />
        <Route path='/book-form' element={<BookForm />} />
        <Route path='/book-details' element={<BookDetails />} />
      </Routes>

      <Toaster position='top-center' />
    </div>
  )
}

export default App