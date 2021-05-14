export interface AdvertiseDetailData{
  id: number,
  name: string,
  address: string,
  description: string,
  price: number,
  genre: string,
  created_at: string,
  user_fullname: string,
  user_id: number,
  finalised: boolean,
  image: string,
  user_interested?: number
}
