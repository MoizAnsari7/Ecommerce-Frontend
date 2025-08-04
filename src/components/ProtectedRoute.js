import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAllowed, setIsAllowed] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      if (user.role === "Seller") {
        navigate("/sellerDashboard");
      } else {
        navigate("/");
      }
      return;
    }

    setIsAllowed(true);
  }, [allowedRoles, navigate]);

  if (isAllowed === null) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
