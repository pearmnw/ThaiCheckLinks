import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { useState } from 'react';

interface MDAPIProps {
  url: string;
}

const makeRequest = (url: any): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url; 
  }
  return url;
}

const MDAPI: React.FC<MDAPIProps> = ({ url }) => {
  const t = useScopedI18n('moredetailpage');
  const currentLocale = useCurrentLocale();
  const [checkIPQuality, setCheckIPQuality] = useState<any>(t('No Result'));
  const [checkURLHaus, setCheckURLHaus] = useState<any>(t('No Result'));

  const data = [
    { name: 'IPQuality', status: checkIPQuality },
    { name: 'URLHaus', status: checkURLHaus },
  ];

  const handleCheckUrl = async () => {
    try {
      const response_ip_quality = await fetch(
        `/${currentLocale}/api/proxy?url=${url}`
      );

      let url_http = makeRequest(url)
      const response_url_haus = await fetch(
        `/${currentLocale}/api/urlhaus?url=${url_http}`
      );
      
      // IPQuality
      if (response_ip_quality.ok) {
        const data = await response_ip_quality.json();
        if (
          data.spamming === true ||
          data.malware === true ||
          data.phishing === true ||
          data.suspicious === true
        ) {
          setCheckIPQuality(t('FOUND'));
        } else {
          setCheckIPQuality(t('NOT FOUND'));
        }
      } else {
        setCheckIPQuality(t('NOT FOUND'));
      }
      
      // URLHause
      if (!response_url_haus.ok) {
        throw new Error(`HTTP error! status: ${response_url_haus.status}`);
      }
      const data = await response_url_haus.json();
      
      if (data.query_status == "ok") {
        setCheckURLHaus(t('FOUND'));
      } else {
        setCheckURLHaus(t('NOT FOUND'));
      }
      
    } catch (error: any) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <div className='text-custom-black bg-custom-bg-moredetail w-auto flex flex-start items-center flex-col rounded-xl py-8 px-20 text-3xl gap-3'>
        {t('API-title')}
        <button
          onClick={handleCheckUrl}
          type='button'
          className='bg-custom-black text-white text-center py-2 px-4 rounded text-base'
          value='Demo'
        >
          Demo
        </button>
        <div className='overflow-hidden shadow-md sm:rounded-lg w-full'>
          <table className='min-w-full'>
            <thead className='bg-custom-black text-custom-bg-moredetail'>
              <tr>
                <th
                  scope='col'
                  className='font-semibold px-6 py-4 text-center text-2xl'
                >
                  {t('API-website-col')}
                </th>
                <th
                  scope='col'
                  className='font-semibold px-6 py-4 text-center text-2xl'
                >
                  {t('API-inspection-result-col')}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className='px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 text-start border-r-4 border-custom-black'>
                    {item.name}
                  </td>
                  {checkIPQuality !== 'No Result' &&
                  checkURLHaus !== 'No Result' ? (
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-3xl ${
                        item.status === 'FOUND'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {item.status}
                    </td>
                  ) : (
                    <td className='px-6 py-4 whitespace-nowrap text-3xl text-custom-black'>
                      {item.status}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MDAPI;