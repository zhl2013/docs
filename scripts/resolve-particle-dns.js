// Determine the IP ranges for Particle web services so they can be
// included in docs
const dns = require('dns');
module.exports = function plugin(options) {
  return function(files, metalsmith, done) {
    // TODO: include other servers

    const metadata = metalsmith.metadata();
    metadata.dnsTable = metadata.dnsTable || {};
    // find all IP addresses for API
    dns.resolve('api.particle.io', (err, addresses) => {
      if (err) {
        return done(err);
      }

      // Save in the global metadata
      metadata.dnsTable.api = { addresses };
      done();
    });
  };
};
