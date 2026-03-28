import { Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const GenerateImages = () => {

  const imageStyle = ['Realistic','Ghibli style','Anime style','Cartoon style','Fantasy style',
    'Realistic style','3D style','Portrait style'];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [topic, setTopic] = useState('');
  const [publish, setPublish]=useState(false);

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      setLoading(true)

      const prompt= `Generate an image of ${topic} in the style ${selectedStyle}`

      const { data } = await axios.post('/api/ai/generate-image', {prompt, publish}, {headers: {Authorization: `Bearer ${await getToken()}`}})

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

        {/* Left Column: Blog Input */}
        <div className='flex-1 max-w-lg p-6 glass-card border-white/10 rounded-2xl shadow-lg relative overflow-hidden group'>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className='flex items-center gap-3 relative z-10'>
            <Sparkles className='w-6 h-6 text-emerald-400' />
            <h1 className='text-xl font-bold text-white'>AI Image Generator</h1>
          </div>

          {/* Topic Input */}
          <p className='mt-8 text-sm font-medium text-gray-300 relative z-10'>Describe your Image</p>
          <textarea
          className='w-full p-3 px-4 mt-2 outline-none text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner relative z-10'
          placeholder='Describe what you want to see in this image'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
          required/>

          {/* Style  Selection */}
          <p className='mt-5 text-sm font-medium text-gray-300 relative z-10'>Style</p>
          <div className='mt-3 flex gap-3 flex-wrap sm:max-w-[90%] relative z-10'>
            {imageStyle.map((item) => (
              <span 
                key={item}
                onClick={() => setSelectedStyle(item)}
                className={`text-sm px-5 py-2 border rounded-full cursor-pointer transition-all duration-300 shadow-sm font-medium
                  ${selectedStyle === item
                    ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-white border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'text-gray-400 border-white/10 bg-white/5 hover:bg-white/10 hover:text-gray-200'
                  }`}
              >
                {item} 
              </span>
            ))}
          </div>

            <div className='my-6 flex items-center gap-3 relative z-10'>
            <label className='relative cursor-pointer'>
              
              <input
                type='checkbox'
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className='sr-only peer'
              />
              <div className='w-10 h-6 bg-gray-600 rounded-full peer-checked:bg-emerald-500 transition-colors duration-300 shadow-inner border border-white/5'></div>

              <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4 shadow-sm'></span>

            </label>
            <p className='text-sm text-gray-300'>Make this image Public</p>
          </div>
          {/* Generate Button */}
          <button
            disabled={loading}
            type='button'
             onClick={onSubmitHandler}
            className='w-full flex justify-center items-center gap-2 mt-4 relative z-10
              bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 text-base font-semibold rounded-xl
              cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:-translate-y-1 transition-all'
          >
            {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <Image className='w-5' />}
            Generate Image
          </button>
        </div>

        {/* Right Column: Generated Image */}
        <div className='flex-1 max-w-lg p-6 glass-card border-white/10 rounded-2xl flex flex-col min-h-[400px] shadow-lg relative overflow-hidden group'>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className='flex items-center gap-3 mb-4 relative z-10 border-b border-white/10 pb-4'>
            <Image className='w-6 h-6 text-emerald-400' />
            <h1 className='text-xl font-bold text-white'>Generated Image</h1>
          </div>

          {
            !content ? (
              <div className='flex-1 flex justify-center items-center mt-4 relative z-10'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Image className='w-12 h-12 opacity-50' />
                <p>Enter a description and click "Generate Image" to get started.</p>
              </div>
          </div>
            ) : (
              <div className='mt-2 h-full relative z-10 flex items-center justify-center'>
                <img src={content} alt="image" className='w-full h-auto rounded-xl shadow-lg border border-white/5'/>
              </div>
            )
          }
          
        </div>

      </div>
    </div>
  );
};

export default GenerateImages;
