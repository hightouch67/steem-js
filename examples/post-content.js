/**
 * Example of posting content to Steem with steem-js-updated
 */

// Import the steem library
import steem from '../src';

// Set custom node
steem.config.set('uri', 'https://api.steemit.com');

/**
 * Function to post new content to Steem
 * @param {string} wif - Private posting key
 * @param {string} author - Author username
 * @param {string} title - Post title
 * @param {string} body - Post body
 * @param {string} parentPermlink - Main tag/category
 * @param {string[]} tags - Additional tags
 * @returns {Promise} Promise that resolves with the transaction result
 */
async function postContent(wif, author, title, body, parentPermlink, tags = []) {
  try {
    // Generate permlink from title
    const permlink = title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 255) + '-' + Math.floor(Date.now() / 1000);
    
    // Prepare JSON metadata
    const jsonMetadata = JSON.stringify({
      tags: [parentPermlink, ...tags].slice(0, 5),
      app: 'steem-js-updated/0.1',
      format: 'markdown'
    });
    
    console.log(`Posting new content by @${author} in #${parentPermlink}...`);
    
    // Broadcast the comment/post
    return await steem.broadcast.comment(
      wif,
      '', // parent author (empty for new post)
      parentPermlink, // parent permlink (main category/tag)
      author, // author
      permlink, // permlink
      title, // title
      body, // body
      jsonMetadata // json metadata
    );
  } catch (error) {
    console.error('Error posting content:', error);
    throw error;
  }
}

// Post content when the script is run directly
if (require.main === module) {
  // These would come from command-line args or environment variables
  // in a real application
  const wif = process.env.STEEM_POSTING_KEY;
  const author = process.env.STEEM_USERNAME;
  
  if (!wif || !author) {
    console.error('Please set STEEM_POSTING_KEY and STEEM_USERNAME environment variables');
    process.exit(1);
  }
  
  const title = 'Test Post from steem-js-updated';
  const body = 'This is a test post created using the steem-js-updated library.';
  const parentPermlink = 'test';
  const tags = ['steemjs', 'test', 'development'];
  
  postContent(wif, author, title, body, parentPermlink, tags)
    .then(result => {
      console.log('Post successful!');
      console.log('Transaction ID:', result.id);
      process.exit(0);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

// Export the function for use in other modules
export default postContent; 