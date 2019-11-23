pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

/*
removed reliance on address since it's global. 
units array keeps track of which units we currently have.
descriptorValues maps to struct arrays.

*/

contract GlobalDescriptor {
    struct Descriptor {
        int unitValue;
        int longitude;
        int latitude;
        uint256 time;
    }

     string[] units;



    mapping(string => Descriptor[]) descriptorValues;


    function insertValue(string memory unit, int value, int longitude, int latitude) public {
     insertUnit(unit);
     descriptorValues[unit].push(Descriptor({
          unitValue: value,
          longitude: longitude,
          latitude: latitude,
         time: block.timestamp
     }));
    }

    function doesUnitExist(string memory unit) private view returns (bool) {
        for(uint i = 0; i < units.length; ++i) {
            if(compareStrings(units[i], unit)) {
                return true;
            }
        }
        return false;
    }

    function compareStrings (string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }



    function getLatestUnitValue(string memory unit) public view returns (int) {
        if(doesUnitExist( unit) == false) {
            return 0;
        }
        uint length = descriptorValues[unit].length;
        return descriptorValues[unit][length - 1].unitValue;
    }

    function getAllUnitValues(string memory unit) public view returns (Descriptor[] memory) {
        if(doesUnitExist(unit) == false) {
         return new Descriptor[](0);
        }
        return descriptorValues[unit];
    }

    function insertUnit(string memory unit) private {
        for(uint i = 0; i < units.length; ++i) {
            if(compareStrings(units[i], unit)) {
                return;
            }
        }
        units.push(unit);
    }
    
    function getAllAvailableUnits() public view returns (string[] memory) {
        return units;
    }

    function getPaginatedUnitValues(string memory unit, uint start, uint count) public view returns (Descriptor[] memory) {
        if(doesUnitExist(unit) == false) {
            return new Descriptor[](0);
        }
        Descriptor[] memory ret = new Descriptor[](count);
        uint len = descriptorValues[unit].length;
        uint end = len - start;
        uint j = 0;
        for(uint i = len - start - count; i < end; i++) {
            ret[j] = descriptorValues[unit][i];
            j += 1;
        }
        return ret;
    }

}