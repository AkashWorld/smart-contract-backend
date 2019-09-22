pragma solidity >=0.4.25 <0.6.0;

contract Descriptor {
    uint[] public weightDescriptors;
    mapping(address => uint[]) private peopleDescriptors;
    event WeightInserted(address from, uint weight);
    event WeightRetrieved(address from, uint weight);

    mapping(string => uint[]) public populationDescriptors;

    constructor() public {
    }

    function insertDescriptor(uint weight) public {
        if(weight <= 0 || weight > 1000) {
            return;
        }
        peopleDescriptors[msg.sender].push(weight);
        weightDescriptors.push(weight);
        emit WeightInserted(msg.sender, weight);
    }

    function getLatestUserWeight() public view returns (uint) {
        uint[] memory personWeightDescriptors = peopleDescriptors[msg.sender];
        if(personWeightDescriptors.length == 0) {
            return 0;
        }
        uint weight = personWeightDescriptors[personWeightDescriptors.length - 1];
        return weight;
    }
}