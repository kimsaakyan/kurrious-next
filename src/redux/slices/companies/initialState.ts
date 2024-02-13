import { ICompaniesState } from '@/src/types/redux/companies'

export const getInitialState = (): ICompaniesState => ({
    companiesList: [],
    companySamsaraKey: '',
    companyUsers: null,
    editOrganizationData: null,
    activeFinderId: '',
    isLoadingCompanyUser: false,
    currentCompany: null,
    companyUser: {
        firstName: '',
        lastName: '',
        userName: '',
        phoneNumber: '',
        userType: '',
    },
    loading: {
        companiesList: false,
        createCompany: false,
        updateCompany: false,
        deleteCompany: false,
        updateCompanyStatus: false,
        getCompanySamsaraKey: false,
        addCompanySamsaraKey: false,
        updateCompanySamsaraKey: false,
        addUser: false,
    },
})
