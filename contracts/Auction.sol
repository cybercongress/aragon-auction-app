pragma solidity 0.4.24;


import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/apps-shared-minime/contracts/MiniMeToken.sol";
import "./misc/DSMath.sol";


contract Auction is AragonApp, DSMath {

    // /// Events
    event LogBuy (uint256 window, address indexed user, uint256 amount);
    event LogClaim (uint256 window, address indexed user, uint256 amount);
    event LogCollect (uint256 amount);
    // event LogFreeze ();
    event LogPrice (uint256 amount);
    event LogLoaded();

    /// State
    MiniMeToken public token;

    uint256 public openTime;
    uint256 public createFirstDay;

    uint256 public startTime;
    uint256 public numberOfDays;
    uint256 public createPerDay;

    address public foundation;
    address public utils;

    mapping (uint256 => uint256) public dailyTotals;
    mapping (uint256 => mapping (address => uint256)) public userBuys;
    mapping (uint256 => mapping (address => bool)) public claimed;

    /// ACL
    bytes32 constant public CREATOR_ROLE = keccak256("CREATOR_ROLE");

    // /// ERRORS
    string private constant ERROR_ZERO_BALANCE = "ZERO_BALANCE";
    string private constant ERROR_NOT_ENOUGH_BALANCE = "NOT_ENOUGH_BALANCE";
    string private constant ERROR_NOT_LOADED = "NOT_LOADED";
    string private constant ERROR_ZERO_FIRST_DAY = "ZERO_FIRST_DAY";
    string private constant ERROR_LOADED = "LOADED";

    /// Modifiers
    modifier loaded {
        require(createFirstDay > 0, ERROR_NOT_LOADED);
        _;
    }

    function initialize(
        uint256 _numberOfDays,
        uint256 _openTime,
        uint256 _startTime,
        MiniMeToken _token,
        address _foundation
    ) public onlyInit
    {
        numberOfDays = _numberOfDays;
        openTime = _openTime;
        startTime = _startTime;
        token = _token;
        foundation = _foundation;

        assert(numberOfDays > 0);
        assert(openTime < startTime);
        initialized();
    }

    function () public payable loaded {
        buy();
    }

    function load(uint256 _createFirstDay) public auth(CREATOR_ROLE) {
        // require(createFirstDay == 0, ERROR_LOADED);
        // require(_createFirstDay > 0, ERROR_ZERO_FIRST_DAY);

        uint256 selfBalance = token.balanceOf(address(this));
        // require(selfBalance > 0, ERROR_ZERO_BALANCE);
        // require(selfBalance > _createFirstDay, ERROR_NOT_ENOUGH_BALANCE);

        createFirstDay = _createFirstDay;
        createPerDay = sub(selfBalance, createFirstDay) / numberOfDays;

        // assert(createFirstDay > 0);
        // assert(createPerDay > 0);

        emit LogLoaded();
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

    function dayFor(uint256 timestamp) public view returns (uint256) {
        return timestamp < startTime ? 0 : sub(timestamp, startTime) / 1 hours + 1;
    }

    function createOnDay(uint256 day) public view returns (uint256) {
        return day == 0 ? createFirstDay : createPerDay;
    }

    function buyWithLimit(uint256 day, uint256 limit) public payable loaded {
        assert(time() >= openTime && today() <= numberOfDays);
        assert(msg.value >= 0.01 ether);

        assert(day >= today());
        assert(day <= numberOfDays);

        userBuys[day][msg.sender] += msg.value;
        dailyTotals[day] += msg.value;

        if (limit != 0) {
            assert(dailyTotals[day] <= limit);
        }

        emit LogBuy(day, msg.sender, msg.value);
    }

    function buy() public payable loaded {
        buyWithLimit(today(), 0);
    }

    function claim(uint256 day) public loaded {
        assert(today() > day);

        if (claimed[day][msg.sender] || dailyTotals[day] == 0) {
            return;
        }

        uint256 price = wdiv(createOnDay(day), dailyTotals[day]);
        uint256 reward = wmul(price, userBuys[day][msg.sender]);

        claimed[day][msg.sender] = true;
        token.transfer(msg.sender, reward);

        emit LogPrice(price);
        emit LogClaim(day, msg.sender, reward);
    }

    function claimAll() public loaded {
        for (uint256 i = 0; i < today(); i++) {
            claim(i);
        }
    }

    function collect() public loaded {
        assert(today() > 0);
        address(foundation).transfer(address(this).balance);

        emit LogCollect(address(this).balance);
    }

    // // function freeze() public loaded {
    // //     assert(today() > numberOfDays + 1);
    // //     emit LogFreeze();
    // // }
}