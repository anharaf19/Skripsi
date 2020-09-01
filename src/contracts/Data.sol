pragma solidity ^0.5.0;

contract Data {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string hashawal;
        string hash;
        string email;
        string hakakses;
        string tanggal;
        address  author;
    }


    event PostCreated(
        uint id,
        string hashawal,
        string hash,
        string email,
        string hakakses,
        string tanggal,
        address  author
    );


    constructor() public {
        name = "Anhar Ahyahuda Fitriardi";
    }

    function createPost(string memory _hashawal, string memory _hash, string memory _email,string memory _hakakses,string memory _tanggal) public {
        // Require valid content
        require(bytes(_hashawal).length > 0);
        // Increment the post count
        postCount ++;
        // Create the post
        posts[postCount] = Post(postCount, _hashawal,_hash, _email,_hakakses,_tanggal,msg.sender);
        // Trigger event
        emit PostCreated(postCount, _hashawal,_hash,_email,_hakakses,_tanggal, msg.sender);
    }

}
