import { useEffect, useState } from 'react';

import axios from 'axios';
import ImageDisplay from './components/ImageDisplay';

function App() {
  const URL_UNSPLASH_API = 'https://api.unsplash.com';

  const UNSPLASH_API_KEY =
    '3d88026776eb1e2c1a99d700ba790ab5d939bb64e9997069f4d95adf46067cfc';

  const [term, setTerm] = useState('');
  const [img, setImg] = useState('');

  const handleChange = e => {
    setTerm(e.target.value);
  };

  // debounce
  useEffect(() => {
    if (term.length >= 4) {
      async function getRandomPic() {
        try {
          const response = await axios(URL_UNSPLASH_API + '/search/photos', {
            params: { query: term, w: '200', h: '200' },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
            },
          });

          setImg(response.data.results[0].urls.regular);
        } catch (err) {
          console.log(err);
        }
      }

      getRandomPic();
    }
  }, [term]);

  return (
    <div>
      <label>
        Search for a random photo : {'  '}
        <input value={term} onChange={handleChange} />
        {img && <ImageDisplay src={img} />}
      </label>
    </div>
  );
}

export default App;
