import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import API from 'services/imagesAPI';
import { Layout } from 'components/Layout';
import { GlobalStyle } from 'components/GlobalStyle';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Spinner/Loader';
import { useState, useEffect } from 'react';

const App = () => {
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('pending');

    async function getApiImages(query, page) {
      try {
        const { hits, totalHits } = await API.searchImages(query, page);

        if (!hits.length) {
          toast.error(`No images by query ${query}`, {
            duration: 2000,
            position: 'top-center',
          });
          return;
        }

        setImages(prevState => [...prevState, ...hits]);

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} image(s).`);
          calculateTotalPages(totalHits);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setStatus('resolved');
      }
    }
    getApiImages(query, page);
  }, [query, page]);

  const calculateTotalPages = total => {
    setTotalPages(Math.ceil(total / 12));
  };

  const setNewQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalPages(1);
    setStatus('idle');
  };

  const activeImageUrl = url => setActiveImage(url);

  const loadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };

  const isVisibleButton = page < totalPages && status === 'resolved';

  return (
    <Layout>
      <Searchbar onSearch={setNewQuery} />

      {images.length > 0 && (
        <ImageGallery images={images} onClick={activeImageUrl} />
      )}

      {activeImage && (
        <Modal url={activeImage} onClose={() => activeImageUrl(null)} />
      )}

      {isVisibleButton && <Button onClick={loadMoreBtn}>Load More</Button>}

      {status === 'pending' && <Loader />}

      <Toaster autoClose={3000} />
      <GlobalStyle />
    </Layout>
  );
};

export default App;

App.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
  images: PropTypes.array,
  activeImage: PropTypes.string,
  status: PropTypes.string,
  totaltotalPages: PropTypes.number,
};
