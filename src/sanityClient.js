const sanityClient = require("@sanity/client");
export default sanityClient({
  projectId: "puj7p168",
  dataset: "production",
  useCdn: false
});
