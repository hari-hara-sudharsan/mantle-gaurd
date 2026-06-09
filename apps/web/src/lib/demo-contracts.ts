export interface DemoContract {
    name: string
    description: string
    category: "erc20" | "vulnerable" | "dao" | "nft"
    code: string
}

export const demoContracts: DemoContract[] = [
    {
        name: "Vulnerable Vault",
        description: "Contains intentional gas inefficiencies for testing",
        category: "vulnerable",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title VulnerableVault
 * @notice Demo contract for MantleGuard gas analysis
 * @dev Contains intentional gas inefficiencies for testing
 */
contract VulnerableVault {
    address public owner;
    mapping(address => uint256) public balances;
    uint256[] public prices;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event PriceUpdate(uint256 indexed index, uint256 newPrice);

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // GAS ISSUE: Single storage write - efficient
    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // GAS ISSUE: Multiple reads of 'owner' storage variable
    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        require(owner != address(0), "Invalid owner");
        payable(owner).transfer(amount);
        emit Withdrawal(owner, amount);
    }

    // GAS ISSUE: Heavy loop with storage writes
    function updatePrice(uint256[] calldata newPrices) external onlyOwner {
        for (uint256 i = 0; i < newPrices.length; i++) {
            if (i >= prices.length) {
                prices.push(newPrices[i]);
            } else {
                prices[i] = newPrices[i];
            }
            emit PriceUpdate(i, newPrices[i]);
        }
    }

    // OPTIMIZED: Standard transfer pattern
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}`
    },
    {
        name: "Simple ERC20 Token",
        description: "Basic ERC20 implementation with gas analysis opportunities",
        category: "erc20",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleERC20 {
    string public name = "SimpleToken";
    string public symbol = "SIMPLE";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }
    
    // GAS ISSUE: Could use unchecked for gas savings
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    // GAS ISSUE: Multiple storage reads
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Allowance exceeded");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}`
    },
    {
        name: "Reentrancy Vulnerable",
        description: "Classic reentrancy vulnerability example",
        category: "vulnerable",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ReentrancyVulnerable
 * @notice INTENTIONALLY VULNERABLE - For educational purposes only
 * @dev Contains classic reentrancy vulnerability
 */
contract ReentrancyVulnerable {
    mapping(address => uint256) public balances;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    
    function deposit() public payable {
        require(msg.value > 0, "Must send ETH");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    // CRITICAL VULNERABILITY: State updated after external call
    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");
        
        // VULNERABILITY: External call before state update
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        // State updated after external call - WRONG!
        balances[msg.sender] = 0;
        emit Withdrawal(msg.sender, amount);
    }
    
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
    
    receive() external payable {
        deposit();
    }
}`
    },
    {
        name: "Simple NFT",
        description: "Basic NFT contract with minting capabilities",
        category: "nft",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleNFT {
    string public name = "SimpleNFT";
    string public symbol = "SNFT";
    uint256 public totalSupply;
    
    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public getApproved;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    
    // GAS ISSUE: Could cache totalSupply in memory
    function mint(address _to) public returns (uint256) {
        uint256 tokenId = totalSupply;
        totalSupply++;
        ownerOf[tokenId] = _to;
        balanceOf[_to]++;
        emit Transfer(address(0), _to, tokenId);
        return tokenId;
    }
    
    // GAS ISSUE: Multiple storage reads of ownerOf[_tokenId]
    function transfer(address _to, uint256 _tokenId) public {
        require(ownerOf[_tokenId] == msg.sender, "Not owner");
        require(_to != address(0), "Invalid address");
        
        balanceOf[ownerOf[_tokenId]]--;
        balanceOf[_to]++;
        ownerOf[_tokenId] = _to;
        
        emit Transfer(msg.sender, _to, _tokenId);
    }
    
    function approve(address _approved, uint256 _tokenId) public {
        require(ownerOf[_tokenId] == msg.sender, "Not owner");
        getApproved[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }
}`
    }
]

export function getDemoContract(category?: string): DemoContract {
    if (category) {
        const contract = demoContracts.find(c => c.category === category)
        if (contract) return contract
    }
    return demoContracts[0] // Default to Vulnerable Vault
}

export function getAllDemoContracts(): DemoContract[] {
    return demoContracts
}
