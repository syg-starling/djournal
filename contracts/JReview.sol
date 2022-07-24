// SPDX-License-Identifier: Nolicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract JReview is Context {
    IERC721 private immutable govToken;
    IERC20 private immutable jToken;
    uint constant maxReviews = 100;

    constructor(IERC721 govTokenAddress, IERC20 jTokenAddress) {
        govToken = govTokenAddress;
        jToken = jTokenAddress;
    }

    enum ReviewStatus {
        SUBMITTED,
        REVIEWED
    }
    struct ReviewApplication {
        string applicationUuid;
        string journalUuid;
        uint256 bounty;
        address[] reviewers;
        uint8 reviewerCount;
        ReviewStatus status;
    }

    // map of review_id to submitter
    mapping(string => address) _submitter;

    // map of submitter to map of review_id to application
    mapping(address => mapping(string => ReviewApplication)) _reviews;

    function submitApplication(
        string memory applicationUuid,
        uint256 bounty,
        string memory journalUuid
    ) public {
        // get the submitter address
        address submitter = _msgSender();

        // check if the bounty is greater than balance
        require(
            jToken.balanceOf(submitter) >= bounty,
            "Insufficient J Token balance"
        );

        jToken.transfer

        // save the application
        _reviews[submitter][applicationUuid] = ReviewApplication(
            applicationUuid,
            journalUuid,
            bounty,
            new address[](maxReviews),
            0,
            ReviewStatus.SUBMITTED
        );

        _submitter[applicationUuid] = submitter;
    }

    function submitReview(string memory applicationUuid) public {
        // get the reviewer address
        address reviewer = _msgSender();

        // check if the reviewer holds the NFT
        require(govToken.balanceOf(reviewer) > 0, "Uauthorized reviewer");

        address submitter = _submitter[applicationUuid];

        // check if the publisher address exists
        require(submitter != address(0), "Invalid application id");

        // add the reviewer to the application
        _reviews[submitter][applicationUuid].reviewers.push(reviewer);
        _reviews[submitter][applicationUuid].reviewerCount++;
    }

    function releaseBounty(string memory applicationUuid) public {
        address submitter = _submitter[applicationUuid];

        // check if the application exists
        require(submitter != address(0), "Invalid application id");

        // check if the submitter is the same as the sender
        require(_msgSender() == submitter, "Unauthorized to release bounty");

        // check if there are any reviews
        require(
            _reviews[submitter][applicationUuid].reviewerCount > 0,
            "No reviewers found"
        );

        // if there is any bounty, release it
        if (_reviews[submitter][applicationUuid].bounty > 0) {
            uint256 amountToPay = _reviews[submitter][applicationUuid].bounty /
                _reviews[submitter][applicationUuid].reviewerCount;
            uint counter = 0;

            for (
                counter = 0;
                counter < _reviews[submitter][applicationUuid].reviewerCount;
                counter++
            ) {
                address reviewer = _reviews[submitter][applicationUuid]
                    .reviewers[counter];
                jToken.transfer(reviewer, amountToPay);
            }
        }

        // update the status of the applicatio
        _reviews[submitter][applicationUuid].status = ReviewStatus.REVIEWED;
    }
}
