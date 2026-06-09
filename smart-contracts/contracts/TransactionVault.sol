struct TransactionRecord {
    uint256 transactionId;
    address owner;
    bytes32 encryptedHash;
    uint256 timestamp;
}