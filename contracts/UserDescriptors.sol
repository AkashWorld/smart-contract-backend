pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

/**
    Smart Cotnract that keeps stores population descriptors for users on a per user basis.
    User's can specify the value and unit of that value that they want to store. The contract
    provides methods to get latest value entered for a unit, getting all units used by the user,
    and getting an array of values for a particular unit entered by the user.
 */
contract UserDescriptors {
    struct Descriptor {
        int unitValue;
        int longitude;
        int latitude;
        uint256 time;
    }

    /**
        Mapping (hashtable, hashmap, dictionary in other langs) of users address (key) to an array (value) of units ('lb, 'cm', 'kg') that the user has used.
    */
    mapping(address => string[]) units;
    /**
        Mapping of an user (key) to another mapping (value)
        The inner mapping is of a unit (key) ('lb', 'cm' or whatever) to an array (value) of values recorded
     */
    mapping(address => mapping(string => Descriptor[])) descriptorValues;

    function insertValue(string memory unit, int value, int longitude, int latitude) public {
        insertUnit(unit);
        descriptorValues[msg.sender][unit].push(Descriptor({
            unitValue: value,
            longitude: longitude,
            latitude: latitude,
            time: block.timestamp
        }));
    }
    
    /**
        Last value entered by a user for a particular unit
     */
    function getLatestUnitValue(string memory unit) public view returns (int) {
        if(doesUnitExist(msg.sender, unit) == false) {
            return 0;
        }
        uint length = descriptorValues[msg.sender][unit].length;
        return descriptorValues[msg.sender][unit][length - 1].unitValue;
    }

    /**
        Get an array of values recorded for a particular unit
    */
    function getAllUnitValues(string memory unit) public view returns (Descriptor[] memory) {
        if(doesUnitExist(msg.sender, unit) == false) {
            return new Descriptor[](0);
        }
        return descriptorValues[msg.sender][unit];
    }

    /**
        Returns [0.......end--count--start....length] slice of an array in order
        from lowest index to highest (slightly confusing I know) but this is done
        this way since we want the latest data, which is later on in the array.
     */
    function getPaginatedUnitValues(string memory unit, uint start, uint count) public view returns (Descriptor[] memory) {
        if(doesUnitExist(msg.sender, unit) == false) {
            return new Descriptor[](0);
        }
        Descriptor[] memory ret = new Descriptor[](count);
        uint len = descriptorValues[msg.sender][unit].length;
        uint end = len - start;
        uint j = 0;
        for(uint i = len - start - count; i < end; i++) {
            ret[j] = descriptorValues[msg.sender][unit][i];
            j += 1;
        }
        return ret;
    }
    
    /**
        Get all units used by a particular user
     */
    function getAllAvailableUnits() public view returns (string[] memory) {
        return units[msg.sender];
    }

    function insertUnit(string memory unit) private {
        for(uint i = 0; i < units[msg.sender].length; ++i) {
            if(compareStrings(units[msg.sender][i], unit)) {
                return;
            }
        }
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