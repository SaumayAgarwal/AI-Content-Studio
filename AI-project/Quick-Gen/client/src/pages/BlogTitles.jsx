import { useAuth } from "@clerk/clerk-react";
import { Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    'General', 'Technology', 'Health', 'Travel', 'Finance', 'Education',
    'Lifestyle', 'Food', 'Entertainment', 'Sports'
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [topic, setTopic] = useState('');

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const [generatedArticle, setGeneratedArticle] = useState('');

  const {getToken} = useAuth()

  const onGenerateArticle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate a blog title for thekeyword ${topic} in the category ${selectedCategory}`

      const { data } = await axios.post('/api/ai/generate-blog-title', {prompt}, {headers: {Authorization: `Bearer ${await getToken()}`}})

      if(data.success){
        setContent(data.content)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='h-full overflow-y-scroll p-6 text-slate-700'>
      
      {/* Two-column layout */}
      <div className='flex flex-col lg:flex-row gap-6'>

        {/* Left Column: Blog Input */}
        <div className='flex-1 max-w-lg p-4 bg-white border border-gray-200 rounded-lg'>
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 h-6 text-[#8E37EB]' />
            <h1 className='text-xl font-semibold'>AI Title Generator</h1>
          </div>

          {/* Topic Input */}
          <p className='mt-6 text-sm font-medium'>Keyword</p>
          <input
            type='text'
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
            placeholder='The future of artificial intelligence is...'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          {/* Category Selection */}
          <p className='mt-4 text-sm font-medium'>Category</p>
          <div className='mt-3 flex gap-3 flex-wrap sm:max-w-[90%]'>
            {blogCategories.map((item, index) => (
              <span 
                key={index}
                onClick={() => setSelectedCategory(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition
                  ${selectedCategory === item
                    ? 'bg-purple-50 text-purple-700 border-gray-300'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                  }`}
              >
                {item} 
              </span>
            ))}
          </div>

          {/* Generate Button */}
          <button
            disabled={loading}
            type='button'
            onClick={onGenerateArticle}
            className='w-full flex justify-center items-center gap-2
              bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg
              cursor-pointer hover:scale-105 transition-transform'
          >
            {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <Hash className='w-5' />}
            Generate Title
          </button>
        </div>

        {/* Right Column: Generated Titles */}
        <div className='flex-1 max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-[300px]'>
          <div className='flex items-center gap-3'>
            <Hash className='w-5 h-5 text-[#8E37EB]' />
            <h1 className='text-xl font-semibold'>Generated Titles</h1>
          </div>
          {
            !content ?(
              <div className='flex-1 flex justify-center items-center mt-4'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Hash className='w-9 h-9' />
                <p>Enter a keyword and click "Generate Title" to get started.</p>
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
  );
};

export default BlogTitles;

