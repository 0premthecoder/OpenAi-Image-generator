import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt} from "../utils"// function that are used across 
import { FormField, Loader } from "../components"

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: ""
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState()


  const generateImage = async () =>{
    if(form.prompt){
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify({prompt: form.prompt})
        })

        const data = await response.json();
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error)
      } finally{
        setGeneratingImg(false);
        setLoading(false)
      }
    }
    else{
      alert("Please Enter Prompt")
    }
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();

    if(form.photo && form.prompt){
      setLoading(true)
      try {
        const response = await fetch('http://localhost:8080/api/v1/posts',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify({form})

        })
        await response.json()
      } catch (error) {
        console.log(error)
        alert(error)
        setLoading(false)
      } finally{
        setLoading(false)
      }
    }
    else{
      alert("Generate Image First")
    }

  }
  const handleChange =(e)=>{
    setForm({...form, [e.target.name]: e.target.value})
  } 

  const handleSurpriseMe =()=>{
    const randomPrompt = getRandomPrompt()
    console.log(randomPrompt)
    setForm({...form, prompt: randomPrompt})
    console.log(form)
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        {/* heading which is extrabold and having font size 32px and color somehow black */}
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Create Imaginary Image</p>
        {/* having margin top 2 and maximum width 500px */}
      </div>

      <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField 
          labelName="Your Name" 
          type="Text" 
          name="name" 
          placeholder="Enter Your name" 
          value={form.name} 
          handleChange={handleChange}/>
          
          <FormField 
          labelName="Prompt" 
          type="Text" 
          name="prompt" 
          placeholder="an armchair in the shape of an avocado" 
          value={form.prompt} 
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (<img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>): (<img src={preview} alt='preview' className='w/9-12 h/9-12 object-contain opacity-40'/>)}

            {generatingImg && (<div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
              <Loader/>
            </div>)}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button type='button' className=' font-medium text-white text-sm bg-green-700 w-full sm:w-auto px-5 py-2.5 text-center rounded-md  ' onClick={generateImage}>
            {generatingImg ? 'Generating...' : "Let's Magic Happened"}
          </button>
        </div>

        <div className="mt-10">
          <p className='mt-2 text-[#666e75] text-[14px]'>If You Created Your Image You can Share it.</p>
          <button type='submit' className='mt-3 font-medium text-white text-sm bg-blue-700 w-full sm:w-auto px-5 py-2.5 text-center rounded-md  '>
            {loading ? "Loading...." : "Share Your Potrait (❁´◡`❁)"}
          </button>
        </div>

      </form>
    </section>
  )
}

export default CreatePost