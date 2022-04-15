// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "./ERC20StorageLib.sol";
import "../../libraries/LibDiamond.sol";

contract ERC20 is IERC20 {
    /**
     * @dev Returns the name of the token
     */
    function name() public view override returns (string memory) {
        return ERC20StorageLib.getERC20Storage().name;
    }

    /**
     * @dev Returns the symbol of the token
     */
    function symbol() public view override returns (string memory) {
        return ERC20StorageLib.getERC20Storage().symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return ERC20StorageLib.getERC20Storage().totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return ERC20StorageLib.getERC20Storage().balances[account];
    }

    function allowance(address owner, address spender)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return ERC20StorageLib.getERC20Storage().allowances[owner][spender];
    }

    /**
     * @dev specify the initial minting of ERC20 tokens with the diamond storage
     * @param _supply the mint supply of ERC20 tokens
     * @param _name the name of the token
     * @param _symbol the symbol of the token
     */
    function initialize(
        uint256 _supply,
        string memory _name,
        string memory _symbol
    ) external override {
        LibDiamond.DiamondStorage storage ds = LibDiamond.getDiamondStorage();
        ERC20StorageLib.ERC20Storage storage e20 = ERC20StorageLib
            .getERC20Storage();

        require(
            bytes(e20.name).length == 0 && bytes(e20.symbol).length == 0,
            "Can't change the name of ERC20 token after initialization"
        );

        require(
            bytes(_name).length != 0 && bytes(_symbol).length != 0,
            "Invalid name and/or symbol"
        );

        require(
            msg.sender == ds.contractOwner,
            "You're not allowed to do this"
        );

        _mint(msg.sender, _supply);

        e20.name = _name;
        e20.symbol = _symbol;
    }

    function transfer(address to, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        _transfer(msg.sender, to, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `amount`.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        _spendAllowance(from, msg.sender, amount);
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        _approve(msg.sender, spender, amount);
        return true;
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        ERC20StorageLib.ERC20Storage storage e20 = ERC20StorageLib
            .getERC20Storage();

        e20.totalSupply += amount;
        e20.balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        ERC20StorageLib.ERC20Storage storage e20 = ERC20StorageLib
            .getERC20Storage();

        uint256 accountBalance = e20.balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            e20.balances[account] = accountBalance - amount;
        }
        e20.totalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        ERC20StorageLib.ERC20Storage storage e20 = ERC20StorageLib
            .getERC20Storage();
        e20.allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Spend `amount` form the allowance of `owner` toward `spender`.
     *
     * Does not update the allowance amount in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Might emit an {Approval} event.
     */
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(
                currentAllowance >= amount,
                "ERC20: insufficient allowance"
            );
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal {
        ERC20StorageLib.ERC20Storage storage e20 = ERC20StorageLib
            .getERC20Storage();
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        uint256 fromBalance = e20.balances[from];
        require(
            fromBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        unchecked {
            e20.balances[from] = fromBalance - amount;
        }
        e20.balances[to] += amount;

        emit Transfer(from, to, amount);
    }
}
