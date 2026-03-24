import React, { useState } from 'react'
import { Edit, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const [generatedArticle, setGeneratedArticle] = useState('');

  const onGenerateArticle = async(e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const prompt = `write an article about ${topic} in ${selectedLength.text}`
      
      const {data} = await axios.post('/api/ai/generate-article', {prompt, length:selectedLength.length}, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success){
        setContent(data.content)
      }else{
        toast.error(data.message)
      }
    }catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
    // if (!topic) return;
    // setGeneratedArticle(
    //   `Generated article on "${topic}" with length ${selectedLength.text}`
    // );
  };

  return (
    <div className='h-full overflow-y-scroll p-6 text-slate-700'>
      
      {/* Two-column layout */}
      <div className='flex flex-col lg:flex-row gap-6'>

        {/* Left Column: Article Configuration */}
        <div className='flex-1 max-w-lg p-4 bg-white border border-gray-200 rounded-lg'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 h-6 text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold'>Article Configuration</h1>
          </div>

          {/* Article Topic */}
          <p className='mt-6 text-sm font-medium'>Article Topic</p>
          <input
            type='text'
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
            placeholder='The future of artificial intelligence is...'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          {/* Article Length */}
          <p className='mt-4 text-sm font-medium'>Article Length</p>
          <div className='mt-3 flex gap-3 flex-wrap sm:max-w-[90%]'>
            {articleLength.map((item, index) => (
              <span
                key={index}
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition
                  ${selectedLength.text === item.text
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  }`}
              >
                {item.text}
              </span>
            ))}
          </div>

          {/* Generate Button */}
          <button
            disabled={loading}
            type='button'
            onClick={onGenerateArticle}
            className='w-full flex justify-center items-center gap-2
              bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg
              cursor-pointer hover:scale-105 transition-transform'
          >
            {
              loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <Edit className='w-5' />
            }
            Generate Article
          </button>
        </div>

        {/* Right Column: Generated Article */}
        <div className='flex-1 max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-[300px]'>
          <div className='flex items-center gap-3'>
            <Edit className='w-5 h-5 text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold'>Generated Article</h1>
          </div>

          {!content ? (
            <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Edit className='w-9 h-9' />
              <p>Enter a topic and click "Generate Article" to get started.</p> 
            </div>
          </div>
          ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div className='.reset-tw'>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>

      </div> 
    </div>
  );
};

export default WriteArticle;