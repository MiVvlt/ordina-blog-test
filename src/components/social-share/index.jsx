import React from 'react'
import { FacebookIcon } from './facebook-icon'
import { TwitterIcon } from './twitter-icon'
import { shareToTwitter, shareToFacebook } from '../../utils/share'

import './index.scss'

export const SocialShare = ({ title, authors }) => {
  const text = `Recommend on "${title}" written by @${authors.map((author)=>{ return author.name + ', '})}`

  const onClickTwitterIcon = e => {
    e.preventDefault()

    return shareToTwitter(window.location.href, text)
  }

  const onClickFacebookIcon = e => {
    e.preventDefault()
    return shareToFacebook(window.location.href, text)
  }

  return (
    <div className="social-share">
      {!!window.FB && (<FacebookIcon onClick={onClickFacebookIcon} />)}
      <TwitterIcon onClick={onClickTwitterIcon} />
    </div>
  )
}
