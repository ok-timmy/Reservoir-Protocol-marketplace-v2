import React, { ComponentProps, FC, ReactNode } from 'react'
import { SWRResponse } from 'swr'
import { useNetwork, useSigner } from 'wagmi'
import { BuyModal, BuyStep, useTokens } from '@reservoir0x/reservoir-kit-ui'
import { useSwitchNetwork } from 'wagmi'
import { Button } from 'components/primitives'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { CSS } from '@stitches/react'
import { useMarketplaceChain } from 'hooks'
import { renderPaperCheckoutLink } from '@paperxyz/js-client-sdk'
import axios from 'axios'

type Props = {
  tokenId?: string
  imageId?: string
  contractAddress: string | undefined
  collectionId?: string
  orderId?: string
  buttonCss?: CSS
  buttonProps?: ComponentProps<typeof Button>
  buttonChildren?: ReactNode
  mutate?: SWRResponse['mutate']
}

const BuyNow: FC<Props> = ({
  tokenId,
  imageId,
  contractAddress,
  collectionId,
  orderId = undefined,
  mutate,
  buttonCss,
  buttonProps = {},
  buttonChildren,
}) => {
  const { data: signer } = useSigner()
  const { openConnectModal } = useConnectModal()
  const { chain: activeChain } = useNetwork()
  const marketplaceChain = useMarketplaceChain()
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: marketplaceChain.id,
  })
  const isInTheWrongNetwork = Boolean(
    signer && activeChain?.id !== marketplaceChain.id
  )

  const openCheckout = async(tokens: Array<Object>) => {
   await fetch("http://localhost:3000/api/onetimeLink", {
    
   })
      // renderPaperCheckoutLink({
      //   checkoutLinkUrl: "https://withpaper.com/checkout/...",
      // });
  }

  const trigger = (
    <Button css={buttonCss} color="primary" {...buttonProps}>
      {buttonChildren}
    </Button>
  )
  const canBuy = signer && tokenId && collectionId && !isInTheWrongNetwork

  return !canBuy ? (
    <Button
      css={buttonCss}
      aria-haspopup="dialog"
      color="primary"
      onClick={async () => {
        if (isInTheWrongNetwork && switchNetworkAsync) {
          const chain = await switchNetworkAsync(marketplaceChain.id)
          if (chain.id !== marketplaceChain.id) {
            return false
          }
        }

        if (!signer) {
          openConnectModal?.()
        }
      }}
      {...buttonProps}
    >
      {buttonChildren}
    </Button>
  ) : (
    // <BuyModal
    //   trigger={trigger}
    //   tokenId={tokenId}
    //   collectionId={collectionId}
    //   orderId={orderId}
    //   //CONFIGURABLE: set any fees on top of orders, note that these will only
    //   // apply to native orders (using the reservoir order book) and not to external orders (opensea, blur etc)
    //   // referrer={"0xabc"}
    //   // referrerFeeBps={250}
    //   onClose={(data, stepData, currentStep) => {
    //     if (mutate && currentStep == BuyStep.Complete) mutate()
    //   }}
    // />

    <Button
      css={buttonCss}
      aria-haspopup="dialog"
      color="primary"
      onClick={() => openCheckout([{ token: `${contractAddress}:${tokenId}` }])}
    >
      {buttonChildren}
    </Button>
  )
}

export default BuyNow
