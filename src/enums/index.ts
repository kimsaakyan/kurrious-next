export enum SeveritiesType {
    success = 'success',
    error = 'error',
    info = 'info',
    warning = 'warning',
}

export enum LanuageModelListStatus {
    previous = 'previous',
    next = 'next',
    current = 'current',
}

export enum PromptCategoryEnum {
    Text = 'text',
    Files = 'files',
    Website = 'website',
    Custom = 'custom',
    ContentSeo = 'content/seo',
    EmailMarketing = 'email marketing',
    PrCommunications = 'pr/communication',
    PaidAds = 'paid ads',
    Recruiting = 'recruiting',
    Sales = 'sales',
    SocialMedia = 'social media',
}

export enum FileTypes {
    FILE = 'file',
    TXT = 'txt',
    XLSX = 'xlsx',
    XLS = 'xls',
    URL = 'url',
    WORD = 'doc',
    FOLDER = 'folder',
    PDF = 'pdf',
    JPG = 'jpg',
    PNG = 'png',
}

export enum MessageActions {
    stopGenerating = 'stop',
}

export enum AccountStatus {
    active = 'ACTIVE',
    pending = 'PENDING',
    deactivate = 'DEACTIVATE',
}

export enum SenderType {
    DISPATCH = 'dispatch',
    DRIVER = 'driver',
}
