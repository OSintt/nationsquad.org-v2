export const isAdmin = (req, res, next) => {
  const user = req.user;
  if (!user.admin) return res.status(403).json({status: 403, message: 'No cuentas con los permisos necesarios para efectuar esta acción'}); 
  return next();
}

export const isAuthorized = (req, res, next) => {
  if (!req.user) return res.status(401).json({status: 401, message: 'Necesitas estar registrado para realizar esta acción'});
  return next(); 
}

