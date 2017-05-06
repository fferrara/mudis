/**
 * Created by Flavio on 06/05/2017.
 */

export class Artist {

  constructor(
    public id: number,
    public name: string,
    public thumbUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.thumbUrl = thumbUrl;
  }

  public static build(data):Artist {
    return new Artist(
      data.id,
      data.name,
      data.thumb_url
    )
  }
}
