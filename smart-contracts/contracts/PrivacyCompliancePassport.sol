struct Passport {
    uint256 passportId;
    address owner;
    uint8 riskLevel;
    bool kycVerified;
    bool amlVerified;
    bool active;
}