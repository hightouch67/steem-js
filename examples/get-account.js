/**
 * Example of getting account information with steem-js-updated
 */

// Import the steem library
import steem from '../src';

// Set custom node
steem.config.set('uri', 'https://api.steemit.com');

// Function to get account info
async function getAccountInfo(username) {
  try {
    // Get the account information
    const accounts = await steem.api.getAccounts([username]);
    
    if (accounts && accounts.length > 0) {
      const account = accounts[0];
      
      // Calculate reputation score
      const reputation = steem.formatter.reputation(account.reputation);
      
      // Display basic account information
      console.log(`Account: ${account.name}`);
      console.log(`Reputation: ${reputation}`);
      console.log(`Creation Date: ${account.created}`);
      console.log(`Balance: ${account.balance}`);
      console.log(`SBD Balance: ${account.sbd_balance}`);
      
      // Estimate account value
      const accountValue = steem.formatter.estimateAccountValue(account);
      console.log(`Estimated Account Value: $${accountValue.estimatedValue.toFixed(2)}`);
      
      return account;
    } else {
      console.error(`Account ${username} not found`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching account:', error);
    return null;
  }
}

// Get account information when the script is run directly
if (require.main === module) {
  const username = process.argv[2] || 'steemit';
  
  getAccountInfo(username)
    .then(() => {
      console.log('Done');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

// Export the function for use in other modules
export default getAccountInfo; 