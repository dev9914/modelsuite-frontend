
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const InstagramSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modelId = searchParams.get('modelId');

  useEffect(() => {
    // ✅ Optional: fetch insights directly or show a success UI
    console.log("Instagram connected for model:", modelId);

    // Navigate after delay or show confirmation
    setTimeout(() => {
      navigate('/model/dashboard'); // Or wherever
    }, 2000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">
      Instagram successfully connected 🎉 Redirecting...
    </div>
  );
};

export default InstagramSuccess;
