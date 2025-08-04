import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOffline, setOnline } from '../Redux/slice/networkSlice';
import { useNavigate } from 'react-router-dom';

const NetworkWatcher = () => {

  const isOffline = useSelector((state) => state.network.isOffline);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => {
      console.log('✅ Internet reconnected');
      dispatch(setOnline());
      if (window.location.pathname === '/no-internet') {
        navigate('/');
      }
    };

    const handleOffline = () => {
      console.log('🚫 Internet lost');
      dispatch(setOffline());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    console.log(isOffline);
    if (isOffline && window.location.pathname !== '/no-internet') {
      navigate('/no-internet');
    }
  }, [isOffline, navigate]);

  return null;
};

export default NetworkWatcher;