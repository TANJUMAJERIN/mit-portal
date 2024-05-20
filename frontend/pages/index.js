import FileUpload from '@/components/file_upload';
import Marksheet from '../components/Marksheet';

const HomePage = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <FileUpload />
      <Marksheet/>
    </div>
  );
};

export default HomePage;