pragma solidity 0.4.24;


import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/apps-shared-minime/contracts/MiniMeToken.sol";
import "@aragon/apps-token-manager/contracts/TokenManager.sol";
import "./misc/DSMath.sol";


contract Auction is AragonApp, DSMath {

    /// Events
    event Buy (
        uint256 indexed window,
        address indexed user,
        uint256 amount
    );

    event Claim (
        uint256 indexed window,
        address indexed user,
        uint256 amount
    );

    event Collect (uint256 amount);
    event Price   (uint256 price);
    event Loaded  (uint256 createFirstDay, uint256 createPerDay);
    event Burn    (uint256 dust);

    /// State
    MiniMeToken  public token;
    TokenManager public tokenManager;

    uint256 public openTime;
    uint256 public createFirstDay;

    uint256 public startTime;
    uint256 public numberOfDays;
    uint256 public createPerDay;

    address public foundation;
    address public utils;

    mapping (uint256 => uint256) public dailyTotals;
    mapping (uint256 => mapping (address => uint256)) public userBuys;
    mapping (uint256 => mapping (address => bool))    public claimed;

    /// ACL
    bytes32 constant public CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 constant public BURNER_ROLE  = keccak256("BURNER_ROLE");

    /// ERRORS
    string private constant ERROR_NOT_LOADED = "NOT_LOADED";

    /// Modifiers
    modifier loaded {
        require(createFirstDay > 0, ERROR_NOT_LOADED);
        _;
    }

    function initialize(
        uint256 _numberOfDays,
        uint256 _openTime,
        uint256 _startTime,
        address _token,
        address _foundation,
        address _tokenManager
    )
        public
        onlyInit
    {
        numberOfDays = _numberOfDays;
        openTime = _openTime;
        startTime = _startTime;
        token = MiniMeToken(_token);
        foundation = _foundation;
        tokenManager = TokenManager(_tokenManager);

        assert(numberOfDays > 0);
        assert(openTime < startTime);
        initialized();
    }

    function () public payable loaded {
        buy();
    }

    function load(uint256 _createFirstDay) public auth(CREATOR_ROLE) {
        assert(createFirstDay == 0 && createPerDay == 0);
        uint256 selfBalance = token.balanceOf(address(this));

        createFirstDay = _createFirstDay;
        createPerDay = sub(selfBalance, createFirstDay) / numberOfDays;

        assert(createFirstDay > 0);
        assert(createPerDay > 0);

        emit Loaded(createFirstDay, createPerDay);
    }

    function addUtils(address _utils) public auth(CREATOR_ROLE) {
        utils = _utils;
    }

    function time() public view returns (uint256) {
        return block.timestamp; // solium-disable-line security/no-block-members
    }

    function today() public view returns (uint256) {
        return dayFor(time());
    }

    function dayFor(uint256 _timestamp) public view returns (uint256) {
        return _timestamp < startTime ? 0 : sub(_timestamp, startTime) / 1 hours + 1;
    }

    function createOnDay(uint256 _day) public view returns (uint256) {
        return _day == 0 ? createFirstDay : createPerDay;
    }

    /**
     * @notice Deposit ETH to Auction for `_day` round
     */
    function buyWithLimit(uint256 _day, uint256 _limit) public payable loaded {
        assert(time() >= openTime && today() <= numberOfDays);
        assert(msg.value >= 0.01 ether);

        assert(_day >= today());
        assert(_day <= numberOfDays);

        userBuys[_day][msg.sender] += msg.value;
        dailyTotals[_day] += msg.value;

        if (_limit != 0) {
            assert(dailyTotals[_day] <= _limit);
        }

        emit Buy(_day, msg.sender, msg.value);
    }

    /**
     * @notice Deposit ETH to Auction for current round
     */
    function buy() public payable loaded {
        buyWithLimit(today(), 0);
    }

    /**
     * @notice Receive bought on round `_day` tokens to your account.
     */
    function claim(uint256 _day) public loaded {
        assert(today() > _day);

        if (claimed[_day][msg.sender] || dailyTotals[_day] == 0) {
            return;
        }

        uint256 price = wdiv(createOnDay(_day), dailyTotals[_day]);
        uint256 reward = wmul(price, userBuys[_day][msg.sender]);
        reward = sub(reward, 1);

        claimed[_day][msg.sender] = true;
        token.transfer(msg.sender, reward);

        emit Price(price);
        emit Claim(_day, msg.sender, reward);
    }

    /**
     * @notice Receive all bought tokens to your account.
     */
    function claimAll() public loaded {
        for (uint256 i = 0; i < today(); i++) {
            claim(i);
        }
    }

    function collect() public loaded {
        assert(today() > 0);
        emit Collect(address(this).balance);
        address(foundation).transfer(address(this).balance);
    }

    function burnDust() public loaded auth(BURNER_ROLE) {
        assert(today() > numberOfDays + 1);
        uint256 dust = token.balanceOf(address(this));

        assert(dust > 0);
        tokenManager.burn(address(this), dust);

        emit Burn(dust);
    }
}