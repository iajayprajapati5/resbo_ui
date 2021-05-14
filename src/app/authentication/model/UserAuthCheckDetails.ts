export interface UserAuthCheckDetails{
  id: number,
  authorities: string[],
  firstname : string,
  lastname: string,
  enabled: boolean,
  username: string
}
