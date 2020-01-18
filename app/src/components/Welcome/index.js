import React from 'react'
import { Button, GU, textStyle, useTheme } from '@aragon/ui'

import Logo from '../../assets/logo.svg'

export default function Welcome() {
  const theme = useTheme()

  return (
    <div
      css={`
        background: #ffffff;
        margin-bottom: ${2 * GU}px;
        border-radius: ${0.5 * GU}px;
        display: flex;
        align-items: center;
        // flex-wrap: wrap;
      `}
    >
      <img src={Logo} />
      <div
        css={`
          padding-right: ${4 * GU}px;
          padding-left: ${4 * GU}px;
          width: 550px;
        `}
      >
        <h1
          css={`
            ${textStyle('title1')}
            font-weight: 200;
            margin-bottom: ${1 * GU}px;
          `}
        >
          Welcome to the Auction
        </h1>
        <p
          css={`
            ${textStyle('body1')}
            // color: ${theme.contentSecondary};
            text-align: justify;
            margin-bottom: ${3 * GU}px;
          `}
        >
           Here you can get GOLs tokens and then participate in the governance of cyber~Foundation DAO. 
           After round's end, you may claim GOLs and then get 1-to-1 your EULs in Cyber with vesting your GOLs till the end of the auction.
        </p>
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <Button 
            label="FAQ" 
            css={`
              margin-right: ${1.5 * GU}px;
              width: 150px;
            `} 
          />
          <Button label="Code" css="width: 150px;" />
        </div>
      </div>
    </div>
  )
}