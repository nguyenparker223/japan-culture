import {Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Private} from './components/Private'
import {Group} from './components/Group'
import {Drawer} from './components/Drawer'
import {useAuth} from "../../auth";
import {useEffect, useState} from "react";
import {StompSessionProvider} from "react-stomp-hooks";
import {ChatProvider} from "./core/ChatProvider.tsx";

const chatBreadCrumbs: Array<PageLink> = [
  {
    title: 'Chat',
    path: '/apps/chat/private-chat',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ChatPage = () => {
  const { auth } = useAuth()
  const authToken = auth?.id_token
  const navigateFunction = useNavigate()
  const WS_URL = import.meta.env.VITE_APP_WS_URL

  useEffect(() => {
    if (!auth || !authToken) {
      navigateFunction("/dashboard")
    }
  }, [])

  const url = `${WS_URL}/websocket/tracker?access_token=${authToken}`

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='private-chat'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Private chat</PageTitle>
              <StompSessionProvider url={url} onWebSocketError={(e) => {
                console.error('Connection private failed', e)
              }} onConnect={(e) => {
                console.log('Connection private established', e)
              }}>
                <ChatProvider>
                  <Private botId={'01HMDMWAPSE51M1KHT2D4NQP6P'} />
                </ChatProvider>
              </StompSessionProvider>
            </>
          }
        />
        <Route
          path='group-chat'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Group chat</PageTitle>
              <Group />
            </>
          }
        />
        <Route
          path='drawer-chat'
          element={
            <>
              <PageTitle breadcrumbs={chatBreadCrumbs}>Drawer chat</PageTitle>
              <Drawer />
            </>
          }
        />
        <Route index element={<Navigate to='/apps/chat/private-chat' />} />
      </Route>
    </Routes>
  )
}

export default ChatPage
