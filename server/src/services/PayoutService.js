const axios = require('axios');

/**
 * PayoutService handles all external financial communications.
 * Designed for Paystack/Flutterwave integration.
 */
class PayoutService {
  constructor() {
    // Replace with your actual provider URL (e.g., https://api.paystack.co or https://api.flutterwave.com/v3)
    this.apiBase = process.env.PAYMENT_GATEWAY_URL || 'https://api.paystack.co'; 
    this.secretKey = process.env.PAYMENT_SECRET;
  }

  /**
   * Step 1: Resolve Account Number
   * Verifies that the bank account exists and belongs to the user.
   */
  async verifyAccount(accountNumber, bankCode) {
    try {
      const response = await axios.get(
        `${this.apiBase}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: { Authorization: `Bearer ${this.secretKey}` },
        }
      );
      return response.data.data.account_name;
    } catch (error) {
      console.error('Account Verification Error:', error.response?.data || error.message);
      throw new Error('Invalid bank account details provided.');
    }
  }

  /**
   * Step 2: Create Transfer Recipient
   * Many gateways require creating a 'recipient' before sending funds.
   */
  async createRecipient(user) {
    const payload = {
      type: "nuban",
      name: user.username,
      account_number: user.bankDetails.accountNumber,
      bank_code: user.bankDetails.bankCode,
      currency: "USD",
    };

    try {
      const response = await axios.post(`${this.apiBase}/transferrecipient`, payload, {
        headers: { Authorization: `Bearer ${this.secretKey}` },
      });
      return response.data.data.recipient_code;
    } catch (error) {
      throw new Error('Failed to register bank recipient.');
    }
  }

  /**
   * Step 3: Initiate Withdrawal
   * Moves funds from Tarmarket Escrow to the Worker's Bank Account.
   */
  async initiateWithdrawal = async (user, amount) => {
    // 1. Convert amount to smallest unit (e.g., $15.10 -> 1510 cents)
    // Most APIs do not accept decimals to prevent rounding errors
    const amountInSmallestUnit = Math.round(amount * 100);

    // 2. Fetch or Create Recipient Code (Optimized to check if user already has one)
    const recipientCode = user.bankDetails.recipientCode || await this.createRecipient(user);

    const payload = {
      source: "balance",
      amount: amountInSmallestUnit,
      recipient: recipientCode,
      reason: `Tarmarket Payout: ${user.username}`,
      reference: `TM-OUT-${Date.now()}-${user._id.toString().slice(-4)}`,
      currency: "USD"
    };

    try {
      const response = await axios.post(`${this.apiBase}/transfer`, payload, {
        headers: { 
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json'
        },
      });

      // Response will usually be 'pending' as banks take time to process
      return {
        success: true,
        data: response.data.data,
        reference: payload.reference
      };
    } catch (error) {
      // Log the specific error from the gateway for debugging
      console.error('Transfer API Error:', error.response?.data || error.message);
      
      const errorMsg = error.response?.data?.message || 'Bank Transfer failed. Please try again later.';
      throw new Error(errorMsg);
    }
  }
}

module.exports = new PayoutService();