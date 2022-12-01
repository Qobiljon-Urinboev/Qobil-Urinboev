
class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=41a5966c5feafa7119cc32a31265296c";
  _baseOffset = 210;

  // getResource = async (url) => {
    
  //   let res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //   }

  //   return res.json();
  // };

  // getAllCharacters = async (offset = this._baseOffset) => {
  //   const hash = md5.create();
  //   const ts = Number(new Date());
  //   hash.update( ts + "41a5966c5feafa7119cc32a31265296c" + "132445c91dccead60815bb21c07df3c6b07e481a")
  //   const res = await this.getResource(
  //     `${this._apiBase}characters?ts=${ts}&limit=9&offset=${offset}&${this._apiKey}&hash=${hash.hex()}`
  //   );
  //   return res.data.results.map(this._transformCharacter);
  // };
  // getCharacter = async (id) => {
  //   const res = await this.getResource(
  //     `${this._apiBase}characters/${id}?${this._apiKey}`
  //   );
  //   return this._transformCharacter(res.data.results[0]);
  // };

  // _transformCharacter = (char) => {
  //   return {
  //     name: char.name,
  //     description: char.description,
  //     thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
  //     homepage: char.urls[0].url,
  //     wiki: char.urls[1].url,
  //     id: char.id,
  //     comics: char.comics.items
  //   };
  // };
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
}

getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
}

_transformCharacter = (char) => {
    return {
        id: char.id,
        name: char.name,
        description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    }
}
}

export default MarvelService;
