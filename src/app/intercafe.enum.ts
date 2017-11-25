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
    tables: number,
    name: string,
    imgURL: string,
    route: string,
    description?: string,
    folder_name: string
}
 interface TableRowData  {
     darbo_pavadinimas: string,
    vnt_kaina: number,
    mato_vnt: string,
    input: string,
    suma: number
}
 interface TableHeader  {
     darbo_pavadinimas: string,
    vnt_kaina: string,
    mato_vnt: string,
    input: string,
    suma: string
}

export interface TableStruct {
    tableName : string,
    tableHead: TableHeader,
    tableBody: Array<TableRowData>,
    tableSuma: number
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
