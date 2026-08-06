# Trader Risk Dashboard

A simple dashboard for a trader to check their account performance and figure out, at a glance, whether they're close to breaking any account rules.

Built for the Tradescape assignment.

## How to run it

```bash
git clone <your-repo-url>
cd trader-dashboard
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## What's in here

- Account section — starting balance, current balance
- Risk status — a Safe / Approaching Limit / At Risk banner, plus progress bars for drawdown and daily loss
- Risk budget — see below, this is the extra feature
- Trading performance — total P&L, win rate, wins/losses, largest win/loss
- Trade list — all 5 trades, color coded
- Equity curve — balance over time as each trade lands

All the numbers are calculated from the trade data in `src/data/mockData.js`. Nothing is typed in by hand — if you change the trades or the account numbers, everything on the page updates.

## Stack

React + Vite, recharts for the equity curve chart. No backend, no database, no auth — none of that was needed for this.

## My extra feature: Risk Budget

Everything else on the dashboard tells the trader what's already happened — their P&L, their win rate, how much drawdown room is used up. None of it answers the question a trader actually cares about in the moment: **can I keep trading right now?**

So I added a small "Risk Budget" block that takes the trader's average losing trade size and works out roughly how many more losing trades they could take before hitting their daily loss limit, and separately before hitting their max drawdown. Something like "at your average loss size, you have about 11 more losing trades before you'd hit your daily limit."

It's a small calculation but it changes the dashboard from something you check after the fact to something you'd actually glance at mid-session before deciding whether to take the next trade. That felt like the more useful direction to go in than something purely descriptive like "best trading day," which is interesting but doesn't really change what the trader does next.

## Product questions

**1. What is drawdown in trading?**

Drawdown is how far your balance has dropped from its highest point (peak), not from where you started. If you start at $100k, grow to $110k, then drop to $103k, your drawdown is $7k — even though you're still up $3k overall. It's a measure of how much you've given back from your best point, which is usually what account rules are actually built around.

**2. Why would a trader care about remaining drawdown rather than just their current P&L?**

P&L tells you if you're profitable. It doesn't tell you how much room you have left before your account gets shut down. A trader can be sitting on a healthy profit and still be one or two bad trades away from violating their rules, if that profit came after a bigger peak they've since lost ground from. Remaining drawdown is a forward-looking number — it tells you how much you can afford to lose before things go wrong, which is a much more useful thing to know in the middle of a trading session than "am I currently green."

**3. If I had another day, what would I improve?**

A few things I'd want to fix or add:

- Real timestamps on trades. Right now "daily loss" assumes all 5 trades happened on the same day, which is a fair assumption for this dataset but obviously wouldn't hold up with real data spanning multiple days.
- A way to filter the trade list and equity curve by asset or by date range.
- Persisting trades somewhere (even just localStorage) instead of a static mock array, so the dashboard feels less like a snapshot and more like a live tool.
- Some basic tests around the calculation functions in `calculations.js`, since that's really the part that has to be correct.
- Spend more time on responsive layout — right now it's usable on mobile but I didn't tune it much beyond flex-wrap.