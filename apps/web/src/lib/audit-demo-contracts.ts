export interface AuditDemoContract {
    name: string
    category: string
    description: string
    code: string
    vulnerabilities: string[]
}

export const auditDemoContracts: AuditDemoContract[] = [
    {
        name: "Reentrancy Vulnerable",
        category: "reentrancy",
        description: "Classic reentrancy attack pattern",
        vulnerabilities: ["Reentrancy in withdraw function", "No state update before external call"],
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableBank {
    mapping(address => uint256) public balances;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Insufficient balance");
        
        // VULNERABILITY: External call before state update
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        // State update happens after external call - TOO LATE!
        balances[msg.sender] = 0;
        
        emit Withdrawal(msg.sender, amount);
    }
    
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}

// Malicious contract that exploits the reentrancy
contract ReentrancyAttacker {
    VulnerableBank public bank;
    
    constructor(address _bank) {
        bank = VulnerableBank(_bank);
    }
    
    function attack() public payable {
        require(msg.value >= 1 ether);
        bank.deposit{value: 1 ether}();
        bank.withdraw();
    }
    
    receive() external payable {
        if (address(bank).balance >= 1 ether) {
            bank.withdraw(); // Recursive call!
        }
    }
}`
    },
    {
        name: "Access Control Failure",
        category: "access-control",
        description: "Missing access control modifiers",
        vulnerabilities: ["Unprotected admin functions", "Missing ownership validation"],
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableToken {
    string public name = "VulnToken";
    string public symbol = "VULN";
    uint256 public totalSupply = 1000000 * 10**18;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public isAdmin;
    
    address public owner;
    
    constructor() {
        owner = msg.sender;
        balanceOf[msg.sender] = totalSupply;
        isAdmin[msg.sender] = true;
    }
    
    // VULNERABILITY: Missing access control - anyone can set owner!
    function setOwner(address newOwner) public {
        owner = newOwner;
    }
    
    // VULNERABILITY: Missing access control - anyone can mint!
    function mint(address to, uint256 amount) public {
        balanceOf[to] += amount;
        totalSupply += amount;
    }
    
    // VULNERABILITY: Missing access control - anyone can burn others' tokens!
    function burnFrom(address from, uint256 amount) public {
        require(balanceOf[from] >= amount, "Insufficient balance");
        balanceOf[from] -= amount;
        totalSupply -= amount;
    }
    
    // VULNERABILITY: Weak access control - should use proper modifier
    function addAdmin(address newAdmin) public {
        require(msg.sender == owner, "Only owner"); // Basic check, but no modifier
        isAdmin[newAdmin] = true;
    }
    
    // This function is properly protected (for comparison)
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}`
    },
    {
        name: "Unchecked External Call",
        category: "unchecked-calls",
        description: "External calls without return value checks",
        vulnerabilities: ["Unchecked call return values", "Silent failure possibility"],
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract VulnerablePayment {
    IERC20 public token;
    mapping(address => uint256) public payments;
    
    constructor(address _token) {
        token = IERC20(_token);
    }
    
    // VULNERABILITY: Unchecked external call return value
    function makePayment(address recipient, uint256 amount) public {
        require(amount > 0, "Amount must be positive");
        
        // This call might return false, but we don't check!
        token.transferFrom(msg.sender, recipient, amount);
        
        // We record the payment even if the transfer failed
        payments[recipient] += amount;
    }
    
    // VULNERABILITY: Low-level call without checking return value
    function sendETH(address payable recipient, uint256 amount) public {
        require(address(this).balance >= amount, "Insufficient balance");
        
        // VULNERABILITY: Call can fail silently
        recipient.call{value: amount}("");
        
        // We proceed as if the call succeeded
        payments[recipient] += amount;
    }
    
    // VULNERABILITY: Another unchecked external call
    function batchTransfer(address[] calldata recipients, uint256[] calldata amounts) public {
        require(recipients.length == amounts.length, "Mismatched arrays");
        
        for (uint i = 0; i < recipients.length; i++) {
            // If any transfer fails, the entire batch continues
            token.transfer(recipients[i], amounts[i]);
            payments[recipients[i]] += amounts[i];
        }
    }
    
    // Properly implemented function for comparison
    function safeTransfer(address recipient, uint256 amount) public {
        require(amount > 0, "Amount must be positive");
        
        bool success = token.transfer(recipient, amount);
        require(success, "Transfer failed");
        
        payments[recipient] += amount;
    }
    
    receive() external payable {}
}`
    },
    {
        name: "Integer Overflow Risk",
        category: "arithmetic",
        description: "Arithmetic operations without overflow protection",
        vulnerabilities: ["Integer overflow in calculations", "No SafeMath usage"],
        code: `// SPDX-License-Identifier: MIT
pragma solidity 0.7.6; // Old version without built-in overflow protection

contract VulnerableCalculator {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public rewards;
    
    uint256 public totalSupply;
    uint256 public rewardMultiplier = 150; // 1.5x multiplier (150%)
    
    event RewardCalculated(address user, uint256 reward);
    
    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be positive");
        
        // VULNERABILITY: Potential overflow in addition
        balances[msg.sender] += amount;
        totalSupply += amount;
    }
    
    function calculateReward(uint256 baseAmount) public returns (uint256) {
        // VULNERABILITY: Multiplication can overflow
        uint256 reward = baseAmount * rewardMultiplier;
        
        // VULNERABILITY: Division might truncate, then multiplication overflows
        reward = (reward / 100) * getUserMultiplier(msg.sender);
        
        rewards[msg.sender] += reward;
        emit RewardCalculated(msg.sender, reward);
        
        return reward;
    }
    
    function getUserMultiplier(address user) public view returns (uint256) {
        // VULNERABILITY: Large balance could cause overflow when used in calculations
        if (balances[user] > 1000000 ether) {
            return 500; // 5x multiplier for whales
        }
        return 100; // 1x multiplier
    }
    
    // VULNERABILITY: Batch calculation without overflow checks
    function batchCalculateRewards(address[] calldata users, uint256[] calldata amounts) public {
        for (uint i = 0; i < users.length; i++) {
            uint256 reward = amounts[i] * rewardMultiplier * getUserMultiplier(users[i]);
            rewards[users[i]] += reward;
        }
    }
    
    // VULNERABILITY: Compound interest calculation prone to overflow
    function calculateCompoundReward(uint256 principal, uint256 periods) public pure returns (uint256) {
        uint256 rate = 110; // 10% per period (110%)
        uint256 amount = principal;
        
        for (uint256 i = 0; i < periods; i++) {
            // Each iteration multiplies by 1.1, can quickly overflow
            amount = amount * rate / 100;
        }
        
        return amount;
    }
    
    // Example of a safer implementation
    function safeAdd(uint256 a, uint256 b) public pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "Addition overflow");
        return c;
    }
}`
    }
]

export function getVulnerableDemoContract(category?: string): AuditDemoContract {
    if (category) {
        const contract = auditDemoContracts.find(c => c.category === category)
        if (contract) return contract
    }

    // Return first contract as default
    return auditDemoContracts[0]
}

export function getAllAuditDemoContracts(): AuditDemoContract[] {
    return auditDemoContracts
}

export function getDemoContractByName(name: string): AuditDemoContract | undefined {
    return auditDemoContracts.find(c => c.name === name)
}