pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

contract UserDescriptors {
    mapping(address => mapping(string => bool)) unitsTable;
    mapping(address => string[]) units;
    mapping(address => mapping(string => uint[])) descriptorValues;

    function insertUnit(string memory unit) private {
        if(unitsTable[msg.sender][unit]) {
            return;
        }
        unitsTable[msg.sender][unit] = true;
        units[msg.sender].push(unit);
    }

    function insertValue(string memory unit, uint value) public {
        insertUnit(unit);
        descriptorValues[msg.sender][unit].push(value);
    }
    
    function doesUnitExist(address user, string memory unit) private view returns (bool) {
        if(unitsTable[user][unit] != true) {
            return false;
        }
        return true;
    }
    
    function getLatestUnitValue(string memory unit) public view returns (uint) {
        if(doesUnitExist(msg.sender, unit) == false) {
            return 0;
        }
        uint length = descriptorValues[msg.sender][unit].length;
        return descriptorValues[msg.sender][unit][length - 1];
    }
    
    function getAllUnitValues(string memory unit) public view returns (uint[] memory) {
        if(doesUnitExist(msg.sender, unit) == false) {
            return new uint[](0);
        }
        return descriptorValues[msg.sender][unit];
    }
    
    function getAllAvailableUnits() public view returns (string[] memory) {
        return units[msg.sender];
    }

    function compareStrings (string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }
}