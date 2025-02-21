export interface Reader {
    readerId: number,
    readerName:String,
    readerIp:String,
    readerPort: String,
    readerUsername: String,
    readerPassword: String,
    readerSecret?: String,
    readerCookies?: String
}
