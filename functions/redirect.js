
exports.handler = async (event) => {
  console.log('Query parameters received:', event.rawQuery || event.queryStringParameters || '');
  console.log('Raw', event.rawQuery)
  
  // Convert queryStringParameters to string if it's an object
  const queryString = event.rawQuery;
  console.log(queryString)
    
  const decodedQuery = decodeURIComponent(queryString.replace(/&amp;/g, '&'));
  console.log('Decoded query:', decodedQuery);
  const queryParams = new URLSearchParams(decodedQuery);
  const sub1 = queryParams.get('sub1') || 'No sub1';
  const sub2 = queryParams.get('sub2') || 'No sub2';
  const a = queryParams.get('a')?.trim();
  const b = queryParams.get('b')?.trim()?.toLowerCase() || 'r';
  const o = queryParams.get('o')?.trim();
  
  // Para servir imágenes directamente
  const i = queryParams.get('i')?.trim();
  const img = queryParams.get('img')?.trim();
  
  console.log('=== DEBUG PARÁMETROS DE IMAGEN ===');
  console.log('Parámetro i:', i);
  console.log('Parámetro img:', img);
  console.log('Valor de i (tipo):', typeof i, i);
  console.log('Valor de img (tipo):', typeof img, img);

    // Objeto para las imágenes con códigos cortos
    const images = {
      i1: 'https://firebasestorage.googleapis.com/v0/b/play-c33aa.firebasestorage.app/o/8698%20-%20CPC%2FScreenshot%202026-04-20%20at%2012.32.23%E2%80%AFPM.jpg?alt=media&token=6ea97ac5-d1bc-4a4c-abaa-27925cb847e3', // 500 771
      i2: 'https://firebasestorage.googleapis.com/v0/b/play-c33aa.firebasestorage.app/o/8698%20-%20CPC%2FScreenshot%202026-04-20%20at%2012.33.57%E2%80%AFPM.jpg?alt=media&token=7cc4c0ce-6fc3-4604-bcec-64e4cc15c77c', // 500 84
      i3: 'https://firebasestorage.googleapis.com/v0/b/play-c33aa.firebasestorage.app/o/8868%20-%20Comcast%2FFireShot%20Capture%20030%20-%20%20-%20%5B%5D.jpg?alt=media&token=af138e88-9056-4055-af8c-1149990984f1', // 500 739
      i4: 'https://firebasestorage.googleapis.com/v0/b/play-c33aa.firebasestorage.app/o/8868%20-%20Comcast%2FScreenshot%202025-10-09%20at%206.51.34%E2%80%AFPM.jpg?alt=media&token=82243357-7ab1-49a9-a58d-046ed59c0500', // 500 36
      i5: 'https://firebasestorage.googleapis.com/v0/b/play-c33aa.firebasestorage.app/o/7412%20-%20Comcast%2FScreenshot%202025-07-10%20at%2015.18.00%20(1).jpg?alt=media&token=a9ac6307-6717-4510-86e0-d623a5666eb5', // 500 35
      i6: 'https://firebasestorage.googleapis.com/v0/b/play-c33aa.firebasestorage.app/o/8685%20-%20Comcast%2FFireShot%20Capture%20241%20-%20LaserAway%20-%20%5B%5D.jpg?alt=media&token=1991e13f-249c-4b2b-8466-88722df76ad6', // 500 1431
      i7: 'https://firebasestorage.googleapis.com/v0/b/play-c33aa.firebasestorage.app/o/8685%20-%20Comcast%2FScreenshot%202025-09-28%20at%2012.21.07.jpg?alt=media&token=d3cdcbbe-e5e1-422d-b8ad-b5c32e53bc4d', // 500 73
      // Podes agregar más imágenes aquí con códigos cortos
    };

    // Verificación temprana de imagen (redirige antes de cualquier otra lógica)
    const earlyImageCode = i || img;
    if (earlyImageCode) {
      const earlyImageUrl = images[earlyImageCode];
      if (!earlyImageUrl) {
        return {
          statusCode: 404,
          body: `Image code '${earlyImageCode}' not found`
        };
      }
      return {
        statusCode: 302,
        headers: {
          'Location': earlyImageUrl,
          'Cache-Control': 'public, max-age=3600'
        }
      };
    }
  const redirects = {
    // 4455
    txy: {
      r: 'https://www.zopistreo.com/BD7N3BM8/8TXLMPS/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA9B5K-OJ5f-J',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Q_78BNPw7-d5CuJZq1JQPQ2ZdY6WzRTPiQAKE6J-n38EnMAuzPeEmIByQUSo9XlqcPHWPw3wR0ygghexEo6yFdb9Rj1j0Gk5CtgHqExLnn_sGBX7nY4AWMeqFBuPpzqBBxaOoXjf13JUmCAbaCYmkVtnjzmTmL1Ngrgh4c9AFixoZt-jvP8_QdAVHecTncuK6iVvNTz'
    },
    // 4455 YAHOO
    eas: {
      r: 'https://www.zopistreo.com/BD7N3BM8/8TXLMPS/?__efq=-d-M1kYRzmHEmlOqcSg4UOWmjXneBDLYamehe-9Jan1WPsMdGM-iyHHviNclm4vZmNDfQfE_YGHpLTxEwn0UiA',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WYcxLFI6MbS47o2E3kc59nb7Qd6hARmw2ofV-m2r4ZJEnMAE7PmYo5te2ZhPhfXtf-mAv3MOGm0XwhTD7TPbzRJsHzmJ3iSaPng28Kcyc6YYPlDxkih4K3bVAy5D7OS3XmkBJmaUYuBJHmmCpvyEzEg-CL4ILOcKxNDad2Zl_8c2jM0crd6kcn9EzayN-Mj__uTzNZ8'
    },
    // 7155
    sop: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FMT3WT4/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA5KYVnbJ5vui',
      p: 'https://www.zopistreo.com/BD7N3BM8/FMT3WT4/?__efq=voaHuW34bC430lrXieKKbEwQ54CsTt_eHxsrbUKakrFrSu0EZRVGh20pidmY5I9hd2SYpEgZhZg',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1XLkLiSysuRFbd2eCu-bL9jY9-JbpH_aUAGbWLzf_IyuEnMAuzPeEuJI5W-5Kwa_BHUXW41wRdsBdmwOa_y-htKuPDYc0U2qkCxAaPdLYdfiWhNpN9YvkajR4YKKeq1qeVCj0dzIJDtWQQhBJpLRrnnVNHrwR7PAos5Gf51lIE43-cfQ9jastiTFfkcYB0PEbcE2KaFJ'
    },
    // 7155 YAHOO
    sos: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FMT3WT4/?__efq=-d-M1kYRzmHEmlOqcSg4UOWmjXneBDLYamehe-9Jan1WPsMdGM-iyHHviNclm4vZJDD_F-tRa9WeXWTJqIg7sQ',
      p: 'https://www.zopistreo.com/BD7N3BM8/FMT3WT4/?__efq=voaHuW34bC4OHBO5r52OURRcPRVdL7C_X2Vy0JIeShwyeLuJ72JoyNBTzaEDp7GFgKk28RiEP1x7InBpjqAm74tO0s1qCq9Q',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1cH9_uTHL0kNO5Ka-PMaf8iLbPUOKjwszBzA98mgefwvEnMAE7PmYoqlYd4R4fUWDP0Iy644c_284QB4U06KX22Zy-eIbp8WmKrOmtGUNE8MtjZ9Kc1JVGm2SWzK_1VMeK7HSS70ltwGU8DpM1xsE2TVQlSlrHnuqjL_jyFXJL9h9xuaZL5zXWQYYTwSU_Zs7YpagvEG'
    },
    // 8025
    abc: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/H718H5B/?__efq=1XzZiNTLF3BH8a68yB2ic3bQ7GLRylXk',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1SUyeF2aIlf5DKHKP4nVjbNEp_Anje7x6p99-5h6V6gnEm0AtzDyDFG3Cx7nzI6bUTUUbqVi8i0DaRTagnGOzXSrourRL6Ebnbb0wTdID6Ms5OS65gJ8mfiyR3UrdRHmDTZgtHmxof2L3n8oJS59CDb16UCVLEx8D5lcbJQxqSTtiHX1B-uWhPN4kkM6Man5'
    },
    // 7501
    bat: {
      r: 'https://www.zopistreo.com/BD7N3BM8/G91KKH6/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA5K0oUb8gZJ4',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1ZI56TLZJ8uiqpb4P74UuKBC6HFoh3OKCWSTepXVxn6-EmAAuzPeEuFKuG0swtgNXjLcG6gnjQ-0tFf5yNlh8YAkHiZZhELRJi6D1r-5yJkLdKnPEZQHr3eukpk_shp0uYm6TbI6jan10IvZk5klzMBLQDzCE1zVxr0URHW8uxdwEmI'
    },
    // 8685 LaserAway - 70% Off - M - F Drops Only - Ask for Cap $55.250 daniel+162585@aguara.com.ar
    unv: {
      r: 'https://www.zalkkweet.com/BDL9J672/JCPRJW2/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA8pdGkYSnEX4',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1Sa9fcOcacecBG6FcyzYXbqqz--RptDtuNBSCNFIVfShEm0A1NLZab1I-LhntDrRA-ET0xajoTyG5N3aMaog5-bkfBjstUAZxAMurnQa07W_KnPPkm68b3CoP-_txx0TnsUd41LBEOJvgcbn8otmea4UkpSJ98mcgvWVGYXhniPRFo7GOUUerLUc0DxXjtDp'
    },
    // 7412 link gaston
    azx: {
      r: 'https://www.zopistreo.com/BD7N3BM8/G4KZZ15/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA98sDp0JtwNQ',
      p: 'https://www.zopistreo.com/BD7N3BM8/G4KZZ15/?__efq=tKVRqAYnEXxo4Ds_KOfghZuCvcMiI7oI6MvjlptBHyCmym-4f5_jHSTidnLxbPbjIATR2fe4Hys',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1UImqRMhG_PUKm6PDWVQ_-5rlOyl7qhLsj8NGtSvckCuEnEA1NLZaR7RAD5qP2gx8TKPQbQYu5rIWgGdc1fLkIDhK-ds3rGh8q77HuvXVHctG0wBlx8xMwPHV6jT5dq9wBn-SKAbOm1oU8O7N6USKfbOeP6d-0685TDdmEXcbtl-lMFAVe2PS4-m9UXekt-v55kO-Q'
    },
    // 8359 EXCL - DRIVE - USA Wild Seafood - Free Smoked Sockeye - Proof Req
    hgv: {
      r: 'https://www.zopistreo.com/BD7N3BM8/HRK3JZ4/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA4QdXSVDYY3W',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WiAGMRiqMbCbuHbYxBLCxLzt-93McrtQD7VhA5ROQevEnMA1NLZaTVRnPV-ZmQu1eBORDh11cutEWP1WiDg1OtdcTM3xw7_KQMFPNgrk341q32huSGZTefiXIoloBEd0OaLABq6FKpgKPPmEfggZu3ceLnBCZIwWAkLjjWJ9Z7phxhhk1H7vzHz9PoRx8XpBdhDRrR9'
    },
    // 3776 
    ksw: {
      r: 'https://www.zopistreo.com/BD7N3BM8/7N8NS1K/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3J0PhaHyu1P',
      p: 'https://www.zopistreo.com/BD7N3BM8/7N8NS1K/?__efq=r4edj8eXlxKv30bU3E9-Ei73s-VP8txmHTK5u3wg6A-RHXtWVXcWtLiHUZDX4gUxuzTIOYi-9dY',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1X4Q0p2jihShK9jHTOdjAjFX-rP21UH4qNQAdww4pAPmEocBALsz3hJxFgZ6g4tBHdNCvTBGw177BUaZoufw2jgi6YmfPwO4pr_mTrtdmqR2ZVOfsmxJRw8XkAg8pZnk8dxr0dIM2myYzIyYXmm5KMYigt3DPxx1iv9g_i7iSK677r5Mw-B8SpkRNrm5SmSBOtArru41zOgMPO2XvO6PiGbSl2wuKvAFWwW_'
    },
    // 8595
    muy: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J78S2MD/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA-7ug_75SPRI',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1VOSvMp9GVMze0SOVO9WK-bxDYFHW4itnA82LIy0H3sUEnMAE7PmYto4ghi1JFz9bpyYF69yvkuRMmAiEtyTBLfxK_xN8iwd_y89Gld7qsnmBBz9x-KQnaxo93DKrTmdBNtoCP_eKeb34pPdSkfx59IMb8KI0QMStWAnXRbAJ7Mpje7TFIM0LV4Wx0TA7DM1l5LVlWot'
    },
    // 8534
    osd: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/J4845QC/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA--tzxMtGp9w',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1RDMY0VNIlclvA9jt8t-UcAOixvjJYulnJmf5giQdU0FEnMAuzPeEq6ASMNhY_sbYzkVR4jr9Ie1ihdyU8uX-YWogFmZwB1_Nkdh9ER0qp3NWkPeuYSWv2D4z5HYtwws2RAviyduQGfdQu288Gcc1KMBEKN1vYcgsNVEL4blA_mDPeJZotP3Q5by4Cs7luBaJV_Dz7Og'
    },
    // 7295 
    sqe: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/FWRHKW4/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_qstJevw5Gw',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1dXA6-2ihq9Ua7GjN6j_bH4lOpJUzB9RUvExIpeLepcpEnAA4fMW2eWGraGQqQT4u8UcUf4Xxxy34gr6Hhw2y7JjKCRBDFhTNPcqUccHv4LhdF0Y7O2LtxLwx12LjYxD2B_3Avh25PibYiHjxgWljeOqZjeq6Bd_4f0ehmAk8qp5tWzYo7l8h00IGBIgzzXcxtxq'
    },
    // 6697 LeafFilter Promo 15% OFF + 10% Off for Seniors/Military - Ask for Cap $136.000
    dgh: {
      r: 'https://www.zopistreo.com/BD7N3BM8/DT539R2/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA0dEEoNH84ub',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1YNj7Et0JIIXRkwBVdWNjrHhIfo3Nfj--18PevOU0CywEm0AuzPeEk0cIRjoOnYZptCgdHgJ6A4_G6anWVXp2yIagJ7XyzaEtRgPOGe73DDrm9cAmpRdOwAHGPIucj2aXqEZczZat-abKtDid66QcvOqBFSEddx_Om17A2N_HmgZMfrOBndjSPkxJJ1iS-Wb'
    },
    // 5859 
    mni: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CCKC128/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA0yESFHa7xVW',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1XNM_kb1ANEDYYZzF99oSIfGHh2cDG9u4oTzxVM5mpUEEnQAuzPeEn4wB2c07UbVB3O8DGZl0qI9pTuh7s0Wkk3HDSqy3GfVMpR62OEcgr2annLxXBP0D4QWmDhi6MbOvGNKVCqwqph0gNbIFPxDGm_khWVT3S7xzDclrQILmMDglxci5XbpxGOaWuSr_rA4JBBHst23Bg'
    },
    // 8238 
    khg: {
      r: 'https://www.zopistreo.com/BD7N3BM8/HKK2MWM/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAxe33Cej6Bmh',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1euX9bIbm0wiEudwjckZ_2xdJeSMqbYfXHH8-cOWTeRvElYAuzPeEu6Il0K63siLn0h_4zu9b0v2rI9YUENTsqO8bidKVXyCQTPA0BGj6nz86zLtGXxud47Me4VncOQjy4_ARoR6wPfLc3FKH9t9SuXa9UD59XpqPg'
    },
    // 7085 
    sxd: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FJCW3BL/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1YffZXtA7sx',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1TwONpqpTdhIgxvssrl8oEqr-DN9zduS4wcijkPaRqupEnEAuzPeEredWpqy6zhFFZbi3WTEXk7YgKcXsXHj4RXExX3jXE0JnQuhmXq2XpSneiX3lQQ97xcfhYaQyTCD1Wz1oy5zmhb4VWEk6JfzMBZKJ6fZNtHWXg5Ly655j7ZPsydn7dDWcVz6bqbuRmelsev2VQ'
    },
    // 4487 
    dfy: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/8XJ2X98/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA6OFIW4ZGS4m',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1eM_7syBvlg3bkZA_BusDfY4G33MBggceEUPGntHbMAqEnIA4fMW2dtwISS1H3AJWf0rCdwZ8vDP7iUjW49IcJ1hku923PMxPX2nQQDA4jsst4IHJIaiApzkJmp5XgWS85SpgsMiA5m3ROHczBT0xTryMgBw6pFKOd4g-EiMtJonT5rU_Y-FrPumVYiUI9AyJ--gCCU'
    },
    // 6056 COMCAST
    kgt: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CPBX21T/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA6i_eLbqBwvd',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1TjBMMIEkCsQsBwNAiXZlQRBX-Ciw0ISusClQVE7DhOAEkQAuzPeEqkcJuu1rkb5dI0iF3sPgxZrbWekUJiueWjkirZMKNQxwKdZ8qMh_ylw3yLMyI1C-WqJVsy8zcQ_X9anvd61pg'
    },
    // 1587 actualizar
    ozq: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/3RNSZZJ/?__efq=1XzZiNTLF3CD0DQwbDhaoYz7ilfejgeO',
      p: 'https://www.zalkkweet.com/BCSQZXDD/3RNSZZJ/?__efq=LeZe4jAHki-7KOQemI3MMXLLNeSZaFHISsExnfl0d50',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1bHswsYBGK56PwjXqjbphH670yPwot2TalpnwLBzTv5jEogBALcw8gyO9no2XbK4tBCg_2fN8Q1MxlyCw-0xA1I7OyFyyPvztvRMH3scRxMheHNpIUZiam7m0IWTYOgUXke4C30pYkel99QU8pZBJ9alwHiURuLGA5marK4owKqxgiTpAl4QZkUeT9I4R586zvlbFFwGRSb7z-UbnJ5PDcz2BzmHT8MzybhS0A'
    },
    // 4150 
    ewp: {
      r: 'https://www.zopistreo.com/BD7N3BM8/8BS378M/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_7nwGHUnBHX',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1dm9WWT280qLeDWOnXhrQFnrDitj2ABw2SX43j-oKDM2EnMAuzPeEtMe6oYcMy5hE8n7aoZzC5W0FRMWlGOgrZaXX2QSbj4YWvltg9rOrKK2HluTbfWpXRdzDqX0tCz1dWiFmPvdKmtVVCZT8ajnmZLGDNQFNRY-W5mGWYoG-AAWhJEgG2M-6J1ClemdU-8NHORKKf5R'
    },
    // 8535 
    ntp: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J49H2GZ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA4TlOIF6cOMW',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1ccxtjHn8LZ4Zh0uF8OVv5NGCWSFKub8Fixf14k_XI1REpMBALsz3hLr2e0-aS4q1Dxj4rrbHffkqqqm4yOnA0vc2dOAjw0iHNB8MMF4ghoynHceRRhE7ixAakoOiAELSNnbTFPaoHczyKu3qk8cmeDKMR5wIDqFFyoHFSUVZ32hPNnKuD95aUVDGXIsuYwJ1FvFMtPIfpjMYHCKq8tXRp6HmGbnBLdl76KhH6t7V5IpWAoFsWgn'
    },
    // 6672 
    wiz: {
      r: 'https://www.zopistreo.com/BD7N3BM8/DRWC7CT/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA6zWrl5vIwdv',
      p: 'https://www.zopistreo.com/BD7N3BM8/DRWC7CT/?__efq=z63ckHk49yYdBMdwporrfBHz5SPIhIw6Xom6kd2PIOxSqLYyFO-7YJ6BJb0gG0oifCtaeRR9Gwk',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1UeAvYWItFzcfU2egjbuupfxemV4Xkdqv6ovwxnMrebGEnIAuzPeEpUXcBRXZysC6DyjE6zj9P5rStcq4CkAk_kfzT9cfaARPwvySrDhIgpWBn6wCUW_6FGCeKBCFjBI64eOHe-VhNlEFlXgsrPqQ2P4d26iBXPpQq64ePz8ZcCaYpibA0j0Oe6MxC0KLfSKa7smqX4'
    },
    // 8549 
    gla: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J4ZXDRG/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA5spsOOiDOCd',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1VjTYEheOWWtjJt6QDaGoAPKnW35DHmP8euJAGw80v70EnEAuzPeEq2-1TOBiGrEGYb_EANHPPUtYuRYaxkLhOcpLz-N1pDe7E77vZFQ1hELp0qznJNKbiDiupKw-sW1Z0IeKBENFInZlbI0ImV0SinE5LMEH6pK-KeQjMzrefNd9eAufjVZF-xyqHYAcuEvqZgRMg'
    },
    // 7089 actualizar
    car: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/FJKFL92/?__efq=1XzZiNTLF3A9Ky9T4ikuLPyUDBA_kIeb',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1b5VtgLLBsmQ_6kT0dVdv9Vfw28xB34kdH4mGDVxMROIElEAtzDyDOfJkebgo72dbSH8jba1Qqw9aHXEoLzDpKqU9rAARRcTLuCXF3GCaSByLffNoiZtHBKbn1sqOBbUNnkqILPhPbcJl5y977WByjAEMEw'
    },
    // 8707 actualizar
    mat: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/JDSC13D/?__efq=1XzZiNTLF3Ap_Ai-zw_ArU-B8LhCwqi5',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1WcpGx3VAY1vz_QG-QmnK1MyRmPtVwnI4LFS_bnpPOhEEnMAtzDyDCl68cEfdtXPuvCsF3_yaxwDRaTq1WobpV4_VTLn1T-OPACT7dmXlk548uBB9odzAVmeHOnlXgirDTyKHFd11hFSB5Ezt9gbGoEnFIlWjHhl8KvJraLGihN3zEUXB4z1oXVnnOKSDswbn_K2CEDH'
    },
    // 8845 
    djs: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JMMZWM6/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAxlFlPnngNdb',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1RbPHx0KsFlZdB9yCbIspVu7VJBYNYACWCP5McRqGsGuEnEA4fMW2d16sDLHKkfgiL3GfNEcqxJqsuJbiqq4WJ-FUkZJso9I8diOuFeNHDs-jM9TfcACoiDeiT7KuG093bnQtJ2xwOEm80V-12MEIIymENs32Jvi7UA_5-RJb1P9Y6PO9I1K35dYK6aC4pAOuWrh1Q'
    },
    // 7909
    hel: {
      r: 'https://www.zopistreo.com/BD7N3BM8/H1861QW/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAyxRL8yVLcLW',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1XfI5-DETlse8lX2WW31dbBnZxYzI9Wf774F1xQTwi9AEnUAuzPeEtYmirOKD4DDggd1xXUs1H2YV4x_Mh2I3WTgAj5VVePBb_-RCAfyBYPevCkIElSE3_7neFwvZ3yYjs6oGeA1dC82jWKMrY3ciIUBmQ3zd3tLgYAdpx885LqOGrl3Qs53tV9cqxQdm0NmusSNRjjETTU'
    },
    // 7741 actualizar
    hin: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/GNWTL4W/?__efq=1XzZiNTLF3DYLUcIvB1J-_srPDBySDiV',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1TBEHKgtZNGPWfMYgZKGD-ds3WPgIJjyCDfE4N-5kNYjEnEAtzDyDEQflAHU8-KfpzyjRQbhdDOzCtcaG9ohJlbxLisE6W6EVzbdK2p_OBuGR5tH2R_oNsnQcVntkyLU3Eu3TZRSzuQuDVn7fVUGu3ce_aXumCfwP58Z1LmDAHT0W7tvhofxKIWYyswEo2CErmamEw'
    },
    // 6136 
    tim: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/CTB1NWF/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3TWAYuoYgnv',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1Rn8RFdOyG6Eo8kPoqDwczpRYKDZ74Xr268duJpiteCUEk4A4fMW2cPxb5_TW1rVC3v45RBsROU3x7rj0AHbeyfNizbX2TGPQGqitAYnAHgYZ5HsH8KUaxx-T6uxFJe6pQojJZWCAR5LH7voYA26xu8'
    },
    // 8229 Endurance Auto Protection - M-F Drops Only - Ask for Cap 
    opw: {
      r: 'https://www.zopistreo.com/BD7N3BM8/HK4JP96/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA-3T8m-FBs3Q',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1bG8OHfUmZ3AcAXejY_oKRjdE8ZVxa22m5HVUEUOgXWtEosBALsz3hIFhQF21uVAYQUnXyxmrlakl6-JX76wOznoXwsS_zraSyQQnnPXCRW2KQTCJ_cW1Jq4aDi_YeusiyrUmD13oS_8luhm9AnbqW7oQ3E64re9Uc99kZEP0SA-LcaRTnajZK67xDt44GPcz7dOTNoYaUZPs_S9GCiE6aAvl3NJDWlfFJZwJldIOg'
    },
    // 6193 ADT $100 Visa® Reward Card - Proof Req - Ask for Cap
    adt: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CZ562T2/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3EBJZhRGGWF',
      p: 'https://www.zopistreo.com/BD7N3BM8/CZ562T2/?__efq=m-SaKg_fSwE69ryStEa5gibmXwBGTubvpSOYafKMqXnVj8vMN7vhWn9YLBjS_EqJGqSR9FaAulA',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1eDZP2YfbfIclJ57Wr7PtYvbSTLfjiiGIUYYTxDEGNefEnUAuzPeEj3Sy0vAerPSvzL2O2zGm2VVMKlMDyICuNTzDMa7IImnb9QGGMxZ5ZXBicvadOaQxH3vm-CZDKLufxg9nnOi-0ssh6n80CP28OnLKzOcbSNCk1mHVGYk3lHjvtZet6ySrMmF5i0Ax6mPXB25K_kVMqA'
    },
    // 6273 First American Home Warranty CPL* - Email/Newsletter Only
    tip: {
      r: 'https://www.zopistreo.com/BD7N3BM8/D448PPL/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1nkHoB5MZa0',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1d4NLs1u6coYSsNgFeXgq6G-pyXhG6e6Ps2JsD7qnncBElgAuzPeErAGDSQkE8P-G0aKLSzMORgrksdIOZuG1dkl3mm1YD0V7_KPHa6GIgfiJPXOm6PPpnG28YmAgLSRtfN3WMHZNRRruYtNgG8vj2-hxs5t1elXWlkl'
    },
    // 8787 Vehicle Protection USA - M-F Drops Only - Ask for Cap
    plo: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JJRFMXZ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA6OmdlZu1LlQ',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1TH0Q5c5h9cJ69JfubIS6k0rU-EOJOW-zga9-9DfZsseEnEAuzPeEvmrJ6MbxX79fF_xmxXE_UifcyB6tUS9iHcel4izPRDy__EYK5JiuhlEXIijNX4otaFtxm-3MZdKbKqiCysKzOvKObJpp94Sj3pYUKvD4aOzNAqfR0BrSBcPsI0RZyNtTuz0Ctp0ghoeKRUR5Q'
    },
    // 8808 
    fut: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JKSL7DP/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA9HNS-Bly87y',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1TbAimLXoPEcd90BXHhwyW7enGefVtNEYXQKCtHYL0l5Ej0A4fMW2R8Vf1mBgy8-f-gMiJrcROQHapHR_YsiR_Esq3_ftPHUkUduQrQGfanIPRPve-9LD1DRRnwdkQWO'
    },
    // 5936 Empire Flooring - Promo 50% Off Sale
    emk: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CHD91P1/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_7NuhMaRPXW',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Zo3F1WQhFODTNk243fBq05rCfn6Ascm47jDWm5OM9yEEnMAuzPeEgiu4Qsg9iwbzf2Q-YyH1DWLBAx99ur4ofX4kvRexvYztVHg-7IAXqvtKqbkL_UPpfLr8GP0OiWqi6GJGfo0oPmCcNkwkVUP8ozAYlcmiFl29zOGxD1aU1VzTTYkGaoI6dG8RKxAC53vPj1GEEv-'
    },
    // 8675 
    inc: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JC7WPHZ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3yr6EXyzAL5',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1dvUC-LmcIMZyKQDZQVIDlw7quZddGafdXQtpoQLfRQwEncA4fMW2dxMRT1VTBBdbRFXAKuvx0EN2VTpKJ7jlrwrGpaJnMKxc94YNk2jLpJ9RwDDzM6cDV15qgUf5CAOdvird-sIr7FgwEAjK5DSrYWbS610cklT5rccnM9op88bYbhVwXaHlKrm-ZjRg1z76Y5259kN0GlRFA'
    },
    // 8887 Leaf Home Water Solutions - M-F Drops Only - Ask for Cap
    wao: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JPQB1JN/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1PjN1ch1S2Q',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1bTwpzdtjZIY9REo52DnuyDqm90RR8rWVi-_RV9TVDbjEm0AuzPeEshIwItkxKFclVBJ0Rjy9MJ4_oVVS-Y5-tVuM-XAX8d6jkrvjyyatVBjetRaHcOkO62kIGT26CbL4ck7a0EkYu_EU5mcftJln2eALptIcYTgHSwMjmrxn9UxrUpikHv7RRUk9Q73jW3q'
    },
    // 8870 GetFlexHeat
    ijv: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JNWP12C/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA4ZZLM21OE2P',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Rr-BtvXWV4n0jkQ8uN-uXoK6PFl4QnMZ2Za2wfxoUQnEnEAuzPeEmexXe5NqOeZ52C-257x93zx05UL8gAu-GF4zL06kmhzievWM8uaIc_gnjLWbqf_D95ALqOJx-NSquDpNRlLgooPq5J8j7u32StZePttWIbEu5Vld2o197rAfBDgKx8KaJWVMD3GqzWqyVOpWQ'
    },
    // 8814 
    gua: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JL4XHSC/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAznVLhRRgLbq',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1UHKO3lbggNUgrtqtJ3jt4njl5au6Z4lgyfICFHAAz8VElIA4fMW2bGzzKisPZ490ioYfbANRrCM6F2EOQxZKDOyFXf7--H9vdeGNtvGds6Uk2SV7r79r5RFIiJHqWFFUfyV9PZK2atFzQCWJeZbPRMl8U4Y'
    },
    // 5620 TruGreen 50% Off - Sensitive IO Req - Ask for Cap
    tru: {
      r: 'https://www.zopistreo.com/BD7N3BM8/BXPFT55/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3ayEOfllcz5',
      p: 'https://www.zopistreo.com/BD7N3BM8/BXPFT55/?__efq=Zt9OZSOiPiG2vXYBJCEryW6W_4CCkFuSpIAf9M7ZqWteXOg7wirrjuh_6VTXjhJ9DqJr4XNV2EE',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Wd8nj_Ia_SlfV-QTV6JenZa6bHIzIp2k2Ee8FhxkJIeEm0AuzPeEvFOXU_8DHYr0jT20P5izmsv3EF_WEV92Sma7e6mMpuTCkn7wHge_fMHyITboZvirl4_5l4RMzgSlHSGBwohbNZ3sFrX3kIE2M8G5Qa6KZjTX3uT5nLU9IDsRx0kq5CHEWvU5rt5Cehw'
    },
    // 4055 Senior eharmony - Sensitive IO Req
    ear: {
      r: 'https://www.zopistreo.com/BD7N3BM8/86459BZ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAzYisW4Ynu0S',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1YeEvPQE9THQiBiD0luIwU7AQVhlMDGCDZgPTFMQGG7WElAAuzPeEvuf1Q1MUYFrJPdEYYdJ6IaWiJUK1g3jh-OxTJoQ6iEzyCdGUiIoGu0ljNRI35WknpBLFR7lFZUKoRGhZDKVovjtDo_BtYHRRsuQ9A'
    },
    // 8340 Nutrisystem 50% Off and $99 for 28 Meals! - Returns
    nut: {
      r: 'https://www.zopistreo.com/BD7N3BM8/HQLNQZK/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA5EW7Kh4DzXI',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1T_6yymNs8rCzEYxU7dHtR7pQPMHDsaiyCGlNsuXEVLBEpUBALsz3hIwQHTSXrfquJx7doB9XlLELig2BtrtT-i-iGjWctaYUBiej02GLNTQbWCQwFCIXwIRji37U8W_JrffVQnQuqQwJK-M7Rt4NwRHqPqx3FBpq8pSSwtzViFXF_siJ8HvAvqPeHgbxZsvnipBn_oBAuGeXr3WNv0tJYoffOVtF3l5nL_joZ-SxtdfaNCOKhUq_-A'
    },
    // 7286 Timeshare Exit Strategies
    tik: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FWC1M8M/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA-vR3SvuZNfv',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1ZMCIjchTcx77Hq-BBgBifWu-XVeZLEfUzqXVPJJGBniEk8AuzPeEv4YjIVRWUUmSZNbM7eiAqvCTU4IVRIDURzvThFRRljj3ksPDPrLjAgO4zDCvEA6FqwRfhU_rTzchhIWGZXYVytsWB0lpV1yYrVv'
    },
    // 7122 EXCL - Warby Parker* - Sensitive IO Req- Proof Req - Returns
    fub: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FL78QK3/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_77NRYcmE2x',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1cSr2qvAB9KS3kf3N7HH4Rf-HZs5itxtYnH-eAwWXhevEnMAuzPeEhDLvVeXdW28JagVJ1y6lQBKs7xbsVAzGTi8RjAn8_7bzkWEsfB5oJC6GnQEISCEydfwq6zqkADCY6fqaJednTx5ROiMsI8d5pOBNjJDEuo68GHdqnucVabGukLIQ2s3lybF25gxX2zocS3m2kgl'
    },
    // 7122 EXCL - Warby Parker* - Sensitive IO Req- Proof Req - Returns YAHOO
    fus: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FL78QK3/?__efq=_0xfj3Ez0MXUfdnyXcRxbk9qx2i2tpYNDmUbdoh4v0swlIc8JkhCXRh_qWwVaOQ76brKydVglYfLWFLj5btitQ',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1QJRt5n-D4G56dZ99E2y8bcfSGDOZ5LMyyduyTRb8kKjEnMAE7PmYvWtBAufSDdOJDE6fzWCWo8HeDSrlysKWYM0QFzH4-FjT8IKzO9BmSfimt5EhpL09OgWObTZQpFJbCr3TCfO-yTSz5guBT5QZYiFVEyPXWBtOaASUVjiUqz2ooib-4ySDbVt7VxaI4R7BpDnfR7G'
    },
    // 8849 EXCL - Rate.com - HELOC - Ask for Cap
    mak: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JMTJFKL/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA0PCwyw9FXbP',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1S8BK2copSwBViAw93JnLRBc9-gUCDmVBNYa3DX4cWppEnEAuzPeEtvRSWOK61169KeRaLNQGkZLiWZ9eWkdTREu3N7VtB32MAjkOb_6rFvQoWQhcQcsYU9DK-0YhNX-9DdHI_Yzu-e61_-L7zOvNmj8WNngniMeNY5aq6GH4SwJ4PcqWwvmqXtd3YmDhAF0COI9mA'
    },
    // 8322 Brinks Free Doorbell + Free Install - M-F Drops Only - Ask for Cap
    jnc: {
      r: 'https://www.zopistreo.com/BD7N3BM8/HPPNTPM/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_koz1d0YCSn',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WObKX6Y1RyyFT4v_Ukj3ejcZuOY-lUshcgpTRM2gnA2Em0AuzPeEvBqbKVk1_nszw0xWH4onJE05iDhuQ0jX_Xfcvksy-AidIGFBL0anIJV1V_KtE0_Nd2QRE2BR7m4ORtrcqcjBe0eLo8DwLn2yn9mLEdn3RiGRVDXMQWDkFgnzsYHqcg0zmjZ7Pd2NFv1'
    },
    // 7413 Timeshare Exit Quiz - Proof Req - Ask for Cap
    kap: {
      r: 'https://www.zopistreo.com/BD7N3BM8/G4MCSPQ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_bmsG4lryCB',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WXu2_NpBlH_eQ641D96t9utvCDGPC51m5kxpmELaz1OEnkAuzPeEl3L7rmzoeUv360x4i_LvnWZ0zjRLvMcvqzkpBVroX4AgIYr9ETym40XtSYIKxYY_47c7RAaQzHWw_GhNnQBd0g7v67xU1VV1d3A9vJI49R4WkHjGaEx8tEyv-fVFUIMXLKlgQ7CNFzQUBa8Jzu6vT1SlxpY'
    },
    // 8951 EXCL - Credit Card - 0% Interest - Email/Newsletter -ET Only Ask for Cap ~
    cre: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JSX6JMJ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA6gz6zg_ITgC',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1e9mymO-nj6MLJ_7emWuWuFisDZ5l3yZUvwrEXFVGFS2EnEAuzPeEuVcmGgT4SorjcJkk9tlA_yGCCy5C4qKXW116JcyidYCC7RVAF0fI5DAo3OHAyPRJJH8rQYC5GTFwBYhDTOT6Hk80v6THVT0LK4BsUSG6UBnYQ28sPc-IYJWPY1xXve8jhk-q6FL9lcrPW2OpQ'
    },
    // 5990 CarShield Auto Warranty - Mon - Sat Drops Only - Ask for Cap
    cra: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CL38PFR/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAwlVAWK-NK0E',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1eMIvVANk_cc_ups7-YUIPTog9Telj3OV833OSSlCJnFEnYAuzPeEoBGwgPM2tOJ3oyWXAWZvr9RPjaBYuH3uLDPn6Ey9kCzaSqgzw38ZUPXDBSRNSC7D-GDKzY9SAFhDO6W3-4rQn3Go0bATjUhXKrLZQ10ySexSfmYMv6R4g6QXPbbk9LgS2xAe6w2JV7nYk192MIpHCfs'
    },
    // 8511 Optima Tax Debt Relief - Proof Req - Ask for Cap
    deb: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J345SSD/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA47ZPGZNLnBs',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1QJMV1zfl3Y6T2xdrkzGKHSIlj_lSDwZQ2BIk7ot3RdnEokBALsz3hIE5NoaBKsaCdxAW-ErJJQ4bl64IhVhRKhWIf6yR0QGqA2dPmKr1Z2cqtQHoX1BIZ0KGaQL7833V_g3VGg29tvEsLDddJeCfhWKQw3HhjdJqXPx6-9roPeD8-AHzbklj78YbD2Lox0q8H3dmVKSXXtQNEOU9MY3kH0mKv_sVexBF51iQaw'
    },
    // 8588 
    inz: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/J6X3TH5/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA2N-6qrCDqOM',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1faMx14EKxOjfqHdZeiDIYe66k6FvI0fIpiyA25ogH6rEm0AuzPeEhDVCiTzEIl-ymGHzqLOL0xltzCplD6tJtbPmKC7bpB2yX_buYfwQQmRvjxTuPIptkGG30XZtwiHA3ra5mH885jctIIB0gfJsx1Nk9ygGeK3cTqSb2M9-7CEzLHNr_dKKc6dspE-A5oo'
    },
    // 8058 Orangetheory Fitness
    ora: {
      r: 'https://www.zopistreo.com/BD7N3BM8/H8M3MFC/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAy121SvXrh_0',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1a2YSuxiPLZnSSPetIfuAnRbZk8XU13VPScy-WsQKOdYEm0AuzPeErzDsqCuBGPgP8GEPNZspehLILfV53VGl5bPNsT4Loyikr4k9F88O2FW6LU2Vcteb6V4wkHycqF0pxJJ_41KQoYXjVtCUodbr3qzamBSGP9dwXzZClkQCsUCIZkdXIxliNPXc_IQsUqC'
    },
    // 6019 AmericanHomeWarranty.net - Ask for Cap
    hom: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CMHJBRD/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAybPRQPLID5t',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Yu4G5P40A3HL1aP2V3SM_2XlyiQxbAvOszFylffwBcPEk8AuzPeEjryAXWK8cHvvY-6f3vaAm50KZWmmANBaMRqr4ty4Vglp5hxnx4MwK2jEfVNAOma3tMiipVLe-7N2_zPMcNBTnjYISSRC-gKPvM0'
    },
    // 8662 Energy Bill Program
    ene: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JBKT7Z3/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAx2hKioZMLNS',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WUDXrFVkeRSUYtSnOAJzy9GS78ECZ9z1Ui5p76CwtiDElcAuzPeEqD8bhIcsC3q_EI1hWyAfC9rl2MRBwydAX3zmmVii1Xk6GKDhjAx3qT4zaWWVbBppegRPt8zPEY6CtWE1EjTRSGXW6THtMDeTXTasXlQbY4iUm4'
    },
    // 4581 Vivint Free Install PLUS $50 Visa Gift Card - Mon-Fri Drops Only
    viv: {
      r: 'https://www.zopistreo.com/BD7N3BM8/946KZGB/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA-IAj0rJZ2jP',
      p: 'https://www.zopistreo.com/BD7N3BM8/946KZGB/?__efq=9Z-qg8FjAsoVOs59p8FUVe1C9iba15cxYrCx2b6FWAhH2FEEsn2XDWwuOcIdEiUkcH0R4m9cK-w',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1d-A1j1y3Gl6G6n9ixxuYACXHEUJ0IhB86xsGcDKfmiJEm0AuzPeEss-9mXj3f1Q9fjgFQG8ggReHcDpFArwGrHaJi6f4jjd9ma7m9zEz7nZGFBJGazZCWnG_2OjSasO5p7rYGr5BuIH6x9u4CLQir4pPqmj5K0fldpG5WMtQpsqL0krMO3SA7GFybm0rwXv'
    },
    // 6661 Ethos Term Life Ins - Proof Req - Ask for Cap
    eth: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/DRC3H96/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1Dm8eB95fbj',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1UmJ9b9gbYWbEBPXZc_otRMzKzgDhUs3lhGOoDkjqsE8EnEAY2gYIvt7IWVVOH4HvIdiucxe0aJjVghEzE5WIz7gMPwaJAGiDk2Yxhx1XhGEfOr2RiV-BlcIoS6AULRwF9xAhUPqpqR_tZF_NuBePJnyJKmG8ER0wnNHoJisBTgM07opL0CP2482IaUi8sUIg9eNHw'
    },
    // lovely
    qaz: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/DRC3H96/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1Dm8eB95fbj',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1UmJ9b9gbYWbEBPXZc_otRMzKzgDhUs3lhGOoDkjqsE8EnEAY2gYIvt7IWVVOH4HvIdiucxe0aJjVghEzE5WIz7gMPwaJAGiDk2Yxhx1XhGEfOr2RiV-BlcIoS6AULRwF9xAhUPqpqR_tZF_NuBePJnyJKmG8ER0wnNHoJisBTgM07opL0CP2482IaUi8sUIg9eNHw'
    },
    // 8496 EXCL - Total Debt Relief - Sensitive IO Req - Ask for Cap - PRIVATE
    lov: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J2CBKR9/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA2C1xn_4Htp6',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1ZKP2DY-9N_sJ5owgnwQ23xh9uZ_ngXxKD_pcLfqGCA7EnIAuzPeEjujjsTSSpz2UNVb4cI5wsnZfFI7sG656egngHpft_jW-B5BUVOJvJjl_CmfmBThYpRMgNH9uepLkIXIhPIckQWFbQTozbS7r_EhW-iDA7rxFcAN4IMAx4Iht-2g1iJDbZ6zYo2zyIpy7-0opx0'
    },
    // 8476 Lull's Pillow Party Sale - 50% off Lull Mattresses + PILLOWS!
    lul: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J1CJX35/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA9NRe3pjrnDu',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1VVN-fpzRl1rJ_zbuJ1g4NqiaRBb3vhPgw0DaHKQ_BHXEnMAuzPeErs6tKd9Pvqq-IlmbRSDUFbL7Pk0JOEGXiHXQJ-yvJb3gINZH8qqWSd5Ji0skOBsNUGu3mFkbT-hLYMfAz-dWzXAoHtq4xl8ghM1_AWNgRtDWHnG2A5GNL6nv0-Beqk82prmOCHBE7Gf53GDhluD'
    },
    // 8614 
    ame: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J876SLX/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAynyVmWt7_1j',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Zir8sbu7GjV6rzDGpcgKjKdjnSKqaJ9yo4Dbo9Sfv7zEnUAuzPeEli9EYHGguGYKar7Mu_fqeBZB5tXPCMfu1jQ5PkDjjtU39rcMKCnfoASACfIj7Yt6TzVuXdQne8DEFILYPi9amhohtyftSc9dJ9kJ4kjxng_r30dOv12agBpHSSqY5Toa-zVjDVR6DwmzS2XNiaRhhI'
    },
    // 9083 AARP - ET Only
    arp: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K3GH5RN/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA8U3hgElAau1',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Tp6ZWyYbhwd5UkVo4IRUn4Y1aBz6aXoMwWjoBU1ar22EnIAuzPeEqsu0oAkBTfLjpN8GK7KlnSC2XZudqInlmcfL2BDSGR4orre8PJxyd2gb6beZqjMMHKhaSA-mVcpOo4sidppvNOo4tCT4_0fdIzRu6HVyiLubvbskXeAMI6LbLLpLpAEmzypfB5o5bTiFAK-LUs'
    },
    // 8969 Native Hydrate Electrolyte Drink Mix - Proof Req
    nat: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JTS6FWG/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA69TxylboH6C',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1QhUKqiZ4UybuJFOgnL-iew9_SJudO-0MNWXNTDL8QYTEmQAuzPeEnwkJKI29oYRb8N1i7uQKxdAXctdc62vVWcKMQgye9-kwEXJ_G4XwQsu7-PQ6XAVsn68FmTrePwpbYvmgxw7sy_EJj6XvQNXlhTHndJwcy7mGJV3DuZhhPf-prlHJ_PZ'
    },
    // 9033 - Freedom Debt Relief
    det: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K11311B/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAyeL8rPYP_lf',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1eW9FpoGiCwvoqSiOFWPnr8FAF7rRHEAMp6oR1rDSnsVEnAAuzPeEvhU0X50hbCs_KTh3LGVHwtXmv4lkDm0CD9WaiYVCof2CCE3x7mlTM2pjfo5vy4DufgvYv8839BFQkQN5Lt6YmBDhCpS_37fWLrgabDa0nJ1sQ228ZAx9SyZYr3VR7TAL73Q85jefR98Gc42'
    },
    // 8673 - EXCL - CPC - Auto Insurance Connect - Ask for Cap - $2.550 daniel+162012@aguara.com.ar
    aic: {
      r: 'https://www.zalkkweet.com/BCN956MP/JC54Z2Q/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1ZFYYfP40K7',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1asy8XR38Vh8e1o4SNoG2ArNxbLvRiAUhIR8DQ97dkYeEncA1NLZacJte9f29L7KMIfwZ7ZZpZLlG9_S7grEVRjg8ilbMFX5CqXRDNmQhVLOEZ2OxmpxZyxBR5kOt-1FgbwILX6WmYkhVotgOKMqiyt6x7Y4q0CGbjYokIkGVKV-Yn1XPhp3jREer_1PAGsGF3V5spOLMNRY0w'
    },
    // 8724 - EXCL - CPC - Veteran Insurance Pros - $2.125 daniel+162012@aguara.com.ar
    viw: {
      r: 'https://www.zalkkweet.com/BCN956MP/JFMZ1KP/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3Jczmw4IeHa',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1fr1URYj1S5Bd8T8fFOHODBlDm5Z6rosqQt2zucDFOTuEncA1NLZaVNf7dOPSeKZBwn10pUB2Z5VrYdBfIzgV7pI-QLtOacDaA0ZIMyc5mlfpXyxSSe4xV11ChWvmF1bg8St3G0Er11ISfe3XksIRpxr56QanquY5NHN8XfCsE0mDY-lATfuuJKHK2pB0r-HR-GfJSZsh2nV8w'
    },
    // 8724 - EXCL - CPC - Veteran Insurance Pros - $2.125 daniel+162111@aguara.com.ar YAHOO
    vif: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/JFMZ1KP/?__efq=-d-M1kYRzmHEmlOqcSg4UOWmjXneBDLYamehe-9Jan1WPsMdGM-iyHHviNclm4vZKc7FaJXS1SeyV2SlS0YXlg',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1d5_JD63I1F6II7eJk48PsGuUNeu02Q-y-sPIvs1nIGLEncAE7PmYqpOt9aS9jKdsQFL3kj-93OE8cXVJDwO_biuq9dY1zfqn8b9I4eR8jVxfkAVca6bVZHqWM1FXgmsBpd8lxkeWm9VjXEkepTK1Vyf2D4ZGCOujKisuYr1qTDIy5My5NGEpEFmrnguAHoZWFc0sCk4vrl-iQ'
    },
    // 8586 BetterHelp Licensed Online Therapy - Proof Req - Ask for Cap $467.500
    lic: {
      r: 'https://www.zalkkweet.com/BDL9J672/J6SB41X/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA-tvkpuinZ_w',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1W7aL308_KxCNpqY7cfUIndJbD6JzN8JsoNIhC-CdtW_EnQAuzPeEnmd_rYyGaz4LvOu0KOuFrg-z2L65XZ-pm0jmhfrmbmhQiuF4uS7k4mCr5eM3UEBqmF6fwtae8ElzAle12XZHlhogD--jEMsC4n6LPIgwvxqz_ukzwMMScc2jrbzKUyeD88eoZW1xlDuSjHScr5C_Q'
    },
    // 9037 - EXCL - CPC - Auto Shield Now - Ask for Cap $2.125
    asp: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/K16LHXQ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAwHDMeLS5d2z',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1YypVZpP5GhvxpAu2S_LIdNRbHjUzV12sUpK80JTG4_qEnEAuzPeEo1uKRlNYVUkoMH9OtXgEVEULaxgnZctJJ-iY9cL27HivDSL-Z7ZGMgVEnz0IRkYQFFHUEVB6xwrcfHAGSzIoh1c6PdQCzj5mO_Bu12CSyuERTv01GoEfmEI--461hu5shmRgh_g6yYV-MH1Jw'
    },
    // 8622 - EXCL - CPC - 2024 Insure Quiz - Ask for Cap $2.550 daniel+162012@aguara.com.ar
    qui: {
      r: 'https://www.zalkkweet.com/BCN956MP/J8L9WHR/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA9BtEiqwZxnx',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1QaifdUc-FA2sIRCRiS5mKybz4_fI-Z2Ii0xcHKodfAxEncA1NLZaVdVLS0sc1dupON_awL1eqQmn9kIcdmoWlQ6-LrNJgGmAXAaBG32zKIIpv8gun6-sgIl2LJSdQLo0akd5bQJu9RLI7WKpb0Vr8od3kGxSDtDTsxAGiap0ZAKW5rdomixzLJf4XYG5QO2RC_sT4htT5xOhA'
    },
    // 8718 - CPV - Fidelity Life Insurance - M-F Drops Only $3.400
    fid: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JFCLP63/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA5p1m-Z8UP2m',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1WcOJq6UAQfI4kTvFAi9TypR8hyQ-4i8o1P6fjR6uvRXEnEAuzPeEpxYkgcRe9zNf1ZervQ8uSQoTYOOZQApbUKHq-cUTrGTq6bT_yAC3ej86M4HiNalPcF2R--MC9_tZtYh97oKuo1X6fN9v3jh9eP6vQkYXzlJt5FceLqeaML1sbHXoe0YPs-B_ORFnJGzoLvcsA'
    },
    // 8617 CPC - West Shore Bathroom Remodeling - Proof Req - Ask for Cap $1.700
    bha: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/J8CCGSQ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA4UThr5PFaIy',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1dlKaEm2jd4G65xhnZylKblPH_LAKlOLLMOS7fZ9T1AHEnMAuzPeEsbTJKve-udVF9PFkLaU0CIif_GH2UG4C_cLw5aEefThw0-tuNJBh1y6w3zujKXFK_y9I9bPuw_Ht_uidI_NiQ6WK3H7OuyHLmSU9YiK_3JNNVnAZy3MsXI5XzSDkFb_wadPxlh9GEgghkaL9mq_'
    },
    // 8485 CPC - Life Loans - Ask for Cap $1.700 daniel+162012@aguara.com.ar
    los: {
      r: 'https://www.zalkkweet.com/BCN956MP/J1S2TNL/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA4ZrpnOv9RPn',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1Zq0ZLXg0js3qBj8RPDrIDILOUzGy6Jyu_eaiumqinjHEnEA1NLZaTb1kLrftJ-3-v5uVifTz8RkAUUyrPkC-fPNGeBLLR3xl1IU1dBsodvJfvRsaIJkuZ1sHiXBAN8wOnmGNYabQ_pdEfBW55vqakGCJ3ftYLRC_wUTGRWt48wOfnHEkL8bQToC6WA_HGfcnh5FjA'
    },
    // 8621 CPC - American Auto Insured - Ask for Cap $2.550 daniel+162585@aguara.com.ar
    amc: {
      r: 'https://www.zalkkweet.com/BDL9J672/J8JX1R6/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA7NW2DdrNaA0',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1aVrTOKIKwueD07W8vxEG2nAQqndKVm30IpqKeUngJ0REncA1NLZaa7gHtGvEwisAyX7zhoLXLCzWo7TOxgbXltZJ1y60MI8bocJb6gtKjkbPK1QVRUDBlGbx8yGya9R-XQcce25UYI4ZrQQ7gOhGYxzywMhiB6oUO0x3aSLzf4vT9lvgnHDvjrV6yOF6HDadOvCfDI-G5_RhQ'
    },
    // 8789 CPC - Progressive Loans - Ask for Cap $1.275 daniel+162111@aguara.com.ar
    loa: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/JJW7FF6/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAwc6NXV0wmRR',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1VwWkjD5vX0HU2A_meenZbpj-aNwJa-VqOOf5bCz11tfEnEAE7PmYv4hOWqjCAsefyqFsRHICKdIDWW1zVeZxtN2Ww3p2CXrdiJJvR-UGxjdm_iIOwC6DIGZfOPKr5npL9vG8nEt0lQUDWKBRqJMf01RJqAso1JdKmp4J960G256DzsjO7guf2zK2YHSntKxc1PncA'
    },
    // 8791 CPC - American Loans - Ask for Cap $1.700 daniel+162111@aguara.com.ar
    nex: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/JK116WD/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAzC860bwNf4T',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1aIydbMW_H0AQODb04V4XYDPsmjM5ZX0xhxqb5GdDI1AEnEAS6SNtMFRE8P5jlG5__iJc0_3-w0g6k112Knq_cS-PODNpoQzkVM2RjueaBK2592TP3j8MuK1xOM4GyM8xKLi8kIT3iTG9koC7qUUJqWKpP4u4IZe6k4rmYHoRCmMHa8CH3WyfZfz9klz8ZH_y3tKMg'
    },
    // 8674 CPC - Car Insurance Survey - Ask for Cap $2.550 
    inp: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JC6HSRC/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_g0fGKGrUum',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1aUr5yMgP-ec9MM0xUETAy0iglIAxn52XBXFrW-oqDn0EncAuzPeEpa_rHT46Q-LX-H5gOBnMYA4Co7jyGjY3r_Bn44bQ5VZ1b03hQ1M1-gks9S4ay4_2LrD0s4exLAkNj10lQMhAD-zIgKYOYEGRXpEdGeyVxD8mzHj3z5CRW037YOUj7OaU33QPidfTMtd5UMgC4gC8ReORw'
    },
    // 7667 National Debt Relief CPM - Proof Req daniel+162351@aguara.com.ar
    nmk: {
      r: 'https://www.zopistreo.com/BD7N3BM8/GK847MZ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAz4Y8r5AgnaB',
      p: 'https://www.zopistreo.com/BD7N3BM8/GK847MZ/?__efq=EHofFgjJ9fhvrKq1pOxVmZlixbkYJUQwhwev-h_gDV9uH5d7K4c3-O2Utii_B8VcKMz0vFR0XSQ',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1fP7E0Qk_zQFqfBtDXumVw5gUnYBP6hmx4rY6VNaGcn7EnEA1NLZaWMx9Fe7yyKIpxnubkrqw5MWDCXqHJnaE8RbdzZfoLxlKUg-QYEhT51zFiMDCM7K7NhYTy4-Ows6yTyb5DT70h1Wtrsj5N20Z6he0nUkn6kEHmNJpQVljEsaRVx4IgH_IEbbNfsmPrBRKA7UCA'
    },
    // 9035 CPC - Quick Auto Coverage - Ask for cap $2.550  daniel+162012@aguara.com.ar
    qik: {
      r: 'https://www.zalkkweet.com/BCN956MP/K13SQGJ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA6qULiuhL-AE',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1d0ScNdSZ5duz9-kRRHxpqzY6DlRsRa-X4pRwXvjSIvAEnUA1NLZaWgn4eHHFh-ZaC36OVv5rrjxU259y9wHILu6CI6e80_6_yKnMe0X98awujraGF2PDOBRBtJoG19FKXZ-cYbTn1-avYbE4wd5znEVoKigH7Nt9nX-q91JkjQr8tF1pNgJTeeiZF7s-rXnjc1ym6TtWbg'
    },
    // 8970 CPC - 2025 Personal Loans - Ask for Cap $1.275 
    noa: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JTTKBM3/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAzT2O3b4uNE1',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1ccHs-1acZcFBf4o6tELjj1dE7kOz1xs2rg5nuUGLVaCEnEAuzPeEkD0-UVKUxCdeMFtQBusboq-S8gMwN__qGqMMvTytbK7AEBN2BXwCQt8swmpVPHI0iJane__gLl1jGUM176xdBSxeCkRuw-DzCo0k8pKpjkpawjdpmwxvCWJwl8InFksKddXF0JFkJUXN59QFQ'
    },
    // 8541 Christian Matches CPC - Proof Req - Ask for Cap $1.063 
    mat: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/J4KSBWL/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1Wy5fNR41uF',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1Uy6a49mn_BAOs2mE274Eo4z9jAHA9jgeID4VYM8tVGkElQAuzPeEs5wzV0exuBVUIcN1GcHQsMym1DJt8XbMgMd4q_QFz55oHPDUgXfmbBWu1jRNlpIfLkNnrICHtGwR7Uixe0anAAy4z-kDHWgGuV0F_6dev4'
    },
    // 9038 CPC - Secure Home Policy $1.275 daniel+162111@aguara.com.ar
    sec: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/K181DNC/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1lCXE-vhnin',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1QVaZPE3bVpnKygUSWxIG7pBmJmm4QiGqfIBRJ4mDzglEnMAuzPeEjqNwFMNDBjZYwX-2RAHDL-NAyGhYU1YWOYXmBkmjr5XwaDRRGUcLysO4gLPz1qUJeK_hDvscI4GV4FVBeqssNrBJmFr06-c-3Tm3eGnWvVlwkMuvoSBvr_58Guwq2mo2IK1gFb_X3OI0wyD-paj'
    },
    // 9039 CPC - Myhomecovered - Ask for Cap $2.125 daniel+162111@aguara.com.ar
    myh: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/K19D9DZ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA4WnBOWOo1iQ',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1VgxmdLwzRcQCxuD0ak2Q00fjgYdMsZlr2qdHnf2DhFHEnMAuzPeEuMYn7SPBq6iiGxXhvasZ4854nI8rTa6xAM-e4QTZJlQ6yzbVeahJc95v2hiFhCxMQnqFnr3X6yKIrukF4Tzs8SuWce2i2rZNrFdcBKnlahxjDMIxOY7nH6jkEPvNj16uiAyK1mWVgK28WfA2ntK'
    },
    // 8699 CPC - Best Auto Premiums - Ask for Cap $1.060 daniel+162012@aguara.com.ar
    bap: {
      r: 'https://www.zalkkweet.com/BCN956MP/JDF7X6J/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA8KJZeYPO5mz',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1Wd_jRSU7nbZsa_t4K5yFY-Lpf6NfbLU5zlt9NpTLcUjEncA1NLZaV9RMMfKKO4xqerGeq9yr2CNsR1I-rW6X0T7uV9gBwpcIqSxm9HHrNY9CMR7NyaEDZrqQjFkDuOLEc0RlXEe9bV7eXvsF9KtSmfL1GffwRAS6vaCQPYrgL_kxQscgyJEEtjpTQhOqk81y4dEIvkO0n4i2w'
    },
    // 8700 CPC - Auto Coverage Savings - Ask for Cap $4.060 daniel+162012@aguara.com.ar
    acs: {
      r: 'https://www.zalkkweet.com/BCN956MP/JDGLRX5/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_T31aM5-ys4',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1QDWTGKcZfeicNd6bK8UXmVF1iH37QEsHDzypfY0lrNEEncA1NLZadJKLNGjFOavUP0gHmKb9q5zX3Xt4X7Zmx3UjwaavYaiRopCgxHtK0EBisos7W7Q8hOoLWr8Ken-tRvofnN9wc-wIeBA3j4ghtfk68fFHmWQ6hAu9QtdjuW85OWnAkNlKdu7ebEd_imyeheyolYiYcdq3A'
    },
    // 8972 CPC - National-Loans Personal Loan - Ask for Cap $1.275
    dos: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JTZC449/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA9ROlQRsGceM',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1SIaOWPHWKPBrbADYi4LaUaX9c_eP8gUbevuLcr8LzhmEnEAuzPeEk-WUsxfRgrRop0-iqwYOjMjpi__VpkrKUI_y0jz-b4YAafoTxr5Y-cDhQw9iEmuMSbtiS-EeVkmHZn7u0Q4GF9ixgbCxaijzVineDfE8-kYBCJTOx1WQPaCvmgDZcwdfe6muaZyB02m3XPPVA'
    },
    // 8727 CPC - Funding For Any Credit - Ask for Cap $1.700 daniel+162585@aguara.com.ar
    ffa: {
      r: 'https://www.zalkkweet.com/BDL9J672/JFS4MRJ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3xiKAVs1u8l',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1avNWvFzzoNIUfEHrJpDmYFplehU4R4J1scfi93UKHqwEnEAuzPeEniOiVC-bWSbJR6M-kce15x776r0rHdzMOSIxSxzEiZ59Nr5turEGHuq8xdyyqcNchXhY2aixIQWjGnekzHXObIBhYvmAOVNdlJoOkCT4nFAyiz96OaE8PnR6axkhtdMkGmG4BcQI6xBmK-dJA'
    },
    // 8726 CPC - One Stop Loan Spot - Ask for Cap $1.700 daniel+162585@aguara.com.ar
    osl: {
      r: 'https://www.zalkkweet.com/BDL9J672/JFQPR2X/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA19DtLCFQVX0',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1VC3w4kiHhT3cYphJrzUbl6LZkk6OdPfu1nDedzQfhBWEncAuzPeEqteC4y3EHvT_450ty-sg14eD_UZUseu_e9vhd4VVMFULA7WxrW08Y4g3dsqdwcW9t6wkLVk0e63YafYjuC0sAFY4BjKHClEASH1Ewdj-E5h7kdJ7X4AT0phy5eb5sIqLCvQ35S4gWXZHoi8N4w3uEtFdg'
    },
    // 9017 CPC - Healthcare.com Affordable Care Act - Mon-Wed Drops Only - Ask for Cap $0.850
    jel: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JZ6ST7L/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866NTsoJlnm1Rfygw2UZ-wt26xmQmK_wcAO',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1UrbzOcBVsp5kNQMKSqbV6JvMh3552Y9UMQX7rE-u1BeEnMAuzPeEr-7OhEtHYik0yXckt_hPteewEoWuUxmdwjKIXCEhfKIXvmLpe230Tt5-irab3XuhtI-S-xUAvTQ1Np-R0Jw5DoF0__Phztt6lWZg4qlMkR6EthHD8ZL8JATmAt4IFyod6H3QhNtvxarIZ1dvUKK'
    },
    // 9026 CPC - Credit Repair - Lexington Law - M - F Drops Only - Proof Req - Ask for Cap $0.800
    xed: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JZMBRT3/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA8EugCy8_r1w',
      p: 'https://www.zalkkweet.com/BD7N3BM8/JZMBRT3/?__efq=-VHt_PJXYKLuHwwPwVuU8v_GIk9PVT5hD_aUVbZS3V1F-noyvapukkPLFbQWrowX7hJ5tvZun9I',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1WsN974-k5HL_Ie8yst3axvCQTGzYjKRu9bJvC3YlFCOEnQAuzPeEj7N91--pMRj999JwS4gKGGeFBXgD0LyidPJvRKe6Ly-PEkZwMOBjttFkRIcehEP4hVSQgoVDRd9Kt2mdRx_5uEcKgck_GneFBXGgyvaSt_lkTzVo8XN9mPav5Helspz8Ka9Zr3KWebKFOpIwj_4rA'
    },
    // 9121 Warby Parker CPC - Proof Req - Ask for Cap $1.530
    war: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/K5C8PQQ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA9z5nP64eOu8',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1SqzIFaEF1W2e2PlyC7bKOCPcQghQtoGEu-IuWCpxFNPEnQAuzPeEiX_xScWUM1KNgrUIj9_2Embdsy92AvB9UxhE4z65cUjArKZ3AKYxB5Tz1Rt5KjBHIBymVTUuGflisK88SUVitktsYR5Eibbeuyj804bx68tFaoxGtqYApdiyQd2LV78VHuIvc2VpHvgx0iymrT0yA'
    },
    // 9036 CPC - Drive Safe Insure - Ask for cap $2.550 daniel+162012@aguara.com.ar
    sdf: {
      r: 'https://www.zalkkweet.com/BCN956MP/K157M75/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAwWMm0KLrwrN',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1TxbW_79-frqP_QzyRA8cojDgBWa7nrvikhlh10_TjUqEnUA1NLZaf6Jxfcz1zfY6YQasvE0pZY1dql1Vgz-h8Vtdvd73ZcGAcrNrQxjxQE8Gv3FVKFgcdu_DD4d9xjBgc2oudO_qfeUHsSf3TlqQ3RtJ2furhZefYxi8WId0wgLlNvetwiZFyNLLV3T5Qg0lvkGt5ze6mo'
    },
    // 8675 CPC - Veteran Insurance Discounts - Auto - Ask for Cap $2.125 daniel+162012@aguara.com.ar
    vid: {
      r: 'https://www.zalkkweet.com/BCN956MP/JC7WPHZ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA0v3hH56Qr4o',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1b5Tit4p3IEPoMwYRZqnkqHuM1K-Cmbj7i3SartGBccXEncA1NLZaQLPhlPO1Qcq63KROzVilownEPu6oIvhigyLVCcOMO1NDngEtp_A8UnA9rDwZAc_HEXCdohJOuozbPQk4iPM1Sb4uSgH-Elw4EVpx4Ifs27gMPUzPE_ftJOPZ3v29_dfVo6A9MLlEUcVKEKUXt7WdNOjuw'
    },
    // 9037 CPC - Auto Shield Now - Ask for Cap $2.125 daniel+162012@aguara.com.ar
    asn: {
      r: 'https://www.zalkkweet.com/BCN956MP/K16LHXQ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAwHDMeLS5d2z',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1bQnoFAlcE_dk7_aNLp_MUPBy_z6sMphILx4yGUe4cEKEnEA1NLZafSVw00EO5o-DtRUEx0nhTiCY8JesumhkfoREdGMlqifwGPELMeU-SB4tiqZ0mRBEpUgWmfAXSC20iXvQtWbqgmoJVALXErvckAA8hJceJpoH5srWHISrHD_nnbUY3peLzX0vllsVs6Y8UtNPA'
    },
    // 9039 CPC - Myhomecovered - Ask for Cap $2.125 daniel+162111@aguara.com.ar
    mym: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/K19D9DZ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA4WnBOWOo1iQ',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1bZd6-UDENV3nZL_JMg4sK3Np7Ld_4WSnZEeDk1-WFN_EnMAuzPeEkLqpIZSnztDk-Srz955tYuBnLBZ8v9h_fDjjHktknUvv0F5B2d1IFZzHYs4vVP3rEQKhWmiNXUhHTMgK7qwn5dok6zIb19_1HIfryOlULZGgJMuSWnCcX_YvbffQ5X2FNUqvFNFM20zVS99OhK4'
    },
    // 8725 CPC Veteran Insure Now $2.125 daniel+162012@aguara.com.ar
    ivw: {
      r: 'https://www.zalkkweet.com/BCN956MP/JFPBWBB/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA-72UcObBgEk',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1Z1Z-5z60lc_0OQuBxBlUUWyrrjN4E5UN_22z2sY1RmWEncA1NLZaYL0MVXypLEQMRU7OGR0qWHzl_uor6dm0cg42lVC0DXTYsBIntHaw0jDlTUqiyJ0b5x2mS_34etceorVu4NrBMcbGziznuQarN0TSB9fVJcNLz33xOdDnWhjqMA38U2aoTNcwI2xBcbGKplQOLa2ANW_3Q'
    },
    // 9171  StopIRSDebt CPV - Mon - Fri Drops Only - Ask for Cap $1.913 
    sid: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/K7SNWK4/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA9BYroOt-f8s',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1UydckJ3x-bm2YGih2kpukwVqkd9BdWzvQh5WlrzNd6GEpYBALsz3hLNFjb7msg2BYiVF3QunLA8XNezy9bIGl99NgyLuStcMC_KNiOMf06Wegwt8LGRhySEcIKrEemmlEICMF1lyEFaASs3KXRhOinzuisWMwzjWechWlcKcLgg0tvW0sxts4keGwgZr831tSHho-wy6DmNenky3AqDaaoNpp6RvRZGVWG-K6juvY4XWWn2fvcIBxbG'
    },
    // 8886  Liz Buys Houses - Ask for Cap $38.250 
    buz: {
      r: 'https://www.zalkkweet.com/BD7N3BM8/JPNX4S3/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAzwYIxux0Lml',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1fK0_mgHG8S6EPp16_lg2Ax0EKNORz5Af46wKJ1VIzFDEnQAuzPeEg4vmL52Wp3JCvMlq0JMj0ubt8hCiGrcrW6-2kXil6_4sQRFKyRSCs8YGARHmS6NTPpk53v8QE9GxzMGxDSChIGvmj2AznnEmQZPSDrbu4mkOOIVN98Wetil0Mlwv8OcZSHB9mfKfHrzxB4ZgvJ3Vg'
    },
    // 4996  Annuities - M-F drops only - Ask for cap $127.500 
    ann: {
      r: 'https://www.zopistreo.com/BD7N3BM8/9SQWKW9/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA4P1guvXRPeH',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Whbxyt_tFnoNxqeBOn16UOWwoh1b10yHZykkdlTkak0EmcAuzPeEtg34U_y3y5ZIybYhB9cFxP1tbzbuTft_YACSmAiuoqoCIQZyNY0xPLhyM3WNYpQOpdEgrO4I419f531qSjq-qJ1jrsuOQicPLJYBpI-wMps2l40yWlJiaW3h7Oxhdv70vqq'
    },
    // 7170  My Happy Feet $20.400 
    fet: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FNKX5W7/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3twiyDMqR4f',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1dgdz5KRvzi43NtpRcAU_i-tYkzlEweuaSYlaSFjR9CJEnEAuzPeEqm9A1ab1P6g1noh2ZyScwMbywCPE2l0PGnUX7yRX5gl0pCLfYBdKxGuGQIj5k-JvEWQWJwDO4dVduxKD-HXxesnWpUf2oT1-etJl4AFceEn2IXfVpfpW0iiBPbwQll3vozab3vi9TLApacgHQ'
    },
    // 7192  Dodow Feet $35.700 
    dod: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FPNGL3K/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAxzdNm5GisCw',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1b_4F2h8AnLHGBMxHVb4MDw3k26UjSzPOPTUwCb9r9c7EnEAuzPeEg2_kf-EtyOdrMh-tja8ChBEHZX8Us5WSKFKcbynSVX9TokSvOtBfQZO8DY2coBcsk5E7CyD9nIqnjLHIdlBO7J73WGOvYz6psT8r5R5R_Ec6APA_KYUEmBmfYZAxLLD2-rGI-iIxb3B5vasnw'
    },
    // 7134  Peeps $18.700 
    pep: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FLRXCDC/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA8yeCopQ2J2I',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1QtDWbYx075uiShp9yYlQEbmkTYDT5BVc_TJNud3B5k7EnEAuzPeEly541i_v3ekCRP6zjFqGHUOO1etmgMo4Ofa1RBSOyKKkEejjujcnppFMGS98k1nJsGnkMX1VwU3ug2ylfu6xaFIHP25wukp4i0rzrOaxBV5pY5zkA-i4yCfd5H49np7Mu4gI01nvQcqCemKNQ'
    },
    // 7108  iMemories - Ask for Cap $63.750 
    ime: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FKHSD8K/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA9FIsZ-KRHzb',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1fdld2evy0k2zHNYAtsD5V_Rox8Uub54vRubQhRetFLbEnEAuzPeEtc-SBRHVCwfVUuiZkzBtvVdggLOv9y2VVQcZEAAdgsoMDiCwhbpZnRZXOPU5YotRNWC_xlqIT7fEFDBw0qKgqAAKNiZgci2p9md3HJuRczP2ZS8FrRnC7GPkmBVaclzuZuIH_1PLhi9oqU8-g'
    },
    // 4344  House Project Pro Powered by Angi - ET Only $3.400 
    hms: {
      r: 'https://www.zopistreo.com/BD7N3BM8/8NFGL2F/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA7FriRI6lvzn',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1VlbAZj-RjlgaTKfXc5h8giTQkTgY4w0yvEsAex-JzdjElYAuzPeEnyTrrpI_G2w9goXQsf2op5Nwo-6KilcdCwOCEw-fwrmX4Eeam7R0vUQvM6LfT9En7C7bMe8mrDLDe3djFcomxeDdsZNgN9HF9qAXd07PdVH3w'
    },
    // 6697  Dani
    lf: {
      r: 'https://www.zopistreo.com/BD7N3BM8/DT539R2/?__efq=b_UZSIRpS1tNB6eu7EUi2Ft_3XAERJBcKTqAiasZbG_vwF8oelW1dQ',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1VlbAZj-RjlgaTKfXc5h8giTQkTgY4w0yvEsAex-JzdjElYAuzPeEnyTrrpI_G2w9goXQsf2op5Nwo-6KilcdCwOCEw-fwrmX4Eeam7R0vUQvM6LfT9En7C7bMe8mrDLDe3djFcomxeDdsZNgN9HF9qAXd07PdVH3w'
    },
    // 9226  Liz Buys Houses - Zip Targeting - Ask for Cap $44.200
    buy: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KBK3H2H/?__efq=CaNag-E1snVXb2r39UTFOiKnsBf1OBEUm7Tt9SEQGmiUp1S7UY8KMQojJ7hpvEzgok4Ax6SLQ68',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1XW-BEPXaaKEUt6lqWG8kucH9RbSSq8tQHbME30zgMCWEnQAuzPeEg8Et4hyUi4ECgMAM_7nT8H4aNeMMBoFUiX5NDdr-B5g6bDzSsmG2TGTUFI0ZhsuHG1_ZhMoASkADMf8MoqJNaSsYBUmorBXF9eDoGVXC4XNdnLQRBYUsUvr0NWYXtZzP2QCGDnlEhuiX7NGsaweSQ'
    },
    // 9251  Stonegate Timeshare Exit - Lead Gen - Proof Req - Ask for Cap $68.000
    aty: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KCRRKFN/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_MjLdJrt3cK',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1YMjtpq2s_hKcwcDmmjcq6fCNkp5vcFK2UrlFyp8CT3NElsA1NLZad4yY9vUSWe28z7-7VDKW1pEouEG65XHMaqbTZ_HZJXLuS3ZV9-hRmlhGt3DQnDDotOOf-ngCCbTAO-K06LeJcPst5NcziaWdQEKHOTxsnj5uetrOk-9'
    },
    // 7546  JG Wentworth Debt Settlement - Proof Req - Ask for Cap $34.000
    jgw: {
      r: 'https://www.zopistreo.com/BD7N3BM8/GC83BLH/?__efq=b_UZSIRpS1tNB6eu7EUi2JHcYbMFp2jjG4g8T74TMlfW8suocUlDk3VJZkfe9dlh',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1ZcQ88nFyyJ8payTdn9UNbNaJcgHRhYMPpzgNm4huSutEnMA1NLZaYkkEg3BKwOQO-0UufS5AwtRrX1op0asU7C-dZwr91g3bncgBnntGYmalhJ5dNDVwI3-rX0IlCUuJYi9nNCQMLUbFZg0estfswWBfAZTPlPhtEiOkV_Q_XtXO5lR2OYCWaNI7kiu63SNiH1plEKc'
    },
    // 7413  Timeshare Exit Quiz - Proof Req - Ask for Cap $51.000 YAHOO
    dso: {
      r: 'https://www.zopistreo.com/BD7N3BM8/G4MCSPQ/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9qjMOYzdIJ11dpdBhdxGuyr',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1YaBwFe4llM_WBn02m5YsdJa6xP9E7xwn4jDy3MLOThMEnkA1NLZab6ZJ6OcFLCTfje-dCVYQY8for_m9E8pkOFhUs4J1WJQphmYw5RYeeTZZrdOONKQxhmCGE7z3_s1N3GDjl3IGxcAyFbL17ShnCD1KfVVg3fR45iuPpwxZbkLxj9W1rQGG8ZWP2hffiIMZFpnbDIGXEW0E91g'
    },
    // 6056  EXCL - Blissy Pillow Case $63.750 YAHOO
    bli: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CPBX21T/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9p-7LyvTFXHSgjI5vLQbPpe',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1RiogjdxgmBznq1DfhzGdsRkI5Zcz13rGzyCnlAMCnJGEkQA1NLZac2sOYV-0didsxpLstVexlQnIHuWLEiDENcmnCyPDMAumbmZrJZQXZQM14_hOF9FmkWEi7S0jIvO20ovc7IB7w'
    },
    // 5859  Saatva - Proof Req $510.000 YAHOO
    sat: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CCKC128/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9rqqSrleRhmMsFxYX23QF1H',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WglL-Ny0eeSCsz0CCGzDDT1BWXCsxRkn_tODvTC5IbXEnQA1NLZaeH3J-Dy2gYnOlaBoUnFrHmTAuVLNEJQLGBl5B3wmbab5kkom9MX5yfiIuG2xmd6wfbLXZh2nLWi-vJs24JaC9ysij1zNsnMxYsAiX4GGF6qS8CxxAyUIQpKZMlp01uH1zBP035tbI4KakGRxiiZFw'
    },
    // 9090  Saatva - Proof Req $255.000 YAHOO DANI
    jen: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K3S7BXX/?__efq=b_UZSIRpS1tNB6eu7EUi2Ft_3XAERJBcKTqAiasZbG85oNiZeeeRWw',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1cvfPaWobqsJrIXoW_zgG0oA3e6Ebys5QAu6Vu4jYcdFEo4BANTS2Wni7Xail-2AB0KDeZpx4UVSekwhJ7H8jyx-idxh7Ds2rTTUEjIaAFdmKVCkhXoilwe3mcPSjFxEIk0a1anZHkPYumuf34IJDuVY1owtkAIfIw3ySPxKaa6rCxPW-Rj4VFrMbWP9x7T8RFDd6SdF3ahuTuvdxSV21B02kLQafqez3cW84bfMLJeayw'
    },
    // 9091  Jacuzzi Bath Remodel* - Zip Targeted - CPL - Ask for Cap $127.500 
    jkl: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K3TL7NJ/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAz2gzi1X3vJz',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1UbHFWf6DYTER8n7szYC6zTHsLWmbqLUqeNQ05yBTsGQEnMA1NLZaZLwVRg449W8S00Q1ym9I4R3svGngJcn6cLeF6LXTAGJr5zXxIpzSkMWUakXF37ryDkKdiM73amExYQmt4Q2PSGMThItyMjAVuDjHzXUC7JJdMNlMZXk7BJPdlXePSlIAdwB8Bwo094CRVvLnVrg'
    },
    // 9091  Jacuzzi Bath Remodel* - Zip Targeted - CPL - Ask for Cap $127.500 YAHOO
    jkp: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K3TL7NJ/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9pG0wv-OMKo7LCLPnDkPE1h',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WpSam8LHc25UsjRVw6Je-PCpK9oQaCnsN1ALRhQ-QL1EnMA1NLZaY9ZO_uNnT064Fg7MUgjHa0ckLZmXNlImOdmhjaiPsNeq1eTzRlWq_RQPCE_tiHkQBU04t6QQCsIOmE0yaEBehi_kJXmAANjM8V9YYYNa2q3qsScNbrp2PWtXBRRT9V8kuWni4jK2KcxUpqzrhdz'
    },
    // 9083 AARP - ET Only YAHOO
    ard: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K3GH5RN/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9pG0wv-OMKo7IbZmfgSyREU',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1YIqN7Hnd4oXpkhbM4DMHuc-K9CXzXBFpjKrjVR9bROlEnIA1NLZaSfKBjZxpOh_trH60h4xcBciQ_WNERw3fx9MaV3FMq8Zhz5BmmJnQnQTUe0SiyT_vL6POLWzqCZBfTDBib-bPcwKBxlgETwDPJHgF6yIzUXI5291DRT799w0zKkcEi0t-GOxrHMI27maOYxAzl4'
    },
    // 5936 Empire Flooring - Promo 50% Off Sale YAHOO
    emo: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CHD91P1/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9rqqSrleRhmMt3g6knZG_HP',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1XxUj2e7B7b43LL_dsuaW-6r22Shvpp1g4CqEgkN69cSEnMA1NLZaT-UAK5PMTBBSBRkPRgURtbZRh-IYvnUiSLWsGzEzTQiINNP9Exh4Si7adjyEuOiDZLdMBDqycR0mXwZGIhg6o1vhxvKPk3-2pi2swwVgLoGqFxNThA1zeAlF0Dff9hAPz5KGlgNBokqySO3QlBM'
    },
    // 8229 Endurance Auto Protection - M-F Drops Only - Ask for Cap YAHOO
    opz: {
      r: 'https://www.zopistreo.com/BD7N3BM8/HK4JP96/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9rqqSrleRhmMuWv3LX0Lfnv',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1RjWNOYN907MXp6-ZNx6Zfe-hxbQjrmG5JH1euzNUqHUEosBANTS2WkdBnsoJ0zmp-LAUDLDB-cQrv-WZthhI8LwVQgxhATW9lyQ4Yggspp8IOpF8Sldx3Z3Pg-CcnT7mfpOk-lU8PkMkRHNpt9KkvQqSK4dKIOd_Tf5sKM6mJnKeaiwb53rDaHPaAjEz2v40rVBwvD1aU17q-OVu4rleT6dYnR_UiL_qSMzdWZzew'
    },
    // 8511 Optima Tax Debt Relief - Proof Req - Ask for Cap YAHOO
    ouy: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J345SSD/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByv7K6ubsK-JEnT-9m8XfyhOh_8zBIH9uum',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1cIXm9bci0kquUkjEd1_vWUvYJixI7GxY7WL7utQzh2kEokBANTS2Wk_NuDSlmobpF2-f1CZMX81LR_KVzVjJAYsowvJFJJH1zD7YFs2eChNG5lAdGqic04yDDpXqxj6lHPgkBbCnpBVsIaZDAGNze0FjpMZ7eBSkbLZre2QZQgVRwiqg51-2PLoSrHjC7oK-IYyOvqq0Cbbnc48M9ITwETpQ5gu1ek6o_vJUTI'
    },
    // 8595 Metal Roofing Innovations - Ask for Cap YAHOO Exit My Timeshare - Proof Req - Ask for Cap
    mes: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J78S2MD/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9rqqSrleRhmMhudbc0khQ5f',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1cHdQKb1D7vrbaOsw4O0zpVYSB6eQGaRTLMirL7T-qjMEnMA1NLZaYj4x8UuvC8o9aqkrcG5e7XfDt3cVwEh4fGMmkFjl-mHZfv7afwXiU550YG29BOUwpDnjs6B8XD48wwOVlEqlZzdNBAJW_oZxzeGj6iLt0oQ-gjDLqSkqQGcjdt1eChKq4I_135DGTdo4ZhybN9_'
    },
    // 8868 Exit My Timeshare - Proof Req - Ask for Cap
    lim: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JNRX7K5/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA7ilb5M5xTlW',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1XFK6cJUt4ZT7ojChnSS7oa0m0Xh_88oOuaNXNjuPdAvEnIA1NLZaSokCPsDi3oIk8U_7n441tsPJgx7b4U84jH8Nj9MKAmuEaFpHj0glx_k8TdQ3FsBXh0LNeT1NArX5SErXpFMvN4RaS8gZy3zXbvQZ3-FPq7MEyZXCXoUYFzc177BGA3BUjEK9aVZYezNQGGqBac'
    },
    // 5835 Exit My Timeshare - Proof Req - Ask for Cap YAHOO
    rof: {
      r: 'https://www.zopistreo.com/BD7N3BM8/CBD1RCN/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9rqqSrleRhmMsBiBD0PZw3_',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1RgapQerFGB10S4IY7DPzXAOkXGfMHfdTI49Z_VJEy80EmcA1NLZadU93yY8hiFTbKbnpoBbSB4NzTloP6VV69M7-1F6hjKFdXjtZBKHsVaIFPIXsUUeB8gm_DmDWt2W3u7SCwxM3VP2-m5Fv-xUcUP0yIZvybVtZHCS_Uw3VXUD6CiuGuLi0uK7'
    },
    // 8730 Trump Trading Cards
    rds: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JFZ9B1C/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA7BghdGsezQc',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1V404neQXm5hxOJaNjTs4LiZJ7Xn1RvJyrfXnzxI54GYEnEA1NLZadobyUG8jXx7CwIA5CVUmOpRQn3jQ7s3yXg32yqDU-cIlPOxN6Uz3uPIJaEE22R53kpnWZJ-R3BJ_Bmqt_sFBlBW9sWqc7o5c0BBfpVTY_x3NK90AuVpcrrIvzstZze9uibW8IYOhQka8n4FrA'
    },
    // 8548  ADT- Free Nest Battery Promo~ - Proof Req $765.000
    ads: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J4XJJ2T/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA79yGfJpNUhC',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1S0BcByOYb8p8vAgtERG8GTN5pMm36pQ48mluLpyhUahEnQA1NLZacqzTJlWh9m_bNwruOFMPxwPQfgPxkSScHphk4QJd9uzCxsRemtFvrpxEHVkMxoHIeGjqBZcnuuwefEriUbW5sAAQwG9j7zIXnhdk9VfbjQnxxMO74PRDeyG2oqG41jOOK0KK_-gUOJRImh7ZLpeyQ'
    },
    // 8548  ADT- Free Nest Battery Promo~ - Proof Req $765.000 YAHOO
    adl: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J4XJJ2T/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9qc04W-MMBGTJZvkt2VlkSU',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1QKTG8nCelXBO10fCPAEhXR_3VHSpwfmeYyByo7gJ8GPEnQA1NLZaU_zMgatt0RWFCy7RtVCHb5q4YrIcUx84EobBR3DmOETs30JFuEHi7PW8twiaSsyMTCDkONT7xFJklycQ2ZxZZc6WULTZWKFPyutX-bhTu0dqj23MkSU4GNnc1IOK749Kt9nqKFanQZseewlObvnPw'
    },
    // 7264  Personalized Gifts (Generic) $8.750 YAHOO DANI
    hal: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FT8G739/?__efq=b_UZSIRpS1tNB6eu7EUi2JHcYbMFp2jjG4g8T74TMlecVH8mA-CMQnRsF_akc7vL',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1YvsYdNYz-VrpaLTggfi3sI7fe-bLCZlyW7ap8LJjE08ElkA1NLZaeCmmNJjoj0jD9QMmlRZxRxxnY6PZgCxk3mUuNQOPlEs5oa7Fs7PrAMSaOZRjPCtBOutWCkceK4zgxCbfNbalPDvu7sGoTW-E7h4IqS0bNw3Kahefg'
    },
    // 8476 60% Off ANY Lull Mattress YAHOO JUAN
    lum: {
      r: 'https://www.zopistreo.com/BD7N3BM8/J1CJX35/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9rqqSrleRhmMgswypi8E24z',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1UbrGwjcm2jrC-hUoAb70Yb_eJj00wOseQPOEE_wNoTHEnMA1NLZaUCbn828qDQMjjRnZUYX_ON6lq28LtAGq_b0XroSLM9ePQ4LSM0gVca8_TQYGOz0JzjoAFTwo86lu1zNZ0eVgBO_WDwWMDOKZzRacRPaetU4N75ww4Qn2GpQSEQh7mbDdItnPfHNM6fuzHo479fp'
    },
    // 9303  Bridgewater Health Supplies CGM - CPA - Mon - Fri Drops Only - Proof Req - Ask for Cap $127.500 YAHOO DANI
    bri: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KGD1HP8/?__efq=b_UZSIRpS1tNB6eu7EUi2JHcYbMFp2jjG4g8T74TMlecVH8mA-CMQlEKvYBmx9Wc',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1epb6utFVcWig2-fWEkCjOc50i733VRfvMaxqwCvUyZvEnIA1NLZaZRp7fBeYjj-9VFDY5ebXe683XEtze8KdkneO-1KsqqoyxH4Wb3C6Nrq9f58ohNCDGlOYLK-D1CQO52HUs215q-ps4AjrMSSbbmIwGHCobJw4HhTq-9kJVw3iSwtLnfVmFBOPo6V5M0MReYTeZs'
    },
    // 9303  Bridgewater Health Supplies CGM - CPA - Mon - Fri Drops Only - Proof Req - Ask for Cap $127.500 COMCAST
    brs: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KGD1HP8/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA6kIyNPeopy1',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Zj8Q0dVWxLRrUgHYvuQB1rWtpG8OssNb_VwszVRkZ_pEnIA1NLZaYXc_sB6NH2KvtBRzesg817Jh2QIPONPQaPoTf9owa2XonmLNMPVkwGIp_L1-720mw_-UBlaNHjx3preggVz4MoziWvuF3pUuTAfFtMNSeQ8Z6z_bVySXJ--OJiDfsIjImf4dy0pcZl6TXCGJq8'
    },
    // 9224  KidLiveSafe $127.500 COMCAST
    kid: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KBG9PK9/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1FuAiRLIx2S',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1SMEGADlrLPHAaU1GypeNV3J4JGrT6FECaGD43PbyKx-EnMA1NLZab3mayhN4VjKJVGnHM5axejbg1uz7NHbdMEE7sS_dRhqdnhR-jzOtwrkYY9yumBJ8kgpbNP_fgP0C2gdVdRg2x_5JjKscVRP1yZ8vbJWsFxYXXN6BTyM3DQeMgz-itdusOPUQtv5GcDqCFlWRlLr'
    },
    // 4612  Nutrisystem $99 for 28 Meals! $212.500 COMCAST
    nuy: {
      r: 'https://www.zopistreo.com/BD7N3BM8/95PMC95/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAxu3byHm3WLF',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1U0BC_s-XDghZnvMcz1JFo2niqYfCDDK_LThTbiu5VBUEpYBANTS2Wmh1vnpnS2p0CpLAA66kWXkswCntG7Oh6b5l1EK7EkhzLq55t7FmxIOM51OZZXWCvALXwAXJgHpPXLnN_FDVPQKcKAr13AqFtIGycuHVeWyqVlxfmpAUB3ftAcvEdMWfqo6SUj_cbxUZHTHTjHzdwfbSeH2xwub66Uzqlho6OIXhb2pOiyFtp0X9RZOex8yfJfr'
    },
    // 9269  EXCL - Credit Card - BOA Business Card - Email/Newsletter -Proof Req - Ask for Cap ~ $510.000 COMCAST
    psw: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KDNRGNL/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAx-XZrJEVltb',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1e5heQ3SduTH5mwZzR-NUmo3awBKltFySdOv-6EEl3UhEnEA1NLZaW1UaDAxPBwpdwW8z3ufPfEzmr-6on0m3j4xY9pUDO0_EEY_A4KiS3di_8pQnT_CPkVCsYKhkSc52IAMDv5flzBCc37t3R2sZJv7LJAN0-6DaC0ntRjp2aosF22HIM5fJTVEYDFDxnRS7w827w'
    },
    // 8586  BetterHelp Licensed Online Therapy - Proof Req - Ask for Cap $467.500 COMCAST daniel+162585@aguara.com.ar
    psi: {
      r: 'https://www.zalkkweet.com/BDL9J672/J6SB41X/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA-tvkpuinZ_w',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1Z2R0AmiX5_zmn-8mIwewikHc_LzlaJlh-TvLf-aOciOEnQA1NLZaQNz13IebUR5vCQ3c5SiHPAgGhsw0l_6G-yklH_VagZeDTnNHUuBH9493jJ32d9R-pwLF8Wuae2C1qJInD01ulFyWN-N0sw8hryGn8odVHm-I4-YNqYitWNd9vTobKP7LXkJFAy9Y-jkLH1dM78yrQ'
    },
    // 9325  TryHydroSoothe 50% off promo $46.750 COMCAST 
    try: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KHGJXWL/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA732AvMmSjFS',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1ZfDwEFeDfXaTrHWzqmuRCRJ48Nk6Vh3OtFla87JbH7MEnEA1NLZaWWuVsccyMkJlSTO7-HyJ7UTUt4ZUpQNzorIX4yXC5z8_IQfMyC7OExeIVBxYPVeHRlI_GkFvhSQO9FjYpgf0oCsac8R2WGNFTLXJe3HXWDc-vUaYRDeAeTp5YL6skH8gg3nSc9r3MMMdjVj9g'
    },
        // 7412 link chino
    azs: {
      r: 'https://www.zopistreo.com/BD7N3BM8/G4KZZ15/?__efq=pmr2mq9hsiCpJNE34wdnI1p3XPHMMK-j3tODto_ZwhAkaUF-hGeu8xA3X95e-iz6',
      p: 'https://www.zopistreo.com/BD7N3BM8/G4KZZ15/?__efq=tKVRqAYnEXwD5n7ANim4p2LzD2mrq8N2M8e91xBsv1eAskQGtaDKka7aWGsRCqsUknUJ1lDtmy4',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1TZj_qTjl-ECAvwa8YFb6jAq3Mhq4kjB_Rnm-v6sa3nXEnEA1NLZaQV_7vNzC3YscyQuqNGDWxgYk0cU0TJQZy2mrhcW-zxg_HyQ1VsOWjMlzEpf5EhJhRV6Ifquq9O0RDewC_PItQWnyzUlcjXh4o98F5ALlp0SkXTIaNYKM0tQ-mLdutxuG8fRuh4QuKHMODyNuA'
    },

    // 8229 link chino
    oja: {
      r: 'https://www.zopistreo.com/BD7N3BM8/HK4JP96/?__efq=pmr2mq9hsiCpJNE34wdnI1p3XPHMMK-j3tODto_ZwhBN0eT5ESNYh2wZZ5ahSCLL',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1QfZzpooyW-uNg8TT5MzoPXbyi20LuebPPIr9OK0yfeoEosBANTS2WlRhR600qAJ1fBCqPG5QeNTp4MbXc42L-6gh1K0_F_7RBD1dHXQbVBhI23erOvaXzCMpidWJgRfDX1ndQQ8hKGh3K0aCPrhHpH7U3bcIXqqQ6mZMYKTHpyuU66Yq_paEVDTXujfPUAfpT1tEsyZYMPsYVR-5UPhNac2vWVsxy0XjzlbyJoO2w'
    },

    // 7155 link chino
    soo: {
      r: 'https://www.zopistreo.com/BD7N3BM8/FMT3WT4/?__efq=pmr2mq9hsiCpJNE34wdnI1p3XPHMMK-j3tODto_ZwhBN0eT5ESNYh0Px8rWL8TGi',
      p: 'https://www.zopistreo.com/BD7N3BM8/FMT3WT4/?__efq=voaHuW34bC58Rl_ll8e8LKIQTV7bSj_1IR9UWeb8y-3k7nVIEhq9_Q',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1bifP8B6IE5AHWMwOfuZ2VGVRYk7aGd3g9uiI9U0KdvxEnMAuzPeEgjgead2jA-kHYFxBW2oT5Kz4VCuMVWmP1qXGldOFw945wxGytuE_0dgptN8UFfz9SjBeFVVc3YbcDh43wj9FkuaK8Oh2UGKqReIvAdUOf2pnPLRgWYjJ4dQirZyGrly1PUXS4PkvrHDC-A8PQQJ'
    },
    // 9284  Forkful Meals - 50% off first box Promo - Email Only - Proof Req - Ask for Cap $170.000 COMCAST 
    fok: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KFFLPPP/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA10WsFxO8Hxe',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1SCXJRkAfu7KYbQ3VpBHXCd8wVNoOtN9jZywnFKlHUMdEk0A1NLZabGTASQ6QCj0urHrVXH2HgLW-9jG3uBruN0YJ2wpr0SkcS5pZEzgROKqrfhOsvrpxCM5QStVagus_Y596x7YkU2X2ClfVnJxYQ'
    },
    // 8685 LaserAway - 70% Off - M - F Drops Only - Ask for Cap $55.250 daniel+162585@aguara.com.ar YAHOO
    unl: {
      r: 'https://www.zalkkweet.com/BDL9J672/JCPRJW2/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9rqqSrleRhmMpErYCQJBubZ',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1fuDS7docvj5nkcG483woblxUWvkuEe2bx0nibnOhw9GEm0A1NLZaV1Jmc-XI5ja-BcQSdf9T42t6LKuA4LMFhOGZVasBXJ2nL0ArjOrdPK2l1slQaqoLOkRPAktuVQRuMhfUzfu1Hg-lV9EykITdaRhNvhn4b6VPyi8syz6AFL0YKZ8ZYJjm3R2TolUiZDn'
    },
    // 8875 Santa Letters & Packages $25.500 daniel+162351@aguara.com.ar COMCAST
    san: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JP5MDPD/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA1FkAirBEt3p',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1dkdpiKqHKek_gv5dIdH2lon3aw5lahLn1mBbuCiOHSXEosBANTS2WmVMpJOmSxhaw4-mF9Dyz_ZwnvB1kwrIYas7BJUwbT6g2OBw18DumGx9UWy6rs0fMuegxe5cPjwXokipx_R9rqd8t9DOk_YcT3wR6XKbzRsCUE-6o8C7BFDqutxcpiEV_g6aRlwi1ZwFtcMzQB5cGPsl0sX2tfnC2beDs5u0GY9GTPV1UpOfQ'
    },
    // 9344 Cuttivo Cutting Board $55.500 daniel+162351@aguara.com.ar COMCAST
    cut: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KJDXPW5/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA8qidale9BIHPBEB5ARx33P18bozMYcHUw',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WupN2qJ8FACPYpCJaLG3SvqrqiIWfaA4XigO4JHdCE-EnEA1NLZaRmUjNpUxvGSyDZ9_-mdRq2L4c7hm1tuPpcSqg-kDNm-7l-YIjSE4svX5H2NXAlGfnuC3sPLFM0Qp612MX0PZUToysB9VA77EsTMhkrLI1YBfutiu_t_CoXVrSFLZcnoAGgdxKgKi6e0pAp8OA'
    },
    // 9234 Riddex $20.400 daniel+162351@aguara.com.ar COMCAST
    cuc: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KBZ6JXC/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAzMjj_rknFRw',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1ZtRbjwKWyPxJX73plggPKYTI7qgiF-5i-iPxDg0ymoBEnEA1NLZaTzBNZUJY_pKED94guXTiL98SYof2qqHhrRAr-L1yA7j_9K8lnV6-dzze5yePUMNP6Hq7JVqOVRIEoFnZLIOfofm5Rz4OTtC6gS09H7rpszKSxl0CIYZ-aLn5XWwDDri7vvKYrsC4x9_j5yQ0w'
    },
    // 9183 Fiera Cosmetics Luxury Concealer - Email Only - Proof Req $42.500 daniel+162351@aguara.com.ar COMCAST
    cos: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K8FCHDD/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA5J_aIMG0sSK',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1bfWsqQ7G9PfBFZgp1XJ7Ydf7VZbnoTTRV5_6zKLsQodEmkA1NLZaYWeIxioAHgapcei0Depz3AONrdaVGtFUc3zLTl0jcoARchOf-rAFFG0BpPj7sgQy-INz7v3uagmr5qlH3-MXmt0hE5HBzICwgIbcQXdzmdw85KCOddcTtNIIaPhDSJgxUBsmbQ'
    },
    // 9344 Cuttivo Cutting Board $55.500 daniel+162351@aguara.com.ar YAHOO
    cul: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KJDXPW5/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9obMoSNPYUz1sUPAsrkXApm',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1dXz-LTSS9UDBWvxvxW9PbPc9x_q594lKyRACf6HPC_LEnEA1NLZaeSrAvcpZoq6kXQdV_s6CTuSNdMb2DqL197M72in-2gDNN6jcyKIK0oKhaU4xJ_l7dWPBq9rGRA6tbCHNQm4rH9RitJ1oEe9V2ZTwIZeVvGi4312MSmXD9hZdgJz_eb7X7oD7jntMg3uilUYPA'
    },
    // 8875 Santa Letters & Packages $25.500 daniel+162351@aguara.com.ar YAHOO
    sak: {
      r: 'https://www.zopistreo.com/BD7N3BM8/JP5MDPD/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9obMoSNPYUz1hzesrKWfWh6',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1QCkwXNDMXf1Pr_S6vZrqt2wOAqnEXaEQH2M59PZc2-MEosBANTS2WlyhvWvxDcbSPkovtFSX-DNHvjtIXV-0COFwEZo0yNrzU0rRUvJ9uEgHqTUaWJGK-pXEdGT6doC9zWoqYak_24XPZ-xsLuEOomecM_vmznF2xzsSdV3YPaopMzvPNVQObmFiCZI6VVDjUxOnq7aQK9iQlrGoHSxek_MFBwPAL--SzFUmRZepA'
    },
    // 4976 EXCL - Insanely Cool Gifts - Holiday Gadget Listicle daniel+162351@aguara.com.ar COMCAST
    nav: {
      r: 'https://www.zopistreo.com/BD7N3BM8/9RR4X65/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAy8K2q3eG6aF',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1VtVjp3jOKkQo3bCu8L8DBG-I8NN_YZMqcQgFw75686oEnMA1NLZabdearakcu452uZjI0R4sIDKTe5seaFN86MZiQqaGcPnGLB2G1jcBB7JVOIfYjewVLGE23BPwINlqZQ8iLJ32ivWzb5O4jdX7HmneFkRj0ep3y-Dt8ypq6Di9GNkiS6n8jrshtF1mjgMy89_nhdO'
    },
    // 4976 EXCL - Insanely Cool Gifts - Holiday Gadget Listicle daniel+162351@aguara.com.ar YAHOO
    nap: {
      r: 'https://www.zopistreo.com/BD7N3BM8/9RR4X65/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9obMoSNPYUz1lAey52G7ggx',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1dUOkVY4Jt3ouiy2RmcPDobymC4pfjxvujWjAqXnbxj5EnMA1NLZaehV1di0tO2lJicuQp8UF72WFO2OGjEOgU82BdjtDNmCFZzjAiwGQRnoztMRp4xMaRvBP147ALoK3Pq-md6yHfGR4tDi-4cyNqJpu-XqdmtvKVMz9-c54La8Aox_lUbxdhA1q4XgafaGKZ5rwrWB'
    },
    // 9286 Derila ERGO - Pillow - Sale daniel+162351@aguara.com.ar COMCAST
    pil: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KFJDH6X/?creative_id=155797&sub3=C&sub5=comcast_traffic',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1YCvPJQK6RSn8y_U40nRahOXYqbMrqH-5IN5OWTwmRXrEnYA1NLZaWAhhjiqYBxOcghgz4zeoW345nUQG9F-dpn1E_nMgqqck2JySwrWx3h6HtqhfVLN_b1PBrgkaTbDHzppH6ZIQ0NZivsCkfopk_pE8KM2UESsTVXfGIoMBBghjP8HnJnmVLeNmRpqd9_u_wNDWNl0uVws'
    },
    // 9285 Akusoli - Magnetic Acupressure Insoles - Ask for Cap daniel+162351@aguara.com.ar COMCAST
    mac: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KFH1LGB/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA_yZ20tHA0Dq',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1SN42kPgFkAkUD7iYzIvwfHKkkNI0TdE3kiKhfeYasgAEnUA1NLZafyZcb_jMcaF9ys3o-dGZ900aoTU5V0nVWj_smlt99vU38jJ8p4umj8GR15Rrx0qacDfLvMXx5PuFdzF7ySJwxEZQlgEw9nLZUzTo9tUFftAehaH--56OTEpbDP_TeYne-EERFIObPIn7fXFh3uA4WI'
    },
    // 6273 First American Home Warranty CPL* - Email/Newsletter Only YAHOO
    tio: {
      r: 'https://www.zopistreo.com/BD7N3BM8/D448PPL/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9p-7LyvTFXHSsZCTHVknexf',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1ShMTMTV5sKxCTluu0rfsnMHgbOIYkj8VlXfcVhq4_sxElgA1NLZaY5ngHK_2x0fXD8w__AyPOhuu5JxzYuEm88SKfbGOrOeVn1Ml6Hj6VydCyFfoIkXXULghZCvQjzpbrrVZvC1hGiUuPyTVQUZDOKW536qN9lGVS2P'
    },
    // 7412 link gaston National Debt Relief - Proof Req - Ask for Cap YAHOO
    azo: {
      r: 'https://www.zopistreo.com/BD7N3BM8/G4KZZ15/?__efq=-d-M1kYRzmHEmlOqcSg4UOWmjXneBDLYamehe-9Jan1WPsMdGM-iyHHviNclm4vZb-DzUSwIxVqYFkT2OlZ8oA',
      p: 'https://www.zopistreo.com/BD7N3BM8/G4KZZ15/?__efq=tKVRqAYnEXwVuJP_klJfacMbv9J3-u2wndbEtR3qdbMov-lAMMawC3MHgsUQHtZWsdNwvBEi11CkzplszLOKXspXNlUtZYaT',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1XtrMHhZTQ5nAngVNxNiJkvWhSooj3ZfXCOYG9GHz-WfEnEA1NLZaa22b9GMhXab7kgS1NeKiswk6cNnDTzLYtO5mH2DkBZTp5VXLSpvHofRPnlnG59jTCY3M8IfdcXpTjk3SeJ9DMG57Tj5s_p5xoNwENaAu0A2GZyLx6QiOb2bNoG6B3uswQoM-62p7YlKOYxF5Q'
    },
    // 8673 - EXCL - CPC - Auto Insurance Connect - Ask for Cap - $2.550 daniel+162111@aguara.com.ar YAHOO
    qws: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/JC54Z2Q/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9rqqSrleRhmMqTiI5vkL7aj',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1bluDXmnffpu3aO6VydkuzZKqOLm9XOXTXRP5EoLxRRBEncA1NLZab5WlrpCSY4IHXGWxwR5Wf3LXXgpwcPP3aIg_OJ6_PlinmgmSuYNh6L0lL9kGAOLY6SbELQuChz2i0wCtC6dAHiCnYeXyi2V3n_Sgih6vIRsFVTs1CujJYMQBlcJvVbRvZeEIZgse4jGyoplMO43OuWlag'
    },
    // 8622 - EXCL - CPC - 2024 Insure Quiz - Ask for Cap $2.550 daniel+162111@aguara.com.ar YAHOO
    quo: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/J8L9WHR/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9onMmC26aqcxFp3dE8KyT8Z',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1XQ8kwQlkN901_-6adtWLCpkx-owyW3FHy1qt4ozJTExEncA1NLZac9ROZ1pT-czxusr39taGVl_VkrAZXfNtPtng-ILRWaKAx_HZDKywPa0Cft_9LsboKT6ARQNgYIU16tmndQhXw8QS8rErflO76B2F4iUR6XTpzDxLxGf6vcHtq34Pupi-EGwySrtuRyETfN0Q9YQTnQlIA'
    },
    // 8700 CPC - Auto Coverage Savings - Ask for Cap $4.060 daniel+162111@aguara.com.ar YAHOO
    ack: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/JDGLRX5/?__efq=-d-M1kYRzmHEmlOqcSg4UOWmjXneBDLYamehe-9Jan1WPsMdGM-iyHHviNclm4vZmTUsenlsGmH1WiJ5ctCvtQ',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1b8KG-Kknot3KCwwee4d8Qoj5MCn9hFF8vq_CB5xnYW-EncA1NLZaf0Lg7DiqqbBB7lGoMj-RCYDkM2dEV9tMdWiZ0iqTzDwoEEtKbhzJ33mC-FQrfhmsd2idnnI-ly_4GHjn8V1fYohTGoDxOvVm1vo_BtLzWz3SYYJuHvH7TtAfJFYUHASpuUFLr2ESONzcGC8fJZC0jjXXg'
    },
    // 9379 ThermiVest $51.000 daniel+162351@aguara.com.ar COMCAST
    cam: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KL5JMMD/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA15Aw0lzIm1x',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1cSqZQ9L56FU_Z6rtI7uQcqUOT0Z7BThlxebvxQrM2cXEnEA1NLZaYqiEHUxLv27vO0yYhbJivERtNTj-qdKfMfceOewsrokFa78hlfnsUK1ysaHAeC7uFu1y1eWufRyU5rjwm20MOMSmC9xS4lkQAMUNlm4rng2KoYdbPJSy9cZeBBM7W1GAomP3s-SVJpct4IhkQ'
    },
    // 9379 ThermiVest $51.000 daniel+162351@aguara.com.ar YAHOO
    cao: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KL5JMMD/?__efq=_0xfj3Ez0MXUfdnyXcRxbqsHJFiDpByvLTbsOMEbY9p-7LyvTFXHSu9u7YTSmFXI',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1YPQKJk1JXIXGm99tLCvEKe3zLo9IvuXrhtUUTplfErpEnEA1NLZafQHb2ogswtLz5oBAL9273BvSipNG1RzJWaIZ6S8VZxP9I43ebm7DS-MqTZFKYjYJj2IfSaoLdxu9v8KqxWegewLTG8MakDul5220-IdfcUu2VSuYQMeQVPIVNDRzIfuvmI5jGq_IWdTB2T2lw'
    },
    // 9378 CPC - AutoQuote Car Insurance - ET Only - Mon - Fri Drops Only - Ask for Cap $3.400 daniel+162351@aguara.com.ar YAHOO
    udt: {
      r: 'https://www.zopistreo.com/BD7N3BM8/KL45QWR/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA2a9JFjIXlvz',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1TpYan0vlX_BDPy-hPVwtwvcC7-3bZf7mma0Iz_wGDzbEnIA1NLZacoxYJxIvPGkWYDAU-hoAngNb1Dza1nRIAl2tBEf3lyeydD9j1z8kMUcoh8nvYKFck7Htov1P5CIv-ZQ2onI_DrbFPm2pOMKRhmIiO_gu8rkBMG4zp3uzlRC3fuT6jdLVM8i42b6iLHrrRVuIOQ'
    },
    // 9143 CPC - TotalHomeAuto.com - Auto Insurance CPC - Mon-Thurs Drops Only - Sensitive IO Req - Ask for Cap $3.400 daniel+162351@aguara.com.ar COMCAST
    tsg: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/K6FS5Z4/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAykdx2Ck33Rp',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1RdnWGiDd-ujupC8257p2ULX2bJRhUeyiTk4MngelIuWEnMAS6SNtOMfrre3Gss6ae9m4i6TVaeoX7b1RxcIkZiIEZNmljDrj7de1UdQAH60V6bZwVLWrmOwtQGKCKiJgTkD6xdGAy9CvHm_igOAzuDquTsw3zYNcgzCA-lj3hVkhD87jbgGVyQnIVprIc2usLWR-JGx'
    },
    // 9298 CPC - North Star Loans - M-F Drops Only - Ask for Cap $2.130 daniel+162111@aguara.com.ar COMCAST
    ste: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/KG53427/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA7dFx1SkILih',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1Sms5Diqlkw2OHTHX7PUqa8UzFukP5IjmJtuUHA9Q5XLEnEAE7PmYvaT925txpRL-1K2-HZzHgiHBozZ5oINIfpf6pIhO3TBR34PeWy7Xz5XuBmy1u7eMJ1hRtn0qXYG6gkyorADnu8uteSi30RMHlSpZvptJKq8h-s3VUnl1ZSlDepC7B6aXYnVpXqfFefIBxYFLw'
    },
    // 9394 CPC - EXCL - CPC - The Loan Boost - Ask for Cap $2.130 daniel+162111@aguara.com.ar COMCAST
    ssq: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/KLWCWNH/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA38y7q9NO6fV',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1a06nmlDt1dm6tpE8pT5UkLH95LovPJH0yvM1-z_ZrO7EnEAS6SNtClRgUyJEjV97Z3U0V51djlNa8A9icB74F4JGMVdtzU9s0PixzFolnNmcpoGsqFhkb9IpSo0ww5iRP5xGTV8caNQeA17LqKh21j7Im4MTN8lY6aK41aS9K-BNFtTgNBWbMMb0keYHWGFDWmpUQ'
    },
    // 8000 CPC - Lending for Bad Credit - M-F Drops Only $2.130 daniel+162111@aguara.com.ar COMCAST
    mif: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/H5QJDQ5/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA8rTjORSDfIM',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1auH8kEEY__NTTImQBHw7KXJsw75z9qEgkmfT9sw_bbjEnEAS6SNtDPlBYX4qGNMIVRVo3N9vjWWcLEAivkLnAznHFrVb4lV_ojm1TvartmsemF6wDnpqZq5jAWwOct3P59DYIqMWOmM8423f55ALAgzi1-qRJLNE7wRVZ2Rv2wLgyuTq0FiPZwrRApa744XPpZUoA'
    },
    // 9217 CPC - DebtConsolidation - M-F Drops Only - Ask for Cap $2.130 daniel+162111@aguara.com.ar COMCAST
    lkq: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/KB4KJF2/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA5TntvvcOVHz',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1aQ9A92d9z2GQfh2Xxm6tDR8SMmOZndPGcNOMC5HXkYJEnEAS6SNtM7T9abO0_2-8yspP-UYWrs_pzRZPkriYloGsLvt8LQPRzv6Y0DmEEpyczio7_j3m31BfzQyoYDzjH8R0_RDnRZMrkTmfqebs32kAb1o18kTKt912gYYCz78jYZ5ic5U0a_el4EyvXjLqTwIJQ'
    },
    // 9395 CPC - 2026 Funding - Ask for Cap $2.130 daniel+162111@aguara.com.ar COMCAST
    lsj: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/KLXQRF4/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA2La0jUFCWq6',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1b90NEtavYuqvJm-5sn6hI5xWlh4A_gIv-pP-rAhI9lvEnEAS6SNtNd9XxiLBtfSTrxRa3sO4dXENlH5VzmB8eV1HNpIqbEet6bioy3Ix2DfZF5XzWutp1cd5N9fNogK6ZLky3cMJkYrpaDZaLvbuDOj0CJKY2PTBhaGkYkmV_xsrdk-EnRf-PRNPig3VyzzUVCshg'
    },
    // 9396 CPC - 2026 Personal Loans - Ask for Cap $2.130 daniel+162111@aguara.com.ar COMCAST
    lsz: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/KM15N5P/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA2TX6hhV00IC',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1bgvmLSaOEH9ZPViCWfVssWT9z2jwBrvcjGTRirpg4ewEnEAS6SNtEuSxL70vechfv3nUr8N1bp1Qtdm708xvH-ZBTscmeRdxtbxyaBG2_Vo8anMz_gDK2b0eGI_KllAKoBL0hvUyoKsRiS761V6N4M7RjxQvshpON_xH3Fld-Acv495DJ1JidEauXIZc6qxcaW1Qg'
    },
    // 8698 Loan Service USA CPC - 160005 and 160007 Only - M-F Drops Only - Ask for Cap $2.130 daniel+162111@aguara.com.ar COMCAST
    lsu: {
      r: 'https://www.zalkkweet.com/BCSQZXDD/JDCT2FX/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA5fTHK5NoP-6',
      u: 'https://www.zalkkweet.com/integration/unsub1/?_redir=CiUAgbOb1cvbPvnComRU1DxGbKKdU1-m48RPh5aXLouEFT5i5vWsEnEAS6SNtMoxtNN5s39rKSECJO4TzW93VWKHM_XYdXK4fYMJJvCBSiD5sRNXIBnIJEkyxaZSiYNrubPqisp_rkKZs4rqiUdJEk4jmQ6Lanu0L-ajvWeD9jsoxcNtXzb8rpFodOlgbU5IH3cQOpPvddZ_FQ'
    },
    // 9135 Affordable Windows USA- Email Only - Proof Req - Ask for Cap $102.000 daniel+162351@aguara.com.ar COMCAST
    afo: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K62P438/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uA3tWPEzTVKC_',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1Wfz_5GrLkYwblKUxN3uMEEu5O9OP57qk3d0zc-djmnREnMAS6SNtLKuX6kvDkZv1B7JhYEwATvygIRxAQhkxqNomxfHzt8qZcNnBBmAOC8bJRT65DJzlT1bQzD5vuZuVbVkVP5OcyV1yyyESgoGwXG085F6lLPG5nvMzKn3VRiC6nrEUv7BvbC04C0Mra0XJGZp28NI'
    },
    // 9178 SBLI Quick Quote - Term Life Insurance - Lead Gen - Ask for Cap $46.750 daniel+162351@aguara.com.ar COMCAST
    ter: {
      r: 'https://www.zopistreo.com/BD7N3BM8/K86F3PC/?__efq=CaNag-E1snVXb2r39UTFOkxlBQvkq866gSxgfULNnOOPsvltxZ6uAzeNMW5Cd65C',
      u: 'https://www.zopistreo.com/integration/unsub1/?_redir=CiUAgbOb1WfZlDqMxMEQjpGF1ldgycVrW7rgL_EXyS5OHR5GrAb8EnAAS6SNtCHd8LgeVzcB4MUQ0XMhllhHcNklWNfTCikdsGi1132zq65DRd9gXuP5MEE_kyuA_mzZe7L5Fo9SE0LD4drFFKC_44ZhuKNKlFrJaMBGZfS0S8BvowM-AyYmajXqTDp-b59r74ao-DgobUCj'
    },
    
  };

  // Verificar si el parámetro 'o' está presente
  if (o) {

    console.log(`Devolviendo el pixel con el parámetro 'o': ${o}`);
    const gif = 'R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    const gifBuffer = Buffer.from(gif, 'base64');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/gif' },
      body: gifBuffer.toString('base64'),
      isBase64Encoded: true
    };
  }

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
