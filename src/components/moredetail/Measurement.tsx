'use client';
import { MeasurementProps } from '@/lib/interface/moredetail/interface';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import TableMeasureHeader from './Measurement/TableMeasureHeader';
import Cross from './Measurement/Cross';
import Checked from './Measurement/Checked';
import { useState, useEffect } from 'react';

const Measurement: React.FC<MeasurementProps> = ({ websiteData }) => {
  const t = useScopedI18n('measurement');
  const currentLocale = useCurrentLocale();

  const [sslValid, setSSLValid] = useState(null); 
  const [whoisShow, setWhoisShow] = useState(null);
  const [riskCountry, setRiskCountry] = useState(null);
  const [freeEmail, setFreeEmail] = useState<any>(null)
  const [domainAge, setDomainAge] = useState(null);
  const [trancoRank, setTrancoRank] = useState(null);

  useEffect(() => {
    if (
      websiteData &&
      websiteData.measurement &&
      typeof websiteData.measurement.is_ssl_valid !== 'undefined'
    ) {
      setSSLValid(websiteData.measurement.is_ssl_valid);
    }

    if (
      websiteData &&
      websiteData.measurement &&
      typeof websiteData.measurement.is_whois_show !== 'undefined'
    ) {
      setWhoisShow(websiteData.measurement.is_whois_show);
    }

    if (
      websiteData &&
      websiteData.measurement &&
      typeof websiteData.measurement.is_risk_country !== 'undefined'
    ) {
      setRiskCountry(websiteData.measurement.is_risk_country);
    }

    if (
      websiteData &&
      websiteData.measurement &&
      typeof websiteData.measurement.is_paid_email !== 'undefined'
    ) {
      setFreeEmail(websiteData.measurement.is_paid_email);
    }

    if (
      websiteData &&
      websiteData.measurement &&
      typeof websiteData.measurement.is_age_more_seven_year !== 'undefined'
    ) {
      setDomainAge(websiteData.measurement.is_age_more_seven_year);
    }

    if (
      websiteData &&
      websiteData.measurement &&
      typeof websiteData.measurement.tranco_rank !== 'undefined'
    ) {
      setTrancoRank(websiteData.measurement.tranco_rank);
    }

  }, [websiteData]);



  return (
    <div className='text-custom-black bg-custom-bg-moredetail flex flex-center items-start flex-col rounded-xl w-full py-8 px-20 text-3xl gap-4'>
      {t('measurement')}
      <div className='overflow-x-auto relative w-full'>
        <table className='w-full text-left text-gray-500'>
          <TableMeasureHeader />
          <tbody>
            <tr>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  sslValid ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Checked shown={sslValid} />
                  {t('ssl-true')}
                </div>
              </td>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  sslValid === false ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Cross shown={sslValid} />
                  {t('ssl-false')}
                </div>
              </td>
            </tr>

            <tr>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  whoisShow ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Checked shown={whoisShow} />
                  {t('whois-true')}
                </div>
              </td>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  whoisShow === false ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Cross shown={whoisShow} />
                  {t('whois-false')}
                </div>
              </td>
            </tr>

            <tr>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  trancoRank ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Checked shown={trancoRank} />
                  {t('tranco-true')}
                </div>
              </td>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  trancoRank === false ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Cross shown={trancoRank} />
                  {t('tranco-false')}
                </div>
              </td>
            </tr>

            <tr>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  freeEmail ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Checked shown={freeEmail} />
                  {t('email-true')}
                </div>
              </td>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  freeEmail === false ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Cross shown={freeEmail} />
                  {t('email-false')}
                </div>
              </td>
            </tr>

            <tr>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  riskCountry ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Checked shown={riskCountry} />
                  {t('country-true')}
                </div>
              </td>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  riskCountry === false ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Cross shown={riskCountry} />
                  {t('country-false')}
                </div>
              </td>
            </tr>

            <tr>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  domainAge ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Checked shown={domainAge} />
                  {t('age-true')}
                </div>
              </td>
              <td
                className={`py-4 px-6 text-medium text-xl ${
                  domainAge === false ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <Cross shown={domainAge} />
                  {t('age-false')}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Measurement;
