

export default async function auth (req, res, next) {
    ///log the path of the request
    console.log(req.path);
    console.log('Auth middleware');
  next();
}
