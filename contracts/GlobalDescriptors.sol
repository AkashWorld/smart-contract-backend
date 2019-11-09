pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

/*
removed reliance on address since it's global. 
units array keeps track of which units we currently have.
descriptorValues maps to struct arrays.

*/

contract globalDescriptor {
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

    
    function insertUnit(string unit){
     //add check if unit exists
     units.push(unit);

    }

}