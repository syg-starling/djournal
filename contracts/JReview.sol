// SPDX-License-Identifier: Nolicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract JReview is ContextUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _idCounter;

    IERC721Upgradeable public govToken;
    IERC20Upgradeable public jToken;
    uint256 private constant MAX_REVIEWS = 100;

    enum ReviewStatus {
        SUBMITTED,
        REVIEWED
    }
    struct ReviewApplication {
        uint256 id;
        uint256 journalId;
        uint256 bounty;
        address[] reviewers;
        uint8 reviewerCount;
        ReviewStatus status;
    }

    // map of reviewId to submitter
    mapping(uint256 => address) public submitters;

    // map of submitter to map of review_id to application
    mapping(address => mapping(uint256 => ReviewApplication)) public reviews;

    function initialize(address _govTokenAddress, address _jTokenAddress)
        public
        initializer
    {
        govToken = IERC721Upgradeable(_govTokenAddress);
        jToken = IERC20Upgradeable(_jTokenAddress);
    }

    function submitApplication(uint256 journalId, uint256 bounty)
        public
        returns (uint256)
    {
        // get the submitter address
        address submitter = _msgSender();

        // check if the bounty is greater than balance
        require(
            jToken.balanceOf(submitter) >= bounty,
            "Insufficient J Token balance"
        );

        jToken.transferFrom(_msgSender(), address(this), bounty);

        uint256 id = _idCounter.current();
        _idCounter.increment();

        // save the application
        reviews[submitter][id] = ReviewApplication(
            id,
            journalId,
            bounty,
            new address[](MAX_REVIEWS),
            0,
            ReviewStatus.SUBMITTED
        );

        submitters[id] = submitter;
        return id;
    }

    function submitReview(uint256 id) public {
        // get the reviewer address
        address reviewer = _msgSender();

        // check if the reviewer holds the NFT
        require(govToken.balanceOf(reviewer) > 0, "Uauthorized reviewer");

        address submitter = submitters[id];

        // check if the publisher address exists
        require(submitter != address(0), "Invalid application id");

        // add the reviewer to the application
        reviews[submitter][id].reviewers.push(reviewer);
        reviews[submitter][id].reviewerCount++;
    }

    function releaseBounty(uint256 id) public {
        address submitter = submitters[id];

        // check if the application exists
        require(submitter != address(0), "Invalid application id");

        // check if the submitter is the same as the sender
        require(_msgSender() == submitter, "Unauthorized to release bounty");

        // check if there are any reviews
        require(reviews[submitter][id].reviewerCount > 0, "No reviewers found");

        // if there is any bounty, release it
        if (reviews[submitter][id].bounty > 0) {
            uint256 amountToPay = reviews[submitter][id].bounty /
                reviews[submitter][id].reviewerCount;
            uint256 counter = 0;

            for (
                counter = 0;
                counter < reviews[submitter][id].reviewerCount;
                counter++
            ) {
                address reviewer = reviews[submitter][id].reviewers[counter];
                jToken.transfer(reviewer, amountToPay);
            }
        }

        // update the status of the applicatio
        reviews[submitter][id].status = ReviewStatus.REVIEWED;
    }

    function getApplication(uint256 id)
        public
        view
        returns (ReviewApplication memory)
    {
        address submitter = submitters[id];

        // check if the application exists
        require(submitter != address(0), "Invalid application id");
        return reviews[submitter][id];
    }

    function setToken(address _token) public {
        jToken = IERC20Upgradeable(_token);
    }
}
