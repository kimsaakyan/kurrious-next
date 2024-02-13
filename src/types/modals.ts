export enum ModalName {
    NONE = '',
    PreviewFileModal = 'PreviewFileModal',
    BrowsePromptsModal = 'BrowsePromptsModal',
    CreateFolderModal = 'CreateFolderModal',
    BrainPromptModal = 'BrainPromptModal',
    ApiTokenModal = 'ApiTokenModal',
    SamsaraKeyModal = 'SamsaraKeyModal',
    DeleteCompanyModal = 'DeleteCompanyModal',
    DeleteConversationModal = 'DeleteConversationModal',
    DeleteFolderOrFileModal = 'DeleteFolderOrFileModal',
    DevToolsModal = 'DevToolsModal',
}

export interface IRole {
    label: string
    value: string
}
