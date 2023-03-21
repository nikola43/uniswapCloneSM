// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Token is ERC20, ERC20Burnable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 supply,
        address to
    ) ERC20(name, symbol) {
        _mint(to, supply * 10 ** decimals());
    }
}
