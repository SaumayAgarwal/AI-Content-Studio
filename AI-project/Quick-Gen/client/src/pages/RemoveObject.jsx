import { Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [object, setObject]=useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
    }
  };

  const onSubmitHandler = async (e) => {
      e.preventDefault();

      try {
      setLoading(true)

      if(object.split(' ').length >1 ){
        return toast('Please enter only one object name')
      }

      const formData = new FormData()
      formData.append('image', image)
      formData.append('object', object)

      const { data } = await axios.post('/api/ai/remove-image-object', formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

      if(data.success){
        setContent(data.content)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  };

  return (  
    <div className='h-full overflow-y-scroll p-6 text-slate-700'>
      
      {/* Two-column layout */}
      <div className='flex flex-col lg:flex-row gap-6'>

        <form onSubmit={onSubmitHandler}
          className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

         {/* Left Column: Blog Input */}
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6  text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold'>Object Removal</h1>
          </div>

          {/* Topic Input */}
          <p className='mt-6 text-sm font-medium'>Upload Image</p>

          <label className="w-full flex justify-between items-center p-2 px-3 mt-2 text-sm rounded-md border border-gray-300 cursor-pointer text-gray-600 hover:border-blue-400">
            
            <span className="truncate">{fileName}</span>

            <span className="text-blue-500 font-medium">Choose</span>
          <input
            type='file'
            onChange={handleImageChange}
            className="hidden"
            accept='image/*'
            required/>
            </label>

          <p className='mt-6 text-sm font-medium'>Describe Object name to remove</p>
          <textarea
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='e.g , watch or spoon, only single object name'
          value={object}
          onChange={(e) => setObject(e.target.value)}
          rows={4}
          required/>

          {/* Generate Button */}
          <button
            disabled={loading}
            type='submit'
            className='w-full flex justify-center items-center gap-2
              bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg
              cursor-pointer hover:scale-105 transition-transform'>
           {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> 
            : <Scissors className='w-5' />
           } 
           Remove object
          </button>
        </form>


        {/* Right Column: Generated Titles */}
        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
          <div className='flex items-center gap-3'>
            <Scissors className='w-5 h-5 text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold'>Processed Image</h1>
          </div>
          
          {
            !content ? (
              <div className='flex-1 flex justify-center items-center '>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <Scissors className='w-9 h-9'/>
                    <p>Upload an image and click "Remove Object" to get started</p>
                </div>
              </div>
            ) : (
              <img src={content} alt="image" className='mt-3 w-full h-full'/>
            )
          }
        </div>

      </div>
    </div>
  )
};

export default RemoveObject
