module.exports = (err, req, res, next) => {
   let code
   let name = err.name
   let message

   switch (name) {
      case 'Missing_Token':
         code =  401
         message = 'Nothing access token ...'
         break;
      
      case 'Invalid_Token':
         code = 500
         message = 'Invalid token lagi..'
         break;
      
      case 'Failed_created':
         code = 500
         message = 'Failed created this build'
         break;
   
      default:
         code = 500
         message = 'Internal server error'
         break;
   }

   res.status(code).json({success: false,  message})
}