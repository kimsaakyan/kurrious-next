import { ITreeNode } from '@/src/types/redux/brain'

export const CheckMaxFolderDepth = (activeFinderFolderData: ITreeNode[]) => {
    const maxLimit = 1
    if (activeFinderFolderData && activeFinderFolderData.length < maxLimit) {
        return true
    }
    return false
}
