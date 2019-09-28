import {UserLogout} from './userAction'
// function updateSiteDetails(data) {
//     return {
//         type: 'updateSiteDetails',
//         payload: data
//     }
// }
//

export const ReceiveSocketAction = (data) => (dispatch, getState) => {
    console.log(data)
    if(data.makingAuthConnection && !data.userAuth){
        dispatch(UserLogout(true))
    }
    // if(data && data.appVersion){
    //     let data={...data,state:false};
    //     const currentVersion = localStorage.getItem('version');
    //     if(data.appVersion!==currentVersion){
    //         if(!currentVersion){
    //             localStorage.setItem('version', data.appVersion);
    //         }else{
    //             data.state=true
    //         }
    //     }
    //     dispatch(changeVersion(data));
    //     dispatch(setSocketConState(true))
    // }
    // if (data.Model) {
    //     let siteDetails = getState().SiteDetails?getState().SiteDetails:{};
    //     let sitesList = getState().CompanySitesList?getState().CompanySitesList:[];
    //     let selectedCompany=getState().UserSelectedCompany.company;
    //     switch (data.Model) {
    //         case 'Sitedomains': applyDomains(siteDetails.siteDomains,data,dispatch);
    //             break;
    //         case 'Backups': applyBackups(siteDetails.backups,data,dispatch);
    //             break;
    //         case 'Sitestatus': applyStatus(siteDetails,sitesList,selectedCompany,data,dispatch);
    //             break;
    //         case 'Searchreplace': applySearchReplace(siteDetails,data,dispatch);
    //             break;
    //         case 'Auditlogs': applyAuditLogs(data,dispatch);
    //             break;
    //         default :
    //             return null
    //     }
    // }
};
