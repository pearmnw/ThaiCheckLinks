'use client';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import axios from 'axios';
import { useState } from 'react';

const Url = () => {
  const t = useScopedI18n('verificationpage');
  const currentLocale = useCurrentLocale();
  const formData = new FormData()
  const [url, setUrl] = useState('');
  formData.append('url', url)

  const predictBtn = () => {
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Accept'] = 'application/json';

    axios.post('http://127.0.0.1:8000/', formData).then((resp) => {
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <div>
      <div className='flex justify-center flex-col border-solid border-2 mx-28 my-8 border-slate-600 rounded-lg py-8 px-6 gap-6'>
        <form action=''>
          <label htmlFor='' className='text-5xl text-custom-black'>
            {t('url-detection-title')}
          </label>
          <input
            type='text'
            value={url}
            onChange={e => setUrl(e.target.value)}
            className='mt-1 block w-full px-3 py-2 bg-white text-custom-black border-custom-black border-2 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-custom-black focus:ring-1'
          />
          <div>
            <button
              type='button'
              className='w-1/3 h-1/3 bg-custom-black text-white rounded-md text-3xl font-semibold'
              onClick={predictBtn}
            >
              Predict
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Url;
