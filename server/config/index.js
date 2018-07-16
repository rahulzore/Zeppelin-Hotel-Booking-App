
if(process.env.NODE_ENV === 'production'){
    module.exports = requires('./prod.js');
} else {
    module.exports = require('./dev.js');
}