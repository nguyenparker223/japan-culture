import React from 'react'
import {MenuItem} from './MenuItem'
import {useIntl} from 'react-intl'
import { PageTitle } from '../../core'

export function MenuHeader() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.HOME'})} to='/home' />
      <MenuItem title={intl.formatMessage({id: 'MENU.ARTICLE'})} to='/article' />
      <MenuItem title={intl.formatMessage({id: 'MENU.ABOUT_US'})} to='/about-us' />
    </>
  )
}
