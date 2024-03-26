# https://docs.infura.io/tutorials/ethereum/subscribe-to-pending-transactions
import asyncio
import json
import requests
from web3 import Web3
from websockets import connect

infura_ws_url = 'wss://goerli.infura.io/ws/v3/XXX'
infura_http_url = 'https://goerli.infura.io/v3/XXX'
web3 = Web3(Web3.HTTPProvider(infura_http_url))

target = '0xF92ec1B0ad75721e3A12ad9e67759353d6518F74'

async def get_event():
    async with connect(infura_ws_url) as ws:
        await ws.send('{"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}')
        subscription_response = await ws.recv()
        print(subscription_response)

        while True:
            try:
                message = await asyncio.wait_for(ws.recv(), timeout=15)
                response = json.loads(message)
                txHash = response['params']['result']

                # Monitor transactions to a specific address
                tx = web3.eth.get_transaction(txHash)
                if tx.to == target:
                    print(tx)
                # print("Pending transaction found with the following details:", {
                #     "hash": txHash,
                #     "from": tx["from"],
                #     "value": web3.fromWei(tx["value"], 'ether')
                # })
                pass
            except:
                pass

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    while True:
        loop.run_until_complete(get_event())