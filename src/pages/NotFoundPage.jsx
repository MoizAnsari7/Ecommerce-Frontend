import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage(){
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFoundPage;