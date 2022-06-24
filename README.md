# Stock app

An app that can show stock price action in chart form using JSCharting and Alpha Vantage stock api.

## Features

Multiple charts can be displayed simultaniously.

![Features](/images/Screenshot37.png)

Different stocks can be searched for and then have new graphs constructed for them.

![Features](/images/Screenshot39.png)

Daily prices of the last five months can be viewed by mousing over the graph line. Graphs can also be deleted by clicking the red circle on the top-left.

![Features](/images/Screenshot38.png)

## How to Use

1. Get the api key here: https://www.alphavantage.co/support/#api-key

2. Clone the repo to your machine and install dependencies:

- axios
- cors
- dotenv
- express  
  To do this, enter "npm i (current dependency to be installed)" in the terminal

3. Enter your key into the .env_sample file and rename the file to .env.

4. Start the node server by entering these commands into the terminal:
   "cd server" followed by "node server.js".

5. Now just host the website on your local machine. An easy way to do this is by using the Live Server extension on VS Code.
