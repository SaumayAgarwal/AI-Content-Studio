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
   <div className='h-full overflow-y-scroll p-6 text-gray-200'>
      
      {/* Two-column layout */}
      <div className='flex flex-col lg:flex-row gap-6'>

        <form onSubmit={onSubmitHandler}
          className='w-full max-w-lg p-6 glass-card border-white/10 rounded-2xl shadow-lg relative overflow-hidden group'>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          
         {/* Left Column: Blog Input */}
          <div className='flex items-center gap-3 relative z-10'>
            <Sparkles className='w-6 h-6 text-emerald-400' />
            <h1 className='text-xl font-bold text-white'>Resume Review</h1>
          </div>

          {/* Topic Input */}
          <p className='mt-8 text-sm font-medium text-gray-300 relative z-10'>Upload Resume</p>

          <label className="w-full flex justify-between items-center p-3 px-4 mt-2 text-sm rounded-xl bg-white/5 border border-white/10 
            cursor-pointer text-gray-300 hover:border-emerald-500 hover:bg-white/10 transition-all shadow-inner relative z-10">
            <span className="truncate">{fileName}</span>
            <span className="text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-md">Choose</span>
          <input
            type='file'
            className="hidden"
            accept='application/pdf'
            onChange={handleFileChange} 
            required/>
            </label>

          <p className='mt-3 text-xs text-gray-500 font-light relative z-10'>Supports PDF resume only</p>
          

          {/* Generate Button */}
          <button
            disabled={loading}
            type='submit'
            className='w-full flex justify-center items-center gap-2 mt-8 relative z-10
              bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-3 text-base font-semibold rounded-xl
              cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:-translate-y-1 transition-all'>
                {
                  loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                  : <FileText className='w-5' />
                }
           Review Resume
          </button>
        </form>


        {/* Right Column: Generated Titles */}
        <div className='w-full max-w-lg p-6 glass-card border-white/10 rounded-2xl flex flex-col shadow-lg min-h-96 max-h-[600px] relative overflow-hidden group'>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className='flex items-center gap-3 mb-4 relative z-10 border-b border-white/10 pb-4'>
            <FileText className='w-6 h-6 text-emerald-400' />
            <h1 className='text-xl font-bold text-white'>Analysis Results</h1>
          </div>
          
          {
            !content ? (
              <div className='flex-1 flex justify-center items-center relative z-10'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <FileText className='w-12 h-12 opacity-50'/>
                    <p>Upload a resume and click "Review Resume" to get started</p>
                </div>
              </div>
            ) : (
              <div className='mt-2 h-full overflow-y-auto pr-2 relative z-10'>
                <div className='prose-dark'>
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
