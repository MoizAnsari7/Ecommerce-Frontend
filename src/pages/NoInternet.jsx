import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NoInternet(){

  const navigate = useNavigate();

    const handleRetry = () => {
    if (navigator.onLine) {
      navigate('/');
    } else {
      toast.error('Still offline');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>📡 No Internet Connection</h1>
      <p>Please check your connection.</p>
      <button onClick={handleRetry}>🔄 Retry</button>
    </div>
  );
};

export default NoInternet;
