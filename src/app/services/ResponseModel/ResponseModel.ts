export interface ResponseModel {

  status: boolean,
  data: any[],
  statusCode: Number,
  internalMessage: string,
  intlCode: Number
  error:''
  percentData:any
}

export interface YoutubeData {
  Id: number,
  title:string;
  linkType: number,
  youtubeLink: string,
  userId: number,
  createdAt: string,
  userName: string,
  profilePic: string
}
