//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

contract logistic {

    address public seller;
    address payable public buyer;
    address public transport;

    struct Product {
        string id;
        string description;
        uint256 price;
        uint256 quantity;
    }

    Product[] public product;
    
    uint256 public total;
    uint256 public toPay;
    uint256 public funds;
    uint256 public pendingReturns;

    enum stateOfShipping {
        ORDER,
        PAY,
        HANDOVER,
        REFUND,
        RECEIVED,
        CLOSED
    }

    stateOfShipping public state;

    event productAdd(Product indexed);
    event changeState(stateOfShipping indexed);
    event handover(address indexed);

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only customer can use this function.");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only dealer can use this function.");
        _;
    }

    modifier onlyTransport() {
        require(msg.sender == transport, "Only vector can delegate.");
        _;
    }

    modifier withdrawable() {
        require(state != stateOfShipping.REFUND, "Checking refund!");
        require(state != stateOfShipping.CLOSED, "Not callable!");
        _;
    }

    constructor(address payable _buyer) {
        seller = msg.sender;
        buyer = _buyer;
    }

    function getProducts() external view returns(Product[] memory) {
        return product;
    }

    function getSeller() external view returns(address) {
        return seller;
    }

    function getBuyer() external view returns(address) {
        return buyer;
    }

    function getTransport() external view returns(address) {
        return transport;
    }

    function getState() external view returns(stateOfShipping) {
        return state;
    }

    function getTotal() external view returns(uint) {
        return total;
    }

    function insertProduct(
        string memory _id,
        string memory _description,
        uint256 _price,
        uint256 _quantity
    ) public onlyBuyer {

        Product memory _p = Product({
            id: _id,
            description: _description,
            price: _price,
            quantity: _quantity
        });

        product.push(_p);
        emit productAdd(_p);
        calculateTotal();
    }

    function calculateTotal() private {

        uint256 _total;
        
        for (uint256 i = 0; i < product.length; i++) {
            _total += (product[i].price * product[i].quantity);
        }
        
        total = _total;
        toPay = _total;
    }

    function pay(uint256 _pay) external payable {

        require(toPay > 0, "Please insert some product!");
        require(state == stateOfShipping.ORDER, "Already paid!");

        funds += _pay;
        toPay -= _pay;
        
        if (toPay == 0) {
            state = stateOfShipping.PAY;
            emit changeState(state);
        }
    }

    function transportation(address _transport) public onlySeller {
        require(state == stateOfShipping.PAY, "Not paid!");
        transport = _transport;
        state = stateOfShipping.HANDOVER;
        emit changeState(state);
        emit handover(_transport);
    }

    function delegate(address _delegate) public onlyTransport {
        transport = _delegate;
        emit changeState(state);
        emit handover(_delegate);
    }

    function received() public onlyTransport {
        state = stateOfShipping.RECEIVED;
        emit changeState(state);
    }

    function refund() public withdrawable {
        require(funds > 0, "Not callable");
        if (msg.sender == seller) {
            pendingReturns = funds;
            funds = 0;
        }
        state = stateOfShipping.REFUND;
        emit changeState(state);
    }

    function withdraw() public onlyBuyer {
        require(pendingReturns > 0, "Cannot withdraw");
        pendingReturns = 0;
        payable(buyer).transfer(address(this).balance);
    }

    function gain() public onlySeller withdrawable {
        require(state == stateOfShipping.RECEIVED);
        state = stateOfShipping.CLOSED;
        emit changeState(state);
        require(funds > 0);
        funds = 0;
        payable(seller).transfer(address(this).balance);
    }
}