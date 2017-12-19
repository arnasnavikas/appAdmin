export interface TeamMemberInterfase{
    _id? :     string,
    name:      string,     
    forname:   string,  
    age:       number,     
    phone:      string,
    email:      string, 
    images:    PictureInterface[],   
    profesion: string,
    hobby:     string ,
    status:   number,
    message:  string,
    date?:     Date,
    days_left:  number;  
    folder_name: string
}

export interface GroupInterface{
    _v?: number,
    _id?: string,
    newMessages?: number,
    gallerys: number,
    table_name: number,
    name: string,
    imgURL: string,
    route: string,
    description?: string,
    folder_name: string
}
 export interface TableRow  {
        _id:                   string,
        group_id:              string,
        name:                  string, 
        search_name:           string,
        price:                 number, 
        type:                  string, 
        input:                 number, 
        iframeURL:             string, 
        iseiga:                number, 
        iseiga_type:           string, 
        hidden:                boolean,
        material_price:        number, 
        job_total_price:       number, 
        material_total_price:  number, 
        total_price:           number 
}

export interface PictureInterface{
    _id?         : string,
    description? : string,
    name        : string,
    imgURL      : string,
    size?        : number,
    created?     : number
    group_id?    : string,
    gallery_id?  : string,
    folder_name? : string,
    gallery_name?: string,
    group_folder? : string,
    gallery_cover : boolean
}

export interface GalerijaInterface{
    _v: number,
    _id: string,
    group_id : string,
    group_folder: string,
    description: string,
    gallery_images: number,
    birth_time: number,
    name: string,
    index_img? : string,
    route: string,
    folder_name: string
}


export interface MessagesInterface{
    _id: string,
    user_id : string,
    name    : string,
    email   : string,
    message : string,
    address : string,
    date    : Date,
    newMail : boolean,
    answer  : string,
    samata  : TableRow[],
}