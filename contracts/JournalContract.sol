// SPDX-License-Identifier: Nolicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import './JReview.sol';

contract JouralContract is ContextUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _journalIdCounter;
    CountersUpgradeable.Counter private _entryIdCounter;
    uint256 private constant MAX_APPROVERS = 100;

    JReview public jReview;
    IERC721Upgradeable public govToken;

    function initialize(address _jReviewAddress, address _govTokenAddress)
        public
        initializer
    {
        jReview = JReview(_jReviewAddress);
        govToken = IERC721Upgradeable(_govTokenAddress);
    }

    enum EntryStatus {
        SUBMITTED,
        PUBLISHED
    }
    struct Entry {
        uint256 id;
        JReview.ReviewApplication application;
        address[] approvers;
        uint8 approversCount;
        EntryStatus status;
    }

    struct Journal {
        uint256 id;
        string name;
        uint8 requiredApprovals;
        // map of publisher => entry id => entry
        mapping(address => mapping(uint256 => Entry)) entries;
    }

    // map between journalid and journal
    mapping(uint256 => Journal) public journals;

    // entry id => publisher
    mapping(uint256 => address) public publishers;

    function createJournal(string memory name) public {
        createJournal(name, 2);
    }

    function createJournal(string memory name, uint8 requiredApprovals) public {
        // set the cap for approvers
        require(requiredApprovals <= MAX_APPROVERS, 'Too many approvers');

        // create the journal
        uint256 id = _journalIdCounter.current();
        journals[id].id = id;
        journals[id].name = name;
        journals[id].requiredApprovals = requiredApprovals;
        _journalIdCounter.increment();
    }

    function createEntry(uint256 journalId, uint256 applicationId)
        public
        returns (uint256)
    {
        // get the application
        JReview.ReviewApplication memory application = jReview.getApplication(
            applicationId
        );

        // check if the application was meant for this journal
        require(
            application.journalId == journalId,
            'Application does not belong to this journal'
        );

        // make a new journal entry from application
        uint256 id = _entryIdCounter.current();
        journals[journalId].entries[_msgSender()][id] = Entry(
            id,
            application,
            new address[](MAX_APPROVERS),
            0,
            EntryStatus.SUBMITTED
        );
        publishers[id] = _msgSender();
        _entryIdCounter.increment();

        // return entry id
        return id;
    }

    function approveSubmission(uint256 journalId, uint256 entryId) public {
        // get the publisher from entryId
        address publisher = publishers[entryId];
        require(publisher != address(0), 'Invalid entry id');

        // check if the approver holds the NFT
        require(govToken.balanceOf(_msgSender()) > 0, 'Uauthorized reviewer');

        // approve the entry
        journals[journalId].entries[publisher][entryId].approvers.push(
            _msgSender()
        );

        // increment the approvers count
        journals[journalId].entries[publisher][entryId].approversCount++;

        // check if the approvers count is equal to the required approvals
        if (
            journals[journalId].entries[publisher][entryId].approversCount >=
            journals[journalId].requiredApprovals
        ) {
            journals[journalId].entries[publisher][entryId].status = EntryStatus
                .PUBLISHED;
        }
    }
}
