pragma solidity ^0.5.0;

contract Dataawal {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string hashawal;
        string jeniskopi;
        string petani;
        string tanam;
        string keterangan;
        string tanggal;
        address  author;
    }


    event PostCreated(
        uint id,
        string hashawal,
        string jeniskopi,
        string petani,
        string tanam,
        string keterangan,
        string tanggal,
        address  author
    );


    constructor() public {
        name = "Anhar Ahyahuda Fitriardi";
    }

    function createPost(string memory _hashawal,string memory _jeniskopi,string memory _petani,string memory _tanam,string memory _keterangan,string memory _tanggal   ) public {
        // Require valid content
        require(bytes(_hashawal).length > 0);
        // Increment the post count
        postCount ++;
        // Create the post
        posts[postCount] = Post(postCount, _hashawal,_jeniskopi,_petani,_tanam,_keterangan,_tanggal, msg.sender);
        // Trigger event
        emit PostCreated(postCount, _hashawal,_jeniskopi,_petani,_tanam,_keterangan,_tanggal,  msg.sender);
    }



}
