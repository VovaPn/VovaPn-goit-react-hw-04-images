import { Triangle } from 'react-loader-spinner';
import { LoaderContainer } from 'components/Spinner/Loader.styled';

function Loader() {
  return (
    <LoaderContainer>
      <Triangle
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </LoaderContainer>
  );
}

export default Loader;
