import jwt from 'jsonwebtoken';

function session(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
      });
      if (!response.ok){
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      req.userId = decoded.userId;
      return handler(req, res);
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
}

export default session;