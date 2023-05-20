import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const onetimeLink = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { contractId, title, description, imageUrl, nftArray } = req.body

  const options = {
    method: 'POST',
    url: 'https://withpaper.com/api/2022-08-12/checkout-link-intent',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer 90c5576d-96d4-4c2f-a50e-92585a879807',
    },
    data: {
      contractId,
      title,
      description,
      imageUrl,
      expiresInMinutes: 15,
      limitPerTransaction: 5,
      redirectAfterPayment: false,
      sendEmailOnCreation: false,
      requireVerifiedEmail: false,
      quantity: 1,
      metadata: {},
      mintMethod: {
        name: 'claimTo',
        args: { _to: '$WALLET', _quantity: '$QUANTITY', _tokenId: 0 },
        payment: { currency: 'MATIC', value: '0.001 * $QUANTITY' },
      },
      feeBearer: 'BUYER',
      hideNativeMint: false,
      hidePaperWallet: false,
      hideExternalWallet: false,
      hidePayWithCard: false,
      hidePayWithCrypto: false,
      hidePayWithIdeal: true,
      sendEmailOnTransferSucceeded: true,
      contractArgs: { nfts: nftArray },
    },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data)
      return res.status(200).json({ data: response.data })
    })
    .catch(function (error) {
      console.error(error)
      return res.status(404).json({ message: 'An Error Occured', error })
    })
}

export default onetimeLink
