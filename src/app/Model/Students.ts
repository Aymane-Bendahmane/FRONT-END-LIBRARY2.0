export class Students {
  constructor(

    public id: number,
    public name: string,
    public last: string,
    public semestre: string,
    public telephone: string,
    public email: string,
    public password:string,
    public role=['USER','ADMIN']




  ) {}
}
