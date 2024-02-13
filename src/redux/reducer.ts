import { combineReducers } from 'redux'
import { viewsSlice } from '@/src/redux/slices/views'
import { conversationSlice } from '@/src/redux/slices/conversations'
import { counterSlice } from '@/src/redux/slices/CounterSlice'
import { promptSlice } from '@/src/redux/slices/prompts/index'
import { authSlice } from '@/src/redux/slices/auth/index'
import { companiesSlice } from '@/src/redux/slices/companies/index'
import { brainSlice } from '@/src/redux/slices/brain/index'
import { integrationsSlice } from '@/src/redux/slices/integrations/index'

import { websocketSlice } from '@/src/redux/slices/websocket'
import { usersSlice } from '@/src/redux/slices/users'
import { chatbotMessagesSlice } from '@/src/redux/slices/chatbotMessages'
import { messagesSlice } from '@/src/redux/slices/messages'

const reducer = combineReducers({
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    websocket: websocketSlice.reducer,
    views: viewsSlice.reducer,
    conversations: conversationSlice.reducer,
    prompts: promptSlice.reducer,
    counter: counterSlice.reducer,
    companies: companiesSlice.reducer,
    brain: brainSlice.reducer,
    chatbotMessages: chatbotMessagesSlice.reducer,
    integrations: integrationsSlice.reducer,
    messages: messagesSlice.reducer,
})

export default reducer
