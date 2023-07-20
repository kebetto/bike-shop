export class Bike{
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public quantity: number,
    public imagePath: string,
    public rating?: string,
  ){}
}
