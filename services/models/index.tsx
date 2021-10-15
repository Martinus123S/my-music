export interface IPicturePlaylist {
  height: number;
  url: string;
  width: number;
}

export interface IPlaylist {
  name: string;
  id: string;
  images: IPicturePlaylist[];
}

export interface IResponsePlayList {
  items: IPlaylist[];
}
