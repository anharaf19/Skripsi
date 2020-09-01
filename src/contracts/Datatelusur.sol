pragma solidity ^0.5.0;

contract Datatelusur {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string hashawal;
        string hashtelusur;
        string lokasi;
        string keterangan;
        string tanggal;
        address  author;
    }


    event PostCreated(
        uint id,
        string hashawal,
        string hashtelusur,
        string lokasi,
        string keterangan,
        string tanggal,
        address  author
    );


    constructor() public {
        name = "Anhar Ahyahuda Fitriardi";
    }

    function createPost(string memory _hashawal, string memory _hashtelusur, string memory _lokasi,string memory _keterangan,string memory _tanggal) public {
        // Require valid content
        require(bytes(_hashawal).length > 0);
        // Increment the post count
        postCount ++;
        // Create the post
        posts[postCount] = Post(postCount, _hashawal,_hashtelusur, _lokasi,_keterangan,_tanggal,msg.sender);
        // Trigger event
        emit PostCreated(postCount, _hashawal,_hashtelusur,_lokasi,_keterangan,_tanggal, msg.sender);
    }

}
