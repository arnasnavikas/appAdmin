export interface MyResumeInterface{
    vardas : string,
    amzius : string,
    issilavinimas :string,
    smallPic: string,
    image  : string,
    kita   : string,
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
        price:                 number, 
        type:                  string, 
        input:                 string, 
        iframeURL:             string, 
        iseiga:                number, 
        hidden:                boolean,
        material_price:        number, 
        job_total_price:       number, 
        material_total_price:  number, 
        total_price:           number 
}
 export interface TableHeader  {
    name          : string,          
    job_price     : string,     
    value         : string,         
    material_price: string,
    iseiga        : string,        
    total         : string,         
    iframeURL     : string
}

export interface TableStruct {
    name           : string,
    head           : TableHeader,
    suma           : number,
    total          : number,
    material_total : number,
    work_total     : number   
}
export interface PictureInterface{
    _id         : string,
    description? : string,
    name        : string,
    imgURL      : string,
    size        : number,
    created     : number
    group_id    : string,
    gallery_id  : string,
    folder_name : string,
    gallery_name: string,
    group_folder : string
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
interface address{
    city: string,
    district: string,
    street: string,
    postCode: string
}

export interface MessagesInterface{
    _id: string,
    address?: address,
    confirm: boolean,
    date: string,
    email: string,
    forname?: string,
    group_id?: string,
    message: string,
    mobile?: string,
    name: string,
    suma?: number,
    tableData?: Array<TableStruct>,
    ziuretas: boolean
    atsakymas?: string,
}
