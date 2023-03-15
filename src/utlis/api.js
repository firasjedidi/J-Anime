// create api https://docs.consumet.org/#tag/anilist
import axios from "axios"
import {API} from '@env'

const user_Agent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5365.146 Safari/537.36"
const baseURL=API
const api = axios.create({
  baseURL,
  headers:{
      "User-Agent":user_Agent
  }
})
const getRecnetEp = async (page=1,perpage=20)=>{
    const {data:{results}}= await api.get(`/recent-episodes?provider=zoro?page=${page}&perPage=${perpage}`)
  if (!results)
    return {
      error: "No data Available",
    };
  return results;
    
}

const getTrending = async (page=1,perpage=20)=>{
  const {data:{results}}= await api.get(`/trending?page=${page}&perPage=${perpage}`)
    
    if (!results)
        return {
          error: "No data Available",
        };

      return results;
}

const getPopular = async (page=1,perpage=20)=>{
  const {data:{results}} = await api.get(`/popular?page=${page}&perPage=${perpage}`)

  if (!results)
    return {
      error: "No data Available",
    };
  return results
      
}
const getTopRated = async (perpage=12)=>{
  const {data:{results}} = await api.get(`/advanced-search?sort=["SCORE_DESC"]&perPage=${perpage}`)
  
  if (!results)
    return {
      error: "No data Available",
    };
  return results
      
}

const getRandom = async (page=2,perpage=20)=>{
  const {data:{results}}= await api.get(`/recent-episodes?provider=zoro?page=${page}&perPage=${perpage}`)
  const  trending = await api.get(`/trending?page=${page}&perPage=${perpage}`)
  const  papular = await api.get(`/popular?page=${page}&perPage=${perpage}`)
  const concat = [...results,... trending.data.results,...papular.data.results]
  const res = [...new Map(concat.map(item => [item['id'], item])).values()]
  var newres;
  if(res.length % 2 ) {
    newres = res.slice(0,res.length-1)
  }
  if (!res )
  return {
    error: "No data Available",
  };

  return newres ? newres : res;
}

const getAiring= async (bool)=>{
  const {data:{results}} = await api.get(`/airing-schedule?notYetAired=${bool}`)
  if (!results)
  return {
    error: "No data Available",
  };

  return results;
}

const getInfo = async(id)=>{
  const {data} = await api.get(`/info/${id}`)
  if (!data)
    return {
      error: "No data Available",
    };
  return data;
}

const getStreaming = async (episodesId)=>{
    const {data} = await api.get(`/watch/${episodesId}?provider="zoro"`)
    if (!data)
      return {
        error: "No data Available",
    };

    return data;
}
const getSkipTimes = async (malId, episodeNumber) => {
  
  const { data } = await axios.get(`https://api.streamable.moe/api/aniskip/${malId}/${episodeNumber}`);
  if (!data)
    return {
      error: "No data Available",
    };
  return data;
}

const getGenres = 
  [
    "Home","Action" ,"Adventure", "Cars" ,"Comedy" ,
    "Drama","Fantasy", "Horror" ,"Mahou Shoujo", "Mecha" ,
    "Music", "Mystery" ,"Psychological", "Romance", "Sci-Fi",
    "Slice of Life", "Sports", "Supernatural" ,"Thriller"
  ]

const getGenre = async (genre)=>{
  const {data} = await api.get(`/genre?genres=["${genre}"]`)
  if (!data.results)
  return {
    error: "No .results Available",
  };
  return data.results;
}

const getSearch = async (serach,page=1,perpage=25)=>{

  const {data} = await api.get(`/advanced-search?query=${serach}`)
  if (!data.results)
      return {
        error: "No results Available",
      };
  return data.results;
}

// https://gogoanime.consumet.org/anime-movies // https://gogoanime.consumet.org/anime-details/?movie 
const getMovies = async (page)=>{
    const {data}= await axios.get(`https://gogoanime.consumet.org/anime-movies?page=${page}`)
    if (!data)
      return {
      error: "No data Available",
      };
    return data;
}
const getMovie = async (serach,page=1,perpage=25)=>{
  const {data:{results}}= await api.get(`/advanced-search?query=${serach}?page=${page}&perPage=${perpage}`)
  if (!results)
    return {
      error: "No data Available",
    };

  return results;
}
const getMovieStream = async (serach,page=1,perpage=25)=>{
  const {data:{results}}= await api.get(`/advanced-search?query=${serach}`)
  if (!results)
      return {
        error: "No data Available",
      };
  return results;
}

// manga 
const manga =  [
  {
    "id": "30013",
    "malId": 13,
    "title": {
        "romaji": "ONE PIECE",
        "english": "One Piece",
        "native": "ONE PIECE",
        "userPreferred": "ONE PIECE"
    },
    "status": "Ongoing",
    "image": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013-oT7YguhEK1TE.jpg",
    "cover": "https://s4.anilist.co/file/anilistcdn/media/manga/banner/30013-hbbRZqC5MjYh.jpg",
    "popularity": 130810,
    "description": "As a child, Monkey D. Luffy was inspired to become a pirate by listening to the tales of the buccaneer \"Red-Haired\" Shanks. But his life changed when Luffy accidentally ate the Gum-Gum Devil Fruit and gained the power to stretch like rubber...at the cost of never being able to swim again! Years later, still vowing to become the king of the pirates, Luffy sets out on his adventure...one guy alone in a rowboat, in search of the legendary \"One Piece,\" said to be the greatest treasure in the world...\n<br><br>\n(Source: Viz Media)",
    "rating": 91,
    "genres": [
        "Action",
        "Adventure",
        "Comedy",
        "Fantasy"
    ],
    "color": "#f1935d",
    "totalChapters": null,
    "volumes": null,
    "type": "MANGA",
    "releaseDate": null
 },
  {
    "id": "30012",
    "malId": 12,
    "title": {
        "romaji": "BLEACH",
        "english": "Bleach",
        "native": "BLEACH",
        "userPreferred": "BLEACH"
    },
    "status": "Completed",
    "image": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30012-z7U138mUaPdN.png",
    "cover": "https://s4.anilist.co/file/anilistcdn/media/manga/banner/30012-RpbdVc2yNxhw.jpg",
    "popularity": 69275,
    "description": "Ichigo Kurosaki has always been able to see ghosts, but this ability doesn't change his life nearly as much as his close encounter with Rukia Kuchiki, a Soul Reaper and member of the mysterious Soul Society. While fighting a Hollow, an evil spirit that preys on humans who display psychic energy, Rukia attempts to lend Ichigo some of her powers so that he can save his family; but much to her surprise, Ichigo absorbs every last drop of her energy. Now a full-fledged Soul Reaper himself, Ichigo quickly learns that the world he inhabits is one full of dangerous spirits and, along with Rukia— who is slowly regaining her powers— it's Ichigo's job to protect the innocent from Hollows and help the spirits themselves find peace.<br><br>\n(Source: Viz Media)<br><br>\n<i>Note: Chapter count includes the 12-chapter “Turn Back The Pendulum” side story and 8 extra chapters.</i>",
    "rating": 78,
    "genres": [
        "Action",
        "Adventure",
        "Supernatural"
    ],
    "color": "#3586e4",
    "totalChapters": 706,
    "volumes": 74,
    "type": "MANGA",
    "releaseDate": null
  },
  {
    "id": "30011",
    "malId": 11,
    "title": {
        "romaji": "NARUTO",
        "english": "Naruto",
        "native": "NARUTO -ナルト-",
        "userPreferred": "NARUTO"
    },
    "status": "Completed",
    "image": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx30011-9yUF1dXWgDOx.jpg",
    "cover": "https://s4.anilist.co/file/anilistcdn/media/manga/banner/30011-pkX1O0EFqvV7.jpg",
    "popularity": 63831,
    "description": "Before Naruto's birth, a great demon fox had attacked the Hidden Leaf Village. A man known as the 4th Hokage sealed the demon inside the newly born Naruto, causing him to unknowingly grow up detested by his fellow villagers. Despite his lack of talent in many areas of ninjutsu, Naruto strives for only one goal: to gain the title of Hokage, the strongest ninja in his village. Desiring the respect he never received, Naruto works towards his dream with fellow friends Sasuke and Sakura and mentor Kakashi as they go through many trials and battles that come with being a ninja. ",
    "rating": 79,
    "genres": [
        "Action",
        "Adventure"
    ],
    "color": "#fe7828",
    "totalChapters": 700,
    "volumes": 72,
    "type": "MANGA",
    "releaseDate": null
  },
  {
    "id": "30042",
    "malId": 42,
    "title": {
        "romaji": "Dragon Ball",
        "english": "Dragon Ball",
        "native": "ドラゴンボール",
        "userPreferred": "Dragon Ball"
    },
    "status": "Completed",
    "image": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30042-4SetGiEbGc9x.jpg",
    "cover": "https://s4.anilist.co/file/anilistcdn/media/manga/banner/30042-4aSSSOxCNWgE.jpg",
    "popularity": 29268,
    "description": "Dragon Ball follows the adventures of Son Goku from his childhood through adulthood as he trains in martial arts and explores the world in search of the seven mystical orbs known as the Dragon Balls, which can summon a wish-granting dragon when gathered. Along his journey, Goku makes several friends and battles a wide variety of villains, many of whom also seek the Dragon Balls for their own desires. Along the way becoming the strongest warrior in the universe.<br><br>\nPart II of Dragon Ball is also known as \"Dragon Ball Z\" in North America.<br><br>\n<i>Note: Chapter count includes 519 regular chapters and 1 extra. (Volume 33's \"Trunks: The Story\").</i>",
    "rating": 82,
    "genres": [
        "Action",
        "Adventure",
        "Comedy",
        "Sci-Fi"
    ],
    "color": "#fee40d",
    "totalChapters": 520,
    "volumes": 42,
    "type": "MANGA",
    "releaseDate": null
  },
  {
    "id": "108556",
    "malId": 119161,
    "title": {
        "romaji": "SPY×FAMILY",
        "english": "SPY x FAMILY",
        "native": "SPY×FAMILY",
        "userPreferred": "SPY×FAMILY"
    },
    "status": "Ongoing",
    "image": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx108556-NHjkz0BNJhLx.jpg",
    "cover": "https://s4.anilist.co/file/anilistcdn/media/manga/banner/108556-iCiPfU0GU4OM.jpg",
    "popularity": 110254,
    "description": "The master spy codenamed &lt;Twilight&gt; has spent his days on undercover missions, all for the dream of a better world. But one day, he receives a particularly difficult new order from command. For his mission, he must form a temporary family and start a new life?! A Spy/Action/Comedy about a one-of-a-kind family!<br><br>\n(Source: MANGA Plus)<br><br>\n<i>Notes:<br>\n- Includes 2 \"Extra Missions\" and 9 “Short Missions”.<br>\n- Nominated for the 24th Tezuka Osamu Cultural Prize in 2020.<br>\n- Nominated for the 13th and 14th Manga Taisho Award in 2020 and 2021.<br>\n- Nominated for the 44th Kodansha Manga Award in the Shounen Category in 2020.</i>",
    "rating": 85,
    "genres": [
        "Action",
        "Comedy",
        "Slice of Life",
        "Supernatural"
    ],
    "color": "#e43543",
    "totalChapters": null,
    "volumes": null,
    "type": "MANGA",
    "releaseDate": null
  },
]
const getSearchManga = async (serach,page=1,perpage=25)=>{
    const {data:{results}} = await axios.get(`https://api.consumet.org/meta/anilist-manga/${serach}`)
    if (!results)
        return {
          error: "No data Available",
        };

      return results;
}
const getMangaInfo = async (id)=>{
  const {data} = await axios.get(`https://api.consumet.org/meta/anilist-manga/info/${id}`)
  if (!data)
      return {
        error: "No data Available",
      };
    return data;
}
const getMangaChapter = async (chapterId,page=1,perpage=25)=>{
  const {data} = await axios.get(`https://api.consumet.org/meta/anilist-manga/read?chapterId=${chapterId}`)
  if (!data)
      return {
        error: "No data Available",
      };
      console.log(data,"chap");
    return data;
}
export {
  getPopular,
  getRecnetEp,
  getTrending,
  getTopRated ,
  getGenres,
  getRandom,
  getMovies,
  getInfo,
  getStreaming,
  getSkipTimes,
  getSearch,
  getGenre,
  getAiring,
  manga,
  getSearchManga,
  getMangaInfo,
  getMangaChapter,
}