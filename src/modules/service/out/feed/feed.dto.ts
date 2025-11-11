export class FeedDto {
  clientId: number;
  realName: string;
  idNo: string;
  phone: string;
  city: string;
  serviceArea: string;
  direction: string;
  comment: string;
  location: string;
  visitedAt: Date;
  selfImgKey: string;
  selfImgUrl: string;
  details: FeedDetails[];
}

export class FeedDetails {
  areaCode: string;

  areaName: string;

  locationCode: string;

  locationName: string;

  imgKey: string;

  imgUrl: string;

  coverImgKey: string;

  coverImgUrl: string;

  isVideo: boolean;
}
