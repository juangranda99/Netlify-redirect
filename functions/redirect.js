// functions/redirect.js
exports.handler = async (event) => {
  console.log('Query parameters received:', event.rawQuery || event.queryStringParameters || '');
  
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