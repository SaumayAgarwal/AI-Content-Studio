import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from "react-markdown";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setFileName(selectedFile.name);
    }
  };

    const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('resume', image)

      const { data } = await axios.post('/api/ai/review-resume', formData, {headers: {Authorization: `Bearer ${await getToken()}`}})

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
            <Sparkles className='w-6  text-[#00DA83]' />
            <h1 className='text-xl font-semibold'>Resume Review</h1>
          </div>

          {/* Topic Input */}
          <p className='mt-6 text-sm font-medium'>Upload Resume</p>

          <label className="w-full flex justify-between items-center p-2 px-3 mt-2 text-sm rounded-md border border-gray-300 
            cursor-pointer text-gray-600 hover:border-blue-400">
            <span className="truncate">{fileName}</span>
            <span className="text-blue-500 font-medium">Choose</span>
          <input
            type='file'
            className="hidden"
            accept='application/pdf'
            onChange={handleFileChange} 
            required/>
            </label>

          <p className='mt-6 text-sm font-medium'>Supports PDF resume only</p>
          

          {/* Generate Button */}
          <button
            disabled={loading}
            type='submit'
            className='w-full flex justify-center items-center gap-2
              bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg
              cursor-pointer hover:scale-105 transition-transform'>
                {
                  loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                  : <FileText className='w-5' />
                }
           Review Resume
          </button>
        </form>


        {/* Right Column: Generated Titles */}
        <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
          <div className='flex items-center gap-3'>
            <FileText className='w-5 h-5 text-[#00DA83]' />
            <h1 className='text-xl font-semibold'>Analysis Results</h1>
          </div>
          
          {
            !content ? (
              <div className='flex-1 flex justify-center items-center '>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <FileText className='w-9 h-9'/>
                    <p>Upload an resume and click "Review Resume" to get started</p>
                </div>
              </div>
            ) : (
              <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                <div className='.reset-tw'>
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default ReviewResume
