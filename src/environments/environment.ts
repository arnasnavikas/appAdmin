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
             /** loads gallerys */
             url : 'http://'+address+'/galerija',
             /** deletes gallery */
deleteGalleryUrl : 'http://'+address+'/galleryDelete',
             /** creates new gallery */
createGalleryURL : 'http://'+address+'/new_gallery',
             /** adds index picture to gallery */
     addIndexURL : 'http://'+address+'/addindex',
             /** adds picture to gallery */
   addPictureUrl : 'http://'+address+'/addPictures/',
             /** creates new group */
     createGroup : 'http://'+address+'/create-group',
             /** downloads all groups */
       getGroups : 'http://'+address+'/create-group',
             /** load gallerys */
    get_gallerys : 'http://'+address+'/get-gallerys',
             /** load gallerys */
    get_pictures : 'http://'+address+'/get-pictures',
             /** delete group */
    group_delete : 'http://'+address+'/group-delete',
             /** rename group */
    group_rename : 'http://'+address+'/group-rename',
             /** upload pictures */
 upload_pictures : 'http://'+address+'/upload-pictures',
             /** save 'apie mane' form */
    save_my_info : 'http://'+address+'/create-resume',
}

