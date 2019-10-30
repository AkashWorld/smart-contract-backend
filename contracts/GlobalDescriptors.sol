pragma solidity >=0.4.25 <0.6.0;

contract globalDescriptor {
    uint public storedData;
    string public fName= 'suva';
    uint public a;
    uint public b;
    address creator;
    
    
     struct Users {
        string name;
    }
    
  struct data {
        int unitValue;
        int longitude;
        int latitude;
        uint256 time;
        Users User;
    }

   
   
      struct Descriptor {
        uint test;
    }
    
    mapping (address => data) AllData;
    
    function getData(address _a) view public returns(int,int,int,uint256){
        
        var _data = AllData[_a];
        return(_data.unitValue, _data.longitude, _data.latitude, _data.time );
    }
    
 
    
     constructor() public {
        creator = msg.sender;
    }
    
    modifier onlyCreator(){
         require(msg.sender == creator);
        _;
        
    }
    
    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}