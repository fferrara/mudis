/**
 * Created by Flavio on 06/05/2017.
 */
let stripAccents = (function() {
  let translate_re = /[öäüÖÄÜ]/g;
  let translate = {
    "ä": "a", "ö": "o", "ü": "u",
    "Ä": "A", "Ö": "O", "Ü": "U"   // probably more to come
  };
  return function(s) {
    return ( s.replace(translate_re, function(match) {
      return translate[match];
    }) );
  }
})();

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

  public matchName(name: string): boolean {
    let itsName = stripAccents(name);
    let myName = stripAccents(this.name);
    return itsName.toUpperCase().indexOf(myName.toUpperCase()) !== -1;
  }
}
