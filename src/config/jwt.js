import Jwt from 'jwt-simple';
import { getUser } from '../services/UserService';

const secret = 'teste';

const authenticate = async (req, res, next) => {
  const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || 
    req.headers.authorization;

  if (token) {
    try {
      const decoded = Jwt.decode(token, secret);
      if (decoded.exp <= Date.now()) {
        res.status(400).json({ message: 'Acesso expirado. Por favor faça login novamente!' });
      }

      const user = await getUser(decoded.iss);
      if (user) {
        return next();
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token inválido!' });
    }
  }
  return res.status(401).json({ message: 'Token não encontrado ou informado' });
};

module.exports = authenticate;
