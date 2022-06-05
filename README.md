# Welcome to my application template.

This folder already is a Git repository.
.gitignore has been configured.

The following dependencies have been added and configured:
Sass,
Bootstrap,
react-router-dom,
axios

Code used from:
https://github.com/Clariity/react-chessboard
https://github.com/jhlywa/chess.js/blob/master/README.md

---

Creating a GitHub page: (use Horeku)
Adjust package.json to include homepage, predeploy and deploy.
npm i -D gh-pages

Create a gh-pages branch in your repository.
Go to repository settings -> pages -> 
    set source to gh-pages branch and /root


When pushing new code, remember to execute npm run deploy to update the gh-pages branch.

---

Mental note of where I want to go with this.

A chess game with the following functionalities:
2 players, each able to move their respective color chess pieces.

White goes first, alternating turns.

MVP:
Game is over when players click "end game"
No enforcement of how pieces can move
Only enforcement is pieces cannot leave the board.
Board generated with ?? CSS?
Two Java classes will hold the data of which piece is where.

Host on GitHub Pages.

Add authentication.

Add turn takebacks.
Add spectating.

Add tests.

### --- brain storming section ---

I truly wish for my own tokens to have a TRUE price floor (Jade since 29/01/22) with USABILITY with Metis' vision of ease-of-access (Vault-As-A-Service).
A large amount (all if possible) of profits generated by my platform(s) will go to increasing the price floor of my token.
The price floor will be enforced by a STABLECOIN - NO RISKS WILL BE TAKEN.
A vault will hold stablecoin to buy back ALL tokens in circulation at NO COST (besides transaction fees) for any sellers.
Tokens purchased by The Price Floor Vault WILL ALL BE BURNED.

How the vault will be populated:
(Hypothetical numbers)
90% of the [EcosystemToken] in profits will be swapped for [StableCoin] to be kept in The Price Floor Vault.
90% of the platform's profits will be swapped for [StableCoin] to be kept in The Price Floor Vault.
10% of The Price Floor Vault's total profits will be risked with other diversified investments, f.ex.: other DAO's/DAC's (which & how to be voted by community), (DeltaNeutral) staking pools, trading algorithm, ...
95% of the profits generated by diversified investments will be used for increasing The Price Floor Vault.
-- An algorithm will exist where, after earning a certain amount of value, the diversified investment's profits will get unloaded into The Price Floor Vault.

Staking pools will be created for supporting the platform.
Metis allows for staking of Metis. If Metis grows, that would be a super safe staking pool.
90% of the profits from this staking action (Breaker Token / [EcosystemToken]) will be distributed to the user while 10% will go to populating The Price Floor Vault.

Deflationary token burning will be done.
Staking will allow for auto-compounding.

How and why minting will be done:
A Staking pool for minting new tokens will be created.
Staking in this pool commits you to The Price Floor Vault.
You can NOT unstake this investment until your profits have generated enough value for you to withdraw at NO RISK to The Price Floor Vault.
You will receive a part of this staking pool's profits fairly according to your investment.
This staking pool will hold a mini fund in your name. Once your profits are equal your exact investment to The Price Floor Vault you may unstake those profits any time at no cost (txn fees apply).
Profits will consist of: 
 1. Breaker Tokens minted by your profits for the Staking Pool.
 2. Metis tokens generated by your profits in the Staking Pool.
 3. A free NFT which signifies your contribution to The Price Floor Vault. (Duration NFT's?)
 4. Profits generated by your NFT (see The NFT Ecosystem)

A Staking Pool will be created for 
Other DACs and DAOs will be able to partake in this project by staking.

The NFT Ecosystem:
NFTs will always be owned by yourself as designed by the Metis NFT system.
10% of all purchases made by your original NFT will go to increasing The Price Floor Vault.
(100$ paid for your NFT -> 90$ to you, 10$ to The Price Floor Vault)

.. NFT Nodes with a USD-starting-value in form of a "Node-Contributor-To-The-Price-Floor-Vault"? ..
Nodes can be minted with any starting_value (more than 1$).
Starting value will be kept on the side for you to allow the burning of your Node with a 1:1 return-of-investment in USD value plus your nodes' generated profits.
Nodes can be sold in the market place, generating value to The Price Floor Vault.
Nodes can be auto-compounded.
Nodes can be sold to The Price Floor Vault once they generate an exact amount in profits.
Nodes sold to The Price Floor Vault will be burned.
Thus, generating an exact investment in USD to the ecosystem for small-time-investors at no risk.

Why Metis?
Metis makes this possible.
Metis creates an [Ecosystem] with practically no transaction fees, yet enough to supply a profit stream.
This allows my mini ecosystem to require no initial profit stream as well as no final profit stream (if the platform would die).
Once the mini-ecosystem picks up it can start generating an income stream of its own along with the increased profit stream from Metis.
The larger my system, the larger their system.
Attached in profit stream, detached in value.
Metis crash? The Price Floor Vault will always cover your initial safe investments (section save investments) for the Web 2.0 users.
Web 3.0 users will have calculations for when their initial investment unlocks.

How the mini-ecosystem will guarantee unlock dates:
If the system were to completely die: 
 - How much profit the mini-ecosystem receive from the [Ecosystem] (staking rewards).
 - How much profit the mini-ecosystem would receive from its own SAFE investments.
 - How much minting can The Price Floor Vault can allow before it would be at risk.

The worst case would be that Metis dies, my system dies AND all investments die.
EVEN NOW I want to guarantee your return-of-investment. How?
I want to make a platform that I can personally safely invest into.
I will be a true user of my own platform. This is where I promise my decentralization from The Breaker Project.
"Stop using Web 3.0. It's too confusing. Let's make Web 2.5 happen. Together." -> The Web 2.5 Project

.. This needs expanding, I need more reasons. I want it to be TRULY SAFE AT NO RISK.

90% of all donations will go to expanding The Price Floor Vault to be used ONLY for buybacks.
If you buy the token at 10$, and never sell it again.
When you want to sell your 10$ it might be worth 50$. (Tokens, NFT's, Nodes)
Let's say you never sold your 10$ for 50$ so you held on to it and the token crashes in value.
You will always receive 10$ for your 10$ investment. It will be kept on the side for you, and only for you.
How? Your tokens will be given a starting_value. When a token is minted, it will be minted with a starting value which will be kept on the side in The Price Floor Vault for your token's value.
You can only lose if you buy from the open market. If you buy it from the platform you CAN NOT lose your investment.

# --- Iniitial contributions to creating The Breaker Project ---
Buisness partners and contributors to The Breaker Project will be decentralized.
If a contributing party would apply to The Breaker Project:

An initial donation will be done to generate a fair 1-year salary for: 2 developers.

This 1 year salary will be used to set up a staking pool to start The Price Floor Vault.
If they fail to do so, all code will be open source for others to attempt.

MVP of The Breaker Project's Price Floor Vault:
A USD staking pool which allows you to get a 100% return-of-investment.
No profit? No problem.


I get a 15k loan to cover 1 year of working full time on The Breaker Project.
Any donations, contributions or profits above this number for the first year will go to The Price Floor Vault.
You will not get your 15k loan back. (can we fix this? staking a loan?)
If The Price Floor Vault would be able to cover a new contributing party to the system, they will be allowed to invest an equal amount of what The Price Vault can afford for their contribution.
If you contribute 100$ to The Breaker Project, you will only be allowed to contribute your 100$ if the profits and donations generated by the community can afford it.
If the pool never receives enough profits to accept contributions and I fail to create the ecosystem in 1 year then all code will be open source for others to attempt.
The GitHub will be public and accepting free code donations voted upon by the community.
You will see weekly activity by myself, contributing to the GitHub repository so you can track my progress and tell me if I make mistakes.
I will code this together with a community of programmers on a Twitch Stream, with the hopes that any profits from this stream will cover my initially received donations so I can attempt to make even this donation as safe as possible.
Tune in to The Breaker Project on Twitch.tv at twitch.tv/the-breaker-project
A community will be requested to create Youtube tutorials for all the code happening on my Github repository so new programmers can learn and hopefully contribute to The Breaker Project freely.
Code donations will increase the value of The Breaker System exponentially.
The first project on The Breaker System will be Chesserz.

If you, a new party, wanted to contribute to The Breaker System but could not afford the time and you were to take a loan from the bank.
You would invest this loan into The Breaker Project's Prive Floor Vault.
This money will always be returned to you at a 1:1.
You will only be allowed to contribute if The Price Floor Vault can already pay you back 1:1.
IF your contribution is in a USD value and it gets accepted, and you fail to contribute in code, your contribution will be paid in full so you can pay off your loan.
Your only true loss will be the % at which your loan was taken from the bank. This is your only risk.

A new contribution will only be accepted once The Price Floor Vault would be able to cover (generated by donations (and profits later on)) your contribution.

If you want to join my ecosystem and The Price Vault is larger 0$ you will be allowed to contribute (at a value decided by yourself) up to the size of The Price Floor Vault.
Vault size: 1000$
You contribute: 1000$

Vault size: 2000$ (generating staking profits)

If you fail: return 1000$
Vault size: 1000$ (+ profits from staking)

IF you succeed: return 1000$
Vault size: 1000$ (+ profits from staking)

The Breaker Project's value: your code contribution.

This way I can outsource the functionalities of the ecosystem (market place, nodes, ...)
If their contribution to The Price Floor Vault were to fail (rug pull?) our ecosystem would not get touched.
Audits of ALL SYSTEMS contributing to the project will be done BY THE COMMUNITY.
A DAO-like system of accepting and denying contributions will be built by Governance voting.

Governance will be given to donors of the platform (1 donation = 1 token. Size does not matter.)
If you're rich and want more power, you'll have to go through a lot more hassle than just buying 1.

Governance tokens will not be sellable any where else than the open market place and have no actual value.
They are donations to The Breaker System.

Those donations will be staked on the main [Ecosystem] generating a start for The Price Floor Vault. (how to do this safely?)
If you invest a donation (even if you took a loan from a physical bank) it will be kept on the side for your exact return-of-investment.
ALL Metis profits will be 

--- What I have 1 year to create ---
Governance token with voting platform which enables code contributions to the ecosystem.
Governance tokens purchased will go DIRECTLY to The Price Floor Vault and will NOT be repurchasable.
Only donors are taking a risk.

Add Solid? https://www.youtube.com/watch?v=hw3Bx5vxKl0&list=PL79cCuKIPiehhSFedeWNTENHHJkRFve6s&index=61&ab_channel=Fireship