# About this project

 - You should spend about three hours on this.
 - Expect to spend 1.5-2 hours coding on mission 1.
 - Please comment your code where appropriate to help us understand your decision-making.
 - Missions 2 and 3 do not require coding. Instead, write your answers in the text files in the `answers` directory.

# Ledger Lunacy

Suppose you are creating a UI for a bank account that investors use to invest in startups. You only have access to an API
created by the underlying bank.

The problem is that this API is unreliable. The ledger entries may not be in the order in which they actually happened,
they may have duplicate entries, or they may not have all the entries for an investor. There may also be other issues
that you'll discover while developing your solution.

Regardless, your mission is to display the most accurate possible ledger to users.

## Mission 1: Display historical transactions (coding, UX & UI design)

This mission has a few parts:

### 1. Given a ledger, display it in a logical order

Ledgers are defined as JSON files containing a single array. Each object in the array represents one transaction.

Transactions have activity ids, datetimes, amounts, and balances. The balance represents the balance in the investor's
account *after* the transaction has been applied.

Example:

```
[
    {
        "activity_id": "1",
        "date": "2014-10-01T01:00:29+00:00",
        "type": "DEPOSIT",
        "method": "ACH",
        "amount": 1003.75,
        "balance": 1003.75,
        "requester": {
            "type": "INVESTMENT"
        },
        "source": {
            "type": "EXTERNAL",
            "id": 18238147,
            "description": "Chase ** 9867"
        },
        "destination": {
            "type": "INVESTOR",
            "id": 76510190788,
            "description": "Michael Daugherty"
        }
    }
]
```

This ledger has one entry, a deposit. Before this transaction occurred, the investor's balance was $0. After $1003.75
was deposited, the investor's balance was $1003.75.

We offer three different ledgers as examples.

`data/simple_ledger` is just a very basic ledger to get you started.

`data/duplicate_ledger` is a ledger that contains two entries with the same activity_id. Modify the application code to
filter out one of them and display the resulting ledger.

`data/complicated_ledger` has more kinds of errors. Figure out how to transform this into an understandable ledger for our
investors.

### 2. Describe transactions in a human-readable manner

We've included a simplified screenshot of how we displayed ledgers on AngelList. Notice that each transaction has a logical
description like "Deposit from Chase Bank **0978 for your investment in Uber".

Come up with your own logical descriptions for these transactions and display them in the "Description" column of the
transaction table.

![AngelList Investing Account](/angellist_screenshot.png)

### 3. CSS/Style

Write a stylesheet for your application. You can make it look like the AngelList screenshot or just use that as
inspiration.

## Mission 2: UX for depositing & withdrawing funds (writing, UX & UI design)

A bank account is more than just a list of transactions. To be
functional, users should be able to deposit and withdraw funds.

Please write a description of this functionality. You may include wireframes or HTML mockups, if helpful. Some questions to get you started:

- Where do these flows live?
- How does the user discover them?
- What information should we require? How can we simplify?
- Are there any security concerns?

## Mission 3: Customer support (writing)

### 1. Debugging

**Important: Do not read part 2 until you finish this question!**

Congrats! We've now launched your bank account UI and you're on customer
support. You receive the following email:

> Hello,
>
> I wired money for Startup X, and it doesn't show in my account.
>
> Please confirm.
>
> Dr. V. Horrible

How would you start investigating this user's issue? Who would you
talk to and what questions would you ask? What are some hypotheses
and what would falsify them?

Note, we're not looking for a solution for Dr. Horrible's missing
wire here; we're interested to see how you would begin diagnosing the
issue.

### 2. Answering the user

Now, let's assume that the wire was $10k and had been received. It
was appearing in the Bank's API, but our code had a bug that was
filtering it out as we tried to clean the transaction history. This
went on for a week, and we had assumed Dr. Horrible wasn't wiring, so we closed
the deal without him.

Write an email to Dr. Horrible to explain the situation. What else
can we do to help him out?

# Setup

You may use whatever web framework or language you'd like to complete this challenge (just do it 
inside the `website/` directory). The data samples are in `data/` and a sample ledger 
template is in `templates/`.

When finished, please bundle & email us a zip of the results. 
