
export class FeedDto {
  realName: string;
  idNo: string;
  phone: string;
  comment: string;
  details: FeedDetails[];
}

export class FeedDetails {
  areaCode: string;

  areaName: string;

  locationCode: string;

  locationName: string;

  imgKey: string;


  coverImgKey: string;

  isVideo: boolean;
}
