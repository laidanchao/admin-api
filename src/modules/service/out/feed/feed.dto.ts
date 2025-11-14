export class FeedDto {
  id?: number;
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
  id?: number;

  feedId?: number;

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
