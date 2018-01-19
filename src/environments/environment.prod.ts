var address = 'http://139.59.134.47:81/api'

export const environment = {
  production: true,
  loginRedirectUrl : "http://139.59.134.47:81/#/loading",
                /**   loads user new  messages */
     getNewMessageslUrl : address+'/mail/new/',
                 /**   loads user new  messages */
     getAllMessageslUrl : address+'/mail/all/',
                /**   loads user readed  messages */
     getReadedMessageslUrl : address+'/mail/readed/',   
                  /**   loads user new  messages */
 getAnsweredMessageslUrl : address+'/mail/replayed/',
                /**   loads one message */
   getUserMessageUrl : address+'/mail/message/',
                /** marks message as readed */
   markAsReaded : address+'/mail/readed-message/',
                /** marks message as readed */
    answerMessageUrl : address+'/mail/reply/',
             /** send answer message to client */
   sendMessageUrl : address+'/mail/send-answer/',
   /** send answer message to client */
  deleteMessagesUrl : address+'/mail/delete',
/***************************** GALLERY  ************************* */
                /** load gallerys */
       get_gallerys : address+'/gallery',
                /** deletes gallery */
   deleteGalleryUrl : address+'/gallery/delete',
                /** creates new gallery */
   createGalleryURL : address+'/gallery/create',
                /** creates new gallery */
 addGalleryDescrURL : address+'/gallery/description',
                /** rename gallery */
   renameGalleryURL : address+'/gallery/rename',
                /** adds index picture to gallery */
        addIndexURL : address+'/addindex',
        /******************************* PICTURES************************** */
        /** upload pitures to gallery */
uploadGalleryPicturesUrl : address+'/picture/upload/',
        /** removes pictures from gallery */
removeGalleryPicture : address+'/picture/delete',
        /** removes pictures from gallery */
addPictureDescription : address+'/picture/add-description',
        /** get pictures by gallery id */
getPicturesUrl : address+'/picture/get-pictures/',
        /** get pictures by gallery id */
addGalleryCoverUrl : address+'/picture/add-cover',

/******************************* GROUP **************************** */
                /** creates new group */
        createGroup : address+'/group/create',
                /** adds group image */
      addGroupCover : address+'/group/add-cover/',
                /** remove group image */
      removeGroupCover : address+'/group/remove-cover/',
             /** adds description to group */
addGroupDescription : address+'/group/add-description',
                /** downloads all groups */
          getGroups : address+'/group/',
                /** delete group */
       group_delete : address+'/group/delete',
                /** rename group */
       group_rename : address+'/group/rename',
/******************************* TABLE **************************** */
                /** cretes new table */
     createTableUrl : address+'/table/create',
                /** get table by group id*/
        getTableUrl : address+'/table/get-one/',
                /** create row in table*/
     addTableRowUrl : address+'/table/add-row/',            
                /** removes row from table*/
   removeTableRowUrl : address+'/table/remove-row', 
                /** save table*/
        saveTableUrl : address+'/table/save', 
/*************************** PRIVATE PICTURES **************************** */
                /** upload pictures */
        upload_pictures : address+'/upload-pictures/',

/******************************* TEAM MEMBER **************************** */
                /** gets specific member  */
getUserUrl : address+'/my-team/',
                /** creates new team member  */
createTeamMemberUrl : address+'/my-team/add-member',
                /** updates team member info  */
updateTeamMemberUrl : address+'/my-team/update-member',
                /** udates team member status  */
updateUserStatusUrl : address+'/my-team/update-status',
                /** updates team member pictures */
addUserPicturesUrl : address+'/my-team/add-pictures/',
                /** updates team member pictures */
removeUserPicturesUrl : address+'/my-team/remove-pictures/',
                /** deletes team member  */
deleteTeamMemberUrl : address+'/my-team/delete-member',
                /** gets all  team members  */
getTeamMemberUrl : address+'/my-team/get-members',
}
