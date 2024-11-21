// functions/redirect.js
exports.handler = async (event) => {
  console.log('Query parameters received:', event.rawQuery || event.queryStringParameters || '');
  
  // Log referrer and important sub parameters with safe error handling
  try {
    const referrer = event.headers?.referer || event.headers?.referrer || 'No referrer';
    const sub1 = event.queryStringParameters?.sub1 || 'No sub1';
    const sub2 = event.queryStringParameters?.sub2 || 'No sub2';
    console.log('Request details:', { 
      referrer: String(referrer),
      sub1: String(sub1),
      sub2: String(sub2)
    });
  } catch (error) {
    console.log('Error logging request details:', error.message);
  }
  
  // Convert queryStringParameters to string if it's an object
  const queryString = typeof event.queryStringParameters === 'object' 
    ? new URLSearchParams(event.queryStringParameters).toString()
    : (event.rawQuery || '');
    
  const decodedQuery = decodeURIComponent(queryString.replace(/&amp;/g, '&'));
  console.log('Decoded query:', decodedQuery);
  const queryParams = new URLSearchParams(decodedQuery);

  const a = queryParams.get('a')?.trim();
  const b = queryParams.get('b')?.trim()?.toLowerCase() || 'r';
  console.log('Parsed parameters:', { a, b });

  const redirects = {
    // 4455
    txy: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/8TXLMPS/?__efq=1XzZiNTLF3CD0DQwbDhaocPAQi9eAXGI',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1RTy8-tmWbDhulGVu6C9PiOlvg4UigF5iKZv65mzmEvQEnMAtzDyDNlHQbV_3pFaU0PgqZizeBzLB9-G89DZHLM7ZhZHajwa9FvE0BV_1-DCOUuF1P34hX5BqNS3z5Uo-QTJLu9A2zjsiTxSLqUkrEF_Qw8qQjUJB9EWDjd_ypZrF7gu-hMjtIs2f1X5Hx1imRGmtn-I'
    },
    // 7155
    sop: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/FMT3WT4/?__efq=1XzZiNTLF3Bt5mgS79qMEtN0vYb5XPck',
      p: 'https://www.zalkkweet.com/BCSQZXDD/FMT3WT4/?__efq=voaHuW34bC6hf8xS83WfbBU39z7hq0fJrIGGslWYl20',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1ftFT94VvGBkNcTsb4WuBz77y0oAOo_RWoLgBoHk1OR0EnMAtzDyDCp6uIyy4ASEAA0X-MxHH9d_zKm0-wno_IJNrYdIkNjvtH3e0i618xZH6R1IQqtkY9JVQcGmYhBdnS2d00LsUMeJ26tV2WBYjF30Wp95jeNo0XoeZJocFkWv-3e30BHcMzebH-xkj8P2H-TPOjge'
    },
    // 8025
    abc: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/H718H5B/?__efq=1XzZiNTLF3BH8a68yB2ic3bQ7GLRylXk',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1SUyeF2aIlf5DKHKP4nVjbNEp_Anje7x6p99-5h6V6gnEm0AtzDyDFG3Cx7nzI6bUTUUbqVi8i0DaRTagnGOzXSrourRL6Ebnbb0wTdID6Ms5OS65gJ8mfiyR3UrdRHmDTZgtHmxof2L3n8oJS59CDb16UCVLEx8D5lcbJQxqSTtiHX1B-uWhPN4kkM6Man5'
    },
  };

  if (a) {
    for (const [prefix, urls] of Object.entries(redirects)) {
      if (a.startsWith(prefix)) {
        if (!urls[b]) {
          console.log('No matching URL found for prefix and type:', { prefix, b });
          return {
            statusCode: 302,
            headers: { Location: 'https://google.com' }
          };
        }

        const subParams = new URLSearchParams();
        for (let i = 1; i <= 5; i++) {
          const subValue = queryParams.get(`sub${i}`)?.trim();
          if (subValue) {
            subParams.append(`sub${i}`, subValue);
          }
        }
        const subParamsString = subParams.toString();

        const baseUrl = urls[b];
        const finalUrl = subParamsString
          ? baseUrl.includes('?')
            ? `${baseUrl}&${subParamsString}`
            : `${baseUrl}?${subParamsString}`
          : baseUrl;

        console.log('Redirecting to:', finalUrl);
        return {
          statusCode: 302,
          headers: { Location: encodeURI(finalUrl) }
        };
      }
    }
  }

  console.log('No valid redirect found, falling back to default');
  return {
    statusCode: 302,
    headers: { Location: 'https://google.com' }
  };
};