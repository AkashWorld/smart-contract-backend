pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

/**
    Smart Cotnract that keeps stores population descriptors for users on a per user basis.
    User's can specify the value and unit of that value that they want to store. The contract
    provides methods to get latest value entered for a unit, getting all units used by the user,
    and getting an array of values for a particular unit entered by the user.
 */
contract UserDescriptors {
    /**
        Mapping (hashtable, hashmap, dictionary in other langs) of users address (key) to an array (value) of units ('lb, 'cm', 'kg') that the user has used.
    */
    mapping(address => string[]) units;
    /**
        Mapping of an user (key) to another mapping (value)
        The inner mapping is of a unit (key) ('lb', 'cm' or whatever) to an array (value) of values recorded
     */
    mapping(address => mapping(string => uint[])) descriptorValues;

    function insertValue(string memory unit, uint value) public {
        insertUnit(unit);
        descriptorValues[msg.sender][unit].push(value);
    }
    
    /**
        Last value entered by a user for a particular unit
     */
    function getLatestUnitValue(string memory unit) public view returns (uint) {
        if(doesUnitExist(msg.sender, unit) == false) {
            return 0;
        }
        uint length = descriptorValues[msg.sender][unit].length;
        return descriptorValues[msg.sender][unit][length - 1];
    }

    /**
        Get an array of values recorded for a particular unit
    */
    function getAllUnitValues(string memory unit) public view returns (uint[] memory) {
        if(doesUnitExist(msg.sender, unit) == false) {
            return new uint[](0);
        }
        return descriptorValues[msg.sender][unit];
    }
    
    /**
        Get all units used by a particular user
     */
    function getAllAvailableUnits() public view returns (string[] memory) {
        return units[msg.sender];
    }

    function insertUnit(string memory unit) private {
        units[msg.sender].push(unit);
    }
    
    function doesUnitExist(address user, string memory unit) private view returns (bool) {
        string[] memory availableUnits = units[user];
        for(uint i = 0; i < availableUnits.length; ++i) {
            if(compareStrings(availableUnits[i], unit)) {
                return true;
            }
        }
        return false;
    }

    function compareStrings (string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }
}