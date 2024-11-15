// functions/redirect.js
exports.handler = async (event) => {
  const decodedQuery = decodeURIComponent(event.rawQuery.replace(/&amp;/g, '&'));
  const queryParams = new URLSearchParams(decodedQuery);

  const a = queryParams.get('a')?.trim();
  const b = queryParams.get('b')?.trim()?.toLowerCase() || 'r';

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

        return {
          statusCode: 302,
          headers: { Location: encodeURI(finalUrl) }
        };
      }
    }
  }

  return {
    statusCode: 302,
    headers: { Location: 'https://google.com' }
  };
};