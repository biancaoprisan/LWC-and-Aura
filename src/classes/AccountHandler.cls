/**
 * Created by boprisan on 7/7/2022.
 */

public with sharing class AccountHandler {

    public static void insertAccount(Integer nrOfAccounts) {

        List<Account> addAccounts = new List<Account>();
        Integer counter = 1;
        while (counter <= nrOfAccounts) {
            Account newAccount = new Account();
            newAccount.Name = 'Acme Inc '+ counter;
            newAccount.AccountNumber= 'A000'+counter;
            addAccounts.add(newAccount);
            counter++;
        }

        insert addAccounts;
    }
}