// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var address = 'localhost:3000'

export const environment = {
  production: true,
                  /** upload admin/jobs table 46.101.120.14 */
   table_Upload_Url : 'http://'+address+'/skaiciuokle',
                /** checks if admin is logged in */
           loginUrl : 'http://'+address+'/login',
                /** loads one message */ 
         messageUrl : 'http://'+address+'/message',
                /**   loads all messages */
       _messagesUrl : 'http://'+address+'/messages',
                /** sends mail */
        sendMailUrl : 'http://'+address+'/sendMail',
/***************************** GALLERY  ************************* */
                /** load gallerys */
       get_gallerys : 'http://'+address+'/gallery',
                /** deletes gallery */
   deleteGalleryUrl : 'http://'+address+'/gallery/delete',
                /** creates new gallery */
   createGalleryURL : 'http://'+address+'/gallery/create',
                /** creates new gallery */
 addGalleryDescrURL : 'http://'+address+'/gallery/description',
                /** rename gallery */
   renameGalleryURL : 'http://'+address+'/gallery/rename',
                /** adds index picture to gallery */
        addIndexURL : 'http://'+address+'/addindex',
        /******************************* PICTURES************************** */
        /** upload pitures to gallery */
uploadGalleryPicturesUrl : 'http://'+address+'/picture/upload/',
        /** removes pictures from gallery */
removeGalleryPicture : 'http://'+address+'/picture/delete',
        /** removes pictures from gallery */
addPictureDescription : 'http://'+address+'/picture/add-description',
        /** get pictures by gallery id */
getPicturesUrl : 'http://'+address+'/picture/get-pictures/',

/******************************* GROUP **************************** */
                /** creates new group */
        createGroup : 'http://'+address+'/group/create',
                /** adds group image */
      addGroupCover : 'http://'+address+'/group/add-cover/',
                /** remove group image */
      removeGroupCover : 'http://'+address+'/group/remove-cover/',
             /** adds description to group */
addGroupDescription : 'http://'+address+'/group/add-description',
                /** downloads all groups */
          getGroups : 'http://'+address+'/group/',
                /** delete group */
       group_delete : 'http://'+address+'/group/delete',
                /** rename group */
       group_rename : 'http://'+address+'/group/rename',
/******************************* TABLE **************************** */
                /** cretes new table */
     createTableUrl : 'http://'+address+'/table/create',
                /** get table by group id*/
        getTableUrl : 'http://'+address+'/table/get-one/',
                /** create row in table*/
     addTableRowUrl : 'http://'+address+'/table/add-row/',            
                /** removes row from table*/
   removeTableRowUrl : 'http://'+address+'/table/remove-row', 
                /** save table*/
        saveTableUrl : 'http://'+address+'/table/save', 
/*************************** PRIVATE PICTURES **************************** */
                /** upload pictures */
        upload_pictures : 'http://'+address+'/upload-pictures/',

/******************************* TEAM MEMBER **************************** */
                /** gets specific member  */
getUserUrl : 'http://'+address+'/my-team/',
                /** creates new team member  */
createTeamMemberUrl : 'http://'+address+'/my-team/add-member',
                /** updates team member info  */
updateTeamMemberUrl : 'http://'+address+'/my-team/update-member',
                /** udates team member status  */
updateUserStatusUrl : 'http://'+address+'/my-team/update-status',
                /** updates team member pictures */
addUserPicturesUrl : 'http://'+address+'/my-team/add-pictures/',
                /** updates team member pictures */
removeUserPicturesUrl : 'http://'+address+'/my-team/remove-pictures/',
                /** deletes team member  */
deleteTeamMemberUrl : 'http://'+address+'/my-team/delete-member',
                /** gets all  team members  */
getTeamMemberUrl : 'http://'+address+'/my-team/get-members',
}

