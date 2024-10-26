import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const initialValues = {
    title: '',
    author: '',
    description: '',
    price: '',
    isbn: ''
};

const BookForm = () => {
        const handleAddBook = async (values, { resetForm }) => {
        try {
            const response = await axios.post("http://localhost:8080/book/addBook", values);
            if (response.status === 200) {
                toast.success(response.data);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            resetForm();
        }
    };

    // Validation
    const validationSchema = Yup.object({
        title: Yup.string().min(3, "Minimum 3 characters").required("Title is required"),
        author: Yup.string().min(3, "Minimum 3 characters").required("Author is required"),
        description: Yup.string(),
        price: Yup.string().required("Price is required"),
        isbn: Yup.string()
    });

    // Formik setup
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleAddBook
    });

    return (
        <div className='h-screen flex justify-center items-center'>
            <form className="modal-box" onSubmit={formik.handleSubmit}>
                <h3 className="font-bold text-lg text-center mb-3">Add New Book</h3>
                
                <div className='mb-4 text-center'>
                    <input type="text" name='title' placeholder="Book Title" value={formik.values.title} className="input input-bordered input-primary w-full max-w-xs" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.title && formik.errors.title && <div className='text-red-500'>{formik.errors.title}</div>}
                </div>
                
                <div className='mb-4 text-center'>
                    <input type="text" name='author' placeholder="Book Author" value={formik.values.author} className="input input-bordered input-primary w-full max-w-xs" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.author && formik.errors.author && <div className='text-red-500'>{formik.errors.author}</div>}
                </div>
                
                <div className='mb-4 text-center'>
                    <input type="number" name='price' placeholder="Book Price" value={formik.values.price} className="input input-bordered input-primary w-full max-w-xs" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.price && formik.errors.price && <div className='text-red-500'>{formik.errors.price}</div>}
                </div>
                
                <div className='mb-4 text-center'>
                    <input type="text" name='description' placeholder="Book Description" value={formik.values.description} className="input input-bordered input-primary w-full max-w-xs" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </div>
                
                <div className='mb-4 text-center'>
                    <input type="text" name='isbn' placeholder="Book ISBN" value={formik.values.isbn} className="input input-bordered input-primary w-full max-w-xs" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </div>
                
                <button className='btn btn-primary block m-auto' type='submit'>Add Book</button>
            </form>
            
            <form method="dialog" className="modal-backdrop">
                <button>Close</button>
            </form>
        </div>
    );
}

export default BookForm;
