// SPDX-License-Identifier: Nolicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "./JReview.sol";

contract JouralContract is ContextUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _journalIdCounter;
    uint8 constant MAX_APPROVERS = 100;

    JReview public jReview;
    IERC721Upgradeable public govToken;
    uint8 public goal;

    function initialize(
        address _jReviewAddress,
        address _govTokenAddress,
        uint8 _goal
    ) public initializer {
        require(
            MAX_APPROVERS >= _goal,
            "Goal must be less than or equal to 100"
        );
        jReview = JReview(_jReviewAddress);
        govToken = IERC721Upgradeable(_govTokenAddress);
        goal = _goal;
    }

    enum JournalStatus {
        SUBMITTED,
        PUBLISHED
    }

    struct Journal {
        uint256 id;
        JReview.ReviewApplication application;
        address[] approvers;
        uint8 approversCount;
        JournalStatus status;
    }

    // map of journalId to publisher
    mapping(uint256 => address) public publishers;

    // map of publisher to map of journalId to journal
    mapping(address => mapping(uint256 => Journal)) public journals;

    function createJournal(uint256 applicationId) public returns (uint256) {
        // get the application
        JReview.ReviewApplication memory application = jReview.getApplication(
            applicationId
        );

        // make a new journal from application
        uint256 id = _journalIdCounter.current();
        journals[_msgSender()][id] = Journal(
            id,
            application,
            new address[](MAX_APPROVERS),
            0,
            JournalStatus.SUBMITTED
        );
        publishers[id] = _msgSender();
        _journalIdCounter.increment();

        // return entry id
        return id;
    }

    function approveJournal(uint256 journalId) public {
        // get the publisher from journalId
        address publisher = publishers[journalId];
        require(publisher != address(0), "Invalid entry id");

        // check if the approver holds the NFT
        require(govToken.balanceOf(_msgSender()) > 0, "Uauthorized reviewer");

        // approve the entry
        journals[publisher][journalId].approvers.push(_msgSender());

        // increment the approvers count
        journals[publisher][journalId].approversCount++;

        // check if the approvers count is equal to the required approvals
        if (journals[publisher][journalId].approversCount >= goal) {
            journals[publisher][journalId].status = JournalStatus.PUBLISHED;
        }
    }
}
