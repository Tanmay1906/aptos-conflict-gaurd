module 0xe57cc832da53b0676291024beae6b66174dada2234034855a9feaded1bccedab::token_transfer {
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::coin;
    use aptos_framework::event::{Self, EventHandle};
    use aptos_std::debug;
    use aptos_std::string::{self, String};

    struct TransferEvent<phantom CoinType> has drop, store {
        sender: address,
        recipient: address,
        amount: u64,
    }

    struct TokenTransferEvents<phantom CoinType> has key {
        transfer_events: EventHandle<TransferEvent<CoinType>>,
    }

    struct CaseEvent has drop, store {
        case_number: String,
        conflict_detected: bool,
        timestamp: u64,
    }

    struct CaseEvents has key {
        events: EventHandle<CaseEvent>,
    }

    const EINSUFFICIENT_BALANCE: u64 = 1;
    const EZERO_AMOUNT: u64 = 2;
    const ENOT_INITIALIZED: u64 = 3;
    const EACCOUNT_NOT_REGISTERED: u64 = 4;
    const EEMPTY_CASE_NUMBER: u64 = 5;

    public fun initialize<CoinType: store>(account: &signer) {
        let addr = signer::address_of(account);
        if (!exists<TokenTransferEvents<CoinType>>(addr)) {
            move_to<TokenTransferEvents<CoinType>>(
                account,
                TokenTransferEvents<CoinType> {
                    transfer_events: account::new_event_handle<TransferEvent<CoinType>>(account),
                },
            );
        };
    }

    fun ensure_case_events(account: &signer) acquires CaseEvents {
        let addr = signer::address_of(account);
        if (!exists<CaseEvents>(addr)) {
            move_to<CaseEvents>(
                account,
                CaseEvents {
                    events: account::new_event_handle<CaseEvent>(account),
                },
            );
        };
    }

    public fun is_initialized<CoinType: store>(account: address): bool {
        exists<TokenTransferEvents<CoinType>>(account)
    }

    public fun has_case_events(account: address): bool {
        exists<CaseEvents>(account)
    }

    public entry fun transfer<CoinType: store>(
        sender: &signer,
        recipient: address,
        amount: u64,
    ) acquires TokenTransferEvents {
        let sender_addr = signer::address_of(sender);

        assert!(amount > 0, EZERO_AMOUNT);
        assert!(coin::is_account_registered<CoinType>(sender_addr), EACCOUNT_NOT_REGISTERED);
        assert!(coin::is_account_registered<CoinType>(recipient), EACCOUNT_NOT_REGISTERED);

        if (!exists<TokenTransferEvents<CoinType>>(sender_addr)) {
            initialize<CoinType>(sender);
        };

        let sender_balance = coin::balance<CoinType>(sender_addr);
        assert!(sender_balance >= amount, EINSUFFICIENT_BALANCE);

        let coins = coin::withdraw<CoinType>(sender, amount);
        coin::deposit<CoinType>(recipient, coins);

        let transfer_events_ref =
            &mut borrow_global_mut<TokenTransferEvents<CoinType>>(sender_addr).transfer_events;
        event::emit_event(
            transfer_events_ref,
            TransferEvent<CoinType> {
                sender: sender_addr,
                recipient,
                amount,
            },
        );

        debug::print(&b"[TokenTransfer] Transfer successful");
    }

    public entry fun record_case(
        sender: &signer,
        case_number: vector<u8>,
        conflict_detected: bool,
    ) acquires CaseEvents {
        assert!(vector::length(&case_number) > 0, EEMPTY_CASE_NUMBER);
        ensure_case_events(sender);

        let addr = signer::address_of(sender);
        let events = &mut borrow_global_mut<CaseEvents>(addr).events;
        event::emit_event(
            events,
            CaseEvent {
                case_number: string::utf8(case_number),
                conflict_detected,
                timestamp: std::timestamp::now_seconds(),
            },
        );

        debug::print(&b"[TokenTransfer] Case recorded");
    }

    #[test_only]
    use aptos_framework::account;
    #[test_only]
    use aptos_framework::aptos_coin::AptosCoin;

    #[test(admin = @0x123)]
    fun test_transfer(admin: &signer) {
        let recipient = @0x456;
        let amount = 1000;

        account::create_account_for_test(signer::address_of(admin));
        account::create_account_for_test(recipient);
        coin::register<AptosCoin>(admin);

        let mint_amount = 10000;
        coin::mint(signer::address_of(admin), mint_amount);

        coin::register<AptosCoin>(&account::create_signer_for_account(recipient));
        transfer<AptosCoin>(admin, recipient, amount);

        assert!(coin::balance<AptosCoin>(signer::address_of(admin)) == mint_amount - amount, 1);
        assert!(coin::balance<AptosCoin>(recipient) == amount, 2);
    }

    #[test(admin = @0x123)]
    fun test_record_case(admin: &signer) {
        record_case(admin, b"CASE-123", false);
        assert!(has_case_events(signer::address_of(admin)), 1);
    }
}